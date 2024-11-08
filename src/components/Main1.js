import React, { Component } from 'react';
import tether from '../tether.png';
import '../styles/Main1.css';

class Main1 extends Component {
  render() {
    return (
      <div className='content-container'>
        <table className='table styled-table text-muted text-center'>
          <thead>
            <tr>
              <th scope='col'>Staking Balance</th>
              <th scope='col'>Reward Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{window.web3.utils.fromWei(this.props.stakingBalance, 'Ether')} USDT</td>
              <td>{window.web3.utils.fromWei(this.props.rwdBalance, 'Ether')} RWD</td>
            </tr>
          </tbody>
        </table>

        <div className='card-container'>
          <form className='stake-form'>
            <div className='form-inner'>
              <label className='float-left'>
                <b>Stake Tokens</b>
              </label>
              <span className='float-right'>
                Balance: {window.web3.utils.fromWei(this.props.tetherBalance, 'Ether')}
              </span>
              <div className='input-group'>
                <input type='text' placeholder='0' required />
                <div className='input-group-append'>
                  <div className='input-group-text'>
                    <img src={tether} alt='Tether' height='32' />
                    &nbsp;&nbsp;&nbsp;USDT
                  </div>
                </div>
              </div>
              <button type='submit' className='btn deposit-btn'>
                DEPOSIT
              </button>
            </div>
          </form>

          
          <div className='buttons-row'>
            <button type='button' className='btn withdraw-btn'>
              WITHDRAW
            </button>
          </div>

          <div className='card-body airdrop-text'>
            AIRDROP
          </div>
        </div>
      </div>
    );
  }
}

export default Main1;
