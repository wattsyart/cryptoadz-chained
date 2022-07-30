const hre = require("hardhat");
const utils = require('../scripts/deploy.js');

describe("DeployCost", function () {
  it("deploys all contracts", async function () {
    await utils.deployContracts(hre.ethers, false, false);
  });
});
