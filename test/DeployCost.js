const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DeployCost", function () {
  it("deploys all contracts", async function () {
    const GIFEncoder = await ethers.getContractFactory("GIFEncoder");
    var GIFEncoderDeployed = await GIFEncoder.deploy();
    await GIFEncoderDeployed.deployed();

    const PixelRenderer = await ethers.getContractFactory("PixelRenderer");
    var PixelRendererDeployed = await PixelRenderer.deploy();
    await PixelRendererDeployed.deployed();

    const CrypToadzStrings = await ethers.getContractFactory("CrypToadzStrings");
    var CrypToadzStringsDeployed = await CrypToadzStrings.deploy();
    await CrypToadzStringsDeployed.deployed();

    const CrypToadzBuilderAny = await ethers.getContractFactory("CrypToadzBuilderAny");
    var CrypToadzBuilderAnyDeployed = await CrypToadzBuilderAny.deploy();
    await CrypToadzBuilderAnyDeployed.deployed();

    const CrypToadzBuilderShort = await ethers.getContractFactory("CrypToadzBuilderShort");
    var CrypToadzBuilderShortDeployed = await CrypToadzBuilderShort.deploy();
    await CrypToadzBuilderShortDeployed.deployed();

    const CrypToadzBuilderTall = await ethers.getContractFactory("CrypToadzBuilderTall");
    var CrypToadzBuilderTallDeployed = await CrypToadzBuilderTall.deploy();
    await CrypToadzBuilderTallDeployed.deployed();

    const CrypToadzBuilder = await ethers.getContractFactory("CrypToadzBuilder", {
      libraries: {
        PixelRenderer: PixelRendererDeployed.address
      }
    });
    var CrypToadzBuilderDeployed = await CrypToadzBuilder.deploy(CrypToadzBuilderAnyDeployed.address, CrypToadzBuilderShortDeployed.address, CrypToadzBuilderTallDeployed.address);
    await CrypToadzBuilderDeployed.deployed();

    const CrypToadzMetadata = await ethers.getContractFactory("CrypToadzMetadata");
    var CrypToadzMetadataDeployed = await CrypToadzMetadata.deploy();
    await CrypToadzMetadataDeployed.deployed();

    {
      const CrypToadzCustomImageBank = await ethers.getContractFactory("CrypToadzCustomImageBank");
      var CrypToadzCustomImageBankDeployed = await CrypToadzCustomImageBank.deploy();
      await CrypToadzCustomImageBankDeployed.deployed();

      {
        const CrypToadzCustomImage1005 = await ethers.getContractFactory("CrypToadzCustomImage1005", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
        var CrypToadzCustomImage1005Deployed = await CrypToadzCustomImage1005.deploy();
        await CrypToadzCustomImage1005Deployed.deployed();

        const CrypToadzCustomImage1793 = await ethers.getContractFactory("CrypToadzCustomImage1793", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
        var CrypToadzCustomImage1793Deployed = await CrypToadzCustomImage1793.deploy();
        await CrypToadzCustomImage1793Deployed.deployed();

        const CrypToadzCustomImage1812 = await ethers.getContractFactory("CrypToadzCustomImage1812", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
        var CrypToadzCustomImage1812Deployed = await CrypToadzCustomImage1812.deploy();
        await CrypToadzCustomImage1812Deployed.deployed();

        const CrypToadzCustomImage1975 = await ethers.getContractFactory("CrypToadzCustomImage1975", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
        var CrypToadzCustomImage1975Deployed = await CrypToadzCustomImage1975.deploy();
        await CrypToadzCustomImage1975Deployed.deployed();

        const CrypToadzCustomImage2232 = await ethers.getContractFactory("CrypToadzCustomImage2232", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
        var CrypToadzCustomImage2232Deployed = await CrypToadzCustomImage2232.deploy();
        await CrypToadzCustomImage2232Deployed.deployed();

        const CrypToadzCustomImage2327 = await ethers.getContractFactory("CrypToadzCustomImage2327", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
        var CrypToadzCustomImage2327Deployed = await CrypToadzCustomImage2327.deploy();
        await CrypToadzCustomImage2327Deployed.deployed();

        const CrypToadzCustomImage2489 = await ethers.getContractFactory("CrypToadzCustomImage2489", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
        var CrypToadzCustomImage2489Deployed = await CrypToadzCustomImage2489.deploy();
        await CrypToadzCustomImage2489Deployed.deployed();

        const CrypToadzCustomImage2521 = await ethers.getContractFactory("CrypToadzCustomImage2521", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
        var CrypToadzCustomImage2521Deployed = await CrypToadzCustomImage2521.deploy();
        await CrypToadzCustomImage2521Deployed.deployed();

        const CrypToadzCustomImage2709 = await ethers.getContractFactory("CrypToadzCustomImage2709", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
        var CrypToadzCustomImage2709Deployed = await CrypToadzCustomImage2709.deploy();
        await CrypToadzCustomImage2709Deployed.deployed();

        const CrypToadzCustomImage2825 = await ethers.getContractFactory("CrypToadzCustomImage2825", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
        var CrypToadzCustomImage2825Deployed = await CrypToadzCustomImage2825.deploy();
        await CrypToadzCustomImage2825Deployed.deployed();

        const CrypToadzCustomImage2846 = await ethers.getContractFactory("CrypToadzCustomImage2846", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
        var CrypToadzCustomImage2846Deployed = await CrypToadzCustomImage2846.deploy();
        await CrypToadzCustomImage2846Deployed.deployed();

        const CrypToadzCustomImage2959 = await ethers.getContractFactory("CrypToadzCustomImage2959", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
        var CrypToadzCustomImage2959Deployed = await CrypToadzCustomImage2959.deploy();
        await CrypToadzCustomImage2959Deployed.deployed();

        const CrypToadzCustomImage316 = await ethers.getContractFactory("CrypToadzCustomImage316", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
        var CrypToadzCustomImage316Deployed = await CrypToadzCustomImage316.deploy();
        await CrypToadzCustomImage316Deployed.deployed();

        const CrypToadzCustomImage3196 = await ethers.getContractFactory("CrypToadzCustomImage3196", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
        var CrypToadzCustomImage3196Deployed = await CrypToadzCustomImage3196.deploy();
        await CrypToadzCustomImage3196Deployed.deployed();

        const CrypToadzCustomImage3309A = await ethers.getContractFactory("CrypToadzCustomImage3309A", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
        var CrypToadzCustomImage3309ADeployed = await CrypToadzCustomImage3309A.deploy();
        await CrypToadzCustomImage3309ADeployed.deployed();

        const CrypToadzCustomImage3309B = await ethers.getContractFactory("CrypToadzCustomImage3309B", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
        var CrypToadzCustomImage3309BDeployed = await CrypToadzCustomImage3309B.deploy();
        await CrypToadzCustomImage3309BDeployed.deployed();

        const CrypToadzCustomImage3309 = await ethers.getContractFactory("CrypToadzCustomImage3309");
        var CrypToadzCustomImage3309Deployed = await CrypToadzCustomImage3309.deploy(CrypToadzCustomImage3309ADeployed.address, CrypToadzCustomImage3309BDeployed.address);
        await CrypToadzCustomImage3309Deployed.deployed();

        const CrypToadzCustomImage3382 = await ethers.getContractFactory("CrypToadzCustomImage3382", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
        var CrypToadzCustomImage3382Deployed = await CrypToadzCustomImage3382.deploy();
        await CrypToadzCustomImage3382Deployed.deployed();

        const CrypToadzCustomImage4096 = await ethers.getContractFactory("CrypToadzCustomImage4096", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
        var CrypToadzCustomImage4096Deployed = await CrypToadzCustomImage4096.deploy();
        await CrypToadzCustomImage4096Deployed.deployed();

        const CrypToadzCustomImage4152 = await ethers.getContractFactory("CrypToadzCustomImage4152", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
        var CrypToadzCustomImage4152Deployed = await CrypToadzCustomImage4152.deploy();
        await CrypToadzCustomImage4152Deployed.deployed();

        const CrypToadzCustomImage4238 = await ethers.getContractFactory("CrypToadzCustomImage4238", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
        var CrypToadzCustomImage4238Deployed = await CrypToadzCustomImage4238.deploy();
        await CrypToadzCustomImage4238Deployed.deployed();

        const CrypToadzCustomImage4580 = await ethers.getContractFactory("CrypToadzCustomImage4580", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
        var CrypToadzCustomImage4580Deployed = await CrypToadzCustomImage4580.deploy();
        await CrypToadzCustomImage4580Deployed.deployed();

        const CrypToadzCustomImage4714 = await ethers.getContractFactory("CrypToadzCustomImage4714", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
        var CrypToadzCustomImage4714Deployed = await CrypToadzCustomImage4714.deploy();
        await CrypToadzCustomImage4714Deployed.deployed();

        const CrypToadzCustomImage4773 = await ethers.getContractFactory("CrypToadzCustomImage4773", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
        var CrypToadzCustomImage4773Deployed = await CrypToadzCustomImage4773.deploy();
        await CrypToadzCustomImage4773Deployed.deployed();

        const CrypToadzCustomImage4896A = await ethers.getContractFactory("CrypToadzCustomImage4896A", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
        var CrypToadzCustomImage4896ADeployed = await CrypToadzCustomImage4896A.deploy();
        await CrypToadzCustomImage4896ADeployed.deployed();

        const CrypToadzCustomImage4896B = await ethers.getContractFactory("CrypToadzCustomImage4896B", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
        var CrypToadzCustomImage4896BDeployed = await CrypToadzCustomImage4896B.deploy();
        await CrypToadzCustomImage4896BDeployed.deployed();

        const CrypToadzCustomImage4896 = await ethers.getContractFactory("CrypToadzCustomImage4896");
        var CrypToadzCustomImage4896Deployed = await CrypToadzCustomImage4896.deploy(CrypToadzCustomImage4896ADeployed.address, CrypToadzCustomImage4896BDeployed.address);
        await CrypToadzCustomImage4896Deployed.deployed();

        const CrypToadzCustomImage5128 = await ethers.getContractFactory("CrypToadzCustomImage5128", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
        var CrypToadzCustomImage5128Deployed = await CrypToadzCustomImage5128.deploy();
        await CrypToadzCustomImage5128Deployed.deployed();

        const CrypToadzCustomImage5471A = await ethers.getContractFactory("CrypToadzCustomImage5471A", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
        var CrypToadzCustomImage5471ADeployed = await CrypToadzCustomImage5471A.deploy();
        await CrypToadzCustomImage5471ADeployed.deployed();

        const CrypToadzCustomImage5471B = await ethers.getContractFactory("CrypToadzCustomImage5471B", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
        var CrypToadzCustomImage5471BDeployed = await CrypToadzCustomImage5471B.deploy();
        await CrypToadzCustomImage5471BDeployed.deployed();

        const CrypToadzCustomImage5471 = await ethers.getContractFactory("CrypToadzCustomImage5471");
        var CrypToadzCustomImage5471Deployed = await CrypToadzCustomImage5471.deploy(CrypToadzCustomImage5471ADeployed.address, CrypToadzCustomImage5471BDeployed.address);
        await CrypToadzCustomImage5471Deployed.deployed();

        const CrypToadzCustomImage5902 = await ethers.getContractFactory("CrypToadzCustomImage5902", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
        var CrypToadzCustomImage5902Deployed = await CrypToadzCustomImage5902.deploy();
        await CrypToadzCustomImage5902Deployed.deployed();

        const CrypToadzCustomImage6214 = await ethers.getContractFactory("CrypToadzCustomImage6214", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
        var CrypToadzCustomImage6214Deployed = await CrypToadzCustomImage6214.deploy();
        await CrypToadzCustomImage6214Deployed.deployed();

        const CrypToadzCustomImage6382 = await ethers.getContractFactory("CrypToadzCustomImage6382", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
        var CrypToadzCustomImage6382Deployed = await CrypToadzCustomImage6382.deploy();
        await CrypToadzCustomImage6382Deployed.deployed();

        const CrypToadzCustomImage6491 = await ethers.getContractFactory("CrypToadzCustomImage6491", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
        var CrypToadzCustomImage6491Deployed = await CrypToadzCustomImage6491.deploy();
        await CrypToadzCustomImage6491Deployed.deployed();

        const CrypToadzCustomImage6572 = await ethers.getContractFactory("CrypToadzCustomImage6572", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
        var CrypToadzCustomImage6572Deployed = await CrypToadzCustomImage6572.deploy();
        await CrypToadzCustomImage6572Deployed.deployed();

        const CrypToadzCustomImage6631 = await ethers.getContractFactory("CrypToadzCustomImage6631", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
        var CrypToadzCustomImage6631Deployed = await CrypToadzCustomImage6631.deploy();
        await CrypToadzCustomImage6631Deployed.deployed();

        const CrypToadzCustomImage703 = await ethers.getContractFactory("CrypToadzCustomImage703", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
        var CrypToadzCustomImage703Deployed = await CrypToadzCustomImage703.deploy();
        await CrypToadzCustomImage703Deployed.deployed();

        const CrypToadzCustomImage916 = await ethers.getContractFactory("CrypToadzCustomImage916", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
        var CrypToadzCustomImage916Deployed = await CrypToadzCustomImage916.deploy();
        await CrypToadzCustomImage916Deployed.deployed();

        const CrypToadzCustomImage936 = await ethers.getContractFactory("CrypToadzCustomImage936", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
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
          _936: CrypToadzCustomImage936Deployed.address
        });
        await CrypToadzCustomImagesDeployed.deployed();
      }
    }

    {
      const CrypToadzCustomImage1519 = await ethers.getContractFactory("CrypToadzCustomImage1519", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
      var CrypToadzCustomImage1519Deployed = await CrypToadzCustomImage1519.deploy();
      await CrypToadzCustomImage1519Deployed.deployed();

      const CrypToadzCustomImage1943A = await ethers.getContractFactory("CrypToadzCustomImage1943A", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
      var CrypToadzCustomImage1943ADeployed = await CrypToadzCustomImage1943A.deploy();
      await CrypToadzCustomImage1943ADeployed.deployed();

      const CrypToadzCustomImage1943B = await ethers.getContractFactory("CrypToadzCustomImage1943B", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
      var CrypToadzCustomImage1943BDeployed = await CrypToadzCustomImage1943B.deploy();
      await CrypToadzCustomImage1943BDeployed.deployed();

      const CrypToadzCustomImage1943C = await ethers.getContractFactory("CrypToadzCustomImage1943C", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
      var CrypToadzCustomImage1943CDeployed = await CrypToadzCustomImage1943C.deploy();
      await CrypToadzCustomImage1943CDeployed.deployed();

      const CrypToadzCustomImage1943D = await ethers.getContractFactory("CrypToadzCustomImage1943D", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
      var CrypToadzCustomImage1943DDeployed = await CrypToadzCustomImage1943D.deploy();
      await CrypToadzCustomImage1943DDeployed.deployed();

      const CrypToadzCustomImage1943E = await ethers.getContractFactory("CrypToadzCustomImage1943E", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
      var CrypToadzCustomImage1943EDeployed = await CrypToadzCustomImage1943E.deploy();
      await CrypToadzCustomImage1943EDeployed.deployed();

      const CrypToadzCustomImage1943 = await ethers.getContractFactory("CrypToadzCustomImage1943");
      var CrypToadzCustomImage1943Deployed = await CrypToadzCustomImage1943.deploy(CrypToadzCustomImage1943ADeployed.address, CrypToadzCustomImage1943BDeployed.address, CrypToadzCustomImage1943CDeployed.address, CrypToadzCustomImage1943DDeployed.address, CrypToadzCustomImage1943EDeployed.address);
      await CrypToadzCustomImage1943Deployed.deployed();

      const CrypToadzCustomImage2208 = await ethers.getContractFactory("CrypToadzCustomImage2208", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
      var CrypToadzCustomImage2208Deployed = await CrypToadzCustomImage2208.deploy();
      await CrypToadzCustomImage2208Deployed.deployed();

      const CrypToadzCustomImage318A = await ethers.getContractFactory("CrypToadzCustomImage318A", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
      var CrypToadzCustomImage318ADeployed = await CrypToadzCustomImage318A.deploy();
      await CrypToadzCustomImage318ADeployed.deployed();

      const CrypToadzCustomImage318B = await ethers.getContractFactory("CrypToadzCustomImage318B", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
      var CrypToadzCustomImage318BDeployed = await CrypToadzCustomImage318B.deploy();
      await CrypToadzCustomImage318BDeployed.deployed();

      const CrypToadzCustomImage318C = await ethers.getContractFactory("CrypToadzCustomImage318C", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
      var CrypToadzCustomImage318CDeployed = await CrypToadzCustomImage318C.deploy();
      await CrypToadzCustomImage318CDeployed.deployed();

      const CrypToadzCustomImage318D = await ethers.getContractFactory("CrypToadzCustomImage318D", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
      var CrypToadzCustomImage318DDeployed = await CrypToadzCustomImage318D.deploy();
      await CrypToadzCustomImage318DDeployed.deployed();

      const CrypToadzCustomImage318E = await ethers.getContractFactory("CrypToadzCustomImage318E", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
      var CrypToadzCustomImage318EDeployed = await CrypToadzCustomImage318E.deploy();
      await CrypToadzCustomImage318EDeployed.deployed();

      const CrypToadzCustomImage318F = await ethers.getContractFactory("CrypToadzCustomImage318F", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
      var CrypToadzCustomImage318FDeployed = await CrypToadzCustomImage318F.deploy();
      await CrypToadzCustomImage318FDeployed.deployed();

      const CrypToadzCustomImage318 = await ethers.getContractFactory("CrypToadzCustomImage318");
      var CrypToadzCustomImage318Deployed = await CrypToadzCustomImage318.deploy(CrypToadzCustomImage318ADeployed.address, CrypToadzCustomImage318BDeployed.address, CrypToadzCustomImage318CDeployed.address, CrypToadzCustomImage318DDeployed.address, CrypToadzCustomImage318EDeployed.address, CrypToadzCustomImage318FDeployed.address);
      await CrypToadzCustomImage318Deployed.deployed();

      const CrypToadzCustomImage3250 = await ethers.getContractFactory("CrypToadzCustomImage3250", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
      var CrypToadzCustomImage3250Deployed = await CrypToadzCustomImage3250.deploy();
      await CrypToadzCustomImage3250Deployed.deployed();

      const CrypToadzCustomImage3661A = await ethers.getContractFactory("CrypToadzCustomImage3661A", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
      var CrypToadzCustomImage3661ADeployed = await CrypToadzCustomImage3661A.deploy();
      await CrypToadzCustomImage3661ADeployed.deployed();

      const CrypToadzCustomImage3661B = await ethers.getContractFactory("CrypToadzCustomImage3661B", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
      var CrypToadzCustomImage3661BDeployed = await CrypToadzCustomImage3661B.deploy();
      await CrypToadzCustomImage3661BDeployed.deployed();

      const CrypToadzCustomImage3661C = await ethers.getContractFactory("CrypToadzCustomImage3661C", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
      var CrypToadzCustomImage3661CDeployed = await CrypToadzCustomImage3661C.deploy();
      await CrypToadzCustomImage3661CDeployed.deployed();

      const CrypToadzCustomImage3661D = await ethers.getContractFactory("CrypToadzCustomImage3661D", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
      var CrypToadzCustomImage3661DDeployed = await CrypToadzCustomImage3661D.deploy();
      await CrypToadzCustomImage3661DDeployed.deployed();

      const CrypToadzCustomImage3661E = await ethers.getContractFactory("CrypToadzCustomImage3661E", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
      var CrypToadzCustomImage3661EDeployed = await CrypToadzCustomImage3661E.deploy();
      await CrypToadzCustomImage3661EDeployed.deployed();

      const CrypToadzCustomImage3661F = await ethers.getContractFactory("CrypToadzCustomImage3661F", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
      var CrypToadzCustomImage3661FDeployed = await CrypToadzCustomImage3661F.deploy();
      await CrypToadzCustomImage3661FDeployed.deployed();

      const CrypToadzCustomImage3661G = await ethers.getContractFactory("CrypToadzCustomImage3661G", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
      var CrypToadzCustomImage3661GDeployed = await CrypToadzCustomImage3661G.deploy();
      await CrypToadzCustomImage3661GDeployed.deployed();

      const CrypToadzCustomImage3661 = await ethers.getContractFactory("CrypToadzCustomImage3661");
      var CrypToadzCustomImage3661Deployed = await CrypToadzCustomImage3661.deploy(CrypToadzCustomImage3661ADeployed.address, CrypToadzCustomImage3661BDeployed.address, CrypToadzCustomImage3661CDeployed.address, CrypToadzCustomImage3661DDeployed.address, CrypToadzCustomImage3661EDeployed.address, CrypToadzCustomImage3661FDeployed.address, CrypToadzCustomImage3661GDeployed.address);
      await CrypToadzCustomImage3661Deployed.deployed();

      const CrypToadzCustomImage37A = await ethers.getContractFactory("CrypToadzCustomImage37A", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
      var CrypToadzCustomImage37ADeployed = await CrypToadzCustomImage37A.deploy();
      await CrypToadzCustomImage37ADeployed.deployed();

      const CrypToadzCustomImage37B = await ethers.getContractFactory("CrypToadzCustomImage37B", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
      var CrypToadzCustomImage37BDeployed = await CrypToadzCustomImage37B.deploy();
      await CrypToadzCustomImage37BDeployed.deployed();

      const CrypToadzCustomImage37C = await ethers.getContractFactory("CrypToadzCustomImage37C", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
      var CrypToadzCustomImage37CDeployed = await CrypToadzCustomImage37C.deploy();
      await CrypToadzCustomImage37CDeployed.deployed();

      const CrypToadzCustomImage37D = await ethers.getContractFactory("CrypToadzCustomImage37D", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
      var CrypToadzCustomImage37DDeployed = await CrypToadzCustomImage37D.deploy();
      await CrypToadzCustomImage37DDeployed.deployed();

      const CrypToadzCustomImage37E = await ethers.getContractFactory("CrypToadzCustomImage37E", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
      var CrypToadzCustomImage37EDeployed = await CrypToadzCustomImage37E.deploy();
      await CrypToadzCustomImage37EDeployed.deployed();

      const CrypToadzCustomImage37F = await ethers.getContractFactory("CrypToadzCustomImage37F", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
      var CrypToadzCustomImage37FDeployed = await CrypToadzCustomImage37F.deploy();
      await CrypToadzCustomImage37FDeployed.deployed();

      const CrypToadzCustomImage37 = await ethers.getContractFactory("CrypToadzCustomImage37");
      var CrypToadzCustomImage37Deployed = await CrypToadzCustomImage37.deploy(CrypToadzCustomImage37ADeployed.address, CrypToadzCustomImage37BDeployed.address, CrypToadzCustomImage37CDeployed.address, CrypToadzCustomImage37DDeployed.address, CrypToadzCustomImage37EDeployed.address, CrypToadzCustomImage37FDeployed.address);
      await CrypToadzCustomImage37Deployed.deployed();

      const CrypToadzCustomImage4035A = await ethers.getContractFactory("CrypToadzCustomImage4035A", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
      var CrypToadzCustomImage4035ADeployed = await CrypToadzCustomImage4035A.deploy();
      await CrypToadzCustomImage4035ADeployed.deployed();

      const CrypToadzCustomImage4035B = await ethers.getContractFactory("CrypToadzCustomImage4035B", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
      var CrypToadzCustomImage4035BDeployed = await CrypToadzCustomImage4035B.deploy();
      await CrypToadzCustomImage4035BDeployed.deployed();

      const CrypToadzCustomImage4035C = await ethers.getContractFactory("CrypToadzCustomImage4035C", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
      var CrypToadzCustomImage4035CDeployed = await CrypToadzCustomImage4035C.deploy();
      await CrypToadzCustomImage4035CDeployed.deployed();

      const CrypToadzCustomImage4035D = await ethers.getContractFactory("CrypToadzCustomImage4035D", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
      var CrypToadzCustomImage4035DDeployed = await CrypToadzCustomImage4035D.deploy();
      await CrypToadzCustomImage4035DDeployed.deployed();

      const CrypToadzCustomImage4035E = await ethers.getContractFactory("CrypToadzCustomImage4035E", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
      var CrypToadzCustomImage4035EDeployed = await CrypToadzCustomImage4035E.deploy();
      await CrypToadzCustomImage4035EDeployed.deployed();

      const CrypToadzCustomImage4035F = await ethers.getContractFactory("CrypToadzCustomImage4035F", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
      var CrypToadzCustomImage4035FDeployed = await CrypToadzCustomImage4035F.deploy();
      await CrypToadzCustomImage4035FDeployed.deployed();

      const CrypToadzCustomImage4035 = await ethers.getContractFactory("CrypToadzCustomImage4035");
      var CrypToadzCustomImage4035Deployed = await CrypToadzCustomImage4035.deploy(CrypToadzCustomImage4035ADeployed.address, CrypToadzCustomImage4035BDeployed.address, CrypToadzCustomImage4035CDeployed.address, CrypToadzCustomImage4035DDeployed.address, CrypToadzCustomImage4035EDeployed.address, CrypToadzCustomImage4035FDeployed.address);
      await CrypToadzCustomImage4035Deployed.deployed();

      const CrypToadzCustomImage43000000 = await ethers.getContractFactory("CrypToadzCustomImage43000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
      var CrypToadzCustomImage43000000Deployed = await CrypToadzCustomImage43000000.deploy();
      await CrypToadzCustomImage43000000Deployed.deployed();

      const CrypToadzCustomImage466A = await ethers.getContractFactory("CrypToadzCustomImage466A", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
      var CrypToadzCustomImage466ADeployed = await CrypToadzCustomImage466A.deploy();
      await CrypToadzCustomImage466ADeployed.deployed();

      const CrypToadzCustomImage466B = await ethers.getContractFactory("CrypToadzCustomImage466B", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
      var CrypToadzCustomImage466BDeployed = await CrypToadzCustomImage466B.deploy();
      await CrypToadzCustomImage466BDeployed.deployed();

      const CrypToadzCustomImage466C = await ethers.getContractFactory("CrypToadzCustomImage466C", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
      var CrypToadzCustomImage466CDeployed = await CrypToadzCustomImage466C.deploy();
      await CrypToadzCustomImage466CDeployed.deployed();

      const CrypToadzCustomImage466D = await ethers.getContractFactory("CrypToadzCustomImage466D", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
      var CrypToadzCustomImage466DDeployed = await CrypToadzCustomImage466D.deploy();
      await CrypToadzCustomImage466DDeployed.deployed();

      const CrypToadzCustomImage466E = await ethers.getContractFactory("CrypToadzCustomImage466E", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
      var CrypToadzCustomImage466EDeployed = await CrypToadzCustomImage466E.deploy();
      await CrypToadzCustomImage466EDeployed.deployed();

      const CrypToadzCustomImage466F = await ethers.getContractFactory("CrypToadzCustomImage466F", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
      var CrypToadzCustomImage466FDeployed = await CrypToadzCustomImage466F.deploy();
      await CrypToadzCustomImage466FDeployed.deployed();

      const CrypToadzCustomImage466 = await ethers.getContractFactory("CrypToadzCustomImage466");
      var CrypToadzCustomImage466Deployed = await CrypToadzCustomImage466.deploy(CrypToadzCustomImage466ADeployed.address, CrypToadzCustomImage466BDeployed.address, CrypToadzCustomImage466CDeployed.address, CrypToadzCustomImage466DDeployed.address, CrypToadzCustomImage466EDeployed.address, CrypToadzCustomImage466FDeployed.address);
      await CrypToadzCustomImage466Deployed.deployed();

      const CrypToadzCustomImage48000000 = await ethers.getContractFactory("CrypToadzCustomImage48000000", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
      var CrypToadzCustomImage48000000Deployed = await CrypToadzCustomImage48000000.deploy();
      await CrypToadzCustomImage48000000Deployed.deployed();

      const CrypToadzCustomImage4911A = await ethers.getContractFactory("CrypToadzCustomImage4911A", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
      var CrypToadzCustomImage4911ADeployed = await CrypToadzCustomImage4911A.deploy();
      await CrypToadzCustomImage4911ADeployed.deployed();

      const CrypToadzCustomImage4911B = await ethers.getContractFactory("CrypToadzCustomImage4911B", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
      var CrypToadzCustomImage4911BDeployed = await CrypToadzCustomImage4911B.deploy();
      await CrypToadzCustomImage4911BDeployed.deployed();

      const CrypToadzCustomImage4911C = await ethers.getContractFactory("CrypToadzCustomImage4911C", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
      var CrypToadzCustomImage4911CDeployed = await CrypToadzCustomImage4911C.deploy();
      await CrypToadzCustomImage4911CDeployed.deployed();

      const CrypToadzCustomImage4911D = await ethers.getContractFactory("CrypToadzCustomImage4911D", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
      var CrypToadzCustomImage4911DDeployed = await CrypToadzCustomImage4911D.deploy();
      await CrypToadzCustomImage4911DDeployed.deployed();

      const CrypToadzCustomImage4911E = await ethers.getContractFactory("CrypToadzCustomImage4911E", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
      var CrypToadzCustomImage4911EDeployed = await CrypToadzCustomImage4911E.deploy();
      await CrypToadzCustomImage4911EDeployed.deployed();

      const CrypToadzCustomImage4911F = await ethers.getContractFactory("CrypToadzCustomImage4911F", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
      var CrypToadzCustomImage4911FDeployed = await CrypToadzCustomImage4911F.deploy();
      await CrypToadzCustomImage4911FDeployed.deployed();

      const CrypToadzCustomImage4911G = await ethers.getContractFactory("CrypToadzCustomImage4911G", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
      var CrypToadzCustomImage4911GDeployed = await CrypToadzCustomImage4911G.deploy();
      await CrypToadzCustomImage4911GDeployed.deployed();

      const CrypToadzCustomImage4911 = await ethers.getContractFactory("CrypToadzCustomImage4911");
      var CrypToadzCustomImage4911Deployed = await CrypToadzCustomImage4911.deploy(CrypToadzCustomImage4911ADeployed.address, CrypToadzCustomImage4911BDeployed.address, CrypToadzCustomImage4911CDeployed.address, CrypToadzCustomImage4911DDeployed.address, CrypToadzCustomImage4911EDeployed.address, CrypToadzCustomImage4911FDeployed.address, CrypToadzCustomImage4911GDeployed.address);
      await CrypToadzCustomImage4911Deployed.deployed();

      const CrypToadzCustomImage5086 = await ethers.getContractFactory("CrypToadzCustomImage5086", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
      var CrypToadzCustomImage5086Deployed = await CrypToadzCustomImage5086.deploy();
      await CrypToadzCustomImage5086Deployed.deployed();

      const CrypToadzCustomImage5844 = await ethers.getContractFactory("CrypToadzCustomImage5844", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
      var CrypToadzCustomImage5844Deployed = await CrypToadzCustomImage5844.deploy();
      await CrypToadzCustomImage5844Deployed.deployed();

      const CrypToadzCustomImage6131 = await ethers.getContractFactory("CrypToadzCustomImage6131", { libraries: { CrypToadzCustomImageBank: CrypToadzCustomImageBankDeployed.address } });
      var CrypToadzCustomImage6131Deployed = await CrypToadzCustomImage6131.deploy();
      await CrypToadzCustomImage6131Deployed.deployed();

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

      await CrypToadzCustomAnimationsDeployed.deployed();
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
  });
});
