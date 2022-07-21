const { ethers } = require("hardhat");

const fs = require('fs');
const readline = require('readline');
const gutil = require('gulp-util');
const utils = require('../utils.js');

async function main() {
  var toadz;
  var factory = await ethers.getContractFactory("CrypToadzChained", {
    libraries: {
      GIFEncoder: "0x7b62D26EfB24E95334D52dEe696F79D89bb7411F"
    }
  });
  toadz = await factory.attach("0x294eEB770Fa60Dc80f0D3e2C34B4fA10d7E51675");

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
      await utils.collect(toadz, parseInt(line), logger);
    }
  } catch (error) {
    console.error(gutil.colors.red(error));
  }

  fs.closeSync(logger);
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
