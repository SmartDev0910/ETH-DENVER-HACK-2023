import { useMemo, useEffect, useState, useCallback } from "react";
import { ethers } from "ethers";
import Token from "../abi/ERC20.json"
import { CONTRACTS } from "../constants"

export const useERC20 = (chainId, account, library, tick) => {

    let address
    switch (chainId) {
        case 534353:
            address = CONTRACTS.SCROLL.COLLATERAL_TOKEN
            break
        default:
            address = chainId
    }

    const erc20Contract = useMemo(() => {
        if (!account || !address || !library) {
            return
        }

        return new ethers.Contract(address, Token.abi, library.getSigner());
    }, [account, address, library])

    const [balance, setBalance] = useState("0");
    const [decimals, setDecimals] = useState()
    const [symbol, setSymbol] = useState("--")

    const getBalance = useCallback(
        async () => {
            try {
                const balance = await erc20Contract.balanceOf(account)
                return Number(ethers.utils.formatEther(balance)).toLocaleString()
            } catch (e) {
                return "0"
            }
        },
        [erc20Contract, account]
    );

    const getSymbol = useCallback(
        async () => {
            try {
                return await erc20Contract.symbol()
            } catch (e) {
                return "--"
            }
        },
        [erc20Contract, account]
    );

    const getDecimals = useCallback(
        async () => {
            try {
                const decimals = await erc20Contract.decimals()
                return Number(decimals)
            } catch (e) {
                return 0
            }
        },

        [erc20Contract, account]
    );


    const approve = useCallback(
        async (address) => {
            return await erc20Contract.approve(
                address,
                "9999999999999999999999999999"
            )
        },
        [erc20Contract, account]
    );

    const allowance =  useCallback(
        async (address) => {
            return await erc20Contract.allowance(
                account,
                address
            )
        },
        [erc20Contract, account]
    );

    const faucet =  useCallback(
        async () => {
            return await erc20Contract.faucet()
        },
        [erc20Contract, account]
    );

    useEffect(() => {
        erc20Contract && getBalance().then(setBalance);
        erc20Contract && getDecimals().then(setDecimals);
        erc20Contract && getSymbol().then(setSymbol);
    }, [account, getBalance, getDecimals, getSymbol, erc20Contract, tick]);

    return {
        balance,
        decimals,
        approve,
        address,
        symbol,
        allowance,
        faucet
    }
}