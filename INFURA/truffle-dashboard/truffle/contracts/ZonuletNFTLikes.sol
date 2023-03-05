// ███████╗ ██████╗ ███╗   ██╗██╗   ██╗██╗     ███████╗████████╗
// ╚══███╔╝██╔═══██╗████╗  ██║██║   ██║██║     ██╔════╝╚══██╔══╝
//   ███╔╝ ██║   ██║██╔██╗ ██║██║   ██║██║     █████╗     ██║   
//  ███╔╝  ██║   ██║██║╚██╗██║██║   ██║██║     ██╔══╝     ██║   
// ███████╗╚██████╔╝██║ ╚████║╚██████╔╝███████╗███████╗   ██║   
// ╚══════╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ ╚══════╝╚══════╝   ╚═╝                                                              
// zonulet.io
// SPDX-License-Identifier: MIT

pragma solidity >0.6.2;

import "./ZonuletNFT.sol";
import "../openzeppelin/token/ERC20/IERC20.sol";
import "../openzeppelin/token/ERC20/extensions/IERC20Metadata.sol";
import "../openzeppelin/access/Ownable.sol";
import "../openzeppelin/utils/math/SafeMath.sol";
import "../openzeppelin/SafeMathInt.sol";
import "../openzeppelin/SafeMathUint.sol";
import "../openzeppelin/token/ERC20/ERC20.sol";


contract ZonuletNFTLikes {

    address admin;
    ZonuletNFT public zonuletNFT;

    address public immutable ZONU = address(0x216eD590Cb7Ec3417CAb82699ae493522fECf580); 

    event LikedNFT(uint256 _tokenId, address _liker);

    event PacmanedNFT(uint256 _tokenId, address _pacmaniser);

    address public owner;

    constructor(ZonuletNFT _zonuletNFT) {
        admin = address(this);
        owner = msg.sender;
        zonuletNFT = _zonuletNFT;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    uint256 pacmanprice = 1;

    struct NFTLikes {
        uint likes;
        uint nftId;
    }

    struct NFTPacmans {
        uint pacmans;
        uint nftId;
    }

    struct Liker {
        uint totallikes;
        uint[] nfts;
    }

    struct Pacmaniser {
        uint totalpacman;
        uint[] nfts;
    }

    mapping(uint => NFTLikes) public nftLikes;
    mapping(uint => NFTPacmans) public nftPacmans;

    mapping(address => Liker) public likers;
    mapping(address => Pacmaniser) public pacmanisers;

    function LikeNFT(address _owner, uint256 _tokenId) public payable {
        require(zonuletNFT.ownerOf(_tokenId) == _owner);
        require(_tokenId <= zonuletNFT.totalSupply());

        nftLikes[_tokenId].likes += 1;
        nftLikes[_tokenId].nftId = _tokenId; 
        likers[msg.sender].totallikes += 1;
        likers[msg.sender].nfts.push(_tokenId);

        emit LikedNFT(_tokenId, msg.sender);
    }

    function PacmanNFT(address _minter, uint256 _tokenId) public payable {
        require(msg.sender != _minter);
        require(_tokenId <= zonuletNFT.totalSupply());

        nftPacmans[_tokenId].pacmans += 1;
        nftPacmans[_tokenId].nftId = _tokenId;
        pacmanisers[msg.sender].totalpacman += 1;
        pacmanisers[msg.sender].nfts.push(_tokenId);

        IERC20(ZONU).transferFrom(msg.sender, _minter, pacmanprice*1e18);
        emit PacmanedNFT(_tokenId, msg.sender);
    }

    function setPacmanPrice(uint256 _pacmanprice) public onlyOwner {
        require(msg.sender == owner);
        pacmanprice = _pacmanprice;
    }

    function getPacmanPrice() public view returns (uint256) {
        return pacmanprice;
    }

}