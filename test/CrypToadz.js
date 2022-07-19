// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// var toadz;

// describe("CrypToadz", function () {

//     beforeEach(async () => {

//         const GIFEncoder = await ethers.getContractFactory("GIFEncoder");
//         var GIFEncoderDeployed = await GIFEncoder.deploy();
//         await GIFEncoderDeployed.deployed();

//         const PixelRenderer = await ethers.getContractFactory("PixelRenderer");
//         var PixelRendererDeployed = await PixelRenderer.deploy();
//         await PixelRendererDeployed.deployed();

//         const CrypToadz = await ethers.getContractFactory("CrypToadz",  { libraries: {
//             "GIFEncoder": GIFEncoderDeployed.address,
//             "PixelRenderer": PixelRendererDeployed.address
//         }});
//         toadz = await CrypToadz.deploy();
//         await toadz.deployed();
//     });
    
//     it("can get metadata for existing token", async function () {
//         var tokenURI = await toadz.tokenURI(1);
//         console.log(tokenURI);
//     });
// });