import React, { useState, useCallback, useEffect } from 'react';
import styled from "styled-components"
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Row,
    Container as RawContainer,
    Col,
    NavItem,
    NavLink,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    UncontrolledDropdown,
    NavbarText,
    Button,
    Badge,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
} from "reactstrap"
import {
    Mail,
    Menu,
    MoreVertical,
    User,
    Inbox,
    Phone,
    Calendar,
    Lock,
    LogOut,
    Shield
} from "react-feather";
import { Link } from "react-router-dom"
import Blockies from 'react-blockies';
import { Web3ReactProvider, useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import LogoPNG from "../assets/img/logo.png"
import MetamaskSVG from "../assets/img/metamask.svg"
import useEagerConnect from "../hooks/useEagerConnect"
import useInactiveListener from "../hooks/useInactiveListener"
import { useToasts } from "../hooks/useToasts"
import { shortAddress } from "../utils"

import {
    injected
} from "../connectors"

const Brand = styled.img.attrs(props => ({
    src: LogoPNG
}))`
    height: 35px; 
`

const Wrapper = styled(Navbar)`
    min-height: 80px; 

    a {
        color: inherit;
        cursor: pointer; 
        margin-left: 5px;
        margin-right: 5px; 

        :first-child {
            margin-left: 0px;
            margin-right: 10px;
        }
    }
    
    

`

const AllTradeText = styled.span`
    margin: 8px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    vertical-align: middle;
    font-size: 26px;
`
const Connector = styled.div`

    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 5px;

 
   font-size: 18px;
   font-weight: 600;
   text-transform: uppercase;


    :hover {
        cursor: pointer;
        color: white;
        background-image: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), linear-gradient(101deg, #78e4ff, #ff48fa);
        background-origin: border-box;
        background-clip: content-box, border-box;
        box-shadow: none;
    }

    display: flex;
    flex-direction: row;

    img {
        width: 48px;
        height: 48px;
    }

    div {
        flex: 70%;
        display: flex; 
        align-items: center;

        :first-child {
            flex: 20%;
        }
        :last-child {
            flex: 10%;
        }

    }

`

const Container = styled(RawContainer)`
    
     
`


const Connectors = [
    {
        name: "Metamask",
        connector: injected,
        icon: MetamaskSVG
    },
]

const Main = () => {

    const [isOpen, setOpen] = useState(false);
    const [loginModal, setLoginModal] = useState(false);
    const context = useWeb3React()
    const { add } = useToasts()
    const [locked, setLocked] = useState(false)
    const { connector, library, chainId, account, activate, deactivate, active, error } = context

    // handle logic to recognize the connector currently being activated
    const [activatingConnector, setActivatingConnector] = useState()

    // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
    const triedEager = useEagerConnect()

    // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
    useInactiveListener(!triedEager || !!activatingConnector)

    const toggle = useCallback(() => {
        setOpen(!isOpen)
    }, [isOpen])

    const toggleModal = useCallback(() => {
        setLoginModal(!loginModal)
    }, [loginModal])


    useEffect(() => {
        if (error && error.name === "UnsupportedChainIdError" && !locked) {
            setLocked(true)
            add({
                title: "Unsupported Network",
                content: <div>Please switch to BSC Testnet or Kovan network</div>
            })
        }
    }, [error, locked])

    console.log("chainId --> ", chainId)

    return (
        <>
            <Modal isOpen={loginModal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Choose Wallet Provider</ModalHeader>
                <ModalBody>
                    {Connectors.map((item, index) => {
                        const { connector, name, icon } = item
                        return (
                            <Connector
                                key={index}
                                onClick={() => {
                                    setActivatingConnector(connector)
                                    activate(connector)
                                    setLoginModal(false)
                                }}
                            >
                                <div>
                                    <img src={icon} alt={`wallet-icon-${index}`} />
                                </div>
                                <div>
                                    {name}
                                </div>
                                <div>
                                    {/* TODO : PUT CONNECTION STATUS */}
                                </div>
                            </Connector>
                        )
                    })}
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleModal}>Close</Button>
                </ModalFooter>
            </Modal>
            <Wrapper color="transparent" light expand="md">

                <Container>
                    <NavbarBrand>
                        <Link to="/">
                            <Brand />
                            <AllTradeText>AllTrade</AllTradeText>
                        </Link>
                        <div>{chainId === 534353 && (<Badge size="sm" color="info">Scroll Alpha Testnet</Badge>)}</div>
                    </NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink className="monyet">
                                    <Link to="/trade">Trade Now</Link>
                                </NavLink>
                            </NavItem>
                            {/* <NavItem>
                                <NavLink>
                                    <Link to="/#about">How To Start</Link>
                                </NavLink>
                            </NavItem> */}
                            <NavItem>
                                <NavLink>
                                    <a target="_blank"  href="https://github.com/Agin-DropDisco/ETH-DENVER-HACK-2023">Github Code</a>
                                </NavLink>
                            </NavItem>
                            {!account
                                ?
                                <Button color="warning" onClick={toggleModal}>
                                    Connect Wallet
                                </Button>
                                :
                                <UncontrolledDropdown className="pr-1">
                                    <DropdownToggle nav >
                                        <Blockies
                                            seed={account}
                                            className="rounded-circle width-35"
                                        />
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem disabled>
                                            <div className="font-small-3">
                                                {shortAddress(account)}
                                            </div>
                                        </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem >
                                            <div
                                                onClick={() => {
                                                    deactivate()
                                                }}
                                            >
                                                <LogOut size={16} className="mr-1" /> Exit
                                                    </div>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            }
                        </Nav>
                    </Collapse>
                </Container>

            </Wrapper>
        </>
    )
}

export default Main