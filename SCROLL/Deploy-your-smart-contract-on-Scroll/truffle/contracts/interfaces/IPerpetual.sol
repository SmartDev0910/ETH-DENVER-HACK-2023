pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

import "../utility/Types.sol";

interface IPerpetual {


    function status() external view returns (Types.Status);

    function positions(address trader) external view returns (Types.PositionData memory);

    function socialLossPerContracts() external view returns (int256[3] memory);

    function socialLossPerContract(Types.Side) external view returns (int256);

    function isValidTradingLotSize(uint256 amount) external view returns (bool);

    function tradePosition(address, address,Types.Side, uint256, uint256 ) external returns (uint256, uint256);

    function depositFor(address, uint256) external;

    function withdrawFor(address, uint256) external;

    function markPrice() external view returns (uint256);

    function isIMSafeWithPrice(address, uint256) external view returns (bool);

    function isSafeWithPrice(address, uint256) external view returns (bool);

    function transferCollateral(address, address, int256) external;

    function lotSize() external view returns (uint256);

}