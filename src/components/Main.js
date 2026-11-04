import React, { Component } from 'react';
import tether from '../tether.png';
import '../styles/Main.css';

class Main extends Component {
  state = {
    amount: '',
    busy: false,
    error: ''
  };

  deposit = async (event) => {
    event.preventDefault();

    this.setState({ busy: true, error: '' });

    try {
      const amount = window.web3.utils.toWei(
        this.state.amount.trim(),
        'ether'
      );

      if (!window.web3.utils.toBN(amount).gt(
        window.web3.utils.toBN('0')
      )) {
        throw new Error('Enter an amount greater than zero.');
      }

      await this.props.depositTokens(amount);
      this.setState({ amount: '' });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ busy: false });
    }
  };

  withdraw = async () => {
    this.setState({ busy: true, error: '' });

    try {
      await this.props.unstakeTokens();
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ busy: false });
    }
  };

  render() {
    const { busy, amount, error } = this.state;
    const format = (value) =>
      window.web3.utils.fromWei(value || '0', 'ether');

    return (
      <div className="content-container">
        <table className="table styled-table text-muted text-center">
          <thead>
            <tr>
              <th scope="col">Staking Balance</th>
              <th scope="col">Reward Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{format(this.props.stakingBalance)} mUSDT</td>
              <td>{format(this.props.rwdBalance)} RWD</td>
            </tr>
          </tbody>
        </table>

        <div className="card-container">
          <form className="stake-form" onSubmit={this.deposit}>
            <div className="form-inner">
              <label className="float-left" htmlFor="stake-amount">
                <b>Stake Tokens</b>
              </label>

              <span className="float-right">
                Balance: {format(this.props.tetherBalance)} mUSDT
              </span>

              <div className="input-group">
                <input
                  id="stake-amount"
                  type="text"
                  inputMode="decimal"
                  placeholder="0"
                  value={amount}
                  onChange={(event) =>
                    this.setState({ amount: event.target.value })
                  }
                  disabled={busy}
                  required
                />

                <div className="input-group-append">
                  <div className="input-group-text">
                    <img src={tether} alt="Mock Tether" height="32" />
                    &nbsp;&nbsp;mUSDT
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="btn deposit-btn"
                disabled={busy}
              >
                {busy ? 'PROCESSING...' : 'DEPOSIT'}
              </button>
            </div>
          </form>

          <div className="buttons-row">
            <button
              type="button"
              className="btn withdraw-btn"
              onClick={this.withdraw}
              disabled={busy || this.props.stakingBalance === '0'}
            >
              WITHDRAW
            </button>
          </div>

          {error && <p role="alert">{error}</p>}

          <div className="card-body airdrop-text">AIRDROP</div>
        </div>
      </div>
    );
  }
}

export default Main;