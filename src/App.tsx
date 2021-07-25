import "./components/scss/index/App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState, useEffect } from 'react';
import { IdentiNavBar } from "./components/NavBar";
import * as web3 from './lib/Web3Lib'
import * as imgLib from './lib/ImgLib'
import { ImageContainer } from "./components/imageContainer";
import { create } from 'ipfs-http-client'


const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

const App: React.FC = () => {
	const [account, setAccount] = useState<string>('');
	const [imgs, setImgs] = useState<any>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [buffer, setBuffer] = useState<ArrayBuffer>(new ArrayBuffer(0));
	const [state, setState] = useState<any>({ state: null, dapp: null });

	useEffect(() => {
		(async () => {
			await web3.componentWillAmount();
			const _accounts = await web3.getAccountData();
			await setAccount(_accounts[0]);
			const networkInfo = await web3.getNetWorkInfo();
			if (networkInfo) {
				const dappgram = await web3.getDappgram(networkInfo);
				setState((prevState: any) => { return { ...prevState, dapp: dappgram } });
				const imagesCount = await dappgram.methods.imgIncrementalId().call();
				setState((prevState: any) => { return { ...prevState, imagesCount: imagesCount } });

				for (let i = 1; i <= imagesCount; ++i) {
					const imgBuffer = await dappgram.methods.imgs(i).call();
					setImgs((prevImg: any) => { return [...prevImg, imgBuffer] });
				}
				setLoading(false);
			}
			else {
				setLoading(true);
				console.log('no network info');
			}
		})();
		return () => { console.log("App component unmounted"); }
	}, []);

	useEffect(() => {
		setImgs(imgLib.imgTipAmountFirst(imgs));
	}, [imgs])

	let captureFile = (e: any) => {
		e.preventDefault();
		const file = e.target.files[0];
		const reader = new window.FileReader();
		reader.readAsArrayBuffer(file)

		reader.onload = (event: any) => {
			setBuffer(event.target.result);
		};
	};

	let uploadImg = async (description: any) => {
		console.log("Submitting file to ipfs...")
		try {
			const result = await ipfs.add(buffer);
			console.log("File uploaded to ipfs: ", result);
			setLoading(true);
			state.dapp.methods.uploadImg(result.path, description)
				.send({ from: account })
				.on('transactionHash', () => {
					setLoading(false);
				})
		} catch (e) {
			console.log(e);
			setLoading(true);
		}
	}

	let tipImageOwner = async (id: string, tipAmount: number) => {
		setLoading(true);
		state.dapp.methods.tipImg(id)
			.send({ from: account, value: tipAmount })
			.on('transactionHash', () => {
				setLoading(false);
			})
	}

	return (
		<>
			<IdentiNavBar accountHash={account} />
			<div className="App">
				{loading ?
					<div id="loader-loading" className="text-center mt-5">Loading...🐒</div> :
					<ImageContainer
						images={imgs}
						captureFile={captureFile.bind(this)}
						uploadImg={uploadImg.bind(this)}
						tipImgOwner={tipImageOwner.bind(this)}
					/>
				}
			</div>
		</>
	);
}

export default App;
