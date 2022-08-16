const hre = require("hardhat");
const utils = require('../scripts/deploy.js');

describe("Deployments", function () {
  it("deploys all contracts", async function () {

    const { chainId } = await hre.ethers.provider.getNetwork()
    console.log("network: " + chainId);

    // Use explicit gas if running on a real network
    var txOptions;
    if(chainId == 8134646) {      
      txOptions = null; // privatenode
    } else {
      txOptions = getTxOptions();
    }

    // Deploy to real network w/ hardware wallet HID:
    //
    // Example:
    // --------
    // await utils.deployContracts(hre.ethers, 
    //   false /* quiet */, 
    //   false /* trace */, 
    //   getTxOptions() /* txOptions */, 
    //   "HID_FRESH_ADDRESS_PATH_GOES_HERE" /* hid */, 
    //   null /* signerOverride */
    // );

    // Deploy to real network w/ signer override:
    //
    // Example:
    // --------
    // var signerOverride = new ethers.Wallet("PRIVATE_KEY_NEVER_DO_THIS_HONESTLY", ethers.provider);
    // await utils.deployContracts(hre.ethers, 
    //   false /* quiet */, 
    //   false /* trace */, 
    //   getTxOptions() /* txOptions */, 
    //   null /* hid */, 
    //   signerOverride /* signerOverride */
    // );

    await utils.deployContracts(hre.ethers, 
      false /* quiet */, 
      false /* trace */, 
      txOptions /* txOptions */, 
      null /* hid */, 
      null /* signerOverride */
    );    
  });
});

function getTxOptions(gasLimit) {
  var baseFeePerGas = ethers.BigNumber.from(4).mul(hre.ethers.BigNumber.from(1000000000));
  var priorityFeeInWei = ethers.BigNumber.from(2).mul(hre.ethers.BigNumber.from(1000000000));
  const txOptions = {        
      maxPriorityFeePerGas: priorityFeeInWei,
      maxFeePerGas: baseFeePerGas.add(priorityFeeInWei)        
  }
  if(gasLimit) {
    txOptions.gasLimit = gasLimit;
  }
  return txOptions;
}

/*
// Random Testing:
var output = await utils.deployRandomContracts(hre.ethers, false, false);
var tokenURI = await output["CrypToadzChained"].randomTokenURIFromSeed("2439799993720087534");
console.log(tokenURI);
*/
