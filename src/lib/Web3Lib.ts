import { isConstructorDeclaration } from "typescript";
import Web3 from "web3";
import Dappgram from "../abis/Dappgram.json";

declare global {
	interface Window {
		web3: any;
		ethereum: any;
	}
}


const componentWillAmount = async () => {
	await loadWeb3();
};

const loadWeb3 = async () => {
	if (window.ethereum) {
		window.web3 = new Web3(window.ethereum);
		await window.ethereum.enable();
	}
	if (window.web3) {
		window.web3 = new Web3(window.web3.currentProvider);
	}
};

const getAccountData = async (): Promise<string[]> => {
	const web3 = window.web3;
	const accounts = await web3.eth.getAccounts();
	return accounts;
};

const getNetWorkInfo = async (): Promise<any> => {
	const web3 = window.web3;
	const id: NetworkKey = await web3.eth.net.getId();

	type NetworkKey = "5777";
	const info = Dappgram.networks[id];
	return info;
};

const getDappgram = async (network: any): Promise<any> => {
	const web3 = window.web3;
	return new web3.eth.Contract(Dappgram.abi, network);
}
export { componentWillAmount, getAccountData, getNetWorkInfo, getDappgram };
