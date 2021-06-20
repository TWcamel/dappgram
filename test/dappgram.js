const Dappgram = artifacts.require('./Dappgram.sol');
const Chai = require('chai')

Chai.use(require('chai-as-promised')).should()

contract('Dappgram', ([deployer, author, tipper]) => {
	let dappgram;

	before(async () => {
		dappgram = await Dappgram.deployed()
	})

	describe('deployment', async () => {
		it('deployed completed successfully!', async () => {
			const address = await dappgram.address
			assert.notEqual(address, '')
			assert.notEqual(address, 0x0)
			assert.notEqual(address, null)
			assert.notEqual(address, undefined)
		})

		it('name of contract', async () => {
			const name = await dappgram.name()
			assert.equal(name, 'Dappgram')
		})
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

		it('lists of imgs from customed img struct', async() => {
			const img = await dappgram.imgs(imgIncrementalId)
			assert.equal(img.id.toNumber(), imgIncrementalId.toNumber(), 'id checked')
			assert.equal(img.IpfsHash, hash, 'Hash checked')
			assert.equal(img.description, 'Image descriptrion here', 'description checked')
			assert.equal(img.tipAmount, '0', 'tip amount checked')
			assert.equal(img.author, author, 'author checked')
		})

	})

})


