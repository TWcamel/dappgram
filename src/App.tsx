import React, { useState } from 'react';
import logo from './resources/icons/logo.svg';
import "./components/scss/index/App.css";
import { NavBar } from "./components/NavBar";


const App: React.FC = () => {
	const [account, setAccount] = useState<string>('3b07384d113edec49eaa6238ad5ff00');
	return (
		<>
			<NavBar accountHash={account} />
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<p>
						Edit <code>src/App.tsx</code> and save to reload.
					</p>
					<a
						className="App-link"
						href="https://reactjs.org"
						target="_blank"
						rel="noopener noreferrer"
					>
						Learn React
					</a>
				</header>
			</div>
		</>
	);
}

export default App;
