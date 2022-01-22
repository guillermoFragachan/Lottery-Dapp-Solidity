const SimpleStorage = artifacts.require("./SimpleStorage.sol");
// const Lottery = artifacts.require("./Lottery.sol");
// const t = artifacts.require("./t.sol");

module.exports = async function(deployer, networks, accounts) {
  deployer.deploy(SimpleStorage);

  // await deployer.deploy(Lottery);
  // const lottery = await lottery.deployed();

  // console.log("Lottery address:", lottery.address);
};
