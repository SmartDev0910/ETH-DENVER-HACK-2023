import React, { useState, useCallback } from 'react';
import styled from "styled-components"
import { Row, Col, Alert, Button } from "reactstrap"
import { AlertTriangle } from "react-feather"
import { useToasts } from "../../hooks/useToasts"
import VerifySources from "./VerifySources"
import TokenDetails from "./TokenDetails"
import Activation from "./Activation"
import Summary from "./Summary"


const Wrapper = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;

    p {
        font-size: 14px;
    }

    .container {
        margin-top: 10px;
        margin-bottom: 20px;
    }
    .progressbar {
        counter-reset: step; 
    }
    .progressbar li {
        list-style-type: none;
        width: 25%;
        float: left;
        font-size: 14px;
        position: relative;
        text-align: center; 
        color: #7d7d7d;
    }
    .progressbar li:before {
        width: 30px;
        height: 30px;
        content: counter(step);
        counter-increment: step;
        line-height: 30px;
        border: 2px solid #7d7d7d;
        display: block;
        text-align: center;
        margin: 0 auto 10px auto;
        border-radius: 50%;
        background-color: white;

       

    }
    .progressbar li:after {
        width: 100%;
        height: 2px;
        content: '';
        position: absolute;
        background-color: #7d7d7d;
        top: 15px;
        left: -50%;
        z-index: -1;
    }
    .progressbar li:first-child:after {
        content: none;
    }
    .progressbar li.active {
        color: black;
        
    }
    .progressbar li.active:before {
        border-color: black;
        background-color: black;
        color: white;
    }
    .progressbar li.active + li:after {
        background-color: black;
    }

`

const Steps = styled.div`
    
    display: flex;
    flex-direction: row;
    padding: 10px;
    justify-content: center;
`

const Step = styled.div`
    height: 50px;
    width: 50px;
    border-radius: 50%;
    display: flex; 
    align-items: center;
    justify-content: center;
    margin: 10px;

    ${props => props.active ? `
        background-color: black;
        color: white;
    `: `
        background-color: transparent;
        border: 1px solid black;

    `}

`

const Footer = styled.div`

    padding-top: 20px;
    padding-bottom: 20px;

    button {
        margin-left: 5px;
        :first-child {
            margin-left: 0px;
        }
    }
`


const Burner = () => {

    const [currentStep, setCurrentStep] = useState(1)
    const [data, setData] = useState({})

    console.log("data --> ", data)

    return (
        <Wrapper>
            <Alert color="secondary">
                <p><AlertTriangle size={14} /> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </Alert>

            <div class="container">
                <ul class="progressbar">
                    <li className={currentStep >= 1 && "active"}>Verify sources</li>
                    <li className={currentStep >= 2 && "active"} >Your token details</li>
                    <li className={currentStep >= 3 && "active"}>Activation</li>
                    <li className={currentStep >= 4 && "active"}>Summary</li>
                </ul>
            </div>

            {currentStep === 1 && (<VerifySources data={data} setData={setData} />)}
            {currentStep === 2 && (<TokenDetails data={data} setData={setData} />)}
            {currentStep === 3 && (<Activation />)}
            {currentStep === 4 && (<Summary />)}

            <Footer>
                <Button disabled={true} color="secondary">Reset</Button>
                <Button disabled={currentStep === 1} onClick={() => setCurrentStep(1)} color="info">Back</Button>
                <Button disabled={currentStep === 2} onClick={() => setCurrentStep(2)} color="primary">Next</Button>
            </Footer>

        </Wrapper>
    )
}

export default Burner