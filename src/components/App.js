import React, { Component } from "react";
import "./App.css";
import Navbar from "./Navbar";
import Web3 from "web3";
import Tether from "../truffle_abis/Tether.json";
import RWD from "../truffle_abis/RWD.json";
import DecentralBank from "../truffle_abis/DecentralBank.json";
import Main from "./Main.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "0x0",
      tether: {},
      rwd: {},
      decentralBank: {},
      tetherBalance: "0",
      rwdBalance: "0",
      stakingBalance: "0",
      loading: true,
    };
  }

  async componentDidMount() {
    // Show an alert describing the app in detail with a note about loading time and deploying smart contracts
    window.alert(
      "⚠️ Please Note: This app takes a moment to load. ⚠️\n\n" +
        "🔗 Welcome to the Decentralized Bank Staking App! 🔗\n\n" +
        "📌 This application is a decentralized finance (DeFi) platform built on the Ethereum blockchain. It allows you to:\n\n" +
        "💰 Stake your Tether (USDT) tokens securely.\n" +
        "🎁 Earn RWD (Reward) tokens as interest for staking.\n" +
        "🔄 View your current balances and rewards in real-time.\n\n" +
        "🛠️ To get started:\n" +
        "1️⃣ Please connect your MetaMask wallet to the Ethereum network.\n" +
        "2️⃣ Ensure you have Tether (USDT) tokens in your wallet.\n" +
        "3️⃣ **IMPORTANT**: Deploy the Tether, RWD, and DecentralBank smart contracts to the blockchain first.\n" +
        "   Without deploying these contracts, staking will not be possible.\n" +
        "4️⃣ Once deployed, start staking to earn rewards!\n\n" +
        "🚀 Let's dive into decentralized finance and start earning rewards today!",
    );

    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("No Ethereum browser detected. Please install MetaMask!");
    }
  }

  async loadBlockchainData() {
    try {
      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      if (!account) {
        throw new Error("Connect a MetaMask account first.");
      }

      this.setState({ account });

      const networkId = await web3.eth.net.getId();

      // Load Tether contract
      const tetherData = Tether.networks[networkId];
      let tetherBalance = "0";
      let tether = {};
      if (tetherData) {
        tether = new web3.eth.Contract(Tether.abi, tetherData.address);
        tetherBalance = await tether.methods.balanceOf(account).call();
      }

      // Load RWD contract
      const rwdData = RWD.networks[networkId];
      let rwdBalance = "0";
      let rwd = {};
      if (rwdData) {
        rwd = new web3.eth.Contract(RWD.abi, rwdData.address);
        rwdBalance = await rwd.methods.balanceOf(account).call();
      }

      // Load Decentral Bank contract
      const decentralBankData = DecentralBank.networks[networkId];
      let stakingBalance = "0";
      let decentralBank = {};
      if (decentralBankData) {
        decentralBank = new web3.eth.Contract(
          DecentralBank.abi,
          decentralBankData.address,
        );
        stakingBalance = await decentralBank.methods
          .stakingBalance(account)
          .call();
      }

      this.setState({
        tether,
        rwd,
        decentralBank,
        tetherBalance: tetherBalance.toString(),
        rwdBalance: rwdBalance.toString(),
        stakingBalance: stakingBalance.toString(),
        loading: false,
      });
    } catch (error) {
      console.error("Error loading blockchain data:", error);
      this.setState({ loading: false });
    }
  }

  depositTokens = async (amount) => {
    const { tether, decentralBank, account } = this.state;

    await tether.methods
      .approve(decentralBank.options.address, amount)
      .send({ from: account });

    await decentralBank.methods.depositTokens(amount).send({ from: account });

    await this.loadBlockchainData();
  };

  unstakeTokens = async () => {
    const { decentralBank, account } = this.state;

    await decentralBank.methods.unstakeTokens().send({ from: account });

    await this.loadBlockchainData();
  };

  render() {
    const {
      account,
      tetherBalance,
      rwdBalance,
      stakingBalance,
      loading,
    } = this.state;

    return (
      <div className="app-container">
        <Navbar account={account} />
        <div className="content-wrapper">
          <div className="main-content">
            {loading ? (
              <div className="loader-container">
                <div className="progress-bar">
                  <div className="progress"></div>
                </div>
                <p className="loading-text">LOADING, PLEASE WAIT...</p>
              </div>
            ) : (
              <Main
                tetherBalance={tetherBalance}
                rwdBalance={rwdBalance}
                stakingBalance={stakingBalance}
                depositTokens={this.depositTokens}
                unstakeTokens={this.unstakeTokens}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
