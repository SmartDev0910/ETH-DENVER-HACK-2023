require("hardhat-deploy")
require("hardhat-deploy-ethers")

const private_key = network.config.accounts[0]
const deployerAddress = new ethers.Wallet(private_key, ethers.provider)
// Deploy function
module.exports = async ({ deployments }) => {
    console.log("Wallet Ethereum Address:", deployerAddress.address)

    const WETHInstance = "0x3467C3Ed08e806C12E713C3951139c29fb4946b5"
    const DexSwapFactoryInstance = "0x978ab5Fa3FbF9ceaB847b05AAb40A1A9E83389d9"

    //Deploy Router
    console.log()
    console.log(":: DEPLOY ROUTER")
    const DexSwapRouter = await ethers.getContractFactory("DexSwapRouter")
    const DexSwapRouterInstance = await DexSwapRouter.deploy(DexSwapFactoryInstance, WETHInstance)

    console.log("=============================================================================")
    console.log(`DexSwapRouter deployed to:  ${DexSwapRouterInstance.address}`)
    console.log("=============================================================================")
    console.log("DONE")
}
