import React, {Component} from 'react'
import tether from '../tether.png'


class Main1 extends Component {
    render() {
        
        return (
        <div id='content' className='mt-3'>
            <table className='table text-muted text-center'>
                <thead>
                <tr style={{color:'black'}}>
                    <th scope='col'>Staking Balance</th>
                    <th scope='col'>Reward Balance</th>
                </tr>
                </thead>
                <tbody>
                    <tr style={{color:'black'}}>
                        <td>{window.web3.utils.fromWei(this.props.stakingBalance, "Ether")} USDT</td>
                        <td>{window.web3.utils.fromWei(this.props.rwdBalance, "Ether")} RWD</td>
                    </tr>
                </tbody>
            </table>
            <div classname='card mb-2' style={{opacity:'.9'}}>
                <form
                onSubmit={(event) => {
                    let amount
                    amount = this.input.value.toString()
                    amount = window.web3.utils.toWei(amount, 'Ether')
                    this.props.stakeTokens()
                }}

               classname='mb-3'>
                <div style={{borderSpaceing:'0 1em'}}>
                    <label className='float-left' style={{marginLeft:'15px'}}><b>Stake tokens</b></label>
                    <span className='float-right' style={{margineRight:'8px'}}>
                        Balance: {window.web3.utils.fromWei(this.props.tetherBalance, "Ether")}
                    </span>
                    <div className='input-group mb-4'>
                        <input type='text' placeholder='0'required />
                        <div className='input-group-open'>
                            <div className='input-group-text'>
                               <img src={tether} alt='tehter' height='32'  />
                                &nbsp;&nbsp;&nbsp;USDT
                            </div>
                        </div>
                    </div>
                     <button type='submit' className='btn btn-primary btn-lg btn-block'>DEPOSIT</button>
                    </div>
                </form>
                            &nbsp;
                 <button type='submit' className='btn btn-primary btn-lg btn-block'>WITHDRAW</button>
                   <div className='card-body text-center style+{{color:blue}}'>
                     AIRDROP
                   </div>

            </div>

        </div>   
           
        )
    }
}
export default Main1;