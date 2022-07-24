const hre = require("hardhat");
const ethers = hre.ethers;

module.exports = {
  deployContracts: deployContracts
}

async function deployContracts(quiet) {

  const GIFEncoder = await ethers.getContractFactory("GIFEncoder");
  var GIFEncoderDeployed = await GIFEncoder.deploy();
  await GIFEncoderDeployed.deployed();
  if (!quiet) console.log("GIFEncoder deployed to " + GIFEncoderDeployed.address);

  const PixelRenderer = await ethers.getContractFactory("PixelRenderer");
  var PixelRendererDeployed = await PixelRenderer.deploy();
  await PixelRendererDeployed.deployed();
  if (!quiet) console.log("PixelRenderer deployed to " + PixelRendererDeployed.address);

  const CrypToadzStrings = await ethers.getContractFactory("CrypToadzStrings");
  var CrypToadzStringsDeployed = await CrypToadzStrings.deploy();
  await CrypToadzStringsDeployed.deployed();
  if (!quiet) console.log("CrypToadzStrings deployed to " + CrypToadzStringsDeployed.address);

  const CrypToadzBuilderAny = await ethers.getContractFactory("CrypToadzBuilderAny");
  var CrypToadzBuilderAnyDeployed = await CrypToadzBuilderAny.deploy();
  await CrypToadzBuilderAnyDeployed.deployed();
  if (!quiet) console.log("CrypToadzBuilderAny deployed to " + CrypToadzBuilderAnyDeployed.address);

  const CrypToadzBuilderShort = await ethers.getContractFactory("CrypToadzBuilderShort");
  var CrypToadzBuilderShortDeployed = await CrypToadzBuilderShort.deploy();
  await CrypToadzBuilderShortDeployed.deployed();
  if (!quiet) console.log("CrypToadzBuilderShort deployed to " + CrypToadzBuilderShortDeployed.address);

  const CrypToadzBuilderTall = await ethers.getContractFactory("CrypToadzBuilderTall");
  var CrypToadzBuilderTallDeployed = await CrypToadzBuilderTall.deploy();
  await CrypToadzBuilderTallDeployed.deployed();
  if (!quiet) console.log("CrypToadzBuilderTall deployed to " + CrypToadzBuilderTallDeployed.address);

  const CrypToadzDeltasA = await ethers.getContractFactory("CrypToadzDeltasA");
  var CrypToadzDeltasADeployed = await CrypToadzDeltasA.deploy();
  await CrypToadzDeltasADeployed.deployed();
  if (!quiet) console.log("CrypToadzDeltasA deployed to " + CrypToadzDeltasADeployed.address);

  const CrypToadzDeltasB = await ethers.getContractFactory("CrypToadzDeltasB");
  var CrypToadzDeltasBDeployed = await CrypToadzDeltasB.deploy();
  await CrypToadzDeltasBDeployed.deployed();
  if (!quiet) console.log("CrypToadzDeltasB deployed to " + CrypToadzDeltasBDeployed.address);

  const CrypToadzDeltasC = await ethers.getContractFactory("CrypToadzDeltasC");
  var CrypToadzDeltasCDeployed = await CrypToadzDeltasC.deploy();
  await CrypToadzDeltasCDeployed.deployed();
  if (!quiet) console.log("CrypToadzDeltasC deployed to " + CrypToadzDeltasCDeployed.address);

  const CrypToadzDeltasD = await ethers.getContractFactory("CrypToadzDeltasD");
  var CrypToadzDeltasDDeployed = await CrypToadzDeltasD.deploy();
  await CrypToadzDeltasDDeployed.deployed();
  if (!quiet) console.log("CrypToadzDeltasD deployed to " + CrypToadzDeltasDDeployed.address);

  const CrypToadzDeltasE = await ethers.getContractFactory("CrypToadzDeltasE");
  var CrypToadzDeltasEDeployed = await CrypToadzDeltasE.deploy();
  await CrypToadzDeltasEDeployed.deployed();
  if (!quiet) console.log("CrypToadzDeltasE deployed to " + CrypToadzDeltasEDeployed.address);

  const CrypToadzDeltasF = await ethers.getContractFactory("CrypToadzDeltasF");
  var CrypToadzDeltasFDeployed = await CrypToadzDeltasF.deploy();
  await CrypToadzDeltasFDeployed.deployed();
  if (!quiet) console.log("CrypToadzDeltasF deployed to " + CrypToadzDeltasFDeployed.address);

  const CrypToadzDeltas = await ethers.getContractFactory("CrypToadzDeltas", {
    libraries: {
      PixelRenderer: PixelRendererDeployed.address
    }
  });  
  var CrypToadzDeltasDeployed = await CrypToadzDeltas.deploy(CrypToadzDeltasADeployed.address, CrypToadzDeltasBDeployed.address, CrypToadzDeltasCDeployed.address, CrypToadzDeltasDDeployed.address, CrypToadzDeltasEDeployed.address, CrypToadzDeltasFDeployed.address);
  await CrypToadzDeltasDeployed.deployed();
  if (!quiet) console.log("CrypToadzDeltas deployed to " + CrypToadzDeltasDeployed.address);

  const CrypToadzBuilder = await ethers.getContractFactory("CrypToadzBuilder", {
    libraries: {
      PixelRenderer: PixelRendererDeployed.address,
    }
  });
  var CrypToadzBuilderDeployed = await CrypToadzBuilder.deploy(CrypToadzBuilderAnyDeployed.address, CrypToadzBuilderShortDeployed.address, CrypToadzBuilderTallDeployed.address, CrypToadzDeltasDeployed.address);
  await CrypToadzBuilderDeployed.deployed();
  if (!quiet) console.log("CrypToadzBuilder deployed to " + CrypToadzBuilderDeployed.address);

  const CrypToadzMetadata = await ethers.getContractFactory("CrypToadzMetadata");
  var CrypToadzMetadataDeployed = await CrypToadzMetadata.deploy();
  await CrypToadzMetadataDeployed.deployed();
  if (!quiet) console.log("CrypToadzMetadata deployed to " + CrypToadzMetadataDeployed.address);

  const CrypToadzCustomImageBank = await ethers.getContractFactory("CrypToadzCustomImageBank");
  var CrypToadzCustomImageBankDeployed = await CrypToadzCustomImageBank.deploy();
  await CrypToadzCustomImageBankDeployed.deployed();
  if (!quiet) console.log("CrypToadzCustomImageBank deployed to " + CrypToadzCustomImageBankDeployed.address);

  if (true) {
    const CrypToadzCustomImage1000000 = await ethers.getContractFactory("CrypToadzCustomImage1000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage1000000Deployed = await CrypToadzCustomImage1000000.deploy();
    await CrypToadzCustomImage1000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage1000000 deployed to " + CrypToadzCustomImage1000000Deployed.address);

    const CrypToadzCustomImage10000000 = await ethers.getContractFactory("CrypToadzCustomImage10000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage10000000Deployed = await CrypToadzCustomImage10000000.deploy();
    await CrypToadzCustomImage10000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage10000000 deployed to " + CrypToadzCustomImage10000000Deployed.address);

    const CrypToadzCustomImage1005A = await ethers.getContractFactory("CrypToadzCustomImage1005A", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage1005ADeployed = await CrypToadzCustomImage1005A.deploy();
    await CrypToadzCustomImage1005ADeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage1005A deployed to " + CrypToadzCustomImage1005ADeployed.address);

    const CrypToadzCustomImage1005B = await ethers.getContractFactory("CrypToadzCustomImage1005B", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage1005BDeployed = await CrypToadzCustomImage1005B.deploy();
    await CrypToadzCustomImage1005BDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage1005B deployed to " + CrypToadzCustomImage1005BDeployed.address);

    const CrypToadzCustomImage1005 = await ethers.getContractFactory("CrypToadzCustomImage1005");
    var CrypToadzCustomImage1005Deployed = await CrypToadzCustomImage1005.deploy(CrypToadzCustomImage1005ADeployed.address, CrypToadzCustomImage1005BDeployed.address);
    await CrypToadzCustomImage1005Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage1005 deployed to " + CrypToadzCustomImage1005Deployed.address);

    const CrypToadzCustomImage11000000 = await ethers.getContractFactory("CrypToadzCustomImage11000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage11000000Deployed = await CrypToadzCustomImage11000000.deploy();
    await CrypToadzCustomImage11000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage11000000 deployed to " + CrypToadzCustomImage11000000Deployed.address);

    const CrypToadzCustomImage1165 = await ethers.getContractFactory("CrypToadzCustomImage1165", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage1165Deployed = await CrypToadzCustomImage1165.deploy();
    await CrypToadzCustomImage1165Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage1165 deployed to " + CrypToadzCustomImage1165Deployed.address);

    const CrypToadzCustomImage12000000 = await ethers.getContractFactory("CrypToadzCustomImage12000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage12000000Deployed = await CrypToadzCustomImage12000000.deploy();
    await CrypToadzCustomImage12000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage12000000 deployed to " + CrypToadzCustomImage12000000Deployed.address);

    const CrypToadzCustomImage123 = await ethers.getContractFactory("CrypToadzCustomImage123", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage123Deployed = await CrypToadzCustomImage123.deploy();
    await CrypToadzCustomImage123Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage123 deployed to " + CrypToadzCustomImage123Deployed.address);

    const CrypToadzCustomImage13000000 = await ethers.getContractFactory("CrypToadzCustomImage13000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage13000000Deployed = await CrypToadzCustomImage13000000.deploy();
    await CrypToadzCustomImage13000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage13000000 deployed to " + CrypToadzCustomImage13000000Deployed.address);

    const CrypToadzCustomImage14000000 = await ethers.getContractFactory("CrypToadzCustomImage14000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage14000000Deployed = await CrypToadzCustomImage14000000.deploy();
    await CrypToadzCustomImage14000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage14000000 deployed to " + CrypToadzCustomImage14000000Deployed.address);

    const CrypToadzCustomImage1423 = await ethers.getContractFactory("CrypToadzCustomImage1423", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage1423Deployed = await CrypToadzCustomImage1423.deploy();
    await CrypToadzCustomImage1423Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage1423 deployed to " + CrypToadzCustomImage1423Deployed.address);

    const CrypToadzCustomImage15000000 = await ethers.getContractFactory("CrypToadzCustomImage15000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage15000000Deployed = await CrypToadzCustomImage15000000.deploy();
    await CrypToadzCustomImage15000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage15000000 deployed to " + CrypToadzCustomImage15000000Deployed.address);

    const CrypToadzCustomImage1559 = await ethers.getContractFactory("CrypToadzCustomImage1559", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage1559Deployed = await CrypToadzCustomImage1559.deploy();
    await CrypToadzCustomImage1559Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage1559 deployed to " + CrypToadzCustomImage1559Deployed.address);

    const CrypToadzCustomImage16000000 = await ethers.getContractFactory("CrypToadzCustomImage16000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage16000000Deployed = await CrypToadzCustomImage16000000.deploy();
    await CrypToadzCustomImage16000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage16000000 deployed to " + CrypToadzCustomImage16000000Deployed.address);

    const CrypToadzCustomImage1637 = await ethers.getContractFactory("CrypToadzCustomImage1637", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage1637Deployed = await CrypToadzCustomImage1637.deploy();
    await CrypToadzCustomImage1637Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage1637 deployed to " + CrypToadzCustomImage1637Deployed.address);

    const CrypToadzCustomImage17000000 = await ethers.getContractFactory("CrypToadzCustomImage17000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage17000000Deployed = await CrypToadzCustomImage17000000.deploy();
    await CrypToadzCustomImage17000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage17000000 deployed to " + CrypToadzCustomImage17000000Deployed.address);

    const CrypToadzCustomImage1703 = await ethers.getContractFactory("CrypToadzCustomImage1703", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage1703Deployed = await CrypToadzCustomImage1703.deploy();
    await CrypToadzCustomImage1703Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage1703 deployed to " + CrypToadzCustomImage1703Deployed.address);

    const CrypToadzCustomImage1754 = await ethers.getContractFactory("CrypToadzCustomImage1754", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage1754Deployed = await CrypToadzCustomImage1754.deploy();
    await CrypToadzCustomImage1754Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage1754 deployed to " + CrypToadzCustomImage1754Deployed.address);

    const CrypToadzCustomImage1793 = await ethers.getContractFactory("CrypToadzCustomImage1793", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage1793Deployed = await CrypToadzCustomImage1793.deploy();
    await CrypToadzCustomImage1793Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage1793 deployed to " + CrypToadzCustomImage1793Deployed.address);

    const CrypToadzCustomImage18000000 = await ethers.getContractFactory("CrypToadzCustomImage18000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage18000000Deployed = await CrypToadzCustomImage18000000.deploy();
    await CrypToadzCustomImage18000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage18000000 deployed to " + CrypToadzCustomImage18000000Deployed.address);

    const CrypToadzCustomImage1812A = await ethers.getContractFactory("CrypToadzCustomImage1812A", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage1812ADeployed = await CrypToadzCustomImage1812A.deploy();
    await CrypToadzCustomImage1812ADeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage1812A deployed to " + CrypToadzCustomImage1812ADeployed.address);

    const CrypToadzCustomImage1812B = await ethers.getContractFactory("CrypToadzCustomImage1812B", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage1812BDeployed = await CrypToadzCustomImage1812B.deploy();
    await CrypToadzCustomImage1812BDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage1812B deployed to " + CrypToadzCustomImage1812BDeployed.address);

    const CrypToadzCustomImage1812 = await ethers.getContractFactory("CrypToadzCustomImage1812");
    var CrypToadzCustomImage1812Deployed = await CrypToadzCustomImage1812.deploy(CrypToadzCustomImage1812ADeployed.address, CrypToadzCustomImage1812BDeployed.address);
    await CrypToadzCustomImage1812Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage1812 deployed to " + CrypToadzCustomImage1812Deployed.address);

    const CrypToadzCustomImage19000000 = await ethers.getContractFactory("CrypToadzCustomImage19000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage19000000Deployed = await CrypToadzCustomImage19000000.deploy();
    await CrypToadzCustomImage19000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage19000000 deployed to " + CrypToadzCustomImage19000000Deployed.address);

    const CrypToadzCustomImage1935 = await ethers.getContractFactory("CrypToadzCustomImage1935", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage1935Deployed = await CrypToadzCustomImage1935.deploy();
    await CrypToadzCustomImage1935Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage1935 deployed to " + CrypToadzCustomImage1935Deployed.address);

    const CrypToadzCustomImage1975A = await ethers.getContractFactory("CrypToadzCustomImage1975A", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage1975ADeployed = await CrypToadzCustomImage1975A.deploy();
    await CrypToadzCustomImage1975ADeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage1975A deployed to " + CrypToadzCustomImage1975ADeployed.address);

    const CrypToadzCustomImage1975B = await ethers.getContractFactory("CrypToadzCustomImage1975B", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage1975BDeployed = await CrypToadzCustomImage1975B.deploy();
    await CrypToadzCustomImage1975BDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage1975B deployed to " + CrypToadzCustomImage1975BDeployed.address);

    const CrypToadzCustomImage1975 = await ethers.getContractFactory("CrypToadzCustomImage1975");
    var CrypToadzCustomImage1975Deployed = await CrypToadzCustomImage1975.deploy(CrypToadzCustomImage1975ADeployed.address, CrypToadzCustomImage1975BDeployed.address);
    await CrypToadzCustomImage1975Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage1975 deployed to " + CrypToadzCustomImage1975Deployed.address);

    const CrypToadzCustomImage2000000 = await ethers.getContractFactory("CrypToadzCustomImage2000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage2000000Deployed = await CrypToadzCustomImage2000000.deploy();
    await CrypToadzCustomImage2000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage2000000 deployed to " + CrypToadzCustomImage2000000Deployed.address);

    const CrypToadzCustomImage20000000 = await ethers.getContractFactory("CrypToadzCustomImage20000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage20000000Deployed = await CrypToadzCustomImage20000000.deploy();
    await CrypToadzCustomImage20000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage20000000 deployed to " + CrypToadzCustomImage20000000Deployed.address);

    const CrypToadzCustomImage21000000 = await ethers.getContractFactory("CrypToadzCustomImage21000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage21000000Deployed = await CrypToadzCustomImage21000000.deploy();
    await CrypToadzCustomImage21000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage21000000 deployed to " + CrypToadzCustomImage21000000Deployed.address);

    const CrypToadzCustomImage2124 = await ethers.getContractFactory("CrypToadzCustomImage2124", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage2124Deployed = await CrypToadzCustomImage2124.deploy();
    await CrypToadzCustomImage2124Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage2124 deployed to " + CrypToadzCustomImage2124Deployed.address);

    const CrypToadzCustomImage22000000 = await ethers.getContractFactory("CrypToadzCustomImage22000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage22000000Deployed = await CrypToadzCustomImage22000000.deploy();
    await CrypToadzCustomImage22000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage22000000 deployed to " + CrypToadzCustomImage22000000Deployed.address);

    const CrypToadzCustomImage2232A = await ethers.getContractFactory("CrypToadzCustomImage2232A", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage2232ADeployed = await CrypToadzCustomImage2232A.deploy();
    await CrypToadzCustomImage2232ADeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage2232A deployed to " + CrypToadzCustomImage2232ADeployed.address);

    const CrypToadzCustomImage2232B = await ethers.getContractFactory("CrypToadzCustomImage2232B", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage2232BDeployed = await CrypToadzCustomImage2232B.deploy();
    await CrypToadzCustomImage2232BDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage2232B deployed to " + CrypToadzCustomImage2232BDeployed.address);

    const CrypToadzCustomImage2232 = await ethers.getContractFactory("CrypToadzCustomImage2232");
    var CrypToadzCustomImage2232Deployed = await CrypToadzCustomImage2232.deploy(CrypToadzCustomImage2232ADeployed.address, CrypToadzCustomImage2232BDeployed.address);
    await CrypToadzCustomImage2232Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage2232 deployed to " + CrypToadzCustomImage2232Deployed.address);

    const CrypToadzCustomImage23000000 = await ethers.getContractFactory("CrypToadzCustomImage23000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage23000000Deployed = await CrypToadzCustomImage23000000.deploy();
    await CrypToadzCustomImage23000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage23000000 deployed to " + CrypToadzCustomImage23000000Deployed.address);

    const CrypToadzCustomImage2327A = await ethers.getContractFactory("CrypToadzCustomImage2327A", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage2327ADeployed = await CrypToadzCustomImage2327A.deploy();
    await CrypToadzCustomImage2327ADeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage2327A deployed to " + CrypToadzCustomImage2327ADeployed.address);

    const CrypToadzCustomImage2327B = await ethers.getContractFactory("CrypToadzCustomImage2327B", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage2327BDeployed = await CrypToadzCustomImage2327B.deploy();
    await CrypToadzCustomImage2327BDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage2327B deployed to " + CrypToadzCustomImage2327BDeployed.address);

    const CrypToadzCustomImage2327 = await ethers.getContractFactory("CrypToadzCustomImage2327");
    var CrypToadzCustomImage2327Deployed = await CrypToadzCustomImage2327.deploy(CrypToadzCustomImage2327ADeployed.address, CrypToadzCustomImage2327BDeployed.address);
    await CrypToadzCustomImage2327Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage2327 deployed to " + CrypToadzCustomImage2327Deployed.address);

    const CrypToadzCustomImage24000000 = await ethers.getContractFactory("CrypToadzCustomImage24000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage24000000Deployed = await CrypToadzCustomImage24000000.deploy();
    await CrypToadzCustomImage24000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage24000000 deployed to " + CrypToadzCustomImage24000000Deployed.address);

    const CrypToadzCustomImage2469 = await ethers.getContractFactory("CrypToadzCustomImage2469", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage2469Deployed = await CrypToadzCustomImage2469.deploy();
    await CrypToadzCustomImage2469Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage2469 deployed to " + CrypToadzCustomImage2469Deployed.address);

    const CrypToadzCustomImage2471 = await ethers.getContractFactory("CrypToadzCustomImage2471", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage2471Deployed = await CrypToadzCustomImage2471.deploy();
    await CrypToadzCustomImage2471Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage2471 deployed to " + CrypToadzCustomImage2471Deployed.address);

    const CrypToadzCustomImage2482 = await ethers.getContractFactory("CrypToadzCustomImage2482", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage2482Deployed = await CrypToadzCustomImage2482.deploy();
    await CrypToadzCustomImage2482Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage2482 deployed to " + CrypToadzCustomImage2482Deployed.address);

    const CrypToadzCustomImage2489A = await ethers.getContractFactory("CrypToadzCustomImage2489A", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage2489ADeployed = await CrypToadzCustomImage2489A.deploy();
    await CrypToadzCustomImage2489ADeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage2489A deployed to " + CrypToadzCustomImage2489ADeployed.address);

    const CrypToadzCustomImage2489B = await ethers.getContractFactory("CrypToadzCustomImage2489B", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage2489BDeployed = await CrypToadzCustomImage2489B.deploy();
    await CrypToadzCustomImage2489BDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage2489B deployed to " + CrypToadzCustomImage2489BDeployed.address);

    const CrypToadzCustomImage2489 = await ethers.getContractFactory("CrypToadzCustomImage2489");
    var CrypToadzCustomImage2489Deployed = await CrypToadzCustomImage2489.deploy(CrypToadzCustomImage2489ADeployed.address, CrypToadzCustomImage2489BDeployed.address);
    await CrypToadzCustomImage2489Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage2489 deployed to " + CrypToadzCustomImage2489Deployed.address);

    const CrypToadzCustomImage25000000 = await ethers.getContractFactory("CrypToadzCustomImage25000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage25000000Deployed = await CrypToadzCustomImage25000000.deploy();
    await CrypToadzCustomImage25000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage25000000 deployed to " + CrypToadzCustomImage25000000Deployed.address);

    const CrypToadzCustomImage2521 = await ethers.getContractFactory("CrypToadzCustomImage2521", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage2521Deployed = await CrypToadzCustomImage2521.deploy();
    await CrypToadzCustomImage2521Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage2521 deployed to " + CrypToadzCustomImage2521Deployed.address);

    const CrypToadzCustomImage2569 = await ethers.getContractFactory("CrypToadzCustomImage2569", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage2569Deployed = await CrypToadzCustomImage2569.deploy();
    await CrypToadzCustomImage2569Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage2569 deployed to " + CrypToadzCustomImage2569Deployed.address);

    const CrypToadzCustomImage2579 = await ethers.getContractFactory("CrypToadzCustomImage2579", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage2579Deployed = await CrypToadzCustomImage2579.deploy();
    await CrypToadzCustomImage2579Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage2579 deployed to " + CrypToadzCustomImage2579Deployed.address);

    const CrypToadzCustomImage26000000 = await ethers.getContractFactory("CrypToadzCustomImage26000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage26000000Deployed = await CrypToadzCustomImage26000000.deploy();
    await CrypToadzCustomImage26000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage26000000 deployed to " + CrypToadzCustomImage26000000Deployed.address);

    const CrypToadzCustomImage27000000 = await ethers.getContractFactory("CrypToadzCustomImage27000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage27000000Deployed = await CrypToadzCustomImage27000000.deploy();
    await CrypToadzCustomImage27000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage27000000 deployed to " + CrypToadzCustomImage27000000Deployed.address);

    const CrypToadzCustomImage2709 = await ethers.getContractFactory("CrypToadzCustomImage2709", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage2709Deployed = await CrypToadzCustomImage2709.deploy();
    await CrypToadzCustomImage2709Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage2709 deployed to " + CrypToadzCustomImage2709Deployed.address);

    const CrypToadzCustomImage28000000 = await ethers.getContractFactory("CrypToadzCustomImage28000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage28000000Deployed = await CrypToadzCustomImage28000000.deploy();
    await CrypToadzCustomImage28000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage28000000 deployed to " + CrypToadzCustomImage28000000Deployed.address);

    const CrypToadzCustomImage2825A = await ethers.getContractFactory("CrypToadzCustomImage2825A", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage2825ADeployed = await CrypToadzCustomImage2825A.deploy();
    await CrypToadzCustomImage2825ADeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage2825A deployed to " + CrypToadzCustomImage2825ADeployed.address);

    const CrypToadzCustomImage2825B = await ethers.getContractFactory("CrypToadzCustomImage2825B", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage2825BDeployed = await CrypToadzCustomImage2825B.deploy();
    await CrypToadzCustomImage2825BDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage2825B deployed to " + CrypToadzCustomImage2825BDeployed.address);

    const CrypToadzCustomImage2825 = await ethers.getContractFactory("CrypToadzCustomImage2825");
    var CrypToadzCustomImage2825Deployed = await CrypToadzCustomImage2825.deploy(CrypToadzCustomImage2825ADeployed.address, CrypToadzCustomImage2825BDeployed.address);
    await CrypToadzCustomImage2825Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage2825 deployed to " + CrypToadzCustomImage2825Deployed.address);

    const CrypToadzCustomImage2839 = await ethers.getContractFactory("CrypToadzCustomImage2839", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage2839Deployed = await CrypToadzCustomImage2839.deploy();
    await CrypToadzCustomImage2839Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage2839 deployed to " + CrypToadzCustomImage2839Deployed.address);

    const CrypToadzCustomImage2846 = await ethers.getContractFactory("CrypToadzCustomImage2846", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage2846Deployed = await CrypToadzCustomImage2846.deploy();
    await CrypToadzCustomImage2846Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage2846 deployed to " + CrypToadzCustomImage2846Deployed.address);

    const CrypToadzCustomImage2865 = await ethers.getContractFactory("CrypToadzCustomImage2865", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage2865Deployed = await CrypToadzCustomImage2865.deploy();
    await CrypToadzCustomImage2865Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage2865 deployed to " + CrypToadzCustomImage2865Deployed.address);

    const CrypToadzCustomImage29000000 = await ethers.getContractFactory("CrypToadzCustomImage29000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage29000000Deployed = await CrypToadzCustomImage29000000.deploy();
    await CrypToadzCustomImage29000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage29000000 deployed to " + CrypToadzCustomImage29000000Deployed.address);

    const CrypToadzCustomImage2959A = await ethers.getContractFactory("CrypToadzCustomImage2959A", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage2959ADeployed = await CrypToadzCustomImage2959A.deploy();
    await CrypToadzCustomImage2959ADeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage2959A deployed to " + CrypToadzCustomImage2959ADeployed.address);

    const CrypToadzCustomImage2959B = await ethers.getContractFactory("CrypToadzCustomImage2959B", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage2959BDeployed = await CrypToadzCustomImage2959B.deploy();
    await CrypToadzCustomImage2959BDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage2959B deployed to " + CrypToadzCustomImage2959BDeployed.address);

    const CrypToadzCustomImage2959 = await ethers.getContractFactory("CrypToadzCustomImage2959");
    var CrypToadzCustomImage2959Deployed = await CrypToadzCustomImage2959.deploy(CrypToadzCustomImage2959ADeployed.address, CrypToadzCustomImage2959BDeployed.address);
    await CrypToadzCustomImage2959Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage2959 deployed to " + CrypToadzCustomImage2959Deployed.address);

    const CrypToadzCustomImage2986 = await ethers.getContractFactory("CrypToadzCustomImage2986", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage2986Deployed = await CrypToadzCustomImage2986.deploy();
    await CrypToadzCustomImage2986Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage2986 deployed to " + CrypToadzCustomImage2986Deployed.address);

    const CrypToadzCustomImage3000000 = await ethers.getContractFactory("CrypToadzCustomImage3000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage3000000Deployed = await CrypToadzCustomImage3000000.deploy();
    await CrypToadzCustomImage3000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage3000000 deployed to " + CrypToadzCustomImage3000000Deployed.address);

    const CrypToadzCustomImage30000000 = await ethers.getContractFactory("CrypToadzCustomImage30000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage30000000Deployed = await CrypToadzCustomImage30000000.deploy();
    await CrypToadzCustomImage30000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage30000000 deployed to " + CrypToadzCustomImage30000000Deployed.address);

    const CrypToadzCustomImage31000000 = await ethers.getContractFactory("CrypToadzCustomImage31000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage31000000Deployed = await CrypToadzCustomImage31000000.deploy();
    await CrypToadzCustomImage31000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage31000000 deployed to " + CrypToadzCustomImage31000000Deployed.address);

    const CrypToadzCustomImage316 = await ethers.getContractFactory("CrypToadzCustomImage316", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage316Deployed = await CrypToadzCustomImage316.deploy();
    await CrypToadzCustomImage316Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage316 deployed to " + CrypToadzCustomImage316Deployed.address);

    const CrypToadzCustomImage3196A = await ethers.getContractFactory("CrypToadzCustomImage3196A", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage3196ADeployed = await CrypToadzCustomImage3196A.deploy();
    await CrypToadzCustomImage3196ADeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage3196A deployed to " + CrypToadzCustomImage3196ADeployed.address);

    const CrypToadzCustomImage3196B = await ethers.getContractFactory("CrypToadzCustomImage3196B", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage3196BDeployed = await CrypToadzCustomImage3196B.deploy();
    await CrypToadzCustomImage3196BDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage3196B deployed to " + CrypToadzCustomImage3196BDeployed.address);

    const CrypToadzCustomImage3196 = await ethers.getContractFactory("CrypToadzCustomImage3196");
    var CrypToadzCustomImage3196Deployed = await CrypToadzCustomImage3196.deploy(CrypToadzCustomImage3196ADeployed.address, CrypToadzCustomImage3196BDeployed.address);
    await CrypToadzCustomImage3196Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage3196 deployed to " + CrypToadzCustomImage3196Deployed.address);

    const CrypToadzCustomImage32000000 = await ethers.getContractFactory("CrypToadzCustomImage32000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage32000000Deployed = await CrypToadzCustomImage32000000.deploy();
    await CrypToadzCustomImage32000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage32000000 deployed to " + CrypToadzCustomImage32000000Deployed.address);

    const CrypToadzCustomImage33000000 = await ethers.getContractFactory("CrypToadzCustomImage33000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage33000000Deployed = await CrypToadzCustomImage33000000.deploy();
    await CrypToadzCustomImage33000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage33000000 deployed to " + CrypToadzCustomImage33000000Deployed.address);

    const CrypToadzCustomImage3309A = await ethers.getContractFactory("CrypToadzCustomImage3309A", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage3309ADeployed = await CrypToadzCustomImage3309A.deploy();
    await CrypToadzCustomImage3309ADeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage3309A deployed to " + CrypToadzCustomImage3309ADeployed.address);

    const CrypToadzCustomImage3309B = await ethers.getContractFactory("CrypToadzCustomImage3309B", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage3309BDeployed = await CrypToadzCustomImage3309B.deploy();
    await CrypToadzCustomImage3309BDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage3309B deployed to " + CrypToadzCustomImage3309BDeployed.address);

    const CrypToadzCustomImage3309C = await ethers.getContractFactory("CrypToadzCustomImage3309C", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage3309CDeployed = await CrypToadzCustomImage3309C.deploy();
    await CrypToadzCustomImage3309CDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage3309C deployed to " + CrypToadzCustomImage3309CDeployed.address);

    const CrypToadzCustomImage3309 = await ethers.getContractFactory("CrypToadzCustomImage3309");
    var CrypToadzCustomImage3309Deployed = await CrypToadzCustomImage3309.deploy(CrypToadzCustomImage3309ADeployed.address, CrypToadzCustomImage3309BDeployed.address, CrypToadzCustomImage3309CDeployed.address);
    await CrypToadzCustomImage3309Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage3309 deployed to " + CrypToadzCustomImage3309Deployed.address);

    const CrypToadzCustomImage3382A = await ethers.getContractFactory("CrypToadzCustomImage3382A", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage3382ADeployed = await CrypToadzCustomImage3382A.deploy();
    await CrypToadzCustomImage3382ADeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage3382A deployed to " + CrypToadzCustomImage3382ADeployed.address);

    const CrypToadzCustomImage3382B = await ethers.getContractFactory("CrypToadzCustomImage3382B", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage3382BDeployed = await CrypToadzCustomImage3382B.deploy();
    await CrypToadzCustomImage3382BDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage3382B deployed to " + CrypToadzCustomImage3382BDeployed.address);

    const CrypToadzCustomImage3382 = await ethers.getContractFactory("CrypToadzCustomImage3382");
    var CrypToadzCustomImage3382Deployed = await CrypToadzCustomImage3382.deploy(CrypToadzCustomImage3382ADeployed.address, CrypToadzCustomImage3382BDeployed.address);
    await CrypToadzCustomImage3382Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage3382 deployed to " + CrypToadzCustomImage3382Deployed.address);

    const CrypToadzCustomImage34000000 = await ethers.getContractFactory("CrypToadzCustomImage34000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage34000000Deployed = await CrypToadzCustomImage34000000.deploy();
    await CrypToadzCustomImage34000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage34000000 deployed to " + CrypToadzCustomImage34000000Deployed.address);

    const CrypToadzCustomImage35000000 = await ethers.getContractFactory("CrypToadzCustomImage35000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage35000000Deployed = await CrypToadzCustomImage35000000.deploy();
    await CrypToadzCustomImage35000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage35000000 deployed to " + CrypToadzCustomImage35000000Deployed.address);

    const CrypToadzCustomImage36000000 = await ethers.getContractFactory("CrypToadzCustomImage36000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage36000000Deployed = await CrypToadzCustomImage36000000.deploy();
    await CrypToadzCustomImage36000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage36000000 deployed to " + CrypToadzCustomImage36000000Deployed.address);

    const CrypToadzCustomImage37000000 = await ethers.getContractFactory("CrypToadzCustomImage37000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage37000000Deployed = await CrypToadzCustomImage37000000.deploy();
    await CrypToadzCustomImage37000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage37000000 deployed to " + CrypToadzCustomImage37000000Deployed.address);

    const CrypToadzCustomImage3703 = await ethers.getContractFactory("CrypToadzCustomImage3703", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage3703Deployed = await CrypToadzCustomImage3703.deploy();
    await CrypToadzCustomImage3703Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage3703 deployed to " + CrypToadzCustomImage3703Deployed.address);

    const CrypToadzCustomImage38000000 = await ethers.getContractFactory("CrypToadzCustomImage38000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage38000000Deployed = await CrypToadzCustomImage38000000.deploy();
    await CrypToadzCustomImage38000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage38000000 deployed to " + CrypToadzCustomImage38000000Deployed.address);

    const CrypToadzCustomImage39000000 = await ethers.getContractFactory("CrypToadzCustomImage39000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage39000000Deployed = await CrypToadzCustomImage39000000.deploy();
    await CrypToadzCustomImage39000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage39000000 deployed to " + CrypToadzCustomImage39000000Deployed.address);

    const CrypToadzCustomImage4000000 = await ethers.getContractFactory("CrypToadzCustomImage4000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4000000Deployed = await CrypToadzCustomImage4000000.deploy();
    await CrypToadzCustomImage4000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage4000000 deployed to " + CrypToadzCustomImage4000000Deployed.address);

    const CrypToadzCustomImage40000000 = await ethers.getContractFactory("CrypToadzCustomImage40000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage40000000Deployed = await CrypToadzCustomImage40000000.deploy();
    await CrypToadzCustomImage40000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage40000000 deployed to " + CrypToadzCustomImage40000000Deployed.address);

    const CrypToadzCustomImage4096 = await ethers.getContractFactory("CrypToadzCustomImage4096", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4096Deployed = await CrypToadzCustomImage4096.deploy();
    await CrypToadzCustomImage4096Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage4096 deployed to " + CrypToadzCustomImage4096Deployed.address);

    const CrypToadzCustomImage41000000 = await ethers.getContractFactory("CrypToadzCustomImage41000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage41000000Deployed = await CrypToadzCustomImage41000000.deploy();
    await CrypToadzCustomImage41000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage41000000 deployed to " + CrypToadzCustomImage41000000Deployed.address);

    const CrypToadzCustomImage4126 = await ethers.getContractFactory("CrypToadzCustomImage4126", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4126Deployed = await CrypToadzCustomImage4126.deploy();
    await CrypToadzCustomImage4126Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage4126 deployed to " + CrypToadzCustomImage4126Deployed.address);

    const CrypToadzCustomImage4152A = await ethers.getContractFactory("CrypToadzCustomImage4152A", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4152ADeployed = await CrypToadzCustomImage4152A.deploy();
    await CrypToadzCustomImage4152ADeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage4152A deployed to " + CrypToadzCustomImage4152ADeployed.address);

    const CrypToadzCustomImage4152B = await ethers.getContractFactory("CrypToadzCustomImage4152B", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4152BDeployed = await CrypToadzCustomImage4152B.deploy();
    await CrypToadzCustomImage4152BDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage4152B deployed to " + CrypToadzCustomImage4152BDeployed.address);

    const CrypToadzCustomImage4152 = await ethers.getContractFactory("CrypToadzCustomImage4152");
    var CrypToadzCustomImage4152Deployed = await CrypToadzCustomImage4152.deploy(CrypToadzCustomImage4152ADeployed.address, CrypToadzCustomImage4152BDeployed.address);
    await CrypToadzCustomImage4152Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage4152 deployed to " + CrypToadzCustomImage4152Deployed.address);

    const CrypToadzCustomImage4192 = await ethers.getContractFactory("CrypToadzCustomImage4192", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4192Deployed = await CrypToadzCustomImage4192.deploy();
    await CrypToadzCustomImage4192Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage4192 deployed to " + CrypToadzCustomImage4192Deployed.address);

    const CrypToadzCustomImage42000000 = await ethers.getContractFactory("CrypToadzCustomImage42000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage42000000Deployed = await CrypToadzCustomImage42000000.deploy();
    await CrypToadzCustomImage42000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage42000000 deployed to " + CrypToadzCustomImage42000000Deployed.address);

    const CrypToadzCustomImage4201 = await ethers.getContractFactory("CrypToadzCustomImage4201", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4201Deployed = await CrypToadzCustomImage4201.deploy();
    await CrypToadzCustomImage4201Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage4201 deployed to " + CrypToadzCustomImage4201Deployed.address);

    const CrypToadzCustomImage4221 = await ethers.getContractFactory("CrypToadzCustomImage4221", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4221Deployed = await CrypToadzCustomImage4221.deploy();
    await CrypToadzCustomImage4221Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage4221 deployed to " + CrypToadzCustomImage4221Deployed.address);

    const CrypToadzCustomImage4238A = await ethers.getContractFactory("CrypToadzCustomImage4238A", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4238ADeployed = await CrypToadzCustomImage4238A.deploy();
    await CrypToadzCustomImage4238ADeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage4238A deployed to " + CrypToadzCustomImage4238ADeployed.address);

    const CrypToadzCustomImage4238B = await ethers.getContractFactory("CrypToadzCustomImage4238B", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4238BDeployed = await CrypToadzCustomImage4238B.deploy();
    await CrypToadzCustomImage4238BDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage4238B deployed to " + CrypToadzCustomImage4238BDeployed.address);

    const CrypToadzCustomImage4238 = await ethers.getContractFactory("CrypToadzCustomImage4238");
    var CrypToadzCustomImage4238Deployed = await CrypToadzCustomImage4238.deploy(CrypToadzCustomImage4238ADeployed.address, CrypToadzCustomImage4238BDeployed.address);
    await CrypToadzCustomImage4238Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage4238 deployed to " + CrypToadzCustomImage4238Deployed.address);

    const CrypToadzCustomImage4368 = await ethers.getContractFactory("CrypToadzCustomImage4368", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4368Deployed = await CrypToadzCustomImage4368.deploy();
    await CrypToadzCustomImage4368Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage4368 deployed to " + CrypToadzCustomImage4368Deployed.address);

    const CrypToadzCustomImage44000000 = await ethers.getContractFactory("CrypToadzCustomImage44000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage44000000Deployed = await CrypToadzCustomImage44000000.deploy();
    await CrypToadzCustomImage44000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage44000000 deployed to " + CrypToadzCustomImage44000000Deployed.address);

    const CrypToadzCustomImage45000000 = await ethers.getContractFactory("CrypToadzCustomImage45000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage45000000Deployed = await CrypToadzCustomImage45000000.deploy();
    await CrypToadzCustomImage45000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage45000000 deployed to " + CrypToadzCustomImage45000000Deployed.address);

    const CrypToadzCustomImage4578 = await ethers.getContractFactory("CrypToadzCustomImage4578", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4578Deployed = await CrypToadzCustomImage4578.deploy();
    await CrypToadzCustomImage4578Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage4578 deployed to " + CrypToadzCustomImage4578Deployed.address);

    const CrypToadzCustomImage4580A = await ethers.getContractFactory("CrypToadzCustomImage4580A", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4580ADeployed = await CrypToadzCustomImage4580A.deploy();
    await CrypToadzCustomImage4580ADeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage4580A deployed to " + CrypToadzCustomImage4580ADeployed.address);

    const CrypToadzCustomImage4580B = await ethers.getContractFactory("CrypToadzCustomImage4580B", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4580BDeployed = await CrypToadzCustomImage4580B.deploy();
    await CrypToadzCustomImage4580BDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage4580B deployed to " + CrypToadzCustomImage4580BDeployed.address);

    const CrypToadzCustomImage4580 = await ethers.getContractFactory("CrypToadzCustomImage4580");
    var CrypToadzCustomImage4580Deployed = await CrypToadzCustomImage4580.deploy(CrypToadzCustomImage4580ADeployed.address, CrypToadzCustomImage4580BDeployed.address);
    await CrypToadzCustomImage4580Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage4580 deployed to " + CrypToadzCustomImage4580Deployed.address);

    const CrypToadzCustomImage46000000 = await ethers.getContractFactory("CrypToadzCustomImage46000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage46000000Deployed = await CrypToadzCustomImage46000000.deploy();
    await CrypToadzCustomImage46000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage46000000 deployed to " + CrypToadzCustomImage46000000Deployed.address);

    const CrypToadzCustomImage4604 = await ethers.getContractFactory("CrypToadzCustomImage4604", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4604Deployed = await CrypToadzCustomImage4604.deploy();
    await CrypToadzCustomImage4604Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage4604 deployed to " + CrypToadzCustomImage4604Deployed.address);

    const CrypToadzCustomImage47000000 = await ethers.getContractFactory("CrypToadzCustomImage47000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage47000000Deployed = await CrypToadzCustomImage47000000.deploy();
    await CrypToadzCustomImage47000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage47000000 deployed to " + CrypToadzCustomImage47000000Deployed.address);

    const CrypToadzCustomImage4714 = await ethers.getContractFactory("CrypToadzCustomImage4714", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4714Deployed = await CrypToadzCustomImage4714.deploy();
    await CrypToadzCustomImage4714Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage4714 deployed to " + CrypToadzCustomImage4714Deployed.address);

    const CrypToadzCustomImage472 = await ethers.getContractFactory("CrypToadzCustomImage472", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage472Deployed = await CrypToadzCustomImage472.deploy();
    await CrypToadzCustomImage472Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage472 deployed to " + CrypToadzCustomImage472Deployed.address);

    const CrypToadzCustomImage4773 = await ethers.getContractFactory("CrypToadzCustomImage4773", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4773Deployed = await CrypToadzCustomImage4773.deploy();
    await CrypToadzCustomImage4773Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage4773 deployed to " + CrypToadzCustomImage4773Deployed.address);

    const CrypToadzCustomImage4845 = await ethers.getContractFactory("CrypToadzCustomImage4845", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4845Deployed = await CrypToadzCustomImage4845.deploy();
    await CrypToadzCustomImage4845Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage4845 deployed to " + CrypToadzCustomImage4845Deployed.address);

    const CrypToadzCustomImage4896A = await ethers.getContractFactory("CrypToadzCustomImage4896A", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4896ADeployed = await CrypToadzCustomImage4896A.deploy();
    await CrypToadzCustomImage4896ADeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage4896A deployed to " + CrypToadzCustomImage4896ADeployed.address);

    const CrypToadzCustomImage4896B = await ethers.getContractFactory("CrypToadzCustomImage4896B", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4896BDeployed = await CrypToadzCustomImage4896B.deploy();
    await CrypToadzCustomImage4896BDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage4896B deployed to " + CrypToadzCustomImage4896BDeployed.address);

    const CrypToadzCustomImage4896C = await ethers.getContractFactory("CrypToadzCustomImage4896C", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4896CDeployed = await CrypToadzCustomImage4896C.deploy();
    await CrypToadzCustomImage4896CDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage4896C deployed to " + CrypToadzCustomImage4896CDeployed.address);

    const CrypToadzCustomImage4896 = await ethers.getContractFactory("CrypToadzCustomImage4896");
    var CrypToadzCustomImage4896Deployed = await CrypToadzCustomImage4896.deploy(CrypToadzCustomImage4896ADeployed.address, CrypToadzCustomImage4896BDeployed.address, CrypToadzCustomImage4896CDeployed.address);
    await CrypToadzCustomImage4896Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage4896 deployed to " + CrypToadzCustomImage4896Deployed.address);

    const CrypToadzCustomImage49000000 = await ethers.getContractFactory("CrypToadzCustomImage49000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage49000000Deployed = await CrypToadzCustomImage49000000.deploy();
    await CrypToadzCustomImage49000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage49000000 deployed to " + CrypToadzCustomImage49000000Deployed.address);

    const CrypToadzCustomImage491 = await ethers.getContractFactory("CrypToadzCustomImage491", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage491Deployed = await CrypToadzCustomImage491.deploy();
    await CrypToadzCustomImage491Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage491 deployed to " + CrypToadzCustomImage491Deployed.address);

    const CrypToadzCustomImage5000000 = await ethers.getContractFactory("CrypToadzCustomImage5000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage5000000Deployed = await CrypToadzCustomImage5000000.deploy();
    await CrypToadzCustomImage5000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage5000000 deployed to " + CrypToadzCustomImage5000000Deployed.address);

    const CrypToadzCustomImage50000000 = await ethers.getContractFactory("CrypToadzCustomImage50000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage50000000Deployed = await CrypToadzCustomImage50000000.deploy();
    await CrypToadzCustomImage50000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage50000000 deployed to " + CrypToadzCustomImage50000000Deployed.address);

    const CrypToadzCustomImage51000000 = await ethers.getContractFactory("CrypToadzCustomImage51000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage51000000Deployed = await CrypToadzCustomImage51000000.deploy();
    await CrypToadzCustomImage51000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage51000000 deployed to " + CrypToadzCustomImage51000000Deployed.address);

    const CrypToadzCustomImage5128 = await ethers.getContractFactory("CrypToadzCustomImage5128", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage5128Deployed = await CrypToadzCustomImage5128.deploy();
    await CrypToadzCustomImage5128Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage5128 deployed to " + CrypToadzCustomImage5128Deployed.address);

    const CrypToadzCustomImage5150 = await ethers.getContractFactory("CrypToadzCustomImage5150", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage5150Deployed = await CrypToadzCustomImage5150.deploy();
    await CrypToadzCustomImage5150Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage5150 deployed to " + CrypToadzCustomImage5150Deployed.address);

    const CrypToadzCustomImage52000000 = await ethers.getContractFactory("CrypToadzCustomImage52000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage52000000Deployed = await CrypToadzCustomImage52000000.deploy();
    await CrypToadzCustomImage52000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage52000000 deployed to " + CrypToadzCustomImage52000000Deployed.address);

    const CrypToadzCustomImage5262 = await ethers.getContractFactory("CrypToadzCustomImage5262", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage5262Deployed = await CrypToadzCustomImage5262.deploy();
    await CrypToadzCustomImage5262Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage5262 deployed to " + CrypToadzCustomImage5262Deployed.address);

    const CrypToadzCustomImage53000000 = await ethers.getContractFactory("CrypToadzCustomImage53000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage53000000Deployed = await CrypToadzCustomImage53000000.deploy();
    await CrypToadzCustomImage53000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage53000000 deployed to " + CrypToadzCustomImage53000000Deployed.address);

    const CrypToadzCustomImage54000000 = await ethers.getContractFactory("CrypToadzCustomImage54000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage54000000Deployed = await CrypToadzCustomImage54000000.deploy();
    await CrypToadzCustomImage54000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage54000000 deployed to " + CrypToadzCustomImage54000000Deployed.address);

    const CrypToadzCustomImage5441 = await ethers.getContractFactory("CrypToadzCustomImage5441", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage5441Deployed = await CrypToadzCustomImage5441.deploy();
    await CrypToadzCustomImage5441Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage5441 deployed to " + CrypToadzCustomImage5441Deployed.address);

    const CrypToadzCustomImage5471A = await ethers.getContractFactory("CrypToadzCustomImage5471A", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage5471ADeployed = await CrypToadzCustomImage5471A.deploy();
    await CrypToadzCustomImage5471ADeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage5471A deployed to " + CrypToadzCustomImage5471ADeployed.address);

    const CrypToadzCustomImage5471B = await ethers.getContractFactory("CrypToadzCustomImage5471B", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage5471BDeployed = await CrypToadzCustomImage5471B.deploy();
    await CrypToadzCustomImage5471BDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage5471B deployed to " + CrypToadzCustomImage5471BDeployed.address);

    const CrypToadzCustomImage5471C = await ethers.getContractFactory("CrypToadzCustomImage5471C", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage5471CDeployed = await CrypToadzCustomImage5471C.deploy();
    await CrypToadzCustomImage5471CDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage5471C deployed to " + CrypToadzCustomImage5471CDeployed.address);

    const CrypToadzCustomImage5471 = await ethers.getContractFactory("CrypToadzCustomImage5471");
    var CrypToadzCustomImage5471Deployed = await CrypToadzCustomImage5471.deploy(CrypToadzCustomImage5471ADeployed.address, CrypToadzCustomImage5471BDeployed.address, CrypToadzCustomImage5471CDeployed.address);
    await CrypToadzCustomImage5471Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage5471 deployed to " + CrypToadzCustomImage5471Deployed.address);

    const CrypToadzCustomImage55000000 = await ethers.getContractFactory("CrypToadzCustomImage55000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage55000000Deployed = await CrypToadzCustomImage55000000.deploy();
    await CrypToadzCustomImage55000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage55000000 deployed to " + CrypToadzCustomImage55000000Deployed.address);

    const CrypToadzCustomImage56000000 = await ethers.getContractFactory("CrypToadzCustomImage56000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage56000000Deployed = await CrypToadzCustomImage56000000.deploy();
    await CrypToadzCustomImage56000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage56000000 deployed to " + CrypToadzCustomImage56000000Deployed.address);

    const CrypToadzCustomImage5730 = await ethers.getContractFactory("CrypToadzCustomImage5730", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage5730Deployed = await CrypToadzCustomImage5730.deploy();
    await CrypToadzCustomImage5730Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage5730 deployed to " + CrypToadzCustomImage5730Deployed.address);

    const CrypToadzCustomImage5836 = await ethers.getContractFactory("CrypToadzCustomImage5836", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage5836Deployed = await CrypToadzCustomImage5836.deploy();
    await CrypToadzCustomImage5836Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage5836 deployed to " + CrypToadzCustomImage5836Deployed.address);

    const CrypToadzCustomImage5848 = await ethers.getContractFactory("CrypToadzCustomImage5848", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage5848Deployed = await CrypToadzCustomImage5848.deploy();
    await CrypToadzCustomImage5848Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage5848 deployed to " + CrypToadzCustomImage5848Deployed.address);

    const CrypToadzCustomImage5902A = await ethers.getContractFactory("CrypToadzCustomImage5902A", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage5902ADeployed = await CrypToadzCustomImage5902A.deploy();
    await CrypToadzCustomImage5902ADeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage5902A deployed to " + CrypToadzCustomImage5902ADeployed.address);

    const CrypToadzCustomImage5902B = await ethers.getContractFactory("CrypToadzCustomImage5902B", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage5902BDeployed = await CrypToadzCustomImage5902B.deploy();
    await CrypToadzCustomImage5902BDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage5902B deployed to " + CrypToadzCustomImage5902BDeployed.address);

    const CrypToadzCustomImage5902 = await ethers.getContractFactory("CrypToadzCustomImage5902");
    var CrypToadzCustomImage5902Deployed = await CrypToadzCustomImage5902.deploy(CrypToadzCustomImage5902ADeployed.address, CrypToadzCustomImage5902BDeployed.address);
    await CrypToadzCustomImage5902Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage5902 deployed to " + CrypToadzCustomImage5902Deployed.address);

    const CrypToadzCustomImage6000000 = await ethers.getContractFactory("CrypToadzCustomImage6000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage6000000Deployed = await CrypToadzCustomImage6000000.deploy();
    await CrypToadzCustomImage6000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage6000000 deployed to " + CrypToadzCustomImage6000000Deployed.address);

    const CrypToadzCustomImage6214A = await ethers.getContractFactory("CrypToadzCustomImage6214A", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage6214ADeployed = await CrypToadzCustomImage6214A.deploy();
    await CrypToadzCustomImage6214ADeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage6214A deployed to " + CrypToadzCustomImage6214ADeployed.address);

    const CrypToadzCustomImage6214B = await ethers.getContractFactory("CrypToadzCustomImage6214B", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage6214BDeployed = await CrypToadzCustomImage6214B.deploy();
    await CrypToadzCustomImage6214BDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage6214B deployed to " + CrypToadzCustomImage6214BDeployed.address);

    const CrypToadzCustomImage6214 = await ethers.getContractFactory("CrypToadzCustomImage6214");
    var CrypToadzCustomImage6214Deployed = await CrypToadzCustomImage6214.deploy(CrypToadzCustomImage6214ADeployed.address, CrypToadzCustomImage6214BDeployed.address);
    await CrypToadzCustomImage6214Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage6214 deployed to " + CrypToadzCustomImage6214Deployed.address);

    const CrypToadzCustomImage6382A = await ethers.getContractFactory("CrypToadzCustomImage6382A", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage6382ADeployed = await CrypToadzCustomImage6382A.deploy();
    await CrypToadzCustomImage6382ADeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage6382A deployed to " + CrypToadzCustomImage6382ADeployed.address);

    const CrypToadzCustomImage6382B = await ethers.getContractFactory("CrypToadzCustomImage6382B", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage6382BDeployed = await CrypToadzCustomImage6382B.deploy();
    await CrypToadzCustomImage6382BDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage6382B deployed to " + CrypToadzCustomImage6382BDeployed.address);

    const CrypToadzCustomImage6382 = await ethers.getContractFactory("CrypToadzCustomImage6382");
    var CrypToadzCustomImage6382Deployed = await CrypToadzCustomImage6382.deploy(CrypToadzCustomImage6382ADeployed.address, CrypToadzCustomImage6382BDeployed.address);
    await CrypToadzCustomImage6382Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage6382 deployed to " + CrypToadzCustomImage6382Deployed.address);

    const CrypToadzCustomImage6491 = await ethers.getContractFactory("CrypToadzCustomImage6491", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage6491Deployed = await CrypToadzCustomImage6491.deploy();
    await CrypToadzCustomImage6491Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage6491 deployed to " + CrypToadzCustomImage6491Deployed.address);

    const CrypToadzCustomImage6572 = await ethers.getContractFactory("CrypToadzCustomImage6572", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage6572Deployed = await CrypToadzCustomImage6572.deploy();
    await CrypToadzCustomImage6572Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage6572 deployed to " + CrypToadzCustomImage6572Deployed.address);

    const CrypToadzCustomImage6578 = await ethers.getContractFactory("CrypToadzCustomImage6578", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage6578Deployed = await CrypToadzCustomImage6578.deploy();
    await CrypToadzCustomImage6578Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage6578 deployed to " + CrypToadzCustomImage6578Deployed.address);

    const CrypToadzCustomImage6631 = await ethers.getContractFactory("CrypToadzCustomImage6631", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage6631Deployed = await CrypToadzCustomImage6631.deploy();
    await CrypToadzCustomImage6631Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage6631 deployed to " + CrypToadzCustomImage6631Deployed.address);

    const CrypToadzCustomImage6719 = await ethers.getContractFactory("CrypToadzCustomImage6719", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage6719Deployed = await CrypToadzCustomImage6719.deploy();
    await CrypToadzCustomImage6719Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage6719 deployed to " + CrypToadzCustomImage6719Deployed.address);

    const CrypToadzCustomImage6736 = await ethers.getContractFactory("CrypToadzCustomImage6736", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage6736Deployed = await CrypToadzCustomImage6736.deploy();
    await CrypToadzCustomImage6736Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage6736 deployed to " + CrypToadzCustomImage6736Deployed.address);

    const CrypToadzCustomImage6852 = await ethers.getContractFactory("CrypToadzCustomImage6852", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage6852Deployed = await CrypToadzCustomImage6852.deploy();
    await CrypToadzCustomImage6852Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage6852 deployed to " + CrypToadzCustomImage6852Deployed.address);

    const CrypToadzCustomImage6894 = await ethers.getContractFactory("CrypToadzCustomImage6894", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage6894Deployed = await CrypToadzCustomImage6894.deploy();
    await CrypToadzCustomImage6894Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage6894 deployed to " + CrypToadzCustomImage6894Deployed.address);

    const CrypToadzCustomImage6916 = await ethers.getContractFactory("CrypToadzCustomImage6916", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage6916Deployed = await CrypToadzCustomImage6916.deploy();
    await CrypToadzCustomImage6916Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage6916 deployed to " + CrypToadzCustomImage6916Deployed.address);

    const CrypToadzCustomImage7000000 = await ethers.getContractFactory("CrypToadzCustomImage7000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage7000000Deployed = await CrypToadzCustomImage7000000.deploy();
    await CrypToadzCustomImage7000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage7000000 deployed to " + CrypToadzCustomImage7000000Deployed.address);

    const CrypToadzCustomImage703 = await ethers.getContractFactory("CrypToadzCustomImage703", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage703Deployed = await CrypToadzCustomImage703.deploy();
    await CrypToadzCustomImage703Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage703 deployed to " + CrypToadzCustomImage703Deployed.address);

    const CrypToadzCustomImage8000000 = await ethers.getContractFactory("CrypToadzCustomImage8000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage8000000Deployed = await CrypToadzCustomImage8000000.deploy();
    await CrypToadzCustomImage8000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage8000000 deployed to " + CrypToadzCustomImage8000000Deployed.address);

    const CrypToadzCustomImage864 = await ethers.getContractFactory("CrypToadzCustomImage864", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage864Deployed = await CrypToadzCustomImage864.deploy();
    await CrypToadzCustomImage864Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage864 deployed to " + CrypToadzCustomImage864Deployed.address);

    const CrypToadzCustomImage9000000 = await ethers.getContractFactory("CrypToadzCustomImage9000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage9000000Deployed = await CrypToadzCustomImage9000000.deploy();
    await CrypToadzCustomImage9000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage9000000 deployed to " + CrypToadzCustomImage9000000Deployed.address);

    const CrypToadzCustomImage916A = await ethers.getContractFactory("CrypToadzCustomImage916A", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage916ADeployed = await CrypToadzCustomImage916A.deploy();
    await CrypToadzCustomImage916ADeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage916A deployed to " + CrypToadzCustomImage916ADeployed.address);

    const CrypToadzCustomImage916B = await ethers.getContractFactory("CrypToadzCustomImage916B", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage916BDeployed = await CrypToadzCustomImage916B.deploy();
    await CrypToadzCustomImage916BDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage916B deployed to " + CrypToadzCustomImage916BDeployed.address);

    const CrypToadzCustomImage916 = await ethers.getContractFactory("CrypToadzCustomImage916");
    var CrypToadzCustomImage916Deployed = await CrypToadzCustomImage916.deploy(CrypToadzCustomImage916ADeployed.address, CrypToadzCustomImage916BDeployed.address);
    await CrypToadzCustomImage916Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage916 deployed to " + CrypToadzCustomImage916Deployed.address);

    const CrypToadzCustomImage936A = await ethers.getContractFactory("CrypToadzCustomImage936A", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage936ADeployed = await CrypToadzCustomImage936A.deploy();
    await CrypToadzCustomImage936ADeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage936A deployed to " + CrypToadzCustomImage936ADeployed.address);

    const CrypToadzCustomImage936B = await ethers.getContractFactory("CrypToadzCustomImage936B", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage936BDeployed = await CrypToadzCustomImage936B.deploy();
    await CrypToadzCustomImage936BDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage936B deployed to " + CrypToadzCustomImage936BDeployed.address);

    const CrypToadzCustomImage936 = await ethers.getContractFactory("CrypToadzCustomImage936");
    var CrypToadzCustomImage936Deployed = await CrypToadzCustomImage936.deploy(CrypToadzCustomImage936ADeployed.address, CrypToadzCustomImage936BDeployed.address);
    await CrypToadzCustomImage936Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage936 deployed to " + CrypToadzCustomImage936Deployed.address);

    const CrypToadzCustomImage966 = await ethers.getContractFactory("CrypToadzCustomImage966", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage966Deployed = await CrypToadzCustomImage966.deploy();
    await CrypToadzCustomImage966Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage966 deployed to " + CrypToadzCustomImage966Deployed.address);

    const CrypToadzCustomImages = await ethers.getContractFactory("CrypToadzCustomImages");

    var CrypToadzCustomImagesDeployed = await CrypToadzCustomImages.deploy({
      _123: CrypToadzCustomImage123Deployed.address,
      _316: CrypToadzCustomImage316Deployed.address,
      _472: CrypToadzCustomImage472Deployed.address,
      _491: CrypToadzCustomImage491Deployed.address,
      _703: CrypToadzCustomImage703Deployed.address,
      _864: CrypToadzCustomImage864Deployed.address,
      _916: CrypToadzCustomImage916Deployed.address,
      _936: CrypToadzCustomImage936Deployed.address,
      _966: CrypToadzCustomImage966Deployed.address,
      _1005: CrypToadzCustomImage1005Deployed.address,
      _1165: CrypToadzCustomImage1165Deployed.address,
      _1423: CrypToadzCustomImage1423Deployed.address,
      _1559: CrypToadzCustomImage1559Deployed.address,
      _1637: CrypToadzCustomImage1637Deployed.address,
      _1703: CrypToadzCustomImage1703Deployed.address,
      _1754: CrypToadzCustomImage1754Deployed.address,
      _1793: CrypToadzCustomImage1793Deployed.address,
      _1812: CrypToadzCustomImage1812Deployed.address,
      _1935: CrypToadzCustomImage1935Deployed.address,
      _1975: CrypToadzCustomImage1975Deployed.address,
      _2124: CrypToadzCustomImage2124Deployed.address,
      _2232: CrypToadzCustomImage2232Deployed.address,
      _2327: CrypToadzCustomImage2327Deployed.address,
      _2469: CrypToadzCustomImage2469Deployed.address,
      _2471: CrypToadzCustomImage2471Deployed.address,
      _2482: CrypToadzCustomImage2482Deployed.address,
      _2489: CrypToadzCustomImage2489Deployed.address,
      _2521: CrypToadzCustomImage2521Deployed.address,
      _2569: CrypToadzCustomImage2569Deployed.address,
      _2579: CrypToadzCustomImage2579Deployed.address,
      _2709: CrypToadzCustomImage2709Deployed.address,
      _2825: CrypToadzCustomImage2825Deployed.address,
      _2839: CrypToadzCustomImage2839Deployed.address,
      _2846: CrypToadzCustomImage2846Deployed.address,
      _2865: CrypToadzCustomImage2865Deployed.address,
      _2959: CrypToadzCustomImage2959Deployed.address,
      _2986: CrypToadzCustomImage2986Deployed.address,
      _3196: CrypToadzCustomImage3196Deployed.address,
      _3309: CrypToadzCustomImage3309Deployed.address,
      _3382: CrypToadzCustomImage3382Deployed.address,
      _3703: CrypToadzCustomImage3703Deployed.address,
      _4096: CrypToadzCustomImage4096Deployed.address,
      _4126: CrypToadzCustomImage4126Deployed.address,
      _4152: CrypToadzCustomImage4152Deployed.address,
      _4192: CrypToadzCustomImage4192Deployed.address,
      _4201: CrypToadzCustomImage4201Deployed.address,
      _4221: CrypToadzCustomImage4221Deployed.address,
      _4238: CrypToadzCustomImage4238Deployed.address,
      _4368: CrypToadzCustomImage4368Deployed.address,
      _4578: CrypToadzCustomImage4578Deployed.address,
      _4580: CrypToadzCustomImage4580Deployed.address,
      _4604: CrypToadzCustomImage4604Deployed.address,
      _4714: CrypToadzCustomImage4714Deployed.address,
      _4773: CrypToadzCustomImage4773Deployed.address,
      _4845: CrypToadzCustomImage4845Deployed.address,
      _4896: CrypToadzCustomImage4896Deployed.address,
      _5128: CrypToadzCustomImage5128Deployed.address,
      _5150: CrypToadzCustomImage5150Deployed.address,
      _5262: CrypToadzCustomImage5262Deployed.address,
      _5441: CrypToadzCustomImage5441Deployed.address,
      _5471: CrypToadzCustomImage5471Deployed.address,
      _5730: CrypToadzCustomImage5730Deployed.address,
      _5836: CrypToadzCustomImage5836Deployed.address,
      _5848: CrypToadzCustomImage5848Deployed.address,
      _5902: CrypToadzCustomImage5902Deployed.address,
      _6214: CrypToadzCustomImage6214Deployed.address,
      _6382: CrypToadzCustomImage6382Deployed.address,
      _6491: CrypToadzCustomImage6491Deployed.address,
      _6572: CrypToadzCustomImage6572Deployed.address,
      _6578: CrypToadzCustomImage6578Deployed.address,
      _6631: CrypToadzCustomImage6631Deployed.address,
      _6719: CrypToadzCustomImage6719Deployed.address,
      _6736: CrypToadzCustomImage6736Deployed.address,
      _6852: CrypToadzCustomImage6852Deployed.address,
      _6894: CrypToadzCustomImage6894Deployed.address,
      _6916: CrypToadzCustomImage6916Deployed.address,
      _1000000: CrypToadzCustomImage1000000Deployed.address,
      _2000000: CrypToadzCustomImage2000000Deployed.address,
      _3000000: CrypToadzCustomImage3000000Deployed.address,
      _4000000: CrypToadzCustomImage4000000Deployed.address,
      _5000000: CrypToadzCustomImage5000000Deployed.address,
      _6000000: CrypToadzCustomImage6000000Deployed.address,
      _7000000: CrypToadzCustomImage7000000Deployed.address,
      _8000000: CrypToadzCustomImage8000000Deployed.address,
      _9000000: CrypToadzCustomImage9000000Deployed.address,
      _10000000: CrypToadzCustomImage10000000Deployed.address,
      _11000000: CrypToadzCustomImage11000000Deployed.address,
      _12000000: CrypToadzCustomImage12000000Deployed.address,
      _13000000: CrypToadzCustomImage13000000Deployed.address,
      _14000000: CrypToadzCustomImage14000000Deployed.address,
      _15000000: CrypToadzCustomImage15000000Deployed.address,
      _16000000: CrypToadzCustomImage16000000Deployed.address,
      _17000000: CrypToadzCustomImage17000000Deployed.address,
      _18000000: CrypToadzCustomImage18000000Deployed.address,
      _19000000: CrypToadzCustomImage19000000Deployed.address,
      _20000000: CrypToadzCustomImage20000000Deployed.address,
      _21000000: CrypToadzCustomImage21000000Deployed.address,
      _22000000: CrypToadzCustomImage22000000Deployed.address,
      _23000000: CrypToadzCustomImage23000000Deployed.address,
      _24000000: CrypToadzCustomImage24000000Deployed.address,
      _25000000: CrypToadzCustomImage25000000Deployed.address,
      _26000000: CrypToadzCustomImage26000000Deployed.address,
      _27000000: CrypToadzCustomImage27000000Deployed.address,
      _28000000: CrypToadzCustomImage28000000Deployed.address,
      _29000000: CrypToadzCustomImage29000000Deployed.address,
      _30000000: CrypToadzCustomImage30000000Deployed.address,
      _31000000: CrypToadzCustomImage31000000Deployed.address,
      _32000000: CrypToadzCustomImage32000000Deployed.address,
      _33000000: CrypToadzCustomImage33000000Deployed.address,
      _34000000: CrypToadzCustomImage34000000Deployed.address,
      _35000000: CrypToadzCustomImage35000000Deployed.address,
      _36000000: CrypToadzCustomImage36000000Deployed.address,
      _37000000: CrypToadzCustomImage37000000Deployed.address,
      _38000000: CrypToadzCustomImage38000000Deployed.address,
      _39000000: CrypToadzCustomImage39000000Deployed.address,
      _40000000: CrypToadzCustomImage40000000Deployed.address,
      _41000000: CrypToadzCustomImage41000000Deployed.address,
      _42000000: CrypToadzCustomImage42000000Deployed.address,
      _44000000: CrypToadzCustomImage44000000Deployed.address,
      _45000000: CrypToadzCustomImage45000000Deployed.address,
      _46000000: CrypToadzCustomImage46000000Deployed.address,
      _47000000: CrypToadzCustomImage47000000Deployed.address,
      _49000000: CrypToadzCustomImage49000000Deployed.address,
      _50000000: CrypToadzCustomImage50000000Deployed.address,
      _51000000: CrypToadzCustomImage51000000Deployed.address,
      _52000000: CrypToadzCustomImage52000000Deployed.address,
      _53000000: CrypToadzCustomImage53000000Deployed.address,
      _54000000: CrypToadzCustomImage54000000Deployed.address,
      _55000000: CrypToadzCustomImage55000000Deployed.address,
      _56000000: CrypToadzCustomImage56000000Deployed.address
    });
    await CrypToadzCustomImagesDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImages deployed to " + CrypToadzCustomImagesDeployed.address);
  }

  if (true) {
    const CrypToadzCustomImage1519 = await ethers.getContractFactory("CrypToadzCustomImage1519", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage1519Deployed = await CrypToadzCustomImage1519.deploy();
    await CrypToadzCustomImage1519Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage1519 deployed to " + CrypToadzCustomImage1519Deployed.address);

    const CrypToadzCustomImage1943A = await ethers.getContractFactory("CrypToadzCustomImage1943A", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage1943ADeployed = await CrypToadzCustomImage1943A.deploy();
    await CrypToadzCustomImage1943ADeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage1943A deployed to " + CrypToadzCustomImage1943ADeployed.address);

    const CrypToadzCustomImage1943B = await ethers.getContractFactory("CrypToadzCustomImage1943B", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage1943BDeployed = await CrypToadzCustomImage1943B.deploy();
    await CrypToadzCustomImage1943BDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage1943B deployed to " + CrypToadzCustomImage1943BDeployed.address);

    const CrypToadzCustomImage1943C = await ethers.getContractFactory("CrypToadzCustomImage1943C", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage1943CDeployed = await CrypToadzCustomImage1943C.deploy();
    await CrypToadzCustomImage1943CDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage1943C deployed to " + CrypToadzCustomImage1943CDeployed.address);

    const CrypToadzCustomImage1943D = await ethers.getContractFactory("CrypToadzCustomImage1943D", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage1943DDeployed = await CrypToadzCustomImage1943D.deploy();
    await CrypToadzCustomImage1943DDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage1943D deployed to " + CrypToadzCustomImage1943DDeployed.address);

    const CrypToadzCustomImage1943E = await ethers.getContractFactory("CrypToadzCustomImage1943E", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage1943EDeployed = await CrypToadzCustomImage1943E.deploy();
    await CrypToadzCustomImage1943EDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage1943E deployed to " + CrypToadzCustomImage1943EDeployed.address);

    const CrypToadzCustomImage1943 = await ethers.getContractFactory("CrypToadzCustomImage1943");
    var CrypToadzCustomImage1943Deployed = await CrypToadzCustomImage1943.deploy(CrypToadzCustomImage1943ADeployed.address, CrypToadzCustomImage1943BDeployed.address, CrypToadzCustomImage1943CDeployed.address, CrypToadzCustomImage1943DDeployed.address, CrypToadzCustomImage1943EDeployed.address);
    await CrypToadzCustomImage1943Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage1943 deployed to " + CrypToadzCustomImage1943Deployed.address);

    const CrypToadzCustomImage2208 = await ethers.getContractFactory("CrypToadzCustomImage2208", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage2208Deployed = await CrypToadzCustomImage2208.deploy();
    await CrypToadzCustomImage2208Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage2208 deployed to " + CrypToadzCustomImage2208Deployed.address);

    const CrypToadzCustomImage318A = await ethers.getContractFactory("CrypToadzCustomImage318A", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage318ADeployed = await CrypToadzCustomImage318A.deploy();
    await CrypToadzCustomImage318ADeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage318A deployed to " + CrypToadzCustomImage318ADeployed.address);

    const CrypToadzCustomImage318B = await ethers.getContractFactory("CrypToadzCustomImage318B", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage318BDeployed = await CrypToadzCustomImage318B.deploy();
    await CrypToadzCustomImage318BDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage318B deployed to " + CrypToadzCustomImage318BDeployed.address);

    const CrypToadzCustomImage318C = await ethers.getContractFactory("CrypToadzCustomImage318C", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage318CDeployed = await CrypToadzCustomImage318C.deploy();
    await CrypToadzCustomImage318CDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage318C deployed to " + CrypToadzCustomImage318CDeployed.address);

    const CrypToadzCustomImage318D = await ethers.getContractFactory("CrypToadzCustomImage318D", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage318DDeployed = await CrypToadzCustomImage318D.deploy();
    await CrypToadzCustomImage318DDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage318D deployed to " + CrypToadzCustomImage318DDeployed.address);

    const CrypToadzCustomImage318E = await ethers.getContractFactory("CrypToadzCustomImage318E", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage318EDeployed = await CrypToadzCustomImage318E.deploy();
    await CrypToadzCustomImage318EDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage318E deployed to " + CrypToadzCustomImage318EDeployed.address);

    const CrypToadzCustomImage318F = await ethers.getContractFactory("CrypToadzCustomImage318F", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage318FDeployed = await CrypToadzCustomImage318F.deploy();
    await CrypToadzCustomImage318FDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage318F deployed to " + CrypToadzCustomImage318FDeployed.address);

    const CrypToadzCustomImage318 = await ethers.getContractFactory("CrypToadzCustomImage318");
    var CrypToadzCustomImage318Deployed = await CrypToadzCustomImage318.deploy(CrypToadzCustomImage318ADeployed.address, CrypToadzCustomImage318BDeployed.address, CrypToadzCustomImage318CDeployed.address, CrypToadzCustomImage318DDeployed.address, CrypToadzCustomImage318EDeployed.address, CrypToadzCustomImage318FDeployed.address);
    await CrypToadzCustomImage318Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage318 deployed to " + CrypToadzCustomImage318Deployed.address);

    const CrypToadzCustomImage3250 = await ethers.getContractFactory("CrypToadzCustomImage3250", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage3250Deployed = await CrypToadzCustomImage3250.deploy();
    await CrypToadzCustomImage3250Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage3250 deployed to " + CrypToadzCustomImage3250Deployed.address);

    const CrypToadzCustomImage3661A = await ethers.getContractFactory("CrypToadzCustomImage3661A", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage3661ADeployed = await CrypToadzCustomImage3661A.deploy();
    await CrypToadzCustomImage3661ADeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage3661A deployed to " + CrypToadzCustomImage3661ADeployed.address);

    const CrypToadzCustomImage3661B = await ethers.getContractFactory("CrypToadzCustomImage3661B", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage3661BDeployed = await CrypToadzCustomImage3661B.deploy();
    await CrypToadzCustomImage3661BDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage3661B deployed to " + CrypToadzCustomImage3661BDeployed.address);

    const CrypToadzCustomImage3661C = await ethers.getContractFactory("CrypToadzCustomImage3661C", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage3661CDeployed = await CrypToadzCustomImage3661C.deploy();
    await CrypToadzCustomImage3661CDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage3661C deployed to " + CrypToadzCustomImage3661CDeployed.address);

    const CrypToadzCustomImage3661D = await ethers.getContractFactory("CrypToadzCustomImage3661D", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage3661DDeployed = await CrypToadzCustomImage3661D.deploy();
    await CrypToadzCustomImage3661DDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage3661D deployed to " + CrypToadzCustomImage3661DDeployed.address);

    const CrypToadzCustomImage3661E = await ethers.getContractFactory("CrypToadzCustomImage3661E", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage3661EDeployed = await CrypToadzCustomImage3661E.deploy();
    await CrypToadzCustomImage3661EDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage3661E deployed to " + CrypToadzCustomImage3661EDeployed.address);

    const CrypToadzCustomImage3661F = await ethers.getContractFactory("CrypToadzCustomImage3661F", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage3661FDeployed = await CrypToadzCustomImage3661F.deploy();
    await CrypToadzCustomImage3661FDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage3661F deployed to " + CrypToadzCustomImage3661FDeployed.address);

    const CrypToadzCustomImage3661G = await ethers.getContractFactory("CrypToadzCustomImage3661G", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage3661GDeployed = await CrypToadzCustomImage3661G.deploy();
    await CrypToadzCustomImage3661GDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage3661G deployed to " + CrypToadzCustomImage3661GDeployed.address);

    const CrypToadzCustomImage3661 = await ethers.getContractFactory("CrypToadzCustomImage3661");
    var CrypToadzCustomImage3661Deployed = await CrypToadzCustomImage3661.deploy(CrypToadzCustomImage3661ADeployed.address, CrypToadzCustomImage3661BDeployed.address, CrypToadzCustomImage3661CDeployed.address, CrypToadzCustomImage3661DDeployed.address, CrypToadzCustomImage3661EDeployed.address, CrypToadzCustomImage3661FDeployed.address, CrypToadzCustomImage3661GDeployed.address);
    await CrypToadzCustomImage3661Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage3661 deployed to " + CrypToadzCustomImage3661Deployed.address);

    const CrypToadzCustomImage37A = await ethers.getContractFactory("CrypToadzCustomImage37A", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage37ADeployed = await CrypToadzCustomImage37A.deploy();
    await CrypToadzCustomImage37ADeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage37A deployed to " + CrypToadzCustomImage37ADeployed.address);

    const CrypToadzCustomImage37B = await ethers.getContractFactory("CrypToadzCustomImage37B", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage37BDeployed = await CrypToadzCustomImage37B.deploy();
    await CrypToadzCustomImage37BDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage37B deployed to " + CrypToadzCustomImage37BDeployed.address);

    const CrypToadzCustomImage37C = await ethers.getContractFactory("CrypToadzCustomImage37C", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage37CDeployed = await CrypToadzCustomImage37C.deploy();
    await CrypToadzCustomImage37CDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage37C deployed to " + CrypToadzCustomImage37CDeployed.address);

    const CrypToadzCustomImage37D = await ethers.getContractFactory("CrypToadzCustomImage37D", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage37DDeployed = await CrypToadzCustomImage37D.deploy();
    await CrypToadzCustomImage37DDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage37D deployed to " + CrypToadzCustomImage37DDeployed.address);

    const CrypToadzCustomImage37E = await ethers.getContractFactory("CrypToadzCustomImage37E", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage37EDeployed = await CrypToadzCustomImage37E.deploy();
    await CrypToadzCustomImage37EDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage37E deployed to " + CrypToadzCustomImage37EDeployed.address);

    const CrypToadzCustomImage37F = await ethers.getContractFactory("CrypToadzCustomImage37F", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage37FDeployed = await CrypToadzCustomImage37F.deploy();
    await CrypToadzCustomImage37FDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage37F deployed to " + CrypToadzCustomImage37FDeployed.address);

    const CrypToadzCustomImage37 = await ethers.getContractFactory("CrypToadzCustomImage37");
    var CrypToadzCustomImage37Deployed = await CrypToadzCustomImage37.deploy(CrypToadzCustomImage37ADeployed.address, CrypToadzCustomImage37BDeployed.address, CrypToadzCustomImage37CDeployed.address, CrypToadzCustomImage37DDeployed.address, CrypToadzCustomImage37EDeployed.address, CrypToadzCustomImage37FDeployed.address);
    await CrypToadzCustomImage37Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage37 deployed to " + CrypToadzCustomImage37Deployed.address);

    const CrypToadzCustomImage4035A = await ethers.getContractFactory("CrypToadzCustomImage4035A", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4035ADeployed = await CrypToadzCustomImage4035A.deploy();
    await CrypToadzCustomImage4035ADeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage4035A deployed to " + CrypToadzCustomImage4035ADeployed.address);

    const CrypToadzCustomImage4035B = await ethers.getContractFactory("CrypToadzCustomImage4035B", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4035BDeployed = await CrypToadzCustomImage4035B.deploy();
    await CrypToadzCustomImage4035BDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage4035B deployed to " + CrypToadzCustomImage4035BDeployed.address);

    const CrypToadzCustomImage4035C = await ethers.getContractFactory("CrypToadzCustomImage4035C", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4035CDeployed = await CrypToadzCustomImage4035C.deploy();
    await CrypToadzCustomImage4035CDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage4035C deployed to " + CrypToadzCustomImage4035CDeployed.address);

    const CrypToadzCustomImage4035D = await ethers.getContractFactory("CrypToadzCustomImage4035D", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4035DDeployed = await CrypToadzCustomImage4035D.deploy();
    await CrypToadzCustomImage4035DDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage4035D deployed to " + CrypToadzCustomImage4035DDeployed.address);

    const CrypToadzCustomImage4035E = await ethers.getContractFactory("CrypToadzCustomImage4035E", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4035EDeployed = await CrypToadzCustomImage4035E.deploy();
    await CrypToadzCustomImage4035EDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage4035E deployed to " + CrypToadzCustomImage4035EDeployed.address);

    const CrypToadzCustomImage4035F = await ethers.getContractFactory("CrypToadzCustomImage4035F", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4035FDeployed = await CrypToadzCustomImage4035F.deploy();
    await CrypToadzCustomImage4035FDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage4035F deployed to " + CrypToadzCustomImage4035FDeployed.address);

    const CrypToadzCustomImage4035 = await ethers.getContractFactory("CrypToadzCustomImage4035");
    var CrypToadzCustomImage4035Deployed = await CrypToadzCustomImage4035.deploy(CrypToadzCustomImage4035ADeployed.address, CrypToadzCustomImage4035BDeployed.address, CrypToadzCustomImage4035CDeployed.address, CrypToadzCustomImage4035DDeployed.address, CrypToadzCustomImage4035EDeployed.address, CrypToadzCustomImage4035FDeployed.address);
    await CrypToadzCustomImage4035Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage4035 deployed to " + CrypToadzCustomImage4035Deployed.address);

    const CrypToadzCustomImage43000000 = await ethers.getContractFactory("CrypToadzCustomImage43000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage43000000Deployed = await CrypToadzCustomImage43000000.deploy();
    await CrypToadzCustomImage43000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage43000000 deployed to " + CrypToadzCustomImage43000000Deployed.address);

    const CrypToadzCustomImage466A = await ethers.getContractFactory("CrypToadzCustomImage466A", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage466ADeployed = await CrypToadzCustomImage466A.deploy();
    await CrypToadzCustomImage466ADeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage466A deployed to " + CrypToadzCustomImage466ADeployed.address);

    const CrypToadzCustomImage466B = await ethers.getContractFactory("CrypToadzCustomImage466B", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage466BDeployed = await CrypToadzCustomImage466B.deploy();
    await CrypToadzCustomImage466BDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage466B deployed to " + CrypToadzCustomImage466BDeployed.address);

    const CrypToadzCustomImage466C = await ethers.getContractFactory("CrypToadzCustomImage466C", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage466CDeployed = await CrypToadzCustomImage466C.deploy();
    await CrypToadzCustomImage466CDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage466C deployed to " + CrypToadzCustomImage466CDeployed.address);

    const CrypToadzCustomImage466D = await ethers.getContractFactory("CrypToadzCustomImage466D", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage466DDeployed = await CrypToadzCustomImage466D.deploy();
    await CrypToadzCustomImage466DDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage466D deployed to " + CrypToadzCustomImage466DDeployed.address);

    const CrypToadzCustomImage466E = await ethers.getContractFactory("CrypToadzCustomImage466E", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage466EDeployed = await CrypToadzCustomImage466E.deploy();
    await CrypToadzCustomImage466EDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage466E deployed to " + CrypToadzCustomImage466EDeployed.address);

    const CrypToadzCustomImage466F = await ethers.getContractFactory("CrypToadzCustomImage466F", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage466FDeployed = await CrypToadzCustomImage466F.deploy();
    await CrypToadzCustomImage466FDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage466F deployed to " + CrypToadzCustomImage466FDeployed.address);

    const CrypToadzCustomImage466 = await ethers.getContractFactory("CrypToadzCustomImage466");
    var CrypToadzCustomImage466Deployed = await CrypToadzCustomImage466.deploy(CrypToadzCustomImage466ADeployed.address, CrypToadzCustomImage466BDeployed.address, CrypToadzCustomImage466CDeployed.address, CrypToadzCustomImage466DDeployed.address, CrypToadzCustomImage466EDeployed.address, CrypToadzCustomImage466FDeployed.address);
    await CrypToadzCustomImage466Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage466 deployed to " + CrypToadzCustomImage466Deployed.address);

    const CrypToadzCustomImage48000000 = await ethers.getContractFactory("CrypToadzCustomImage48000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage48000000Deployed = await CrypToadzCustomImage48000000.deploy();
    await CrypToadzCustomImage48000000Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage48000000 deployed to " + CrypToadzCustomImage48000000Deployed.address);

    const CrypToadzCustomImage4911A = await ethers.getContractFactory("CrypToadzCustomImage4911A", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4911ADeployed = await CrypToadzCustomImage4911A.deploy();
    await CrypToadzCustomImage4911ADeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage4911A deployed to " + CrypToadzCustomImage4911ADeployed.address);

    const CrypToadzCustomImage4911B = await ethers.getContractFactory("CrypToadzCustomImage4911B", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4911BDeployed = await CrypToadzCustomImage4911B.deploy();
    await CrypToadzCustomImage4911BDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage4911B deployed to " + CrypToadzCustomImage4911BDeployed.address);

    const CrypToadzCustomImage4911C = await ethers.getContractFactory("CrypToadzCustomImage4911C", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4911CDeployed = await CrypToadzCustomImage4911C.deploy();
    await CrypToadzCustomImage4911CDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage4911C deployed to " + CrypToadzCustomImage4911CDeployed.address);

    const CrypToadzCustomImage4911D = await ethers.getContractFactory("CrypToadzCustomImage4911D", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4911DDeployed = await CrypToadzCustomImage4911D.deploy();
    await CrypToadzCustomImage4911DDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage4911D deployed to " + CrypToadzCustomImage4911DDeployed.address);

    const CrypToadzCustomImage4911E = await ethers.getContractFactory("CrypToadzCustomImage4911E", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4911EDeployed = await CrypToadzCustomImage4911E.deploy();
    await CrypToadzCustomImage4911EDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage4911E deployed to " + CrypToadzCustomImage4911EDeployed.address);

    const CrypToadzCustomImage4911F = await ethers.getContractFactory("CrypToadzCustomImage4911F", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4911FDeployed = await CrypToadzCustomImage4911F.deploy();
    await CrypToadzCustomImage4911FDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage4911F deployed to " + CrypToadzCustomImage4911FDeployed.address);

    const CrypToadzCustomImage4911G = await ethers.getContractFactory("CrypToadzCustomImage4911G", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4911GDeployed = await CrypToadzCustomImage4911G.deploy();
    await CrypToadzCustomImage4911GDeployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage4911G deployed to " + CrypToadzCustomImage4911GDeployed.address);

    const CrypToadzCustomImage4911 = await ethers.getContractFactory("CrypToadzCustomImage4911");
    var CrypToadzCustomImage4911Deployed = await CrypToadzCustomImage4911.deploy(CrypToadzCustomImage4911ADeployed.address, CrypToadzCustomImage4911BDeployed.address, CrypToadzCustomImage4911CDeployed.address, CrypToadzCustomImage4911DDeployed.address, CrypToadzCustomImage4911EDeployed.address, CrypToadzCustomImage4911FDeployed.address, CrypToadzCustomImage4911GDeployed.address);
    await CrypToadzCustomImage4911Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage4911 deployed to " + CrypToadzCustomImage4911Deployed.address);

    const CrypToadzCustomImage5086 = await ethers.getContractFactory("CrypToadzCustomImage5086", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage5086Deployed = await CrypToadzCustomImage5086.deploy();
    await CrypToadzCustomImage5086Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage5086 deployed to " + CrypToadzCustomImage5086Deployed.address);

    const CrypToadzCustomImage5844 = await ethers.getContractFactory("CrypToadzCustomImage5844", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage5844Deployed = await CrypToadzCustomImage5844.deploy();
    await CrypToadzCustomImage5844Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage5844 deployed to " + CrypToadzCustomImage5844Deployed.address);

    const CrypToadzCustomImage6131 = await ethers.getContractFactory("CrypToadzCustomImage6131", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage6131Deployed = await CrypToadzCustomImage6131.deploy();
    await CrypToadzCustomImage6131Deployed.deployed();
    if (!quiet) console.log("CrypToadzCustomImage6131 deployed to " + CrypToadzCustomImage6131Deployed.address);

    const CrypToadzCustomAnimations = await ethers.getContractFactory("CrypToadzCustomAnimations");

    var CrypToadzCustomAnimationsDeployed = await CrypToadzCustomAnimations.deploy({
      _37: CrypToadzCustomImage37Deployed.address,
      _318: CrypToadzCustomImage318Deployed.address,
      _466: CrypToadzCustomImage466Deployed.address,
      _1519: CrypToadzCustomImage1519Deployed.address,
      _1943: CrypToadzCustomImage1943Deployed.address,
      _2208: CrypToadzCustomImage2208Deployed.address,
      _3250: CrypToadzCustomImage3250Deployed.address,
      _3661: CrypToadzCustomImage3661Deployed.address,
      _4035: CrypToadzCustomImage4035Deployed.address,
      _4911: CrypToadzCustomImage4911Deployed.address,
      _5086: CrypToadzCustomImage5086Deployed.address,
      _5844: CrypToadzCustomImage5844Deployed.address,
      _6131: CrypToadzCustomImage6131Deployed.address,
      _43000000: CrypToadzCustomImage43000000Deployed.address,
      _48000000: CrypToadzCustomImage48000000Deployed.address
    });
    if (!quiet) console.log("CrypToadzCustomAnimations deployed to " + CrypToadzCustomAnimationsDeployed.address);
  }

  const CrypToadzChained = await ethers.getContractFactory("CrypToadzChained", {
    libraries: {
      "GIFEncoder": GIFEncoderDeployed.address
    }
  });
  var CrypToadzChainedDeployed = await CrypToadzChained.deploy(
    CrypToadzStringsDeployed.address,
    CrypToadzBuilderDeployed.address,
    CrypToadzMetadataDeployed.address,
    CrypToadzCustomImagesDeployed.address,
    CrypToadzCustomAnimationsDeployed.address
  );

  await CrypToadzChainedDeployed.deployed();
  if (!quiet) console.log("CrypToadzChained deployed to " + CrypToadzChainedDeployed.address)
  return CrypToadzChainedDeployed;
}


