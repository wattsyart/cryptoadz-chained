const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {

  const GIFEncoder = await ethers.getContractFactory("GIFEncoder");
  var GIFEncoderDeployed = await GIFEncoder.deploy();
  await GIFEncoderDeployed.deployed();
  console.log("GIFEncoder deployed to " + GIFEncoderDeployed.address);

  const PixelRenderer = await ethers.getContractFactory("PixelRenderer");
  var PixelRendererDeployed = await PixelRenderer.deploy();
  await PixelRendererDeployed.deployed();
  console.log("PixelRenderer deployed to " + PixelRendererDeployed.address);

  const CrypToadzStrings = await ethers.getContractFactory("CrypToadzStrings");
  var CrypToadzStringsDeployed = await CrypToadzStrings.deploy();
  await CrypToadzStringsDeployed.deployed();
  console.log("CrypToadzStrings deployed to " + CrypToadzStringsDeployed.address);

  const CrypToadzBuilderAny = await ethers.getContractFactory("CrypToadzBuilderAny");
  var CrypToadzBuilderAnyDeployed = await CrypToadzBuilderAny.deploy();
  await CrypToadzBuilderAnyDeployed.deployed();
  console.log("CrypToadzBuilderAny deployed to " + CrypToadzBuilderAnyDeployed.address);

  const CrypToadzBuilderShort = await ethers.getContractFactory("CrypToadzBuilderShort");
  var CrypToadzBuilderShortDeployed = await CrypToadzBuilderShort.deploy();
  await CrypToadzBuilderShortDeployed.deployed();
  console.log("CrypToadzBuilderShort deployed to " + CrypToadzBuilderShortDeployed.address);

  const CrypToadzBuilderTall = await ethers.getContractFactory("CrypToadzBuilderTall");
  var CrypToadzBuilderTallDeployed = await CrypToadzBuilderTall.deploy();
  await CrypToadzBuilderTallDeployed.deployed();
  console.log("CrypToadzBuilderTall deployed to " + CrypToadzBuilderTallDeployed.address);

  const CrypToadzBuilder = await ethers.getContractFactory("CrypToadzBuilder", {
    libraries: {
      PixelRenderer: PixelRendererDeployed.address
    }
  });
  var CrypToadzBuilderDeployed = await CrypToadzBuilder.deploy(CrypToadzBuilderAnyDeployed.address, CrypToadzBuilderShortDeployed.address, CrypToadzBuilderTallDeployed.address);
  await CrypToadzBuilderDeployed.deployed();
  console.log("CrypToadzBuilder deployed to " + CrypToadzBuilderDeployed.address);

  const CrypToadzMetadata = await ethers.getContractFactory("CrypToadzMetadata");
  var CrypToadzMetadataDeployed = await CrypToadzMetadata.deploy();
  await CrypToadzMetadataDeployed.deployed();
  console.log("CrypToadzMetadata deployed to " + CrypToadzMetadataDeployed.address);

  const CrypToadzAnimations = await ethers.getContractFactory("CrypToadzAnimations", {
    libraries: {
      PixelRenderer: PixelRendererDeployed.address
    }
  });
  var CrypToadzAnimationsDeployed = await CrypToadzAnimations.deploy();
  await CrypToadzAnimationsDeployed.deployed();
  console.log("CrypToadzAnimations deployed to " + CrypToadzAnimationsDeployed.address);

  const CrypToadzCustomImages = await ethers.getContractFactory("CrypToadzCustomImages");
  var CrypToadzCustomImagesDeployed = await CrypToadzCustomImages.deploy();
  await CrypToadzCustomImagesDeployed.deployed();
  console.log("CrypToadzCustomImages deployed to " + CrypToadzCustomImagesDeployed.address);

  const CrypToadzCustomAnimations = await ethers.getContractFactory("CrypToadzCustomAnimations");
  var CrypToadzCustomAnimationsDeployed = await CrypToadzCustomAnimations.deploy();
  await CrypToadzCustomAnimationsDeployed.deployed();
  console.log("CrypToadzCustomAnimations deployed to " + CrypToadzCustomAnimationsDeployed.address);

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
  console.log("CrypToadz deployed to " + CrypToadzDeployed.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
