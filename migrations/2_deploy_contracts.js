const Lottery = artifacts.require("./Lottery.sol");

module.exports = async function(deployer, network, accounts) {


 
  await deployer.deploy(Lottery)
  const lottery = await Lottery.deployed()


};