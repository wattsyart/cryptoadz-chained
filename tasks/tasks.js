require("hardhat/config");

const utils = require('../utils.js');
const gutil = require('gulp-util');

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
      var contract = await factory.attach("0x74b56Aaa999b34fE66086fB2663560eA3360DCf8");
      toadz = contract;
      await utils.collect(toadz, parseInt(taskArgs.id));
    });
