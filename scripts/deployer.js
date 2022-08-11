const utils = require('./deploy.js');
const hre = require("hardhat");

async function main() {
  
  var txOptions;
  if(network.chainId == 8134646) {
    // no parameters needed on dev node
    txOptions = null;
  } else {
    // use explicit gas if running on a real network
    txOptions = getTxOptions();
  }

  // Deploy to real network w/ hardware wallet HID:
  //
  // Example:
  // --------
  // await utils.deployContracts(hre.ethers, 
  //   false /* quiet */, 
  //   false /* trace */, 
  //   txOptions /* txOptions */, 
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
  //   txOptions /* txOptions */, 
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