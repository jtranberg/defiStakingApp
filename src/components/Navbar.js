import React, { Component } from 'react';
import bank from '../bank.png';
import '../styles/Navbar.css';

class Navbar extends Component {
  render() {
    return (
      <nav className='custom-navbar'>
        <a href='/' className='navbar-brand'>
          <img src={bank} width='50' height='30' alt='bank' className='bank-logo' />
          &nbsp; Jay's Intergalactic Yield Machine
        </a>
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <span className='account-text'>
              ACCOUNT NUMBER: {this.props.account}
            </span>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
