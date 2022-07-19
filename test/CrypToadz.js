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
      
        const CrypToadzBuilderAny = await ethers.getContractFactory("CrypToadzBuilderAny");
        var CrypToadzBuilderAnyDeployed = await CrypToadzBuilderAny.deploy();
        await CrypToadzBuilderAnyDeployed.deployed();
      
        const CrypToadzBuilderShort = await ethers.getContractFactory("CrypToadzBuilderShort");
        var CrypToadzBuilderShortDeployed = await CrypToadzBuilderShort.deploy();
        await CrypToadzBuilderShortDeployed.deployed();
      
        const CrypToadzBuilderTall = await ethers.getContractFactory("CrypToadzBuilderTall");
        var CrypToadzBuilderTallDeployed = await CrypToadzBuilderTall.deploy();
        await CrypToadzBuilderTallDeployed.deployed();
      
        const CrypToadzBuilder = await ethers.getContractFactory("CrypToadzBuilder", {
          libraries: {
            PixelRenderer: PixelRendererDeployed.address
          }
        });
        var CrypToadzBuilderDeployed = await CrypToadzBuilder.deploy(CrypToadzBuilderAnyDeployed.address, CrypToadzBuilderShortDeployed.address, CrypToadzBuilderTallDeployed.address);
        await CrypToadzBuilderDeployed.deployed();
      
        const CrypToadzMetadata = await ethers.getContractFactory("CrypToadzMetadata");
        var CrypToadzMetadataDeployed = await CrypToadzMetadata.deploy();
        await CrypToadzMetadataDeployed.deployed();
      
        const CrypToadzAnimations = await ethers.getContractFactory("CrypToadzAnimations", {
          libraries: {
            PixelRenderer: PixelRendererDeployed.address
          }
        });
        var CrypToadzAnimationsDeployed = await CrypToadzAnimations.deploy();
        await CrypToadzAnimationsDeployed.deployed();
      
        const CrypToadzCustomImages = await ethers.getContractFactory("CrypToadzCustomImages");
        var CrypToadzCustomImagesDeployed = await CrypToadzCustomImages.deploy();
        await CrypToadzCustomImagesDeployed.deployed();
      
        const CrypToadzCustomAnimations = await ethers.getContractFactory("CrypToadzCustomAnimations");
        var CrypToadzCustomAnimationsDeployed = await CrypToadzCustomAnimations.deploy();
        await CrypToadzCustomAnimationsDeployed.deployed();
      
        const CrypToadz = await ethers.getContractFactory("CrypToadz", {
          libraries: {
            "GIFEncoder": GIFEncoderDeployed.address
          }
        });
        
        CrypToadzDeployed = await CrypToadz.deploy(
          CrypToadzStringsDeployed.address,
          CrypToadzBuilderDeployed.address,
          CrypToadzMetadataDeployed.address,
          CrypToadzAnimationsDeployed.address,
          CrypToadzCustomImagesDeployed.address,
          CrypToadzCustomAnimationsDeployed.address
        );
      
        await CrypToadzDeployed.deployed();
    });
    
    it("can get metadata for existing token", async function () {
        var tokenURI = await CrypToadzDeployed.tokenURI(1);
        console.log(tokenURI);
    });
});