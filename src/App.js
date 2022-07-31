import './App.css';
import Web3 from 'web3'
import React,{ useEffect, useState } from 'react';
import Lottery from './abis/Lottery.json'
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";

function App() {

  const [senderAccount, setSenderAccount] = useState();
  const [lotteryBalance, setLotteryBalance] = useState()
  const [lotteryContract, setLotteryContract] =useState()
  const [totalPlayers, setTotalPlayers] = useState()

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

      
      const amountOfPlayers = await lottery.methods.addressesP().call()

      setTotalPlayers(amountOfPlayers)

      console.log(totalPlayers, 'total amount of players')
      // let totalPlayers = await lottery.methods.players(0).call()
      // console.log(totalPlayers)

     

    }


 }

const buyTicket = async () => {

  const web3 = window.web3
  const accounts = await web3.eth.getAccounts()
  await web3.eth.sendTransaction({from: accounts[0],to: lotteryContract.options.address, value: web3.utils.toWei("1", "ether")})

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
      
      <div>{lotteryBalance}: Lottery balance</div>

      <div>{totalPlayers} players has bought their ticket </div>
      <button onClick={()=>buyTicket()}>Get 1 Ticket </button>

      <button onClick={()=>stakeTokens()}>Stake</button>
    </div>
  );
}

export default App;
