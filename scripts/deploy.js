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

  const CrypToadzAnimations = await ethers.getContractFactory("CrypToadzAnimations", {
    libraries: {
      PixelRenderer: PixelRendererDeployed.address
    }
  });
  var CrypToadzAnimationsDeployed = await CrypToadzAnimations.deploy();
  await CrypToadzAnimationsDeployed.deployed();
  console.log("CrypToadzAnimations deployed to " + CrypToadzAnimationsDeployed.address);

  {
    const CrypToadzCustomImage1005 = await ethers.getContractFactory("CrypToadzCustomImage1005");
    var CrypToadzCustomImage1005Deployed = await CrypToadzCustomImage1005.deploy();
    await CrypToadzCustomImage1005Deployed.deployed();

    const CrypToadzCustomImage1793 = await ethers.getContractFactory("CrypToadzCustomImage1793");
    var CrypToadzCustomImage1793Deployed = await CrypToadzCustomImage1793.deploy();
    await CrypToadzCustomImage1793Deployed.deployed();

    const CrypToadzCustomImage1812 = await ethers.getContractFactory("CrypToadzCustomImage1812");
    var CrypToadzCustomImage1812Deployed = await CrypToadzCustomImage1812.deploy();
    await CrypToadzCustomImage1812Deployed.deployed();

    const CrypToadzCustomImage1975 = await ethers.getContractFactory("CrypToadzCustomImage1975");
    var CrypToadzCustomImage1975Deployed = await CrypToadzCustomImage1975.deploy();
    await CrypToadzCustomImage1975Deployed.deployed();

    const CrypToadzCustomImage2232 = await ethers.getContractFactory("CrypToadzCustomImage2232");
    var CrypToadzCustomImage2232Deployed = await CrypToadzCustomImage2232.deploy();
    await CrypToadzCustomImage2232Deployed.deployed();

    const CrypToadzCustomImage2327 = await ethers.getContractFactory("CrypToadzCustomImage2327");
    var CrypToadzCustomImage2327Deployed = await CrypToadzCustomImage2327.deploy();
    await CrypToadzCustomImage2327Deployed.deployed();

    const CrypToadzCustomImage2489 = await ethers.getContractFactory("CrypToadzCustomImage2489");
    var CrypToadzCustomImage2489Deployed = await CrypToadzCustomImage2489.deploy();
    await CrypToadzCustomImage2489Deployed.deployed();

    const CrypToadzCustomImage2521 = await ethers.getContractFactory("CrypToadzCustomImage2521");
    var CrypToadzCustomImage2521Deployed = await CrypToadzCustomImage2521.deploy();
    await CrypToadzCustomImage2521Deployed.deployed();

    const CrypToadzCustomImage2709 = await ethers.getContractFactory("CrypToadzCustomImage2709");
    var CrypToadzCustomImage2709Deployed = await CrypToadzCustomImage2709.deploy();
    await CrypToadzCustomImage2709Deployed.deployed();

    const CrypToadzCustomImage2825 = await ethers.getContractFactory("CrypToadzCustomImage2825");
    var CrypToadzCustomImage2825Deployed = await CrypToadzCustomImage2825.deploy();
    await CrypToadzCustomImage2825Deployed.deployed();

    const CrypToadzCustomImage2846 = await ethers.getContractFactory("CrypToadzCustomImage2846");
    var CrypToadzCustomImage2846Deployed = await CrypToadzCustomImage2846.deploy();
    await CrypToadzCustomImage2846Deployed.deployed();

    const CrypToadzCustomImage2959 = await ethers.getContractFactory("CrypToadzCustomImage2959");
    var CrypToadzCustomImage2959Deployed = await CrypToadzCustomImage2959.deploy();
    await CrypToadzCustomImage2959Deployed.deployed();

    const CrypToadzCustomImage316 = await ethers.getContractFactory("CrypToadzCustomImage316");
    var CrypToadzCustomImage316Deployed = await CrypToadzCustomImage316.deploy();
    await CrypToadzCustomImage316Deployed.deployed();

    const CrypToadzCustomImage3196 = await ethers.getContractFactory("CrypToadzCustomImage3196");
    var CrypToadzCustomImage3196Deployed = await CrypToadzCustomImage3196.deploy();
    await CrypToadzCustomImage3196Deployed.deployed();

    const CrypToadzCustomImage3309 = await ethers.getContractFactory("CrypToadzCustomImage3309");
    var CrypToadzCustomImage3309Deployed = await CrypToadzCustomImage3309.deploy();
    await CrypToadzCustomImage3309Deployed.deployed();

    const CrypToadzCustomImage3382 = await ethers.getContractFactory("CrypToadzCustomImage3382");
    var CrypToadzCustomImage3382Deployed = await CrypToadzCustomImage3382.deploy();
    await CrypToadzCustomImage3382Deployed.deployed();

    const CrypToadzCustomImage4096 = await ethers.getContractFactory("CrypToadzCustomImage4096");
    var CrypToadzCustomImage4096Deployed = await CrypToadzCustomImage4096.deploy();
    await CrypToadzCustomImage4096Deployed.deployed();

    const CrypToadzCustomImage4152 = await ethers.getContractFactory("CrypToadzCustomImage4152");
    var CrypToadzCustomImage4152Deployed = await CrypToadzCustomImage4152.deploy();
    await CrypToadzCustomImage4152Deployed.deployed();

    const CrypToadzCustomImage4238 = await ethers.getContractFactory("CrypToadzCustomImage4238");
    var CrypToadzCustomImage4238Deployed = await CrypToadzCustomImage4238.deploy();
    await CrypToadzCustomImage4238Deployed.deployed();

    const CrypToadzCustomImage4580 = await ethers.getContractFactory("CrypToadzCustomImage4580");
    var CrypToadzCustomImage4580Deployed = await CrypToadzCustomImage4580.deploy();
    await CrypToadzCustomImage4580Deployed.deployed();

    const CrypToadzCustomImage4714 = await ethers.getContractFactory("CrypToadzCustomImage4714");
    var CrypToadzCustomImage4714Deployed = await CrypToadzCustomImage4714.deploy();
    await CrypToadzCustomImage4714Deployed.deployed();

    const CrypToadzCustomImage4773 = await ethers.getContractFactory("CrypToadzCustomImage4773");
    var CrypToadzCustomImage4773Deployed = await CrypToadzCustomImage4773.deploy();
    await CrypToadzCustomImage4773Deployed.deployed();

    const CrypToadzCustomImage4896 = await ethers.getContractFactory("CrypToadzCustomImage4896");
    var CrypToadzCustomImage4896Deployed = await CrypToadzCustomImage4896.deploy();
    await CrypToadzCustomImage4896Deployed.deployed();

    const CrypToadzCustomImage5128 = await ethers.getContractFactory("CrypToadzCustomImage5128");
    var CrypToadzCustomImage5128Deployed = await CrypToadzCustomImage5128.deploy();
    await CrypToadzCustomImage5128Deployed.deployed();

    const CrypToadzCustomImage5471 = await ethers.getContractFactory("CrypToadzCustomImage5471");
    var CrypToadzCustomImage5471Deployed = await CrypToadzCustomImage5471.deploy();
    await CrypToadzCustomImage5471Deployed.deployed();

    const CrypToadzCustomImage5902 = await ethers.getContractFactory("CrypToadzCustomImage5902");
    var CrypToadzCustomImage5902Deployed = await CrypToadzCustomImage5902.deploy();
    await CrypToadzCustomImage5902Deployed.deployed();

    const CrypToadzCustomImage6214 = await ethers.getContractFactory("CrypToadzCustomImage6214");
    var CrypToadzCustomImage6214Deployed = await CrypToadzCustomImage6214.deploy();
    await CrypToadzCustomImage6214Deployed.deployed();

    const CrypToadzCustomImage6382 = await ethers.getContractFactory("CrypToadzCustomImage6382");
    var CrypToadzCustomImage6382Deployed = await CrypToadzCustomImage6382.deploy();
    await CrypToadzCustomImage6382Deployed.deployed();

    const CrypToadzCustomImage6491 = await ethers.getContractFactory("CrypToadzCustomImage6491");
    var CrypToadzCustomImage6491Deployed = await CrypToadzCustomImage6491.deploy();
    await CrypToadzCustomImage6491Deployed.deployed();

    const CrypToadzCustomImage6572 = await ethers.getContractFactory("CrypToadzCustomImage6572");
    var CrypToadzCustomImage6572Deployed = await CrypToadzCustomImage6572.deploy();
    await CrypToadzCustomImage6572Deployed.deployed();

    const CrypToadzCustomImage6631 = await ethers.getContractFactory("CrypToadzCustomImage6631");
    var CrypToadzCustomImage6631Deployed = await CrypToadzCustomImage6631.deploy();
    await CrypToadzCustomImage6631Deployed.deployed();

    const CrypToadzCustomImage703 = await ethers.getContractFactory("CrypToadzCustomImage703");
    var CrypToadzCustomImage703Deployed = await CrypToadzCustomImage703.deploy();
    await CrypToadzCustomImage703Deployed.deployed();

    const CrypToadzCustomImage916 = await ethers.getContractFactory("CrypToadzCustomImage916");
    var CrypToadzCustomImage916Deployed = await CrypToadzCustomImage916.deploy();
    await CrypToadzCustomImage916Deployed.deployed();

    const CrypToadzCustomImage936 = await ethers.getContractFactory("CrypToadzCustomImage936");
    var CrypToadzCustomImage936Deployed = await CrypToadzCustomImage936.deploy();
    await CrypToadzCustomImage936Deployed.deployed();

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
      _936: CrypToadzCustomImage9365Deployed.address
    });
    await CrypToadzCustomImagesDeployed.deployed();
  }

  const CrypToadzCustomAnimations = await ethers.getContractFactory("CrypToadzCustomAnimations");
  var CrypToadzCustomAnimationsDeployed = await CrypToadzCustomAnimations.deploy();
  await CrypToadzCustomAnimationsDeployed.deployed();
  console.log("CrypToadzCustomAnimations deployed to " + CrypToadzCustomAnimationsDeployed.address);

  const CrypToadz = await ethers.getContractFactory("CrypToadz", {
    libraries: {
      "GIFEncoder": GIFEncoderDeployed.address
    }
  });
  var CrypToadzDeployed = await CrypToadz.deploy(
    CrypToadzStringsDeployed.address,
    CrypToadzBuilderDeployed.address,
    CrypToadzMetadataDeployed.address,
    CrypToadzAnimationsDeployed.address,
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
