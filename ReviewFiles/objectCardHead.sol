// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract objectCardHead {

    address public marketplace;
    address public owner;

    struct User{
        string name;
        uint[] ownedCardIds;
    }

    mapping(address => User) public users;

    event Debug(string note, address caller, address from, address to, uint cardID);

    constructor() {
        owner = msg.sender;
    }

    function setMarketplace(address _marketplace) public {
        require(msg.sender == owner, "Only owner can set marketplace");
        marketplace = _marketplace;
    }

    function createUser(string memory _name) public {
        require(bytes(users[msg.sender].name).length == 0, "User already exists");
        users[msg.sender].name = _name;
    }

    function addCardToUser(uint _cardId) public {
        require(bytes(users[msg.sender].name).length > 0, "Create user first");
        users[msg.sender].ownedCardIds.push(_cardId);
    }

    function getMyCards() public view returns (uint[] memory) {
        return users[msg.sender].ownedCardIds;
    }

    function getMyName() public view returns (string memory) {
        return users[msg.sender].name;
    }

    function transferCardOwnership(address from, address to, uint cardID) public {
        emit Debug("Entered transferCardOwnership", msg.sender, from, to, cardID);
        require(msg.sender == marketplace, "Only marketplace can transfer");

            uint[] storage fromCards = users[from].ownedCardIds;
    bool found = false;

    for (uint i = 0; i < fromCards.length; i++) {
        if (fromCards[i] == cardID) {
            fromCards[i] = fromCards[fromCards.length - 1]; // move last item to this index
            fromCards.pop(); // remove last item
            found = true;
            break;
        }
    }

    require(found, "Card not found in sender's inventory");

        users[to].ownedCardIds.push(cardID);
    }
}