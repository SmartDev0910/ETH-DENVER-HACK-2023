pragma solidity ^0.6.0;

library Types {

    enum Side {FLAT, SHORT, LONG}

    enum Status {NORMAL, EMERGENCY, SETTLED}

    struct PositionData {
        int256 rawCollateral;
        Side side;
        uint256 size;
        uint256 entryValue;
        int256 entrySocialLoss;
        int256 entryFundingLoss;
    }

    struct FundingState {
        uint256 lastFundingTime;
        int256 lastPremium;
        int256 lastEMAPremium;
        uint256 lastIndexPrice;
        int256 accumulatedFundingPerContract;
    }

}