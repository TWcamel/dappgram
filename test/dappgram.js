const Dappgram = artifacts.require('./Dappgram.sol');
const Chai = require('chai');

Chai.use(require('chai-as-promised')).should()

contract('Dappgram', ([deployer, author, tipper]) => {
	let dappgram;

	before(async () => {
		dappgram = await Dappgram.deployed()
	})

	describe('upload img', async () => {
		let res, imgIncrementalId
		const hash = '0x9CDEf3e5be0d7208acfc6773B87473a7488A78A6'

		before(async () => {
			res = await dappgram.uploadImg(hash, 'Image descriptrion here', { from: author })
			imgIncrementalId = await dappgram.imgIncrementalId()
		})

		it('created images', async () => {
			const event = res.logs[0].args
			assert.equal(event.id.toNumber(), imgIncrementalId.toNumber(), 'id checked')
			assert.equal(event.IpfsHash, hash, 'Hash checked')
			assert.equal(event.description, 'Image descriptrion here', 'description checked')
			assert.equal(event.tipAmount, '0', 'tip amount checked')
			assert.equal(event.author, author, 'author checked')

			await dappgram.uploadImg('', 'description of Img', { from: author }).should.be.rejected
			await dappgram.uploadImg(hash, '', { from: author }).should.be.rejected
		})

		it('lists of imgs from customed img struct', async () => {
			const img = await dappgram.imgs(imgIncrementalId)
			assert.equal(img.id.toNumber(), imgIncrementalId.toNumber(), 'id checked')
			assert.equal(img.IpfsHash, hash, 'Hash checked')
			assert.equal(img.description, 'Image descriptrion here', 'description checked')
			assert.equal(img.tipAmount, '0', 'tip amount checked')
			assert.equal(img.author, author, 'author checked')
		})

		it('vaild tipping images by sender aka user', async () => {
			let oldBalance, newBalance, tipForImgOwner
			oldBalance = await web3.eth.getBalance(author)
			oldBalance = new web3.utils.BN(oldBalance)

			res = await dappgram.tipImg(imgIncrementalId, { from: tipper, value: web3.utils.toWei('2', 'Ether') })

			const event = res.logs[0].args
			assert.equal(event.id.toNumber(), imgIncrementalId.toNumber(), 'id checked')
			assert.equal(event.IpfsHash, hash, 'Hash checked')
			assert.equal(event.description, 'Image descriptrion here', 'description checked')
			assert.equal(event.tipAmount, '2000000000000000000', '2 Wei tip amount checked')
			assert.equal(event.author, author, 'author checked')

			newBalance = await web3.eth.getBalance(author)
			newBalance = new web3.utils.BN(newBalance)

			tipForImgOwner = web3.utils.toWei('2', 'Ether')
			tipForImgOwner = new web3.utils.BN(tipForImgOwner)

			const expectedBalance = oldBalance.add(tipForImgOwner)

			assert.equal(newBalance.toString(), expectedBalance.toString())

			await dappgram.tipImg(98, { from: tipper, value: web3.utils.toWei('2', 'Ether') }).should.be.rejected;

		})

	})

})


