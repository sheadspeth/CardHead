const ObjectCardHead = artifacts.require("objectCardHead");
const Marketplace = artifacts.require("marketplace");

module.exports = async function (deployer, network, accounts) {
  // Step 1: Deploy objectCardHead
  await deployer.deploy(ObjectCardHead);
  const objectCardHeadInstance = await ObjectCardHead.deployed();

  // Step 2: Deploy marketplace with objectCardHead's address
  await deployer.deploy(Marketplace, objectCardHeadInstance.address);
};
