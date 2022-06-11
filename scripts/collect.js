const hre = require("hardhat");
const ethers = hre.ethers;

const fs = require('fs');
const readline = require('readline');

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
    
    var tokenDataUri = await contract.tokenURI(tokenId); 
    
    var pattern = /^data:.+\/(.+);base64,(.*)$/;
    var jsonData = tokenDataUri.match(pattern)[2];
    let jsonBuffer = Buffer.from(jsonData, 'base64');
    let json = jsonBuffer.toString('utf8');    
    
    fs.writeFileSync(`./scripts/output/metadata/${tokenId}.json`, json);
    console.log(`./scripts/output/metadata/${tokenId}.json`);    

    var imageDataUri = JSON.parse(json).image;
    var imageData = imageDataUri.match(pattern)[2];
    let imageBuffer = Buffer.from(imageData, 'base64');
    
    fs.writeFileSync(`./scripts/output/images/${tokenId}.gif`, imageBuffer);
    console.log(`./scripts/output/images/${tokenId}.gif`);   
    
  } catch (error) {
    console.log(error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
