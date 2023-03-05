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
   console.log(":: Start Deploying DexSwapZonu");
   const DexSwapZonu = await ethers.getContractFactory('Dezu');
   const DexSwapZonuInstance = await DexSwapZonu.deploy(tokensToBeMinted);

   console.log();
   console.log(":: DEPLOY WETH");
   const wETH = await ethers.getContractFactory('WETH');
   const WETHInstance = await wETH.deploy();

   console.log();
   console.log(":: Start Deploying DexSwapLP");
   const DexSwapLP = await ethers.getContractFactory('DexSwap');
   const DexSwapLPInstance = await DexSwapLP.deploy();

   console.log();
   console.log(":: Deploying Factory");
   const DexSwapFactory = await ethers.getContractFactory('DexSwapFactory');
   const DexSwapFactoryInstance = await DexSwapFactory.deploy(deployerAddress.address);

   console.log();
   console.log(":: Start Deploying FeeReceiver");
   const DexSwapFeeReceiver = await ethers.getContractFactory('DexSwapFeeReceiver');
   const DexSwapFeeReceiverInstance =  await DexSwapFeeReceiver.deploy(deployerAddress.address, DexSwapFactoryInstance.address, WETHInstance.address, DexSwapZonuInstance.address, deployerAddress.address);

   console.log();
   console.log(":: Start Deploying FeeSetter");
   const DexSwapFeeSetter = await ethers.getContractFactory('DexSwapFeeSetter');
   const DexSwapFeeSetterInstance = await DexSwapFeeSetter.deploy(deployerAddress.address, DexSwapFactoryInstance.address);

   console.log();
   console.log(":: Setting Correct FeeSetter in Factory");
   await DexSwapFactoryInstance.setFeeToSetter(DexSwapFeeSetterInstance.address);

   console.log();
   console.log(":: Transfer Ownership FeeReceiver");
   await DexSwapFeeReceiverInstance.transferOwnership(deployerAddress.address);

   console.log();
   console.log(":: Transfer Ownership FeeSetter");
   await DexSwapFeeSetterInstance.transferOwnership(deployerAddress.address);

   console.log();
   console.log(":: Updating Protocol FeeReceiver");
   await DexSwapFeeReceiverInstance.changeReceivers(DexSwapZonuInstance.address, deployerAddress.address, {from: deployerAddress.address});
   
   console.log();     
   console.log("=============================================================================");
   console.log(`WETH deployed to:               ${WETHInstance.address}`);
   console.log(`DexSwapZonu deployed to:        ${DexSwapZonuInstance.address}`);
   console.log(`DexSwapLP deployed to :         ${DexSwapLPInstance.address}`);
   console.log(`DexSwapFactory deployed to:     ${DexSwapFactoryInstance.address}`);
   console.log(`DexSwapFeeReceiver deployed to: ${DexSwapFeeReceiverInstance.address}`);
   console.log(`DexSwapFeeSetter deployed to :  ${DexSwapFeeSetterInstance.address}`);
   console.log(`Code Hash:`, await DexSwapFactoryInstance.INIT_CODE_PAIR_HASH());
   console.log("=============================================================================");
   console.log("DONE");
}
