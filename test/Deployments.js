const hre = require("hardhat");
const utils = require('../scripts/deploy.js');

describe("Deployments", function () {
  it("deploys all contracts", async function () {
    await utils.deployContracts(hre.ethers, false, false);
  });

  it("can prepare all deployment transactions", async function () {    

    var baseFeePerGas = ethers.BigNumber.from(4).mul(hre.ethers.BigNumber.from(1000000000));
    var priorityFeeInWei = ethers.BigNumber.from(2).mul(hre.ethers.BigNumber.from(1000000000));

    const txOptions = {        
        maxPriorityFeePerGas: priorityFeeInWei,
        maxFeePerGas: baseFeePerGas.add(priorityFeeInWei)        
    }

    var unsignedTxs = await utils.deployContracts(hre.ethers, true, true, txOptions);
    console.log(`Number of unsigned transactions = ${Object.keys(unsignedTxs).length}`);

    // Pre-singing transactions is not supported by hardhat provider
    /* 
    [owner] = await ethers.getSigners();
    var signedTxs = {};
    for (const [key, value] of Object.entries(unsignedTxs)) {
      signedTxs[key] = owner.signTransaction(value);
    }
    */

  });
});
