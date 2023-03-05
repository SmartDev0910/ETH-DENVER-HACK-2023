pragma solidity >=0.4.25 <0.8.0;

import { ERC20 } from "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import { ERC20Detailed } from "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";

contract MockERC20 is ERC20, ERC20Detailed {
  function mint(address account, uint256 amount) external {
    _mint(account, amount);
  }
}


contract USDT is MockERC20 {
  constructor() public ERC20Detailed("Tether USD", "USDT", 18) {}
}

contract USDC is MockERC20 {
  constructor() public ERC20Detailed("USDC", "USDC", 18) {}
}

contract WBTC is MockERC20 {
  constructor() public ERC20Detailed("Wrapped BTC", "WBTC", 18) {}
}

contract WBNB is MockERC20 {
  constructor() public ERC20Detailed("Wrapped BNB", "WBNB", 18) {}
}

contract MFIL is MockERC20 {
  constructor() public ERC20Detailed("Mock Filecoin", "mFIL", 18) {}
}
