import React, { useState, useCallback } from 'react';
import styled from "styled-components"
import { Row, Col, Alert, Button } from "reactstrap"
import { Web3ReactProvider, useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { shortAddress } from "../../utils"

const Wrapper = styled.div`
    padding: 20px;
`

const Card = styled(
    ({ className, title, subtitle }) => {
        return (
            <Col className={className} xs="4">
                <div>
                    <h4>{title}</h4>
                    <h2>{subtitle}</h2>
                </div>
            </Col>
        )
    })`
    margin-top: 5px;
    margin-bottom: 5px; 
    >div {
        border: 1px solid black;
        border-radius: 6px; 
        padding: 10px;
        padding-top: 30px;
        padding-bottom: 30px;
        text-align: center;
        h2 {
            font-size: 24px;
        }
        h4 {
            font-size: 18px;
        }

    }
    
    `

const Token = styled(
    ({ className, symbol, balance = 0, balanceInUsd = 0 }) => {
        return (
            <Col className={className} xs="3">
                <div>
                    <div>
                        {symbol}
                        
                    </div>
                    <div>
                        {(balance).toLocaleString()}
                        <p>${balanceInUsd.toLocaleString()}</p>
                    </div>
                </div>
            </Col>
        )
    })` 
    margin-top: 5px;
    margin-bottom: 5px; 
    >div {
        border: 1px solid black;
        border-radius: 6px; 
        padding: 10px;
        padding-top: 20px;
        padding-bottom: 10px;
        display: flex;
        flex-direction: row;
        
        div {
            font-size: 18px;
            flex: 50%;

            :first-child {
                font-weight: 600;
                
            }

            :last-child { 
                text-align: right;
                p {
                    font-weight: 400;
                    font-size: 14px;
                }
            }
        }

        

    }
    `

const Dashboard = () => {

    const context = useWeb3React()
    const { account } = context


    return (
        <Wrapper>
            <Row style={{ justifyContent: "center", marginTop: 20 }}>
                <Card
                    title={"Total Assets"}
                    subtitle={`$${(0).toFixed(2)}`}
                />
                <Card
                    title={"Total Burned"}
                    subtitle={`$${(0).toFixed(2)}`}
                />
            </Row>
            <Row style={{ marginTop: 20, marginBottom: 5 }}>
                <Col xs="12">
                    <h5>Account Overview</h5>
                </Col>
            </Row>
            <Row>
                <Token
                    symbol={"ETH"}
                    balance={0.116}
                    balanceInUsd={550.23}
                />
                <Token
                     symbol={"pyHKD"}
                     balance={350.11}
                     balanceInUsd={49.67}
                />
                <Token
                     symbol={"pyJPY"}
                     balance={10280.66}
                     balanceInUsd={92.77}
                />
                <Token
                     symbol={"SCROLL"}
                     balance={100}
                     balanceInUsd={134}
                />
            </Row>
        </Wrapper>
    )
}

export default Dashboard