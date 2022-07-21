require("hardhat/config");

const utils = require('../scripts/utils.js');
const fs = require('fs');
const readline = require('readline');

task("toadz", "Validates correctness of a single CrypToad")
  .addParam("id", "The CrypToadz token ID to validate")
  .setAction(
    async (taskArgs) => {
      var toadz;
      var factory = await ethers.getContractFactory("CrypToadzChained", {
        libraries: {
          GIFEncoder: "0x7b62D26EfB24E95334D52dEe696F79D89bb7411F"
        }
      });
      toadz = await factory.attach("0x294eEB770Fa60Dc80f0D3e2C34B4fA10d7E51675");
      await utils.collect(toadz, parseInt(taskArgs.id));
    });

task("toadz-custom-images", "Validates correctness of a CrypToadz custom images")
  .setAction(
    async (taskArgs) => {
      var toadz;
      var factory = await ethers.getContractFactory("CrypToadzChained", {
        libraries: {
          GIFEncoder: "0x7b62D26EfB24E95334D52dEe696F79D89bb7411F"
        }
      });
      toadz = await factory.attach("0x294eEB770Fa60Dc80f0D3e2C34B4fA10d7E51675");

      const fileStream = fs.createReadStream('./scripts/customImageIds.txt');
      const lines = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
      });

      for await (const line of lines) {
        await utils.collect(toadz, parseInt(line),);
      }
    });

task("toadz-custom-animations", "Validates correctness of a CrypToadz animations")
  .setAction(
    async (taskArgs) => {
      var toadz;
      var factory = await ethers.getContractFactory("CrypToadzChained", {
        libraries: {
          GIFEncoder: "0x7b62D26EfB24E95334D52dEe696F79D89bb7411F"
        }
      });
      toadz = await factory.attach("0x294eEB770Fa60Dc80f0D3e2C34B4fA10d7E51675");

      const fileStream = fs.createReadStream('./scripts/customAnimationIds.txt');
      const lines = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
      });

      for await (const line of lines) {
        await utils.collect(toadz, parseInt(line),);
      }
    });

task("toadz-all", "Validates correctness of all CrypToadz tokens")
  .setAction(
    async (taskArgs) => {
      var toadz;
      var factory = await ethers.getContractFactory("CrypToadzChained", {
        libraries: {
          GIFEncoder: "0x7b62D26EfB24E95334D52dEe696F79D89bb7411F"
        }
      });
      toadz = await factory.attach("0x294eEB770Fa60Dc80f0D3e2C34B4fA10d7E51675");

      const fileStream = fs.createReadStream('./scripts/tokenIds.txt');
      const lines = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
      });

      for await (const line of lines) {
        await utils.collect(toadz, parseInt(line),);
      }
    });

task("crush", "Runs pngcrush on all custom images")
  .setAction(
    async (taskArgs) => {      
      await utils.crush();
    });