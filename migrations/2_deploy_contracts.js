// eslint-disable-next-line no-undef
const Tether = artifacts.require('Tether')
const RWD = artifacts.require('RWD')
const DecentralBank = artifacts.require('DecentralBank')

module.exports = async function (deployer, network, accounts) {
    //deploy mock t cotract
    await deployer.deploy(Tether)
    const tether = await Tether.deployed()
    //deploy mock t cotract
    await deployer.deploy(RWD) 
    const rwd = await RWD.deployed()
    //deploy decentral bank
    await deployer.deploy(DecentralBank, rwd.address, tether.address)
    const decentralBank = await DecentralBank.deployed()
    

    //transfer all rwd tokens
    await rwd.transfer(decentralBank.address, '1000000000000000000000000') 
    //dist 100 to tether
    await tether.transfer(accounts[1], '1000000000000000000')
}