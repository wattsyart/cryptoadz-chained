const fs = require('fs');
const { LedgerSigner } = require("@ethersproject/hardware-wallets");

module.exports = {
  deployContracts: deployContracts,
  deployRandomContracts: deployRandomContracts
}

var signer;

// https://docs.ethers.io/v5/api/contract/contract-factory/
async function deployContract(manifest, ethers, contractName, quiet, trace, txOptions, hid, signerOverride) {

  if (!signer && signerOverride) {
    console.log("using signer override");
    signer = signerOverride;
  }

  if (hid && !signer) {
    signer = new LedgerSigner(ethers.provider, "hid", hid);
    // ethers ledger plugin *STILL* doesn't have EIP-1559 support, so we have to drop to legacy transactions
    // see: https://github.com/ethers-io/ethers.js/issues/2078    
    txOptions.type = 1;
    var maxFeePerGas = txOptions.maxFeePerGas;
    delete txOptions["maxFeePerGas"];
    delete txOptions["maxPriorityFeePerGas"];
    txOptions.gasPrice = maxFeePerGas;
  } else if (!signer) {
    [owner] = await ethers.getSigners();
    signer = owner;
  }

  if (manifest[contractName] && !trace) {
    var factory = await ethers.getContractFactory(contractName);
    var output = factory.attach(manifest[contractName]);
    output = output.connect(signer);
    console.log(`${contractName} already deployed to ${output.address}`);
    return output;
  }

  console.log("signer:", (await signer.getAddress()).toString());
  console.log("balance:", (await signer.getBalance()).toString());

  const contract = await (await ethers.getContractFactory(contractName)).connect(signer);
  if (trace) {
    // https://docs.ethers.io/v5/api/utils/transactions/#UnsignedTransaction
    var unsignedTx = await contract.getDeployTransaction(txOptions);
    if (!quiet) console.log(`${contractName} created unsigned transaction`);
    return unsignedTx;
  } else {
    var deployed = await contract.deploy(txOptions);
    await deployed.deployed();
    if (!quiet) console.log(`${contractName} deployed to ${deployed.address}`);
    manifest[contractName] = deployed.address;
    fs.writeFileSync("./scripts/manifest.json", JSON.stringify(manifest));
    return deployed;
  }
}

async function deployContracts(ethers, quiet, trace, txOptions, hid, signerOverride) {

  if (hid && signerOverride) {
    console.log("ERROR: cannot specify both an HID and a signer override!");
    return;
  }

  if (!quiet) quiet = false;
  if (!trace) trace = false;

  console.log("quiet: " + quiet);
  console.log("trace: " + trace);

  if (txOptions) {
    console.log("txOptions: " + JSON.stringify(txOptions));
  }
  if (hid) {
    console.log("hid: " + hid);
  }
  if (signerOverride) {
    console.log("signerOverride: " + signerOverride.address);
  }

  console.log();

  if (!txOptions) txOptions = {};

  var output = {};

  const manifestPath = "./scripts/manifest.json";
  if (!fs.existsSync(manifestPath)) {
    console.log("creating ./scripts/manifest.json");
    fs.writeFileSync(manifestPath, "{}");
  }

  var manifest = JSON.parse(fs.readFileSync("./scripts/manifest.json").toString('utf8'));

  output["CrypToadzChained"] = await deployContract(manifest, ethers, "CrypToadzChained", quiet, trace, txOptions, hid, signerOverride);

  output["GIFEncoder"] = await deployContract(manifest, ethers, "GIFEncoder", quiet, trace, txOptions, hid, signerOverride);
  output["PixelRenderer"] = await deployContract(manifest, ethers, "PixelRenderer", quiet, trace, txOptions, hid, signerOverride);

  output["CrypToadzStrings"] = await deployContract(manifest, ethers, "CrypToadzStrings", quiet, trace, txOptions, hid, signerOverride);
  output["CrypToadzMetadata"] = await deployContract(manifest, ethers, "CrypToadzMetadata", quiet, trace, txOptions, hid, signerOverride);
  output["CrypToadzDeltas"] = await deployContract(manifest, ethers, "CrypToadzDeltas", quiet, trace, txOptions, hid, signerOverride);
  output["CrypToadzBuilder"] = await deployContract(manifest, ethers, "CrypToadzBuilder", quiet, trace, txOptions, hid, signerOverride);
  output["CrypToadzCustomImages"] = await deployContract(manifest, ethers, "CrypToadzCustomImages", quiet, trace, txOptions, hid, signerOverride);
  output["CrypToadzCustomAnimations"] = await deployContract(manifest, ethers, "CrypToadzCustomAnimations", quiet, trace, txOptions, hid, signerOverride);

  output["CrypToadzDeltasA"] = await deployContract(manifest, ethers, "CrypToadzDeltasA", quiet, trace, txOptions, hid, signerOverride);
  output["CrypToadzDeltasB"] = await deployContract(manifest, ethers, "CrypToadzDeltasB", quiet, trace, txOptions, hid, signerOverride);
  output["CrypToadzDeltasC"] = await deployContract(manifest, ethers, "CrypToadzDeltasC", quiet, trace, txOptions, hid, signerOverride);

  output["CrypToadzBuilderAny"] = await deployContract(manifest, ethers, "CrypToadzBuilderAny", quiet, trace, txOptions, hid, signerOverride);
  output["CrypToadzBuilderAnyA"] = await deployContract(manifest, ethers, "CrypToadzBuilderAnyA", quiet, trace, txOptions, hid, signerOverride);
  output["CrypToadzBuilderAnyB"] = await deployContract(manifest, ethers, "CrypToadzBuilderAnyB", quiet, trace, txOptions, hid, signerOverride);
  output["CrypToadzBuilderShort"] = await deployContract(manifest, ethers, "CrypToadzBuilderShort", quiet, trace, txOptions, hid, signerOverride);
  output["CrypToadzBuilderTall"] = await deployContract(manifest, ethers, "CrypToadzBuilderTall", quiet, trace, txOptions, hid, signerOverride);

  if (true) {
    output["CrypToadzCustomImage1000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage1000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage10000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage10000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage1005A"] = await deployContract(manifest, ethers, "CrypToadzCustomImage1005A", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage1005B"] = await deployContract(manifest, ethers, "CrypToadzCustomImage1005B", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage1005"] = await deployContract(manifest, ethers, "CrypToadzCustomImage1005", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage11000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage11000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage1165"] = await deployContract(manifest, ethers, "CrypToadzCustomImage1165", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage12000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage12000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage123"] = await deployContract(manifest, ethers, "CrypToadzCustomImage123", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage13000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage13000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage14000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage14000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage1423"] = await deployContract(manifest, ethers, "CrypToadzCustomImage1423", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage15000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage15000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage1559"] = await deployContract(manifest, ethers, "CrypToadzCustomImage1559", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage16000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage16000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage1637"] = await deployContract(manifest, ethers, "CrypToadzCustomImage1637", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage17000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage17000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage1703"] = await deployContract(manifest, ethers, "CrypToadzCustomImage1703", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage1754"] = await deployContract(manifest, ethers, "CrypToadzCustomImage1754", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage1793"] = await deployContract(manifest, ethers, "CrypToadzCustomImage1793", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage18000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage18000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage1812A"] = await deployContract(manifest, ethers, "CrypToadzCustomImage1812A", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage1812B"] = await deployContract(manifest, ethers, "CrypToadzCustomImage1812B", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage1812"] = await deployContract(manifest, ethers, "CrypToadzCustomImage1812", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage19000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage19000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage1935"] = await deployContract(manifest, ethers, "CrypToadzCustomImage1935", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage1975A"] = await deployContract(manifest, ethers, "CrypToadzCustomImage1975A", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage1975B"] = await deployContract(manifest, ethers, "CrypToadzCustomImage1975B", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage1975"] = await deployContract(manifest, ethers, "CrypToadzCustomImage1975", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage2000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage2000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage20000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage20000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage21000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage21000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage2124"] = await deployContract(manifest, ethers, "CrypToadzCustomImage2124", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage22000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage22000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage2232A"] = await deployContract(manifest, ethers, "CrypToadzCustomImage2232A", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage2232B"] = await deployContract(manifest, ethers, "CrypToadzCustomImage2232B", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage2232"] = await deployContract(manifest, ethers, "CrypToadzCustomImage2232", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage23000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage23000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage2327A"] = await deployContract(manifest, ethers, "CrypToadzCustomImage2327A", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage2327B"] = await deployContract(manifest, ethers, "CrypToadzCustomImage2327B", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage2327"] = await deployContract(manifest, ethers, "CrypToadzCustomImage2327", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage24000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage24000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage2469"] = await deployContract(manifest, ethers, "CrypToadzCustomImage2469", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage2471"] = await deployContract(manifest, ethers, "CrypToadzCustomImage2471", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage2482"] = await deployContract(manifest, ethers, "CrypToadzCustomImage2482", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage2489A"] = await deployContract(manifest, ethers, "CrypToadzCustomImage2489A", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage2489B"] = await deployContract(manifest, ethers, "CrypToadzCustomImage2489B", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage2489"] = await deployContract(manifest, ethers, "CrypToadzCustomImage2489", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage25000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage25000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage2521"] = await deployContract(manifest, ethers, "CrypToadzCustomImage2521", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage2569"] = await deployContract(manifest, ethers, "CrypToadzCustomImage2569", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage2579"] = await deployContract(manifest, ethers, "CrypToadzCustomImage2579", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage26000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage26000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage27000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage27000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage2709"] = await deployContract(manifest, ethers, "CrypToadzCustomImage2709", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage28000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage28000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage2825A"] = await deployContract(manifest, ethers, "CrypToadzCustomImage2825A", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage2825B"] = await deployContract(manifest, ethers, "CrypToadzCustomImage2825B", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage2825"] = await deployContract(manifest, ethers, "CrypToadzCustomImage2825", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage2839"] = await deployContract(manifest, ethers, "CrypToadzCustomImage2839", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage2846"] = await deployContract(manifest, ethers, "CrypToadzCustomImage2846", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage2865"] = await deployContract(manifest, ethers, "CrypToadzCustomImage2865", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage29000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage29000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage2959A"] = await deployContract(manifest, ethers, "CrypToadzCustomImage2959A", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage2959B"] = await deployContract(manifest, ethers, "CrypToadzCustomImage2959B", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage2959"] = await deployContract(manifest, ethers, "CrypToadzCustomImage2959", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage2986"] = await deployContract(manifest, ethers, "CrypToadzCustomImage2986", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage3000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage3000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage30000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage30000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage31000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage31000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage316"] = await deployContract(manifest, ethers, "CrypToadzCustomImage316", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage3196A"] = await deployContract(manifest, ethers, "CrypToadzCustomImage3196A", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage3196B"] = await deployContract(manifest, ethers, "CrypToadzCustomImage3196B", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage3196"] = await deployContract(manifest, ethers, "CrypToadzCustomImage3196", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage32000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage32000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage33000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage33000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage3309A"] = await deployContract(manifest, ethers, "CrypToadzCustomImage3309A", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage3309B"] = await deployContract(manifest, ethers, "CrypToadzCustomImage3309B", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage3309C"] = await deployContract(manifest, ethers, "CrypToadzCustomImage3309C", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage3309"] = await deployContract(manifest, ethers, "CrypToadzCustomImage3309", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage3382A"] = await deployContract(manifest, ethers, "CrypToadzCustomImage3382A", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage3382B"] = await deployContract(manifest, ethers, "CrypToadzCustomImage3382B", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage3382"] = await deployContract(manifest, ethers, "CrypToadzCustomImage3382", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage34000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage34000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage35000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage35000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage36000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage36000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage37000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage37000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage3703"] = await deployContract(manifest, ethers, "CrypToadzCustomImage3703", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage38000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage38000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage39000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage39000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage4000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage4000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage40000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage40000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage4096"] = await deployContract(manifest, ethers, "CrypToadzCustomImage4096", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage41000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage41000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage4126"] = await deployContract(manifest, ethers, "CrypToadzCustomImage4126", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage4152A"] = await deployContract(manifest, ethers, "CrypToadzCustomImage4152A", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage4152B"] = await deployContract(manifest, ethers, "CrypToadzCustomImage4152B", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage4152"] = await deployContract(manifest, ethers, "CrypToadzCustomImage4152", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage4192"] = await deployContract(manifest, ethers, "CrypToadzCustomImage4192", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage42000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage42000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage4201"] = await deployContract(manifest, ethers, "CrypToadzCustomImage4201", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage4221"] = await deployContract(manifest, ethers, "CrypToadzCustomImage4221", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage4238A"] = await deployContract(manifest, ethers, "CrypToadzCustomImage4238A", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage4238B"] = await deployContract(manifest, ethers, "CrypToadzCustomImage4238B", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage4238"] = await deployContract(manifest, ethers, "CrypToadzCustomImage4238", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage4368"] = await deployContract(manifest, ethers, "CrypToadzCustomImage4368", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage44000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage44000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage45000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage45000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage4578"] = await deployContract(manifest, ethers, "CrypToadzCustomImage4578", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage4580A"] = await deployContract(manifest, ethers, "CrypToadzCustomImage4580A", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage4580B"] = await deployContract(manifest, ethers, "CrypToadzCustomImage4580B", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage4580"] = await deployContract(manifest, ethers, "CrypToadzCustomImage4580", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage46000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage46000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage4604"] = await deployContract(manifest, ethers, "CrypToadzCustomImage4604", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage47000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage47000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage4714"] = await deployContract(manifest, ethers, "CrypToadzCustomImage4714", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage472"] = await deployContract(manifest, ethers, "CrypToadzCustomImage472", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage4773"] = await deployContract(manifest, ethers, "CrypToadzCustomImage4773", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage4845"] = await deployContract(manifest, ethers, "CrypToadzCustomImage4845", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage4896A"] = await deployContract(manifest, ethers, "CrypToadzCustomImage4896A", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage4896B"] = await deployContract(manifest, ethers, "CrypToadzCustomImage4896B", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage4896C"] = await deployContract(manifest, ethers, "CrypToadzCustomImage4896C", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage4896"] = await deployContract(manifest, ethers, "CrypToadzCustomImage4896", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage49000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage49000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage491"] = await deployContract(manifest, ethers, "CrypToadzCustomImage491", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage5000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage5000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage50000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage50000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage51000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage51000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage5128"] = await deployContract(manifest, ethers, "CrypToadzCustomImage5128", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage5150"] = await deployContract(manifest, ethers, "CrypToadzCustomImage5150", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage52000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage52000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage5262"] = await deployContract(manifest, ethers, "CrypToadzCustomImage5262", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage53000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage53000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage54000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage54000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage5441"] = await deployContract(manifest, ethers, "CrypToadzCustomImage5441", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage5471A"] = await deployContract(manifest, ethers, "CrypToadzCustomImage5471A", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage5471B"] = await deployContract(manifest, ethers, "CrypToadzCustomImage5471B", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage5471C"] = await deployContract(manifest, ethers, "CrypToadzCustomImage5471C", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage5471"] = await deployContract(manifest, ethers, "CrypToadzCustomImage5471", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage55000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage55000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage56000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage56000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage5730"] = await deployContract(manifest, ethers, "CrypToadzCustomImage5730", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage5836"] = await deployContract(manifest, ethers, "CrypToadzCustomImage5836", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage5848"] = await deployContract(manifest, ethers, "CrypToadzCustomImage5848", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage5902A"] = await deployContract(manifest, ethers, "CrypToadzCustomImage5902A", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage5902B"] = await deployContract(manifest, ethers, "CrypToadzCustomImage5902B", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage5902"] = await deployContract(manifest, ethers, "CrypToadzCustomImage5902", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage6000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage6000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage6214A"] = await deployContract(manifest, ethers, "CrypToadzCustomImage6214A", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage6214B"] = await deployContract(manifest, ethers, "CrypToadzCustomImage6214B", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage6214"] = await deployContract(manifest, ethers, "CrypToadzCustomImage6214", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage6382A"] = await deployContract(manifest, ethers, "CrypToadzCustomImage6382A", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage6382B"] = await deployContract(manifest, ethers, "CrypToadzCustomImage6382B", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage6382"] = await deployContract(manifest, ethers, "CrypToadzCustomImage6382", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage6491"] = await deployContract(manifest, ethers, "CrypToadzCustomImage6491", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage6572"] = await deployContract(manifest, ethers, "CrypToadzCustomImage6572", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage6578"] = await deployContract(manifest, ethers, "CrypToadzCustomImage6578", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage6631"] = await deployContract(manifest, ethers, "CrypToadzCustomImage6631", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage6719"] = await deployContract(manifest, ethers, "CrypToadzCustomImage6719", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage6736"] = await deployContract(manifest, ethers, "CrypToadzCustomImage6736", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage6852"] = await deployContract(manifest, ethers, "CrypToadzCustomImage6852", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage6894"] = await deployContract(manifest, ethers, "CrypToadzCustomImage6894", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage6916"] = await deployContract(manifest, ethers, "CrypToadzCustomImage6916", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage7000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage7000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage703"] = await deployContract(manifest, ethers, "CrypToadzCustomImage703", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage8000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage8000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage864"] = await deployContract(manifest, ethers, "CrypToadzCustomImage864", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage9000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage9000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage916A"] = await deployContract(manifest, ethers, "CrypToadzCustomImage916A", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage916B"] = await deployContract(manifest, ethers, "CrypToadzCustomImage916B", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage916"] = await deployContract(manifest, ethers, "CrypToadzCustomImage916", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage936A"] = await deployContract(manifest, ethers, "CrypToadzCustomImage936A", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage936B"] = await deployContract(manifest, ethers, "CrypToadzCustomImage936B", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage936"] = await deployContract(manifest, ethers, "CrypToadzCustomImage936", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage966"] = await deployContract(manifest, ethers, "CrypToadzCustomImage966", quiet, trace, txOptions, hid, signerOverride);
  }

  if (true) {
    output["CrypToadzCustomImage1519"] = await deployContract(manifest, ethers, "CrypToadzCustomImage1519", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage1943A"] = await deployContract(manifest, ethers, "CrypToadzCustomImage1943A", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage1943B"] = await deployContract(manifest, ethers, "CrypToadzCustomImage1943B", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage1943C"] = await deployContract(manifest, ethers, "CrypToadzCustomImage1943C", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage1943D"] = await deployContract(manifest, ethers, "CrypToadzCustomImage1943D", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage1943E"] = await deployContract(manifest, ethers, "CrypToadzCustomImage1943E", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage1943"] = await deployContract(manifest, ethers, "CrypToadzCustomImage1943", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage2208"] = await deployContract(manifest, ethers, "CrypToadzCustomImage2208", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage318A"] = await deployContract(manifest, ethers, "CrypToadzCustomImage318A", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage318B"] = await deployContract(manifest, ethers, "CrypToadzCustomImage318B", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage318C"] = await deployContract(manifest, ethers, "CrypToadzCustomImage318C", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage318D"] = await deployContract(manifest, ethers, "CrypToadzCustomImage318D", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage318E"] = await deployContract(manifest, ethers, "CrypToadzCustomImage318E", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage318F"] = await deployContract(manifest, ethers, "CrypToadzCustomImage318F", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage318"] = await deployContract(manifest, ethers, "CrypToadzCustomImage318", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage3250"] = await deployContract(manifest, ethers, "CrypToadzCustomImage3250", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage3661A"] = await deployContract(manifest, ethers, "CrypToadzCustomImage3661A", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage3661B"] = await deployContract(manifest, ethers, "CrypToadzCustomImage3661B", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage3661C"] = await deployContract(manifest, ethers, "CrypToadzCustomImage3661C", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage3661D"] = await deployContract(manifest, ethers, "CrypToadzCustomImage3661D", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage3661E"] = await deployContract(manifest, ethers, "CrypToadzCustomImage3661E", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage3661F"] = await deployContract(manifest, ethers, "CrypToadzCustomImage3661F", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage3661G"] = await deployContract(manifest, ethers, "CrypToadzCustomImage3661G", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage3661"] = await deployContract(manifest, ethers, "CrypToadzCustomImage3661", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage37A"] = await deployContract(manifest, ethers, "CrypToadzCustomImage37A", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage37B"] = await deployContract(manifest, ethers, "CrypToadzCustomImage37B", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage37C"] = await deployContract(manifest, ethers, "CrypToadzCustomImage37C", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage37D"] = await deployContract(manifest, ethers, "CrypToadzCustomImage37D", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage37E"] = await deployContract(manifest, ethers, "CrypToadzCustomImage37E", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage37F"] = await deployContract(manifest, ethers, "CrypToadzCustomImage37F", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage37"] = await deployContract(manifest, ethers, "CrypToadzCustomImage37", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage4035A"] = await deployContract(manifest, ethers, "CrypToadzCustomImage4035A", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage4035B"] = await deployContract(manifest, ethers, "CrypToadzCustomImage4035B", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage4035C"] = await deployContract(manifest, ethers, "CrypToadzCustomImage4035C", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage4035D"] = await deployContract(manifest, ethers, "CrypToadzCustomImage4035D", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage4035E"] = await deployContract(manifest, ethers, "CrypToadzCustomImage4035E", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage4035F"] = await deployContract(manifest, ethers, "CrypToadzCustomImage4035F", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage4035"] = await deployContract(manifest, ethers, "CrypToadzCustomImage4035", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage43000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage43000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage466A"] = await deployContract(manifest, ethers, "CrypToadzCustomImage466A", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage466B"] = await deployContract(manifest, ethers, "CrypToadzCustomImage466B", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage466C"] = await deployContract(manifest, ethers, "CrypToadzCustomImage466C", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage466D"] = await deployContract(manifest, ethers, "CrypToadzCustomImage466D", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage466E"] = await deployContract(manifest, ethers, "CrypToadzCustomImage466E", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage466F"] = await deployContract(manifest, ethers, "CrypToadzCustomImage466F", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage466"] = await deployContract(manifest, ethers, "CrypToadzCustomImage466", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage48000000"] = await deployContract(manifest, ethers, "CrypToadzCustomImage48000000", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage4911A"] = await deployContract(manifest, ethers, "CrypToadzCustomImage4911A", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage4911B"] = await deployContract(manifest, ethers, "CrypToadzCustomImage4911B", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage4911C"] = await deployContract(manifest, ethers, "CrypToadzCustomImage4911C", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage4911D"] = await deployContract(manifest, ethers, "CrypToadzCustomImage4911D", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage4911E"] = await deployContract(manifest, ethers, "CrypToadzCustomImage4911E", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage4911F"] = await deployContract(manifest, ethers, "CrypToadzCustomImage4911F", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage4911G"] = await deployContract(manifest, ethers, "CrypToadzCustomImage4911G", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage4911"] = await deployContract(manifest, ethers, "CrypToadzCustomImage4911", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage5086"] = await deployContract(manifest, ethers, "CrypToadzCustomImage5086", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage5844"] = await deployContract(manifest, ethers, "CrypToadzCustomImage5844", quiet, trace, txOptions, hid, signerOverride);
    output["CrypToadzCustomImage6131"] = await deployContract(manifest, ethers, "CrypToadzCustomImage6131", quiet, trace, txOptions, hid, signerOverride);
  }

  //
  // Post-Deployment: Link all dependencies
  //
  if (!trace) {

    if (!quiet) console.log("Linking contract dependencies...");

    var tx;

    tx = await output["CrypToadzChained"].setEncoder(output["GIFEncoder"].address, txOptions);
    await tx.wait();

    tx = await output["CrypToadzDeltas"].setRenderer(output["PixelRenderer"].address, txOptions);
    await tx.wait();

    tx = await output["CrypToadzBuilder"].setRenderer(output["PixelRenderer"].address, txOptions);
    await tx.wait();

    tx = await output["CrypToadzDeltas"].setAddresses({
      _a: output["CrypToadzDeltasA"].address,
      _b: output["CrypToadzDeltasB"].address,
      _c: output["CrypToadzDeltasC"].address
    }, txOptions);
    await tx.wait();
    if (!quiet) console.log("CrypToadzDeltas linked with dependencies");

    tx = await output["CrypToadzBuilderAny"].setAddresses(
      output["CrypToadzBuilderAnyA"].address,
      output["CrypToadzBuilderAnyB"].address,
      txOptions
    );
    await tx.wait();
    if (!quiet) console.log("CrypToadzBuilderAny linked with dependencies");

    tx = await output["CrypToadzBuilder"].setAny(output["CrypToadzBuilderAny"].address, txOptions);
    await tx.wait();

    tx = await output["CrypToadzBuilder"].setTall(output["CrypToadzBuilderTall"].address, txOptions);
    await tx.wait();

    tx = await output["CrypToadzBuilder"].setShort(output["CrypToadzBuilderShort"].address, txOptions);
    await tx.wait();

    tx = await output["CrypToadzBuilder"].setDeltas(output["CrypToadzDeltas"].address, txOptions);
    await tx.wait();

    if (!quiet) console.log("CrypToadzBuilder linked with dependencies");

    tx = await output["CrypToadzCustomImage1005"].setAddresses(output["CrypToadzCustomImage1005A"].address, output["CrypToadzCustomImage1005B"].address, txOptions);
    await tx.wait();
    if (!quiet) console.log("CrypToadzCustomImage1005 linked with dependencies");

    tx = await output["CrypToadzCustomImage1812"].setAddresses(output["CrypToadzCustomImage1812A"].address, output["CrypToadzCustomImage1812B"].address, txOptions);
    await tx.wait();
    if (!quiet) console.log("CrypToadzCustomImage1812 linked with dependencies");

    tx = await output["CrypToadzCustomImage1975"].setAddresses(output["CrypToadzCustomImage1975A"].address, output["CrypToadzCustomImage1975B"].address, txOptions);
    await tx.wait();
    if (!quiet) console.log("CrypToadzCustomImage1975 linked with dependencies");

    tx = await output["CrypToadzCustomImage2232"].setAddresses(output["CrypToadzCustomImage2232A"].address, output["CrypToadzCustomImage2232B"].address, txOptions);
    await tx.wait();
    if (!quiet) console.log("CrypToadzCustomImage2232 linked with dependencies");

    tx = await output["CrypToadzCustomImage2327"].setAddresses(output["CrypToadzCustomImage2327A"].address, output["CrypToadzCustomImage2327B"].address, txOptions);
    await tx.wait();
    if (!quiet) console.log("CrypToadzCustomImage2327 linked with dependencies");

    tx = await output["CrypToadzCustomImage2489"].setAddresses(output["CrypToadzCustomImage2489A"].address, output["CrypToadzCustomImage2489B"].address, txOptions);
    await tx.wait();
    if (!quiet) console.log("CrypToadzCustomImage2489 linked with dependencies");

    tx = await output["CrypToadzCustomImage2825"].setAddresses(output["CrypToadzCustomImage2825A"].address, output["CrypToadzCustomImage2825B"].address, txOptions);
    await tx.wait();
    if (!quiet) console.log("CrypToadzCustomImage2825 linked with dependencies");

    tx = await output["CrypToadzCustomImage2959"].setAddresses(output["CrypToadzCustomImage2959A"].address, output["CrypToadzCustomImage2959B"].address, txOptions);
    await tx.wait();
    if (!quiet) console.log("CrypToadzCustomImage2959 linked with dependencies");

    tx = await output["CrypToadzCustomImage3196"].setAddresses(output["CrypToadzCustomImage3196A"].address, output["CrypToadzCustomImage3196B"].address, txOptions);
    await tx.wait();
    if (!quiet) console.log("CrypToadzCustomImage3196 linked with dependencies");

    tx = await output["CrypToadzCustomImage3309"].setAddresses(output["CrypToadzCustomImage3309A"].address, output["CrypToadzCustomImage3309B"].address, output["CrypToadzCustomImage3309C"].address, txOptions);
    await tx.wait();
    if (!quiet) console.log("CrypToadzCustomImage3309 linked with dependencies");

    tx = await output["CrypToadzCustomImage3382"].setAddresses(output["CrypToadzCustomImage3382A"].address, output["CrypToadzCustomImage3382B"].address, txOptions);
    await tx.wait();
    if (!quiet) console.log("CrypToadzCustomImage3382 linked with dependencies");

    tx = await output["CrypToadzCustomImage4152"].setAddresses(output["CrypToadzCustomImage4152A"].address, output["CrypToadzCustomImage4152B"].address, txOptions);
    await tx.wait();
    if (!quiet) console.log("CrypToadzCustomImage4152 linked with dependencies");

    tx = await output["CrypToadzCustomImage4238"].setAddresses(output["CrypToadzCustomImage4238A"].address, output["CrypToadzCustomImage4238B"].address, txOptions);
    await tx.wait();
    if (!quiet) console.log("CrypToadzCustomImage4238 linked with dependencies");

    tx = await output["CrypToadzCustomImage4580"].setAddresses(output["CrypToadzCustomImage4580A"].address, output["CrypToadzCustomImage4580B"].address, txOptions);
    await tx.wait();
    if (!quiet) console.log("CrypToadzCustomImage4580 linked with dependencies");

    tx = await output["CrypToadzCustomImage4896"].setAddresses(output["CrypToadzCustomImage4896A"].address, output["CrypToadzCustomImage4896B"].address, output["CrypToadzCustomImage4896C"].address, txOptions);
    await tx.wait();
    if (!quiet) console.log("CrypToadzCustomImage4896 linked with dependencies");

    tx = await output["CrypToadzCustomImage5471"].setAddresses(output["CrypToadzCustomImage5471A"].address, output["CrypToadzCustomImage5471B"].address, output["CrypToadzCustomImage5471C"].address, txOptions);
    await tx.wait();
    if (!quiet) console.log("CrypToadzCustomImage5471 linked with dependencies");

    tx = await output["CrypToadzCustomImage5902"].setAddresses(output["CrypToadzCustomImage5902A"].address, output["CrypToadzCustomImage5902B"].address, txOptions);
    await tx.wait();
    if (!quiet) console.log("CrypToadzCustomImage5902 linked with dependencies");

    tx = await output["CrypToadzCustomImage6214"].setAddresses(output["CrypToadzCustomImage6214A"].address, output["CrypToadzCustomImage6214B"].address, txOptions);
    await tx.wait();
    if (!quiet) console.log("CrypToadzCustomImage6214 linked with dependencies");

    tx = await output["CrypToadzCustomImage6382"].setAddresses(output["CrypToadzCustomImage6382A"].address, output["CrypToadzCustomImage6382B"].address, txOptions);
    await tx.wait();
    if (!quiet) console.log("CrypToadzCustomImage6382 linked with dependencies");

    tx = await output["CrypToadzCustomImage916"].setAddresses(output["CrypToadzCustomImage916A"].address, output["CrypToadzCustomImage916B"].address, txOptions);
    await tx.wait();
    if (!quiet) console.log("CrypToadzCustomImage916 linked with dependencies");

    tx = await output["CrypToadzCustomImage936"].setAddresses(output["CrypToadzCustomImage936A"].address, output["CrypToadzCustomImage936B"].address, txOptions);
    await tx.wait();
    if (!quiet) console.log("CrypToadzCustomImage936 linked with dependencies");

    tx = await output["CrypToadzCustomImages"].setAddresses({
      _123: output["CrypToadzCustomImage123"].address,
      _316: output["CrypToadzCustomImage316"].address,
      _472: output["CrypToadzCustomImage472"].address,
      _491: output["CrypToadzCustomImage491"].address,
      _703: output["CrypToadzCustomImage703"].address,
      _864: output["CrypToadzCustomImage864"].address,
      _916: output["CrypToadzCustomImage916"].address,
      _936: output["CrypToadzCustomImage936"].address,
      _966: output["CrypToadzCustomImage966"].address,
      _1005: output["CrypToadzCustomImage1005"].address,
      _1165: output["CrypToadzCustomImage1165"].address,
      _1423: output["CrypToadzCustomImage1423"].address,
      _1559: output["CrypToadzCustomImage1559"].address,
      _1637: output["CrypToadzCustomImage1637"].address,
      _1703: output["CrypToadzCustomImage1703"].address,
      _1754: output["CrypToadzCustomImage1754"].address,
      _1793: output["CrypToadzCustomImage1793"].address,
      _1812: output["CrypToadzCustomImage1812"].address,
      _1935: output["CrypToadzCustomImage1935"].address,
      _1975: output["CrypToadzCustomImage1975"].address,
      _2124: output["CrypToadzCustomImage2124"].address,
      _2232: output["CrypToadzCustomImage2232"].address,
      _2327: output["CrypToadzCustomImage2327"].address,
      _2469: output["CrypToadzCustomImage2469"].address,
      _2471: output["CrypToadzCustomImage2471"].address,
      _2482: output["CrypToadzCustomImage2482"].address,
      _2489: output["CrypToadzCustomImage2489"].address,
      _2521: output["CrypToadzCustomImage2521"].address,
      _2569: output["CrypToadzCustomImage2569"].address,
      _2579: output["CrypToadzCustomImage2579"].address,
      _2709: output["CrypToadzCustomImage2709"].address,
      _2825: output["CrypToadzCustomImage2825"].address,
      _2839: output["CrypToadzCustomImage2839"].address,
      _2846: output["CrypToadzCustomImage2846"].address,
      _2865: output["CrypToadzCustomImage2865"].address,
      _2959: output["CrypToadzCustomImage2959"].address,
      _2986: output["CrypToadzCustomImage2986"].address,
      _3196: output["CrypToadzCustomImage3196"].address,
      _3309: output["CrypToadzCustomImage3309"].address,
      _3382: output["CrypToadzCustomImage3382"].address,
      _3703: output["CrypToadzCustomImage3703"].address,
      _4096: output["CrypToadzCustomImage4096"].address,
      _4126: output["CrypToadzCustomImage4126"].address,
      _4152: output["CrypToadzCustomImage4152"].address,
      _4192: output["CrypToadzCustomImage4192"].address,
      _4201: output["CrypToadzCustomImage4201"].address,
      _4221: output["CrypToadzCustomImage4221"].address,
      _4238: output["CrypToadzCustomImage4238"].address,
      _4368: output["CrypToadzCustomImage4368"].address,
      _4578: output["CrypToadzCustomImage4578"].address,
      _4580: output["CrypToadzCustomImage4580"].address,
      _4604: output["CrypToadzCustomImage4604"].address,
      _4714: output["CrypToadzCustomImage4714"].address,
      _4773: output["CrypToadzCustomImage4773"].address,
      _4845: output["CrypToadzCustomImage4845"].address,
      _4896: output["CrypToadzCustomImage4896"].address,
      _5128: output["CrypToadzCustomImage5128"].address,
      _5150: output["CrypToadzCustomImage5150"].address,
      _5262: output["CrypToadzCustomImage5262"].address,
      _5441: output["CrypToadzCustomImage5441"].address,
      _5471: output["CrypToadzCustomImage5471"].address,
      _5730: output["CrypToadzCustomImage5730"].address,
      _5836: output["CrypToadzCustomImage5836"].address,
      _5848: output["CrypToadzCustomImage5848"].address,
      _5902: output["CrypToadzCustomImage5902"].address,
      _6214: output["CrypToadzCustomImage6214"].address,
      _6382: output["CrypToadzCustomImage6382"].address,
      _6491: output["CrypToadzCustomImage6491"].address,
      _6572: output["CrypToadzCustomImage6572"].address,
      _6578: output["CrypToadzCustomImage6578"].address,
      _6631: output["CrypToadzCustomImage6631"].address,
      _6719: output["CrypToadzCustomImage6719"].address,
      _6736: output["CrypToadzCustomImage6736"].address,
      _6852: output["CrypToadzCustomImage6852"].address,
      _6894: output["CrypToadzCustomImage6894"].address,
      _6916: output["CrypToadzCustomImage6916"].address,
      _1000000: output["CrypToadzCustomImage1000000"].address,
      _2000000: output["CrypToadzCustomImage2000000"].address,
      _3000000: output["CrypToadzCustomImage3000000"].address,
      _4000000: output["CrypToadzCustomImage4000000"].address,
      _5000000: output["CrypToadzCustomImage5000000"].address,
      _6000000: output["CrypToadzCustomImage6000000"].address,
      _7000000: output["CrypToadzCustomImage7000000"].address,
      _8000000: output["CrypToadzCustomImage8000000"].address,
      _9000000: output["CrypToadzCustomImage9000000"].address,
      _10000000: output["CrypToadzCustomImage10000000"].address,
      _11000000: output["CrypToadzCustomImage11000000"].address,
      _12000000: output["CrypToadzCustomImage12000000"].address,
      _13000000: output["CrypToadzCustomImage13000000"].address,
      _14000000: output["CrypToadzCustomImage14000000"].address,
      _15000000: output["CrypToadzCustomImage15000000"].address,
      _16000000: output["CrypToadzCustomImage16000000"].address,
      _17000000: output["CrypToadzCustomImage17000000"].address,
      _18000000: output["CrypToadzCustomImage18000000"].address,
      _19000000: output["CrypToadzCustomImage19000000"].address,
      _20000000: output["CrypToadzCustomImage20000000"].address,
      _21000000: output["CrypToadzCustomImage21000000"].address,
      _22000000: output["CrypToadzCustomImage22000000"].address,
      _23000000: output["CrypToadzCustomImage23000000"].address,
      _24000000: output["CrypToadzCustomImage24000000"].address,
      _25000000: output["CrypToadzCustomImage25000000"].address,
      _26000000: output["CrypToadzCustomImage26000000"].address,
      _27000000: output["CrypToadzCustomImage27000000"].address,
      _28000000: output["CrypToadzCustomImage28000000"].address,
      _29000000: output["CrypToadzCustomImage29000000"].address,
      _30000000: output["CrypToadzCustomImage30000000"].address,
      _31000000: output["CrypToadzCustomImage31000000"].address,
      _32000000: output["CrypToadzCustomImage32000000"].address,
      _33000000: output["CrypToadzCustomImage33000000"].address,
      _34000000: output["CrypToadzCustomImage34000000"].address,
      _35000000: output["CrypToadzCustomImage35000000"].address,
      _36000000: output["CrypToadzCustomImage36000000"].address,
      _37000000: output["CrypToadzCustomImage37000000"].address,
      _38000000: output["CrypToadzCustomImage38000000"].address,
      _39000000: output["CrypToadzCustomImage39000000"].address,
      _40000000: output["CrypToadzCustomImage40000000"].address,
      _41000000: output["CrypToadzCustomImage41000000"].address,
      _42000000: output["CrypToadzCustomImage42000000"].address,
      _44000000: output["CrypToadzCustomImage44000000"].address,
      _45000000: output["CrypToadzCustomImage45000000"].address,
      _46000000: output["CrypToadzCustomImage46000000"].address,
      _47000000: output["CrypToadzCustomImage47000000"].address,
      _49000000: output["CrypToadzCustomImage49000000"].address,
      _50000000: output["CrypToadzCustomImage50000000"].address,
      _51000000: output["CrypToadzCustomImage51000000"].address,
      _52000000: output["CrypToadzCustomImage52000000"].address,
      _53000000: output["CrypToadzCustomImage53000000"].address,
      _54000000: output["CrypToadzCustomImage54000000"].address,
      _55000000: output["CrypToadzCustomImage55000000"].address,
      _56000000: output["CrypToadzCustomImage56000000"].address
    }, txOptions);
    await tx.wait();
    if (!quiet) console.log("CrypToadzCustomImages linked with dependencies");

    tx = await output["CrypToadzCustomImage1943"].setAddresses(output["CrypToadzCustomImage1943A"].address, output["CrypToadzCustomImage1943B"].address, output["CrypToadzCustomImage1943C"].address, output["CrypToadzCustomImage1943D"].address, output["CrypToadzCustomImage1943E"].address, txOptions);
    await tx.wait();
    if (!quiet) console.log("CrypToadzCustomImage1943 linked with dependencies");

    tx = await output["CrypToadzCustomImage318"].setAddresses(output["CrypToadzCustomImage318A"].address, output["CrypToadzCustomImage318B"].address, output["CrypToadzCustomImage318C"].address, output["CrypToadzCustomImage318D"].address, output["CrypToadzCustomImage318E"].address, output["CrypToadzCustomImage318F"].address, txOptions);
    await tx.wait();
    if (!quiet) console.log("CrypToadzCustomImage318 linked with dependencies");

    tx = await output["CrypToadzCustomImage3661"].setAddresses(output["CrypToadzCustomImage3661A"].address, output["CrypToadzCustomImage3661B"].address, output["CrypToadzCustomImage3661C"].address, output["CrypToadzCustomImage3661D"].address, output["CrypToadzCustomImage3661E"].address, output["CrypToadzCustomImage3661F"].address, output["CrypToadzCustomImage3661G"].address, txOptions);
    await tx.wait();
    if (!quiet) console.log("CrypToadzCustomImage3661 linked with dependencies");

    tx = await output["CrypToadzCustomImage37"].setAddresses(output["CrypToadzCustomImage37A"].address, output["CrypToadzCustomImage37B"].address, output["CrypToadzCustomImage37C"].address, output["CrypToadzCustomImage37D"].address, output["CrypToadzCustomImage37E"].address, output["CrypToadzCustomImage37F"].address, txOptions);
    await tx.wait();
    if (!quiet) console.log("CrypToadzCustomImage37 linked with dependencies");

    tx = await output["CrypToadzCustomImage4035"].setAddresses(output["CrypToadzCustomImage4035A"].address, output["CrypToadzCustomImage4035B"].address, output["CrypToadzCustomImage4035C"].address, output["CrypToadzCustomImage4035D"].address, output["CrypToadzCustomImage4035E"].address, output["CrypToadzCustomImage4035F"].address, txOptions);
    await tx.wait();
    if (!quiet) console.log("CrypToadzCustomImage4035 linked with dependencies");

    tx = await output["CrypToadzCustomImage466"].setAddresses(output["CrypToadzCustomImage466A"].address, output["CrypToadzCustomImage466B"].address, output["CrypToadzCustomImage466C"].address, output["CrypToadzCustomImage466D"].address, output["CrypToadzCustomImage466E"].address, output["CrypToadzCustomImage466F"].address, txOptions);
    await tx.wait();
    if (!quiet) console.log("CrypToadzCustomImage466 linked with dependencies");

    tx = await output["CrypToadzCustomImage4911"].setAddresses(output["CrypToadzCustomImage4911A"].address, output["CrypToadzCustomImage4911B"].address, output["CrypToadzCustomImage4911C"].address, output["CrypToadzCustomImage4911D"].address, output["CrypToadzCustomImage4911E"].address, output["CrypToadzCustomImage4911F"].address, output["CrypToadzCustomImage4911G"].address, txOptions);
    await tx.wait();
    if (!quiet) console.log("CrypToadzCustomImage4911 linked with dependencies");

    tx = await output["CrypToadzCustomAnimations"].setAddresses({
      _37: output["CrypToadzCustomImage37"].address,
      _318: output["CrypToadzCustomImage318"].address,
      _466: output["CrypToadzCustomImage466"].address,
      _1519: output["CrypToadzCustomImage1519"].address,
      _1943: output["CrypToadzCustomImage1943"].address,
      _2208: output["CrypToadzCustomImage2208"].address,
      _3250: output["CrypToadzCustomImage3250"].address,
      _3661: output["CrypToadzCustomImage3661"].address,
      _4035: output["CrypToadzCustomImage4035"].address,
      _4911: output["CrypToadzCustomImage4911"].address,
      _5086: output["CrypToadzCustomImage5086"].address,
      _5844: output["CrypToadzCustomImage5844"].address,
      _6131: output["CrypToadzCustomImage6131"].address,
      _43000000: output["CrypToadzCustomImage43000000"].address,
      _48000000: output["CrypToadzCustomImage48000000"].address
    }, txOptions);
    await tx.wait();
    if (!quiet) console.log("CrypToadzCustomAnimations linked with dependencies");

    tx = await output["CrypToadzChained"].setStrings(output["CrypToadzStrings"].address, txOptions);
    await tx.wait();

    tx = await output["CrypToadzChained"].setMetadata(output["CrypToadzMetadata"].address, txOptions);
    await tx.wait();

    tx = await output["CrypToadzChained"].setCustomImages(output["CrypToadzCustomImages"].address, txOptions);
    await tx.wait();

    tx = await output["CrypToadzChained"].setCustomAnimations(output["CrypToadzCustomAnimations"].address, txOptions);
    await tx.wait();

    tx = await output["CrypToadzChained"].setBuilder(output["CrypToadzBuilder"].address, txOptions);
    await tx.wait();

    if (!quiet) console.log("CrypToadzChained linked with dependencies");

    //
    // Test locks
    //
    // if (!trace) {
    //   {
    //     await output["CrypToadzChained"].setStrings(output["CrypToadzChained"]);
    //     await expect(output["CrypToadzChained"].lockStrings()).to.be.revertedWith("Not ICrypToadzStrings");
    //     await output["CrypToadzChained"].setStrings(output["CrypToadzStrings"]);
    //     await output["CrypToadzChained"].lockStrings();
    //     await expect(output["CrypToadzChained"].setStrings(output["CrypToadzStrings"])).to.be.revertedWith("Strings locked");
    //   }

    //   {
    //     await output["CrypToadzChained"].setMetadata(output["CrypToadzChained"]);
    //     await expect(output["CrypToadzChained"].lockMetadata()).to.be.revertedWith("Not ICrypToadzMetadata");
    //     await output["CrypToadzChained"].setMetadata(output["CrypToadzMetadata"]);
    //     await output["CrypToadzChained"].lockMetadata();
    //     await expect(output["CrypToadzChained"].setMetadata(output["CrypToadzMetadata"])).to.be.revertedWith("Metadata locked");
    //   }

    //   {
    //     await output["CrypToadzChained"].setBuilder(output["CrypToadzChained"]);
    //     await expect(output["CrypToadzChained"].lockBuilder()).to.be.revertedWith("Not ICrypToadzBuilder");
    //     await output["CrypToadzChained"].setBuilder(output["CrypToadzBuilder"]);
    //     await output["CrypToadzChained"].lockBuilder();
    //     await expect(output["CrypToadzChained"].setBuilder(output["CrypToadzBuilder"])).to.be.revertedWith("Builder locked");
    //   }

    //   {
    //     await output["CrypToadzChained"].setCustomImages(output["CrypToadzChained"]);
    //     await expect(output["CrypToadzChained"].lockCustomImages()).to.be.revertedWith("Not ICrypToadzCustomImages");
    //     await output["CrypToadzChained"].setCustomImages(output["CrypToadzCustomImages"]);
    //     await output["CrypToadzChained"].lockCustomImages();
    //     await expect(output["CrypToadzChained"].setCustomImages(output["CrypToadzCustomImages"])).to.be.revertedWith("CustomImages locked");
    //   }

    //   {
    //     await output["CrypToadzChained"].setCustomAnimations(output["CrypToadzChained"]);
    //     await expect(output["CrypToadzChained"].lockCustomAnimations()).to.be.revertedWith("Not ICrypToadzCustomAnimations");
    //     await output["CrypToadzChained"].setCustomAnimations(output["CrypToadzCustomAnimations"]);
    //     await output["CrypToadzChained"].lockCustomAnimations();
    //     await expect(output["CrypToadzChained"].setCustomAnimations(output["CrypToadzCustomAnimations"])).to.be.revertedWith("CustomAnimations locked");
    //   }
    // }
  }

  return output;
}

async function deployRandomContracts(ethers, quiet, trace, txOptions, hid) {
  if (!txOptions) txOptions = {};

  var output = {};
  var manifest = {};

  output["CrypToadzChained"] = await deployContract(manifest, ethers, "CrypToadzChained", quiet, trace, txOptions, hid, signerOverride);

  output["GIFEncoder"] = await deployContract(manifest, ethers, "GIFEncoder", quiet, trace, txOptions, hid, signerOverride);
  output["PixelRenderer"] = await deployContract(manifest, ethers, "PixelRenderer", quiet, trace, txOptions, hid, signerOverride);

  output["CrypToadzStrings"] = await deployContract(manifest, ethers, "CrypToadzStrings", quiet, trace, txOptions, hid, signerOverride);
  output["CrypToadzMetadata"] = await deployContract(manifest, ethers, "CrypToadzMetadata", quiet, trace, txOptions, hid, signerOverride);

  output["CrypToadzBuilder"] = await deployContract(manifest, ethers, "CrypToadzBuilder", quiet, trace, txOptions, hid, signerOverride);
  output["CrypToadzBuilderAny"] = await deployContract(manifest, ethers, "CrypToadzBuilderAny", quiet, trace, txOptions, hid, signerOverride);
  output["CrypToadzBuilderAnyA"] = await deployContract(manifest, ethers, "CrypToadzBuilderAnyA", quiet, trace, txOptions, hid, signerOverride);
  output["CrypToadzBuilderAnyB"] = await deployContract(manifest, ethers, "CrypToadzBuilderAnyB", quiet, trace, txOptions, hid, signerOverride);
  output["CrypToadzBuilderShort"] = await deployContract(manifest, ethers, "CrypToadzBuilderShort", quiet, trace, txOptions, hid, signerOverride);
  output["CrypToadzBuilderTall"] = await deployContract(manifest, ethers, "CrypToadzBuilderTall", quiet, trace, txOptions, hid, signerOverride);

  //
  // Post-Deployment: Link all dependencies
  //
  if (!trace) {
    await output["CrypToadzChained"].setEncoder(output["GIFEncoder"].address, txOptions);
    await output["CrypToadzBuilder"].setRenderer(output["PixelRenderer"].address, txOptions);

    await output["CrypToadzBuilderAny"].setAddresses(
      output["CrypToadzBuilderAnyA"].address,
      output["CrypToadzBuilderAnyB"].address,
      txOptions
    );
    if (!quiet) console.log("CrypToadzBuilderAny linked with dependencies");

    await output["CrypToadzBuilder"].setAny(output["CrypToadzBuilderAny"].address, txOptions);
    await output["CrypToadzBuilder"].setTall(output["CrypToadzBuilderTall"].address, txOptions);
    await output["CrypToadzBuilder"].setShort(output["CrypToadzBuilderShort"].address, txOptions);
    await output["CrypToadzChained"].setStrings(output["CrypToadzStrings"].address, txOptions);
    await output["CrypToadzChained"].setMetadata(output["CrypToadzMetadata"].address, txOptions);
    await output["CrypToadzChained"].setBuilder(output["CrypToadzBuilder"].address, txOptions);
    if (!quiet) console.log("CrypToadzChained linked with dependencies");

    return output;
  }
}