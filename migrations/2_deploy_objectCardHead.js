const ObjectCardHead = artifacts.require("objectCardHead");

module.exports = async function (deployer) {
  await deployer.deploy(ObjectCardHead);
};
