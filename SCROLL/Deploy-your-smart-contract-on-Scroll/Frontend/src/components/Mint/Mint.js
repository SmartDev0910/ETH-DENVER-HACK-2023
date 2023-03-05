import React, { useState, useCallback } from 'react';
import styled from "styled-components"
import { Row, Col, Alert, Button } from "reactstrap"

const Wrapper = styled.div`
    padding: 20px;
`

const Card = styled(
    ({ className, symbol, pair, rate = 0, totalMinted = 0 }) => {
        return (
            <Col className={className} xs="4">
                <div>
                    <h2>{symbol}</h2>
                    <h4>{pair}</h4>
                    <div>
                        <div>
                            <h4>
                                Rate
                            </h4>
                            <p>
                                {rate.toFixed(2link)}
                            </p> 
                        </div>
                        <div>
                            <h4>
                                Total Minted
                            </h4>
                            <p>
                                {totalMinted.toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>
            </Col>
        )
    })`
    margin-top: 5px;
    margin-bottom: 5px;
    >div {
        border: 1px solid black;
        border-radius: 4px; 
        padding: 10px;
        padding-top: 20px;
        padding-bottom: 20px; 
        h2, h4 {
            font-size: 24px;
            text-align: center;
        }
        h4 {
            font-size: 16px;
        }
        div {
            display: flex;
            flex-direction: row;
            font-size: 16px;
            margin-top: 5px;
             
            div { 
                flex: 50%;
                display: flex;
                flex-direction: column;
                h4, p {
                    margin-left: auto;
                    margin-right: auto;
                }
            }
        }
    }
    
    `

const Mint = () => {
    return (
        <Wrapper>
            <Row>
                <Card
                    symbol={"pyHKD"}
                    pair={"USD/HKD"}
                    rate={7.1}
                    totalMinted={5646.77}
                />
                <Card
                    symbol={"pyJPY"}
                    pair={"USD/JPY"}
                    rate={110.23}
                    totalMinted={102110.88}
                />
                <Card
                    symbol={"pyTHA"}
                    pair={"USD/BAHT"}
                    rate={32.11}
                    totalMinted={80711.23}
                />
            </Row>

        </Wrapper>
    )
}

export default Mint