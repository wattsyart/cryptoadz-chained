const hre = require("hardhat");
const utils = require('../scripts/deploy.js');

describe("Deployments", function () {
  it("deploys all contracts", async function () {
    await utils.deployContracts(hre.ethers, false, false, getTxOptions());
  });
});

function getTxOptions() {
  var baseFeePerGas = ethers.BigNumber.from(4).mul(hre.ethers.BigNumber.from(1000000000));
  var priorityFeeInWei = ethers.BigNumber.from(2).mul(hre.ethers.BigNumber.from(1000000000));
  const txOptions = {        
      maxPriorityFeePerGas: priorityFeeInWei,
      maxFeePerGas: baseFeePerGas.add(priorityFeeInWei)        
  }
  return txOptions;
}
