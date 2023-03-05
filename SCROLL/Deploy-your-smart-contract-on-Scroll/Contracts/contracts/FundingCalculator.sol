pragma solidity ^0.6.0;

import "./utility/Lockable.sol";
import "./utility/SafeMath.sol";
import "./utility/LibMathSigned.sol";
import "./utility/Address.sol";
import "./utility/Types.sol";
import "./utility/Whitelist.sol";

interface IAMM {
    function markPremiumLimit() external view returns (int256);

    function emaAlpha() external  view returns (int256);

    function emaAlpha2() external view returns (int256);

    function emaAlpha2Ln() external view returns (int256);

    function fundingDampener() external view returns (int256);
}


contract FundingCalculator is Lockable, Whitelist {
    using SafeMath for uint256;
    using LibMathSigned for int256;
    using Address for address;

    int256 public markPremiumLimit;

    int256 public emaAlpha;
    int256 public emaAlpha2;
    int256 public emaAlpha2Ln;
    int256 public fundingDampener;

    /**
     * @notice The intermediate variables required by getAccumulatedFunding. This is only used to move stack
     *         variables to storage variables.
     */
    struct AccumulatedFundingCalculator {
        int256 vLimit;
        int256 vDampener;
        int256 t1; // normal int, not WAD
        int256 t2; // normal int, not WAD
        int256 t3; // normal int, not WAD
        int256 t4; // normal int, not WAD
    }

    IAMM public amm;

    constructor(
        address _ammAddress
    ) public nonReentrant() {
        amm = IAMM(_ammAddress);

        addAddress(msg.sender);
        markPremiumLimit = amm.markPremiumLimit();
        emaAlpha = amm.emaAlpha();
        emaAlpha2 = amm.emaAlpha2();
        emaAlpha2Ln = amm.emaAlpha2Ln();
        fundingDampener = amm.fundingDampener();

    }

    function updateParams() external onlyWhitelisted() {
        markPremiumLimit = amm.markPremiumLimit();
        emaAlpha = amm.emaAlpha();
        emaAlpha2 = amm.emaAlpha2();
        emaAlpha2Ln = amm.emaAlpha2Ln();
        fundingDampener = amm.fundingDampener();
    }

    function updateAmm(address _ammAddress) external onlyWhitelisted() {
        amm = IAMM(_ammAddress);
    }

    function timeOnFundingCurve(
        int256 y,
        int256 v0,
        int256 _lastPremium
    )
        internal
        view
        returns (
            int256 t // normal int, not WAD
        )
    {
        require(y != _lastPremium, "no solution 1 on funding curve");
        t = y.sub(_lastPremium);
        t = t.wdiv(v0.sub(_lastPremium));
        require(t > 0, "no solution 2 on funding curve");
        require(t < LibMathSigned.WAD(), "no solution 3 on funding curve");
        t = t.wln();
        t = t.wdiv(emaAlpha2Ln);
        t = t.ceil(LibMathSigned.WAD()) / LibMathSigned.WAD();
    }

    /**
     * @notice Sum emaPremium curve between [x, y)
     *
     * @param x Begin time. normal int, not WAD.
     * @param y End time. normal int, not WAD.
     * @param v0 LastEMAPremium.
     * @param _lastPremium LastPremium.
     */
    function integrateOnFundingCurve(
        int256 x,
        int256 y,
        int256 v0,
        int256 _lastPremium
    ) internal view returns (int256 r) {
        require(x <= y, "integrate reversed");
        r = v0.sub(_lastPremium);
        r = r.wmul(emaAlpha2.wpowi(x).sub(emaAlpha2.wpowi(y)));
        r = r.wdiv(emaAlpha);
        r = r.add(_lastPremium.mul(y.sub(x)));
    }

    function getAccumulatedFunding(
        int256 n,
        int256 v0,
        int256 _lastPremium,
        int256 _lastIndexPrice
    )
        external
        view
        returns (
            int256 vt, // new LastEMAPremium
            int256 acc
        )
    {
        require(n > 0, "we can't go back in time");

        AccumulatedFundingCalculator memory ctx;
        vt = v0.sub(_lastPremium);
        vt = vt.wmul(emaAlpha2.wpowi(n));
        vt = vt.add(_lastPremium);
        ctx.vLimit = markPremiumLimit.wmul(_lastIndexPrice);
        ctx.vDampener = fundingDampener.wmul(_lastIndexPrice);
        if (v0 <= -ctx.vLimit) {
            // part A
            if (vt <= -ctx.vLimit) {
                acc = (-ctx.vLimit).add(ctx.vDampener).mul(n);
            } else if (vt <= -ctx.vDampener) {
                ctx.t1 = timeOnFundingCurve(-ctx.vLimit, v0, _lastPremium);
                acc = (-ctx.vLimit).mul(ctx.t1);
                acc = acc.add(integrateOnFundingCurve(ctx.t1, n, v0, _lastPremium));
                acc = acc.add(ctx.vDampener.mul(n));
            } else if (vt <= ctx.vDampener) {
                ctx.t1 = timeOnFundingCurve(-ctx.vLimit, v0, _lastPremium);
                ctx.t2 = timeOnFundingCurve(-ctx.vDampener, v0, _lastPremium);
                acc = (-ctx.vLimit).mul(ctx.t1);
                acc = acc.add(integrateOnFundingCurve(ctx.t1, ctx.t2, v0, _lastPremium));
                acc = acc.add(ctx.vDampener.mul(ctx.t2));
            } else if (vt <= ctx.vLimit) {
                ctx.t1 = timeOnFundingCurve(-ctx.vLimit, v0, _lastPremium);
                ctx.t2 = timeOnFundingCurve(-ctx.vDampener, v0, _lastPremium);
                ctx.t3 = timeOnFundingCurve(ctx.vDampener, v0, _lastPremium);
                acc = (-ctx.vLimit).mul(ctx.t1);
                acc = acc.add(integrateOnFundingCurve(ctx.t1, ctx.t2, v0, _lastPremium));
                acc = acc.add(integrateOnFundingCurve(ctx.t3, n, v0, _lastPremium));
                acc = acc.add(ctx.vDampener.mul(ctx.t2.sub(n).add(ctx.t3)));
            } else {
                ctx.t1 = timeOnFundingCurve(-ctx.vLimit, v0, _lastPremium);
                ctx.t2 = timeOnFundingCurve(-ctx.vDampener, v0, _lastPremium);
                ctx.t3 = timeOnFundingCurve(ctx.vDampener, v0, _lastPremium);
                ctx.t4 = timeOnFundingCurve(ctx.vLimit, v0, _lastPremium);
                acc = (-ctx.vLimit).mul(ctx.t1);
                acc = acc.add(integrateOnFundingCurve(ctx.t1, ctx.t2, v0, _lastPremium));
                acc = acc.add(integrateOnFundingCurve(ctx.t3, ctx.t4, v0, _lastPremium));
                acc = acc.add(ctx.vLimit.mul(n.sub(ctx.t4)));
                acc = acc.add(ctx.vDampener.mul(ctx.t2.sub(n).add(ctx.t3)));
            }
        } else if (v0 <= -ctx.vDampener) {
            // part B
            if (vt <= -ctx.vLimit) {
                ctx.t4 = timeOnFundingCurve(-ctx.vLimit, v0, _lastPremium);
                acc = integrateOnFundingCurve(0, ctx.t4, v0, _lastPremium);
                acc = acc.add((-ctx.vLimit).mul(n.sub(ctx.t4)));
                acc = acc.add(ctx.vDampener.mul(n));
            } else if (vt <= -ctx.vDampener) {
                acc = integrateOnFundingCurve(0, n, v0, _lastPremium);
                acc = acc.add(ctx.vDampener.mul(n));
            } else if (vt <= ctx.vDampener) {
                ctx.t2 = timeOnFundingCurve(-ctx.vDampener, v0, _lastPremium);
                acc = integrateOnFundingCurve(0, ctx.t2, v0, _lastPremium);
                acc = acc.add(ctx.vDampener.mul(ctx.t2));
            } else if (vt <= ctx.vLimit) {
                ctx.t2 = timeOnFundingCurve(-ctx.vDampener, v0, _lastPremium);
                ctx.t3 = timeOnFundingCurve(ctx.vDampener, v0, _lastPremium);
                acc = integrateOnFundingCurve(0, ctx.t2, v0, _lastPremium);
                acc = acc.add(integrateOnFundingCurve(ctx.t3, n, v0, _lastPremium));
                acc = acc.add(ctx.vDampener.mul(ctx.t2.sub(n).add(ctx.t3)));
            } else {
                ctx.t2 = timeOnFundingCurve(-ctx.vDampener, v0, _lastPremium);
                ctx.t3 = timeOnFundingCurve(ctx.vDampener, v0, _lastPremium);
                ctx.t4 = timeOnFundingCurve(ctx.vLimit, v0, _lastPremium);
                acc = integrateOnFundingCurve(0, ctx.t2, v0, _lastPremium);
                acc = acc.add(integrateOnFundingCurve(ctx.t3, ctx.t4, v0, _lastPremium));
                acc = acc.add(ctx.vLimit.mul(n.sub(ctx.t4)));
                acc = acc.add(ctx.vDampener.mul(ctx.t2.sub(n).add(ctx.t3)));
            }
        } else if (v0 <= ctx.vDampener) {
            // part C
            if (vt <= -ctx.vLimit) {
                ctx.t3 = timeOnFundingCurve(-ctx.vDampener, v0, _lastPremium);
                ctx.t4 = timeOnFundingCurve(-ctx.vLimit, v0, _lastPremium);
                acc = integrateOnFundingCurve(ctx.t3, ctx.t4, v0, _lastPremium);
                acc = acc.add((-ctx.vLimit).mul(n.sub(ctx.t4)));
                acc = acc.add(ctx.vDampener.mul(n.sub(ctx.t3)));
            } else if (vt <= -ctx.vDampener) {
                ctx.t3 = timeOnFundingCurve(-ctx.vDampener, v0, _lastPremium);
                acc = integrateOnFundingCurve(ctx.t3, n, v0, _lastPremium);
                acc = acc.add(ctx.vDampener.mul(n.sub(ctx.t3)));
            } else if (vt <= ctx.vDampener) {
                acc = 0;
            } else if (vt <= ctx.vLimit) {
                ctx.t3 = timeOnFundingCurve(ctx.vDampener, v0, _lastPremium);
                acc = integrateOnFundingCurve(ctx.t3, n, v0, _lastPremium);
                acc = acc.sub(ctx.vDampener.mul(n.sub(ctx.t3)));
            } else {
                ctx.t3 = timeOnFundingCurve(ctx.vDampener, v0, _lastPremium);
                ctx.t4 = timeOnFundingCurve(ctx.vLimit, v0, _lastPremium);
                acc = integrateOnFundingCurve(ctx.t3, ctx.t4, v0, _lastPremium);
                acc = acc.add(ctx.vLimit.mul(n.sub(ctx.t4)));
                acc = acc.sub(ctx.vDampener.mul(n.sub(ctx.t3)));
            }
        } else if (v0 <= ctx.vLimit) {
            // part D
            if (vt <= -ctx.vLimit) {
                ctx.t2 = timeOnFundingCurve(ctx.vDampener, v0, _lastPremium);
                ctx.t3 = timeOnFundingCurve(-ctx.vDampener, v0, _lastPremium);
                ctx.t4 = timeOnFundingCurve(-ctx.vLimit, v0, _lastPremium);
                acc = integrateOnFundingCurve(0, ctx.t2, v0, _lastPremium);
                acc = acc.add(integrateOnFundingCurve(ctx.t3, ctx.t4, v0, _lastPremium));
                acc = acc.add((-ctx.vLimit).mul(n.sub(ctx.t4)));
                acc = acc.add(ctx.vDampener.mul(n.sub(ctx.t3).sub(ctx.t2)));
            } else if (vt <= -ctx.vDampener) {
                ctx.t2 = timeOnFundingCurve(ctx.vDampener, v0, _lastPremium);
                ctx.t3 = timeOnFundingCurve(-ctx.vDampener, v0, _lastPremium);
                acc = integrateOnFundingCurve(0, ctx.t2, v0, _lastPremium);
                acc = acc.add(integrateOnFundingCurve(ctx.t3, n, v0, _lastPremium));
                acc = acc.add(ctx.vDampener.mul(n.sub(ctx.t3).sub(ctx.t2)));
            } else if (vt <= ctx.vDampener) {
                ctx.t2 = timeOnFundingCurve(ctx.vDampener, v0, _lastPremium);
                acc = integrateOnFundingCurve(0, ctx.t2, v0, _lastPremium);
                acc = acc.sub(ctx.vDampener.mul(ctx.t2));
            } else if (vt <= ctx.vLimit) {
                acc = integrateOnFundingCurve(0, n, v0, _lastPremium);
                acc = acc.sub(ctx.vDampener.mul(n));
            } else {
                ctx.t4 = timeOnFundingCurve(ctx.vLimit, v0, _lastPremium);
                acc = integrateOnFundingCurve(0, ctx.t4, v0, _lastPremium);
                acc = acc.add(ctx.vLimit.mul(n.sub(ctx.t4)));
                acc = acc.sub(ctx.vDampener.mul(n));
            }
        } else {
            // part E
            if (vt <= -ctx.vLimit) {
                ctx.t1 = timeOnFundingCurve(ctx.vLimit, v0, _lastPremium);
                ctx.t2 = timeOnFundingCurve(ctx.vDampener, v0, _lastPremium);
                ctx.t3 = timeOnFundingCurve(-ctx.vDampener, v0, _lastPremium);
                ctx.t4 = timeOnFundingCurve(-ctx.vLimit, v0, _lastPremium);
                acc = ctx.vLimit.mul(ctx.t1);
                acc = acc.add(integrateOnFundingCurve(ctx.t1, ctx.t2, v0, _lastPremium));
                acc = acc.add(integrateOnFundingCurve(ctx.t3, ctx.t4, v0, _lastPremium));
                acc = acc.add((-ctx.vLimit).mul(n.sub(ctx.t4)));
                acc = acc.add(ctx.vDampener.mul(n.sub(ctx.t3).sub(ctx.t2)));
            } else if (vt <= -ctx.vDampener) {
                ctx.t1 = timeOnFundingCurve(ctx.vLimit, v0, _lastPremium);
                ctx.t2 = timeOnFundingCurve(ctx.vDampener, v0, _lastPremium);
                ctx.t3 = timeOnFundingCurve(-ctx.vDampener, v0, _lastPremium);
                acc = ctx.vLimit.mul(ctx.t1);
                acc = acc.add(integrateOnFundingCurve(ctx.t1, ctx.t2, v0, _lastPremium));
                acc = acc.add(integrateOnFundingCurve(ctx.t3, n, v0, _lastPremium));
                acc = acc.add(ctx.vDampener.mul(n.sub(ctx.t3).sub(ctx.t2)));
            } else if (vt <= ctx.vDampener) {
                ctx.t1 = timeOnFundingCurve(ctx.vLimit, v0, _lastPremium);
                ctx.t2 = timeOnFundingCurve(ctx.vDampener, v0, _lastPremium);
                acc = ctx.vLimit.mul(ctx.t1);
                acc = acc.add(integrateOnFundingCurve(ctx.t1, ctx.t2, v0, _lastPremium));
                acc = acc.add(ctx.vDampener.mul(-ctx.t2));
            } else if (vt <= ctx.vLimit) {
                ctx.t1 = timeOnFundingCurve(ctx.vLimit, v0, _lastPremium);
                acc = ctx.vLimit.mul(ctx.t1);
                acc = acc.add(integrateOnFundingCurve(ctx.t1, n, v0, _lastPremium));
                acc = acc.sub(ctx.vDampener.mul(n));
            } else {
                acc = ctx.vLimit.sub(ctx.vDampener).mul(n);
            }
        }
    } // getAccumulatedFunding

}