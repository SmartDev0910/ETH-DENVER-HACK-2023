import React, { useState, useCallback, useEffect } from 'react';
import styled from "styled-components"
import { Row, Col } from "reactstrap"
import { ethers } from "ethers"
import {  } from "../constants"

const Container = styled.div`
    
    h5 {
        margin-bottom: 10px;
    }
`

const Table = styled(
    ({ className }) => {
        return (
            <div className={className}>

            </div>
        )
    })`
    border : 1px solid black;
    border-radius: 8px;
    padding: 20px;
    min-height: 400px 
    `



const TokenList = ({ title }) => {

    useEffect(() => {

        (async () => {

            const provider = new ethers.providers.JsonRpcProvider()
            const blockNumber = await provider.getBlockNumber()
            console.log("blockNumber --> ", blockNumber)

        })()



    }, [])

    return (
        <Container>
            {title && (<h5>{title}</h5>)}
            <Table

            />
        </Container>
    )

}

export default TokenList