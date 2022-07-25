require("hardhat/config");

const utils = require('../scripts/utils.js');
const fs = require('fs');
const readline = require('readline');

const GIFEncoderAddress = "0x7b62D26EfB24E95334D52dEe696F79D89bb7411F";
const CrypToadzChainedAddress = "0x299F288606EeE22364EE19bC0DD97e6Cf65f1b2a";

task("toadz", "Validates correctness of a single CrypToad")
  .addParam("id", "The CrypToadz token ID to validate")
  .setAction(
    async (taskArgs) => {
      var toadz;
      var factory = await ethers.getContractFactory("CrypToadzChained", {
        libraries: {
          GIFEncoder: GIFEncoderAddress
        }
      });
      toadz = await factory.attach(CrypToadzChainedAddress);

      var logger = null;
      await utils.collect(toadz, parseInt(taskArgs.id), logger, true, true);
    });

task("toadz-custom-images", "Validates correctness of a CrypToadz custom images")
  .setAction(
    async (taskArgs) => {
      checkToadz('./scripts/customImageIds.txt', null, GIFEncoderAddress, CrypToadzChainedAddress, true, true);
    });

task("toadz-custom-animations", "Validates correctness of a CrypToadz animations")
  .setAction(
    async (taskArgs) => {
      checkToadz('./scripts/customAnimationIds.txt', null, GIFEncoderAddress, CrypToadzChainedAddress, true, true);
    });

task("toadz-image-deltas", "Validates correctness of all CrypToadz token images that have deltas")
  .setAction(
    async (taskArgs) => {
      checkToadz('./scripts/deltaIds.txt', null, GIFEncoderAddress, CrypToadzChainedAddress, false, true);
    });

task("toadz-all", "Validates correctness of all CrypToadz tokens")
  .setAction(
    async (taskArgs) => {
      checkToadz('./scripts/tokenIds.txt', null, GIFEncoderAddress, CrypToadzChainedAddress, true, true);
    });

task("toadz-all-metadata", "Validates correctness of all CrypToadz token metadata")
  .setAction(
    async (taskArgs) => {
      checkToadz('./scripts/tokenIds.txt', null, GIFEncoderAddress, CrypToadzChainedAddress, true, false);
    });

task("crush", "Runs pngcrush on all custom images")
  .setAction(
    async (taskArgs) => {
      await utils.crush();
    });

async function checkToadz(idFilePath, gifEncoderAddress, contractAddress, logger, checkMetadata, checkImage) {
  var toadz;
      var factory = await ethers.getContractFactory("CrypToadzChained", {
        libraries: {
          GIFEncoder: gifEncoderAddress
        }
      });
      toadz = await factory.attach(contractAddress);

      const fileStream = fs.createReadStream(idFilePath);
      const lines = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
      });

      for await (const line of lines) {
        await utils.collect(toadz, parseInt(line), logger, checkMetadata, checkImage);
      }
}