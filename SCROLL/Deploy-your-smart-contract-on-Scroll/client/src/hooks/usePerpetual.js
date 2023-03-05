import { useMemo, useEffect, useState, useCallback } from "react";
import { ethers } from "ethers";
import Perpetual from "../abi/Perpetual.json"
import AMM from "../abi/AMM.json"
import { useERC20 } from "./useERC20"

const Side = {
    0 : "Flat",
    1 : "Short",
    2 : "Long"
}

export const usePerpetual = (perpetualAddress, ammAddress, account, library, tick) => {


    const { perpetualContract, ammContract } = useMemo(() => {
        if (!account || !perpetualAddress || !ammAddress || !library) {
            return {
                perpetualContract: null,
                ammContract: null
            }
        }

        return {
            perpetualContract: new ethers.Contract(perpetualAddress, Perpetual.abi, library.getSigner()),
            ammContract : new ethers.Contract(ammAddress, AMM.abi, library.getSigner())
        }

    }, [account, perpetualAddress, ammAddress, library])

    const [shareTokenAddress, setShareTokenAddress] = useState()
    const [indexPrice, setIndexPrice] = useState("--")
    const [markPrice, setMarkPrice] = useState("--")
    const [availableMargin, setAvailableMargin] = useState("--")
    const [status, setStatus] = useState("--")
    const [accumulatedFunding, setAccumulatedFunding] = useState("--")
    const [myDeposit, setMyDeposit] = useState("0")

    const shareToken = useERC20(shareTokenAddress, account, library, tick)

    const getStatus = useCallback(
        async () => {
            try {
                const result = await perpetualContract.status()
                switch (result) {
                    case 0:
                        return "Active"
                    case 1:
                        return "Emergency"
                    case 2:
                        return "Settlement"
                    default:
                        return "Unknown"
                }
            } catch (e) {
                return "Error"
            }
        },

        [perpetualContract, account]
    );

    const getShareTokenAddress = useCallback( async () => {
        try {
            return await ammContract.shareTokenAddress()
        } catch (e) {
            return null
        }

    },[ammContract, account])

    const getIndexPrice = useCallback(
        async () => {
            try {
                const result = await ammContract.indexPrice()
                return ethers.utils.formatEther(result.price)
            } catch (e) {
                return "0"
            }
        },

        [ammContract, account]
    );

    const getAccumulatedFunding = useCallback(
        async () => {
            try {
                const result = await ammContract.getAccumulatedFundingPerContract()
                return ethers.utils.formatEther(result)
            } catch (e) {
                return "0"
            }
        },

        [ammContract, account]
    );

    const getAvailableMargin = useCallback(
        async () => {
            try {
                const result = await ammContract.getAvailableMargin()
                return ethers.utils.formatEther(result)
            } catch (e) {
                return "0"
            }
        },

        [ammContract, account]
    );

    const getMarkPrice = useCallback(
        async () => {
            try {
                const output = await ammContract.getMarkPrice()
                return ethers.utils.formatEther(output)
            } catch (e) {
                return "0"
            }
        },

        [ammContract, account]
    );

    const getBuyPrice = useCallback(async (amount) => {
        const result = await ammContract.getBuyPricePublic(ethers.utils.parseEther(`${amount}`))
        return ethers.utils.formatEther(result)
    }, [ammContract, account])

    const getSellPrice = useCallback(async (amount) => {
        const result = await ammContract.getSellPricePublic(ethers.utils.parseEther(`${amount}`))
        return ethers.utils.formatEther(result)
    }, [ammContract, account])

    const deposit = useCallback(
        async (amount) => {
            return await perpetualContract.deposit(
                ethers.utils.parseEther(amount)
            )
        },
        [perpetualContract, account]
    );

    const withdraw = useCallback(
        async (amount) => {
            // TODO : increase gas price
            return await perpetualContract.withdraw(
                ethers.utils.parseEther(amount),
                {
                    // gasPrice: 70000000000
                }
            )
        },
        [perpetualContract, account]
    );

    const getDeposit = useCallback(async () => {
        const result = await perpetualContract.totalRawCollateral(account)
        return ethers.utils.formatEther(result)
    }, [perpetualContract, account])

    const getDeadline = () => {
        return ((new Date().valueOf() / 1000) + 86400)
    }

    const getCurrentPrice = useCallback(async () => {
        const result = await ammContract.getCurrentPricePublic()
        return ethers.utils.formatEther(result)
    }, [ammContract, account])

    const buy = useCallback(async (amount) => {
        // TODO : increase gas price
        return await ammContract.buy(ethers.utils.parseEther(`${amount}`), ethers.utils.parseEther(`50000`), 9999999999999, {
            // gasPrice: 70000000000
        })
    }, [ammContract, account])

    const sell = useCallback(async (amount) => {
        // TODO : increase gas price
        return await ammContract.sell(ethers.utils.parseEther(`${amount}`), 0, 9999999999999, {
            // gasPrice: 70000000000
        })
    }, [ammContract, account])

    const addLiquidity = useCallback(async (amount) => {
        // TODO : increase gas price
        return await ammContract.addLiquidity(ethers.utils.parseEther(`${amount}`), { 
            // gasPrice: 70000000000
        })
    }, [ammContract, account])

    const removeLiquidity = useCallback(async (lpAmount) => {
        // TODO : increase gas price
        return await ammContract.removeLiquidity(ethers.utils.parseEther(`${lpAmount}`), {
            // gasPrice: 70000000000
        })
    }, [ammContract, account])

    const getPosition =  useCallback(async () => {
        
        const size = await perpetualContract.getPositionSize(account)
        const side = await perpetualContract.getPositionSide(account)
        const positionEntryValue = await perpetualContract.getPositionEntryValue(account)

        let pnl = 0
        if (side === 2) {
            //long
            pnl = (Number(markPrice) * Number(ethers.utils.formatEther(size))) - Number(ethers.utils.formatEther(positionEntryValue))

        } else if (side === 1) {
            //short
            pnl = Number(ethers.utils.formatEther(positionEntryValue)) - (Number(markPrice) * Number(ethers.utils.formatEther(size)))
        }

        return {
            size : ethers.utils.formatEther(size),
            side : Side[side],
            rawSide : side,
            positionEntryValue : ethers.utils.formatEther(positionEntryValue),
            markPrice : markPrice,
            pnl
        }

    }, [perpetualContract, markPrice,  ammContract, account])


    useEffect(() => {

        ammContract && getIndexPrice().then(setIndexPrice)
        ammContract && getMarkPrice().then(setMarkPrice)
        ammContract && getAvailableMargin().then(setAvailableMargin)
        ammContract && getAccumulatedFunding().then(setAccumulatedFunding)
        perpetualContract && getStatus().then(setStatus)
        perpetualContract && getDeposit().then(setMyDeposit)
        ammContract && getShareTokenAddress().then(setShareTokenAddress)

    }, [account, ammContract, perpetualContract, tick])

    return {
        perpetualAddress,
        ammAddress,
        indexPrice,
        markPrice,
        status,
        availableMargin,
        accumulatedFunding,
        deposit,
        withdraw,
        myDeposit,
        getBuyPrice,
        getSellPrice,
        getCurrentPrice,
        buy,
        sell,
        addLiquidity,
        removeLiquidity,
        shareToken,
        getPosition
    }

}
