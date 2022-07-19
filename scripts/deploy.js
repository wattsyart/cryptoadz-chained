const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {

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
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
