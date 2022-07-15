const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DeployCost", function () {
    it("deploys all contracts", async function () {
        const GIFEncoder = await ethers.getContractFactory("GIFEncoder");
        var GIFEncoderDeployed = await GIFEncoder.deploy();
        await GIFEncoderDeployed.deployed();

        const PixelRenderer = await ethers.getContractFactory("PixelRenderer");
        var PixelRendererDeployed = await PixelRenderer.deploy();
        await PixelRendererDeployed.deployed();

        const CrypToadz = await ethers.getContractFactory("CrypToadz",  { libraries: {
            "GIFEncoder": GIFEncoderDeployed.address,
            "PixelRenderer": PixelRendererDeployed.address
        }});
        var CrypToadzDeployed = await CrypToadz.deploy();
        await CrypToadzDeployed.deployed();
    });
});
