const { ethers } = require("hardhat");

const fs = require('fs');
const readline = require('readline');
const gutil = require('gulp-util');
const utils = require('../utils.js');

async function main() {
  var toadz = await deploy();

  createDirectoryIfNotExists('./scripts/output');
  createDirectoryIfNotExists('./scripts/output/images');
  createDirectoryIfNotExists('./scripts/output/images/frames');
  createDirectoryIfNotExists('./scripts/output/metadata');

  const logPath = './scripts/output/errors.txt';
  deleteFileIfExists(logPath);
  var logger = fs.createWriteStream(logPath);

  try {
    const fileStream = fs.createReadStream('./scripts/tokenIds.txt');
    const lines = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    var tasks = [];
    for await (const line of lines) {
      tasks.push(new Promise(() => utils.collect(toadz, parseInt(line), logger)));
    }
    await Promise.all(tasks);
    
  } catch (error) {
    console.error(gutil.colors.red(error));
  }

  fs.closeSync(logger);
}

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

function createDirectoryIfNotExists(path) {
  try {
      return fs.mkdirSync(path)
  } catch (error) {
      if (error.code !== 'EEXIST') throw error
  }
}

function deleteFileIfExists(path) {
  try {
      if (fs.existsSync(path)) {
          fs.unlinkSync(path);
      }
  } catch (error) {
      console.error(gutil.colors.red(error));
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(gutil.colors.red(error));
    process.exit(1);
  });
