const { ethers } = require("hardhat")

const networkConfig = {
    3141: {
        name: "hyperspace",
        tokensToBeMinted: 10000000000000000000000000n.toString(),
    },
}

// const developmentChains = ["hardhat", "localhost"]

module.exports = {
    networkConfig,
    // developmentChains,
}
