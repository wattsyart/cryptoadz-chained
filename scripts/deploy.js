const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {

  const GIFEncoder = await ethers.getContractFactory("GIFEncoder");
  var GIFEncoderDeployed = await GIFEncoder.deploy();
  await GIFEncoderDeployed.deployed();
  console.log("GIFEncoder deployed to " + GIFEncoderDeployed.address);

  const PixelRenderer = await ethers.getContractFactory("PixelRenderer");
  var PixelRendererDeployed = await PixelRenderer.deploy();
  await PixelRendererDeployed.deployed();
  console.log("PixelRenderer deployed to " + PixelRendererDeployed.address);

  const CrypToadzStrings = await ethers.getContractFactory("CrypToadzStrings");
  var CrypToadzStringsDeployed = await CrypToadzStrings.deploy();
  await CrypToadzStringsDeployed.deployed();
  console.log("CrypToadzStrings deployed to " + CrypToadzStringsDeployed.address);

  const CrypToadzBuilderAny = await ethers.getContractFactory("CrypToadzBuilderAny");
  var CrypToadzBuilderAnyDeployed = await CrypToadzBuilderAny.deploy();
  await CrypToadzBuilderAnyDeployed.deployed();
  console.log("CrypToadzBuilderAny deployed to " + CrypToadzBuilderAnyDeployed.address);

  const CrypToadzBuilderShort = await ethers.getContractFactory("CrypToadzBuilderShort");
  var CrypToadzBuilderShortDeployed = await CrypToadzBuilderShort.deploy();
  await CrypToadzBuilderShortDeployed.deployed();
  console.log("CrypToadzBuilderShort deployed to " + CrypToadzBuilderShortDeployed.address);

  const CrypToadzBuilderTall = await ethers.getContractFactory("CrypToadzBuilderTall");
  var CrypToadzBuilderTallDeployed = await CrypToadzBuilderTall.deploy();
  await CrypToadzBuilderTallDeployed.deployed();
  console.log("CrypToadzBuilderTall deployed to " + CrypToadzBuilderTallDeployed.address);

  const CrypToadzBuilder = await ethers.getContractFactory("CrypToadzBuilder", {
    libraries: {
      PixelRenderer: PixelRendererDeployed.address
    }
  });
  var CrypToadzBuilderDeployed = await CrypToadzBuilder.deploy(CrypToadzBuilderAnyDeployed.address, CrypToadzBuilderShortDeployed.address, CrypToadzBuilderTallDeployed.address);
  await CrypToadzBuilderDeployed.deployed();
  console.log("CrypToadzBuilder deployed to " + CrypToadzBuilderDeployed.address);

  const CrypToadzMetadata = await ethers.getContractFactory("CrypToadzMetadata");
  var CrypToadzMetadataDeployed = await CrypToadzMetadata.deploy();
  await CrypToadzMetadataDeployed.deployed();
  console.log("CrypToadzMetadata deployed to " + CrypToadzMetadataDeployed.address);

  const CrypToadzCustomImageBank = await ethers.getContractFactory("CrypToadzCustomImageBank");
  var CrypToadzCustomImageBankDeployed = await CrypToadzCustomImageBank.deploy();
  await CrypToadzCustomImageBankDeployed.deployed();
  console.log("CrypToadzCustomImageBank deployed to " + CrypToadzCustomImageBankDeployed.address);

  {
    const CrypToadzCustomImage1005 = await ethers.getContractFactory("CrypToadzCustomImage1005", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage1005Deployed = await CrypToadzCustomImage1005.deploy();
    await CrypToadzCustomImage1005Deployed.deployed();
    console.log("CrypToadzCustomImage1005 deployed to " + CrypToadzCustomImage1005Deployed.address);

    const CrypToadzCustomImage1793 = await ethers.getContractFactory("CrypToadzCustomImage1793", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage1793Deployed = await CrypToadzCustomImage1793.deploy();
    await CrypToadzCustomImage1793Deployed.deployed();
    console.log("CrypToadzCustomImage1793 deployed to " + CrypToadzCustomImage1793Deployed.address);

    const CrypToadzCustomImage1812 = await ethers.getContractFactory("CrypToadzCustomImage1812", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage1812Deployed = await CrypToadzCustomImage1812.deploy();
    await CrypToadzCustomImage1812Deployed.deployed();
    console.log("CrypToadzCustomImage1812 deployed to " + CrypToadzCustomImage1812Deployed.address);

    const CrypToadzCustomImage1975 = await ethers.getContractFactory("CrypToadzCustomImage1975", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage1975Deployed = await CrypToadzCustomImage1975.deploy();
    await CrypToadzCustomImage1975Deployed.deployed();
    console.log("CrypToadzCustomImage1975 deployed to " + CrypToadzCustomImage1975Deployed.address);

    const CrypToadzCustomImage2232 = await ethers.getContractFactory("CrypToadzCustomImage2232", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage2232Deployed = await CrypToadzCustomImage2232.deploy();
    await CrypToadzCustomImage2232Deployed.deployed();
    console.log("CrypToadzCustomImage2232 deployed to " + CrypToadzCustomImage2232Deployed.address);

    const CrypToadzCustomImage2327 = await ethers.getContractFactory("CrypToadzCustomImage2327", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage2327Deployed = await CrypToadzCustomImage2327.deploy();
    await CrypToadzCustomImage2327Deployed.deployed();
    console.log("CrypToadzCustomImage2327 deployed to " + CrypToadzCustomImage2327Deployed.address);

    const CrypToadzCustomImage2489 = await ethers.getContractFactory("CrypToadzCustomImage2489", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage2489Deployed = await CrypToadzCustomImage2489.deploy();
    await CrypToadzCustomImage2489Deployed.deployed();
    console.log("CrypToadzCustomImage2489 deployed to " + CrypToadzCustomImage2489Deployed.address);

    const CrypToadzCustomImage2521 = await ethers.getContractFactory("CrypToadzCustomImage2521", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage2521Deployed = await CrypToadzCustomImage2521.deploy();
    await CrypToadzCustomImage2521Deployed.deployed();
    console.log("CrypToadzCustomImage2521 deployed to " + CrypToadzCustomImage2521Deployed.address);

    const CrypToadzCustomImage2709 = await ethers.getContractFactory("CrypToadzCustomImage2709", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage2709Deployed = await CrypToadzCustomImage2709.deploy();
    await CrypToadzCustomImage2709Deployed.deployed();
    console.log("CrypToadzCustomImage2709 deployed to " + CrypToadzCustomImage2709Deployed.address);

    const CrypToadzCustomImage2825 = await ethers.getContractFactory("CrypToadzCustomImage2825", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage2825Deployed = await CrypToadzCustomImage2825.deploy();
    await CrypToadzCustomImage2825Deployed.deployed();
    console.log("CrypToadzCustomImage2825 deployed to " + CrypToadzCustomImage2825Deployed.address);

    const CrypToadzCustomImage2846 = await ethers.getContractFactory("CrypToadzCustomImage2846", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage2846Deployed = await CrypToadzCustomImage2846.deploy();
    await CrypToadzCustomImage2846Deployed.deployed();
    console.log("CrypToadzCustomImage2846 deployed to " + CrypToadzCustomImage2846Deployed.address);

    const CrypToadzCustomImage2959 = await ethers.getContractFactory("CrypToadzCustomImage2959", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage2959Deployed = await CrypToadzCustomImage2959.deploy();
    await CrypToadzCustomImage2959Deployed.deployed();
    console.log("CrypToadzCustomImage2959 deployed to " + CrypToadzCustomImage2959Deployed.address);

    const CrypToadzCustomImage316 = await ethers.getContractFactory("CrypToadzCustomImage316", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage316Deployed = await CrypToadzCustomImage316.deploy();
    await CrypToadzCustomImage316Deployed.deployed();
    console.log("CrypToadzCustomImage316 deployed to " + CrypToadzCustomImage316Deployed.address);

    const CrypToadzCustomImage3196 = await ethers.getContractFactory("CrypToadzCustomImage3196", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage3196Deployed = await CrypToadzCustomImage3196.deploy();
    await CrypToadzCustomImage3196Deployed.deployed();
    console.log("CrypToadzCustomImage3196 deployed to " + CrypToadzCustomImage3196Deployed.address);

    const CrypToadzCustomImage3309A = await ethers.getContractFactory("CrypToadzCustomImage3309A", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage3309ADeployed = await CrypToadzCustomImage3309A.deploy();
    await CrypToadzCustomImage3309ADeployed.deployed();
    console.log("CrypToadzCustomImage3309A deployed to " + CrypToadzCustomImage3309ADeployed.address);

    const CrypToadzCustomImage3309B = await ethers.getContractFactory("CrypToadzCustomImage3309B", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage3309BDeployed = await CrypToadzCustomImage3309B.deploy();
    await CrypToadzCustomImage3309BDeployed.deployed();
    console.log("CrypToadzCustomImage3309B deployed to " + CrypToadzCustomImage3309BDeployed.address);

    const CrypToadzCustomImage3309 = await ethers.getContractFactory("CrypToadzCustomImage3309");
    var CrypToadzCustomImage3309Deployed = await CrypToadzCustomImage3309.deploy(CrypToadzCustomImage3309ADeployed.address, CrypToadzCustomImage3309BDeployed.address);
    await CrypToadzCustomImage3309Deployed.deployed();
    console.log("CrypToadzCustomImage3309 deployed to " + CrypToadzCustomImage3309Deployed.address);

    const CrypToadzCustomImage3382 = await ethers.getContractFactory("CrypToadzCustomImage3382", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage3382Deployed = await CrypToadzCustomImage3382.deploy();
    await CrypToadzCustomImage3382Deployed.deployed();
    console.log("CrypToadzCustomImage3382 deployed to " + CrypToadzCustomImage3382Deployed.address);

    const CrypToadzCustomImage4096 = await ethers.getContractFactory("CrypToadzCustomImage4096", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4096Deployed = await CrypToadzCustomImage4096.deploy();
    await CrypToadzCustomImage4096Deployed.deployed();
    console.log("CrypToadzCustomImage4096 deployed to " + CrypToadzCustomImage4096Deployed.address);

    const CrypToadzCustomImage4152 = await ethers.getContractFactory("CrypToadzCustomImage4152", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4152Deployed = await CrypToadzCustomImage4152.deploy();
    await CrypToadzCustomImage4152Deployed.deployed();
    console.log("CrypToadzCustomImage4152 deployed to " + CrypToadzCustomImage4152Deployed.address);

    const CrypToadzCustomImage4238 = await ethers.getContractFactory("CrypToadzCustomImage4238", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4238Deployed = await CrypToadzCustomImage4238.deploy();
    await CrypToadzCustomImage4238Deployed.deployed();
    console.log("CrypToadzCustomImage4238 deployed to " + CrypToadzCustomImage4238Deployed.address);

    const CrypToadzCustomImage4580 = await ethers.getContractFactory("CrypToadzCustomImage4580", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4580Deployed = await CrypToadzCustomImage4580.deploy();
    await CrypToadzCustomImage4580Deployed.deployed();
    console.log("CrypToadzCustomImage4580 deployed to " + CrypToadzCustomImage4580Deployed.address);

    const CrypToadzCustomImage4714 = await ethers.getContractFactory("CrypToadzCustomImage4714", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4714Deployed = await CrypToadzCustomImage4714.deploy();
    await CrypToadzCustomImage4714Deployed.deployed();
    console.log("CrypToadzCustomImage4714 deployed to " + CrypToadzCustomImage4714Deployed.address);

    const CrypToadzCustomImage4773 = await ethers.getContractFactory("CrypToadzCustomImage4773", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4773Deployed = await CrypToadzCustomImage4773.deploy();
    await CrypToadzCustomImage4773Deployed.deployed();
    console.log("CrypToadzCustomImage4773 deployed to " + CrypToadzCustomImage4773Deployed.address);

    const CrypToadzCustomImage4896A = await ethers.getContractFactory("CrypToadzCustomImage4896A", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4896ADeployed = await CrypToadzCustomImage4896A.deploy();
    await CrypToadzCustomImage4896ADeployed.deployed();
    console.log("CrypToadzCustomImage4896A deployed to " + CrypToadzCustomImage4896ADeployed.address);

    const CrypToadzCustomImage4896B = await ethers.getContractFactory("CrypToadzCustomImage4896B", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4896BDeployed = await CrypToadzCustomImage4896B.deploy();
    await CrypToadzCustomImage4896BDeployed.deployed();
    console.log("CrypToadzCustomImage4896B deployed to " + CrypToadzCustomImage4896BDeployed.address);

    const CrypToadzCustomImage4896 = await ethers.getContractFactory("CrypToadzCustomImage4896");
    var CrypToadzCustomImage4896Deployed = await CrypToadzCustomImage4896.deploy(CrypToadzCustomImage4896ADeployed.address, CrypToadzCustomImage4896BDeployed.address);
    await CrypToadzCustomImage4896Deployed.deployed();
    console.log("CrypToadzCustomImage4896 deployed to " + CrypToadzCustomImage4896Deployed.address);

    const CrypToadzCustomImage5128 = await ethers.getContractFactory("CrypToadzCustomImage5128", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage5128Deployed = await CrypToadzCustomImage5128.deploy();
    await CrypToadzCustomImage5128Deployed.deployed();
    console.log("CrypToadzCustomImage5128 deployed to " + CrypToadzCustomImage5128Deployed.address);

    const CrypToadzCustomImage5471A = await ethers.getContractFactory("CrypToadzCustomImage5471A", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage5471ADeployed = await CrypToadzCustomImage5471A.deploy();
    await CrypToadzCustomImage5471ADeployed.deployed();
    console.log("CrypToadzCustomImage5471A deployed to " + CrypToadzCustomImage5471ADeployed.address);

    const CrypToadzCustomImage5471B = await ethers.getContractFactory("CrypToadzCustomImage5471B", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage5471BDeployed = await CrypToadzCustomImage5471B.deploy();
    await CrypToadzCustomImage5471BDeployed.deployed();
    console.log("CrypToadzCustomImage5471B deployed to " + CrypToadzCustomImage5471BDeployed.address);

    const CrypToadzCustomImage5471 = await ethers.getContractFactory("CrypToadzCustomImage5471");
    var CrypToadzCustomImage5471Deployed = await CrypToadzCustomImage5471.deploy(CrypToadzCustomImage5471ADeployed.address, CrypToadzCustomImage5471BDeployed.address);
    await CrypToadzCustomImage5471Deployed.deployed();
    console.log("CrypToadzCustomImage5471 deployed to " + CrypToadzCustomImage5471Deployed.address);

    const CrypToadzCustomImage5902 = await ethers.getContractFactory("CrypToadzCustomImage5902", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage5902Deployed = await CrypToadzCustomImage5902.deploy();
    await CrypToadzCustomImage5902Deployed.deployed();
    console.log("CrypToadzCustomImage5902 deployed to " + CrypToadzCustomImage5902Deployed.address);

    const CrypToadzCustomImage6214 = await ethers.getContractFactory("CrypToadzCustomImage6214", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage6214Deployed = await CrypToadzCustomImage6214.deploy();
    await CrypToadzCustomImage6214Deployed.deployed();
    console.log("CrypToadzCustomImage6214 deployed to " + CrypToadzCustomImage6214Deployed.address);

    const CrypToadzCustomImage6382 = await ethers.getContractFactory("CrypToadzCustomImage6382", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage6382Deployed = await CrypToadzCustomImage6382.deploy();
    await CrypToadzCustomImage6382Deployed.deployed();
    console.log("CrypToadzCustomImage6382 deployed to " + CrypToadzCustomImage6382Deployed.address);

    const CrypToadzCustomImage6491 = await ethers.getContractFactory("CrypToadzCustomImage6491", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage6491Deployed = await CrypToadzCustomImage6491.deploy();
    await CrypToadzCustomImage6491Deployed.deployed();
    console.log("CrypToadzCustomImage6491 deployed to " + CrypToadzCustomImage6491Deployed.address);

    const CrypToadzCustomImage6572 = await ethers.getContractFactory("CrypToadzCustomImage6572", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage6572Deployed = await CrypToadzCustomImage6572.deploy();
    await CrypToadzCustomImage6572Deployed.deployed();
    console.log("CrypToadzCustomImage6572 deployed to " + CrypToadzCustomImage6572Deployed.address);

    const CrypToadzCustomImage6631 = await ethers.getContractFactory("CrypToadzCustomImage6631", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage6631Deployed = await CrypToadzCustomImage6631.deploy();
    await CrypToadzCustomImage6631Deployed.deployed();
    console.log("CrypToadzCustomImage6631 deployed to " + CrypToadzCustomImage6631Deployed.address);

    const CrypToadzCustomImage703 = await ethers.getContractFactory("CrypToadzCustomImage703", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage703Deployed = await CrypToadzCustomImage703.deploy();
    await CrypToadzCustomImage703Deployed.deployed();
    console.log("CrypToadzCustomImage703 deployed to " + CrypToadzCustomImage703Deployed.address);

    const CrypToadzCustomImage916 = await ethers.getContractFactory("CrypToadzCustomImage916", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage916Deployed = await CrypToadzCustomImage916.deploy();
    await CrypToadzCustomImage916Deployed.deployed();
    console.log("CrypToadzCustomImage916 deployed to " + CrypToadzCustomImage916Deployed.address);

    const CrypToadzCustomImage936 = await ethers.getContractFactory("CrypToadzCustomImage936", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage936Deployed = await CrypToadzCustomImage936.deploy();
    await CrypToadzCustomImage936Deployed.deployed();
    console.log("CrypToadzCustomImage936 deployed to " + CrypToadzCustomImage936Deployed.address);

    const CrypToadzCustomImages = await ethers.getContractFactory("CrypToadzCustomImages");

    var CrypToadzCustomImagesDeployed = await CrypToadzCustomImages.deploy({
      _1005: CrypToadzCustomImage1005Deployed.address,
      _1793: CrypToadzCustomImage1793Deployed.address,
      _1812: CrypToadzCustomImage1812Deployed.address,
      _1975: CrypToadzCustomImage1975Deployed.address,
      _2232: CrypToadzCustomImage2232Deployed.address,
      _2327: CrypToadzCustomImage2327Deployed.address,
      _2489: CrypToadzCustomImage2489Deployed.address,
      _2521: CrypToadzCustomImage2521Deployed.address,
      _2709: CrypToadzCustomImage2709Deployed.address,
      _2825: CrypToadzCustomImage2825Deployed.address,
      _2846: CrypToadzCustomImage2846Deployed.address,
      _2959: CrypToadzCustomImage2959Deployed.address,
      _316: CrypToadzCustomImage316Deployed.address,
      _3196: CrypToadzCustomImage3196Deployed.address,
      _3309: CrypToadzCustomImage3309Deployed.address,
      _3382: CrypToadzCustomImage3382Deployed.address,
      _4096: CrypToadzCustomImage4096Deployed.address,
      _4152: CrypToadzCustomImage4152Deployed.address,
      _4238: CrypToadzCustomImage4238Deployed.address,
      _4580: CrypToadzCustomImage4580Deployed.address,
      _4714: CrypToadzCustomImage4714Deployed.address,
      _4773: CrypToadzCustomImage4773Deployed.address,
      _4896: CrypToadzCustomImage4896Deployed.address,
      _5128: CrypToadzCustomImage5128Deployed.address,
      _5471: CrypToadzCustomImage5471Deployed.address,
      _5902: CrypToadzCustomImage5902Deployed.address,
      _6214: CrypToadzCustomImage6214Deployed.address,
      _6382: CrypToadzCustomImage6382Deployed.address,
      _6491: CrypToadzCustomImage6491Deployed.address,
      _6572: CrypToadzCustomImage6572Deployed.address,
      _6631: CrypToadzCustomImage6631Deployed.address,
      _703: CrypToadzCustomImage703Deployed.address,
      _916: CrypToadzCustomImage916Deployed.address,
      _936: CrypToadzCustomImage936Deployed.address
    });
    await CrypToadzCustomImagesDeployed.deployed();
    console.log("CrypToadzCustomImages deployed to " + CrypToadzCustomImagesDeployed.address);
  }

  {
    const CrypToadzCustomImage1519 = await ethers.getContractFactory("CrypToadzCustomImage1519", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage1519Deployed = await CrypToadzCustomImage1519.deploy();
    await CrypToadzCustomImage1519Deployed.deployed();
    console.log("CrypToadzCustomImage1519 deployed to " + CrypToadzCustomImage1519Deployed.address);

    const CrypToadzCustomImage1943A = await ethers.getContractFactory("CrypToadzCustomImage1943A", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage1943ADeployed = await CrypToadzCustomImage1943A.deploy();
    await CrypToadzCustomImage1943ADeployed.deployed();
    console.log("CrypToadzCustomImage1943A deployed to " + CrypToadzCustomImage1943ADeployed.address);

    const CrypToadzCustomImage1943B = await ethers.getContractFactory("CrypToadzCustomImage1943B", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage1943BDeployed = await CrypToadzCustomImage1943B.deploy();
    await CrypToadzCustomImage1943BDeployed.deployed();
    console.log("CrypToadzCustomImage1943B deployed to " + CrypToadzCustomImage1943BDeployed.address);

    const CrypToadzCustomImage1943C = await ethers.getContractFactory("CrypToadzCustomImage1943C", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage1943CDeployed = await CrypToadzCustomImage1943C.deploy();
    await CrypToadzCustomImage1943CDeployed.deployed();
    console.log("CrypToadzCustomImage1943C deployed to " + CrypToadzCustomImage1943CDeployed.address);

    const CrypToadzCustomImage1943D = await ethers.getContractFactory("CrypToadzCustomImage1943D", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage1943DDeployed = await CrypToadzCustomImage1943D.deploy();
    await CrypToadzCustomImage1943DDeployed.deployed();
    console.log("CrypToadzCustomImage1943D deployed to " + CrypToadzCustomImage1943DDeployed.address);

    const CrypToadzCustomImage1943E = await ethers.getContractFactory("CrypToadzCustomImage1943E", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage1943EDeployed = await CrypToadzCustomImage1943E.deploy();
    await CrypToadzCustomImage1943EDeployed.deployed();
    console.log("CrypToadzCustomImage1943E deployed to " + CrypToadzCustomImage1943EDeployed.address);

    const CrypToadzCustomImage1943 = await ethers.getContractFactory("CrypToadzCustomImage1943");
    var CrypToadzCustomImage1943Deployed = await CrypToadzCustomImage1943.deploy(CrypToadzCustomImage1943ADeployed.address, CrypToadzCustomImage1943BDeployed.address, CrypToadzCustomImage1943CDeployed.address, CrypToadzCustomImage1943DDeployed.address, CrypToadzCustomImage1943EDeployed.address);
    await CrypToadzCustomImage1943Deployed.deployed();
    console.log("CrypToadzCustomImage1943 deployed to " + CrypToadzCustomImage1943Deployed.address);

    const CrypToadzCustomImage2208 = await ethers.getContractFactory("CrypToadzCustomImage2208", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage2208Deployed = await CrypToadzCustomImage2208.deploy();
    await CrypToadzCustomImage2208Deployed.deployed();
    console.log("CrypToadzCustomImage2208 deployed to " + CrypToadzCustomImage2208Deployed.address);

    const CrypToadzCustomImage318A = await ethers.getContractFactory("CrypToadzCustomImage318A", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage318ADeployed = await CrypToadzCustomImage318A.deploy();
    await CrypToadzCustomImage318ADeployed.deployed();
    console.log("CrypToadzCustomImage318A deployed to " + CrypToadzCustomImage318ADeployed.address);

    const CrypToadzCustomImage318B = await ethers.getContractFactory("CrypToadzCustomImage318B", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage318BDeployed = await CrypToadzCustomImage318B.deploy();
    await CrypToadzCustomImage318BDeployed.deployed();
    console.log("CrypToadzCustomImage318B deployed to " + CrypToadzCustomImage318BDeployed.address);

    const CrypToadzCustomImage318C = await ethers.getContractFactory("CrypToadzCustomImage318C", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage318CDeployed = await CrypToadzCustomImage318C.deploy();
    await CrypToadzCustomImage318CDeployed.deployed();
    console.log("CrypToadzCustomImage318C deployed to " + CrypToadzCustomImage318CDeployed.address);

    const CrypToadzCustomImage318D = await ethers.getContractFactory("CrypToadzCustomImage318D", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage318DDeployed = await CrypToadzCustomImage318D.deploy();
    await CrypToadzCustomImage318DDeployed.deployed();
    console.log("CrypToadzCustomImage318D deployed to " + CrypToadzCustomImage318DDeployed.address);

    const CrypToadzCustomImage318E = await ethers.getContractFactory("CrypToadzCustomImage318E", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage318EDeployed = await CrypToadzCustomImage318E.deploy();
    await CrypToadzCustomImage318EDeployed.deployed();
    console.log("CrypToadzCustomImage318E deployed to " + CrypToadzCustomImage318EDeployed.address);

    const CrypToadzCustomImage318F = await ethers.getContractFactory("CrypToadzCustomImage318F", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage318FDeployed = await CrypToadzCustomImage318F.deploy();
    await CrypToadzCustomImage318FDeployed.deployed();
    console.log("CrypToadzCustomImage318F deployed to " + CrypToadzCustomImage318FDeployed.address);

    const CrypToadzCustomImage318 = await ethers.getContractFactory("CrypToadzCustomImage318");
    var CrypToadzCustomImage318Deployed = await CrypToadzCustomImage318.deploy(CrypToadzCustomImage318ADeployed.address, CrypToadzCustomImage318BDeployed.address, CrypToadzCustomImage318CDeployed.address, CrypToadzCustomImage318DDeployed.address, CrypToadzCustomImage318EDeployed.address, CrypToadzCustomImage318FDeployed.address);
    await CrypToadzCustomImage318Deployed.deployed();
    console.log("CrypToadzCustomImage318 deployed to " + CrypToadzCustomImage318Deployed.address);

    const CrypToadzCustomImage3250 = await ethers.getContractFactory("CrypToadzCustomImage3250", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage3250Deployed = await CrypToadzCustomImage3250.deploy();
    await CrypToadzCustomImage3250Deployed.deployed();
    console.log("CrypToadzCustomImage3250 deployed to " + CrypToadzCustomImage3250Deployed.address);

    const CrypToadzCustomImage3661A = await ethers.getContractFactory("CrypToadzCustomImage3661A", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage3661ADeployed = await CrypToadzCustomImage3661A.deploy();
    await CrypToadzCustomImage3661ADeployed.deployed();
    console.log("CrypToadzCustomImage3661A deployed to " + CrypToadzCustomImage3661ADeployed.address);

    const CrypToadzCustomImage3661B = await ethers.getContractFactory("CrypToadzCustomImage3661B", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage3661BDeployed = await CrypToadzCustomImage3661B.deploy();
    await CrypToadzCustomImage3661BDeployed.deployed();
    console.log("CrypToadzCustomImage3661B deployed to " + CrypToadzCustomImage3661BDeployed.address);

    const CrypToadzCustomImage3661C = await ethers.getContractFactory("CrypToadzCustomImage3661C", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage3661CDeployed = await CrypToadzCustomImage3661C.deploy();
    await CrypToadzCustomImage3661CDeployed.deployed();
    console.log("CrypToadzCustomImage3661C deployed to " + CrypToadzCustomImage3661CDeployed.address);

    const CrypToadzCustomImage3661D = await ethers.getContractFactory("CrypToadzCustomImage3661D", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage3661DDeployed = await CrypToadzCustomImage3661D.deploy();
    await CrypToadzCustomImage3661DDeployed.deployed();
    console.log("CrypToadzCustomImage3661D deployed to " + CrypToadzCustomImage3661DDeployed.address);

    const CrypToadzCustomImage3661E = await ethers.getContractFactory("CrypToadzCustomImage3661E", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage3661EDeployed = await CrypToadzCustomImage3661E.deploy();
    await CrypToadzCustomImage3661EDeployed.deployed();
    console.log("CrypToadzCustomImage3661E deployed to " + CrypToadzCustomImage3661EDeployed.address);

    const CrypToadzCustomImage3661F = await ethers.getContractFactory("CrypToadzCustomImage3661F", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage3661FDeployed = await CrypToadzCustomImage3661F.deploy();
    await CrypToadzCustomImage3661FDeployed.deployed();
    console.log("CrypToadzCustomImage3661F deployed to " + CrypToadzCustomImage3661FDeployed.address);

    const CrypToadzCustomImage3661G = await ethers.getContractFactory("CrypToadzCustomImage3661G", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage3661GDeployed = await CrypToadzCustomImage3661G.deploy();
    await CrypToadzCustomImage3661GDeployed.deployed();
    console.log("CrypToadzCustomImage3661G deployed to " + CrypToadzCustomImage3661GDeployed.address);

    const CrypToadzCustomImage3661 = await ethers.getContractFactory("CrypToadzCustomImage3661");
    var CrypToadzCustomImage3661Deployed = await CrypToadzCustomImage3661.deploy(CrypToadzCustomImage3661ADeployed.address, CrypToadzCustomImage3661BDeployed.address, CrypToadzCustomImage3661CDeployed.address, CrypToadzCustomImage3661DDeployed.address, CrypToadzCustomImage3661EDeployed.address, CrypToadzCustomImage3661FDeployed.address, CrypToadzCustomImage3661GDeployed.address);
    await CrypToadzCustomImage3661Deployed.deployed();
    console.log("CrypToadzCustomImage3661 deployed to " + CrypToadzCustomImage3661Deployed.address);

    const CrypToadzCustomImage37A = await ethers.getContractFactory("CrypToadzCustomImage37A", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage37ADeployed = await CrypToadzCustomImage37A.deploy();
    await CrypToadzCustomImage37ADeployed.deployed();
    console.log("CrypToadzCustomImage37A deployed to " + CrypToadzCustomImage37ADeployed.address);

    const CrypToadzCustomImage37B = await ethers.getContractFactory("CrypToadzCustomImage37B", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage37BDeployed = await CrypToadzCustomImage37B.deploy();
    await CrypToadzCustomImage37BDeployed.deployed();
    console.log("CrypToadzCustomImage37B deployed to " + CrypToadzCustomImage37BDeployed.address);

    const CrypToadzCustomImage37C = await ethers.getContractFactory("CrypToadzCustomImage37C", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage37CDeployed = await CrypToadzCustomImage37C.deploy();
    await CrypToadzCustomImage37CDeployed.deployed();
    console.log("CrypToadzCustomImage37C deployed to " + CrypToadzCustomImage37CDeployed.address);

    const CrypToadzCustomImage37D = await ethers.getContractFactory("CrypToadzCustomImage37D", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage37DDeployed = await CrypToadzCustomImage37D.deploy();
    await CrypToadzCustomImage37DDeployed.deployed();
    console.log("CrypToadzCustomImage37D deployed to " + CrypToadzCustomImage37DDeployed.address);

    const CrypToadzCustomImage37E = await ethers.getContractFactory("CrypToadzCustomImage37E", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage37EDeployed = await CrypToadzCustomImage37E.deploy();
    await CrypToadzCustomImage37EDeployed.deployed();
    console.log("CrypToadzCustomImage37E deployed to " + CrypToadzCustomImage37EDeployed.address);

    const CrypToadzCustomImage37F = await ethers.getContractFactory("CrypToadzCustomImage37F", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage37FDeployed = await CrypToadzCustomImage37F.deploy();
    await CrypToadzCustomImage37FDeployed.deployed();
    console.log("CrypToadzCustomImage37F deployed to " + CrypToadzCustomImage37FDeployed.address);

    const CrypToadzCustomImage37 = await ethers.getContractFactory("CrypToadzCustomImage37");
    var CrypToadzCustomImage37Deployed = await CrypToadzCustomImage37.deploy(CrypToadzCustomImage37ADeployed.address, CrypToadzCustomImage37BDeployed.address, CrypToadzCustomImage37CDeployed.address, CrypToadzCustomImage37DDeployed.address, CrypToadzCustomImage37EDeployed.address, CrypToadzCustomImage37FDeployed.address);
    await CrypToadzCustomImage37Deployed.deployed();
    console.log("CrypToadzCustomImage37 deployed to " + CrypToadzCustomImage37Deployed.address);

    const CrypToadzCustomImage4035A = await ethers.getContractFactory("CrypToadzCustomImage4035A", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4035ADeployed = await CrypToadzCustomImage4035A.deploy();
    await CrypToadzCustomImage4035ADeployed.deployed();
    console.log("CrypToadzCustomImage4035A deployed to " + CrypToadzCustomImage4035ADeployed.address);

    const CrypToadzCustomImage4035B = await ethers.getContractFactory("CrypToadzCustomImage4035B", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4035BDeployed = await CrypToadzCustomImage4035B.deploy();
    await CrypToadzCustomImage4035BDeployed.deployed();
    console.log("CrypToadzCustomImage4035B deployed to " + CrypToadzCustomImage4035BDeployed.address);

    const CrypToadzCustomImage4035C = await ethers.getContractFactory("CrypToadzCustomImage4035C", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4035CDeployed = await CrypToadzCustomImage4035C.deploy();
    await CrypToadzCustomImage4035CDeployed.deployed();
    console.log("CrypToadzCustomImage4035C deployed to " + CrypToadzCustomImage4035CDeployed.address);

    const CrypToadzCustomImage4035D = await ethers.getContractFactory("CrypToadzCustomImage4035D", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4035DDeployed = await CrypToadzCustomImage4035D.deploy();
    await CrypToadzCustomImage4035DDeployed.deployed();
    console.log("CrypToadzCustomImage4035D deployed to " + CrypToadzCustomImage4035DDeployed.address);

    const CrypToadzCustomImage4035E = await ethers.getContractFactory("CrypToadzCustomImage4035E", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4035EDeployed = await CrypToadzCustomImage4035E.deploy();
    await CrypToadzCustomImage4035EDeployed.deployed();
    console.log("CrypToadzCustomImage4035E deployed to " + CrypToadzCustomImage4035EDeployed.address);

    const CrypToadzCustomImage4035F = await ethers.getContractFactory("CrypToadzCustomImage4035F", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4035FDeployed = await CrypToadzCustomImage4035F.deploy();
    await CrypToadzCustomImage4035FDeployed.deployed();
    console.log("CrypToadzCustomImage4035F deployed to " + CrypToadzCustomImage4035FDeployed.address);

    const CrypToadzCustomImage4035 = await ethers.getContractFactory("CrypToadzCustomImage4035");
    var CrypToadzCustomImage4035Deployed = await CrypToadzCustomImage4035.deploy(CrypToadzCustomImage4035ADeployed.address, CrypToadzCustomImage4035BDeployed.address, CrypToadzCustomImage4035CDeployed.address, CrypToadzCustomImage4035DDeployed.address, CrypToadzCustomImage4035EDeployed.address, CrypToadzCustomImage4035FDeployed.address);
    await CrypToadzCustomImage4035Deployed.deployed();
    console.log("CrypToadzCustomImage4035 deployed to " + CrypToadzCustomImage4035Deployed.address);

    const CrypToadzCustomImage43000000 = await ethers.getContractFactory("CrypToadzCustomImage43000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage43000000Deployed = await CrypToadzCustomImage43000000.deploy();
    await CrypToadzCustomImage43000000Deployed.deployed();
    console.log("CrypToadzCustomImage43000000 deployed to " + CrypToadzCustomImage43000000Deployed.address);

    const CrypToadzCustomImage466A = await ethers.getContractFactory("CrypToadzCustomImage466A", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage466ADeployed = await CrypToadzCustomImage466A.deploy();
    await CrypToadzCustomImage466ADeployed.deployed();
    console.log("CrypToadzCustomImage466A deployed to " + CrypToadzCustomImage466ADeployed.address);

    const CrypToadzCustomImage466B = await ethers.getContractFactory("CrypToadzCustomImage466B", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage466BDeployed = await CrypToadzCustomImage466B.deploy();
    await CrypToadzCustomImage466BDeployed.deployed();
    console.log("CrypToadzCustomImage466B deployed to " + CrypToadzCustomImage466BDeployed.address);

    const CrypToadzCustomImage466C = await ethers.getContractFactory("CrypToadzCustomImage466C", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage466CDeployed = await CrypToadzCustomImage466C.deploy();
    await CrypToadzCustomImage466CDeployed.deployed();
    console.log("CrypToadzCustomImage466C deployed to " + CrypToadzCustomImage466CDeployed.address);

    const CrypToadzCustomImage466D = await ethers.getContractFactory("CrypToadzCustomImage466D", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage466DDeployed = await CrypToadzCustomImage466D.deploy();
    await CrypToadzCustomImage466DDeployed.deployed();
    console.log("CrypToadzCustomImage466D deployed to " + CrypToadzCustomImage466DDeployed.address);

    const CrypToadzCustomImage466E = await ethers.getContractFactory("CrypToadzCustomImage466E", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage466EDeployed = await CrypToadzCustomImage466E.deploy();
    await CrypToadzCustomImage466EDeployed.deployed();
    console.log("CrypToadzCustomImage466E deployed to " + CrypToadzCustomImage466EDeployed.address);

    const CrypToadzCustomImage466F = await ethers.getContractFactory("CrypToadzCustomImage466F", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage466FDeployed = await CrypToadzCustomImage466F.deploy();
    await CrypToadzCustomImage466FDeployed.deployed();
    console.log("CrypToadzCustomImage466F deployed to " + CrypToadzCustomImage466FDeployed.address);

    const CrypToadzCustomImage466 = await ethers.getContractFactory("CrypToadzCustomImage466");
    var CrypToadzCustomImage466Deployed = await CrypToadzCustomImage466.deploy(CrypToadzCustomImage466ADeployed.address, CrypToadzCustomImage466BDeployed.address, CrypToadzCustomImage466CDeployed.address, CrypToadzCustomImage466DDeployed.address, CrypToadzCustomImage466EDeployed.address, CrypToadzCustomImage466FDeployed.address);
    await CrypToadzCustomImage466Deployed.deployed();
    console.log("CrypToadzCustomImage466 deployed to " + CrypToadzCustomImage466Deployed.address);

    const CrypToadzCustomImage48000000 = await ethers.getContractFactory("CrypToadzCustomImage48000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage48000000Deployed = await CrypToadzCustomImage48000000.deploy();
    await CrypToadzCustomImage48000000Deployed.deployed();
    console.log("CrypToadzCustomImage48000000 deployed to " + CrypToadzCustomImage48000000Deployed.address);

    const CrypToadzCustomImage4911A = await ethers.getContractFactory("CrypToadzCustomImage4911A", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4911ADeployed = await CrypToadzCustomImage4911A.deploy();
    await CrypToadzCustomImage4911ADeployed.deployed();
    console.log("CrypToadzCustomImage4911A deployed to " + CrypToadzCustomImage4911ADeployed.address);

    const CrypToadzCustomImage4911B = await ethers.getContractFactory("CrypToadzCustomImage4911B", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4911BDeployed = await CrypToadzCustomImage4911B.deploy();
    await CrypToadzCustomImage4911BDeployed.deployed();
    console.log("CrypToadzCustomImage4911B deployed to " + CrypToadzCustomImage4911BDeployed.address);

    const CrypToadzCustomImage4911C = await ethers.getContractFactory("CrypToadzCustomImage4911C", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4911CDeployed = await CrypToadzCustomImage4911C.deploy();
    await CrypToadzCustomImage4911CDeployed.deployed();
    console.log("CrypToadzCustomImage4911C deployed to " + CrypToadzCustomImage4911CDeployed.address);

    const CrypToadzCustomImage4911D = await ethers.getContractFactory("CrypToadzCustomImage4911D", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4911DDeployed = await CrypToadzCustomImage4911D.deploy();
    await CrypToadzCustomImage4911DDeployed.deployed();
    console.log("CrypToadzCustomImage4911D deployed to " + CrypToadzCustomImage4911DDeployed.address);

    const CrypToadzCustomImage4911E = await ethers.getContractFactory("CrypToadzCustomImage4911E", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4911EDeployed = await CrypToadzCustomImage4911E.deploy();
    await CrypToadzCustomImage4911EDeployed.deployed();
    console.log("CrypToadzCustomImage4911E deployed to " + CrypToadzCustomImage4911EDeployed.address);

    const CrypToadzCustomImage4911F = await ethers.getContractFactory("CrypToadzCustomImage4911F", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4911FDeployed = await CrypToadzCustomImage4911F.deploy();
    await CrypToadzCustomImage4911FDeployed.deployed();
    console.log("CrypToadzCustomImage4911F deployed to " + CrypToadzCustomImage4911FDeployed.address);

    const CrypToadzCustomImage4911G = await ethers.getContractFactory("CrypToadzCustomImage4911G", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage4911GDeployed = await CrypToadzCustomImage4911G.deploy();
    await CrypToadzCustomImage4911GDeployed.deployed();
    console.log("CrypToadzCustomImage4911G deployed to " + CrypToadzCustomImage4911GDeployed.address);

    const CrypToadzCustomImage4911 = await ethers.getContractFactory("CrypToadzCustomImage4911");
    var CrypToadzCustomImage4911Deployed = await CrypToadzCustomImage4911.deploy(CrypToadzCustomImage4911ADeployed.address, CrypToadzCustomImage4911BDeployed.address, CrypToadzCustomImage4911CDeployed.address, CrypToadzCustomImage4911DDeployed.address, CrypToadzCustomImage4911EDeployed.address, CrypToadzCustomImage4911FDeployed.address, CrypToadzCustomImage4911GDeployed.address);
    await CrypToadzCustomImage4911Deployed.deployed();
    console.log("CrypToadzCustomImage4911 deployed to " + CrypToadzCustomImage4911Deployed.address);

    const CrypToadzCustomImage5086 = await ethers.getContractFactory("CrypToadzCustomImage5086", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage5086Deployed = await CrypToadzCustomImage5086.deploy();
    await CrypToadzCustomImage5086Deployed.deployed();
    console.log("CrypToadzCustomImage5086 deployed to " + CrypToadzCustomImage5086Deployed.address);

    const CrypToadzCustomImage5844 = await ethers.getContractFactory("CrypToadzCustomImage5844", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage5844Deployed = await CrypToadzCustomImage5844.deploy();
    await CrypToadzCustomImage5844Deployed.deployed();
    console.log("CrypToadzCustomImage5844 deployed to " + CrypToadzCustomImage5844Deployed.address);

    const CrypToadzCustomImage6131 = await ethers.getContractFactory("CrypToadzCustomImage6131", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
    var CrypToadzCustomImage6131Deployed = await CrypToadzCustomImage6131.deploy();
    await CrypToadzCustomImage6131Deployed.deployed();
    console.log("CrypToadzCustomImage6131 deployed to " + CrypToadzCustomImage6131Deployed.address);

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
    console.log("CrypToadzCustomAnimations deployed to " + CrypToadzCustomAnimationsDeployed.address);
  }  

  const CrypToadz = await ethers.getContractFactory("CrypToadz", {
    libraries: {
      "GIFEncoder": GIFEncoderDeployed.address
    }
  });
  var CrypToadzDeployed = await CrypToadz.deploy(
    CrypToadzStringsDeployed.address,
    CrypToadzBuilderDeployed.address,
    CrypToadzMetadataDeployed.address,
    CrypToadzCustomImagesDeployed.address,
    CrypToadzCustomAnimationsDeployed.address
  );

  await CrypToadzDeployed.deployed();
  console.log("CrypToadz deployed to " + CrypToadzDeployed.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
