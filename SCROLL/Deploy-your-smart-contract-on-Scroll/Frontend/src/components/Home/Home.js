import React, { useState, useCallback, useContext } from 'react';
import styled from "styled-components"
import { Alert, Container, Jumbotron, Row, Col, Button, InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap"
import { Search, AlertTriangle } from "react-feather"
import { useHistory } from "react-router-dom";
import FlagHK from "../../assets/img/flag-hkg.png"
import FlagUS from "../../assets/img/flag-us.png"
import FlagJP from "../../assets/img/flag-jp.png"
import { ContractsContext } from "../../hooks/useContracts"

const Wrapper = styled(Container)`
     

    .jumbotron { 
        color: dark;
        background: rgb(238,174,202);
        background: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);
        border-radius: 8px; 

    }
    .search { 
        margin-top: 20px;
        margin-bottom: 30px;
    }

`

const Headline = styled(
    ({ className }) => {
        return (
            <div className={className}>
                <div>
                    <h3>Live Market</h3>
                    <p>
                    AllTrade allows you to trade any major stock market indices up to 10x leverage via perpetual swap contracts using FUSD (Fake Scroll USD) as a collateral on Scroll Testnet Alpha L2.
                    </p>
                </div>
            </div>
        )
    })`
    text-align: center; 
    padding-top: 30px;
    padding-bottom: 10px;
    
    div {
        margin-left: auto;
        margin-right: auto; 
        max-width: 800px;
    }
    `

const HowtoUse = () => {
    return (
        <div style={{ textAlign: "center" }}>
            <div style={{ marginTop: 20, marginBottom: 20 }}>
                <h3>How to Use</h3>
            </div>
            <Row>
                <Col xs="6">
                    <h6>For Trader</h6>
                    <p>
                        A trader can open a short or long position if he or she expects the index move up or down.
                    </p>

                </Col>
                <Col xs="6">
                    <h6>For Liquidity Provider</h6>
                    <p>
                        Liquidity provider can help balance the AMM pool and take profit from spread and slippage.
                    </p>

                </Col>
            </Row>
        </div>
    )
}

const FooterWrapper = styled.div`
    text-align: center;

    a {
        color: inherit;

        :hover {
            text-decoration: underline;
        }
    }

`

const Footer = () => {
    return (
        <FooterWrapper>
            <div style={{ marginTop: 40, marginBottom: 20 }}>
                <a target="_blank"  href="https://github.com/Agin-DropDisco/ETH-DENVER-HACK-2023">Twitter</a> | <a target="_blank"  href="https://github.com/Agin-DropDisco/ETH-DENVER-HACK-2023">GitHub</a>
            </div>
        </FooterWrapper>
    )
}

const TokenList = styled(
    ({ className }) => {

        let history = useHistory()
        const { djiPerpetual, collateralToken } = useContext(ContractsContext)

        const toTrading = () => {
            history.push("/trade")
        }

        return (
            <div className={className}>
                <div onClick={toTrading} className="card enabled">
                    <div>
                        <img src={FlagUS} alt={`icon-1`} />
                    </div>
                    <div style={{ minWidth: 200 }}>
                        <h5>Perpetual Name</h5>
                        <p>Dow Scroll Index</p>
                    </div>
                    <div style={{ minWidth: 160 }}>
                        <h5>Status</h5>
                        <p>{djiPerpetual.status}</p>
                    </div>

                    <div>
                        <h5>Index Price</h5>
                        <p>{Number(djiPerpetual.indexPrice).toFixed(0)}{` `}{collateralToken.symbol}</p>
                    </div>
                    <div>
                        <h5>Mark Price</h5>
                        <p>{Number(djiPerpetual.markPrice).toFixed(0)}{` `}{collateralToken.symbol}</p>
                    </div>
                    <div style={{ marginTop: 24 }}>
                        <u>Trade Now</u>
                    </div>
                </div>
                <div className="card disabled">
                    <div>
                        <img src={FlagHK} alt={`icon-2`} />
                    </div>
                    <div style={{ minWidth: 200 }}>
                        <h5>Perpetual Name</h5>
                        <p>Hang Seng Index</p>
                    </div>
                    <div style={{ minWidth: 160 }}>
                        <h5>Status</h5>
                        <p>Coming Soon</p>
                    </div>

                </div>
                <div className="card disabled">
                    <div>
                        <img src={FlagJP} alt={`icon-3`} />
                    </div>
                    <div style={{ minWidth: 200 }}>
                        <h5>Perpetual Name</h5>
                        <p>Nikkei 225 Index</p>
                    </div>
                    <div style={{ minWidth: 160 }}>
                        <h5>Status</h5>
                        <p>Coming Soon</p>
                    </div>

                </div>
            </div>
        )
    })`
    
    padding: 20px;

    .card {
        margin-top: 15px;
        margin-bottom: 15px;
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 20px;
        padding-top: 10px;
        padding-bottom: 10px;
        background: transparent;
        display: flex;
        flex-direction: row;
        cursor: pointer;
        overflow: hidden;

        img {
            width: 64px;
            height: 64px;
        }

        h5 {
            margin: 0px;
            margin-top: 12px; 
            margin-bottom: 2px;
            font-size: 14px;
        }
        p {
            font-size: 18px;
        }

        div { 
            display: flex; 
            flex-direction: column;
            :not(:first-child) {
                margin-left: 20px; 
                min-width: 160px;
            }
        }


    }
    .enabled {
        :hover {
            cursor: pointer;
            color: white;
            background-image: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), linear-gradient(101deg, #78e4ff, #ff48fa);
            background-origin: border-box;
            background-clip: content-box, border-box;
            box-shadow: none;
        }
    }

    .disabled {
        background: #ddd;
        opacity: 0.6;
        cursor: not-allowed;
    }

    .soon {
        
    }

    `
const Landing = () => {
    return (
        <Wrapper>
            <Headline />
            <div style={{ padding: 20, paddingBottom: 0, textAlign: "center" }}>
                <Alert color="primary">
                    <AlertTriangle size={18} /> Please note that we're live only on Scroll Alpha Testnet at the moment, make sure you're connected to the correct network.
            </Alert>
            </div>

            <TokenList />

            <HowtoUse />

            <Footer />


        </Wrapper>
    )
}

export default Landing