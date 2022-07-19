const { expect } = require("chai");
const { ethers } = require("hardhat");

var CrypToadzDeployed;

describe("CrypToadz", function () {

    beforeEach(async () => {

        const GIFEncoder = await ethers.getContractFactory("GIFEncoder");
        var GIFEncoderDeployed = await GIFEncoder.deploy();
        await GIFEncoderDeployed.deployed();
    
        const PixelRenderer = await ethers.getContractFactory("PixelRenderer");
        var PixelRendererDeployed = await PixelRenderer.deploy();
        await PixelRendererDeployed.deployed();
    
        const CrypToadzStrings = await ethers.getContractFactory("CrypToadzStrings");
        var CrypToadzStringsDeployed = await CrypToadzStrings.deploy();
        await CrypToadzStringsDeployed.deployed();
    
        const CrypToadzBuilder = await ethers.getContractFactory("CrypToadzBuilder", {
          libraries: {
            PixelRenderer: PixelRendererDeployed.address
          }
        });
        var CrypToadzBuilderDeployed = await CrypToadzBuilder.deploy();
        await CrypToadzBuilderDeployed.deployed();
    
        const CrypToadzMetadata = await ethers.getContractFactory("CrypToadzMetadata");
        var CrypToadzMetadataDeployed = await CrypToadzMetadata.deploy();
        await CrypToadzMetadataDeployed.deployed();
    
        const CrypToadz = await ethers.getContractFactory("CrypToadz", {
          libraries: {
            "GIFEncoder": GIFEncoderDeployed.address,
            "PixelRenderer": PixelRendererDeployed.address
          }
        });
        CrypToadzDeployed = await CrypToadz.deploy(CrypToadzStringsDeployed.address, CrypToadzBuilderDeployed.address, CrypToadzMetadataDeployed.address);
        await CrypToadzDeployed.deployed();
    });
    
    it("can get metadata for existing token", async function () {
        var tokenURI = await CrypToadzDeployed.tokenURI(1);
        console.log(tokenURI);
    });
});