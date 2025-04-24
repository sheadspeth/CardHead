const ObjectCard = artifacts.require("objectCard");

module.exports = async function (deployer) {
  await deployer.deploy(ObjectCard);
};
