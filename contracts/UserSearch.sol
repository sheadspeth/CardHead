// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IObjectCardHead {
    function cardToOwner(uint cardId) external view returns (address);
    function userNames(address user) external view returns (string memory);
}

interface IReview {
    function getAverageBuyerRating(address buyer) external view returns (uint256);
    function getAverageSellerRating(address seller) external view returns (uint256);
    function getAverageCertifierRating(address certifier) external view returns (uint256);
}

contract UserSearch {
    IObjectCardHead public cardHeadContract;
    IReview public reviewContract;

    constructor(address _cardHead, address _review) {
        cardHeadContract = IObjectCardHead(_cardHead);
        reviewContract = IReview(_review);
    }

    function getUserSummary(address user, uint256[] memory cardIds)
        external
        view
        returns (string memory name, uint256[] memory userCards, uint256 buyerRating, uint256 sellerRating, uint256 certifierRating)
    {
        name = cardHeadContract.userNames(user);
        uint256 count = 0;

        // Temporary array to hold card IDs owned by the user
        uint256[] memory tempCards = new uint256[](cardIds.length);
        for (uint256 i = 0; i < cardIds.length; i++) {
            if (cardHeadContract.cardToOwner(cardIds[i]) == user) {
                tempCards[count] = cardIds[i];
                count++;
            }
        }

        // Resize the result array to the actual number of cards found
        userCards = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            userCards[i] = tempCards[i];
        }

        // Ratings (try/catch used for safe fallback in case of division by 0)
        try reviewContract.getAverageBuyerRating(user) returns (uint256 br) {
            buyerRating = br;
        } catch {
            buyerRating = 0;
        }

        try reviewContract.getAverageSellerRating(user) returns (uint256 sr) {
            sellerRating = sr;
        } catch {
            sellerRating = 0;
        }

        try reviewContract.getAverageCertifierRating(user) returns (uint256 cr) {
            certifierRating = cr;
        } catch {
            certifierRating = 0;
        }
    }
}
