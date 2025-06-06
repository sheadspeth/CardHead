let web3;
let contract;
let accounts;

let company;
let marketplace;
let objectCard;
let objectCardHead;
let review;


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


async function loadProfile() {
try {
    const userAddress = accounts[0];

    // Fetch user profile from blockchain
    const profile = await objectCardHead.methods.getUserProfile(userAddress).call();
    const username = profile[0];
    const profileImage = profile[1];
    const bio = profile[2];

    // Fetch ratings from review contract
    let buyerRating = 0;
    let sellerRating = 0;
    let certifierRating = 0;

    try {
        buyerRating = await review.methods.getAverageBuyerRating(userAddress).call();
    } catch (err) {
        console.warn("No buyer ratings yet.");
    }

    try {
        sellerRating = await review.methods.getAverageSellerRating(userAddress).call();
    } catch (err) {
        console.warn("No seller ratings yet.");
    }

    try {
        certifierRating = await review.methods.getAverageCertifierRating(userAddress).call();
    } catch (err) {
        console.warn("No certifier ratings yet.");
    }

    // Update Name
    const nameElement = document.getElementById("Name");
    if (nameElement) {
        nameElement.innerText = username || "Unnamed User";
    }

    // Update Profile Image
    const imgElement = document.querySelector(".pfp img");
    if (imgElement) {
        imgElement.src = profileImage || "default.png";
    }

    // Update Bio
    const bioElement = document.getElementById("Bio");
    if (bioElement) {
        bioElement.innerText = bio || "No bio yet.";
    }

    // Update Ratings
    const buyerRatingElement = document.getElementById("buyerRating");
    if (buyerRatingElement) {
        buyerRatingElement.innerText = `buyerRating: ⭐ ${buyerRating}`;
    }

    const sellerRatingElement = document.getElementById("sellerRating");
    if (sellerRatingElement) {
        sellerRatingElement.innerText = `sellerRating: ⭐ ${sellerRating}`;
    }

    const certifyRatingElement = document.getElementById("certifyRating");
    if (certifyRatingElement) {
        certifyRatingElement.innerText = `certifyRating: ⭐ ${certifierRating}`;
    }

} catch (err) {
    console.error("Error loading profile:", err);
}
}

async function loadUserProfile(userAddress) {
    try {
        const profile = await objectCardHead.methods.getUserProfile(userAddress).call();
        const username = profile[0];
        const profileImage = profile[1];
        const bio = profile[2];

        let buyerRating = 0;
        let sellerRating = 0;
        let certifierRating = 0;

        try {
            buyerRating = await review.methods.getAverageBuyerRating(userAddress).call();
        } catch (err) {
            console.warn("No buyer ratings yet.");
        }

        try {
            sellerRating = await review.methods.getAverageSellerRating(userAddress).call();
        } catch (err) {
            console.warn("No seller ratings yet.");
        }

        try {
            certifierRating = await review.methods.getAverageCertifierRating(userAddress).call();
        } catch (err) {
            console.warn("No certifier ratings yet.");
        }

        // Update the profile section
        const nameElement = document.getElementById("Name");
        if (nameElement) {
            nameElement.innerText = username || "Unnamed User";
        }

        const imgElement = document.querySelector(".pfp img");
        if (imgElement) {
            imgElement.src = profileImage || "default.png";
        }

        const bioElement = document.getElementById("Bio");
        if (bioElement) {
            bioElement.innerText = bio || "No bio yet.";
        }

        const buyerRatingElement = document.getElementById("buyerRating");
        if (buyerRatingElement) {
            buyerRatingElement.innerText = `buyerRating: ⭐ ${buyerRating}`;
        }

        const sellerRatingElement = document.getElementById("sellerRating");
        if (sellerRatingElement) {
            sellerRatingElement.innerText = `sellerRating: ⭐ ${sellerRating}`;
        }

        const certifyRatingElement = document.getElementById("certifyRating");
        if (certifyRatingElement) {
            certifyRatingElement.innerText = `certifyRating: ⭐ ${certifierRating}`;
        }

        // 🧠 Load the user's cards
        await loadUserCards(userAddress);

    } catch (err) {
        console.error("Error loading searched user profile:", err);
    }
}

async function loadUserCards(userAddress) {
    const cardContainer = document.querySelector(".scrolling-wrapper");

    if (!cardContainer) {
        console.log("No card container found. Skipping loading cards.");
        return;
    }

    cardContainer.innerHTML = "";

    const spacer = document.createElement("div");
    spacer.className = "card";
    spacer.style.visibility = "hidden";
    spacer.style.pointerEvents = "none";
    cardContainer.appendChild(spacer);

    const nextBarcode = await objectCard.methods.getNextBarcode().call();

    for (let cardId = 1; cardId < nextBarcode; cardId++) {
        const owner = await objectCard.methods.cardToOwner(cardId).call();

        if (owner.toLowerCase() === userAddress.toLowerCase()) {
            const cardData = await objectCard.methods.getCard(cardId).call();

            let certifierName = "None";
            if (cardData.certifierAddress !== "0x0000000000000000000000000000000000000000") {
                try {
                    certifierName = await objectCardHead.methods.getMyName().call({ from: cardData.certifierAddress });
                } catch (err) {
                    console.warn("Could not fetch certifier name:", err);
                }
            }

            const cardDiv = document.createElement("div");
            cardDiv.className = "card";

            cardDiv.innerHTML = `
                <h2 class="cardName">${cardData.name} ID: ${cardId}</h2>
                <h3 class="certifyName">Rating: ${cardData.rating}/10<br>Certified by: ${certifierName}</h3>
                <img src="${cardData.imageFront}" alt="Card Image" />
                <button class="certify-button" onclick="certifyCard(${cardId})">Certify</button>
            `;

            cardContainer.appendChild(cardDiv);
        }
    }
}




async function searchUserProfile() {
const usernameToSearch = document.getElementById('searchUsername').value.trim();

if (!usernameToSearch) {
    alert("Please enter a username to search.");
    return;
}

try {
    const allUsers = await objectCardHead.methods.getAllUsers().call();
    let foundUserAddress = null;

    for (const addr of allUsers) {
        const name = await objectCardHead.methods.getMyName().call({ from: addr });
        if (name.toLowerCase() === usernameToSearch.toLowerCase()) {
            foundUserAddress = addr;
            break;
        }
    }

    if (!foundUserAddress) {
        alert("User not found!");
        return;
    }

    console.log("Found user address:", foundUserAddress);

    await loadUserProfile(foundUserAddress); // 🧠 load their profile + cards!

} catch (error) {
    console.error("Error searching for user:", error);
    alert("Failed to search for user.");
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


    async function buyCard(cardId, priceInWei) {
        try {
            await marketplace.methods.buyCard(cardId).send({
                from: accounts[0],
                value: priceInWei // Must be in WEI
            });
            alert("Card purchased successfully!");

            await loadMarketplaceCards();
        } catch (err) {
            console.error("Error buying card:", err);
            alert("Failed to buy card.");
        }   
    }    

    async function certifyCard(cardId) {
        const rating = prompt("Enter your rating for this card (1-10):");
        
        if (rating === null || rating.trim() === "" || isNaN(rating) || rating < 1 || rating > 10) {
            alert("Invalid rating. Please enter a number between 1 and 10.");
            return;
        }
    
        try {
            await objectCard.methods.cardCertification(cardId, parseInt(rating)).send({ from: accounts[0] });
            alert("Card certified successfully!");
    
            // Optional: Reload cards if you want to update the view after certification
            const searchedUsername = document.getElementById('searchUsername').value.trim();
            if (searchedUsername) {
                await searchUserProfile(); // Refresh search view
            }
        } catch (error) {
            console.error("Certification failed:", error);
            alert("Failed to certify the card.");
        }
    }
    
    async function submitTrade() {
        const offeredCardId = document.getElementById('offeredCardId').value.trim();
        const requestedCardId = document.getElementById('requestedCardId').value.trim();
    
        if (!offeredCardId || !requestedCardId) {
            alert("Please enter both the offered and requested Card IDs.");
            return;
        }
    
        try {
            await marketplace.methods.tradeCardRequest(offeredCardId, requestedCardId).send({ from: accounts[0] });
            alert("Trade request submitted successfully!");
        } catch (err) {
            console.error("Error submitting trade request:", err);
            alert("Failed to submit trade request. See console for details.");
        }
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
    await loadMarketplaceCards();
    const hasProfile = await checkIfUserExists(accounts[0]);
    if (!hasProfile) {
        document.getElementById("createAccountForm").style.display = "block";
    } else {
        await loadProfile();
        loadMyCards();
    }
} else {
    alert("Please install MetaMask!");
}
});

async function loadMarketplaceCards() {
const container = document.querySelector(".marketplace-container");

if (!container) {
    console.log("No marketplace container found. Skipping loading marketplace cards.");
    return;
}

container.innerHTML = ""; // Clear previous listings

const nextBarcode = await objectCard.methods.getNextBarcode().call();

for (let cardId = 1; cardId < nextBarcode; cardId++) {
    const listing = await marketplace.methods.listings(cardId).call();

    if (listing.isActive) { // Only display active listings
        const cardData = await objectCard.methods.getCard(cardId).call();

        const cardDiv = document.createElement("div");
        cardDiv.className = "card";

        const priceInEther = web3.utils.fromWei(listing.price, 'ether');

        cardDiv.innerHTML = `
            <h3>Card #${cardId}</h3>
            <img src="${cardData.imageFront}" alt="Card Image" />
            <p>Price: ${priceInEther} ETH</p>
            <button onclick="buyCard(${cardId}, '${listing.price}')">Buy</button>
        `;

        container.appendChild(cardDiv);
    }
}
}



async function loadMyCards() {
    const cardContainer = document.querySelector(".scrolling-wrapper");

    if (!cardContainer) {
        console.log("No scrolling-wrapper container found. Skipping loading user cards.");
        return;
    }

    cardContainer.innerHTML = "";

    // invisible card spacer
    const spacer = document.createElement("div");
    spacer.className = "card";
    spacer.style.visibility = "hidden";
    spacer.style.pointerEvents = "none";
    cardContainer.appendChild(spacer);

    const nextBarcode = await objectCard.methods.getNextBarcode().call();

    for (let cardId = 1; cardId < nextBarcode; cardId++) {
        const owner = await objectCard.methods.cardToOwner(cardId).call();

        if (owner.toLowerCase() === accounts[0].toLowerCase()) {
            const cardData = await objectCard.methods.getCard(cardId).call();

            let certifierName = "None";
            if (cardData.certifierAddress !== "0x0000000000000000000000000000000000000000") {
                try {
                    certifierName = await objectCardHead.methods.getMyName().call({ from: cardData.certifierAddress });
                } catch (err) {
                    console.warn("Could not fetch certifier name:", err);
                }
            }

            const cardDiv = document.createElement("div");
            cardDiv.className = "card";

            cardDiv.innerHTML = `
                <h2 class="cardName">${cardData.name} ID: ${cardId}</h2>
                <h3 class="certifyName">Rating: ${cardData.rating}/10<br>Certified by: ${certifierName}</h3>
                <img src="${cardData.imageFront}" alt="Card Image" />
                <button class="sell-button" onclick="sellCard(${cardId})">Sell</button>
            `;

            cardContainer.appendChild(cardDiv);
        }
    }
}



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
    const username = document.getElementById('newUsername').value.trim();
    const fileInput = document.getElementById('profileImage');
    const file = fileInput.files[0];

    if (!username) {
        alert("Please enter a username.");
        return;
    }
    if (!file) {
        alert("Please choose a profile picture.");
        return;
    }

    try {
        const ipfsUrl = await uploadToIPFS(file);
        console.log("Uploaded profile image to IPFS:", ipfsUrl);

        // 🔥 PASS BOTH username AND ipfsUrl
        await objectCardHead.methods.createUser(username, ipfsUrl).send({ from: accounts[0] });

        localStorage.setItem("profileImage", ipfsUrl);
        localStorage.setItem("username", username);

        alert("Account created!");
        await loadProfile(); // Optionally refresh profile immediately
    } catch (err) {
        console.error("Error creating account:", err);
        alert("Failed to create account. See console for details.");
    }
}


async function uploadCard() {
    const name = document.getElementById('cardName').value.trim();
    const fileInput = document.getElementById('cardImageFront');
    const file = fileInput.files[0];

    if (!name && !file) {
        alert("Please enter a card name and upload an image.");
        return;
    } else if (!name) {
        alert("Please enter a card name.");
        return;
    } else if (!file) {
        alert("Please upload a card image.");
        return;
    }

    try {
        const ipfsUrl = await uploadToIPFS(file);
        console.log("Uploaded image to IPFS:", ipfsUrl);

        await objectCard.methods.addCard(
            name,
            "Pokemon",        // game
            "Indigo League",   // series
            1,                // grade (enum value for GUARDIAN)
            "First Edition",   // edition
            1,                // rating (1 star?)
            ipfsUrl,           // imageFront
            ipfsUrl            // imageBack (same for now)
        ).send({ from: accounts[0] });

        alert("Card uploaded successfully!");
        await loadMyCards();
    } catch (error) {
        console.error("Error uploading card:", error);
        alert("Failed to upload card. See console for details.");
    }
}

async function updateBio() {
    const newBio = document.getElementById('newBio').value.trim();

    if (!newBio) {
        alert("Please enter a bio.");
        return;
    }

    try {
        await objectCardHead.methods.updateBio(newBio).send({ from: accounts[0] });
        alert("Bio updated successfully!");

        // Optional: refresh the profile on the page immediately
        await loadProfile();
    } catch (err) {
        console.error("Error updating bio:", err);
        alert("Failed to update bio. Check console for details.");
    }
}

async function submitRating() {
    const username = document.getElementById('usernameInput').value.trim();
    const rating = parseInt(document.getElementById('ratingValue').value);
    const ratingType = document.getElementById('ratingType').value;

    if (!username) {
        alert("Please enter a username.");
        return;
    }

    if (isNaN(rating) || rating < 0 || rating > 5) {
        alert("Rating must be between 0 and 5.");
        return;
    }

    try {
        const userAddresses = await getAllUserAddresses();
        let userAddress = null;

        for (const addr of userAddresses) {
            const name = await objectCardHead.methods.getMyName().call({ from: addr });
            if (username.toLowerCase() === name.toLowerCase()) {
                userAddress = addr;
                break;
            }
        }

        if (!userAddress) {
            alert("Username not found.");
            return;
        }

        if (ratingType === "buyer") {
            await review.methods.rateBuyer(userAddress, rating).send({ from: accounts[0] });
        } else if (ratingType === "seller") {
            await review.methods.rateSeller(userAddress, rating).send({ from: accounts[0] });
        } else if (ratingType === "certifier") {
            await review.methods.rateCertifier(userAddress, rating).send({ from: accounts[0] });
        }

        alert(`Successfully rated ${ratingType}!`);
        await loadProfile();
    } catch (error) {
        console.error("Error submitting rating:", error);
        alert("Failed to submit rating.");
    }
}



async function getAllUserAddresses() {
    try {
        const users = await objectCardHead.methods.getAllUsers().call();
        return users;
    } catch (error) {
        console.error("Error fetching user list:", error);
        return [];
    }
}


//Marketplace functions
async function listCard() {
    const cardId = document.getElementById("cardId").value;
    const price = document.getElementById("price").value;

    try {
        await contract.methods.listCard(cardId, price).send({ from: accounts[0] });
        alert("Card listed!");
        await loadProfile();
    } catch (err) {
        console.error(err);
        alert("Failed to list card.");
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






}
