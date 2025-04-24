// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract objectCardHead {
    address public marketplace;
    address public owner;

    mapping(uint => address) public cardToOwner;
    mapping(address => string) public userNames;

    event Debug(string note, address caller, address from, address to, uint cardID);

    constructor() {
        owner = msg.sender;
    }

    function setMarketplace(address _marketplace) public {
        require(msg.sender == owner, "Only owner can set marketplace");
        marketplace = _marketplace;
    }

    function createUser(string memory _name) public {
        require(bytes(userNames[msg.sender]).length == 0, "User already exists");
        userNames[msg.sender] = _name;
    }

    function addCardToUser(uint _cardId) public {
        require(bytes(userNames[msg.sender]).length > 0, "Create user first");
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
        return userNames[msg.sender];
    }
}
