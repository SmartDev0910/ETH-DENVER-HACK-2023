pragma solidity ^0.6.0;

import "./utility/SyntheticToken.sol";
import "./interfaces/IExpandedIERC20.sol";
import "./utility/Lockable.sol";


/**
 * @title Factory for creating new mintable and burnable tokens.
 */

contract TokenFactory is Lockable {

    event TokenCreated(address indexed tokenAddress);

    /**
     * @notice Create a new token and return it to the caller.
     * @dev The caller will become the only minter and burner and the new owner capable of assigning the roles.
     * @param tokenName used to describe the new token.
     * @param tokenSymbol short ticker abbreviation of the name. Ideally < 5 chars.
     * @param tokenDecimals used to define the precision used in the token's numerical representation.
     * @return newToken an instance of the newly created token interface.
     */
    function createToken(
        string calldata tokenName,
        string calldata tokenSymbol,
        uint8 tokenDecimals
    ) external nonReentrant() returns (IExpandedIERC20 newToken) {
        SyntheticToken mintableToken = new SyntheticToken(tokenName, tokenSymbol, tokenDecimals);
        mintableToken.addMinter(msg.sender);
        mintableToken.addBurner(msg.sender);
        mintableToken.resetOwner(msg.sender);
        newToken = IExpandedIERC20(address(mintableToken));

        emit TokenCreated(address(newToken));

    }

}
