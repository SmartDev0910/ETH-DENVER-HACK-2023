require("@nomicfoundation/hardhat-toolbox")
require("hardhat-deploy")
require("hardhat-deploy-ethers")
// require("./tasks")
require("dotenv").config()

const PRIVATE_KEY = process.env.PRIVATE_KEY

module.exports = {
    defaultNetwork: "hardhat",

    networks: {
        hardhat: {},
        mainnet: {
            url: "https://api.s0.t.hmny.io",
            accounts: [PRIVATE_KEY],
            chainId: 1666600000,
            network_id: "1666600000",
        },
        testnet: {
            url: "https://api.s0.b.hmny.io",
            accounts: [PRIVATE_KEY],
            chainId: 1666700000,
            network_id: "1666700000",
        },
        scrollTestnet: {
            url: "https://alpha-rpc.scroll.io/l2",
            accounts: [PRIVATE_KEY],
            chainId: 534353,
            network_id: "534353",
        },
        hyperspace: {
            url: "https://api.hyperspace.node.glif.io/rpc/v1",
            accounts: [PRIVATE_KEY],
            chainId: 3141,
        },
    },
    solidity: {
        compilers: [
            {
                version: "0.5.16",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
            {
                version: "0.6.6",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
            {
                version: "0.6.12",
                settings: {
                  optimizer: {
                    enabled: true,
                    runs: 200
                  }
                }
              },
        ],
    },
    paths: {
        sources: "./contracts",
        cache: "./cache",
        artifacts: "./artifacts",
    },
    mocha: {
        timeout: 20000,
    },
}
