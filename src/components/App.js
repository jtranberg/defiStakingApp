import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar';
import Web3 from 'web3';
import Tether from '../truffle_abis/Tether.json';
import RWD from '../truffle_abis/RWD.json';
import DecentralBank from '../truffle_abis/DecentralBank.json';
import Main1 from './Main1.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '0x0',
      tether: {},
      rwd: {},
      decentralBank: {},
      tetherBalance: '0',
      rwdBalance: '0',
      stakingBalance: '0',
      loading: true,
    };
  }

  async componentDidMount() {
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
      window.alert('No Ethereum browser detected. Please install MetaMask!');
    }
  }

  async loadBlockchainData() {
    try {
      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      this.setState({ account: accounts[0] });

      const networkId = await web3.eth.net.getId();

      // Load Tether contract
      const tetherData = Tether.networks[networkId];
      let tetherBalance = '0';
      let tether = {};
      if (tetherData) {
        tether = new web3.eth.Contract(Tether.abi, tetherData.address);
        tetherBalance = await tether.methods.balanceOf(this.state.account).call();
      }

      // Load RWD contract
      const rwdData = RWD.networks[networkId];
      let rwdBalance = '0';
      let rwd = {};
      if (rwdData) {
        rwd = new web3.eth.Contract(RWD.abi, rwdData.address);
        rwdBalance = await rwd.methods.balanceOf(this.state.account).call();
      }

      // Load Decentral Bank contract
      const decentralBankData = DecentralBank.networks[networkId];
      let stakingBalance = '0';
      let decentralBank = {};
      if (decentralBankData) {
        decentralBank = new web3.eth.Contract(DecentralBank.abi, decentralBankData.address);
        stakingBalance = await decentralBank.methods.stakingBalance(this.state.account).call();
      }

      // Update state
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
      console.error('Error loading blockchain data:', error);
      this.setState({ loading: false });
    }
  }

  render() {
    const { account, tetherBalance, rwdBalance, stakingBalance, loading } = this.state;

    return (
      <div>
        <Navbar account={account} />
        <div className='container-fluid mt-5'>
          <div className="row">
            <main
              role='main'
              className='col-lg-12 ml-auto mr-auto'
              style={{ maxWidth: '600px', minHeight: '100vh' }}
            >
              <div>
                {loading ? (
                  <p id='loader' className='text-center' style={{ margin: '30px' }}>
                    LOADING, PLEASE WAIT...
                  </p>
                ) : (
                  <Main1
                    tetherBalance={tetherBalance}
                    rwdBalance={rwdBalance}
                    stakingBalance={stakingBalance}
                  />
                )}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
