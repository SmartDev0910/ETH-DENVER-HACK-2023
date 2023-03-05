
import React, { useState, useCallback, useContext } from 'react';
import styled from "styled-components"
import { Alert, Button, Table } from "reactstrap"
import { useWeb3React } from '@web3-react/core'
import useInterval from "../../hooks/useInterval"
import { ContractsContext } from "../../hooks/useContracts"
import { useToasts } from "../../hooks/useToasts"
import { shortAddress, processingToast } from "../../utils"

const Wrapper = styled.div`
    border: 1px solid black;
    min-height: 200px;
    background: white;
    margin-top: 20px;

`

const Position = () => {

    const { chainId } = useWeb3React()

    const { collateralToken, djiPerpetual, increaseTick } = useContext(ContractsContext)

    const [position, setPosition] = useState()
    const [size, setSize] = useState(0)

    const { add, update } = useToasts()

    useInterval(() => {

        if (djiPerpetual) {

            (async () => {
                const position = await djiPerpetual.getPosition()
                setSize(position?.size)
                setPosition(position)
            })()
        }
    }, 3000)

    const onClosePosition = useCallback(async (side, size) => {

        if (side === 2) {
            //long, do short to close 
            const tx = await djiPerpetual.sell(size)
            const id = add(processingToast("Closing", "Your transaction is being processed", true, tx.hash, chainId))
            await tx.wait()
            update({
                id,
                ...processingToast("Closed", "Your transaction is completed", false, tx.hash, chainId)
            })
            increaseTick()
        } else if (side === 1) {
            const tx = await djiPerpetual.buy(size)
            const id = add(processingToast("Closing", "Your transaction is being processed", true, tx.hash, chainId))
            await tx.wait()
            update({
                id,
                ...processingToast("Closed", "Your transaction is completed", false, tx.hash, chainId)
            })
            increaseTick()
        }

    }, [djiPerpetual, chainId])

    return (
        <Wrapper>
            {!size || position?.rawSide === 0 ?
                <div style={{ textAlign: "center", marginTop: 80 }}>
                    You have no position
                </div>
                :
                <div style={{fontSize: 14}}>
                    <Table>
                        <thead>
                            <tr>
                                <th>Side</th>
                                <th>Position Size</th>
                                <th>Total Collateral</th>
                                <th>Entry Price</th>
                                <th>Profit</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">
                                    {position?.side}
                                </th>
                                <td>
                                    {position?.size}{` `}{djiPerpetual?.shareToken?.symbol}
                                </td>
                                <td>
                                    {(Number(position?.size)* Number(position?.markPrice)).toLocaleString()}{` `}{collateralToken?.symbol}
                                </td>
                                <td>
                                    {(Number(position?.positionEntryValue) / Number(position?.size)).toLocaleString()}{` `}{collateralToken?.symbol}
                                </td>
                                <td>
                                    {Number(position?.pnl) > 0 && "+"}{Number(position?.pnl).toLocaleString()}{` `}{collateralToken?.symbol}
                                </td>
                                <td>
                                    <Button onClick={() => onClosePosition(position.rawSide, Number(position.size))} color="secondary" size="sm">
                                        Close
                                    </Button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            }

        </Wrapper>
    )
}

export default Position