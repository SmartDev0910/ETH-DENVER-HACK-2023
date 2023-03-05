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
   console.log(":: Start Deploying MFIL");
   const MFIL = await ethers.getContractFactory('MFIL');
   const MFILInstance = await MFIL.deploy();

   console.log();
   console.log(":: Start Deploying WBNB");
   const WBNB = await ethers.getContractFactory('WBNB');
   const WBNBInstance = await WBNB.deploy();

   console.log();
   console.log(":: Start Deploying WBTC");
   const WBTC = await ethers.getContractFactory('WBTC');
   const WBTCInstance = await WBTC.deploy();

   console.log();
   console.log(":: Start Deploying USDT");
   const USDT = await ethers.getContractFactory('USDT');
   const USDTInstance = await USDT.deploy();

   console.log();
   console.log(":: Start Deploying USDC");
   const USDC = await ethers.getContractFactory('USDC');
   const USDCInstance = await USDC.deploy();

   console.log("MINT WBTC <> USDT <> USDC <> WBNB <> MOCK FILECOIN");
   await WBNBInstance.mint(deployerAddress.address, tokensToBeMinted, { from: deployerAddress.address }); 
   await WBTCInstance.mint(deployerAddress.address, tokensToBeMinted, { from: deployerAddress.address });
   await USDTInstance.mint(deployerAddress.address, tokensToBeMinted, { from: deployerAddress.address });
   await USDCInstance.mint(deployerAddress.address, tokensToBeMinted, { from: deployerAddress.address }); 
   await MFILInstance.mint(deployerAddress.address, tokensToBeMinted, { from: deployerAddress.address }); 
   console.log();

   console.log("=============================================================================");
   console.log(`WBNB deployed to:     ${WBNBInstance.address}`);
   console.log(`WBTC deployed to:     ${WBTCInstance.address}`);
   console.log(`USDT deployed to:     ${USDTInstance.address}`);
   console.log(`USDC deployed to:     ${USDCInstance.address}`);
   console.log(`MFIL deployed to:     ${MFILInstance.address}`);
   console.log("=============================================================================");
   console.log("DONE");
}
