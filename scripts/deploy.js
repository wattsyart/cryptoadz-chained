const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {
  const GIFEncoder = await ethers.getContractFactory("GIFEncoder");
    var GIFEncoderDeployed = await GIFEncoder.deploy();
    await GIFEncoderDeployed.deployed();

    const PixelRenderer = await ethers.getContractFactory("PixelRenderer");
    var PixelRendererDeployed = await PixelRenderer.deploy();
    await PixelRendererDeployed.deployed();

    const CrypToadz = await ethers.getContractFactory("CrypToadz", { libraries: {
        "GIFEncoder": GIFEncoderDeployed.address,
        "PixelRenderer": PixelRendererDeployed.address
    }});
    var CrypToadzDeployed = await CrypToadz.deploy();
    await CrypToadzDeployed.deployed();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
