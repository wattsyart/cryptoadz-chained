require("hardhat/config");

const utils = require('../utils.js');
const fs = require('fs');
const readline = require('readline');

task("toad", "Validates correctness of a single CrypToad")
  .addParam("id", "The CrypToadz token ID to validate")
  .setAction(
    async (taskArgs) => {
      var toadz;
      var factory = await ethers.getContractFactory("CrypToadz", {
        libraries: {
          GIFEncoder: "0x7b62D26EfB24E95334D52dEe696F79D89bb7411F"
        }
      });
      toadz = await factory.attach("0x9562ac322fcfd9c1eD1e9358EC00186Bfc4C92c0");
      await utils.collect(toadz, parseInt(taskArgs.id));
    });

task("toad-custom-images", "Validates correctness of a CrypToadz custom images")
  .setAction(
    async (taskArgs) => {
      var toadz;
      var factory = await ethers.getContractFactory("CrypToadz", {
        libraries: {
          GIFEncoder: "0x7b62D26EfB24E95334D52dEe696F79D89bb7411F"
        }
      });
      toadz = await factory.attach("0x9562ac322fcfd9c1eD1e9358EC00186Bfc4C92c0");

      const fileStream = fs.createReadStream('./scripts/customImageTokenIds.txt');
      const lines = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
      });

      for await (const line of lines) {
        await utils.collect(toadz, parseInt(line),);
      }
    });

    task("toad-pixel-animations", "Validates correctness of a CrypToadz animations")
  .setAction(
    async (taskArgs) => {
      var toadz;
      var factory = await ethers.getContractFactory("CrypToadz", {
        libraries: {
          GIFEncoder: "0x7b62D26EfB24E95334D52dEe696F79D89bb7411F"
        }
      });
      toadz = await factory.attach("0x9562ac322fcfd9c1eD1e9358EC00186Bfc4C92c0");

      const fileStream = fs.createReadStream('./scripts/animationTokenIds.txt');
      const lines = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
      });

      for await (const line of lines) {
        await utils.collect(toadz, parseInt(line),);
      }
    });