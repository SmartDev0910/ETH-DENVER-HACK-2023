// ███████╗ ██████╗ ███╗   ██╗██╗   ██╗██╗     ███████╗████████╗
// ╚══███╔╝██╔═══██╗████╗  ██║██║   ██║██║     ██╔════╝╚══██╔══╝
//   ███╔╝ ██║   ██║██╔██╗ ██║██║   ██║██║     █████╗     ██║   
//  ███╔╝  ██║   ██║██║╚██╗██║██║   ██║██║     ██╔══╝     ██║   
// ███████╗╚██████╔╝██║ ╚████║╚██████╔╝███████╗███████╗   ██║   
// ╚══════╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ ╚══════╝╚══════╝   ╚═╝                                                              
// SPDX-License-Identifier: MIT

pragma solidity 0.8.7;

import "./ZonuletNFT.sol";
import "../openzeppelin/token/ERC721/extensions/ERC721Full.sol";
import "../openzeppelin/token/ERC20/IERC20.sol";
import "../openzeppelin/token/ERC20/extensions/IERC20Metadata.sol";
import "../openzeppelin/access/Ownable.sol";
import "../openzeppelin/utils/math/SafeMath.sol";
import "../openzeppelin/utils/math/SafeMathInt.sol";
import "../openzeppelin/utils/math/SafeMathUint.sol";
import "../openzeppelin/token/ERC20/ERC20.sol";

contract ZonuletNFTSale {

    address admin;
    ZonuletNFT public zonuletNFT;

    address public immutable ZONU = address(0x216eD590Cb7Ec3417CAb82699ae493522fECf580); 

    event BoughtNFT(uint256 _tokenId, address _buyer, uint256 _price);

    event GiftedNFT(uint256 _tokenId, address _gifter, address _receiver);

    constructor(ZonuletNFT _zonuletNFT) {
        admin = address(this);
        zonuletNFT = _zonuletNFT;
    }

    function BuyNFT(address _owner, uint256 _tokenId, uint256 _price) public payable {
        require(zonuletNFT.ownerOf(_tokenId) == _owner);
        uint price;
        (, , , , , , price) = zonuletNFT.imageData(_tokenId);
        require(_price == price);

        IERC20(ZONU).transferFrom(msg.sender, _owner, _price*1e18);
        zonuletNFT.transferFrom(_owner, msg.sender, _tokenId);
        zonuletNFT.nftSold(_tokenId);
        emit BoughtNFT(_tokenId, msg.sender, _price);
    }

    function AuctionSold(address _owner, uint256 _tokenId, uint256 _price) public payable {
        require(zonuletNFT.ownerOf(_tokenId) == _owner);
        uint price;
        (, , , , , , price) = zonuletNFT.imageData(_tokenId);
        require(_price == price);

        IERC20(ZONU).transferFrom(msg.sender, _owner, _price*1e18);
        zonuletNFT.transferFrom(_owner, msg.sender, _tokenId);
        zonuletNFT.nftSold(_tokenId);
        emit BoughtNFT(_tokenId, msg.sender, _price);
    }

    function GiftNFT(address _gifter, uint256 _tokenId, address _receiver) public payable {
        require(_gifter != _receiver);
        require(zonuletNFT.ownerOf(_tokenId) == msg.sender);
        require(msg.sender == _gifter, "Only owner can gift NFT");

        zonuletNFT.transferFrom(_gifter, _receiver, _tokenId);
        zonuletNFT.nftSold(_tokenId);
        emit GiftedNFT(_tokenId, _gifter, _receiver);
    }

}