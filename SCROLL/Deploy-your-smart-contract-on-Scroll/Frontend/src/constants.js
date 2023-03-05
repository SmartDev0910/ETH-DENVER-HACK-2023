
export const NODE_URL = {
    SCROLL: "https://alpha-rpc.scroll.io/l2",
    MUMBAI: "https://matic-mumbai.chainstacklabs.com",
    LOCALHOST: "http://localhost:8545"
}

export const CONTRACTS = {
    SCROLL: {
        COLLATERAL_TOKEN: process.env.REACT_APP_COLLATERAL_TOKEN_ADDRESS,
        PERPETUAL: process.env.REACT_APP_PERPETUAL_ADDRESS,
        AMM: process.env.REACT_APP_AMM_ADDRESS
    },
    MUMBAI :{
        COLLATERAL_TOKEN: "0x800F85756B007be98f906e23F1665af89CBA92Fa", 
        PERPETUAL: "0x8B578913521e9098fba5F8fdCeb519D8Abf9f1B9",
        AMM: "0xC22E0bB7A0fc543c7659A36Eac19776a04AcD6Ee"
    },
    LOCALHOST: {
        COLLATERAL_TOKEN: process.env.REACT_APP_COLLATERAL_TOKEN_ADDRESS,
        PERPETUAL: process.env.REACT_APP_PERPETUAL_ADDRESS,
        AMM: process.env.REACT_APP_AMM_ADDRESS
    }
}