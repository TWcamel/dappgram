const ConvertLib = artifacts.require("ConvertLib");
const MetaCoin = artifacts.require("MetaCoin");
const Dappgram = artifacts.require("Dappgram");

module.exports = function (deployer) {
	deployer.deploy(ConvertLib);
	deployer.link(ConvertLib, Dappgram);
	deployer.deploy(Dappgram);
};
