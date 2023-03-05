import React, { useEffect, useMemo, useReducer, createContext, useState, useCallback } from 'react';
import { Web3ReactProvider, useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { ethers } from "ethers";
import { useERC20 } from "./useERC20"
import { usePerpetual } from "./usePerpetual"
import { CONTRACTS } from "../constants"

export const ContractsContext = createContext({});

const Provider = ({ children }) => {

    const context = useWeb3React()
    const { chainId, account, active, error, library } = context

    const [tick, setTick] = useState(0)

    const collateralToken = useERC20(chainId, account, library, tick)

    // Only DJI
    let perpetualAddress
    let ammAddress

    switch (chainId) {

        case 534353:
            perpetualAddress = CONTRACTS?.SCROLL?.PERPETUAL
            ammAddress = CONTRACTS?.SCROLL?.AMM
            break;
    }

    const increaseTick = useCallback(() => {
        setTick(tick+1)
    }, [tick])

    const djiPerpetual = usePerpetual(perpetualAddress, ammAddress, account, library, tick)

    const contractsContext = useMemo(
        () => ({
            collateralToken,
            djiPerpetual,
            increaseTick
        }),
        [collateralToken, djiPerpetual, increaseTick]
    );

    return (
        <ContractsContext.Provider value={contractsContext}>
            {children}
        </ContractsContext.Provider>
    )
}

export default Provider
