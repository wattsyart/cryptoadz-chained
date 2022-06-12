require("hardhat/config");

const utils = require('../utils.js');
const gutil = require('gulp-util');

task("toad", "Validates correctness of a single CrypToad")
    .addParam("id", "The CrypToadz token ID to validate")
    .setAction(
        async (taskArgs) => {
            var toadz = await deploy();
            await utils.collect(toadz, parseInt(taskArgs.id));
        });

async function deploy() {
    const CrypToadz = await ethers.getContractFactory('CrypToadz');
    const toadz = await CrypToadz.deploy();
    await toadz.deployed();
    console.log(gutil.colors.blue(`CrypToadz deployed to: '${toadz.address}'`));
    return toadz;
}
