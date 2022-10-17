
import React, {Component} from 'react'
import './App.css'
import Navbar from './Navbar'
import Web3 from 'web3'
import Tether from '../truffle_abis/Tether.json'
import RWD from '../truffle_abis/RWD.json'
import DecentralBank from '../truffle_abis/DecentralBank.json'
import { Main } from 'react-tsparticles'
import Main1 from './Main1.js'

class App extends Component {

    async componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
    }


       async loadBlockchainData() {
            const web3 = window.web3
            const accounts = await web3.eth.getAccounts()
            console.log(accounts)
            this.setState({account:accounts[0]})
            const networkId = await web3.eth.net.getId()
           
            // load tether contract
            const tetherData = Tether.networks[networkId]
              if(tetherData) {
                const tether = new web3.eth.Contract(Tether.abi, tetherData.address)
                this.setState({tether})
                 let tetherBalance = await tether.methods.balanceOf(this.state.account).call()
                 this.setState({teherBalance: tetherBalance.toString() })
              }else {
                window.alert("teher contract not deplyed - network not deployed")
              }


            const rwdData = RWD.networks[networkId]
              if(rwdData) {
                const rwd = new web3.eth.Contract(RWD.abi, rwdData.address)
                this.setState({rwd})
                 let rwdBalance = await rwd.methods.balanceOf(this.state.account).call()
                 this.setState({rwdBalance: rwdBalance.toString() })
              }else {
                window.alert("rwd contract not deplyed - network not deployed")
              }


            const decentralBankData = DecentralBank.networks[networkId]
              if(decentralBankData) {
                const decentralBank = new web3.eth.Contract(DecentralBank.abi, decentralBankData.address)
                this.setState({decentralBank})
                 let stakingBalance = await decentralBank.methods.stakingBalance(this.state.account).call()
                 this.setState({stakingBalance: stakingBalance.toString() })
                 }else {
                window.alert("Decentral Bank contract not deplyed - network not deployed")
              }

              this.setState({loading:false})
        }
        
        async loadWeb3() {
        if(window.ethereum){
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        } else if(window.web) {
            window.web3 =new Web3(window.web3.currentProvider)
            } else {
                window.alert('No Etheruem browser, check metamask!')
            }
        }

    constructor(props) {
       super(props)
       this.state = {
           account: '0x0',
           tether:{},
           rdw:{},
           decenttralBank:{},
           tetherBalance:'0',
           rwdBalance:'0',
           stakingBalance:'0',
           loading: true

       }
    }
    // react code goes here
    render() {
        return(
           <div>
            <Navbar account={this.state.account}/>
                <div className='container-fluid mt-5'>
                  <div classname="row">
                      <main role='main' className='col-lg-12 ml-auto mr-auto'style={{maxWidth: '600px', minHeight:'100vm'}}>
                         <div>
                            <Main1/>
                         </div>
                      </main>
                  </div>
                </div>
           </div>
           

       )
    }
}
export default App;