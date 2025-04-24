// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract review {
    mapping(address => uint256) public buyerRatingCount;  //count of people that have reviewed this buyer
    mapping(address => uint256) public sellerRatingCount;  //count of people that have reviewed this seller
    mapping(address => uint256) public certifierRatingCount;  //count of people that have reviewed this certifier


    mapping(address => uint256) public buyerRating;
    mapping(address => uint256) public sellerRating;
    mapping(address => uint256) public certifierRating;

    event buyerReviewed(address indexed buyer, address indexed reviewer, uint8 rating);
    event sellerReviewed(address indexed seller, address indexed reviewer, uint8 rating);
    event certifierReviewed(address indexed certifier, address indexed reviewer, uint8 rating);

    function rateBuyer(address buyer, uint8 rating) external {
        require(rating <= 5, "Rating must be 0-5");

        buyerRating[buyer] += rating;
        buyerRatingCount[buyer] += 1;

        emit buyerReviewed(buyer, msg.sender, rating);
    }

    function getAverageBuyerRating(address buyer) external view returns (uint256) {
        require(buyerRatingCount[buyer] > 0, "No ratings yet");
        return buyerRating[buyer] / buyerRatingCount[buyer];
    }
    function rateSeller(address seller, uint8 rating) external {
        require(rating <= 5, "Rating must be 0-5");

        sellerRating[seller] += rating;
        sellerRatingCount[seller] += 1;

        emit sellerReviewed(seller, msg.sender, rating);
    }

    function getAverageSellerRating(address seller) external view returns (uint256) {
        require(sellerRatingCount[seller] > 0, "No ratings yet");
        return sellerRating[seller] / sellerRatingCount[seller];
    }

        function rateCertifier(address certifier, uint8 rating) external {
        require(rating <= 5, "Rating must be 0-5");

        certifierRating[certifier] += rating;
        certifierRatingCount[certifier] += 1;

        emit certifierReviewed(certifier, msg.sender, rating);
    }

    function getAverageCertifierRating(address certifier) external view returns (uint256) {
        require(certifierRatingCount[certifier] > 0, "No ratings yet");
        return certifierRating[certifier] / certifierRatingCount[certifier];
    }
}