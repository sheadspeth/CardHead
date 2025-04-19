// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SellerReview {
    mapping(address => uint256) public totalRating;  // Sum of all ratings for sellers
    mapping(address => uint256) public ratingCount;  // Count of reviews for sellers

    event SellerReviewed(address indexed seller, address indexed reviewer, uint8 rating);

    function rateSeller(address seller, uint8 rating) external {
        require(rating <= 5, "Rating must be 0-5");

        totalRating[seller] += rating;
        ratingCount[seller] += 1;

        emit SellerReviewed(seller, msg.sender, rating);
    }

    function getAverageSellerRating(address seller) external view returns (uint256) {
        require(ratingCount[seller] > 0, "No ratings yet");
        return totalRating[seller] / ratingCount[seller];
    }
}
