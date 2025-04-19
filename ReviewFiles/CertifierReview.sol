// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertifierReview {
    mapping(address => uint256) public totalRating;  // Sum of all ratings for certifiers
    mapping(address => uint256) public ratingCount;  // Count of reviews for certifiers

    event CertifierReviewed(address indexed certifier, address indexed reviewer, uint8 rating);

    function rateCertifier(address certifier, uint8 rating) external {
        require(rating <= 5, "Rating must be 0-5");

        totalRating[certifier] += rating;
        ratingCount[certifier] += 1;

        emit CertifierReviewed(certifier, msg.sender, rating);
    }

    function getAverageCertifierRating(address certifier) external view returns (uint256) {
        require(ratingCount[certifier] > 0, "No ratings yet");
        return totalRating[certifier] / ratingCount[certifier];
    }
}
