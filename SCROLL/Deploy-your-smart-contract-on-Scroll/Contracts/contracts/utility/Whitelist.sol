pragma solidity ^0.6.0;

import "./Ownable.sol";
import "./Utils.sol";


/**
  * @dev The contract manages a list of whitelisted addresses
*/
contract Whitelist is Ownable, Utils {

    mapping (address => bool) private whitelist;

    /**
      * @dev returns true if a given address is whitelisted, false if not
      * 
      * @param _address address to check
      * 
      * @return true if the address is whitelisted, false if not
    */
    function isWhitelisted(address _address) public view returns (bool) {
        return whitelist[_address];
    }

    modifier onlyWhitelisted() {
        address sender = _msgSender();
        require(isWhitelisted(sender), "Ownable: caller is not the owner");
        _;
    }

    /**
      * @dev adds a given address to the whitelist
      * 
      * @param _address address to add
    */
    function addAddress(address _address)
        public
        onlyOwner
        validAddress(_address)
    {
        if (whitelist[_address]) // checks if the address is already whitelisted
            return;

        whitelist[_address] = true;
    }

    /**
      * @dev removes a given address from the whitelist
      * 
      * @param _address address to remove
    */
    function removeAddress(address _address) public onlyOwner {
        if (!whitelist[_address]) // checks if the address is actually whitelisted
            return;

        whitelist[_address] = false;
    }



}