import React, { useState, useCallback, useContext, useEffect } from 'react';
import styled from "styled-components"
import { 
    Alert, 
    Container, 
    Jumbotron, 
    Row, 
    Col, 
    Button, 
    InputGroup, 
    InputGroupAddon, 
    InputGroupText, 
    Input,
    Nav,
    NavItem, 
    TabPane, 
    NavLink,
    TabItem,
    TabContent,
    Modal,
    Spinner,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Label,
    FormGroup

} from "reactstrap"
import { useWeb3React } from '@web3-react/core'
import TradingViewWidget from 'react-tradingview-widget';
import Position from "./Position"
import LiquidityPanel from "./LiquidityPanel"
import TradePanel from "./TradePanel"
import classnames from 'classnames';
import { ContractsContext } from "../../hooks/useContracts"
import { Slider } from "../common"
import { useToasts } from "../../hooks/useToasts"
import { shortAddress, processingToast } from "../../utils"


const Wrapper = styled.div` 

    h2 {
        font-size: 24px;
        margin-top: 20px;
        margin-bottom: 20px;
        select {
            margin-left: 20px;
            font-size: 14px;
        }
    }

`

const StyledCol = styled(Col)`

`

const Card = styled.div`
    border: 1px solid black;
    padding: 10px; 
`

const TradingViewContainer = styled.div`
    height: 400px;
`

const Tab = styled.div`
    overflow: hidden;
    border: 1px solid black;
    background-color: #f1f1f1;  
`

const CustomTabItem = styled.div`
    background-color: inherit;
    float: left;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 14px 16px;
    transition: 0.3s;
    color: inherit; 

    ${props => props.active ? `
        background-color: black;
        color: white;
        :hover {
            color: white;
        }
        
    ` : `
        :hover {
            background-color: #ddd; 
            color: inherit;
        }
    `}

`

const CustomTabContent = styled.div`
     
    padding: 6px 12px;
    border: 1px solid black;
    border-top: none; 
    background: white;
`

const Stats = styled(Row)`
    margin-top: 20px;
    margin-bottom: 20px;
`

const StatItem = styled(Col).attrs(props => ({
    xs: props.xs ? props.xs : "2"
}))`
    
    h4 {
        margin: 0px;
        font-size: 16px;
    }
    p {
        margin: 0px;
    }

`

const Trade = () => {

    
    const { chainId, account } = useWeb3React()

    const [panel, setPanel] = useState(0) // 0 - Trade , 1 - Liquidity
    const [depositModal, setDepositModal] = useState(false)
    const { djiPerpetual, collateralToken, increaseTick } = useContext(ContractsContext)

    const { add, update } = useToasts()

    const toggleModal = useCallback(() => { 
        setDepositModal(!depositModal)
    }, [depositModal])

    const onFaucet = useCallback(async () => {
        const tx = await collateralToken.faucet()
        const id = add(processingToast("Requesting tokens", "Your transaction is being processed", true, tx.hash, chainId))
        await tx.wait()
        update({
            id,
            ...processingToast("Received", "Your transaction is completed", false, tx.hash, chainId)
        })

        increaseTick()
    },[collateralToken, chainId])

    const isMainnet = chainId ? chainId === 534353 : false

    return (
        <>
            <Wrapper>
                <h2>
                    Dow Scroll Index
                <select>
                        <option>Dow Scroll Index</option>
                        <option disabled>Hang Seng Index</option>
                        <option disabled>Nikkei 225</option>
                    </select>
                </h2>
                <Stats>
                    <StatItem>
                        <h4>
                            Status
                        </h4>
                        <p>{djiPerpetual.status}</p>
                    </StatItem>
                    <StatItem>
                        <h4>
                            Index Price
                        </h4>
                        <p>{Number(djiPerpetual.indexPrice).toLocaleString()}{` `}{collateralToken.symbol}</p>
                    </StatItem>
                    <StatItem>
                        <h4>
                            Mark Price
                        </h4>
                        <p>{Number(djiPerpetual.markPrice).toLocaleString()}{` `}{collateralToken.symbol}</p>
                    </StatItem>
                    <StatItem>
                        <h4>
                            Available Margin
                        </h4>
                        <p>{Number(djiPerpetual.availableMargin).toLocaleString()}{` `}{collateralToken.symbol}</p>
                    </StatItem>
                    <StatItem xs="4">
                        <h4>
                            Accumulated Funding / 8hrs.
                    </h4>
                        <p>{Number(djiPerpetual.accumulatedFunding) >= 0 ? "+" : "-"}{Number(djiPerpetual.accumulatedFunding).toLocaleString()}{` `}{collateralToken.symbol}</p>
                    </StatItem>
                </Stats>
                <Row style={{marginBottom: 40}}>
                    <StyledCol xs="4">
                        <Tab>
                            <CustomTabItem active={panel === 0} onClick={() => setPanel(0)}>Trade</CustomTabItem>
                            <CustomTabItem active={panel === 1} onClick={() => setPanel(1)} >Liquidity</CustomTabItem>
                        </Tab>
                        <CustomTabContent>
                            {panel === 0 && <TradePanel account={account} isMainnet={isMainnet} onFaucet={onFaucet} setDepositModal={setDepositModal} />}
                            {panel === 1 && <LiquidityPanel  account={account} isMainnet={isMainnet} onFaucet={onFaucet} setDepositModal={setDepositModal} />}
                        </CustomTabContent>
                    </StyledCol>
                    <StyledCol xs="8">
                        <TradingViewContainer>
                            <TradingViewWidget symbol="ETH" autosize />
                        </TradingViewContainer>
                        <Position />
                    </StyledCol>
                </Row>
            </Wrapper>
            <DepositModal
                depositModal={depositModal}
                toggleModal={toggleModal}
                account={account}
                chainId={chainId}
            />
        </>
    )
}



const StyledModalBody = styled(ModalBody)`

    a {
        color: inherit;
        cursor: pointer;
    }

    p {
        font-size: 14px;
        margin-top: 5px;
    }

`


const DepositModal = ({ chainId, account, depositModal, toggleModal }) => {

    const [side, setSide] = useState(0) // 0 - Deposit , 1 - Withdraw
    const [amount, setAmount] = useState(0)
    const { djiPerpetual, collateralToken, increaseTick } = useContext(ContractsContext)
    const [approved, setApproved] = useState(false)

    const { add, update } = useToasts()

    const handleChange = (e) => {
        setAmount(Number(e.target.value))
    }

    useEffect(() => {
        if (djiPerpetual && collateralToken && djiPerpetual.perpetualAddress) {

            collateralToken.allowance(djiPerpetual.perpetualAddress).then(
                result => {
                    if (Number(result) > 0) {
                        setApproved(true)
                    }
                }
            )

        }
    }, [collateralToken, djiPerpetual, account])

    const onDeposit = useCallback(async () => {

        if (Number(amount) > 0) {
            const tx = await djiPerpetual.deposit(`${amount}`)
            toggleModal()
            const id = add(processingToast("Depositing", "Your transaction is being processed", true, tx.hash, chainId))
            await tx.wait()
            update({
                id,
                ...processingToast("Deposited", "Your transaction is completed", false, tx.hash, chainId)
            })

            increaseTick()

        }

    }, [amount, djiPerpetual, chainId])

    const onWithdraw = useCallback(async () => {

        if (Number(amount) > 0) {
            const tx = await djiPerpetual.withdraw(`${amount}`)
            toggleModal()
            const id = add(processingToast("Withdrawing", "Your transaction is being processed", true, tx.hash, chainId))
            await tx.wait()
            update({
                id,
                ...processingToast("Withdrawn", "Your transaction is completed", false, tx.hash, chainId)
            })

            increaseTick()
        }

    }, [amount, djiPerpetual, chainId])

    const onApprove = useCallback(async () => {

        const tx = await collateralToken.approve(djiPerpetual.perpetualAddress)
        const id = add(processingToast("Approving", "Your transaction is being processed", true, tx.hash, chainId))
        await tx.wait()
        setApproved(true)
        update({
            id,
            ...processingToast("Approved", "Your transaction is completed", false, tx.hash, chainId)
        })
    }, [collateralToken, djiPerpetual, chainId])

    return (
        <Modal isOpen={depositModal} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>Your Deposit</ModalHeader>
            <StyledModalBody>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: side === 0 })}
                            onClick={() => setSide(0)}
                        >
                            Deposit
                    </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: side === 1 })}
                            onClick={() => setSide(1)}
                        >
                            Withdraw
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent style={{ paddingTop: 20 }} activeTab={`${side}`}>
                    <TabPane tabId="0">
                        {/* Deposit */}
                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    <Label for="addAmount">Amount</Label>
                                    <InputGroup>
                                        <Input value={amount} onChange={handleChange} type="number" name="addAmount" id="addAmount" />
                                        <InputGroupAddon addonType="append">MUSD</InputGroupAddon>
                                    </InputGroup>
                                    <p>Max {collateralToken.balance}{` `}{collateralToken.symbol}</p>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Button disabled={approved} onClick={onApprove} color="info" block>Approve</Button>
                        <Button disabled={!approved} style={{ marginBottom: 20 }} onClick={onDeposit} color="primary" block>Deposit</Button>
                    </TabPane>
                    <TabPane tabId="1">
                        {/* Withdraw */}
                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    <Label for="removeAmount">Amount</Label>
                                    <InputGroup>
                                        <Input value={amount} onChange={handleChange} type="number" name="removeAmount" id="removeAmount" />
                                        <InputGroupAddon addonType="append">MUSD</InputGroupAddon>
                                    </InputGroup>
                                    <p>Available {djiPerpetual.myDeposit}{` `}{collateralToken.symbol}</p>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Button disabled={Number(djiPerpetual.myDeposit) === 0} onClick={onWithdraw} style={{ marginBottom: 20 }} color="warning" block>Withdraw</Button>
                    </TabPane>
                </TabContent>
            </StyledModalBody>
        </Modal>
    )
}


export default Trade