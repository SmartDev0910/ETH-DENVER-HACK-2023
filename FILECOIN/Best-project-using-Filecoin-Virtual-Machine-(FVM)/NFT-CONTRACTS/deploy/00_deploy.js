require("hardhat-deploy")
require("hardhat-deploy-ethers")

const { networkConfig } = require("../helper-hardhat-config")

const private_key = network.config.accounts[0]
const deployerAddress = new ethers.Wallet(private_key, ethers.provider)
// Deploy function
module.exports = async ({ deployments }) => {

   
   console.log("Wallet Ethereum Address:", deployerAddress.address)
   const chainId = network.config.chainId
   const tokensToBeMinted = networkConfig[chainId]["tokensToBeMinted"]

   console.log();
   console.log(":: Start Deploying ZonuletNFT");
   const ZonuletNFT = await ethers.getContractFactory('ZonuletNFT');
   const ZonuletNFTInstance = await ZonuletNFT.deploy();

   console.log();
   console.log(":: Start Deploying ZonuletNFTLikes");
   const ZonuletNFTLikes = await ethers.getContractFactory('ZonuletNFTLikes');
   const ZonuletNFTLikesInstance = await ZonuletNFTLikes.deploy(ZonuletNFTInstance.address);

   console.log();
   console.log(":: Start Deploying ZonuletNFTSale");
   const ZonuletNFTSale = await ethers.getContractFactory('ZonuletNFTSale');
   const ZonuletNFTSaleInstance = await ZonuletNFTSale.deploy(ZonuletNFTInstance.address);

   console.log();
   console.log(":: Start Deploying ZonuletAvatars");
   const ZonuletAvatars = await ethers.getContractFactory('ZonuletAvatars');
   const ZonuletAvatarsInstance = await ZonuletAvatars.deploy();

   console.log();
   console.log(":: Start Deploying ZonuletVerified");
   const ZonuletVerified = await ethers.getContractFactory('ZonuletVerified');
   const ZonuletVerifiedInstance = await ZonuletVerified.deploy();

   console.log();
   console.log(":: Start Deploying ZonuletBlacklist");
   const ZonuletBlacklist = await ethers.getContractFactory('ZonuletBlacklist');
   const ZonuletBlacklistInstance = await ZonuletBlacklist.deploy();

   console.log();
   console.log(":: Start Deploying ZonuletZDEX");
   const ZonuletZDEX = await ethers.getContractFactory('ZonuletZDEX');
   const ZonuletZDEXInstance = await ZonuletZDEX.deploy();

   console.log();
   console.log(":: Start Deploying ZonuletOracleV2");
   const ZonuletOracleV2 = await ethers.getContractFactory('ZonuletOracleV2');
   const ZonuletOracleV2Instance = await ZonuletOracleV2.deploy();

   console.log();
   console.log(":: Start Deploying Multicall");
   const Multicall = await ethers.getContractFactory('Multicall');
   const MulticallInstance = await Multicall.deploy();

   console.log();     
   console.log("=============================================================================");
   console.log(`ZonuletNFT deployed to:         ${ZonuletNFTInstance.address}`);
   console.log(`ZonuletNFTSale deployed to:     ${ZonuletNFTSaleInstance.address}`);
   console.log(`ZonuletNFTLikes deployed to:    ${ZonuletNFTLikesInstance.address}`);
   console.log(`ZonuletAvatars deployed to :    ${ZonuletAvatarsInstance.address}`);
   console.log(`ZonuletVerified deployed to:    ${ZonuletVerifiedInstance.address}`);
   console.log(`ZonuletBlacklist deployed to:   ${ZonuletBlacklistInstance.address}`);
   console.log(`ZonuletZDEX deployed to:        ${ZonuletZDEXInstance.address}`);
   console.log(`ZonuletOracleV2 deployed to:    ${ZonuletOracleV2Instance.address}`);
   console.log(`Multicall deployed to:          ${MulticallInstance.address}`);
   console.log("=============================================================================");
   console.log("DONE");
}
