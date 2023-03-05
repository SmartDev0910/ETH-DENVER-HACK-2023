require("hardhat-deploy")
require("hardhat-deploy-ethers")

const private_key = network.config.accounts[0]
const deployerAddress = new ethers.Wallet(private_key, ethers.provider)
// Deploy function
module.exports = async ({ deployments }) => {
  
    console.log("Wallet Ethereum Address:", deployerAddress.address)

    const IterableMapping = await ethers.getContractFactory("IterableMapping");
    const IterableMappingInstance = await IterableMapping.deploy();
    await IterableMappingInstance.deployed();

    const TokenDividen = await ethers.getContractFactory("ZoNugemDividendTracker", {
        libraries: {
          IterableMapping: IterableMappingInstance.address
        }
    });

    const TokenZoNugem = await ethers.getContractFactory("ZoNugem", {
      libraries: {
        IterableMapping: IterableMappingInstance.address
      }
    });

    const tokenDividen = await TokenDividen.deploy();
    await tokenDividen.deployed();
  
    const tokenZoNugem = await TokenZoNugem.deploy();
    await tokenZoNugem.deployed();

    console.log("=============================================================================")
    console.log(`IterableMappingLibrary deployed to:  ${IterableMappingInstance.address}`)
    console.log(`ZoNuletDividendTracker deployed to:  ${tokenDividen.address}`)
    console.log(`ZoNugem deployed to:                 ${tokenZoNugem.address}`)
    console.log("=============================================================================")
    console.log("DONE")
}
