import React from 'react';
import film from '../resources/icons/film.png'
import Identicon from 'identicon.js';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

type GreetingProps = {
	accountHash: string;
}

export const IdentiNavBar: React.FC<GreetingProps> = ({ accountHash }) => {
	return (
		<>
			<Navbar bg="light" expand="lg">
				<Container>
					<Navbar.Brand href="#home">
						<img src={film} width="30" height="30" className="d-inline-block align-top" alt="" />
						Dappgram
					</Navbar.Brand>
					<small className="text-secondary">
						<small id="account">{accountHash}</small>
						{accountHash
							? <img
								alt="red dot"
								className='ml-2'
								width='30'
								height='30'
								src={`data:image/png;base64,${new Identicon(accountHash, 42).toString()}`}
							/>
							: <span>there's no img setup here for now</span>
						}
					</small>
				</Container>
			</Navbar>
		</>
	);
}
