pragma solidity ^0.6.0;

interface IPriceFeeder {

    function getValue() external view returns (uint256);

    function getTimestamp() external view returns (uint);

}