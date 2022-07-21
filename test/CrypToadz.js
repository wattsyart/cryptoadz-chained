const { expect } = require("chai");
const { ethers } = require("hardhat");
const utils = require('../scripts/deploy.js');

var CrypToadzDeployed;

describe("CrypToadz", function () {

  beforeEach(async () => {
    CrypToadzDeployed = await utils.deployContracts();
  });

  it("can get metadata for existing token", async function () {
    var tokenURI = await CrypToadzDeployed.tokenURI(1005);
    console.log(tokenURI);
  });
});