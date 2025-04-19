// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract objectCardHead {

    struct User{
        string name;
        uint[] ownedCardIds;
    }

    mapping(address => User) public users;

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
}