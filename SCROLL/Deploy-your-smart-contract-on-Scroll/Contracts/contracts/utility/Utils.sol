pragma solidity ^0.6.0;

contract Utils {

    // function compareStrings(string memory a, string memory b) public view returns (bool) {
    //     return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    // }

    modifier greaterThanZero(uint256 _amount) {
        require(_amount > 0, "verifies that an amount is greater than zero");
        _;
    }

    modifier validAddress(address _address) {
        require(_address != address(0), "validates an address that it isn't null");
        _;
    }

    modifier notThis(address _address) {
        require(_address != address(this), "verifies that the address is different than this contract address");
        _;
    }

    function max(uint256 a, uint256 b) internal pure returns (uint256) {
        return a >= b ? a : b;
    }

}