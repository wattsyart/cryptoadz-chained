const { expect } = require("chai");
const { ethers } = require("hardhat");

var toadz;

describe("CrypToadz", function () {

    beforeEach(async () => {
        const CrypToadz = await ethers.getContractFactory("CrypToadz");
        toadz = await CrypToadz.deploy();
        await toadz.deployed();
    });
    
    it("can get metadata for existing token", async function () {
        var tokenURI = await toadz.tokenURI(1);
        console.log(tokenURI);
    });
});