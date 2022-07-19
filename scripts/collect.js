const { ethers } = require("hardhat");

const fs = require('fs');
const readline = require('readline');
const gutil = require('gulp-util');
const utils = require('../utils.js');

async function main() {
  var toadz;
  var factory = await ethers.getContractFactory("CrypToadz", {
    libraries: {
      GIFEncoder: "0x7b62D26EfB24E95334D52dEe696F79D89bb7411F"
    }
  });
  toadz = await factory.attach("0x74b56Aaa999b34fE66086fB2663560eA3360DCf8");

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
