import React, { useState, useCallback, useEffect } from 'react';
import styled from "styled-components"
import { Row, Col, Alert, Button, Form, FormGroup, Label, Input, FormText, Table } from "reactstrap"
import axios from "axios"
import useInterval from "../../hooks/useInterval"
import { SuccessIcon, ErrorIcon } from "../common"

const Wrapper = styled.div`
    h5,p  {
        text-align: center;
    }
`


const Body = styled(Row)`
    margin-top: 30px;
`

const Config = styled(Col).attrs(props => ({
    lg: "6",
    xs: "12"
}))`
    
`

const Info = styled(Col).attrs(props => ({
    lg: "6",
    xs: "12"
}))`
    border: 1px solid black;
    border-radius: 4px; 
    padding: 10px;

    table {
        font-size: 12px;
    }
    th {
        width: 20%;
    }

`


const SOURCES = [1, 2]

const VerifySources = ({ data, setData }) => {

    const [currentSource, setCurrentSource] = useState(SOURCES[0])
    const [interval, setInterval] = useState(1000)

    useInterval(() => {
        fetchUrls(data)
        setInterval(15000)
    }, interval);

    useEffect(() => {
        let initialValue = {}
        for (let source of SOURCES) {
            let apiUrl
            let apiPath
            switch (source) {
                case 1:
                    apiUrl = "https://api.ratesapi.io/api/latest?base=USD&symbols=HKD"
                    apiPath = "rates.HKD"
                    break
                default:
                    apiUrl = `https://api.exchangeratesapi.io/latest?symbols=HKD&base=USD`
                    apiPath = "rates.HKD"
            }

            initialValue[`source${source}Url`] = apiUrl
            initialValue[`source${source}Path`] = apiPath
        }
        setData({ ...data, ...initialValue })
    }, [])

    const fetchUrls = async (data) => {

        let responses = {}

        for (let item of Object.keys(data)) {
            if (item.indexOf("Url") !== -1) {
                const prefix = item.split("Url")[0]
                let valid = false
                try {
                    const response = await axios.get(data[item])
                    if (response && response.data) {
                        valid = true
                        responses[`${prefix}Response`] = response.data

                        if (data[`source${currentSource}Path`]) {
                            const paths = data[`source${currentSource}Path`].split(".")
                            let value = response.data
                            for (let path of paths) {
                                value = value[path]
                            }
                            if (value) {
                                responses[`${prefix}Value`] = value
                            }
                        }

                    }
                } catch (e) {

                }
                responses[`${prefix}Valid`] = valid
            }
        }

        setData({ ...data, ...responses })
    }

    return (
        <Wrapper>
            <h5>Verify Sources</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
            <Body>
                <Config>
                    <Form>
                        <FormGroup>
                            <Input type="select" value={currentSource} onChange={(e) => setCurrentSource(Number(e.target.value))} name="select" id="sourceSelection">
                                {SOURCES.map((source, index) => (<option value={source} key={index}>Source#{source}</option>))}
                            </Input>
                        </FormGroup>
                        {(() => {

                            let pathValid = false
                            if (data[`source${currentSource}Response`] && data[`source${currentSource}Path`]) {
                                const paths = data[`source${currentSource}Path`].split(".")
                                let value = data[`source${currentSource}Response`]
                                for (let path of paths) {
                                    value = value[path]
                                }
                                if (value) {
                                    pathValid = true
                                }

                            }

                            return (
                                <>
                                    <FormGroup>
                                        <Label for="apiSource">
                                            API URL
                                            {data[`source${currentSource}Valid`] ? <SuccessIcon /> : <ErrorIcon />}
                                        </Label>
                                        <Input
                                            type="textarea"
                                            name="apiUrl"
                                            rows="4"
                                            id="apiUrl"
                                            value={data[`source${currentSource}Url`]}
                                            onChange={(e) => {
                                                setInterval(3000)
                                                setData({ ...data, [`source${currentSource}Url`]: e.target.value })
                                            }}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="apiPath">
                                            Path
                                            {pathValid ? <SuccessIcon /> : <ErrorIcon />}
                                        </Label>
                                        <Input
                                            type="text"
                                            name="apiPath"
                                            id="apiPath"
                                            value={data[`source${currentSource}Path`]}
                                            onChange={(e) => {
                                                setInterval(3000)
                                                setData({ ...data, [`source${currentSource}Path`]: e.target.value })
                                            }}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="apiPath">
                                            Value
                                        </Label>
                                        <Input
                                            type="text"
                                            name="apiValue"
                                            id="apiValue"
                                            value={data[`source${currentSource}Value`]}
                                            disabled
                                        />
                                    </FormGroup>
                                </>
                            )
                        })()}
                    </Form>
                </Config>
                <Info>
                    {SOURCES.map((sourceId) => {
                        return (
                            <Table key={sourceId}>
                                <tbody>
                                    <tr>
                                        <th scope="row">Source#{sourceId}</th>
                                        <td >
                                            <div style={{ wordWrap: "break-word", maxWidth: "400px" }}>
                                                {data[`source${sourceId}Url`]}
                                            </div>

                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Path#{sourceId}</th>
                                        <td>
                                            <div style={{ wordWrap: "break-word", maxWidth: "400px" }}>
                                                {data[`source${sourceId}Path`]}
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Value#{sourceId}</th>
                                        <td>
                                            <div style={{ wordWrap: "break-word", maxWidth: "400px" }}>
                                                {data[`source${sourceId}Value`]}
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        )
                    })}
                    {(() => {
                        let median = 0
                        let count = 0
                        for (let item of Object.keys(data)) {
                            if (item.indexOf("Value") !== -1) {
                                console.log("item --> ", item)
                                median += Number(data[item])
                                count += 1
                            }
                        }
                        median = median/count 

                        return (
                            <Table>
                                <tbody>
                                    <tr>
                                        <th scope="row">Median</th>
                                        <td>{median.toFixed(6)}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        )
                    })() 
                    }
                </Info>
            </Body>

        </Wrapper>
    )
}

export default VerifySources