const ObjectCardHead = artifacts.require("objectCardHead");
const ObjectCard = artifacts.require("objectCard");
const Marketplace = artifacts.require("marketplace");
const Company = artifacts.require("company");
const Review = artifacts.require("review");

module.exports = async function (deployer) {
  await deployer.deploy(ObjectCardHead);
  await deployer.deploy(ObjectCard);
  await deployer.deploy(Company);
  await deployer.deploy(Review);

  const objectCardInstance = await ObjectCard.deployed();
  
  await deployer.deploy(Marketplace, objectCardInstance.address);

  console.log("Deployment finished successfully!");
  console.log("objectCard at:", objectCardInstance.address);
};
