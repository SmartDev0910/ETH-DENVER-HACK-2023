// ███████╗ ██████╗ ███╗   ██╗██╗   ██╗██╗     ███████╗████████╗
// ╚══███╔╝██╔═══██╗████╗  ██║██║   ██║██║     ██╔════╝╚══██╔══╝
//   ███╔╝ ██║   ██║██╔██╗ ██║██║   ██║██║     █████╗     ██║   
//  ███╔╝  ██║   ██║██║╚██╗██║██║   ██║██║     ██╔══╝     ██║   
// ███████╗╚██████╔╝██║ ╚████║╚██████╔╝███████╗███████╗   ██║   
// ╚══════╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ ╚══════╝╚══════╝   ╚═╝                                                              
// zonulet.io
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract ZonuletAvatars {
    mapping (address => string) private ipfsHashes;
    mapping (address => string) private mimeTypes;
    mapping (address => string) private names;
    mapping (address => string) private bios;
    mapping (address => string) private twitters;
    mapping (address => string) private instagrams;
    mapping (address => string) private websites;
    mapping (address => string) private emails;

    
    address[] public updates;

    event SetAvatar(address indexed hashAddress, string hash, string mimetype);

    function setAvatar(
        string memory hash, 
        string memory mimetype, 
        string memory name, 
        string memory bio, 
        string memory twitter, 
        string memory instagram, 
        string memory website, 
        string memory email) public {
        require(bytes(hash).length == 46);
        require(bytes(mimetype).length > 0);
        
        updates.push(msg.sender);
        
        ipfsHashes[msg.sender] = hash;
        mimeTypes[msg.sender] = mimetype;
        names[msg.sender] = name;
        bios[msg.sender] = bio;
        twitters[msg.sender] = twitter;
        emails[msg.sender] = email;
        instagrams[msg.sender] = instagram;
        websites[msg.sender] = website;

        emit SetAvatar(msg.sender, hash, mimetype);
    }

    function getIPFSHash(address hashAddress) public view returns (string memory) {
        return ipfsHashes[hashAddress];
    }

    function getMIMEType(address hashAddress) public view returns (string memory) {
        return mimeTypes[hashAddress];
    }
    
    function getName(address hashAddress) public view returns (string memory) {
        return names[hashAddress];
    }
    
    function getBio(address hashAddress) public view returns (string memory) {
        return bios[hashAddress];
    }
    
    function getTwitter(address hashAddress) public view returns (string memory) {
        return twitters[hashAddress];
    }

    function getInstagram(address hashAddress) public view returns (string memory) {
        return instagrams[hashAddress];
    }

    function getWebsite(address hashAddress) public view returns (string memory) {
        return websites[hashAddress];
    }   

    function getEmail(address hashAddress) public view returns (string memory) {
        return emails[hashAddress];
    }

    function UpdateCount() public view returns (uint) {
        return updates.length;
    }
}