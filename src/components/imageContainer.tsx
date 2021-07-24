import React, { useEffect, useState } from 'react';
import Identicon from 'identicon.js';
import { FormControl, InputGroup, Container, Row, Col, Form, Card, Button } from 'react-bootstrap';

type imgProps = { images: any; captureFile: any; uploadImg: any; tipImgOwner: any; };

export const ImageContainer: React.FC<imgProps> = ({ images, captureFile, uploadImg, tipImgOwner }) => {
	const [imgDescription, setImgDescription] = useState<any>('');
	const [tipImg, setTipImg] = useState<any>(images);

	const handleIpfsUpload = (event: any) => {
		event.preventDefault()
		const description = imgDescription
		uploadImg(description)
	}

	const handleTipOwner = (event: any) => {
		const amount = event.target.previousSibling.previousSibling.value
		let tipAmount = window.web3.utils.toWei(`${amount}`, "Ether")
		tipImgOwner(event.target.name, tipAmount)
	}

	return (
		<>
			<Container fluid="md" className="mt-5">
				<Row className="justify-content-md-center">
					<Col md="auto" >
						<Form onSubmit={handleIpfsUpload} >
							<Form.Group className="mb-3" controlId="imgOwnerForm">
								<Form.Label>
									Share Image
								</Form.Label>
								<Form.Control
									type="file"
									accept=".jpg, .jpeg, .png, .bmp, .gif"
									onChange={captureFile}
								/>
								<Form.Control
									type="text"
									placeholder="Image description..."
									onChange={(input) => setImgDescription(input.target.value)}
								/>
							</Form.Group>
							<Button variant="primary" type="submit" size="lg">
								Upload!
							</Button>
						</Form>
					</Col>
				</Row>
				{
					images.map((image: any, key: any) => {
						return (
							<Row className="justify-content-md-center mt-5">
								<Col md="auto">
									<Card>
										<Card.Header>
											<img
												alt="img-owner-hash"
												className='mr-2'
												width='30'
												height='30'
												src={`data:image/png;base64,${new Identicon(image.author, 42).toString()}`}
											/>
											{image.author}
										</Card.Header>
										<Card.Img
											variant="top"
											src={`https://ipfs.infura.io/ipfs/${image.IpfsHash}`}
											style={{ maxWidth: '377px', alignSelf: 'center' }}
										/>
										<Card.Body>
											<Card.Text> {image.description} </Card.Text>
										</Card.Body>
										<Card.Footer>
											<InputGroup className="mt-2">
												<InputGroup.Text>$</InputGroup.Text>
												<FormControl
													placeholder={`now owner has: ${window.web3.utils.fromWei(image.tipAmount.toString(), 'Ether')} `}
													id={`tip-to-img-owner-${image.id}`}
												/>
												<InputGroup.Text>Ether</InputGroup.Text>
												<Button
													name={image.id}
													className="float-right pt-0"
													onClick={handleTipOwner}
													size="sm"
												>
													Tip!
												</Button>
											</InputGroup>
										</Card.Footer>
									</Card>
								</Col>
							</Row>
						)
					})
				}
			</Container>
		</>
	)
};
