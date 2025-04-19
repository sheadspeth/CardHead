// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract objectCard {
    enum Grading { HERALD, GUARDIAN, CRUSADER, ARCHON, LEGEND, ANCIENT, DIVINE }

    struct Card {
        string game;
        string series;
        string name;
        Grading grade;
        string edition;
        uint barcode;
        uint8 rating;
        string imageFront;
        string imageBack;
    }

    mapping(uint256 => Card) public cardDataBase;

    // Add a new card to the database
    function addCard(
        uint _barcode,
        string memory _name,
        string memory _game,
        string memory _series,
        Grading _grade,
        string memory _edition,
        uint8 _rating,
        string memory _imageFront,
        string memory _imageBack
    ) public {
        require(_rating <= 10, "Rating must be between 0 and 10");

        cardDataBase[_barcode] = Card({
            game: _game,
            series: _series,
            name: _name,
            grade: _grade,
            edition: _edition,
            barcode: _barcode,
            rating: _rating,
            imageFront: _imageFront,
            imageBack: _imageBack
        });
    }

    function getCard(uint _barcode) public view returns (
        string memory name,
        string memory game,
        string memory series,
        Grading grade,
        string memory edition,
        uint8 rating,
        string memory imageFront,
        string memory imageBack
    ) {
        Card memory c = cardDataBase[_barcode];
        return (c.name, c.game, c.series, c.grade, c.edition, c.rating, c.imageFront, c.imageBack);
    }
}
