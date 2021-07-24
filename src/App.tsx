import React, { useState } from 'react';
import logo from './resources/icons/logo.svg';
import "./components/scss/index/App.css";
import { IdentiNavBar } from "./components/NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as web3 from './lib/Web3Lib'



const App: React.FC = () => {
	const [account, setAccount] = useState<string>('3b07384d113edec49eaa6238ad5ff00');
	const [dappgram, setDappgram] = useState<any>(null);
	const [images, setImages] = useState<string[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	(async () => {
		await web3.componentWillAmount();
		const _accounts = await web3.getAccountData();
		await setAccount(_accounts[0]);
		const networkInfo = await web3.getNetWorkInfo();
		if (networkInfo) {
			const dappgram = await web3.getDappgram(networkInfo);
			setDappgram(dappgram);
			// const imagesCount = await dappgram.methods.imgIncrementalId().call();
			// setImages(imagesCount);

		}
	})();

	return (
		<>
			<IdentiNavBar accountHash={account} />
			<div className="App">
				{loading ? <div id="loader-loading" className="text-center mt-5">Loading...</div> : null}
			</div>
		</>
	);
}

export default App;
