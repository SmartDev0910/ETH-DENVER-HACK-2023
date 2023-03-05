import React, { useState, useCallback, useContext, useEffect } from 'react';
import styled from "styled-components"
import {
    Alert,
    Table,
    Container,
    Jumbotron,
    Nav,
    Form,
    InputGroupAddon,
    InputGroupText,
    FormGroup,
    Label,
    NavItem,
    TabContent,
    TabPane,
    TabItem,
    NavLink,
    Row,
    Col,
    Button,
    InputGroup,
    Input,
    Modal,
    Spinner,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap"
import { Plus, DollarSign } from "react-feather"
import { useWeb3React } from '@web3-react/core'
import classnames from 'classnames';
import useInterval from "../../hooks/useInterval"
import { Slider } from "../common"
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

const TradePanel = ({ setDepositModal, isMainnet, onFaucet }) => {

    const { chainId } = useWeb3React()

    const [side, setSide] = useState(0) // 0 - long, 1 - short

    const [amount, setAmount] = useState(0.001)
    const [errorMessage, setErrorMessage] = useState()

    const { collateralToken, djiPerpetual, increaseTick } = useContext(ContractsContext)
    const [buyPrice, setBuyPrice] = useState(0)
    const [sellPrice, setSellPrice] = useState(0)
    const [leverage, setLeverage] = useState(0)

    const { add, update } = useToasts()

    useInterval(() => {

        if (djiPerpetual && amount > 0) {

            (async () => {

                let errorCount = 0
                let buyPrice = 1
                let sellPrice = 1

                try {
                    buyPrice = await djiPerpetual.getBuyPrice(amount)
                    setBuyPrice(Number(buyPrice))
                } catch (e) {
                    errorCount += 1
                    setErrorMessage("Price Error - Please reduce collateral size")
                }

                try {
                    sellPrice = await djiPerpetual.getSellPrice(amount)
                    setSellPrice(Number(sellPrice))
                } catch (e) {
                    errorCount += 1
                    setErrorMessage("Price Error - Please reduce collateral size")
                }

                if (errorCount === 0) {
                    setErrorMessage()
                }

                if (side === 0) {
                    const leverage = Number(djiPerpetual.markPrice) / Number(buyPrice)
                    setLeverage(leverage)
                }

                if (side === 1) {
                    const leverage = 1 / (Number(djiPerpetual.markPrice) / Number(sellPrice))
                    setLeverage(leverage)
                }

            })()

        }

    }, 3000)



    const handleChange = (e) => {
        setAmount(Number(e.target.value))
    }

    const onBuy = useCallback(async () => {

        const tx = await djiPerpetual.buy(amount)
        const id = add(processingToast("Buying", "Your transaction is being processed", true, tx.hash, chainId))
        try {
            await tx.wait()
            update({
                id,
                ...processingToast("Completed", "Your transaction is completed", false, tx.hash, chainId)
            })
            increaseTick()
        } catch (e) {
            alert("out of gas error - please try again")
        }


    }, [djiPerpetual, amount, chainId])

    const onSell = useCallback(async () => {

        const tx = await djiPerpetual.sell(amount)
        const id = add(processingToast("Selling", "Your transaction is being processed", true, tx.hash, chainId))
        try {
            await tx.wait()
            update({
                id,
                ...processingToast("Completed", "Your transaction is completed", false, tx.hash, chainId)
            })
            increaseTick()
        } catch (e) {
            alert("out of gas error - please try again")
        }


    }, [djiPerpetual, amount, chainId])

    return (
        <>
            <Wrapper>
                <Description>
                    You can easily short or long on the index via perpetual contract which has funding settlement at near real-time basis.
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
                            {/* <tr>
                                <th scope="row">
                                    <div>Leverage</div>
                                </th>
                                <td>
                                    0.0x
                                </td>
                            </tr> */}
                        </tbody>
                    </Table>
                </div>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: side === 0 })}
                            onClick={() => setSide(0)}
                        >
                            Long
                    </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: side === 1 })}
                            onClick={() => setSide(1)}
                        >
                            Short
                    </NavLink>
                    </NavItem>
                </Nav>
                <TabContent style={{ paddingTop: 20 }} activeTab={`${side}`}>
                    <TabPane tabId="0">
                        {/* Long */}
                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    <Label for="buyPrice">Price</Label>
                                    <InputGroup>
                                        <Input value={buyPrice.toLocaleString()} type="text" disabled name="buyPrice" id="buyPrice" />
                                        <InputGroupAddon addonType="append">
                                            {collateralToken?.symbol}
                                        </InputGroupAddon>
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    <Label for="buyAmount">Amount</Label>
                                    <InputGroup>
                                        <Input step="0.0001" value={amount} onChange={handleChange} type="number" name="buyAmount" id="buyAmount" />
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
                                            {(amount * buyPrice).toLocaleString()}
                                        </td>
                                    </tr>
                                    {/* <tr>
                                        <th scope="row">
                                            <div>Leverage</div>
                                        </th>
                                        <td>
                                            {Number(leverage).toLocaleString()}x
                                        </td>
                                    </tr> */}
                                </tbody>
                            </Table>
                        </div>

                        <Error errorMessage={errorMessage} />

                        <Button onClick={onBuy} disabled={Number(djiPerpetual.myDeposit) === 0} style={{ marginBottom: 20 }} color="info" block>Long</Button>
                    </TabPane>
                    <TabPane tabId="1">
                        {/* Short */}
                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    <Label for="shortPrice">Price</Label>
                                    <InputGroup>
                                        <Input value={sellPrice.toLocaleString()} type="text" disabled name="shortPrice" id="shortPrice" />
                                        <InputGroupAddon addonType="append">
                                            {collateralToken?.symbol}
                                        </InputGroupAddon>
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    <Label for="shortAmount">Amount</Label>
                                    <InputGroup>
                                        <Input step="0.0001" value={amount} onChange={handleChange} type="number" name="shortAmount" id="shortAmount" />
                                        <InputGroupAddon addonType="append">
                                            {djiPerpetual?.shareToken?.symbol}
                                        </InputGroupAddon>
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                        </Row>
                        {/* <Row>
                            <Col xs="12">
                                <FormGroup>
                                    <Label for="leverage">Leverage</Label>
                                    <Slider />
                                    <p>1.5x</p>
                                </FormGroup>
                            </Col>
                        </Row> */}
                        <div>
                            <Table>
                                <tbody>
                                    <tr>
                                        <th scope="row">
                                            <div>Total {collateralToken.symbol}</div>
                                        </th>
                                        <td>
                                            {(amount * sellPrice).toLocaleString()}
                                        </td>
                                    </tr>
                                    {/* <tr>
                                        <th scope="row">
                                            <div>Leverage</div>
                                        </th>
                                        <td>
                                            {Number(leverage).toLocaleString()}x
                                        </td>
                                    </tr> */}
                                </tbody>
                            </Table>
                        </div>

                        <Error errorMessage={errorMessage} />

                        <Button onClick={onSell} disabled={Number(djiPerpetual.myDeposit) === 0} style={{ marginBottom: 20 }} color="info" block>Short</Button>
                    </TabPane>
                </TabContent>
            </Wrapper>

        </>
    )
}




export default TradePanel