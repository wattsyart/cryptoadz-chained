require("hardhat/config");

const utils = require('../scripts/utils.js');
const deploy = require('../scripts/deploy.js');

const fs = require('fs');
const readline = require('readline');
const gutil = require('gulp-util');
const { int } = require("hardhat/internal/core/params/argumentTypes.js");

const CrypToadzChainedAddress = "0x7b62D26EfB24E95334D52dEe696F79D89bb7411F";

task("toadz", "Validates correctness of a single CrypToadz")
  .addParam("id", "The CrypToadz token ID to validate")
  .setAction(
    async (taskArgs) => {
      var toadz = await getToadz();

      var logger = null;
      await utils.collect(toadz, parseInt(taskArgs.id), logger, true, true);
    });

task("toadz-wrapped", "Validates correctness of a single, wrapped CrypToadz")
  .addParam("id", "The CrypToadz token ID to validate")
  .setAction(
    async (taskArgs) => {
      var toadz = await getToadz();

      var logger = null;
      await utils.collect(toadz, parseInt(taskArgs.id), logger, true, true, true, true);
    });

task("toadz-custom-images", "Validates correctness of CrypToadz custom images")
  .addOptionalParam("from", "Start comparison on this token ID")
  .setAction(
    async (taskArgs) => {
      await checkToadz('./scripts/customImageIds.txt', null, true, true, taskArgs.from);
    });

task("toadz-custom-animations", "Validates correctness of CrypToadz custom animations")
  .addOptionalParam("from", "Start comparison on this token ID")
  .setAction(
    async (taskArgs) => {
      await checkToadz('./scripts/customAnimationIds.txt', null, true, true, taskArgs.from);
    });

task("toadz-image-deltas", "Validates correctness of CrypToadz token images that have deltas")
  .addOptionalParam("from", "Start comparison on this token ID")
  .setAction(
    async (taskArgs) => {
      await checkToadz('./scripts/deltaIds.txt', null, false, true, taskArgs.from);
    });

task("toadz-all", "Validates correctness of all CrypToadz tokens")
  .addOptionalParam("from", "Start comparison on this token ID")
  .setAction(
    async (taskArgs) => {
      await checkToadz('./scripts/tokenIds.txt', null, true, true, taskArgs.from);
    });

task("toadz-all-images", "Validates correctness of all CrypToadz token images")
  .addOptionalParam("from", "Start comparison on this token ID")
  .setAction(
    async (taskArgs) => {
      await checkToadz('./scripts/tokenIds.txt', null, false, true, taskArgs.from);
    });

task("toadz-all-metadata", "Validates correctness of all CrypToadz token metadata")
  .addOptionalParam("from", "Start comparison on this token ID")
  .setAction(
    async (taskArgs) => {
      await checkToadz('./scripts/tokenIds.txt', null, true, false, taskArgs.from);
    });

task("toadz-random-token", "Generates a random toadz tokenURI and saves the metadata and image to disk")
  .addOptionalParam("seed", "The random seed to use")
  .setAction(
    async (taskArgs) => {
      var toadz = await getToadz();
      if (!taskArgs.seed) {
        await utils.random(toadz)
      } else {
        await utils.random(toadz, parseInt(taskArgs.seed));
      }
    });

task("toadz-random-image", "Generates a random toadz imageURI and saves the image to disk")
  .addOptionalParam("seed", "The random seed to use")
  .addOptionalParam("output", "The output directory to save the new toadz", "./scripts/output/random")
  .setAction(
    async (taskArgs) => {
      var toadz = await getToadz();

      if (!taskArgs.seed) {
        await utils.randomImage(toadz, null, taskArgs.output);
      } else {
        await utils.randomImage(toadz, parseInt(taskArgs.seed), taskArgs.output);
      }
    });

task("toadz-random-token-batch", "Batch-based random token generation for stress testing")
  .addOptionalParam("count", "The number of random toadz to generate", "1")
  .addOptionalParam("output", "The output directory to save the new toadz", "./scripts/output/random")
  .setAction(
    async (taskArgs) => {
      var toadz = await getToadz();

      var count = parseInt(taskArgs.count);
      for (var i = 0; i < count; i++) {
        await utils.random(toadz, null, taskArgs.output);
      }
    });

task("toadz-random-image-batch", "Batch-based random image generation for stress testing")
  .addOptionalParam("count", "The number of random toadz to generate", "1")
  .addOptionalParam("output", "The output directory to save the new toadz", "./scripts/output/random")
  .setAction(
    async (taskArgs) => {
      var toadz = await getToadz();

      var count = parseInt(taskArgs.count);
      for (var i = 0; i < count; i++) {
        await utils.randomImage(toadz, null, taskArgs.output);
      }
    });

async function checkToadz(idFilePath, logger, checkMetadata, checkImage, startFrom) {
  var toadz = await getToadz();

  const fileStream = fs.createReadStream(idFilePath);
  const lines = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  if (startFrom) {
    for await (const line of lines) {
      var tokenId = parseInt(line);
      if (tokenId < startFrom) {
        continue;
      }
      await utils.collect(toadz, tokenId, logger, checkMetadata, checkImage);
    }
  } else {
    for await (const line of lines) {
      await utils.collect(toadz, parseInt(line), logger, checkMetadata, checkImage);
    }
  }
}

task("toadz-deploy-bundle", "Produces a JSON file containing unsigned transactions for all deployments at a set price budget")
  .addOptionalParam("gwei", "The gas budget in gwei to base ETH cost calculations on", "4")
  .addOptionalParam("priorityFee", "The priority fee in gwei", "2")
  .setAction(
    async (taskArgs, hre) => {

      var baseFeePerGas = ethers.BigNumber.from(parseInt(taskArgs.gwei)).mul(hre.ethers.BigNumber.from(1000000000));
      var priorityFeeInWei = ethers.BigNumber.from(parseInt(taskArgs.priorityFee)).mul(hre.ethers.BigNumber.from(1000000000));

      const txOptions = {
        maxPriorityFeePerGas: priorityFeeInWei,
        maxFeePerGas: baseFeePerGas.add(priorityFeeInWei)
      }

      var output = await deploy.deployContracts(hre.ethers, true, true, txOptions);
      var json = JSON.stringify(output);
      fs.writeFileSync(`./scripts/output/deploy.js`, json);
    }
  );

task("toadz-gas", "Produces ETH cost breakdown for deployment by component")
  .addOptionalParam("gwei", "The gas price in gwei to base ETH cost calculations on", "10")
  .setAction(
    async (taskArgs, hre) => {

      var gasPriceInWei = hre.ethers.BigNumber.from(parseInt(taskArgs.gwei)).mul(hre.ethers.BigNumber.from(1000000000));

      var customAnimationNames = [];
      {
        const customAnimationsPath = "./scripts/customAnimationIds.txt";
        if (!fs.existsSync(customAnimationsPath)) {
          console.log(gutil.colors.red(`This feature requires file '${customAnimationsPath}' to exist, containing a list of token IDs'`));
        }
        const fileStream = fs.createReadStream(customAnimationsPath);
        const lines = readline.createInterface({
          input: fileStream,
          crlfDelay: Infinity
        });
        for await (const line of lines) {
          customAnimationNames.push(parseInt(line));
        }
      }

      var customImageNames = [];
      {
        const customImagesPath = "./scripts/customImageIds.txt";
        if (!fs.existsSync(customImagesPath)) {
          console.log(gutil.colors.red(`This feature requires file '${customImagesPath}' to exist, containing a list of token IDs'`));
        }
        const fileStream = fs.createReadStream(customImagesPath);
        const lines = readline.createInterface({
          input: fileStream,
          crlfDelay: Infinity
        });
        for await (const line of lines) {
          customImageNames.push(parseInt(line));
        }
      }

      const reportPath = "./scripts/lastOutput.txt";
      if (!fs.existsSync(reportPath)) {
        console.log(gutil.colors.red(`This feature requires file '${reportPath}' to exist, containing the output from 'hardhat-gas-reporter'`));
      }
      const fileStream = fs.createReadStream(reportPath);
      const lines = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
      });

      var components = {};

      //
      // Main:
      const mainCategory = "Main";
      components["CrypToadzChained"] = {};
      components["CrypToadzChained"]["category"] = mainCategory;

      //
      // Metadata:
      const metadataCategory = "Metadata";
      components["CrypToadzStrings"] = {};
      components["CrypToadzStrings"]["category"] = metadataCategory;
      components["CrypToadzMetadata"] = {};
      components["CrypToadzMetadata"]["category"] = metadataCategory;

      //
      // Builder:            
      const builderCategory = "Builder";
      components["GIFEncoder"] = {};
      components["GIFEncoder"]["category"] = builderCategory;
      components["PixelRenderer"] = {};
      components["PixelRenderer"]["category"] = builderCategory;
      components["CrypToadzBuilder"] = {};
      components["CrypToadzBuilder"]["category"] = builderCategory;
      components["CrypToadzBuilder"] = {};
      components["CrypToadzBuilder"]["category"] = builderCategory;

      //
      // Deltas:
      const deltaCategory = "Deltas";

      //
      // Custom Images:
      const customImagesCategory = "Custom Images";
      components["CrypToadzCustomImages"] = {};
      components["CrypToadzCustomImages"]["category"] = customImagesCategory;

      //
      // Custom Animations:
      const customAnimationsCategory = "Custom Animations";
      components["CrypToadzCustomAnimations"] = {};
      components["CrypToadzCustomAnimations"]["category"] = customAnimationsCategory;

      var contractPaddingLength = "Contract".length;
      var categoryPaddingLength = "Category".length;
      var costPaddingLength = "Cost".length;

      var totalGas = ethers.BigNumber.from(0);

      for await (const line of lines) {
        if (line.includes("setRenderer") || line.includes("setAddresses") || line.includes("setEncoder")) {
          continue;
        }
        var name;
        if (line.startsWith("|  CrypToadz")) {
          name = line.match(/CrypToadz\S*/)[0];
          setDeploymentCost(gasPriceInWei, components, name, line, "CrypToadz");
        } else if (line.startsWith("|  GIFEncoder")) {
          name = "GIFEncoder";
          setDeploymentCost(gasPriceInWei, components, name, line, name);
        } else if (line.startsWith("|  PixelRenderer")) {
          name = "PixelRenderer";
          setDeploymentCost(gasPriceInWei, components, name, line, name);
        }
        if (name) {
          totalGas = totalGas.add(components[name]["gas"]);
        }
        if (name && name.length > contractPaddingLength) {
          contractPaddingLength = name.length;
        }
        if (name && components[name] && components[name]["category"] && components[name]["category"].length > categoryPaddingLength) {
          categoryPaddingLength = components[name]["category"].length;
        }
        if (name && components[name] && components[name]["cost"] && components[name]["cost"].toString().length > costPaddingLength) {
          costPaddingLength = components[name]["cost"].toString().length;
        }
        if (name && name.startsWith("CrypToadzBuilder")) {
          components[name]["category"] = builderCategory;
        }
        if (name && name.startsWith("CrypToadzDeltas")) {
          components[name]["category"] = deltaCategory;
        }
        if (name && name.startsWith("CrypToadzCustomImage") && !components[name]["category"]) {
          var tokenId = parseInt(name.replace("CrypToadzCustomImage", "").match(/\d*/)[0]);
          if (customAnimationNames.includes(tokenId)) {
            components[name]["category"] = customAnimationsCategory;
          } else if (customImageNames.includes(tokenId)) {
            components[name]["category"] = customImagesCategory;
          } else {
            console.log(gutil.colors.red(`Missing Category for '${name}!'`));
          }
        }
      }

      var totalCostInWei = ethers.BigNumber.from(0);

      totalCostInWei = totalCostInWei.add(renderCategoryTable(components, mainCategory, gasPriceInWei, contractPaddingLength, categoryPaddingLength, costPaddingLength));
      console.log();

      totalCostInWei = totalCostInWei.add(renderCategoryTable(components, metadataCategory, gasPriceInWei, contractPaddingLength, categoryPaddingLength, costPaddingLength));
      console.log();

      totalCostInWei = totalCostInWei.add(renderCategoryTable(components, builderCategory, gasPriceInWei, contractPaddingLength, categoryPaddingLength, costPaddingLength));
      console.log();

      totalCostInWei = totalCostInWei.add(renderCategoryTable(components, deltaCategory, gasPriceInWei, contractPaddingLength, categoryPaddingLength, costPaddingLength));
      console.log();

      totalCostInWei = totalCostInWei.add(renderCategoryTable(components, customAnimationsCategory, gasPriceInWei, contractPaddingLength, categoryPaddingLength, costPaddingLength));
      console.log();

      totalCostInWei = totalCostInWei.add(renderCategoryTable(components, customImagesCategory, gasPriceInWei, contractPaddingLength, categoryPaddingLength, costPaddingLength));
      console.log();

      console.log(`Total Gas = ${totalGas}`);
      console.log(`Total Cost = ${hre.ethers.utils.formatUnits(totalCostInWei, "ether")} eth @ ${taskArgs.gwei} gwei`);
    });


function renderCategoryTable(components, categoryName, gasPriceInWei, contractPaddingLength, categoryPaddingLength, costPaddingLength) {

  var categoryTotalGas = 0;
  for (const [, value] of Object.entries(components)) {
    if (value["category"] && value["category"] == categoryName) {
      categoryTotalGas += value["gas"];
    };
  }

  if (categoryTotalGas.toString().length > categoryPaddingLength) {
    categoryPaddingLength = categoryTotalGas.toString().length;
  }

  console.log(`| ${"Contract".padEnd(contractPaddingLength)} | ${"Category".padEnd(categoryPaddingLength)} | ${"Cost".padEnd(costPaddingLength)} |`);
  console.log(`| ${"".padEnd(contractPaddingLength, "-")} | ${"".padEnd(categoryPaddingLength, "-")} | ${"".padEnd(costPaddingLength, "-")} |`);

  for (const [key, value] of Object.entries(components)) {
    if (value["category"] && value["category"] == categoryName) {
      if (!value["cost"]) {
        console.log(gutil.colors.red(`${key} IS MISSING COST!`));
      } else {
        console.log(`| ${key.padEnd(contractPaddingLength)} | ${value["category"].padEnd(categoryPaddingLength)} | ${value["cost"].toString().padEnd(costPaddingLength, "0")} |`);
      }
    };
  }

  var totalCostInWei = gasPriceInWei.mul(hre.ethers.BigNumber.from(categoryTotalGas));
  var totalCostInEth = hre.ethers.utils.formatUnits(totalCostInWei, "ether");
  console.log(`| ${"Total".padEnd(contractPaddingLength)} | ${categoryTotalGas.toString().padEnd(categoryPaddingLength)} | ${totalCostInEth.toString().padEnd(costPaddingLength, "0")} |`);

  return totalCostInWei;
}

function setDeploymentCost(gasPriceInWei, components, name, line, preamble) {
  if (!components[name]) {
    components[name] = {};
  }

  const pattern = new RegExp(`\\|  ${preamble}\\S*\\s*.\\s*-\\s*\\·\\s*-\\s*\\·\\s*`);

  const gas = parseInt(line.replace(line.match(pattern)[0], "").match(/\d*/)[0]);
  components[name]["gas"] = gas;

  const cost = hre.ethers.utils.formatUnits(gasPriceInWei.mul(hre.ethers.BigNumber.from(gas)), "ether");
  components[name]["cost"] = cost;
}

async function getToadz() {
  var factory = await ethers.getContractFactory("CrypToadzChained");
  return await factory.attach(CrypToadzChainedAddress);
}
