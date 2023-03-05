import React, { Component } from 'react'
import Web3 from 'web3'
import Img from 'react-cool-img'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import ZonuletAvatars from '../../abis/ZonuletAvatars.json'
import ZoNulet from '../../abis/ZoNulet.json'
import ZonuletVerified from '../../abis/ZonuletVerified.json'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import { toast } from 'react-toastify'

class NavbarMain extends Component {

  constructor(props) {
    super(props)

    this.state = {
      account: '',
      ipfs: '',
      mim: '',
      name: '',
      balance: 0,
      mantlebalance: 0,
      dezubalance: 0,
      // activatingConnector,
      verified: false,
    }
  }

  async componentWillMount() {
    await this.loadMetaMask()
    // await this.loginModal()
  }

  async loadWeb3() {

    if (window.ethereum) {

      window.web3 = new Web3(window.ethereum)
      window.loaded_web3 = true

      await window.ethereum.request({ method: 'eth_requestAccounts' })
      // Get a Web3 instance for the wallet
      const web3 = new Web3(window.ethereum)

      const chainId = await web3.eth.getChainId()

      window.ethereum.on('accountsChanged', function(accounts) {
        const account = accounts
        // console.log('Account changed', account[0])
        window.location.reload()
      })

      if (chainId == 5001) {
      } else {
        // console.log('Not on Mantle Chain')
        // If we are not on the Mantle chain,
        // Check if MetaMask is installed
        // MetaMask injects the global API into window.ethereum
        if (window.ethereum) {
          try {
            // check if the chain to connect to is installed
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x1389' }], // chainId must be in hexadecimal numbers
            })
          } catch (error) {
            // This error code indicates that the chain has not been added to MetaMask
            // if it is not, then install it into the user MetaMask
            if (error.code === 4902) {
              try {
                await window.ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {
                      chainId: '0x1389',
                      rpcUrl: 'https://rpc.testnet.mantle.xyz',
                    },
                  ],
                })
              } catch (addError) {
                console.error(addError)
              }
            }
            console.error(error)
          }
        } else {
          // if no window.ethereum then MetaMask is not installed
          toast.error('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html')
        }
      }
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
      window.loaded_web3 = true
      // Get a Web3 instance for the wallet
      const web3 = new Web3(window.ethereum)
      // window.web3 = new Web3(window.ethereum);


      // console.log('Web3 instance is', web3)

      // Get connected chain id from Ethereum node
      const chainId = await web3.eth.getChainId()

      if (chainId == 5001) {
      } else {
        console.log('Not on Mantle Chain')
        toast.error("Not on Mantle Chain")
        // If we are not on the Mantle chain,
        // Check if MetaMask is installed
        // MetaMask injects the global API into window.ethereum
        if (window.ethereum) {
          try {
            // check if the chain to connect to is installed
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x1389' }], // chainId must be in hexadecimal numbers
            })
          } catch (error) {
            // This error code indicates that the chain has not been added to MetaMask
            // if it is not, then install it into the user MetaMask
            if (error.code === 4902) {
              try {
                await window.ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {
                      chainId: '0x1389',
                      rpcUrl: 'https://rpc.testnet.mantle.xyz',
                    },
                  ],
                })
              } catch (addError) {
                console.error(addError)
              }
            }
            console.error(error)
          }
        } else {
          // if no window.ethereum then MetaMask is not installed
          toast.error("MetaMask is not installed. Please consider installing it: https://metamask.io/download.html")
        }
      }
    } else {
      toast.error("Non-Mantle browser detected. You should consider trying MetaMask!")
    }
  }

  async loadMetaMask() {

    await this.loadWeb3()

    if (window.loaded_web3) {
      const accounts = await window.web3.eth.getAccounts()
      this.setState({ account: accounts[0] })
    }

    const web3one = new Web3('https://rpc.testnet.mantle.xyz')


    const abia = ZoNulet.abi
    const addr = '0x9C3a2429A288dBEA75C819Fd18C0b35a0C3E1361'
    const contract = new web3one.eth.Contract(abia, addr)

    const abidezu = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}];
    const dezuAddress = '0xCab6D79dD732779f081B5868AAb1e64F357e90A9' 

    const contractDezu = new web3one.eth.Contract(abidezu, dezuAddress)

    const abi = ZonuletAvatars.abi
    const address = '0xEd1A69efced001468a9F7c469fe1F8640e7583C4' //ZonuletAvatars
    const contractav = new web3one.eth.Contract(abi, address)

    // console.log(contract)
    this.setState({ contractav })

    if (this.state.account) {

      const getIPFS = await contractav.methods.getIPFSHash(this.state.account).call()
      // console.log(getIPFS)
      const getMIME = await contractav.methods.getMIMEType(this.state.account).call()
      // console.log(getMIME)
      const getName = await contractav.methods.getName(this.state.account).call()
      // console.log(getName)
      this.setState({ ipfs: getIPFS })
      this.setState({ mim: getMIME })
      this.setState({ name: getName })

      const balanceOne = await contract.methods.balanceOf(this.state.account).call()
      const bal = web3one.utils.fromWei(balanceOne, 'ether')
      const balance = Number(bal).toFixed(2)

      const balanceDezu = await contractDezu.methods.balanceOf(this.state.account).call()
      const dexswapZonuBalance = web3one.utils.fromWei(balanceDezu, 'ether')
      const dezubalance = Number(dexswapZonuBalance).toFixed(2)

      const mantlebalance = web3one.utils.fromWei(await web3one.eth.getBalance(this.state.account), 'ether')

      this.setState({ mantlebalance })

      this.setState({ dezubalance })

      this.setState({ balance })

      const abiv = ZonuletVerified.abi
      const addrv = '0xB8D6deA2b38ED7E8194C50ad7Ae163B36ff2b03a' //ZonuletVerified
      const contractv = new web3one.eth.Contract(abiv, addrv)

      const getVerified = await contractv.methods.getVerified(this.state.account).call()

      this.setState({ verified: getVerified })
    }
  }

  render() {
    return (
      <>
      <header className='multiNavbar'>
      <div className='navbarZonu'>
      <Navbar collapseOnSelect expand="lg">
      <Navbar.Brand href="/" className='brandingNavbar'>
          <img
            alt="icon"
            className="iconimage d-inline-block align-top"
            src="/zonulet_stndr_1.svg"
          />
          <div className='logoName'>
            <span className='nameLogo'>ZONULET</span>
          </div>
        </Navbar.Brand>
        {window.loaded_web3 && this.state.account.length > 0 ? (
          <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{ marginRight: '15px' }}>
            {this.state.ipfs !== '' &&
            (this.state.mim === 'image/jpeg' || this.state.mim === 'image/png' || this.state.mim === 'image/gif') ? (
              <div
                style={{
                  position: 'relative',
                  width: '38px',
                  margin: '0 auto',
                }}
              >
                <img
                  src={`${process.env.REACT_APP_INFURA_GATEAWAY}` + this.state.ipfs}
                  alt=""
                  border="0"
                  height="38px"
                  width="38px"
                  style={{ borderRadius: '50%' }}
                />

                {this.state.verified === true ? (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-2px',
                      right: '-1px',
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 12 12"  xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M4.78117 0.743103C5.29164 -0.247701 6.70826 -0.247701 7.21872 0.743103C7.52545 1.33846 8.21742 1.62509 8.8553 1.42099C9.91685 1.08134 10.9186 2.08304 10.5789 3.1446C10.3748 3.78247 10.6614 4.47445 11.2568 4.78117C12.2476 5.29164 12.2476 6.70826 11.2568 7.21872C10.6614 7.52545 10.3748 8.21742 10.5789 8.8553C10.9186 9.91685 9.91685 10.9186 8.8553 10.5789C8.21742 10.3748 7.52545 10.6614 7.21872 11.2568C6.70826 12.2476 5.29164 12.2476 4.78117 11.2568C4.47445 10.6614 3.78247 10.3748 3.1446 10.5789C2.08304 10.9186 1.08134 9.91685 1.42099 8.8553C1.62509 8.21742 1.33846 7.52545 0.743103 7.21872C-0.247701 6.70826 -0.247701 5.29164 0.743103 4.78117C1.33846 4.47445 1.62509 3.78247 1.42099 3.1446C1.08134 2.08304 2.08304 1.08134 3.1446 1.42099C3.78247 1.62509 4.47445 1.33846 4.78117 0.743103Z"
                        fill="#feda03"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.43961 4.23998C8.64623 4.43922 8.65221 4.76823 8.45297 4.97484L5.40604 8.13462L3.54703 6.20676C3.34779 6.00014 3.35377 5.67113 3.56039 5.47189C3.76701 5.27266 4.09602 5.27864 4.29526 5.48525L5.40604 6.63718L7.70475 4.25334C7.90398 4.04672 8.23299 4.04074 8.43961 4.23998Z"
                        fill="#151a2f"
                      ></path>
                    </svg>
                  </div>
                ) : null}
              </div>
            ) : (
              <div
                style={{
                  position: 'relative',
                  width: '38px',
                  margin: '0 auto',
                }}
              >
                <Jazzicon diameter={38} seed={jsNumberForAddress(this.state.account)} />

                {this.state.verified === true ? (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-2px',
                      right: '-1px',
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 12 12" fill="#4E78FF" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M4.78117 0.743103C5.29164 -0.247701 6.70826 -0.247701 7.21872 0.743103C7.52545 1.33846 8.21742 1.62509 8.8553 1.42099C9.91685 1.08134 10.9186 2.08304 10.5789 3.1446C10.3748 3.78247 10.6614 4.47445 11.2568 4.78117C12.2476 5.29164 12.2476 6.70826 11.2568 7.21872C10.6614 7.52545 10.3748 8.21742 10.5789 8.8553C10.9186 9.91685 9.91685 10.9186 8.8553 10.5789C8.21742 10.3748 7.52545 10.6614 7.21872 11.2568C6.70826 12.2476 5.29164 12.2476 4.78117 11.2568C4.47445 10.6614 3.78247 10.3748 3.1446 10.5789C2.08304 10.9186 1.08134 9.91685 1.42099 8.8553C1.62509 8.21742 1.33846 7.52545 0.743103 7.21872C-0.247701 6.70826 -0.247701 5.29164 0.743103 4.78117C1.33846 4.47445 1.62509 3.78247 1.42099 3.1446C1.08134 2.08304 2.08304 1.08134 3.1446 1.42099C3.78247 1.62509 4.47445 1.33846 4.78117 0.743103Z"
                        fill="#feda03"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.43961 4.23998C8.64623 4.43922 8.65221 4.76823 8.45297 4.97484L5.40604 8.13462L3.54703 6.20676C3.34779 6.00014 3.35377 5.67113 3.56039 5.47189C3.76701 5.27266 4.09602 5.27864 4.29526 5.48525L5.40604 6.63718L7.70475 4.25334C7.90398 4.04672 8.23299 4.04074 8.43961 4.23998Z"
                        fill="#151a2f"
                      ></path>
                    </svg>
                  </div>
                ) : null}
              </div>
            )}
          </Navbar.Toggle>
        ) : (
          <button
            type="button"
            onClick={e => {
              this.loadMetaMask()
            }}
            className="btn btn-outline-light mx-4 rounded"
            style={{ marginTop: '-2px', position: 'absolute', right: '-16px' }}
          >
            <svg width="18" height="16" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.73795 17.9957C9.33603 17.9957 8.92953 18.0094 8.5276 17.9866C8.36318 17.9774 8.17591 17.9318 8.04346 17.8358C7.34009 17.3426 6.65041 16.831 5.96074 16.3195C5.76891 16.1779 5.57708 16.1459 5.34415 16.2099C4.22971 16.5296 3.10613 16.8402 1.98713 17.1507C1.53039 17.2786 1.32943 17.169 1.19241 16.7077C0.854422 15.5567 0.521004 14.4057 0.196721 13.2502C0.160182 13.1269 0.173884 12.9762 0.21499 12.8528C0.56211 11.743 0.913798 10.6377 1.27462 9.53236C1.37053 9.23092 1.43448 8.97058 1.28832 8.64172C1.1239 8.2672 1.08279 7.8333 0.99601 7.42681C0.66716 5.95155 0.338309 4.46715 0.0185936 2.98276C-0.00881066 2.85487 -0.00424329 2.70871 0.0322957 2.58539C0.256097 1.86832 0.489033 1.15581 0.726536 0.438731C0.858989 0.0322352 1.10563 -0.081949 1.50299 0.0642068C3.3208 0.744745 5.14318 1.42985 6.96099 2.11039C7.08431 2.15606 7.2259 2.18347 7.35836 2.18347C8.91126 2.18803 10.4642 2.18803 12.0171 2.18347C12.1861 2.18347 12.3642 2.14693 12.524 2.08755C14.3327 1.41158 16.1368 0.731043 17.9409 0.055072C18.3063 -0.081949 18.5712 0.0413699 18.69 0.411327C18.9275 1.14211 19.165 1.86832 19.3934 2.60366C19.4299 2.72242 19.4345 2.85944 19.4071 2.97819C19.0097 4.84167 18.6078 6.70516 18.2059 8.56865C18.1967 8.61889 18.1876 8.67826 18.1602 8.71937C18.014 8.91577 18.0506 9.1213 18.1191 9.32683C18.4936 10.4824 18.8681 11.6379 19.2289 12.798C19.2792 12.9625 19.2883 13.1634 19.2426 13.3233C18.9184 14.488 18.5804 15.6435 18.2424 16.8036C18.1465 17.1416 17.8998 17.2741 17.5573 17.1781C16.4291 16.8676 15.301 16.5615 14.1774 16.2373C13.8851 16.155 13.6659 16.2007 13.4193 16.388C12.7478 16.8995 12.0582 17.3882 11.3685 17.8724C11.2589 17.95 11.1036 17.9911 10.9666 17.9957C10.5601 18.0048 10.149 17.9957 9.73795 17.9957ZM18.7996 3.11978C18.7859 3.06954 18.7676 3.01016 18.7494 2.95535C18.5119 2.29765 18.2744 1.64452 18.0323 0.986815C17.9227 0.685369 17.8222 0.653397 17.5664 0.831525C15.502 2.25198 13.4375 3.677 11.3685 5.09745C11.1127 5.27101 11.1082 5.37606 11.3502 5.56332C12.0673 6.12511 12.7844 6.69146 13.506 7.24868C13.6157 7.33546 13.7481 7.40397 13.8851 7.44051C14.9539 7.73739 16.0227 8.02513 17.0914 8.31287C17.4066 8.39965 17.4385 8.37682 17.5208 8.0708C17.845 6.82391 18.1648 5.57245 18.4845 4.32099C18.5895 3.91907 18.6946 3.52627 18.7996 3.11978ZM0.630621 3.09237C0.639756 3.13805 0.64889 3.16545 0.653458 3.19742C1.07822 4.85081 1.50756 6.5042 1.93232 8.16215C1.97799 8.34941 2.07848 8.37682 2.25204 8.33114C3.36647 8.02513 4.48091 7.72825 5.59535 7.42681C5.69583 7.3994 5.79175 7.34916 5.87396 7.28522C6.60474 6.7143 7.33552 6.14337 8.0663 5.56789C8.30837 5.37606 8.30837 5.28014 8.05716 5.10658C5.98358 3.67243 3.90999 2.24741 1.83641 0.82239C1.60804 0.662532 1.49385 0.703638 1.39794 0.968546C1.16044 1.60798 0.9275 2.25198 0.694564 2.89598C0.66716 2.95992 0.64889 3.033 0.630621 3.09237ZM9.71055 16.1733C10.1353 16.1733 10.5646 16.1687 10.9894 16.1733C11.1767 16.1779 11.2589 16.1094 11.2315 15.9175C11.1949 15.6481 11.1675 15.374 11.1356 15.1046C11.1036 14.8488 10.8798 14.625 10.624 14.625C10.0074 14.6204 9.39083 14.6204 8.77424 14.625C8.50933 14.625 8.2764 14.8625 8.25356 15.1228C8.23529 15.3649 8.21245 15.607 8.18048 15.849C8.14851 16.1002 8.20332 16.1733 8.45452 16.1733C8.87015 16.1733 9.29035 16.1733 9.71055 16.1733ZM7.83793 11.9668C8.04346 11.9668 8.15308 11.8069 8.07543 11.6334C7.94755 11.341 7.80139 11.0579 7.66437 10.7701C7.60043 10.6377 7.48624 10.5966 7.35836 10.6559C7.0295 10.7975 6.70522 10.9391 6.38551 11.1035C6.31243 11.1401 6.23935 11.268 6.24392 11.3502C6.24392 11.4187 6.34897 11.51 6.42204 11.542C6.62758 11.6196 6.84224 11.6745 7.05234 11.7384C7.32638 11.816 7.59586 11.8983 7.83793 11.9668ZM11.5421 11.9668C11.5558 11.9668 11.574 11.9668 11.5877 11.9622C12.0719 11.816 12.5606 11.679 13.0447 11.5237C13.1041 11.5055 13.1818 11.405 13.1818 11.3456C13.1818 11.2725 13.1178 11.1675 13.0539 11.1355C12.7204 10.9711 12.387 10.8112 12.0399 10.6788C11.9668 10.6514 11.7978 10.7062 11.7613 10.7701C11.6014 11.0533 11.4644 11.3502 11.3365 11.6471C11.2635 11.816 11.3731 11.9668 11.5421 11.9668Z"
                fill="#E6893C"
              ></path>
            </svg>{' '}
            Connect Mantle
          </button>
        )}
        <Navbar.Collapse id="responsive-navbar-nav">
          {window.loaded_web3 && this.state.account.length > 0 ? (
            <>
              <Nav className="me-auto">
                {/* Product */}
                <NavDropdown
                  title={
                    <span className="categorynav dropdown-menu-center" style={{ paddingBottom: '10px' }}>
                      &nbsp;&nbsp;Product <i className="fa fa-chevron-down" style={{ fontSize: '12px' }}></i>
                      &nbsp;&nbsp;
                    </span>
                  }
                  id="collasible-nav-dropdown dropdown-menu-center"
                  flip="true"
                  style={{ margin: '0px', marginTop: '3px' }}
                >
                <NavDropdown.Item href="/product/draw" align="center" className="dal" >
                  <i className="fas fa-pencil-ruler mr10"></i>
                  <span>Zonulet Drawing</span>
                  </NavDropdown.Item>
                <NavDropdown.Divider />
                {/* <NavDropdown.Item href="/product/stake" align="center" className="dal" >
                  <i className="fas fa-envelope-open mr10"></i>
                  <span>Zonulet Staking</span>
                  <span style={{color: '#20ebf0', fontSize: '13px', top: '2px', left: '20px', position:'relative'}}></span>
                </NavDropdown.Item> */}
                <NavDropdown.Divider />
                <NavDropdown.Item href="https://amm.zonulet.io" align="center" className="dal" target="_blank" rel="noreferrer">
                  <i className="fas fa-bullseye mr10"></i>
                  <span>Zonulet AMM</span>
                  {/* <span style={{color: '#20ebf0', fontSize: '13px', top: '2px', left: '20px', position:'relative'}}>DexSwap</span> */}
                </NavDropdown.Item>
                <NavDropdown.Divider />
                </NavDropdown>
                {/* CATEGORIES */}
                <NavDropdown
                  title={
                    <span className="categorynav dropdown-menu-center" style={{ paddingBottom: '10px' }}>
                      &nbsp;&nbsp;Categories <i className="fa fa-chevron-down" style={{ fontSize: '12px' }}></i>
                      &nbsp;&nbsp;
                    </span>
                  }
                  id="collasible-nav-dropdown dropdown-menu-center"
                  flip="true"
                  style={{ margin: '0px', marginTop: '3px' }}
                >
                  <NavDropdown.Item href="/categories/art" align="center" className="dal" >
                  <i className="fa fa-palette mr10"></i>
                  <span>Art</span>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/categories/mantle" align="center" className="dal">
                  <i className="fa fa-power-off mr10"></i>
                  <span>Mantle</span>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/categories/photography" align="center" className="dal">
                  <i className="fa fa-photo-video mr10"></i>
                  <span>Photography</span>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/categories/metaverse" align="center" className="dal">
                  <i className="fab fa-megaport mr10"></i>
                  <span>Metaverse</span>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/categories/collectibles" align="center" className="dal">
                  <i className="fa fa-temperature-low mr10"></i>
                  <span>Collectibles</span>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/categories/fantasy" align="center" className="dal">
                  <i className="fa fa-dragon mr10"></i>
                  <span>Fantasy</span>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/categories/cards" align="center" className="dal">
                  <i className="fab fa-cc-diners-club mr10"></i>
                  <span>Trading Cards</span>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/categories/anime" align="center" className="dal">
                  <i className="fa fa-paw mr10"></i>
                  <span>Anime</span>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/categories/memes" align="center" className="dal">
                  <i className="fa fa-frog mr10"></i>
                  <span>Memes</span>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/categories/nsfw" align="center" className="dal">
                  <i className="fa fa-skull-crossbones mr11"></i>
                  <span>NSFW</span>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/categories/other" align="center" className="dal">
                  <i className="fa fa-vote-yea mr10"></i>
                  <span>OTHER</span>
                  </NavDropdown.Item>
                </NavDropdown>
                {/* EXPLORE */}
                <NavDropdown
                  title={
                    <span className="categorynav dropdown-menu-center" style={{ paddingBottom: '10px' }}>
                      &nbsp;&nbsp;Explore <i className="fa fa-chevron-down" style={{ fontSize: '12px' }}></i>
                      &nbsp;&nbsp;
                    </span>
                  }
                  id="collasible-nav-dropdown dropdown-menu-center"
                  flip="true"
                  style={{ margin: '0px', marginTop: '3px' }}
                >
                <NavDropdown.Item href="/explore/exploreall" align="center" className="dal">
                  <i className="fas fa-share-alt-square mr10"></i>
                  <span>All</span>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/explore/nftforsale" align="center" className="dal">
                  <i className="fas fa-cart-arrow-down mr10"></i>
                  <span>NFTs For Sale</span>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/explore/gifted" align="center" className="dal">
                  <i className="fa fa-glass-cheers mr10"></i>
                    <span>Recently Gifted</span>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/explore/minted" align="center" className="dal">
                  <i className="fa fa-gifts mr10"></i>
                  <span>Recently Minted</span>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/explore/searchallminted" align="center" className="dal">
                  <i className="fas fa-bullseye mr10"></i>
                  <span>Search All Minted</span>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/explore/purchased" align="center" className="dal">
                  <i className="fa fa-air-freshener mr10"></i>
                  <span>Recently Purchased</span>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href={'/collection/' + this.state.account} align="center" className="dal">
                  <i className="fab fa-delicious mr10"></i>
                  <span>My Public Collections</span>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                {/* <NavDropdown.Item href="/explore/exploreall" align="center" className="dal">
                  <i className="fab fa-themeco mr10"></i>
                  <span>Top Seller</span> 
                  <span style={{color: 'orange', fontSize: '11px', top: '4px', left: '6px', position:'relative'}}>(coming soon)</span>
                </NavDropdown.Item>
                <NavDropdown.Divider /> */}
                </NavDropdown>
              </Nav>
              <div className='socialBtn'>
              <Nav className="me-auto">
              <Nav.Link href="/" className="languageref">
                  <input type="submit" className="languageBtn" value="EN" />
              </Nav.Link>
              <hr className='multiDivider navbarDivider'></hr>
              <Nav.Link href="#" className='socialBtna' target="_blank" rel="noreferrer">
              <svg className="zooSvgIcon zooSvgIcon_big" focusable="false" aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" fill="none"><path d="M14.82 4.26001C14.6214 4.6157 14.4444 4.98303 14.29 5.36001C12.7728 5.12006 11.2273 5.12006 9.71004 5.36001C9.55563 4.98303 9.37864 4.6157 9.18004 4.26001C7.75083 4.50421 6.36144 4.94155 5.05004 5.56001C2.70498 8.9443 1.64148 13.053 2.05004 17.15C3.57828 18.2989 5.2935 19.1751 7.12004 19.74C7.53595 19.1906 7.90714 18.6087 8.23004 18C7.63411 17.7803 7.06134 17.5023 6.52004 17.17C6.6685 17.0712 6.80894 16.9609 6.94004 16.84C8.5185 17.6003 10.248 17.9952 12 17.9952C13.7521 17.9952 15.4816 17.6003 17.06 16.84C17.2 16.96 17.34 17.07 17.48 17.17C16.9358 17.4997 16.3636 17.7807 15.77 18.01C16.0795 18.6325 16.4408 19.228 16.85 19.79C18.6743 19.227 20.3866 18.3506 21.91 17.2C22.3284 13.1022 21.264 8.99019 18.91 5.61001C17.6134 4.97875 16.2377 4.52468 14.82 4.26001ZM8.68004 14.81C8.17962 14.7741 7.71258 14.5457 7.37696 14.1728C7.04134 13.7999 6.86323 13.3114 6.88004 12.81C6.8607 12.3079 7.03793 11.8181 7.37405 11.4446C7.71018 11.0711 8.1787 10.8435 8.68004 10.81C9.18138 10.8435 9.6499 11.0711 9.98603 11.4446C10.3222 11.8181 10.4994 12.3079 10.48 12.81C10.4994 13.3121 10.3222 13.8019 9.98603 14.1754C9.6499 14.5489 9.18138 14.7765 8.68004 14.81ZM15.32 14.81C14.8196 14.7741 14.3526 14.5457 14.017 14.1728C13.6813 13.7999 13.5032 13.3114 13.52 12.81C13.5007 12.3079 13.6779 11.8181 14.014 11.4446C14.3502 11.0711 14.8187 10.8435 15.32 10.81C15.8223 10.841 16.2923 11.0679 16.629 11.442C16.9656 11.816 17.142 12.3073 17.12 12.81C17.142 13.3128 16.9656 13.804 16.629 14.1781C16.2923 14.5521 15.8223 14.779 15.32 14.81Z"></path></svg>
              </Nav.Link>
              <Nav.Link href="#" className='socialBtna'target="_blank" rel="noreferrer">
              <svg className="zooSvgIcon" focusable="false" aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" fill="none"><path d="M4.28513 7.26902C4.29666 7.15424 4.28093 7.03835 4.23923 6.93079C4.19753 6.82323 4.13102 6.72703 4.04513 6.65002L2.27513 4.51702V4.19702H7.77313L12.0231 13.517L15.7591 4.19702H21.0001V4.51602L19.4851 5.96702C19.4217 6.01641 19.3727 6.08187 19.3432 6.15661C19.3136 6.23135 19.3046 6.31263 19.3171 6.39202V17.058C19.3044 17.1374 19.3133 17.2188 19.3429 17.2936C19.3724 17.3683 19.4216 17.4338 19.4851 17.483L20.9641 18.934V19.253H13.5281V18.934L15.0571 17.447C15.2091 17.297 15.2091 17.252 15.2091 17.023V8.40102L10.9501 19.218H10.3751L5.41713 8.40102V15.65C5.37613 15.955 5.47713 16.262 5.69213 16.483L7.68413 18.9V19.219H2.03613V18.9L4.02813 16.483C4.13293 16.3738 4.21075 16.2416 4.25537 16.097C4.29999 15.9524 4.31018 15.7993 4.28513 15.65V7.26902Z"></path></svg>
              </Nav.Link>
              <Nav.Link href="#" className='socialBtna'target="_blank" rel="noreferrer">
              <svg className="zooSvgIcon" focusable="false" aria-hidden="true" viewBox="0.5 0.5 16.5 16.5" width="16" height="16" fill="none"><path d="M0.980933 7.09703C0.980933 7.09703 8.05735 4.02377 10.5116 2.9416C11.4524 2.50877 14.6429 1.12358 14.6429 1.12358C14.6429 1.12358 16.1155 0.517618 15.9927 1.98931C15.9518 2.59533 15.6246 4.7163 15.2974 7.01047C14.8065 10.2569 14.2747 13.8063 14.2747 13.8063C14.2747 13.8063 14.1929 14.8019 13.4976 14.9751C12.8022 15.1482 11.6569 14.3691 11.4524 14.1959C11.2887 14.0661 8.38456 12.1182 7.32106 11.1659C7.03472 10.9062 6.70751 10.3868 7.36194 9.78078C8.83451 8.35234 10.5934 6.57763 11.6569 5.45221C12.1477 4.93275 12.6386 3.72076 10.5934 5.19245C7.68921 7.31348 4.82592 9.30463 4.82592 9.30463C4.82592 9.30463 4.17144 9.73746 2.94433 9.34788C1.71716 8.95836 0.285519 8.4389 0.285519 8.4389C0.285519 8.4389 -0.696122 7.78963 0.980933 7.09703Z"></path></svg>
              </Nav.Link>
              {/* TODO: TWITTER */}
              <Nav.Link href="#" className='socialBtna'target="_blank" rel="noreferrer">
              <svg className="zooSvgIcon" focusable="false" aria-hidden="true" viewBox="0 0 16 16" width="24" height="24" fill="none"><path d="M16 2.5423C15.4115 2.80411 14.7794 2.98111 14.1148 3.06066C14.7931 2.65346 15.3127 2.00818 15.558 1.24019C14.9137 1.62386 14.2086 1.89396 13.4732 2.03876C12.8748 1.39926 12.0215 1 11.0774 1C9.26523 1 7.79558 2.47281 7.79558 4.29064C7.79558 4.54821 7.82452 4.79949 7.88014 5.04075C5.15222 4.9033 2.73373 3.59325 1.11491 1.60263C0.832245 2.0888 0.670448 2.65405 0.670448 3.25715C0.670448 4.39866 1.24998 5.40582 2.13056 5.99579C1.60927 5.9796 1.09942 5.83853 0.64363 5.58438V5.62596C0.64363 7.22047 1.77485 8.55001 3.27649 8.85239C3.00064 8.92816 2.71115 8.96775 2.41166 8.96775C2.19992 8.96775 1.99448 8.94766 1.79379 8.90981C2.21148 10.2167 3.42367 11.168 4.85955 11.1949C3.73621 12.0777 2.32074 12.604 0.783396 12.604C0.518607 12.604 0.25691 12.5882 0 12.5571C1.45279 13.4911 3.17773 14.0363 5.03139 14.0363C11.0684 14.0363 14.3701 9.02203 14.3701 4.67364C14.3701 4.53088 14.367 4.38919 14.3601 4.248C15.0034 3.78153 15.5587 3.20394 16 2.5423Z"></path></svg>
              </Nav.Link>
              </Nav>
              </div>
              <Nav>
                <Nav.Link href="/mint" id="mintbtn">
                  <input type="submit" className="btn mintbtn" value="Mint NFT" />
                </Nav.Link>
                <NavDropdown
                  title={
                    this.state.ipfs !== '' &&
                    (this.state.mim === 'image/jpeg' ||
                      this.state.mim === 'image/png' ||
                      this.state.mim === 'image/gif') ? (
                      <div
                        style={{
                          position: 'relative',
                          width: '38px',
                          margin: '0 auto',
                        }}
                      >
                        <Img
                          src={`${process.env.REACT_APP_INFURA_GATEAWAY}` + this.state.ipfs}
                          cache
                          alt=""
                          border="0"
                          height="38px"
                          width="38px"
                          style={{ borderRadius: '50%' }}
                        />

                        {this.state.verified === true ? (
                          <div
                            style={{
                              position: 'absolute',
                              bottom: '-2px',
                              right: '-1px',
                            }}
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 12 12"
                              fill="#4E78FF"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4.78117 0.743103C5.29164 -0.247701 6.70826 -0.247701 7.21872 0.743103C7.52545 1.33846 8.21742 1.62509 8.8553 1.42099C9.91685 1.08134 10.9186 2.08304 10.5789 3.1446C10.3748 3.78247 10.6614 4.47445 11.2568 4.78117C12.2476 5.29164 12.2476 6.70826 11.2568 7.21872C10.6614 7.52545 10.3748 8.21742 10.5789 8.8553C10.9186 9.91685 9.91685 10.9186 8.8553 10.5789C8.21742 10.3748 7.52545 10.6614 7.21872 11.2568C6.70826 12.2476 5.29164 12.2476 4.78117 11.2568C4.47445 10.6614 3.78247 10.3748 3.1446 10.5789C2.08304 10.9186 1.08134 9.91685 1.42099 8.8553C1.62509 8.21742 1.33846 7.52545 0.743103 7.21872C-0.247701 6.70826 -0.247701 5.29164 0.743103 4.78117C1.33846 4.47445 1.62509 3.78247 1.42099 3.1446C1.08134 2.08304 2.08304 1.08134 3.1446 1.42099C3.78247 1.62509 4.47445 1.33846 4.78117 0.743103Z"
                                fill="#feda03"
                              ></path>
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M8.43961 4.23998C8.64623 4.43922 8.65221 4.76823 8.45297 4.97484L5.40604 8.13462L3.54703 6.20676C3.34779 6.00014 3.35377 5.67113 3.56039 5.47189C3.76701 5.27266 4.09602 5.27864 4.29526 5.48525L5.40604 6.63718L7.70475 4.25334C7.90398 4.04672 8.23299 4.04074 8.43961 4.23998Z"
                                fill="#151a2f"
                              ></path>
                            </svg>
                          </div>
                        ) : null}
                      </div>
                    ) : (
                      <div
                        style={{
                          position: 'relative',
                          width: '38px',
                          margin: '0 auto',
                        }}
                      >
                        <Jazzicon diameter={38} seed={jsNumberForAddress(this.state.account)} />

                        {this.state.verified === true ? (
                          <div
                            style={{
                              position: 'absolute',
                              bottom: '-2px',
                              right: '-1px',
                            }}
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 12 12"
                              fill="#4E78FF"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4.78117 0.743103C5.29164 -0.247701 6.70826 -0.247701 7.21872 0.743103C7.52545 1.33846 8.21742 1.62509 8.8553 1.42099C9.91685 1.08134 10.9186 2.08304 10.5789 3.1446C10.3748 3.78247 10.6614 4.47445 11.2568 4.78117C12.2476 5.29164 12.2476 6.70826 11.2568 7.21872C10.6614 7.52545 10.3748 8.21742 10.5789 8.8553C10.9186 9.91685 9.91685 10.9186 8.8553 10.5789C8.21742 10.3748 7.52545 10.6614 7.21872 11.2568C6.70826 12.2476 5.29164 12.2476 4.78117 11.2568C4.47445 10.6614 3.78247 10.3748 3.1446 10.5789C2.08304 10.9186 1.08134 9.91685 1.42099 8.8553C1.62509 8.21742 1.33846 7.52545 0.743103 7.21872C-0.247701 6.70826 -0.247701 5.29164 0.743103 4.78117C1.33846 4.47445 1.62509 3.78247 1.42099 3.1446C1.08134 2.08304 2.08304 1.08134 3.1446 1.42099C3.78247 1.62509 4.47445 1.33846 4.78117 0.743103Z"
                                fill="#feda03"
                              ></path>
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M8.43961 4.23998C8.64623 4.43922 8.65221 4.76823 8.45297 4.97484L5.40604 8.13462L3.54703 6.20676C3.34779 6.00014 3.35377 5.67113 3.56039 5.47189C3.76701 5.27266 4.09602 5.27864 4.29526 5.48525L5.40604 6.63718L7.70475 4.25334C7.90398 4.04672 8.23299 4.04074 8.43961 4.23998Z"
                                fill="#151a2f"
                              ></path>
                            </svg>
                          </div>
                        ) : null}
                      </div>
                    )
                  }
                  id="collasible-nav-dropdown dropdown-menu-right"
                  className="dropdown-menu-right"
                  alignRight
                  flip="true"
                >
                  <NavDropdown.Item href="#" align="center" className="bal">{this.state.account.substring(0, 15) + '...'}</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    href="https://amm.zonulet.io/#/swap?inputCurrency=BIT&outputCurrency=0x9C3a2429A288dBEA75C819Fd18C0b35a0C3E1361"
                    target="_blank"
                    align="center"
                    className="bal"
                  >
                    {this.state.balance} <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#00ff72' }}>ZONU</span>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    href="https://amm.zonulet.io/#/swap?inputCurrency=BIT&outputCurrency=0xCab6D79dD732779f081B5868AAb1e64F357e90A9"
                    target="_blank"
                    align="center"
                    className="bal"
                  >
                    {this.state.dezubalance} <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#00ff72' }}>DEZU</span>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/" target="_blank" align="center" className="bal">
                    {Number(this.state.mantlebalance)
                      .toString()
                      .slice(
                        0,
                        Number(this.state.mantlebalance)
                          .toString()
                          .indexOf('.') + 4,
                      )}{' '}
                    <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#00ff72' }}>BIT</span>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/editprofile/" align="center" className="bal">Edit Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  {this.state.verified !== true ? (
                    <NavDropdown.Item href="#" target="_blank"  align="center" className="bal">
                      Get Verified{' '}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ marginBottom: '3px' }}
                      >
                        <path
                          d="M4.78117 0.743103C5.29164 -0.247701 6.70826 -0.247701 7.21872 0.743103C7.52545 1.33846 8.21742 1.62509 8.8553 1.42099C9.91685 1.08134 10.9186 2.08304 10.5789 3.1446C10.3748 3.78247 10.6614 4.47445 11.2568 4.78117C12.2476 5.29164 12.2476 6.70826 11.2568 7.21872C10.6614 7.52545 10.3748 8.21742 10.5789 8.8553C10.9186 9.91685 9.91685 10.9186 8.8553 10.5789C8.21742 10.3748 7.52545 10.6614 7.21872 11.2568C6.70826 12.2476 5.29164 12.2476 4.78117 11.2568C4.47445 10.6614 3.78247 10.3748 3.1446 10.5789C2.08304 10.9186 1.08134 9.91685 1.42099 8.8553C1.62509 8.21742 1.33846 7.52545 0.743103 7.21872C-0.247701 6.70826 -0.247701 5.29164 0.743103 4.78117C1.33846 4.47445 1.62509 3.78247 1.42099 3.1446C1.08134 2.08304 2.08304 1.08134 3.1446 1.42099C3.78247 1.62509 4.47445 1.33846 4.78117 0.743103Z"
                          fill="#07efff"
                        ></path>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8.43961 4.23998C8.64623 4.43922 8.65221 4.76823 8.45297 4.97484L5.40604 8.13462L3.54703 6.20676C3.34779 6.00014 3.35377 5.67113 3.56039 5.47189C3.76701 5.27266 4.09602 5.27864 4.29526 5.48525L5.40604 6.63718L7.70475 4.25334C7.90398 4.04672 8.23299 4.04074 8.43961 4.23998Z"
                          fill="#151a2f"
                        ></path>
                      </svg>
                    </NavDropdown.Item>
                  ) : null}
                  <NavDropdown.Divider />
                  <NavDropdown.Item href={'#'} target="_blank" className="kal">
                  <i className="fab fa-twitter-square mr12"></i>
                  <span>Twitter</span>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href={'#'} target="_blank"  className="kal">
                  <i className="fab fa-telegram mr12"></i>
                  <span>Telegram</span>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href={'#'} target="_blank"  className="kal">
                  <i className="fab fa-discord mr12"></i>
                  <span>Discord</span>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href={'https://github.com/Agin-DropDisco/Mantle-Hackathon/tree/main/Mantle%20Mash%20-%20Gitcoin%20Hackathon%20Bounty%20-%20NFT%20%26%20Gaming'} target="_blank"  className="kal">
                  <i className="fab fa-github-square mr12"></i>
                  <span>Github</span>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href={'#'} target="_blank" className="bal">
                    Documentation 🡕
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href={'#'} target="_blank" className="balgreen">
                    Promote your NFT
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                </NavDropdown>
              </Nav>
            </>
          ) : null}
        </Navbar.Collapse>
      </Navbar>
      </div>
      <hr className='multiDivider'></hr>
      </header>
      </>
    )
  }
}

export default NavbarMain
