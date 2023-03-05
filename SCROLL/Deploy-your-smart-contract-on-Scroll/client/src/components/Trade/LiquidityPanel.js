import React, { useState, useCallback, useContext, useEffect } from 'react';
import styled from "styled-components"
import { Alert, Table, Container, FormGroup, Label, Nav, NavItem, NavLink, TabContent, TabPane, Jumbotron, Row, Col, Button, InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap"
import { Plus, DollarSign } from "react-feather"
import classnames from 'classnames';
import { useWeb3React } from '@web3-react/core'
import { Slider } from "../common"
import useInterval from "../../hooks/useInterval"
import { ContractsContext } from "../../hooks/useContracts"
import { useToasts } from "../../hooks/useToasts"
import { shortAddress, processingToast } from "../../utils"


const Wrapper = styled.div`

    button {
        :first-child {
            margin-right: 3px;
        }
    }

    h2 {
        margin: 0px;
        margin-top: 10px;
    }

    a {
        color: inherit;
        cursor: pointer;
    }

`

const Description = styled.div`
    font-size: 14px;
    margin-bottom: 10px;
    margin-top: 10px;
`

const Error = ({ errorMessage }) => {
    return (
        <div style={{ textAlign: "center", fontSize: 12, height: 30, fontWeight: 600, color: "red" }}>
            {errorMessage}
        </div>
    )
}

const LiquidityPanel = ({ account, setDepositModal, isMainnet, onFaucet }) => {

    const { chainId } = useWeb3React()

    const [side, setSide] = useState(0) // 0 - add, 1 - remove
    const { collateralToken, djiPerpetual, increaseTick } = useContext(ContractsContext)
    const [errorMessage, setErrorMessage] = useState()
    const [currentPrice, setCurrentPrice] = useState(0)
    const [amount, setAmount] = useState(0.001)
    const [approved, setApproved] = useState(false)

    const { add, update } = useToasts()

    useInterval(() => {

        if (djiPerpetual) {

            (async () => {

                let errorCount = 0

                try {
                    const price = await djiPerpetual.getCurrentPrice(amount)
                    setCurrentPrice(Number(price))
                } catch (e) {
                    console.log(e)
                    errorCount += 1
                    setErrorMessage("Can't fetch current price from Pool")
                }

                if (errorCount === 0) {
                    setErrorMessage()
                }
            })()

        }

    }, 3000)

    useEffect(() => {
        if (djiPerpetual && djiPerpetual.shareToken) {

            djiPerpetual.shareToken.allowance(djiPerpetual.ammAddress).then(
                result => {
                    if (Number(result) > 0) {
                        setApproved(true)
                    }
                }
            )

        }
    }, [djiPerpetual, account])

    const handleChange = (e) => {
        setAmount(Number(e.target.value))
    }

    const onAddLiquidity = useCallback(async () => {

        if (amount > 0) {
            const tx = await djiPerpetual.addLiquidity(amount)
            const id = add(processingToast("Adding liquidity", "Your transaction is being processed", true, tx.hash, chainId))
            try {
                await tx.wait()
                update({
                    id,
                    ...processingToast("Added", "Your transaction is completed", false, tx.hash, chainId)
                })
                increaseTick()
            } catch (e) {
                alert("out of gas error - please try again")
            }

        }

    }, [amount, djiPerpetual, chainId])

    const onRemoveLiquidity = useCallback(async () => {

        if (amount > 0) {
            const tx = await djiPerpetual.removeLiquidity(amount)
            const id = add(processingToast("Removing liquidity", "Your transaction is being processed", true, tx.hash, chainId))

            try {
                await tx.wait()
                update({
                    id,
                    ...processingToast("Removed", "Your transaction is completed", false, tx.hash, chainId)
                })
                increaseTick()
            } catch (e) {
                alert("out of gas error - please try again")
            }


        }

    }, [amount, djiPerpetual, chainId])

    const onApprove = useCallback(async () => {

        const tx = await djiPerpetual.shareToken.approve(djiPerpetual.ammAddress)
        const id = add(processingToast("Approving", "Your transaction is being processed", true, tx.hash, chainId))
        await tx.wait()
        setApproved(true)
        update({
            id,
            ...processingToast("Approved", "Your transaction is completed", false, tx.hash, chainId)
        })

    }, [djiPerpetual, chainId])

    return (
        <Wrapper>
            <Description>
                Provide liquidity to the pool, help reduce slippage and earn profit from spread. The reward will be provided soon.
            </Description>
            <div>
                <Table>
                    <tbody>
                        <tr>
                            <th scope="row">
                                <div style={{ marginTop: 3 }}>Your Balance</div>
                            </th>
                            <td style={{ display: "flex", flexDirection: "row" }}>
                                <div style={{ marginTop: 3 }}>{collateralToken.balance}{` `}{collateralToken.symbol}</div>
                                {!isMainnet && (
                                    <Button onClick={onFaucet} style={{ marginLeft: 5 }} color="info" size="sm">
                                        <DollarSign size={16} />
                                    </Button>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <div style={{ marginTop: 3 }}>Your Deposit</div>
                            </th>
                            <td style={{ display: "flex", flexDirection: "row" }}>
                                <div style={{ marginTop: 3 }}>{Number(djiPerpetual.myDeposit).toLocaleString()}{` `}{collateralToken.symbol}</div>
                                <Button onClick={() => setDepositModal(true)} style={{ marginLeft: 5 }} color="info" size="sm">
                                    <Plus size={16} />
                                </Button>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                Your LP Token
                            </th>
                            <td>
                                {Number(djiPerpetual?.shareToken?.balance).toLocaleString()}{` `}{djiPerpetual?.shareToken?.symbol}
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({ active: side === 0 })}
                        onClick={() => setSide(0)}
                    >
                        Add
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: side === 1 })}
                        onClick={() => setSide(1)}
                    >
                        Remove
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent style={{ paddingTop: 20 }} activeTab={`${side}`}>
                <TabPane tabId="0">
                    <Row>
                        <Col xs="12">
                            <FormGroup>
                                <Label for="currentPrice1">Price</Label>
                                <InputGroup>
                                    <Input value={currentPrice.toLocaleString()} type="text" disabled name="currentPrice1" id="currentPrice1" />
                                    <InputGroupAddon addonType="append">MUSD</InputGroupAddon>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                            <FormGroup>
                                <Label for="addAmount">Amount</Label>
                                <InputGroup>
                                    <Input step="0.0001" value={amount} onChange={handleChange} type="number" name="addAmount" id="addAmount" />
                                    <InputGroupAddon addonType="append">
                                        {djiPerpetual?.shareToken?.symbol}
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>

                    <div>
                        <Table>
                            <tbody>
                                <tr>
                                    <th scope="row">
                                        <div>Total {collateralToken.symbol}</div>
                                    </th>
                                    <td>
                                        {(2 * amount * currentPrice).toLocaleString()}
                                    </td>
                                </tr>

                            </tbody>
                        </Table>
                    </div>

                    <Error errorMessage={errorMessage} />

                    <Button disabled={Number(djiPerpetual.myDeposit) < amount} onClick={onAddLiquidity} style={{ marginBottom: 20 }} color="info" block>Add</Button>
                </TabPane>
                <TabPane tabId="1">
                    {/* Remove */}
                    <Row>
                        <Col xs="12">
                            <FormGroup>
                                <Label for="currentPrice2">Price</Label>
                                <InputGroup>
                                    <Input value={currentPrice.toLocaleString()} type="text" disabled name="currentPrice2" id="currentPrice2" />
                                    <InputGroupAddon addonType="append">
                                        {collateralToken.symbol}
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                            <FormGroup>
                                <Label for="removeAmount">Amount</Label>
                                <InputGroup>
                                    <Input step="0.0001" value={amount} onChange={handleChange} type="number" name="removeAmount" id="removeAmount" />
                                    <InputGroupAddon addonType="append">
                                        {djiPerpetual?.shareToken?.symbol}
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Error errorMessage={errorMessage} />

                    <Button onClick={onApprove} disabled={approved} color="info" block>Approve</Button>
                    <Button disabled={!approved} onClick={onRemoveLiquidity} style={{ marginBottom: 20 }} color="primary" block>Remove</Button>
                </TabPane>
            </TabContent>
        </Wrapper>
    )
}

export default LiquidityPanel