const NFTFactory = artifacts.require("NftFactory");

module.exports = function (deployer) {
  deployer.deploy(NFTFactory);
};
