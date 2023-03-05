// ███████╗ ██████╗ ███╗   ██╗██╗   ██╗██╗     ███████╗████████╗
// ╚══███╔╝██╔═══██╗████╗  ██║██║   ██║██║     ██╔════╝╚══██╔══╝
//   ███╔╝ ██║   ██║██╔██╗ ██║██║   ██║██║     █████╗     ██║   
//  ███╔╝  ██║   ██║██║╚██╗██║██║   ██║██║     ██╔══╝     ██║   
// ███████╗╚██████╔╝██║ ╚████║╚██████╔╝███████╗███████╗   ██║   
// ╚══════╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ ╚══════╝╚══════╝   ╚═╝                                                              
// SPDX-License-Identifier: MIT

pragma solidity 0.8.7;

import "../openzeppelin/token/ERC721/extensions/ERC721Full.sol";
import "../openzeppelin/token/ERC721/extensions/IERC721Metadata.sol";


contract ZonuletNFT is IERC721Metadata, ERC721Full{

  struct metadata { 
    string name;
    string mimeType;
    string ipfsData;
    string category;
    string description;
    string url;
    uint price;
  }

  string[] public images;
  string[] public categories;
  string[] public mimetypes;
  mapping(uint => metadata) public imageData;
  mapping(string => bool) _imageExists;

  mapping(uint => bool) _listedForAuction;
  mapping(uint => bool) _listedForSale;


  struct auctionData { 
  uint price;
  uint time;
  }
  mapping(uint => auctionData) tokenAuction;


  constructor() ERC721("ZonuletNFT", "ZonuNFT")  {}

  function mint(string memory _name, string memory _mimeType, string memory _ipfsData, string memory _category, string memory _description, string memory _url, uint _price) public returns (uint){
    require(!_imageExists[_name]);

    metadata memory md;
    md.name = _name;
    md.mimeType = _mimeType;
    md.ipfsData = _ipfsData;
    md.category = _category;
    md.description = _description;
    md.url = _url;
    md.price = _price;
    
    images.push(_name);
    categories.push(_category);
    mimetypes.push(_mimeType);
    uint _id = images.length -1;
    imageData[_id] = md;
    _mint(msg.sender, _id);
    _imageExists[_name] = true;

    return _id;
  }

  function approveNFT(address _to, uint _tokenId) public {
    approve(_to, _tokenId);
  }
  
  function isApprovedOrOwner(address _address, uint _tokenId) public view returns (bool){
    return _isApprovedOrOwner(_address, _tokenId);
  }

  function updatePrice(uint _id, uint _price) public returns (bool){
    require(ownerOf(_id) == msg.sender);
    imageData[_id].price = _price;

    return true;
  }

  function approveForSale(address _to, uint _tokenId, uint _price) public {
    require(_listedForAuction[_tokenId] == false);
    _listedForSale[_tokenId] = true;
    updatePrice(_tokenId, _price);
    approveNFT(_to, _tokenId);
  }

  function approveForAuction(address _to, uint _tokenId, uint _price, uint _time) public {
    require(_listedForSale[_tokenId] == false);
    _listedForAuction[_tokenId] = true;
    // updatePrice(_tokenId, _price);
    approveNFT(_to, _tokenId);

    auctionData memory ad;
    ad.price = _price;
    ad.time = _time;

    tokenAuction[_tokenId] = ad;
  }

  function nftSold(uint _tokenId) public {
    _listedForSale[_tokenId] = false;
    _listedForAuction[_tokenId] = false;
  }

}