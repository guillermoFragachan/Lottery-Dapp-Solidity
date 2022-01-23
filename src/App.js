import './App.css';
import Web3 from 'web3'
import { useEffect, useState } from 'react';
import Lottery from '../build/contracts/Lottery.json'


function App() {

  const [senderAccount, setSenderAccount] = useState('');

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
    const lotteryData = Lottery.networks[networkId]
    if(lotteryData){
      const lottery = new web3.eth.Contract(lottery.abi, lotteryData)
      
    }

 }

  useEffect(()=>{
    loadWeb3()
    blockchainData()


  },[])
  
  return (
    <div className="App">
      <header className="App-header">
      <div>{senderAccount}sdad</div>
      </header>
    </div>
  );
}

export default App;
