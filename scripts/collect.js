const hre = require("hardhat");
const ethers = hre.ethers;

const fs = require('fs');
const readline = require('readline');
const os = require("os");
const gutil = require('gulp-util');

const gifToPng = require('gif-to-png');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');

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

    for await (const line of lines) {
      await collect(toadz, parseInt(line), logger);
    }
  } catch (error) {
    console.log(error);
  }

  fs.closeSync(logger);
}

async function deploy() {
  const CrypToadz = await ethers.getContractFactory("CrypToadz");
  const toadz = await CrypToadz.deploy();
  await toadz.deployed();
  console.log("CrypToadz deployed to: " + toadz.address);
  return toadz;
}

async function collect(contract, tokenId, logger) {
  try {
    const pattern = /^data:.+\/(.+);base64,(.*)$/;

    // call contract to get tokenURI
    var tokenDataUri = await contract.tokenURI(tokenId);

    // convert base64 tokenURI to JSON
    var jsonData = tokenDataUri.match(pattern)[2];
    let jsonBuffer = Buffer.from(jsonData, 'base64');
    let json = jsonBuffer.toString('utf8');

    // write metadata for comparison
    const metadataPath = `./scripts/output/metadata/${tokenId}.json`;
    fs.writeFileSync(metadataPath, json);
    console.log(gutil.colors.green(metadataPath));

    // convert image URI to GIF buffer
    var imageDataUri = JSON.parse(json).image;
    var imageData = imageDataUri.match(pattern)[2];
    let imageBuffer = Buffer.from(imageData, 'base64');

    // write GIF buffer to disk for comparison
    const imagePath = `./scripts/output/images/${tokenId}.gif`;
    fs.writeFileSync(imagePath, imageBuffer);
    console.log(gutil.colors.green(imagePath));

    // convert GIF to PNG frames for deltas
    const framePath = `./scripts/output/images/frames/${tokenId}`;
    createDirectoryIfNotExists(framePath);
    await gifToPng(imagePath, framePath);

    // load PNGs for comparison images
    const asset = PNG.sync.read(fs.readFileSync(`./assets/TOADZ_${tokenId}.png`));
    const generated = PNG.sync.read(fs.readFileSync(`./scripts/output/images/frames/${tokenId}/frame1.png`));

    // compare images for exact match
    const { width, height } = asset;
    const diff = new PNG({ width, height });
    const badPixels = pixelmatch(asset.data, generated.data, diff.data, width, height, { threshold: 0 });

    // create delta image if there isn't an exact match, for inspection
    var deltaPath = `./scripts/output/images/${tokenId}_delta.png`;
    if (badPixels != 0) {
      fs.writeFileSync(deltaPath, PNG.sync.write(diff));
      console.log(gutil.colors.red(deltaPath));
      logger.write(`${tokenId}` + os.EOL);
    } else {
      deleteFileIfExists(deltaPath);
    }

  } catch (error) {
    console.log(error);
  }
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
  } catch(error) {
    console.error(error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
