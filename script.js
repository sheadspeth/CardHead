let web3;
let contract;
let accounts;

let company;
let marketplace;
let objectCard;
let objectCardHead;
let review;

const companyABI = [/* Paste company ABI here */];
const marketplaceABI = [/* Paste marketplace ABI here */];
const objectCardABI = [/* Paste objectCard ABI here */];
const objectCardHeadABI = [/* Paste objectCardHead ABI here */];
const reviewABI = [/* Paste review ABI here */];

// Paste deployed addresses from Truffle
const companyAddress = "0x...";
const marketplaceAddress = "0x...";
const objectCardAddress = "0x...";
const objectCardHeadAddress = "0x...";
const reviewAddress = "0x...";

window.addEventListener("load", async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        accounts = await web3.eth.getAccounts();
        contract = new web3.eth.Contract(contractABI, contractAddress);
    } else {
        alert("Please install MetaMask!");
    }
});

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
}
