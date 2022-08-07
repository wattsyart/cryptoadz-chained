const utils = require('./deploy.js');
const hre = require("hardhat");

async function main() {
  const network = await ethers.provider.getNetwork();

  // private node has throw-away key, doesn't need a hardware wallet
  if(network.chainId == 8134646) {      
    await utils.deployContracts(hre.ethers, false, false);
    return;
  }

  // Deploy to real network (using HID or adding a local signer is left to the caller to override):
  await utils.deployContracts(hre.ethers, false, false, getTxOptions());
}

function getTxOptions() {
  var baseFeePerGas = ethers.BigNumber.from(4).mul(hre.ethers.BigNumber.from(1000000000));
  var priorityFeeInWei = ethers.BigNumber.from(2).mul(hre.ethers.BigNumber.from(1000000000));
  const txOptions = {        
      maxPriorityFeePerGas: priorityFeeInWei,
      maxFeePerGas: baseFeePerGas.add(priorityFeeInWei)        
  }
  return txOptions;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });