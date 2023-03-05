pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

import "../AMM.sol";

contract MockAMM  is AMM {
    
    uint256 public mockBlockTimestamp;

    constructor(string memory _poolName,
        string memory _poolSymbol,
        address _tokenFactoryAddress,
        address _priceFeederAddress,
        address _perpetualAddress)
        public
        AMM(_poolName, _poolSymbol, _tokenFactoryAddress, _priceFeederAddress, _perpetualAddress)
    {
        // solium-disable-next-line security/no-block-members
        mockBlockTimestamp = block.timestamp;
    }

    function _getBlockTimestamp() internal view override returns (uint256) {
        return mockBlockTimestamp;
    }

    function setBlockTimestamp(uint256 newValue) public {
        mockBlockTimestamp = newValue;
    }

}