const hre = require("hardhat");
const utils = require('../scripts/deploy.js');

describe("Deployments", function () {
  it("deploys all contracts", async function () {
    const network = await ethers.provider.getNetwork();
    console.log(`network: ${network.chainId}`);    

    // private node has throw-away key, doesn't need a hardware wallet
    if(network.chainId == 8134646) {      
      await utils.deployContracts(hre.ethers, false, false);
      return;
    }

    // Deploy to real network w/ hardware wallet HID:
    // await utils.deployContracts(hre.ethers, false, false, getTxOptions(), "HID_FRESH_ADDRESS_PATH_GOES_HERE");

    // Deploy to real network without hardware wallet (adding a signer override is left to the caller)
    await utils.deployContracts(hre.ethers, false, false, getTxOptions());

    // Random Testing:
    /*
    var output = await utils.deployRandomContracts(hre.ethers, false, false);
    var tokenURI = await output["CrypToadzChained"].randomTokenURIFromSeed("2439799993720087534");
    console.log(tokenURI);
    */
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
