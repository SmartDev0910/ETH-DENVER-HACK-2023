pragma solidity ^0.6.0;

import "./utility/SafeMath.sol";
import "./utility/LibMathSigned.sol";
import "./utility/Address.sol";
import "./utility/Types.sol";
import "./PositionManager.sol";

contract Perpetual is PositionManager {
    using SafeMath for uint256;
    using LibMathSigned for int256;
    using Address for address;

    constructor(
        address collateralAddress,
        address priceFeederAddress
    )
        public
        PositionManager(collateralAddress, priceFeederAddress)
    {}

    

}
