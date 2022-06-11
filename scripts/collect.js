const hre = require("hardhat");
const ethers = hre.ethers;

const fs = require('fs');
const readline = require('readline');

const gifToPng = require('gif-to-png');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');

async function main() {
  var toadz = await deploy();
  const fileStream = fs.createReadStream('./scripts/tokenIds.txt');
  const lines = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  for await (const line of lines) {
    await collect(toadz, parseInt(line));
  }
}

async function deploy() {
  const CrypToadz = await ethers.getContractFactory("CrypToadz");
  const toadz = await CrypToadz.deploy();
  await toadz.deployed();
  console.log("CrypToadz deployed to: " + toadz.address);
  return toadz;
}

async function collect(contract, tokenId) {
  try {
    const pattern = /^data:.+\/(.+);base64,(.*)$/;

    // call contract to get tokenURI
    var tokenDataUri = await contract.tokenURI(tokenId);

    // convert base64 tokenURI to JSON
    var jsonData = tokenDataUri.match(pattern)[2];
    let jsonBuffer = Buffer.from(jsonData, 'base64');
    let json = jsonBuffer.toString('utf8');

    // write metadata for comparison
    fs.writeFileSync(`./scripts/output/metadata/${tokenId}.json`, json);
    console.log(`./scripts/output/metadata/${tokenId}.json`);
    
    // convert image URI to GIF buffer
    var imageDataUri = JSON.parse(json).image;
    var imageData = imageDataUri.match(pattern)[2];
    let imageBuffer = Buffer.from(imageData, 'base64');

    // write GIF buffer to disk for comparison
    var imagePath = `./scripts/output/images/${tokenId}.gif`;
    fs.writeFileSync(imagePath, imageBuffer);
    console.log(`./scripts/output/images/${tokenId}.gif`);

    // convert GIF to PNG frames for deltas
    const framePath = `./scripts/output/images/frames/${tokenId}`;
    createIfNotExists(framePath);
    await gifToPng(imagePath, framePath);

    // load PNGs for comparison images
    const asset = PNG.sync.read(fs.readFileSync(`./assets/TOADZ_${tokenId}.png`));        
    const generated = PNG.sync.read(fs.readFileSync(`./scripts/output/images/frames/${tokenId}/frame1.png`));

    // compare images for exact match
    const { width, height } = asset;
    const diff = new PNG({ width, height });
    const badPixels = pixelmatch(asset.data, generated.data, diff.data, width, height, { threshold: 0 });

    if (badPixels != 0) {
      fs.writeFileSync(`./scripts/output/images/${tokenId}_delta.png`, PNG.sync.write(diff));
      console.log(`${tokenId} is not exact!`);
    } else {
      console.log(`${tokenId} is exact!`);
    }

  } catch (error) {
    console.log(error);
  }
}

function createIfNotExists (path) {
  try {
    return fs.mkdirSync(path)
  } catch (error) {
    if (error.code !== 'EEXIST') throw error
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
