pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

import "./utility/Lockable.sol";
import "./utility/SafeMath.sol";
import "./utility/LibMathSigned.sol";
import "./utility/Address.sol";
import "./utility/Whitelist.sol";
import "./utility/Types.sol";
import "./TokenFactory.sol";
import "./interfaces/IAMM.sol";
import "./interfaces/IPerpetual.sol";
import "./interfaces/IPriceFeeder.sol";

/**
 * @title AMM contract
 */

interface IFundingCalculator {

    function getAccumulatedFunding(int256, int256, int256, int256) external view returns (int256, int256);

}

contract AMM is Lockable, Whitelist, IAMM {
    using SafeMath for uint256;
    using LibMathSigned for int256;
    using Address for address;

    // Version number
    uint16 public constant version = 1;

    uint256 private constant FUNDING_PERIOD = 28800; // 8 * 3600;
    Types.FundingState private fundingState;

    // Share token created by this contract.
    IExpandedIERC20 public shareToken;
    // Price feeder contract.
    IPriceFeeder public priceFeeder;
    // Perpetual contract.
    IPerpetual public perpetual;

    IFundingCalculator public fundingCalculator;

    // Adjustable params
    uint256 public updatePremiumPrize = 1000000000000000000; // 1

    int256 public markPremiumLimit = 5000000000000000; // 0.5%

    int256 public emaAlpha = 3327787021630616; // 2 / (600 + 1)
    int256 public emaAlpha2 = 996672212978369384; // 10**18 - emaAlpha
    int256 public emaAlpha2Ln = -3333336419758231; // ln(emaAlpha2)
    int256 public fundingDampener = 500000000000000; // 0.05%
    
    event CreatedAMM();
    event UpdateFundingRate(Types.FundingState fundingState);
    event UpdatePriceFeeder(address indexed priceFeeder);

    constructor(
        string memory _poolName,
        string memory _poolSymbol,
        address _tokenFactoryAddress,
        address _priceFeederAddress,
        address _perpetualAddress
    ) public nonReentrant() {
        TokenFactory tf = TokenFactory(_tokenFactoryAddress);
        shareToken = tf.createToken(_poolName, _poolSymbol, 18);

        priceFeeder = IPriceFeeder(_priceFeederAddress);
        perpetual = IPerpetual(_perpetualAddress);

        addAddress(msg.sender);

        emit CreatedAMM();
    }

    function setPriceFeeder(address _priceFeederAddress) external onlyWhitelisted() {
        priceFeeder = IPriceFeeder(_priceFeederAddress);

         emit UpdatePriceFeeder(_priceFeederAddress);
    }

    function setUpdatePremiumPrize(uint256 value) external onlyWhitelisted() {
        require(value != updatePremiumPrize, "duplicated value");
        updatePremiumPrize = value;
    }

    function setMarkPremiumLimit(int256 value) external onlyWhitelisted() {
        require(value != markPremiumLimit, "duplicated value");
        markPremiumLimit = value;
    }

    function setEmaAlpha(int256 value) external onlyWhitelisted() {
        require(value != emaAlpha, "duplicated value");
        emaAlpha = value;
        emaAlpha2 = 10**18 - value;
        emaAlpha2Ln = value.wln();
    }

    function setFundingDampener(int256 value) external onlyWhitelisted() {
        require(value != fundingDampener, "duplicated value");
        fundingDampener = value;
    }

    function setAccumulatedFundingPerContract(int256 value) external onlyWhitelisted() {
        fundingState.accumulatedFundingPerContract = value;
    }

    function currentFundingRate() public returns (int256) {
        _funding();
        return lastFundingRate();
    }

    function lastFundingRate() public view returns (int256) {
        int256 rate = _lastPremiumRate(); 
        return rate.max(fundingDampener).add(rate.min(-fundingDampener));
    }

    function updateIndex() public {
        require(perpetual.status() == Types.Status.NORMAL, "wrong perpetual status");
        _forceFunding();
    }

    /**
     * @dev Share token's ERC20 address.
     */
    function shareTokenAddress() public override view returns (address) {
        return address(shareToken);
    }

    /**
     * @dev Read the price from Oracle
     */
    function indexPrice()
        public
        override
        view
        returns (uint256 price, uint256 timestamp)
    {
        price = priceFeeder.getValue();
        timestamp = priceFeeder.getTimestamp();

        require(price != 0, "index price error");
    }

    function setFundingCalculator(address _fundingCalculatorAddress) external onlyWhitelisted() {
        fundingCalculator = IFundingCalculator(_fundingCalculatorAddress);
    }

    function createPool(uint256 amount) public {
        require(amount > 0, "amount must be greater than zero");
        require(perpetual.status() == Types.Status.NORMAL, "wrong perpetual status");
        require(positionSize() == 0, "pool not empty");

        address trader = msg.sender;
        uint256 blockTime = _getBlockTimestamp();
        uint256 newIndexPrice;
        uint256 newIndexTimestamp;
        (newIndexPrice, newIndexTimestamp) = indexPrice();

        _initFunding(newIndexPrice, blockTime);
        perpetual.transferCollateral(trader, _tradingAccount(), (newIndexPrice.wmul(amount).mul(2).toInt256()));
        (uint256 opened, ) = perpetual.tradePosition(
            trader,
            _tradingAccount(),
            Types.Side.SHORT,
            newIndexPrice,
            amount
        );
        _mintShareTokenTo(trader, amount);

        _forceFunding(); // x, y changed, so fair price changed. we need funding now
        _mustSafe(trader, opened);
    }

    

    function addLiquidity(uint256 amount) public {
        require(perpetual.status() == Types.Status.NORMAL, "wrong perpetual status");

        uint256 oldAvailableMargin;
        uint256 oldPoolPositionSize;
        (oldAvailableMargin, oldPoolPositionSize) = _currentXY();
        require(oldPoolPositionSize != 0 && oldAvailableMargin != 0, "empty pool");

        address trader = msg.sender;
        uint256 price = oldAvailableMargin.wdiv(oldPoolPositionSize);

        uint256 collateralAmount = amount.wmul(price).mul(2);
        perpetual.transferCollateral(trader, _tradingAccount(), collateralAmount.toInt256());
        (uint256 opened, ) = perpetual.tradePosition(trader, _tradingAccount(), Types.Side.SHORT, price, amount);

        _mintShareTokenTo(trader, shareToken.totalSupply().wmul(amount).wdiv(oldPoolPositionSize));

        _forceFunding(); // x, y changed, so fair price changed. we need funding now
        _mustSafe(trader, opened);
    }

    function removeLiquidity(uint256 shareAmount) public {
        require(perpetual.status() == Types.Status.NORMAL, "wrong perpetual status");

        address trader = msg.sender;
        uint256 oldAvailableMargin;
        uint256 oldPoolPositionSize;
        (oldAvailableMargin, oldPoolPositionSize) = _currentXY();
        require(oldPoolPositionSize != 0 && oldAvailableMargin != 0, "empty pool");
        require(shareToken.balanceOf(msg.sender) >= shareAmount, "shareBalance too low");
        uint256 price = oldAvailableMargin.wdiv(oldPoolPositionSize);
        uint256 amount = shareAmount.wmul(oldPoolPositionSize).wdiv(shareToken.totalSupply());
        // align to lotSize
        uint256 lotSize = perpetual.lotSize();
        amount = amount.sub(amount.mod(lotSize));

        perpetual.transferCollateral(_tradingAccount(), trader, (price.wmul(amount).mul(2)).toInt256());
        _burnShareTokenFrom(trader, shareAmount);
        (uint256 opened, ) = perpetual.tradePosition(trader, _tradingAccount(), Types.Side.LONG, price, amount);

        _forceFunding(); // x, y changed, so fair price changed. we need funding now
        _mustSafe(trader, opened);
    }

    /**
     * @notice Pool's position size (y).
     */
    function positionSize() public view returns (uint256) {
        return perpetual.positions(_tradingAccount()).size;
    }

    function currentAvailableMargin() public override returns (uint256) {
        _funding();
        return _lastAvailableMargin();
    }

    function getAvailableMargin() public view returns (uint256) {
        return _lastAvailableMargin();
    }

    function currentFairPrice() public returns (uint256) {
        _funding();
        return _lastFairPrice();
    }

    function currentMarkPrice() public override returns (uint256) {
        _funding();
        return _lastMarkPrice();
    }

    function getMarkPrice() public view returns (uint256) {
        return _lastMarkPrice();
    }

    function getFairPrice() public view returns (uint256) {
        return _lastFairPrice();
    }

    function lastFundingState() public view returns (Types.FundingState memory) {
        return fundingState;
    }

    function currentAccumulatedFundingPerContract() public override returns (int256) {
        _funding();
        return fundingState.accumulatedFundingPerContract;
    }

    function getAccumulatedFundingPerContract() public view returns (int256) {
        return fundingState.accumulatedFundingPerContract;
    }

    function depositAndBuy(
        uint256 depositAmount,
        uint256 tradeAmount,
        uint256 limitPrice,
        uint256 deadline
    )
        public
    {
        if (depositAmount > 0) {
            perpetual.depositFor(msg.sender, depositAmount);
        }
        if (tradeAmount > 0) {
            buy(tradeAmount, limitPrice, deadline);
        }
    }

    function depositAndSell(
        uint256 depositAmount,
        uint256 tradeAmount,
        uint256 limitPrice,
        uint256 deadline
    )
        public
    {
        if (depositAmount > 0) {
            perpetual.depositFor(msg.sender, depositAmount);
        }
        if (tradeAmount > 0) {
            sell(tradeAmount, limitPrice, deadline);
        }
    }

    /**
     * @dev Buy/long with AMM.
     */
    function buy(
        uint256 amount,
        uint256 limitPrice,
        uint256 deadline
    ) public returns (uint256) {
        return _buyFrom(msg.sender, amount, limitPrice, deadline);
    }

    /**
     * @dev Sell/short with AMM.
     */
    function sell(
        uint256 amount,
        uint256 limitPrice,
        uint256 deadline
    ) public returns (uint256) {
        return _sellFrom(msg.sender, amount, limitPrice, deadline);
    }

    // INTERNAL FUCTIONS
    function _funding() internal {
        if (perpetual.status() != Types.Status.NORMAL) {
            return;
        }
        uint256 blockTime = _getBlockTimestamp();
        uint256 newIndexPrice;
        uint256 newIndexTimestamp;
        (newIndexPrice, newIndexTimestamp) = indexPrice();
        if (
            blockTime != fundingState.lastFundingTime || // condition 1
            newIndexPrice != fundingState.lastIndexPrice || // condition 2, especially when updateIndex and buy/sell are in the same block
            newIndexTimestamp > fundingState.lastFundingTime // condition 2
        ) {
            _forceFunding(blockTime, newIndexPrice, newIndexTimestamp);
        }

    } 

    function _lastMarkPrice() internal view returns (uint256) {
        int256 index = fundingState.lastIndexPrice.toInt256();
        int256 limit = index.wmul(markPremiumLimit);
        int256 p = index.add(_lastEMAPremium());
        p = p.min(index.add(limit));
        p = p.max(index.sub(limit));
        return p.max(0).toUint256();
    }

    function _lastEMAPremium() internal view returns (int256) {
        return fundingState.lastEMAPremium;
    }

    function _forceFunding() internal {
        require(perpetual.status() == Types.Status.NORMAL, "wrong perpetual status");
        uint256 blockTime = _getBlockTimestamp();
        uint256 newIndexPrice;
        uint256 newIndexTimestamp;
        (newIndexPrice, newIndexTimestamp) = indexPrice();
        _forceFunding(blockTime, newIndexPrice, newIndexTimestamp);
    }

    function _tradingAccount() internal view returns (address) {
        return address(perpetual);
    }

    function _forceFunding(uint256 blockTime, uint256 newIndexPrice, uint256 newIndexTimestamp) private {
        if (fundingState.lastFundingTime == 0) {
            // funding initialization required. but in this case, it's safe to just do nothing and return
            return;
        }
        Types.PositionData memory account = perpetual.positions(_tradingAccount());
        if (account.size == 0) {
            // empty pool. it's safe to just do nothing and return
            return;
        }

        if (newIndexTimestamp > fundingState.lastFundingTime) {
            // the 1st update
            _nextStateWithTimespan(account, newIndexPrice, newIndexTimestamp);
        }
        // the 2nd update;
        _nextStateWithTimespan(account, newIndexPrice, blockTime);

        emit UpdateFundingRate(fundingState);
    }

    function _lastPremiumRate() internal view returns (int256) {
        int256 index = fundingState.lastIndexPrice.toInt256();
        int256 rate = _lastMarkPrice().toInt256();
        rate = rate.sub(index).wdiv(index);
        return rate;
    }

    function _getBlockTimestamp() virtual internal view returns (uint256) {
        // solium-disable-next-line security/no-block-members
        return block.timestamp;
    }

    function _buyFrom(
        address trader,
        uint256 amount,
        uint256 limitPrice,
        uint256 deadline
    )
        internal
        returns (uint256) {
        require(perpetual.status() == Types.Status.NORMAL, "wrong perpetual status");
        require(perpetual.isValidTradingLotSize(amount), "amount must be divisible by tradingLotSize");

        uint256 price = getBuyPrice(amount);
        require(limitPrice >= price, "price limited");
        require(_getBlockTimestamp() <= deadline, "deadline exceeded");
        (uint256 opened, ) = perpetual.tradePosition(trader, _tradingAccount(), Types.Side.LONG, price, amount);

        _forceFunding(); // x, y changed, so fair price changed. we need funding now
        _mustSafe(trader, opened);
        return opened;
    }

    function _sellFrom(
        address trader,
        uint256 amount,
        uint256 limitPrice,
        uint256 deadline
    ) internal returns (uint256) {
        require(perpetual.status() == Types.Status.NORMAL, "wrong perpetual status");
        require(perpetual.isValidTradingLotSize(amount), "amount must be divisible by tradingLotSize");

        uint256 price = getSellPrice(amount);
        require(limitPrice <= price, "price limited");
        require(_getBlockTimestamp() <= deadline, "deadline exceeded");
        (uint256 opened, ) = perpetual.tradePosition(trader, _tradingAccount(), Types.Side.SHORT, price, amount);

        _forceFunding(); // x, y changed, so fair price changed. we need funding now
        _mustSafe(trader, opened);
        return opened;
    }

    function _mintShareTokenTo(address trader, uint256 amount) internal {
        require(shareToken.mint(trader, amount), "mint failed");
    }

    function _burnShareTokenFrom(address trader, uint256 amount) internal {
        shareToken.burn(trader, amount);
    }

    function getBuyPrice(uint256 amount) internal returns (uint256 price) {
        uint256 x;
        uint256 y;
        (x, y) = _currentXY();
        require(y != 0 && x != 0, "empty pool");
        return x.wdiv(y.sub(amount));
    }

    function getBuyPricePublic(uint256 amount) public view returns (uint256) {
        uint256 x;
        uint256 y;
        (x, y) = _currentXYNoFunding();
        require(y != 0 && x != 0, "empty pool");
        return x.wdiv(y.sub(amount));
    }

    function getSellPrice(uint256 amount) internal returns (uint256 price) {
        uint256 x;
        uint256 y;
        (x, y) = _currentXY();
        require(y != 0 && x != 0, "empty pool");
        return x.wdiv(y.add(amount));
    }

    function getSellPricePublic(uint256 amount) public view returns (uint256) {
        uint256 x;
        uint256 y;
        (x, y) = _currentXYNoFunding();
        require(y != 0 && x != 0, "empty pool");
        return x.wdiv(y.add(amount));
    }

    function getCurrentPricePublic() public view returns (uint256) {
        uint256 x;
        uint256 y;
        (x, y) = _currentXYNoFunding();
        require(y != 0 && x != 0, "empty pool");
        return x.wdiv(y);
    }

    function _lastFairPrice() internal view returns (uint256) {
        Types.PositionData memory account = perpetual.positions(_tradingAccount());
        return _fairPriceFromPoolAccount(account);
    }

    function _currentXY() internal returns (uint256 x, uint256 y) {
        _funding();
        Types.PositionData memory account = perpetual.positions(_tradingAccount());
        x = _availableMarginFromPoolAccount(account);
        y = account.size;
    }

    function _currentXYNoFunding() internal view returns (uint256 x, uint256 y) {
        Types.PositionData memory account = perpetual.positions(_tradingAccount());
        x = _availableMarginFromPoolAccount(account);
        y = account.size;
    }

    function _mustSafe(address trader, uint256 opened) internal {
        // perpetual.markPrice is a little different from ours
        uint256 perpetualMarkPrice = perpetual.markPrice();
        if (opened > 0) {
            require(perpetual.isIMSafeWithPrice(trader, perpetualMarkPrice), "im unsafe");
        }
        require(perpetual.isSafeWithPrice(trader, perpetualMarkPrice), "sender unsafe");
        require(perpetual.isSafeWithPrice(_tradingAccount(), perpetualMarkPrice), "amm unsafe");
    }

    function _nextStateWithTimespan(
        Types.PositionData memory account,
        uint256 newIndexPrice,
        uint256 endTimestamp
    ) private {
        require(fundingState.lastFundingTime != 0, "funding initialization required");
        require(endTimestamp >= fundingState.lastFundingTime, "time steps (n) must be positive");

        // update ema
        if (fundingState.lastFundingTime != endTimestamp) {
            int256 timeDelta = endTimestamp.sub(fundingState.lastFundingTime).toInt256();
            int256 acc;
            (fundingState.lastEMAPremium, acc) = fundingCalculator.getAccumulatedFunding(
                timeDelta,
                fundingState.lastEMAPremium,
                fundingState.lastPremium,
                fundingState.lastIndexPrice.toInt256() // ema is according to the old index
            );
            fundingState.accumulatedFundingPerContract = fundingState.accumulatedFundingPerContract.add(
                acc.div(FUNDING_PERIOD.toInt256())
            );
            fundingState.lastFundingTime = endTimestamp;
        }
        
        // always update
        fundingState.lastIndexPrice = newIndexPrice; // should update before premium()
        fundingState.lastPremium = _premiumFromPoolAccount(account);
    }

    function _premiumFromPoolAccount(Types.PositionData memory account) internal view returns (int256) {
        int256 p = _fairPriceFromPoolAccount(account).toInt256();
        p = p.sub(fundingState.lastIndexPrice.toInt256());
        return p;
    }

    function _fairPriceFromPoolAccount(Types.PositionData memory account) internal view returns (uint256) {
        uint256 y = account.size;
        require(y > 0, "funding initialization required");
        uint256 x = _availableMarginFromPoolAccount(account);
        return x.wdiv(y);
    }

    function _availableMarginFromPoolAccount(Types.PositionData memory account) internal view returns (uint256) {
        int256 available = account.rawCollateral;
        int256 socialLossPerContract = perpetual.socialLossPerContract(account.side);
        available = available.sub(account.entryValue.toInt256());
        available = available.sub(socialLossPerContract.wmul(account.size.toInt256()).sub(account.entrySocialLoss));
        available = available.sub(
            fundingState.accumulatedFundingPerContract.wmul(account.size.toInt256()).sub(account.entryFundingLoss)
        );
        return available.max(0).toUint256();
    }

    function _lastAvailableMargin() internal view returns (uint256) {
        Types.PositionData memory account = perpetual.positions(_tradingAccount());
        return _availableMarginFromPoolAccount(account);
    }

    function _initFunding(uint256 newIndexPrice, uint256 blockTime) private {
        require(fundingState.lastFundingTime == 0, "already initialized");
        fundingState.lastFundingTime = blockTime;
        fundingState.lastIndexPrice = newIndexPrice;
        fundingState.lastPremium = 0;
        fundingState.lastEMAPremium = 0;
    }


}
