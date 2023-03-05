pragma solidity ^0.6.0;

import "../utility/SafeMath.sol";

contract MockSafeMath {

    using SafeMath for uint256;

    // function testFail_wmul_overflow() public pure {
    //     wmul(2 ** 128, 2 ** 128);
    // }
    function wmul(uint256 a, uint256 b) public pure returns (uint256) {
        return a.wmul(b);
    }

    function wdiv(uint256 a, uint256 b) public pure returns (uint256) {
        return a.wdiv(b);
    }

}