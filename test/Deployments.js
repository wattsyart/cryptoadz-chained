const hre = require("hardhat");
const utils = require('../scripts/deploy.js');

describe("Deployments", function () {
  it("deploys all contracts", async function () {
    const network = await ethers.getDefaultProvider().getNetwork();
    console.log(`Network: ${network}`);
    if(network !== "privatenode") {
      await utils.deployContracts(hre.ethers, false, false, getTxOptions());
    } else {
      await utils.deployContracts(hre.ethers, false, false);
    }
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
