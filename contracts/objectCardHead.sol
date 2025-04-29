// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract objectCardHead {
    address public marketplace;
    address public owner;

    mapping(uint => address) public cardToOwner;
    address[] public userList;

    struct UserProfile {
        string username;
        string profileImage; // IPFS link to profile picture
        string bio;
    }

    mapping(address => UserProfile) public userProfiles;

    event Debug(string note, address caller, address from, address to, uint cardID);

    constructor() {
        owner = msg.sender;
    }

    function setMarketplace(address _marketplace) public {
        require(msg.sender == owner, "Only owner can set marketplace");
        marketplace = _marketplace;
    }

    function createUser(string memory _username, string memory _profileImage) public {
        require(bytes(userProfiles[msg.sender].username).length == 0, "User already exists");

        userProfiles[msg.sender] = UserProfile({
            username: _username,
            profileImage: _profileImage,
            bio: ""
        });

        userList.push(msg.sender); // 🔥 NEW: Save user's address
    }

    function getAllUsers() public view returns (address[] memory) {
        return userList;
    }

    function updateBio(string memory _bio) public {
        require(bytes(userProfiles[msg.sender].username).length > 0, "User does not exist");
        userProfiles[msg.sender].bio = _bio;
    }

    function updateProfileImage(string memory _newImage) public {
    require(bytes(userProfiles[msg.sender].username).length > 0, "Profile not found, create account first");
    userProfiles[msg.sender].profileImage = _newImage;
}


    function addCardToUser(uint _cardId) public {
        require(bytes(userProfiles[msg.sender].username).length > 0, "Create user first");
        require(cardToOwner[_cardId] == address(0), "Card already assigned");
        cardToOwner[_cardId] = msg.sender;
    }

    function transferCardOwnership(address from, address to, uint cardID) public {
        emit Debug("Entered transferCardOwnership", msg.sender, from, to, cardID);
        require(msg.sender == marketplace, "Only marketplace can transfer");
        require(cardToOwner[cardID] == from, "Sender does not own this card");

        cardToOwner[cardID] = to;
    }

    function getMyName() public view returns (string memory) {
        return userProfiles[msg.sender].username;
    }

    function getUserProfile(address user) public view returns (string memory, string memory, string memory) {
        UserProfile memory p = userProfiles[user];
        return (p.username, p.profileImage, p.bio);
    }
}
