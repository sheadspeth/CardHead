// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BuyerReview {
    mapping(address => uint256) public totalRating;  // Sum of all ratings for buyers
    mapping(address => uint256) public ratingCount;  // Count of reviews for buyers

    event BuyerReviewed(address indexed buyer, address indexed reviewer, uint8 rating);

    function rateBuyer(address buyer, uint8 rating) external {
        require(rating <= 5, "Rating must be 0-5");

        totalRating[buyer] += rating;
        ratingCount[buyer] += 1;

        emit BuyerReviewed(buyer, msg.sender, rating);
    }

    function getAverageBuyerRating(address buyer) external view returns (uint256) {
        require(ratingCount[buyer] > 0, "No ratings yet");
        return totalRating[buyer] / ratingCount[buyer];
    }
}