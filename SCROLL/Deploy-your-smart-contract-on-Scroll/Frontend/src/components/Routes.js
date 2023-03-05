import React, { useState, useCallback } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route,
    Link,
    useLocation
} from "react-router-dom";
import styled from "styled-components"
import { Web3ReactProvider, useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import {
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
    Dropdown,
    DropdownItem,
    DropdownToggle,
    DropdownMenu,
    NavLink
} from "reactstrap"
import Home from "./Home/Home"
import Trade from "./Trade/Trade"

const Wrapper = styled(Container)`
    margin-top: 20px;
`

const Tab = styled.div`
    overflow: hidden;
    border: 1px solid black;
    background-color: #f1f1f1; 
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
`

const TabItem = styled(Link)`
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

const TabContent = styled.div`
     
    padding: 6px 12px;
    border: 1px solid black;
    border-top: none;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
`


const Routes = () => {
    const context = useWeb3React()
    const { connector, library, chainId, account, activate, deactivate, active, error } = context
    const location = useLocation();

    // if (!account) {
    //     return <Landing />
    // }

    return (
        <Wrapper>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/trade">
                    <Trade />
                </Route>
                <Redirect to="/" />
            </Switch>
            {/* <Tab>
                <TabItem active={location?.pathname === "/"} to="/">Dashboard</TabItem>
                <TabItem active={location?.pathname === "/mint"} to="/mint">Mint Assets</TabItem>
                <TabItem active={location?.pathname === "/burner"} to="/burner">Setup Burner</TabItem>
            </Tab>
            <TabContent>
                <Switch>
                    <Route exact path="/">
                        <Dashboard />
                    </Route>
                    <Route  path="/mint">
                        <Mint />
                    </Route>
                    <Route path="/burner">
                        <Burner />
                    </Route>
                    <Redirect to="/" />
                </Switch>
            </TabContent> */}
        </Wrapper>

    )
}

export default Routes