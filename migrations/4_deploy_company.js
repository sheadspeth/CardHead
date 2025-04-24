const Company = artifacts.require("company");

module.exports = async function (deployer) {
  await deployer.deploy(Company);
};
