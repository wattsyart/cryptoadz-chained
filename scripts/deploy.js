const hre = require("hardhat");
const ethers = hre.ethers;

module.exports = {
  deployContracts: deployContracts
}

// https://docs.ethers.io/v5/api/contract/contract-factory/
async function deployContract(contractName, quiet, trace, txOptions) {
  const contract = await ethers.getContractFactory(contractName);
  if (trace) {
    // https://docs.ethers.io/v5/api/utils/transactions/#UnsignedTransaction
    var unsignedTx = await contract.getDeployTransaction(txOptions);
    if (!quiet) console.log(`${contractName} created unsigned transaction`);
    return unsignedTx;
  } else {
    var deployed = await contract.deploy(txOptions);
    await deployed.deployed();
    if (!quiet) console.log(`${contractName} deployed to ${deployed.address}`);
    return deployed;
  }
}

async function deployContracts(quiet, trace, txOptions) {
  if (!txOptions) txOptions = {};

  var GIFEncoderDeployed = await deployContract("GIFEncoder", quiet, trace, txOptions);
  var PixelRendererDeployed = await deployContract("PixelRenderer", quiet, trace, txOptions);

  var CrypToadzChainedDeployed = await deployContract("CrypToadzChained", quiet, trace, txOptions);
  var CrypToadzStringsDeployed = await deployContract("CrypToadzStrings", quiet, trace, txOptions);
  var CrypToadzMetadataDeployed = await deployContract("CrypToadzMetadata", quiet, trace, txOptions);
  var CrypToadzDeltasDeployed = await deployContract("CrypToadzDeltas", quiet, trace, txOptions);
  var CrypToadzBuilderDeployed = await deployContract("CrypToadzBuilder", quiet, trace, txOptions);
  var CrypToadzCustomImagesDeployed = await deployContract("CrypToadzCustomImages", quiet, trace, txOptions);
  var CrypToadzCustomAnimationsDeployed = await deployContract("CrypToadzCustomAnimations", quiet, trace, txOptions);

  var CrypToadzDeltasADeployed = await deployContract("CrypToadzDeltasA", quiet, trace, txOptions);
  var CrypToadzDeltasBDeployed = await deployContract("CrypToadzDeltasB", quiet, trace, txOptions);
  var CrypToadzDeltasCDeployed = await deployContract("CrypToadzDeltasC", quiet, trace, txOptions);

  var CrypToadzBuilderAnyDeployed = await deployContract("CrypToadzBuilderAny", quiet, trace, txOptions);
  var CrypToadzBuilderShortDeployed = await deployContract("CrypToadzBuilderShort", quiet, trace, txOptions);
  var CrypToadzBuilderTallDeployed = await deployContract("CrypToadzBuilderTall", quiet, trace, txOptions);

  if (true) {
    var CrypToadzCustomImage1000000Deployed = await deployContract("CrypToadzCustomImage1000000", quiet, trace, txOptions);
    var CrypToadzCustomImage10000000Deployed = await deployContract("CrypToadzCustomImage10000000", quiet, trace, txOptions);
    var CrypToadzCustomImage1005ADeployed = await deployContract("CrypToadzCustomImage1005A", quiet, trace, txOptions);
    var CrypToadzCustomImage1005BDeployed = await deployContract("CrypToadzCustomImage1005B", quiet, trace, txOptions);
    var CrypToadzCustomImage1005Deployed = await deployContract("CrypToadzCustomImage1005", quiet, trace, txOptions);
    var CrypToadzCustomImage11000000Deployed = await deployContract("CrypToadzCustomImage11000000", quiet, trace, txOptions);
    var CrypToadzCustomImage1165Deployed = await deployContract("CrypToadzCustomImage1165", quiet, trace, txOptions);
    var CrypToadzCustomImage12000000Deployed = await deployContract("CrypToadzCustomImage12000000", quiet, trace, txOptions);
    var CrypToadzCustomImage123Deployed = await deployContract("CrypToadzCustomImage123", quiet, trace, txOptions);
    var CrypToadzCustomImage13000000Deployed = await deployContract("CrypToadzCustomImage13000000", quiet, trace, txOptions);
    var CrypToadzCustomImage14000000Deployed = await deployContract("CrypToadzCustomImage14000000", quiet, trace, txOptions);
    var CrypToadzCustomImage1423Deployed = await deployContract("CrypToadzCustomImage1423", quiet, trace, txOptions);
    var CrypToadzCustomImage15000000Deployed = await deployContract("CrypToadzCustomImage15000000", quiet, trace, txOptions);
    var CrypToadzCustomImage1519Deployed = await deployContract("CrypToadzCustomImage1519", quiet, trace, txOptions);
    var CrypToadzCustomImage1559Deployed = await deployContract("CrypToadzCustomImage1559", quiet, trace, txOptions);
    var CrypToadzCustomImage16000000Deployed = await deployContract("CrypToadzCustomImage16000000", quiet, trace, txOptions);
    var CrypToadzCustomImage1637Deployed = await deployContract("CrypToadzCustomImage1637", quiet, trace, txOptions);
    var CrypToadzCustomImage17000000Deployed = await deployContract("CrypToadzCustomImage17000000", quiet, trace, txOptions);
    var CrypToadzCustomImage1703Deployed = await deployContract("CrypToadzCustomImage1703", quiet, trace, txOptions);
    var CrypToadzCustomImage1754Deployed = await deployContract("CrypToadzCustomImage1754", quiet, trace, txOptions);
    var CrypToadzCustomImage1793Deployed = await deployContract("CrypToadzCustomImage1793", quiet, trace, txOptions);
    var CrypToadzCustomImage18000000Deployed = await deployContract("CrypToadzCustomImage18000000", quiet, trace, txOptions);
    var CrypToadzCustomImage1812ADeployed = await deployContract("CrypToadzCustomImage1812A", quiet, trace, txOptions);
    var CrypToadzCustomImage1812BDeployed = await deployContract("CrypToadzCustomImage1812B", quiet, trace, txOptions);
    var CrypToadzCustomImage1812Deployed = await deployContract("CrypToadzCustomImage1812", quiet, trace, txOptions);
    var CrypToadzCustomImage19000000Deployed = await deployContract("CrypToadzCustomImage19000000", quiet, trace, txOptions);
    var CrypToadzCustomImage1935Deployed = await deployContract("CrypToadzCustomImage1935", quiet, trace, txOptions);
    var CrypToadzCustomImage1943ADeployed = await deployContract("CrypToadzCustomImage1943A", quiet, trace, txOptions);
    var CrypToadzCustomImage1943BDeployed = await deployContract("CrypToadzCustomImage1943B", quiet, trace, txOptions);
    var CrypToadzCustomImage1943CDeployed = await deployContract("CrypToadzCustomImage1943C", quiet, trace, txOptions);
    var CrypToadzCustomImage1943DDeployed = await deployContract("CrypToadzCustomImage1943D", quiet, trace, txOptions);
    var CrypToadzCustomImage1943EDeployed = await deployContract("CrypToadzCustomImage1943E", quiet, trace, txOptions);
    var CrypToadzCustomImage1943Deployed = await deployContract("CrypToadzCustomImage1943", quiet, trace, txOptions);
    var CrypToadzCustomImage1975ADeployed = await deployContract("CrypToadzCustomImage1975A", quiet, trace, txOptions);
    var CrypToadzCustomImage1975BDeployed = await deployContract("CrypToadzCustomImage1975B", quiet, trace, txOptions);
    var CrypToadzCustomImage1975Deployed = await deployContract("CrypToadzCustomImage1975", quiet, trace, txOptions);
    var CrypToadzCustomImage2000000Deployed = await deployContract("CrypToadzCustomImage2000000", quiet, trace, txOptions);
    var CrypToadzCustomImage20000000Deployed = await deployContract("CrypToadzCustomImage20000000", quiet, trace, txOptions);
    var CrypToadzCustomImage21000000Deployed = await deployContract("CrypToadzCustomImage21000000", quiet, trace, txOptions);
    var CrypToadzCustomImage2124Deployed = await deployContract("CrypToadzCustomImage2124", quiet, trace, txOptions);
    var CrypToadzCustomImage22000000Deployed = await deployContract("CrypToadzCustomImage22000000", quiet, trace, txOptions);
    var CrypToadzCustomImage2208Deployed = await deployContract("CrypToadzCustomImage2208", quiet, trace, txOptions);
    var CrypToadzCustomImage2232ADeployed = await deployContract("CrypToadzCustomImage2232A", quiet, trace, txOptions);
    var CrypToadzCustomImage2232BDeployed = await deployContract("CrypToadzCustomImage2232B", quiet, trace, txOptions);
    var CrypToadzCustomImage2232Deployed = await deployContract("CrypToadzCustomImage2232", quiet, trace, txOptions);
    var CrypToadzCustomImage23000000Deployed = await deployContract("CrypToadzCustomImage23000000", quiet, trace, txOptions);
    var CrypToadzCustomImage2327ADeployed = await deployContract("CrypToadzCustomImage2327A", quiet, trace, txOptions);
    var CrypToadzCustomImage2327BDeployed = await deployContract("CrypToadzCustomImage2327B", quiet, trace, txOptions);
    var CrypToadzCustomImage2327Deployed = await deployContract("CrypToadzCustomImage2327", quiet, trace, txOptions);
    var CrypToadzCustomImage24000000Deployed = await deployContract("CrypToadzCustomImage24000000", quiet, trace, txOptions);
    var CrypToadzCustomImage2469Deployed = await deployContract("CrypToadzCustomImage2469", quiet, trace, txOptions);
    var CrypToadzCustomImage2471Deployed = await deployContract("CrypToadzCustomImage2471", quiet, trace, txOptions);
    var CrypToadzCustomImage2482Deployed = await deployContract("CrypToadzCustomImage2482", quiet, trace, txOptions);
    var CrypToadzCustomImage2489ADeployed = await deployContract("CrypToadzCustomImage2489A", quiet, trace, txOptions);
    var CrypToadzCustomImage2489BDeployed = await deployContract("CrypToadzCustomImage2489B", quiet, trace, txOptions);
    var CrypToadzCustomImage2489Deployed = await deployContract("CrypToadzCustomImage2489", quiet, trace, txOptions);
    var CrypToadzCustomImage25000000Deployed = await deployContract("CrypToadzCustomImage25000000", quiet, trace, txOptions);
    var CrypToadzCustomImage2521Deployed = await deployContract("CrypToadzCustomImage2521", quiet, trace, txOptions);
    var CrypToadzCustomImage2569Deployed = await deployContract("CrypToadzCustomImage2569", quiet, trace, txOptions);
    var CrypToadzCustomImage2579Deployed = await deployContract("CrypToadzCustomImage2579", quiet, trace, txOptions);
    var CrypToadzCustomImage26000000Deployed = await deployContract("CrypToadzCustomImage26000000", quiet, trace, txOptions);
    var CrypToadzCustomImage27000000Deployed = await deployContract("CrypToadzCustomImage27000000", quiet, trace, txOptions);
    var CrypToadzCustomImage2709Deployed = await deployContract("CrypToadzCustomImage2709", quiet, trace, txOptions);
    var CrypToadzCustomImage28000000Deployed = await deployContract("CrypToadzCustomImage28000000", quiet, trace, txOptions);
    var CrypToadzCustomImage2825ADeployed = await deployContract("CrypToadzCustomImage2825A", quiet, trace, txOptions);
    var CrypToadzCustomImage2825BDeployed = await deployContract("CrypToadzCustomImage2825B", quiet, trace, txOptions);
    var CrypToadzCustomImage2825Deployed = await deployContract("CrypToadzCustomImage2825", quiet, trace, txOptions);
    var CrypToadzCustomImage2839Deployed = await deployContract("CrypToadzCustomImage2839", quiet, trace, txOptions);
    var CrypToadzCustomImage2846Deployed = await deployContract("CrypToadzCustomImage2846", quiet, trace, txOptions);
    var CrypToadzCustomImage2865Deployed = await deployContract("CrypToadzCustomImage2865", quiet, trace, txOptions);
    var CrypToadzCustomImage29000000Deployed = await deployContract("CrypToadzCustomImage29000000", quiet, trace, txOptions);
    var CrypToadzCustomImage2959ADeployed = await deployContract("CrypToadzCustomImage2959A", quiet, trace, txOptions);
    var CrypToadzCustomImage2959BDeployed = await deployContract("CrypToadzCustomImage2959B", quiet, trace, txOptions);
    var CrypToadzCustomImage2959Deployed = await deployContract("CrypToadzCustomImage2959", quiet, trace, txOptions);
    var CrypToadzCustomImage2986Deployed = await deployContract("CrypToadzCustomImage2986", quiet, trace, txOptions);
    var CrypToadzCustomImage3000000Deployed = await deployContract("CrypToadzCustomImage3000000", quiet, trace, txOptions);
    var CrypToadzCustomImage30000000Deployed = await deployContract("CrypToadzCustomImage30000000", quiet, trace, txOptions);
    var CrypToadzCustomImage31000000Deployed = await deployContract("CrypToadzCustomImage31000000", quiet, trace, txOptions);
    var CrypToadzCustomImage316Deployed = await deployContract("CrypToadzCustomImage316", quiet, trace, txOptions);
    var CrypToadzCustomImage318ADeployed = await deployContract("CrypToadzCustomImage318A", quiet, trace, txOptions);
    var CrypToadzCustomImage318BDeployed = await deployContract("CrypToadzCustomImage318B", quiet, trace, txOptions);
    var CrypToadzCustomImage318CDeployed = await deployContract("CrypToadzCustomImage318C", quiet, trace, txOptions);
    var CrypToadzCustomImage318DDeployed = await deployContract("CrypToadzCustomImage318D", quiet, trace, txOptions);
    var CrypToadzCustomImage318EDeployed = await deployContract("CrypToadzCustomImage318E", quiet, trace, txOptions);
    var CrypToadzCustomImage318Deployed = await deployContract("CrypToadzCustomImage318", quiet, trace, txOptions);
    var CrypToadzCustomImage3196ADeployed = await deployContract("CrypToadzCustomImage3196A", quiet, trace, txOptions);
    var CrypToadzCustomImage3196BDeployed = await deployContract("CrypToadzCustomImage3196B", quiet, trace, txOptions);
    var CrypToadzCustomImage3196Deployed = await deployContract("CrypToadzCustomImage3196", quiet, trace, txOptions);
    var CrypToadzCustomImage32000000Deployed = await deployContract("CrypToadzCustomImage32000000", quiet, trace, txOptions);
    var CrypToadzCustomImage33000000Deployed = await deployContract("CrypToadzCustomImage33000000", quiet, trace, txOptions);
    var CrypToadzCustomImage3309ADeployed = await deployContract("CrypToadzCustomImage3309A", quiet, trace, txOptions);
    var CrypToadzCustomImage3309BDeployed = await deployContract("CrypToadzCustomImage3309B", quiet, trace, txOptions);
    var CrypToadzCustomImage3309CDeployed = await deployContract("CrypToadzCustomImage3309C", quiet, trace, txOptions);
    var CrypToadzCustomImage3309Deployed = await deployContract("CrypToadzCustomImage3309", quiet, trace, txOptions);
    var CrypToadzCustomImage3382ADeployed = await deployContract("CrypToadzCustomImage3382A", quiet, trace, txOptions);
    var CrypToadzCustomImage3382BDeployed = await deployContract("CrypToadzCustomImage3382B", quiet, trace, txOptions);
    var CrypToadzCustomImage3382Deployed = await deployContract("CrypToadzCustomImage3382", quiet, trace, txOptions);
    var CrypToadzCustomImage34000000Deployed = await deployContract("CrypToadzCustomImage34000000", quiet, trace, txOptions);
    var CrypToadzCustomImage35000000Deployed = await deployContract("CrypToadzCustomImage35000000", quiet, trace, txOptions);
    var CrypToadzCustomImage36000000Deployed = await deployContract("CrypToadzCustomImage36000000", quiet, trace, txOptions);
    var CrypToadzCustomImage37ADeployed = await deployContract("CrypToadzCustomImage37A", quiet, trace, txOptions);
    var CrypToadzCustomImage37BDeployed = await deployContract("CrypToadzCustomImage37B", quiet, trace, txOptions);
    var CrypToadzCustomImage37CDeployed = await deployContract("CrypToadzCustomImage37C", quiet, trace, txOptions);
    var CrypToadzCustomImage37DDeployed = await deployContract("CrypToadzCustomImage37D", quiet, trace, txOptions);
    var CrypToadzCustomImage37EDeployed = await deployContract("CrypToadzCustomImage37E", quiet, trace, txOptions);
    var CrypToadzCustomImage37Deployed = await deployContract("CrypToadzCustomImage37", quiet, trace, txOptions);
    var CrypToadzCustomImage37000000Deployed = await deployContract("CrypToadzCustomImage37000000", quiet, trace, txOptions);
    var CrypToadzCustomImage3703Deployed = await deployContract("CrypToadzCustomImage3703", quiet, trace, txOptions);
    var CrypToadzCustomImage38000000Deployed = await deployContract("CrypToadzCustomImage38000000", quiet, trace, txOptions);
    var CrypToadzCustomImage39000000Deployed = await deployContract("CrypToadzCustomImage39000000", quiet, trace, txOptions);
    var CrypToadzCustomImage4000000Deployed = await deployContract("CrypToadzCustomImage4000000", quiet, trace, txOptions);
    var CrypToadzCustomImage40000000Deployed = await deployContract("CrypToadzCustomImage40000000", quiet, trace, txOptions);
    var CrypToadzCustomImage4096Deployed = await deployContract("CrypToadzCustomImage4096", quiet, trace, txOptions);
    var CrypToadzCustomImage41000000Deployed = await deployContract("CrypToadzCustomImage41000000", quiet, trace, txOptions);
    var CrypToadzCustomImage4126Deployed = await deployContract("CrypToadzCustomImage4126", quiet, trace, txOptions);
    var CrypToadzCustomImage4152ADeployed = await deployContract("CrypToadzCustomImage4152A", quiet, trace, txOptions);
    var CrypToadzCustomImage4152BDeployed = await deployContract("CrypToadzCustomImage4152B", quiet, trace, txOptions);
    var CrypToadzCustomImage4152Deployed = await deployContract("CrypToadzCustomImage4152", quiet, trace, txOptions);
    var CrypToadzCustomImage4192Deployed = await deployContract("CrypToadzCustomImage4192", quiet, trace, txOptions);
    var CrypToadzCustomImage42000000Deployed = await deployContract("CrypToadzCustomImage42000000", quiet, trace, txOptions);
    var CrypToadzCustomImage4201Deployed = await deployContract("CrypToadzCustomImage4201", quiet, trace, txOptions);
    var CrypToadzCustomImage4221Deployed = await deployContract("CrypToadzCustomImage4221", quiet, trace, txOptions);
    var CrypToadzCustomImage4238ADeployed = await deployContract("CrypToadzCustomImage4238A", quiet, trace, txOptions);
    var CrypToadzCustomImage4238BDeployed = await deployContract("CrypToadzCustomImage4238B", quiet, trace, txOptions);
    var CrypToadzCustomImage4238Deployed = await deployContract("CrypToadzCustomImage4238", quiet, trace, txOptions);
    var CrypToadzCustomImage4368Deployed = await deployContract("CrypToadzCustomImage4368", quiet, trace, txOptions);
    var CrypToadzCustomImage44000000Deployed = await deployContract("CrypToadzCustomImage44000000", quiet, trace, txOptions);
    var CrypToadzCustomImage45000000Deployed = await deployContract("CrypToadzCustomImage45000000", quiet, trace, txOptions);
    var CrypToadzCustomImage4578Deployed = await deployContract("CrypToadzCustomImage4578", quiet, trace, txOptions);
    var CrypToadzCustomImage4580ADeployed = await deployContract("CrypToadzCustomImage4580A", quiet, trace, txOptions);
    var CrypToadzCustomImage4580BDeployed = await deployContract("CrypToadzCustomImage4580B", quiet, trace, txOptions);
    var CrypToadzCustomImage4580Deployed = await deployContract("CrypToadzCustomImage4580", quiet, trace, txOptions);
    var CrypToadzCustomImage46000000Deployed = await deployContract("CrypToadzCustomImage46000000", quiet, trace, txOptions);
    var CrypToadzCustomImage4604Deployed = await deployContract("CrypToadzCustomImage4604", quiet, trace, txOptions);
    var CrypToadzCustomImage466ADeployed = await deployContract("CrypToadzCustomImage466A", quiet, trace, txOptions);
    var CrypToadzCustomImage466BDeployed = await deployContract("CrypToadzCustomImage466B", quiet, trace, txOptions);
    var CrypToadzCustomImage466CDeployed = await deployContract("CrypToadzCustomImage466C", quiet, trace, txOptions);
    var CrypToadzCustomImage466DDeployed = await deployContract("CrypToadzCustomImage466D", quiet, trace, txOptions);
    var CrypToadzCustomImage466EDeployed = await deployContract("CrypToadzCustomImage466E", quiet, trace, txOptions);
    var CrypToadzCustomImage466Deployed = await deployContract("CrypToadzCustomImage466", quiet, trace, txOptions);
    var CrypToadzCustomImage47000000Deployed = await deployContract("CrypToadzCustomImage47000000", quiet, trace, txOptions);
    var CrypToadzCustomImage4714Deployed = await deployContract("CrypToadzCustomImage4714", quiet, trace, txOptions);
    var CrypToadzCustomImage472Deployed = await deployContract("CrypToadzCustomImage472", quiet, trace, txOptions);
    var CrypToadzCustomImage4773Deployed = await deployContract("CrypToadzCustomImage4773", quiet, trace, txOptions);
    var CrypToadzCustomImage4845Deployed = await deployContract("CrypToadzCustomImage4845", quiet, trace, txOptions);
    var CrypToadzCustomImage4896ADeployed = await deployContract("CrypToadzCustomImage4896A", quiet, trace, txOptions);
    var CrypToadzCustomImage4896BDeployed = await deployContract("CrypToadzCustomImage4896B", quiet, trace, txOptions);
    var CrypToadzCustomImage4896CDeployed = await deployContract("CrypToadzCustomImage4896C", quiet, trace, txOptions);
    var CrypToadzCustomImage4896Deployed = await deployContract("CrypToadzCustomImage4896", quiet, trace, txOptions);
    var CrypToadzCustomImage49000000Deployed = await deployContract("CrypToadzCustomImage49000000", quiet, trace, txOptions);
    var CrypToadzCustomImage491Deployed = await deployContract("CrypToadzCustomImage491", quiet, trace, txOptions);
    var CrypToadzCustomImage5000000Deployed = await deployContract("CrypToadzCustomImage5000000", quiet, trace, txOptions);
    var CrypToadzCustomImage50000000Deployed = await deployContract("CrypToadzCustomImage50000000", quiet, trace, txOptions);
    var CrypToadzCustomImage51000000Deployed = await deployContract("CrypToadzCustomImage51000000", quiet, trace, txOptions);
    var CrypToadzCustomImage5128Deployed = await deployContract("CrypToadzCustomImage5128", quiet, trace, txOptions);
    var CrypToadzCustomImage5150Deployed = await deployContract("CrypToadzCustomImage5150", quiet, trace, txOptions);
    var CrypToadzCustomImage52000000Deployed = await deployContract("CrypToadzCustomImage52000000", quiet, trace, txOptions);
    var CrypToadzCustomImage5262Deployed = await deployContract("CrypToadzCustomImage5262", quiet, trace, txOptions);
    var CrypToadzCustomImage53000000Deployed = await deployContract("CrypToadzCustomImage53000000", quiet, trace, txOptions);
    var CrypToadzCustomImage54000000Deployed = await deployContract("CrypToadzCustomImage54000000", quiet, trace, txOptions);
    var CrypToadzCustomImage5441Deployed = await deployContract("CrypToadzCustomImage5441", quiet, trace, txOptions);
    var CrypToadzCustomImage5471ADeployed = await deployContract("CrypToadzCustomImage5471A", quiet, trace, txOptions);
    var CrypToadzCustomImage5471BDeployed = await deployContract("CrypToadzCustomImage5471B", quiet, trace, txOptions);
    var CrypToadzCustomImage5471CDeployed = await deployContract("CrypToadzCustomImage5471C", quiet, trace, txOptions);
    var CrypToadzCustomImage5471Deployed = await deployContract("CrypToadzCustomImage5471", quiet, trace, txOptions);
    var CrypToadzCustomImage55000000Deployed = await deployContract("CrypToadzCustomImage55000000", quiet, trace, txOptions);
    var CrypToadzCustomImage56000000Deployed = await deployContract("CrypToadzCustomImage56000000", quiet, trace, txOptions);
    var CrypToadzCustomImage5730Deployed = await deployContract("CrypToadzCustomImage5730", quiet, trace, txOptions);
    var CrypToadzCustomImage5836Deployed = await deployContract("CrypToadzCustomImage5836", quiet, trace, txOptions);
    var CrypToadzCustomImage5848Deployed = await deployContract("CrypToadzCustomImage5848", quiet, trace, txOptions);
    var CrypToadzCustomImage5902ADeployed = await deployContract("CrypToadzCustomImage5902A", quiet, trace, txOptions);
    var CrypToadzCustomImage5902BDeployed = await deployContract("CrypToadzCustomImage5902B", quiet, trace, txOptions);
    var CrypToadzCustomImage5902Deployed = await deployContract("CrypToadzCustomImage5902", quiet, trace, txOptions);
    var CrypToadzCustomImage6000000Deployed = await deployContract("CrypToadzCustomImage6000000", quiet, trace, txOptions);
    var CrypToadzCustomImage6214ADeployed = await deployContract("CrypToadzCustomImage6214A", quiet, trace, txOptions);
    var CrypToadzCustomImage6214BDeployed = await deployContract("CrypToadzCustomImage6214B", quiet, trace, txOptions);
    var CrypToadzCustomImage6214Deployed = await deployContract("CrypToadzCustomImage6214", quiet, trace, txOptions);
    var CrypToadzCustomImage6382ADeployed = await deployContract("CrypToadzCustomImage6382A", quiet, trace, txOptions);
    var CrypToadzCustomImage6382BDeployed = await deployContract("CrypToadzCustomImage6382B", quiet, trace, txOptions);
    var CrypToadzCustomImage6382Deployed = await deployContract("CrypToadzCustomImage6382", quiet, trace, txOptions);
    var CrypToadzCustomImage6491Deployed = await deployContract("CrypToadzCustomImage6491", quiet, trace, txOptions);
    var CrypToadzCustomImage6572Deployed = await deployContract("CrypToadzCustomImage6572", quiet, trace, txOptions);
    var CrypToadzCustomImage6578Deployed = await deployContract("CrypToadzCustomImage6578", quiet, trace, txOptions);
    var CrypToadzCustomImage6631Deployed = await deployContract("CrypToadzCustomImage6631", quiet, trace, txOptions);
    var CrypToadzCustomImage6719Deployed = await deployContract("CrypToadzCustomImage6719", quiet, trace, txOptions);
    var CrypToadzCustomImage6736Deployed = await deployContract("CrypToadzCustomImage6736", quiet, trace, txOptions);
    var CrypToadzCustomImage6852Deployed = await deployContract("CrypToadzCustomImage6852", quiet, trace, txOptions);
    var CrypToadzCustomImage6894Deployed = await deployContract("CrypToadzCustomImage6894", quiet, trace, txOptions);
    var CrypToadzCustomImage6916Deployed = await deployContract("CrypToadzCustomImage6916", quiet, trace, txOptions);
    var CrypToadzCustomImage7000000Deployed = await deployContract("CrypToadzCustomImage7000000", quiet, trace, txOptions);
    var CrypToadzCustomImage703Deployed = await deployContract("CrypToadzCustomImage703", quiet, trace, txOptions);
    var CrypToadzCustomImage8000000Deployed = await deployContract("CrypToadzCustomImage8000000", quiet, trace, txOptions);
    var CrypToadzCustomImage864Deployed = await deployContract("CrypToadzCustomImage864", quiet, trace, txOptions);
    var CrypToadzCustomImage9000000Deployed = await deployContract("CrypToadzCustomImage9000000", quiet, trace, txOptions);
    var CrypToadzCustomImage916ADeployed = await deployContract("CrypToadzCustomImage916A", quiet, trace, txOptions);
    var CrypToadzCustomImage916BDeployed = await deployContract("CrypToadzCustomImage916B", quiet, trace, txOptions);
    var CrypToadzCustomImage916Deployed = await deployContract("CrypToadzCustomImage916", quiet, trace, txOptions);
    var CrypToadzCustomImage936ADeployed = await deployContract("CrypToadzCustomImage936A", quiet, trace, txOptions);
    var CrypToadzCustomImage936BDeployed = await deployContract("CrypToadzCustomImage936B", quiet, trace, txOptions);
    var CrypToadzCustomImage936Deployed = await deployContract("CrypToadzCustomImage936", quiet, trace, txOptions);
    var CrypToadzCustomImage966Deployed = await deployContract("CrypToadzCustomImage966", quiet, trace, txOptions);
  }

  if (true) {
    var CrypToadzCustomImage1519Deployed = await deployContract("CrypToadzCustomImage1519", quiet, trace, txOptions);
    var CrypToadzCustomImage1943ADeployed = await deployContract("CrypToadzCustomImage1943A", quiet, trace, txOptions);
    var CrypToadzCustomImage1943BDeployed = await deployContract("CrypToadzCustomImage1943B", quiet, trace, txOptions);
    var CrypToadzCustomImage1943CDeployed = await deployContract("CrypToadzCustomImage1943C", quiet, trace, txOptions);
    var CrypToadzCustomImage1943DDeployed = await deployContract("CrypToadzCustomImage1943D", quiet, trace, txOptions);
    var CrypToadzCustomImage1943EDeployed = await deployContract("CrypToadzCustomImage1943E", quiet, trace, txOptions);
    var CrypToadzCustomImage1943Deployed = await deployContract("CrypToadzCustomImage1943", quiet, trace, txOptions);
    var CrypToadzCustomImage2208Deployed = await deployContract("CrypToadzCustomImage2208", quiet, trace, txOptions);
    var CrypToadzCustomImage318ADeployed = await deployContract("CrypToadzCustomImage318A", quiet, trace, txOptions);
    var CrypToadzCustomImage318BDeployed = await deployContract("CrypToadzCustomImage318B", quiet, trace, txOptions);
    var CrypToadzCustomImage318CDeployed = await deployContract("CrypToadzCustomImage318C", quiet, trace, txOptions);
    var CrypToadzCustomImage318DDeployed = await deployContract("CrypToadzCustomImage318D", quiet, trace, txOptions);
    var CrypToadzCustomImage318EDeployed = await deployContract("CrypToadzCustomImage318E", quiet, trace, txOptions);
    var CrypToadzCustomImage318FDeployed = await deployContract("CrypToadzCustomImage318F", quiet, trace, txOptions);
    var CrypToadzCustomImage318Deployed = await deployContract("CrypToadzCustomImage318", quiet, trace, txOptions);
    var CrypToadzCustomImage3250Deployed = await deployContract("CrypToadzCustomImage3250", quiet, trace, txOptions);
    var CrypToadzCustomImage3661ADeployed = await deployContract("CrypToadzCustomImage3661A", quiet, trace, txOptions);
    var CrypToadzCustomImage3661BDeployed = await deployContract("CrypToadzCustomImage3661B", quiet, trace, txOptions);
    var CrypToadzCustomImage3661CDeployed = await deployContract("CrypToadzCustomImage3661C", quiet, trace, txOptions);
    var CrypToadzCustomImage3661DDeployed = await deployContract("CrypToadzCustomImage3661D", quiet, trace, txOptions);
    var CrypToadzCustomImage3661EDeployed = await deployContract("CrypToadzCustomImage3661E", quiet, trace, txOptions);
    var CrypToadzCustomImage3661FDeployed = await deployContract("CrypToadzCustomImage3661F", quiet, trace, txOptions);
    var CrypToadzCustomImage3661GDeployed = await deployContract("CrypToadzCustomImage3661G", quiet, trace, txOptions);
    var CrypToadzCustomImage3661Deployed = await deployContract("CrypToadzCustomImage3661", quiet, trace, txOptions);
    var CrypToadzCustomImage37ADeployed = await deployContract("CrypToadzCustomImage37A", quiet, trace, txOptions);
    var CrypToadzCustomImage37BDeployed = await deployContract("CrypToadzCustomImage37B", quiet, trace, txOptions);
    var CrypToadzCustomImage37CDeployed = await deployContract("CrypToadzCustomImage37C", quiet, trace, txOptions);
    var CrypToadzCustomImage37DDeployed = await deployContract("CrypToadzCustomImage37D", quiet, trace, txOptions);
    var CrypToadzCustomImage37EDeployed = await deployContract("CrypToadzCustomImage37E", quiet, trace, txOptions);
    var CrypToadzCustomImage37FDeployed = await deployContract("CrypToadzCustomImage37F", quiet, trace, txOptions);
    var CrypToadzCustomImage37Deployed = await deployContract("CrypToadzCustomImage37", quiet, trace, txOptions);
    var CrypToadzCustomImage4035ADeployed = await deployContract("CrypToadzCustomImage4035A", quiet, trace, txOptions);
    var CrypToadzCustomImage4035BDeployed = await deployContract("CrypToadzCustomImage4035B", quiet, trace, txOptions);
    var CrypToadzCustomImage4035CDeployed = await deployContract("CrypToadzCustomImage4035C", quiet, trace, txOptions);
    var CrypToadzCustomImage4035DDeployed = await deployContract("CrypToadzCustomImage4035D", quiet, trace, txOptions);
    var CrypToadzCustomImage4035EDeployed = await deployContract("CrypToadzCustomImage4035E", quiet, trace, txOptions);
    var CrypToadzCustomImage4035FDeployed = await deployContract("CrypToadzCustomImage4035F", quiet, trace, txOptions);
    var CrypToadzCustomImage4035Deployed = await deployContract("CrypToadzCustomImage4035", quiet, trace, txOptions);
    var CrypToadzCustomImage43000000Deployed = await deployContract("CrypToadzCustomImage43000000", quiet, trace, txOptions);
    var CrypToadzCustomImage466ADeployed = await deployContract("CrypToadzCustomImage466A", quiet, trace, txOptions);
    var CrypToadzCustomImage466BDeployed = await deployContract("CrypToadzCustomImage466B", quiet, trace, txOptions);
    var CrypToadzCustomImage466CDeployed = await deployContract("CrypToadzCustomImage466C", quiet, trace, txOptions);
    var CrypToadzCustomImage466DDeployed = await deployContract("CrypToadzCustomImage466D", quiet, trace, txOptions);
    var CrypToadzCustomImage466EDeployed = await deployContract("CrypToadzCustomImage466E", quiet, trace, txOptions);
    var CrypToadzCustomImage466FDeployed = await deployContract("CrypToadzCustomImage466F", quiet, trace, txOptions);
    var CrypToadzCustomImage466Deployed = await deployContract("CrypToadzCustomImage466", quiet, trace, txOptions);
    var CrypToadzCustomImage48000000Deployed = await deployContract("CrypToadzCustomImage48000000", quiet, trace, txOptions);
    var CrypToadzCustomImage4911ADeployed = await deployContract("CrypToadzCustomImage4911A", quiet, trace, txOptions);
    var CrypToadzCustomImage4911BDeployed = await deployContract("CrypToadzCustomImage4911B", quiet, trace, txOptions);
    var CrypToadzCustomImage4911CDeployed = await deployContract("CrypToadzCustomImage4911C", quiet, trace, txOptions);
    var CrypToadzCustomImage4911DDeployed = await deployContract("CrypToadzCustomImage4911D", quiet, trace, txOptions);
    var CrypToadzCustomImage4911EDeployed = await deployContract("CrypToadzCustomImage4911E", quiet, trace, txOptions);
    var CrypToadzCustomImage4911FDeployed = await deployContract("CrypToadzCustomImage4911F", quiet, trace, txOptions);
    var CrypToadzCustomImage4911GDeployed = await deployContract("CrypToadzCustomImage4911G", quiet, trace, txOptions);
    var CrypToadzCustomImage4911Deployed = await deployContract("CrypToadzCustomImage4911", quiet, trace, txOptions);
    var CrypToadzCustomImage5086Deployed = await deployContract("CrypToadzCustomImage5086", quiet, trace, txOptions);
    var CrypToadzCustomImage5844Deployed = await deployContract("CrypToadzCustomImage5844", quiet, trace, txOptions);
    var CrypToadzCustomImage6131Deployed = await deployContract("CrypToadzCustomImage6131", quiet, trace, txOptions);
  }

  //
  // Post-Deployment: Link all dependencies
  //

  await CrypToadzChainedDeployed.setEncoder(GIFEncoderDeployed.address);
  await CrypToadzDeltasDeployed.setRenderer(PixelRendererDeployed.address);
  await CrypToadzBuilderDeployed.setRenderer(PixelRendererDeployed.address);

  await CrypToadzDeltasDeployed.setAddresses({
    _a: CrypToadzDeltasADeployed.address,
    _b: CrypToadzDeltasBDeployed.address,
    _c: CrypToadzDeltasCDeployed.address
  });
  if (!quiet) console.log("CrypToadzDeltas linked with dependencies");

  await CrypToadzBuilderDeployed.setAny(CrypToadzBuilderAnyDeployed.address);
  await CrypToadzBuilderDeployed.setTall(CrypToadzBuilderTallDeployed.address);
  await CrypToadzBuilderDeployed.setShort(CrypToadzBuilderShortDeployed.address);
  await CrypToadzBuilderDeployed.setDeltas(CrypToadzDeltasDeployed.address);
  if (!quiet) console.log("CrypToadzBuilder linked with dependencies");

  await CrypToadzCustomImage1005Deployed.setAddresses(CrypToadzCustomImage1005ADeployed.address, CrypToadzCustomImage1005BDeployed.address);
  if (!quiet) console.log("CrypToadzCustomImage1005 linked with dependencies");

  await CrypToadzCustomImage1812Deployed.setAddresses(CrypToadzCustomImage1812ADeployed.address, CrypToadzCustomImage1812BDeployed.address);
  if (!quiet) console.log("CrypToadzCustomImage1812 linked with dependencies");

  await CrypToadzCustomImage1943Deployed.setAddresses(CrypToadzCustomImage1943ADeployed.address, CrypToadzCustomImage1943BDeployed.address, CrypToadzCustomImage1943CDeployed.address, CrypToadzCustomImage1943DDeployed.address, CrypToadzCustomImage1943EDeployed.address);
  if (!quiet) console.log("CrypToadzCustomImage1943 linked with dependencies");

  await CrypToadzCustomImage1975Deployed.setAddresses(CrypToadzCustomImage1975ADeployed.address, CrypToadzCustomImage1975BDeployed.address);
  if (!quiet) console.log("CrypToadzCustomImage1975 linked with dependencies");

  await CrypToadzCustomImage2232Deployed.setAddresses(CrypToadzCustomImage2232ADeployed.address, CrypToadzCustomImage2232BDeployed.address);
  if (!quiet) console.log("CrypToadzCustomImage2232 linked with dependencies");

  await CrypToadzCustomImage2327Deployed.setAddresses(CrypToadzCustomImage2327ADeployed.address, CrypToadzCustomImage2327BDeployed.address);
  if (!quiet) console.log("CrypToadzCustomImage2327 linked with dependencies");

  await CrypToadzCustomImage2489Deployed.setAddresses(CrypToadzCustomImage2489ADeployed.address, CrypToadzCustomImage2489BDeployed.address);
  if (!quiet) console.log("CrypToadzCustomImage2489 linked with dependencies");

  await CrypToadzCustomImage2825Deployed.setAddresses(CrypToadzCustomImage2825ADeployed.address, CrypToadzCustomImage2825BDeployed.address);
  if (!quiet) console.log("CrypToadzCustomImage2825 linked with dependencies");

  await CrypToadzCustomImage2959Deployed.setAddresses(CrypToadzCustomImage2959ADeployed.address, CrypToadzCustomImage2959BDeployed.address);
  if (!quiet) console.log("CrypToadzCustomImage2959 linked with dependencies");

  await CrypToadzCustomImage318Deployed.setAddresses(CrypToadzCustomImage318ADeployed.address, CrypToadzCustomImage318BDeployed.address, CrypToadzCustomImage318CDeployed.address, CrypToadzCustomImage318DDeployed.address, CrypToadzCustomImage318EDeployed.address);
  if (!quiet) console.log("CrypToadzCustomImage318 linked with dependencies");

  await CrypToadzCustomImage3196Deployed.setAddresses(CrypToadzCustomImage3196ADeployed.address, CrypToadzCustomImage3196BDeployed.address);
  if (!quiet) console.log("CrypToadzCustomImage3196 linked with dependencies");

  await CrypToadzCustomImage3309Deployed.setAddresses(CrypToadzCustomImage3309ADeployed.address, CrypToadzCustomImage3309BDeployed.address, CrypToadzCustomImage3309CDeployed.address);
  if (!quiet) console.log("CrypToadzCustomImage3309 linked with dependencies");

  await CrypToadzCustomImage3382Deployed.setAddresses(CrypToadzCustomImage3382ADeployed.address, CrypToadzCustomImage3382BDeployed.address);
  if (!quiet) console.log("CrypToadzCustomImage3382 linked with dependencies");

  await CrypToadzCustomImage37Deployed.setAddresses(CrypToadzCustomImage37ADeployed.address, CrypToadzCustomImage37BDeployed.address, CrypToadzCustomImage37CDeployed.address, CrypToadzCustomImage37DDeployed.address, CrypToadzCustomImage37EDeployed.address);
  if (!quiet) console.log("CrypToadzCustomImage37 linked with dependencies");

  await CrypToadzCustomImage4152Deployed.setAddresses(CrypToadzCustomImage4152ADeployed.address, CrypToadzCustomImage4152BDeployed.address);
  if (!quiet) console.log("CrypToadzCustomImage4152 linked with dependencies");

  await CrypToadzCustomImage4238Deployed.setAddresses(CrypToadzCustomImage4238ADeployed.address, CrypToadzCustomImage4238BDeployed.address);
  if (!quiet) console.log("CrypToadzCustomImage4238 linked with dependencies");

  await CrypToadzCustomImage4580Deployed.setAddresses(CrypToadzCustomImage4580ADeployed.address, CrypToadzCustomImage4580BDeployed.address);
  if (!quiet) console.log("CrypToadzCustomImage4580 linked with dependencies");

  await CrypToadzCustomImage466Deployed.setAddresses(CrypToadzCustomImage466ADeployed.address, CrypToadzCustomImage466BDeployed.address, CrypToadzCustomImage466CDeployed.address, CrypToadzCustomImage466DDeployed.address, CrypToadzCustomImage466EDeployed.address);
  if (!quiet) console.log("CrypToadzCustomImage466 linked with dependencies");

  await CrypToadzCustomImage4896Deployed.setAddresses(CrypToadzCustomImage4896ADeployed.address, CrypToadzCustomImage4896BDeployed.address, CrypToadzCustomImage4896CDeployed.address);
  if (!quiet) console.log("CrypToadzCustomImage4896 linked with dependencies");

  await CrypToadzCustomImage5471Deployed.setAddresses(CrypToadzCustomImage5471ADeployed.address, CrypToadzCustomImage5471BDeployed.address, CrypToadzCustomImage5471CDeployed.address);
  if (!quiet) console.log("CrypToadzCustomImage5471 linked with dependencies");

  await CrypToadzCustomImage5902Deployed.setAddresses(CrypToadzCustomImage5902ADeployed.address, CrypToadzCustomImage5902BDeployed.address);
  if (!quiet) console.log("CrypToadzCustomImage5902 linked with dependencies");

  await CrypToadzCustomImage6214Deployed.setAddresses(CrypToadzCustomImage6214ADeployed.address, CrypToadzCustomImage6214BDeployed.address);
  if (!quiet) console.log("CrypToadzCustomImage6214 linked with dependencies");

  await CrypToadzCustomImage6382Deployed.setAddresses(CrypToadzCustomImage6382ADeployed.address, CrypToadzCustomImage6382BDeployed.address);
  if (!quiet) console.log("CrypToadzCustomImage6382 linked with dependencies");

  await CrypToadzCustomImage916Deployed.setAddresses(CrypToadzCustomImage916ADeployed.address, CrypToadzCustomImage916BDeployed.address);
  if (!quiet) console.log("CrypToadzCustomImage916 linked with dependencies");

  await CrypToadzCustomImage936Deployed.setAddresses(CrypToadzCustomImage936ADeployed.address, CrypToadzCustomImage936BDeployed.address);
  if (!quiet) console.log("CrypToadzCustomImage936 linked with dependencies");

  await CrypToadzCustomImagesDeployed.setAddresses({
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
  })
  if (!quiet) console.log("CrypToadzCustomImages linked with dependencies");

  await CrypToadzCustomImage1943Deployed.setAddresses(CrypToadzCustomImage1943ADeployed.address, CrypToadzCustomImage1943BDeployed.address, CrypToadzCustomImage1943CDeployed.address, CrypToadzCustomImage1943DDeployed.address, CrypToadzCustomImage1943EDeployed.address);
  if (!quiet) console.log("CrypToadzCustomImage1943 linked with dependencies");

  await CrypToadzCustomImage318Deployed.setAddresses(CrypToadzCustomImage318ADeployed.address, CrypToadzCustomImage318BDeployed.address, CrypToadzCustomImage318CDeployed.address, CrypToadzCustomImage318DDeployed.address, CrypToadzCustomImage318EDeployed.address, CrypToadzCustomImage318FDeployed.address);
  if (!quiet) console.log("CrypToadzCustomImage318 linked with dependencies");

  await CrypToadzCustomImage3661Deployed.setAddresses(CrypToadzCustomImage3661ADeployed.address, CrypToadzCustomImage3661BDeployed.address, CrypToadzCustomImage3661CDeployed.address, CrypToadzCustomImage3661DDeployed.address, CrypToadzCustomImage3661EDeployed.address, CrypToadzCustomImage3661FDeployed.address, CrypToadzCustomImage3661GDeployed.address);
  if (!quiet) console.log("CrypToadzCustomImage3661 linked with dependencies");

  await CrypToadzCustomImage37Deployed.setAddresses(CrypToadzCustomImage37ADeployed.address, CrypToadzCustomImage37BDeployed.address, CrypToadzCustomImage37CDeployed.address, CrypToadzCustomImage37DDeployed.address, CrypToadzCustomImage37EDeployed.address, CrypToadzCustomImage37FDeployed.address);
  if (!quiet) console.log("CrypToadzCustomImage37 linked with dependencies");

  await CrypToadzCustomImage4035Deployed.setAddresses(CrypToadzCustomImage4035ADeployed.address, CrypToadzCustomImage4035BDeployed.address, CrypToadzCustomImage4035CDeployed.address, CrypToadzCustomImage4035DDeployed.address, CrypToadzCustomImage4035EDeployed.address, CrypToadzCustomImage4035FDeployed.address);
  if (!quiet) console.log("CrypToadzCustomImage4035 linked with dependencies");

  await CrypToadzCustomImage466Deployed.setAddresses(CrypToadzCustomImage466ADeployed.address, CrypToadzCustomImage466BDeployed.address, CrypToadzCustomImage466CDeployed.address, CrypToadzCustomImage466DDeployed.address, CrypToadzCustomImage466EDeployed.address, CrypToadzCustomImage466FDeployed.address);
  if (!quiet) console.log("CrypToadzCustomImage466 linked with dependencies");

  await CrypToadzCustomImage4911Deployed.setAddresses(CrypToadzCustomImage4911ADeployed.address, CrypToadzCustomImage4911BDeployed.address, CrypToadzCustomImage4911CDeployed.address, CrypToadzCustomImage4911DDeployed.address, CrypToadzCustomImage4911EDeployed.address, CrypToadzCustomImage4911FDeployed.address, CrypToadzCustomImage4911GDeployed.address);
  if (!quiet) console.log("CrypToadzCustomImage4911 linked with dependencies");

  await CrypToadzCustomAnimationsDeployed.setAddresses({
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
  if (!quiet) console.log("CrypToadzCustomAnimations linked with dependencies");

  await CrypToadzChainedDeployed.setStrings(CrypToadzStringsDeployed.address);
  await CrypToadzChainedDeployed.setMetadata(CrypToadzMetadataDeployed.address);
  await CrypToadzChainedDeployed.setCustomImages(CrypToadzCustomImagesDeployed.address);
  await CrypToadzChainedDeployed.setCustomAnimations(CrypToadzCustomAnimationsDeployed.address);
  await CrypToadzChainedDeployed.setBuilder(CrypToadzBuilderDeployed.address);
  if (!quiet) console.log("CrypToadzChained linked with dependencies");

  return CrypToadzChainedDeployed;
}


