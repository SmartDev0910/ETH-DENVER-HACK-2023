pragma solidity ^0.6.0;

import "../utility/ERC20.sol";

contract MockToken is ERC20 {
    constructor(
        string memory name,
        string memory symbol
    ) public ERC20(name, symbol) {
        _mint(msg.sender, 10000000 * (10 ** 18));
    }


    function faucet() public {
        _mint(msg.sender, 10000 * (10 ** 18));
    }

}