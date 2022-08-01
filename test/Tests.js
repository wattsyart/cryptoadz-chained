const hre = require("hardhat");
const utils = require('../scripts/deploy.js');
const { expect } = require("chai");

const CrypToadzChainedAddress = "0x7b62D26EfB24E95334D52dEe696F79D89bb7411F";

describe("Tests", function () {
  it("can operate all locks", async function () {    
    var toadz = await getToadz();

    {
      var address = "0x274c28Af41942D79d35D20A78600Cac06059aA42"; // CrypToadzStrings      
      await toadz.setStrings(CrypToadzChainedAddress); 
      await expect(toadz.lockStrings()).to.be.revertedWith("Not ICrypToadzStrings");    
      await toadz.setStrings(address); 
      await toadz.lockStrings();
      await expect(toadz.setStrings(address)).to.be.revertedWith("Strings locked");
    }

    {
      var address = "0xf8e694389354bF12899B3b9e7380f9611B2b7063"; // CrypToadzMetadata
      await toadz.setMetadata(CrypToadzChainedAddress); 
      await expect(toadz.lockMetadata()).to.be.revertedWith("Not ICrypToadzMetadata");    
      await toadz.setMetadata(address); 
      await toadz.lockMetadata();
      await expect(toadz.setMetadata(address)).to.be.revertedWith("Metadata locked");
    }

    {
      var address = "0x0607373b0dD741697770A4Cc1D41580f4f7751Be"; // CrypToadzDeltas
      await toadz.setDeltas(CrypToadzChainedAddress); 
      await expect(toadz.lockDeltas()).to.be.revertedWith("Not ICrypToadzDeltas");    
      await toadz.setDeltas(address); 
      await toadz.lockDeltas();
      await expect(toadz.setDeltas(address)).to.be.revertedWith("Deltas locked");
    }

    {
      var address = "0xDba6D8Bc1B5Af35B17912e1A06b1983FA2Bc3ea9"; // CrypToadzBuilder
      await toadz.setBuilder(CrypToadzChainedAddress); 
      await expect(toadz.lockBuilder()).to.be.revertedWith("Not ICrypToadzBuilder");    
      await toadz.setBuilder(address); 
      await toadz.lockBuilder();
      await expect(toadz.setBuilder(address)).to.be.revertedWith("Builder locked");
    }
    
    {
      var address = "0x3776cD7bf3e78d90868f397b7e3F37186f7667a2"; // CrypToadzCustomImages
      await toadz.setCustomImages(CrypToadzChainedAddress); 
      await expect(toadz.lockCustomImages()).to.be.revertedWith("Not ICrypToadzCustomImages");    
      await toadz.setCustomImages(address); 
      await toadz.lockCustomImages();
      await expect(toadz.setCustomImages(address)).to.be.revertedWith("CustomImages locked");
    }

    {
      var address = "0x2DE63946308007D08Ee46Eb1d990302d1f6fdb05"; // CrypToadzCustomAnimations
      await toadz.setCustomAnimations(CrypToadzChainedAddress); 
      await expect(toadz.lockCustomAnimations()).to.be.revertedWith("Not ICrypToadzCustomAnimations");    
      await toadz.setCustomAnimations(address); 
      await toadz.lockCustomAnimations();
      await expect(toadz.setCustomAnimations(address)).to.be.revertedWith("CustomAnimations locked");
    }
  });
});

async function getToadz() {
  var factory = await ethers.getContractFactory("CrypToadzChained");
  return await factory.attach(CrypToadzChainedAddress);
}
