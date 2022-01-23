import './App.css';
import Web3 from 'web3'
import React,{ useEffect, useState } from 'react';
import Lottery from './abis/Lottery.json'


function App() {

  const [senderAccount, setSenderAccount] = useState();
  const [lotteryBalance, setLotteryBalance] = useState()
  const [lotteryContract, setLotteryContract] =useState()

  const loadWeb3 = async ()=>{
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
 
 const blockchainData = async ()=>{

   const web3 = window.web3

    //user information metamask
    const accounts = await web3.eth.getAccounts()
    setSenderAccount(accounts[0])



    //contract information
    const networkId = await web3.eth.net.getId()
    console.log(networkId)
    const lotteryData = Lottery.networks[networkId]
    if(lotteryData){

      const lottery = new web3.eth.Contract(Lottery.abi, lotteryData.address)
      
      setLotteryContract(lottery)
      let stakingBalance = await lottery.methods.getBalance().call()
      setLotteryBalance(stakingBalance.toString())
      console.log(lotteryData.address.toString())

      //line below should activate metamask to approvetransfer
      // await web3.eth.sendTransaction({from: accounts[0],to: lottery.options.address, value: web3.utils.toWei("0.1", "ether")})

    }


 }

const stakeTokens = async() => {
  const web3 = window.web3
  const lot = await lotteryContract.methods.pickWinner().send({from: senderAccount})
  console.log(lot)
}

  useEffect(()=>{
    loadWeb3()
    blockchainData()

  },[])
  
  return (
    <div className="App">
      
      <div>{lotteryBalance}sdad</div>

      
      

      <button onClick={()=>stakeTokens()}>Stake</button>
    </div>
  );
}

export default App;
