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

    const TokenDividen = await ethers.getContractFactory("ZoNuletDividendTracker", {
        libraries: {
          IterableMapping: IterableMappingInstance.address
        }
    });

    const TokenZonulet = await ethers.getContractFactory("ZoNulet",  {
        libraries: {
          IterableMapping: IterableMappingInstance.address
        }
    });

    const tokenDividen = await TokenDividen.deploy();
    await tokenDividen.deployed();
  
    const tokenZonulet = await TokenZonulet.deploy();
    await tokenZonulet.deployed();

    console.log("=============================================================================")
    console.log(`IterableMappingLibrary deployed to:  ${IterableMappingInstance.address}`)
    console.log(`ZoNuletDividendTracker deployed to:  ${tokenDividen.address}`)
    console.log(`ZoNulet deployed to:                 ${tokenZonulet.address}`)
    console.log("=============================================================================")
    console.log("DONE")
}
