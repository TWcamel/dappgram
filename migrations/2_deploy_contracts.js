const ConvertLib = artifacts.require("ConvertLib");
const ValidLib = artifacts.require("ValidLib");
const Dappgram = artifacts.require("Dappgram");

module.exports = function (deployer) {
	deployer.deploy(ConvertLib);
	deployer.deploy(ValidLib);
	deployer.link(ConvertLib, Dappgram);
	deployer.link(ValidLib, Dappgram);
	deployer.deploy(Dappgram);
};
