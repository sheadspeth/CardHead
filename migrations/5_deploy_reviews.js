const Review = artifacts.require("review");

module.exports = async function (deployer) {
  await deployer.deploy(Review);
};
