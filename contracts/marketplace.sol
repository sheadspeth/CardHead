// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

    interface ICard {
        function cardToOwner(uint cardID) external view returns (address);
        function transferCardOwnership(address from, address to, uint cardID) external;
    }


contract marketplace{
    ICard public objectCard;

    constructor(address _objectCardAddress) {
        objectCard = ICard(_objectCardAddress);
    }

    struct Listing {
        address seller;
        uint price;
        bool isActive;
    }

    struct TradeRequest {
        address requester;
        uint offeredCardID;
        uint requestedCardID;
    }

    mapping(uint => Listing) public listings;
    mapping(address => TradeRequest) public tradeRequests;


    event CardListed(uint cardId, address seller, uint price);
    event CardSold(uint cardId, address buyer, uint price);
    event TradeExecuted(address user1, uint card1, address user2, uint card2);
    event TradeRequested(address requester, uint offeredCard, uint requestedCard);

    // List a card for sale
    function listCard(uint _cardId, uint _price) public {
        require(_price > 0, "Price must be greater than 0");

        require(objectCard.cardToOwner(_cardId) == msg.sender, "You do not own this card");

        listings[_cardId] = Listing(msg.sender, _price, true);
        emit CardListed(_cardId, msg.sender, _price);
    }

    function buyCard(uint _cardID) public payable {
        Listing storage listing = listings[_cardID];
        require(listing.isActive, "Card is not for sale");
        require(msg.value >= listing.price, "Ether sent is insufficient.");

        address seller = listing.seller;
        listing.isActive = false;

        payable(seller).transfer(listing.price);
        objectCard.transferCardOwnership(seller, msg.sender, _cardID);

        emit CardSold(_cardID, msg.sender, listing.price);
    }

    function tradeCardRequest(uint _offeredCardID, uint _requestedCardID) public {
        require(objectCard.cardToOwner(_offeredCardID) == msg.sender, "You do not own the offered card");

        // Check for a matching trade request
        address possibleMatch = objectCard.cardToOwner(_requestedCardID);

        TradeRequest memory theirRequest = tradeRequests[possibleMatch];

        bool isMutualTrade =
            theirRequest.offeredCardID == _requestedCardID &&
            theirRequest.requestedCardID == _offeredCardID &&
            theirRequest.requester == possibleMatch;

        if (isMutualTrade) {
            // Swap ownership
            objectCard.transferCardOwnership(msg.sender, possibleMatch, _offeredCardID);
            objectCard.transferCardOwnership(possibleMatch, msg.sender, _requestedCardID);

            // Clear requests
            delete tradeRequests[possibleMatch];
            delete tradeRequests[msg.sender];

            emit TradeExecuted(msg.sender, _offeredCardID, possibleMatch, _requestedCardID);
        } else {
            // Store the trade request
            tradeRequests[msg.sender] = TradeRequest({
                requester: msg.sender,
                offeredCardID: _offeredCardID,
                requestedCardID: _requestedCardID
            });

            emit TradeRequested(msg.sender, _offeredCardID, _requestedCardID);
        }
    }
}
