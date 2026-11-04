/* global artifacts, web3 */
const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank");

module.exports = async function (deployer, network, accounts) {
  if (network !== "development") {
    throw new Error("This deployment script is for local Ganache only.");
  }

  if (accounts.length < 2) {
    throw new Error("Two Ganache accounts are required.");
  }

  await deployer.deploy(Tether);
  const tether = await Tether.deployed();

  await deployer.deploy(RWD);
  const rwd = await RWD.deployed();

  await deployer.deploy(DecentralBank, rwd.address, tether.address);
  const bank = await DecentralBank.deployed();

  // Fund the bank with mock reward tokens.
  await rwd.transfer(bank.address, await rwd.totalSupply(), {
    from: accounts[0]
  });

  // Give the second Ganache account 100 mock staking tokens.
  await tether.transfer(
    accounts[1],
    web3.utils.toWei("100", "ether"),
    { from: accounts[0] }
  );

  console.log("Bank owner:", accounts[0]);
  console.log("Funded test account:", accounts[1]);
  console.log("DecentralBank:", bank.address);
};