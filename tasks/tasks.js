require("hardhat/config");

const utils = require('../utils.js');
const gutil = require('gulp-util');

task("toad", "Validates correctness of a single CrypToad")
    .addParam("id", "The CrypToadz token ID to validate")
    .setAction(
        async (taskArgs) => {
            var toadz = await deploy();
            await utils.collect(toadz, parseInt(taskArgs.id));
        });

async function deploy() {
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
    var CrypToadzDeployed = await CrypToadz.deploy(
      CrypToadzStringsDeployed.address,
      CrypToadzBuilderDeployed.address,
      CrypToadzMetadataDeployed.address,
      CrypToadzAnimationsDeployed.address,
      CrypToadzCustomImagesDeployed.address,
      CrypToadzCustomAnimationsDeployed.address
    );
  
    await CrypToadzDeployed.deployed();
    console.log(gutil.colors.blue(`CrypToadz deployed to: '${CrypToadzDeployed.address}'`));
    return CrypToadzDeployed;
}
