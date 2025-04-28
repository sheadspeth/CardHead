let web3;
let contract;
let accounts;

let company;
let marketplace;
let objectCard;
let objectCardHead;
let review;

const companyABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "companyAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "name",
          "type": "string"
        }
      ],
      "name": "companyAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "companyAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "seriesName",
          "type": "string"
        }
      ],
      "name": "seriesAdded",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "companies",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        }
      ],
      "name": "addCompany",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_seriesName",
          "type": "string"
        }
      ],
      "name": "addSeries",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_companyAddr",
          "type": "address"
        }
      ],
      "name": "getCompanySeries",
      "outputs": [
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_companyAddr",
          "type": "address"
        }
      ],
      "name": "getCompanyName",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
const marketplaceABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_objectCardHeadAddress",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "cardId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "name": "CardListed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "cardId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "name": "CardSold",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "user1",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "card1",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "user2",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "card2",
          "type": "uint256"
        }
      ],
      "name": "TradeExecuted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "requester",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "offeredCard",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "requestedCard",
          "type": "uint256"
        }
      ],
      "name": "TradeRequested",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "listings",
      "outputs": [
        {
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "isActive",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "objectCardHead",
      "outputs": [
        {
          "internalType": "contract IcardHead",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "tradeRequests",
      "outputs": [
        {
          "internalType": "address",
          "name": "requester",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "offeredCardID",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "requestedCardID",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_cardId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_price",
          "type": "uint256"
        }
      ],
      "name": "listCard",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_cardID",
          "type": "uint256"
        }
      ],
      "name": "buyCard",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_offeredCardID",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_requestedCardID",
          "type": "uint256"
        }
      ],
      "name": "tradeCardRequest",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
const objectCardABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "barcode",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "name",
          "type": "string"
        }
      ],
      "name": "CardAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "barcode",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint8",
          "name": "rating",
          "type": "uint8"
        }
      ],
      "name": "CardCertified",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "cardDataBase",
      "outputs": [
        {
          "internalType": "string",
          "name": "game",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "series",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "enum objectCard.Grading",
          "name": "grade",
          "type": "uint8"
        },
        {
          "internalType": "string",
          "name": "edition",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "barcode",
          "type": "uint256"
        },
        {
          "internalType": "uint8",
          "name": "rating",
          "type": "uint8"
        },
        {
          "internalType": "string",
          "name": "imageFront",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "imageBack",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "cardToOwner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "certifiedCards",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "barcode",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "internalType": "uint8",
          "name": "rating",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_game",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_series",
          "type": "string"
        },
        {
          "internalType": "enum objectCard.Grading",
          "name": "_grade",
          "type": "uint8"
        },
        {
          "internalType": "string",
          "name": "_edition",
          "type": "string"
        },
        {
          "internalType": "uint8",
          "name": "_rating",
          "type": "uint8"
        },
        {
          "internalType": "string",
          "name": "_imageFront",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_imageBack",
          "type": "string"
        }
      ],
      "name": "addCard",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_barcode",
          "type": "uint256"
        }
      ],
      "name": "getCard",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "game",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "series",
          "type": "string"
        },
        {
          "internalType": "enum objectCard.Grading",
          "name": "grade",
          "type": "uint8"
        },
        {
          "internalType": "string",
          "name": "edition",
          "type": "string"
        },
        {
          "internalType": "uint8",
          "name": "rating",
          "type": "uint8"
        },
        {
          "internalType": "string",
          "name": "imageFront",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "imageBack",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getNextBarcode",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_barcode",
          "type": "uint256"
        },
        {
          "internalType": "uint8",
          "name": "_rating",
          "type": "uint8"
        }
      ],
      "name": "cardCertification",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "getCertifiedCard",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "barcode",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "internalType": "uint8",
          "name": "rating",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getCertifiedCardCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
const objectCardHeadABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "note",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "caller",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "cardID",
          "type": "uint256"
        }
      ],
      "name": "Debug",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "cardToOwner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "marketplace",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "userNames",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_marketplace",
          "type": "address"
        }
      ],
      "name": "setMarketplace",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        }
      ],
      "name": "createUser",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_cardId",
          "type": "uint256"
        }
      ],
      "name": "addCardToUser",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "cardID",
          "type": "uint256"
        }
      ],
      "name": "transferCardOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getMyName",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
const reviewABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "reviewer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint8",
          "name": "rating",
          "type": "uint8"
        }
      ],
      "name": "buyerReviewed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "certifier",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "reviewer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint8",
          "name": "rating",
          "type": "uint8"
        }
      ],
      "name": "certifierReviewed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "reviewer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint8",
          "name": "rating",
          "type": "uint8"
        }
      ],
      "name": "sellerReviewed",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "buyerRating",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "buyerRatingCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "certifierRating",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "certifierRatingCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "sellerRating",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "sellerRatingCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "internalType": "uint8",
          "name": "rating",
          "type": "uint8"
        }
      ],
      "name": "rateBuyer",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        }
      ],
      "name": "getAverageBuyerRating",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "internalType": "uint8",
          "name": "rating",
          "type": "uint8"
        }
      ],
      "name": "rateSeller",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "seller",
          "type": "address"
        }
      ],
      "name": "getAverageSellerRating",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "certifier",
          "type": "address"
        },
        {
          "internalType": "uint8",
          "name": "rating",
          "type": "uint8"
        }
      ],
      "name": "rateCertifier",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "certifier",
          "type": "address"
        }
      ],
      "name": "getAverageCertifierRating",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

// Paste deployed addresses from Truffle
/*const marketplaceAddress = "0x76AC9C576ac575885E0d0250ccd32136a62f142a";
const objectCardHeadAddress = "0xa5372EA635C5068427Ad251c8fb271BAC1dD0084";
const objectCardAddress = "0xEd8CEe3073B48b2B5028322F922fC997828E1129";
const companyAddress = "0x54806bC8faAf4739a60522EB2153b19bDb5dF979";
const reviewAddress = "0x740c5C3eD46e9a4A05dA0605B1b24b66c1cA1be6";*/

async function loadContracts() {
    const companyData = await fetch('/build/contracts/company.json').then(res => res.json());
    const marketplaceData = await fetch('/build/contracts/marketplace.json').then(res => res.json());
    const objectCardData = await fetch('/build/contracts/objectCard.json').then(res => res.json());
    const objectCardHeadData = await fetch('/build/contracts/objectCardHead.json').then(res => res.json());
    const reviewData = await fetch('/build/contracts/review.json').then(res => res.json());
  
    const networkId = await web3.eth.net.getId();
  
    company = new web3.eth.Contract(companyData.abi, companyData.networks[networkId].address);
    marketplace = new web3.eth.Contract(marketplaceData.abi, marketplaceData.networks[networkId].address);
    objectCard = new web3.eth.Contract(objectCardData.abi, objectCardData.networks[networkId].address);
    objectCardHead = new web3.eth.Contract(objectCardHeadData.abi, objectCardHeadData.networks[networkId].address);
    review = new web3.eth.Contract(reviewData.abi, reviewData.networks[networkId].address);
  }

window.addEventListener("load", async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        accounts = await web3.eth.getAccounts();
        
        //Contracts
       /* marketplace = new web3.eth.Contract(marketplaceABI, marketplaceAddress);
        objectCard = new web3.eth.Contract(objectCardABI, objectCardAddress);
        objectCardHead = new web3.eth.Contract(objectCardHeadABI, objectCardHeadAddress);
        company = new web3.eth.Contract(companyABI, companyAddress);
        review = new web3.eth.Contract(reviewABI, reviewAddress); */

        await loadContracts();
        const hasProfile = await checkIfUserExists(accounts[0]);
        if (!hasProfile) {
            document.getElementById("createAccountForm").style.display = "block";
        } else {
            await loadProfile();
            loadCards();
        }
    } else {
        alert("Please install MetaMask!");
    }
});

  async function checkIfUserExists(account) {
    try {
        const name = await objectCardHead.methods.getMyName().call({ from: account });
        console.log("Fetched username:", name);
        return name && name.length > 0; // return true if name exists
    } catch (err) {
        console.error("Error checking if user exists:", err);
        return false;
    }
  }

    async function uploadToIPFS(file) {
        const formData = new FormData();
        formData.append("file", file);
      
        const res = await fetch("http://127.0.0.1:5001/api/v0/add", {
          method: "POST",
          body: formData
        });
      
        const data = await res.json();
        const cid = data.Hash;
      
        return `http://127.0.0.1:8080/ipfs/${cid}`;
    }



    async function createAccount() {
        const username = document.getElementById('newUsername').value;
        const fileInput = document.getElementById('profileImage');
        const file = fileInput.files[0];
    
        if (!username || !file) {
            alert("Please enter a username and choose a profile picture");
            return;
        }
    
        try {
            // 1. Upload profile image to IPFS
            const ipfsUrl = await uploadToIPFS(file);
            console.log("Uploaded profile image to IPFS:", ipfsUrl);
    
            // 2. Create user on blockchain (only username for now)
            await objectCardHead.methods.createUser(username).send({ from: accounts[0] });
    
            // 3. Optionally store IPFS link in frontend localStorage (for now)
            localStorage.setItem("profileImage", ipfsUrl);
            localStorage.setItem("username", username);
    
            alert("Account created!");
    
            // 4. Refresh the page or load profile
            loadProfile();
        } catch (err) {
            console.error("Error creating account:", err);
            alert("Failed to create account.");
        }
    }

    async function uploadCard() {
        const name = document.getElementById('cardName').value;
        const fileInput = document.getElementById('cardImageFront');
        const file = fileInput.files[0];

        if(!name || !file) {
            alert("Please fill all fields");
            return;
        }

        const ipfsUrl = await uploadToIPFS(file);

        await objectCard.methods.addCard(
            name,
            "Pokemon", //game
            "Indigo League", //series
            1, //grade
            "First Edition", //edition
            1, //rating
            ipfsUrl,
            ipfsUrl
        ).send({ from: accounts[0] });

        alert("Card uploaded!");
    }

//Marketplace functions
    async function listCard() {
        const cardId = document.getElementById("cardId").value;
        const price = document.getElementById("price").value;

        try {
            await contract.methods.listCard(cardId, price).send({ from: accounts[0] });
            alert("Card listed!");
        } catch (err) {
            console.error(err);
            alert("Failed to list card.");
        }

        async function buyCard(cardId, priceInWei) {
            try {
                await marketplace.methods.buyCard(cardId).send({
                    from: accounts[0],
                    value: priceInWei // Must be in WEI
                });
                alert("Card purchased successfully!");
            } catch (err) {
                console.error("Error buying card:", err);
                alert("Failed to buy card.");
            }   
        }    

        async function requestTrade(offeredCardId, requestedCardId) {
            try {
                await marketplace.methods.tradeCardRequest(offeredCardId, requestedCardId).send({ from: accounts[0] });
                alert("Trade request sent!");
            } catch (err) {
                console.error("Error requesting trade:", err);
                alert("Failed to send trade request.");
            }
        }
        
        async function getListing(cardId) {
            try {
                const listing = await marketplace.methods.listings(cardId).call();
                console.log("Listing info:", listing);
                return listing;
            } catch (err) {
                console.error("Error getting listing:", err);
            }
        }
        
        async function getTradeRequest(userAddress) {
            try {
                const trade = await marketplace.methods.tradeRequests(userAddress).call();
                console.log("Trade request info:", trade);
                return trade;
            } catch (err) {
                console.error("Error getting trade request:", err);
            }
        }
 

//CardHead user functions  
    async function setMarketplace(newMarketplaceAddress) {
        try {
            await objectCardHead.methods.setMarketplace(newMarketplaceAddress).send({ from: accounts[0] });
            console.log("Marketplace address updated successfully!");
        } catch (error) {
            console.error("Error setting marketplace:", error);
        }
    } 

    // 2. createUser
    async function createUser(userName) {
        try {
            await objectCardHead.methods.createUser(userName).send({ from: accounts[0] });
            console.log("User created successfully!");
        } catch (error) {
            console.error("Error creating user:", error);
        }
    }

    // 3. addCardToUser
    async function addCardToUser(cardId) {
        try {
            await objectCardHead.methods.addCardToUser(cardId).send({ from: accounts[0] });
            console.log("Card assigned to user successfully!");
        } catch (error) {
            console.error("Error adding card to user:", error);
        }
    }

    // 4. transferCardOwnership
    async function transferCardOwnership(from, to, cardId) {
        try {
            await objectCardHead.methods.transferCardOwnership(from, to, cardId).send({ from: accounts[0] });
            console.log("Card ownership transferred successfully!");
        } catch (error) {
            console.error("Error transferring card ownership:", error);
        }
    }

    // 5. getMyName (view function, so .call() instead of .send())
    async function getMyName() {
        try {
            const name = await objectCardHead.methods.getMyName().call({ from: accounts[0] });
            console.log("User Name:", name);
            return name;
        } catch (error) {
            console.error("Error fetching user name:", error);
        }
    }



//Card object functions
    // 1. Add Card (skip rating, grade, images for now)
    async function addCard(name, game, series, edition) {
        try {
            const grade = 0; // Placeholder (HERALD) because Solidity enum needs a value
            const rating = 0; // Placeholder
            const emptyImage = "http://127.0.0.1:8080/ipfs/QmfTXudJJgBUG1prjmgRVwqz7MbSEeATKkZ7PcHiPdBvbd"; // Empty string for imageFront and imageBack

            await objectCard.methods.addCard(
                name,
                game,
                series,
                grade,  // sending default grade
                edition,
                rating, // sending default rating
                emptyImage, // front image
                emptyImage  // back image
            ).send({ from: accounts[0] });

            console.log("Card added successfully!");
        } catch (error) {
            console.error("Error adding card:", error);
        }
    }

    // 2. Certify Card (set rating and images later)
    async function cardCertification(barcode, rating, imageFront, imageBack) {
        try {
            // Update rating first using the cardCertification function
            await objectCard.methods.cardCertification(barcode, rating).send({ from: accounts[0] });
            console.log("Card certified with rating!");

            // Optionally, update images (if your Solidity supports it) - if not, this needs extra contract function.
            // Since your Solidity `objectCard` does not have an image update function separately,
            // You might want to add an "updateImages" function in Solidity if needed.

        } catch (error) {
            console.error("Error certifying card:", error);
        }
    }

    // 3. Get a single Card
    async function getCard(barcode) {
        try {
            const card = await objectCard.methods.getCard(barcode).call();
            console.log("Card info:", card);
            return card;
        } catch (error) {
            console.error("Error getting card:", error);
        }
    }

    // 4. Get next available barcode (for UI auto-filling maybe)
    async function getNextBarcode() {
        try {
            const nextBarcode = await objectCard.methods.getNextBarcode().call();
            console.log("Next available barcode:", nextBarcode);
            return nextBarcode;
        } catch (error) {
            console.error("Error fetching next barcode:", error);
        }
    }

    // 5. Get Certified Card Count (number of certified cards)
    async function getCertifiedCardCount() {
        try {
            const count = await objectCard.methods.getCertifiedCardCount().call();
            console.log("Certified card count:", count);
            return count;
        } catch (error) {
            console.error("Error getting certified card count:", error);
        }
    }

    // 6. Get certified card by index
    async function getCertifiedCard(index) {
        try {
            const cert = await objectCard.methods.getCertifiedCard(index).call();
            console.log("Certified Card:", cert);
            return cert;
        } catch (error) {
            console.error("Error fetching certified card:", error);
        }
    }



//Company functions
    // 1. Add a new Company
    async function addCompany(name) {
        try {
            await company.methods.addCompany(name).send({ from: accounts[0] });
            console.log("Company added successfully:", name);
        } catch (error) {
            console.error("Error adding company:", error);
        }
    }

    // 2. Add a Series under your Company
    async function addSeries(seriesName) {
        try {
            await company.methods.addSeries(seriesName).send({ from: accounts[0] });
            console.log("Series added successfully:", seriesName);
        } catch (error) {
            console.error("Error adding series:", error);
        }
    }

    // 3. Get all Series for a Company Address
    async function getCompanySeries(companyAddr) {
        try {
            const series = await company.methods.getCompanySeries(companyAddr).call();
            console.log("Series for company:", series);
            return series;
        } catch (error) {
            console.error("Error fetching series:", error);
        }
    }

    // 4. Get Company Name by Address
    async function getCompanyName(companyAddr) {
        try {
            const name = await company.methods.getCompanyName(companyAddr).call();
            console.log("Company name:", name);
            return name;
        } catch (error) {
            console.error("Error fetching company name:", error);
        }
    }



//Review functions
// 1. Rate a Buyer (0-5)
async function rateBuyer(buyerAddress, rating) {
    try {
        await review.methods.rateBuyer(buyerAddress, rating).send({ from: accounts[0] });
        console.log("Rated buyer:", buyerAddress, "Rating:", rating);
    } catch (error) {
        console.error("Error rating buyer:", error);
    }
}

// 2. Get Average Buyer Rating
async function getAverageBuyerRating(buyerAddress) {
    try {
        const avgRating = await review.methods.getAverageBuyerRating(buyerAddress).call();
        console.log("Average Buyer Rating:", avgRating);
        return avgRating;
    } catch (error) {
        console.error("Error fetching buyer rating:", error);
    }
}

// 3. Rate a Seller (0-5)
    async function rateSeller(sellerAddress, rating) {
        try {
            await review.methods.rateSeller(sellerAddress, rating).send({ from: accounts[0] });
            console.log("Rated seller:", sellerAddress, "Rating:", rating);
        } catch (error) {
            console.error("Error rating seller:", error);
        }
    }

    // 4. Get Average Seller Rating
    async function getAverageSellerRating(sellerAddress) {
        try {
            const avgRating = await review.methods.getAverageSellerRating(sellerAddress).call();
            console.log("Average Seller Rating:", avgRating);
            return avgRating;
        } catch (error) {
            console.error("Error fetching seller rating:", error);
        }
    }

    // 5. Rate a Certifier (0-5)
    async function rateCertifier(certifierAddress, rating) {
        try {
            await review.methods.rateCertifier(certifierAddress, rating).send({ from: accounts[0] });
            console.log("Rated certifier:", certifierAddress, "Rating:", rating);
        } catch (error) {
            console.error("Error rating certifier:", error);
        }
    }

    // 6. Get Average Certifier Rating
    async function getAverageCertifierRating(certifierAddress) {
        try {
            const avgRating = await review.methods.getAverageCertifierRating(certifierAddress).call();
            console.log("Average Certifier Rating:", avgRating);
            return avgRating;
        } catch (error) {
            console.error("Error fetching certifier rating:", error);
        }
    }


//html functions
    async function loadProfile() {
        try {
            const userName = await objectCardHead.methods.getMyName().call({ from: accounts[0] });

            // Try pulling profile picture from local storage
            const profileImage = localStorage.getItem("profileImage");

            document.getElementById("Name").innerText = userName;

            if (profileImage) {
                document.querySelector(".pfp img").src = profileImage;
            }
        } catch (err) {
            console.error("Error loading profile:", err);
        }
    }



    async function loadCards() {
        const cardContainer = document.querySelector(".scrolling-wrapper");
        cardContainer.innerHTML = ""; // Clear existing cards
    
        const nextBarcode = await objectCard.methods.getNextBarcode().call();
    
        for (let cardId = 1; cardId < nextBarcode; cardId++) {
        const owner = await objectCard.methods.cardToOwner(cardId).call();
    
        if (owner.toLowerCase() === accounts[0].toLowerCase()) {
            // User owns this card
            const cardData = await objectCard.methods.getCard(cardId).call();
    
            const cardDiv = document.createElement("div");
            cardDiv.className = "card";
    
            cardDiv.innerHTML = `
            <h2 class="cardName">${cardData.name}</h2>
            <h3 class="certifyName">Series: ${cardData.series}</h3>
            <img src="${cardData.imageFront}" alt="Card Image" />
            <button class="sell-button" onclick="sellCard(${cardId})">Sell</button>
            `;
    
            cardContainer.appendChild(cardDiv);
        }
        }
    }



    async function sellCard(cardId) {
    const price = prompt("Enter price in WEI:");
    if (!price) return;

    try {
        await marketplace.methods.listCard(cardId, price).send({ from: accounts[0] });
        alert("Card listed for sale!");
    } catch (error) {
        console.error("Failed to list card:", error);
    }
    } 
}
