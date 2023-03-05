import React, { useState, useCallback } from 'react';
import styled from "styled-components"
import { Alert, Container, Jumbotron, Row, Col, Button, InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap"
import { Search } from "react-feather"
import TokenList from "../TokenList"


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

const Card = styled(
    ({ className }) => {

        return (
            <Col className={className} lg="4" xs="12">
                <div className="-body">

                </div>
            </Col>
        )
    })`
    padding: 15px;
    >.-body {
        border : 1px solid black;
        border-radius: 8px;
        padding: 10px;
        min-height: 160px 
    }
    `

const Headline = styled(
    ({ className }) => {
        return (
            <div className={className}>
                <div>
                    <h3>Live Market</h3>
                    <p>
                        Introduction AllTrade, 
                    </p>
                </div>

            </div>
        )
    })`
    text-align: center; 
    padding-top: 30px;
    padding-bottom: 30px;
    
    div {
        margin-left: auto;
        margin-right: auto; 
        max-width: 800px;
    }
    `

const HowToUse = styled(
    ({ className }) => {
        return (
            <Col className={className} xs="12">
                <div className="-body">
                    HowToUse
                </div>
            </Col>
        )
    })`
    padding: 15px;
    >.-body {
        border : 1px solid black;
        border-radius: 8px;
        padding: 20px;
        min-height: 400px 
    }
    `

const Landing = () => {
    return (
        <Wrapper>
            <Headline />


            <Row>
                <Col xs="12">
                    <TokenList

                    />
                </Col>
            </Row>
        </Wrapper>
    )
}

export default Landing