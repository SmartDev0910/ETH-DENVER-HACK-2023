pragma solidity ^0.6.0;

interface IAMM {

    function shareTokenAddress() external view returns (address );
 
    function indexPrice() external view returns (uint256, uint);

    function currentMarkPrice() external returns (uint256);

    function currentAccumulatedFundingPerContract() external returns (int256);

    function currentAvailableMargin() external returns (uint256);

}