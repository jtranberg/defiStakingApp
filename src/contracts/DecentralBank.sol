
// SPDX-License-Identifier: MIT 
pragma solidity >= 0.5.0;

import './RWD.sol';
import './Tether.sol';

contract DecentralBank {
    string public name = 'DecentralBank';
    address public owner;
    Tether public tether;
    RWD public rwd;

    address[] public stakers;

    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaked;

     constructor(RWD _rwd, Tether _tether) public {
        rwd = _rwd;
        tether = _tether;
        owner = msg.sender;
    }
//staking function      transfer tokens to this contract address
    function depositTokens(uint _amount) public {
        //require amount to be greater than 0
        require(_amount > 0, 'cannot be 0');
        tether.transferFrom(msg.sender, address(this), _amount);
// update staking balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }
            isStaked[msg.sender] = true;
            hasStaked[msg.sender] = true;
        }

        //unstake tokens
        function unstakeTokens() public {
            uint balance = stakingBalance[msg.sender];
                require(balance > 0, 'staking blance cant be less than zero');

                //transfer to address from bank
            tether.transfer(msg.sender, balance);
                     //reset staking balance
                     stakingBalance[msg.sender] = 0;
                     //update staking status
                     hasStaked[msg.sender] = false;


        }

        //issue tokens
        function issueTokens() public  {
        //owner only issues tokens
        require(msg.sender == owner, 'caller must be owner');

          for (uint i=0; i<stakers.length; i++) {
              address recipient = stakers[i];
              uint balance = stakingBalance[recipient] /9;  ///9 to create insentive formula
              if(balance > 0) {
              rwd.transfer(recipient, balance);
              }
          }

        }
}

