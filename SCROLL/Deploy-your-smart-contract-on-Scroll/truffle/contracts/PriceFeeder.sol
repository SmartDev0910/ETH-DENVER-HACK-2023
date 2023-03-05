pragma solidity ^0.6.0;

import "./utility/Ownable.sol";
import "./utility/Whitelist.sol";
import "./interfaces/IPriceFeeder.sol";

contract PriceFeeder is Whitelist, IPriceFeeder {
    uint256 public value = 100000; // wad
    uint256 public newValue = 100000; // wad
    uint256 private timestamp;
    
    string public name;

    constructor(string memory _name) public {
        name = _name;
        timestamp = now;
        addAddress(msg.sender);
    }

    function updateValue(uint256 _newValue) public onlyWhitelisted() {
        newValue = _newValue;
    }

    function confirmValueUpdate() public onlyWhitelisted() {
        value = newValue;
        timestamp = now;
    }

    function getValue() public override view returns (uint256) {
        return value;
    }

    function getTimestamp() public override view returns (uint256) {
        return timestamp;
    }
}
