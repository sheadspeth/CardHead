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

    struct Certify {
        uint barcode;
        address user;
        uint8 rating;
    }

    uint private nextBarcode = 1;

    mapping(uint256 => Card) public cardDataBase;
    mapping(uint => address) public cardToOwner;
    Certify[] public certifiedCards;

    event CardAdded(uint barcode, string name);
    event CardCertified(uint barcode, address user, uint8 rating);

    // Add a new card to the database
    function addCard(
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

        uint currentBarcode = nextBarcode;

        cardDataBase[currentBarcode] = Card({
            game: _game,
            series: _series,
            name: _name,
            grade: _grade,
            edition: _edition,
            barcode: currentBarcode,
            rating: _rating,
            imageFront: _imageFront,
            imageBack: _imageBack
        });

        cardToOwner[currentBarcode] = msg.sender;

        emit CardAdded(currentBarcode, _name);

        nextBarcode++;
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

    function getNextBarcode() public view returns (uint) {
        return nextBarcode;
    }

    function cardCertification(uint _barcode, uint8 _rating) public {
        require(_barcode > 0 && _barcode < nextBarcode,"Card does not exist");
        require(_rating <= 10,"Rating must be between 0 and 10");

        certifiedCards.push(Certify({
            barcode: _barcode,
            user: msg.sender,
            rating: _rating
        }));

        emit CardCertified(_barcode, msg.sender, _rating);
    }

    
    function getCertifiedCard(uint index) public view returns (
        uint barcode,
        address user,
        uint8 rating
    ) {
        require(index < certifiedCards.length, "Invalid index");
        Certify memory cert = certifiedCards[index];
        return (cert.barcode, cert.user, cert.rating);
    }

    
    function getCertifiedCardCount() public view returns (uint) {
        return certifiedCards.length;
    }
}

