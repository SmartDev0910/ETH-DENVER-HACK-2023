
import Head from 'next/head'

import React, { Component } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { toast } from 'react-toastify'
import ZoNulet from '../abis/ZoNulet.json';
import ZonuletNFT from '../abis/ZonuletNFT.json';
import ZonuletNFTSale from '../abis/ZonuletNFTSale.json';
import ZonuletAvatars from '../abis/ZonuletAvatars.json';
import ZonuletVerified from '../abis/ZonuletVerified.json';
import ZonuletNFTLikes from '../abis/ZonuletNFTLikes.json';

import LazyLoad, { forceCheck } from 'react-lazyload';

import Modal from 'react-modal';

import ReactCanvasConfetti from 'react-canvas-confetti';

import ReactPlaceholder from "react-placeholder";
import {TextBlock, MediaBlock, TextRow, RectShape, RoundShape} from 'react-placeholder/lib/placeholders';
import "react-placeholder/lib/reactPlaceholder.css";

import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

import Jazzicon, { jsNumberForAddress }  from 'react-jazzicon';

import ScrollToTop from "react-scroll-to-top";

import LoadingOverlay from 'react-loading-overlay';

import Web3 from 'web3';

Modal.setAppElement('#root');

const canvasStyles = {
    position: 'fixed',
    pointerEvents: 'none',
    width: '100%',
    height: '100%',
    zIndex: '999999',
    top: 0,
    left: 0
};

const customStyle = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      backgroundColor: '#000',
      borderColor: '#004A8B',
      borderRadius: '15px',
      padding: '40px',
      color: '#FFF',
      bottom: 'auto',
      maxWidth: '550px',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const customStyle2 = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      backgroundColor: '#111',
      borderColor: '#004A8B',
      borderRadius: '15px',
      padding: '40px',
      color: '#FFF',
      bottom: 'auto',
      minWidth: '350px',
      maxWidth: '650px',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

class Landing extends Component {

    

    handleOpenModal () {
        this.setState({ showModal: true });
    }

    handleOpenZONUModal () {
        this.setState({ showZONUModal: true });
    }
      
    handleCloseModal () {
        this.setState({ showModal: false });
        localStorage.setItem('agreed', 'true');
    }

    handleCloseZONUModal () {
        this.setState({ showZONUModal: false });
    }

    render() {
    if (document.body && document.getElementById("mainfoot")) {
        // document.body.style.backgroundImage = "url(bg.jpg)";
        document.getElementById("mainfoot").style.display = "none";
    }

    return (

        <div>
        <ScrollToTop smooth />
        <LoadingOverlay
          active={this.state.txpend}
          spinner
          transition={false}
          text={'Waiting on...' + this.state.txs + ' transaction(s)'}
          styles={{
            overlay: base => ({
              ...base,
              background: 'rgba(0, 0, 0, 0.95)',
              position: 'fixed',
            }),
            wrapper: {
              width: '100%',
              height: '100%',
              borderRadius: '25px',
            },
          }}
        >
          <Modal
            animationDuration={1000}
            isOpen={this.state.showModal}
            contentLabel="Disclaimer"
            id="modalwarn"
            align="center"
            style={customStyle3}
            overlayClassName="myoverlay"
            onRequestClose={this.handleCloseModal}
          >
            <div align="center">
              <p>
              Welcome to the <strong>Zonulet NFT Marketplace</strong>! This market is open and decentralized on the
                Mantle Network. Anyone can mint NFTs and list them for sale. This results in possible fakes and
                scammers. We utilize different smart contracts to "Verify" or "Blacklist" users manually. Please use due diligence when making purchases of NFTs! When you buy a NFT here you are
                directly sending that user ZONU, there is no method of refunds. If it is too good to be true, it
                probably is!
              </p>
              <button className="btn btn-primary" onClick={this.handleCloseModal} align="center">
                I Understand
              </button>
            </div>
          </Modal>
          <Modal
            animationDuration={1000}
            isOpen={this.state.showZONUModal}
            contentLabel="Zonulet"
            id="modalZonulet"
            align="center"
            style={customStyle2}
            overlayClassName="myoverlay"
            onRequestClose={this.handleCloseZONUModal}
          >
            <button
              onClick={this.handleCloseZONUModal}
              className="btn btn-primary"
              align="right"
              style={{ top: '15px', right: '15px', position: 'absolute' }}
            >
              X
            </button>
            <h2 align="center">
              <img src="/harmony_revamp.svg" border="0" height="66px" width="66px" /> <i className="fa fa-arrow-right"></i>{' '}
              <img src="/zonulet_stndr_1.svg" border="0" height="66px" width="66px" />
            </h2>
            <br />
            <div align="center">
              <p>
                <h3>
                  Swap your <strong>BIT</strong> to <strong>ZONU</strong>
                </h3>
                <br />
                Balance{' '}
                <strong>
                  <span id="onebal">
                    {Number(this.state.mantlebalance)
                      .toString()
                      .slice(
                        0,
                        Number(this.state.mantlebalance)
                          .toString()
                          .indexOf('.') + 5,
                      )}
                  </span>
                </strong>{' '}
                BIT
                <br />
                <br />
                <form
                  onSubmit={event => {
                    event.preventDefault()
                    this.buyZonuin()
                  }}
                >
                  <input
                    type="number"
                    autoComplete="off"
                    step="any"
                    onChange={event => this.changeAmount(event.target.value)}
                    className="form-control"
                    border="0"
                    id="zonuamount"
                    placeholder="Amount of BIT"
                    style={{ padding: '20px' }}
                  />
                  <br />
                  Will get you{' '}
                  <strong>
                    ≈ <span id="amounttobuy">0</span>
                  </strong>{' '}
                  ZONU
                  <br />
                  <br />
                  <button
                    className="btn btn-primary swapbtn"
                    style={{ fontSize: '23px' }}
                    type="submit"
                    align="center"
                    disabled={window.web3 !== undefined ? false : true}
                  >
                    {window.web3 !== undefined ? 'SWAP' : 'CONNECT WALLET'}
                  </button>
                </form>
                <br />
                Balance{' '}
                <strong>
                  <span id="zonubal">{this.abbreviateNumber(Number(this.state.zonubalance))}</span>
                </strong>{' '}
                ZONU
                <br />
                <span style={{ color: '#ff5722' }}>
                  Max Balance <strong>1 Billion</strong> ZONU
                </span>
              </p>
            </div>
          </Modal>
          <div className="col-auto mx-4 align-middle" style={{ marginTop: '3vh' }}></div>
          <div className="row">
            <div className="col-md-12" align="center">
              <div className="row">
                <div className="featuredContainer my-auto align-middle">
                  <div className="col-md-6 blockReact1">
                    <h1 className="g-0 g-md-1 textReact">
                    YOUR FAVORITE NFT MARKETPLACE <br/>YOU HAVE NOT SEEN YET
                    </h1>
                    <span className="subheader">Zonulet is all-in-one place to cut any NFT deal in a few clicks</span>
                    <div className="blockButton1">
                      <a
                        type="button"
                        href="/explore/exploreall"
                        className="btn btn-primary rounded m-3 homeButton swapbtn homeButton3"
                      >
                        EXPLORE
                      </a>
                      <a type="button" onClick={this.handleOpenZONUModal} className="actionGroup">
                        <span className="pointer zonuletBuy">
                          <span className="zonuletBordering">BUY ZONU</span>
                        </span>
                      </a>
                    </div>
                    <div className="blockPowered" style={{display: 'block'}}>
                      <div className="poweredIconer">
                        <p className="textPowered" style={{textTransform: "uppercase"}}>
                        <span className='warningVersion'>
                        <span className='textWarning'>Mantle Mainnet Version</span>
                        </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 blockReact1">
                  <Carousel fade>
                  {/* <Carousel fade> */}
                  <Carousel.Item interval={10000}>
                  <Link
                          to={{
                            pathname: `/nft/0`,
                          }}
                        >
                      <div className="col-md-2 card cardW100 bg-light m-3 p-2">
                          <form onSubmit={event => {}}>
                            <div className="col-auto max-450">
                              <div className="text-secondary idbadge idbadgeOrange" align="center">
                              <span>Mano de Dios NFT</span>
                              </div>
                              <video
                                    alt="NFT"
                                    className="token rounded"
                                    autoPlay={true}
                                    muted={true}
                                    loop={true}
                                    controls
                                    playsInline
                                    src={
                                      'https://zonulet.infura-ipfs.io/ipfs/QmT1jEE2WWHtY7r8egcjsdpdL1byqorXLFmZJrTFzdJbQX '
                                    }
                                    type="video/mp4"
                                    style={{ background: '#21263e' }}
                                  >
                                    <source
                                      src={
                                        'https://zonulet.infura-ipfs.io/ipfs/QmT1jEE2WWHtY7r8egcjsdpdL1byqorXLFmZJrTFzdJbQX '
                                      }
                                      type="video/mp4"
                                    ></source>
                                  </video>
                            </div>
                          </form>
                      </div>
                      <Carousel.Caption>
                        <h3 style={{ color: '#20ebf047' }}>PREMIUM NFT</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                      </Carousel.Caption>
                      </Link>
                    </Carousel.Item>
                    {/*  */}
                    <Carousel.Item interval={10000}>
                      <div className="col-md-2 card cardW100 bg-light m-3 p-2 myes">
                      <Link
                          to={{
                            pathname: `/nft/1`,
                          }}
                        >
                          <form onSubmit={event => {}}>
                            <div className="col-auto max-450">
                              <div className="text-secondary idbadge idbadgeYellow" align="center">
                              <span>Honorable NFT</span>
                              </div>
                                  <Img
                                    alt="NFT"
                                    className="token rounded"
                                    src={
                                      'https://zonulet.infura-ipfs.io/ipfs/QmRqCMTFV8A6DuNQYNqS2GLf1T5WTRQZJDGTm12kscGsrV'
                                    }
                                    cache
                                    style={{ background: '#21263e' }}
                                  />
                            </div>
                          </form>
                      </Link>
                      </div>
                      <Carousel.Caption>
                        <h3 style={{ color: '#20ebf047' }}>PREMIUM NFT</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                      </Carousel.Caption>
                    </Carousel.Item>
                    {/*  */}
                    <Carousel.Item interval={10000}>
                    <Link
                          to={{
                            pathname: `/nft/2`,
                          }}
                        >
                      <div className="col-md-2 card cardW100 bg-light m-3 p-2">
                          <form onSubmit={event => {}}>
                            <div className="col-auto max-450">
                              <div className="text-secondary idbadge idbadgeGreen" align="center">
                              <span>Medal of Honor NFT</span>
                              </div>
                              <video
                                    alt="NFT"
                                    className="token rounded"
                                    autoPlay={true}
                                    muted={true}
                                    loop={true}
                                    controls
                                    playsInline
                                    src={
                                      'https://zonulet.infura-ipfs.io/ipfs/QmbduNXePR1mC8eN18QTimZDz7cGop2FRHsHPrV4RmQbvX'
                                    }
                                    type="video/mp4"
                                    style={{ background: '#21263e' }}
                                  >
                                    <source
                                      src={
                                        'https://zonulet.infura-ipfs.io/ipfs/QmbduNXePR1mC8eN18QTimZDz7cGop2FRHsHPrV4RmQbvX'
                                      }
                                      type="video/mp4"
                                    ></source>
                                  </video>
                            </div>
                          </form>
                      </div>
                      <Carousel.Caption>
                        <h3 style={{ color: '#20ebf047' }}>PREMIUM NFT</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                      </Carousel.Caption>
                    </Link>
                    </Carousel.Item>
                  </Carousel>
                  </div>
                </div>
              </div>
              <br />{' '}
              <div
                style={{
                  width: '80%',
                  padding: '15px',
                  borderRadius: '15px',
                  boxShadow: '#0b0d1ce0 -4px -3px 26px 0px'
                }}
                className="intro"
              >
                <div className="row" align="center">
                  <div className="col-md-4 gryBg">
                    <strong className="text-light">Total Value Locked</strong>
                    <br />
                    <ReactPlaceholder
                      type="rect"
                      ready={this.state.totalliquidity}
                      showLoadingAnimation={true}
                      color="#333"
                      style={{
                        width: '250px',
                        height: '50px',
                        marginBottom: '15px',
                        borderRadius: '15px',
                      }}
                    >
                      <h1
                        className="text-light"
                        style={{
                          textShadow: '1px 4px 5px #000',
                          fontWeight: 'black',
                        }}
                      >
                        $
                        <strong>
                          {this.state.totalliquidity.toLocaleString('en', {
                            style: 'decimal',
                            maximumFractionDigits: 0,
                            minimumFractionDigits: 0,
                          })}
                        </strong>
                      </h1>
                    </ReactPlaceholder>
                  </div>
                  <div className="col-md-4 gryBg">
                    <strong className="text-light">Zonulet Market Cap</strong>
                    <br />
                    <ReactPlaceholder
                      type="rect"
                      ready={this.state.mcap}
                      showLoadingAnimation={true}
                      color="#333"
                      style={{
                        width: '250px',
                        height: '50px',
                        marginBottom: '15px',
                        borderRadius: '15px',
                      }}
                    >
                      <h1
                        className="text-light"
                        style={{
                          textShadow: '1px 4px 5px #000',
                          fontWeight: 'black',
                        }}
                      >
                        $
                        <strong>
                          {this.state.mcap.toLocaleString('en', {
                            style: 'decimal',
                            maximumFractionDigits: 0,
                            minimumFractionDigits: 0,
                          })}
                        </strong>{' '}
                      </h1>
                    </ReactPlaceholder>
                  </div>
                  <div className="col-md-4 gryBg">
                    <strong className="text-light">Total NFTs</strong>
                    <br />
                    <ReactPlaceholder
                      type="rect"
                      ready={this.state.totalSupply}
                      showLoadingAnimation={true}
                      color="#333"
                      style={{
                        width: '250px',
                        height: '50px',
                        marginBottom: '15px',
                        borderRadius: '15px',
                      }}
                    >
                      <h1
                        className="text-light"
                        style={{
                          textShadow: '1px 4px 5px #000',
                          fontWeight: 'black',
                        }}
                      >
                        <strong>{this.state.totalSupply}</strong>
                      </h1>
                    </ReactPlaceholder>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </LoadingOverlay>
        <ReactCanvasConfetti refConfetti={this.getInstance} style={canvasStyles}/>
        </div>
    )

    }
        constructor(props) {
            super(props)
            this.state = {
                account: '',
                contract: null,
                sale_contract: null,
                totalSupply: 0,
                images: [],
                owners: [],
                percent: 0,
                oneamount: 0,
                minted: [],
                mintedcollection: '',
                mantlebalance: 0,
                zonubalance: 0,
                showModal: false,
                showZONUModal: false,
                totalliquidity: 0,
                totalcirc: 0,
                mcap: 0,
                txpend: false,
                txs: 0,
                imageData_name: [],
                imageData_ipfsData: [],
                imageData_mimeType: [],
                imageData_category: [],
                imageData_price: [],
                imageData_id: [],
                imageData_owner: [],
                imageData_icecount: [],
                imageData_likecount: [],
                mimages: [],
                mimageData_name: [],
                mimageData_ipfsData: [],
                mimageData_mimeType: [],
                mimageData_category: [],
                mimageData_price: [],
                mimageData_id: [],
                mimageData_owner: [],
                mimageData_icecount: [],
                mimageData_likecount: [],
                tximages: [],
                tximageData_name: [],
                tximageData_ipfsData: [],
                tximageData_mimeType: [],
                tximageData_category: [],
                tximageData_price: [],
                tximageData_id: [],
                tximageData_buyer: [],
                tximageData_boughtprice: [],
                tximageData_buyeripfs: [],
                tximageData_buyermim: [],
                tximageData_buyername: [],
                tximageData_verified: [],
                tximageData_usdprice: [],
                tximageData_oneprice: [],
                tximageData_icecount: [],
                tximageData_likecount: [],
                gtximages: [],
                gtximageData_name: [],
                gtximageData_ipfsData: [],
                gtximageData_mimeType: [],
                gtximageData_category: [],
                gtximageData_price: [],
                gtximageData_id: [],
                gtximageData_receiver: [],
                gtximageData_boughtprice: [],
                gtximageData_buyeripfs: [],
                gtximageData_buyermim: [],
                gtximageData_buyername: [],
                gtximageData_verified: [],
                feature_verified: [],
                iData_name: [],
                iData_ipfsData: [],
                iData_mimeType: [],
                iData_category: [],
                iData_price: [],
                iData_id: [],
                ready2: false,
                ready3: false,
                readymint: false,
                selling_to: '',
                selling_price: null,
                token_sale_contract: null,
                token_price: 0,
                zooAmount: 0,
                approved: [],
                blackListed: [],
                owned: '',
                ipfs: '',
                mim: '',
                name: '',
                transactions: [],
                gtransactions: []

            }
            this.handleOpenModal = this.handleOpenModal.bind(this);
            this.handleCloseModal = this.handleCloseModal.bind(this);
            this.handleOpenZONUModal = this.handleOpenZONUModal.bind(this);
            this.handleCloseZONUModal = this.handleCloseZONUModal.bind(this);
        }

    async componentWillMount() {


        await this.loadMantleData();
    }

    makeShot = (particleRatio, opts) => {
        this.animationInstance && this.animationInstance({
          ...opts,
          origin: { y: 0.7 },
          particleCount: Math.floor(200 * particleRatio),
        });
      }
    
      fire = () => {
        this.makeShot(0.25, {
          spread: 50,
          startVelocity: 55,
        })
    
        this.makeShot(0.2, {
          spread: 80,
        })
    
        this.makeShot(0.35, {
          spread: 100,
          decay: 0.91,
          scalar: 0.8,
        })
    
        this.makeShot(0.1, {
          spread: 200,
          startVelocity: 25,
          decay: 0.92,
          scalar: 1.5,
        })
    
        this.makeShot(0.1, {
          spread: 200,
          startVelocity: 45,
        })
      }
    
      handlerFire = () => {
        this.fire();
      };
    
      getInstance = (instance) => {
        this.animationInstance = instance;
      };

    abbreviateNumber = (number) => {
    
        // what tier? (determines SI symbol)
        var tier = Math.log10(Math.abs(number)) / 3 | 0;
    
        // if zero, we don't need a suffix
        if(tier === 0) return number;

        var SI_SYMBOL = ["", "k", "M", "B", "T", "P", "E"];
    
        // get suffix and determine scale
        var suffix = SI_SYMBOL[tier];
        var scale = Math.pow(10, tier * 3);
    
        // scale the number
        var scaled = number / scale;
    
        // format number and add suffix
        return scaled.toFixed(1) + suffix;
    }

    buyZonulet = () => {
        const web3 = window.web3;
        this.setState({ txpend: true })
        this.setState({ txs: 2 })

        const mantleabi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"}];
        
        const zonuletZDEXabi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"zonuAmount","type":"uint256"}],"name":"getEstimatedMANTLEforZONU","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"mantleAmount","type":"uint256"}],"name":"getEstimatedZONUforMANTLE","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"uniswapRouter","outputs":[{"internalType":"contract IUniswapV2Router02","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"zonuAmount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"zonulet","outputs":[],"stateMutability":"payable","type":"function"},{"stateMutability":"payable","type":"receive"}];    

        const contractszonulet = new web3.eth.Contract(zonuletZDEXabi, "0x527c79B07993067390780514cBC6c41E041E3e3e");

        const contractone = new web3.eth.Contract(mantleabi, "0x707f2fE56A440E766bec41aBC9fc8695567D0ceA");

        const slippage = this.state.zooAmount;

        // console.log(slippage);

        contractszonulet.methods.getEstimatedMANTLEforZONU(slippage.toString()).call()
        .then((receipt) => {
            const estone = receipt[0];
            // console.log(estone);

            contractone.methods.approve(
                "0x527c79B07993067390780514cBC6c41E041E3e3e",
                estone
            ).send({ from: this.state.account })
                .once('receipt', (receipt) => {
                    this.setState({ txpend: true })
                    this.setState({ txs: 1 })

                    // make new deadline one hour from now in epoch unix time
                    const deadline = Math.floor(Date.now() / 1000) + 6000;
                    // console.log(deadline);

                contractszonulet.methods.zonu(slippage.toString(), deadline).send({ from: this.state.account, value: estone })
                .once('receipt', async (receipt) => {

                    this.setState({ txpend: false });
                    this.setState({ txs: 0 });

                    this.handlerFire();

                    //console.log(receipt);
                    toast.success("Zonuleted BIT to ZONU successfully!")
                    
    
                }).catch(error => {
                    // Transaction rejected or failed
        
                    toast.error("Transaction failed on  Zooining from BIT!")
                    this.setState({ txpend: false });
                })    
            
            }).catch(error => {
                // Transaction rejected or failed
                console.log(error);
                toast.error("Transaction failed on MANTLE approval!")

                this.setState({ txpend: false });
            })   


        }).catch(error => {
            console.log(error);
            toast.error("Failed to get Zonulet estimate!");
            this.setState({ txpend: false });
        })        

    }

    changeAmount = (amount) => {

        if (amount > 0) {


        const web3 = new Web3('https://rpc.testnet.mantle.xyz');

        const zonuletZDEXabi2 = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"zonuAmount","type":"uint256"}],"name":"getEstimatedMANTLEforZONU","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"mantleAmount","type":"uint256"}],"name":"getEstimatedZONUforMANTLE","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"uniswapRouter","outputs":[{"internalType":"contract IUniswapV2Router02","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"zonuAmount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"zonulet","outputs":[],"stateMutability":"payable","type":"function"},{"stateMutability":"payable","type":"receive"}];    

        const contractszonulet2 = new web3.eth.Contract(zonuletZDEXabi2, "0x527c79B07993067390780514cBC6c41E041E3e3e");

        // console.log(slippage);

        this.setState({ oneamount: amount });
        
        var SI_SYMBOL = ["", "k", "M", "B", "T", "P", "E"];

        function abbreviateNumber(number){
        
            // what tier? (determines SI symbol)
            var tier = Math.log10(Math.abs(number)) / 3 | 0;
        
            // if zero, we don't need a suffix
            if(tier == 0) return number;
        
            // get suffix and determine scale
            var suffix = SI_SYMBOL[tier];
            var scale = Math.pow(10, tier * 3);
        
            // scale the number
            var scaled = number / scale;
        
            // format number and add suffix
            return scaled.toFixed(1) + suffix;
        }

        contractszonulet2.methods.getEstimatedMANTLEforZONU(web3.utils.toWei(amount.toString(), "ether")).call()
        .then((receipt) => {
            const estzonu = receipt[1];
            console.log(estzonu);

            this.setState({ zooAmount: estzonu });

            document.getElementById("amounttobuy").innerHTML = abbreviateNumber(estzonu / 1e18);

        }).catch(error => {
            console.log(error);
            toast.error("Failed to get Zonulet estimate!");
        })
    } else {
        document.getElementById("amounttobuy").innerHTML = 0;
    }

    }
    
    async like(e, owner, key) {
        e.preventDefault();
        e.stopPropagation();

        document.getElementById("like"+key).classList.add("fa-pulse"); 

        const web3t = window.web3;

        const accounts = await window.web3.eth.getAccounts()
        const acct = accounts[0];
        // console.log('set account');

        const abilike = ZonuletNFTLikes.abi;
        const contractlike = new web3t.eth.Contract(abilike, "0xB836b7225Cbf6C61A38Ad159E1E6ddc4fC937482");

        contractlike.methods.LikeNFT(owner, key).send({ from: acct })
        .once('receipt', (receipt) => {
            // console.log("NFT Liked!")
            toast.success("NFT Liked, Sweet!")
            document.getElementById("like"+key).classList.remove("fa-pulse"); 
            document.getElementById("like"+key).classList.add("liked");
            document.getElementById("count"+key).innerHTML = Number(document.getElementById("count"+key).innerHTML) + 1;

            // this.setState({ txpend: false })
            // this.setState({ txs: 0 })
        }).catch(error => {
            // Transaction rejected or failed
            document.getElementById("like"+key).classList.remove("fa-pulse"); 
            toast.error("Like failed!")
            console.log(error);
            // this.setState({ txpend: false });
        })  

    }

    async ice(e, owner, key) {
        e.preventDefault();
        e.stopPropagation();

        document.getElementById("ice"+key).classList.add("fa-pulse"); 

        const web3t = window.web3;

        const web3one = new Web3('https://rpc.testnet.mantle.xyz')

        const accounts = await window.web3.eth.getAccounts()
        const acct = accounts[0];
        // console.log('set account');

        const networkId = 5001
        const networkData = ZonuletNFT.networks[networkId]
        const abi = ZonuletNFT.abi
        const address = networkData.address
        const contract = new web3one.eth.Contract(abi, address)

        // Get minter of NFT
        const minted = await contract.getPastEvents('Transfer', { fromBlock: 31945605, toBlock: 'latest' })

        for (var i = 0; i < minted.length; i++) {
            this.setState({ minted: [...this.state.minted, minted[i].returnValues] })
        }

        // console.log(this.state.minted)

        for (i = 0; i < this.state.minted.length; i++) {
            // console.log(this.state.transactions[i]._buyer)
            // console.log(this.state.minted[i].tokenId)
            if (this.state.minted[i].tokenId == key) {
                // console.log('hoorah!');
                if (this.state.minted[i].from == "0x0000000000000000000000000000000000000000") {
                    // console.log('hoorah TWICE!')
                    // console.log(this.state.minted[i].to);
                    this.setState({ mintedcollection: this.state.minted[i].to })
                }
            }
            // if (key === this.state.minted[i].tokenId && this.state.minted[i].from === "0x0000000000000000000000000000000000000000") {
            //     console.log(this.state.minted[i].to)
            //     console.log('found key')
            //     this.setState({ mintedcollection: this.state.minted[i].to });
            // } else {
            //     console.log('no go');
            //     // Nothing atm
            // }
        }

        // console.log(this.state.mintedcollection)

        const abilike = ZonuletNFTLikes.abi;
        const contractlike = new web3t.eth.Contract(abilike, "0xB836b7225Cbf6C61A38Ad159E1E6ddc4fC937482");

        const abib = ZoNulet.abi
        const addressb = "0x9C3a2429A288dBEA75C819Fd18C0b35a0C3E1361"
        const token_contract = new web3t.eth.Contract(abib, addressb)      

        const iceprice = "1";

        token_contract.methods.approve(
            "0xB836b7225Cbf6C61A38Ad159E1E6ddc4fC937482",
            web3one.utils.toWei(iceprice, "ether")
        ).send({ from: acct, })
            .once('receipt', (receipt) => {

            contractlike.methods.PacmanNFT(this.state.mintedcollection, key).send({ from: acct })
            .once('receipt', (receipt) => {
                // console.log("NFT Liked!")
                toast.success("NFT Liked, Sweet!")
                document.getElementById("ice"+key).classList.remove("fa-pulse"); 
                document.getElementById("ice"+key).classList.add("iced");
                document.getElementById("counti"+key).innerHTML = Number(document.getElementById("counti"+key).innerHTML) + 1;

                // this.setState({ txpend: false })
                // this.setState({ txs: 0 })
                }).catch(error => {
                    // Transaction rejected or failed
                    document.getElementById("ice"+key).classList.remove("fa-pulse"); 
                    toast.error("Pacmaned Failed")
                    console.log(error);
                    // this.setState({ txpend: false });
                })  

        }).catch(error => {
            // Transaction rejected or failed
            document.getElementById("ice"+key).classList.remove("fa-pulse"); 
            toast.error("Pacmaned Failed")
            console.log(error);
            // this.setState({ txpend: false });
        })  

    }


    async loadMantleData() {

        // window.loaded_web3 = false;

        function randomNumber(min, max) { 
            return Math.random() * (max - min) + min;
        }

        if (localStorage.getItem('agreed') === 'true') {
            this.setState({ showModal: false })
        } else {
            this.setState({ showModal: true })
        }

        const web3 = window.web3;

        const web3t = new Web3('https://rpc.testnet.mantle.xyz')

        // Load account
        // const accounts = await web3.eth.getAccounts()
        // this.setState({ account: accounts[0] })

        if (typeof web3 !== 'undefined') {
            const accounts = await web3.eth.getAccounts()
            this.setState({ account: accounts[0] })
            this.setState({ connected: true })
            const chainId = await web3.eth.getChainId();
            if (chainId === 5001) {
                this.setState({ connected: true })
                // console.log(this.state.connected);
                // console.log(this.state.account);
            } else {
                this.setState({ connected: false })
            }            
        }

        setInterval(async () => {
            if (typeof web3 !== 'undefined' && this.state.showZONUModal === true) {
                const mantlebalance = web3.utils.fromWei(await web3.eth.getBalance(this.state.account), 'ether');
                if (mantlebalance > 0 && typeof mantlebalance !== 'undefined') {
                    this.setState({ mantlebalance });

                    document.getElementById("onebal").innerHTML = Number(mantlebalance).toFixed(4);

                    const abia = ZoNulet.abi
                    const addr = "0x9C3a2429A288dBEA75C819Fd18C0b35a0C3E1361"
                    const contract = new web3.eth.Contract(abia, addr);
                    const zonubal = await contract.methods.balanceOf(this.state.account).call();
                    if (zonubal > 0 && zonubal !== null) {
                        const zonubalance2 = web3.utils.fromWei(zonubal, 'ether');
                        const zonubalance = zonubalance2;

                        this.setState({ zonubalance });                       
                        
                        document.getElementById("zonubal").innerHTML = this.abbreviateNumber(Number(zonubalance));
                    }
                }
            }
            const abip = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"getLatestONEPrice","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"pairAddress","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"getLatestTokenPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
            const addp = "0x12Ba58BEb1F85cBEa91DB3Bf7681f66CAadF0fd6";
            const contractp = new web3t.eth.Contract(abip, addp);
            this.setState({ contractp })

            const abione = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"PauserAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"PauserRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"constant":true,"inputs":[],"name":"ERR_INVALID_ZERO_VALUE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ERR_NO_ERROR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"addPauser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isPauser","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renouncePauser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"}];
            const contractone = new web3t.eth.Contract(abione, "0x707f2fE56A440E766bec41aBC9fc8695567D0ceA");

    
            const oneprice = await contractp.methods.getLatestONEPrice().call() / 1e8;
            const zonuperOne = await contractp.methods.getLatestTokenPrice("0x06e6914ae4ee358b28eb613bbdff2c2ea7409523 ", 1).call();
            const zonuUsd = oneprice / (zonuperOne / 1e18);
            const mcap = Number(10 * zonuUsd) 


            const balONElp = await contractone.methods.balanceOf('0x06e6914Ae4EE358B28eB613BbdfF2C2Ea7409523').call() 
            const balDEZUONElp = await contractone.methods.balanceOf('0x50666016a1f3225F887cE17E9DdFE3e7fDAB2263').call() 
            const balUSDC = await contractone.methods.balanceOf('0x00507e1Bc8C476a955768B65E847886721C21586').call() 
            const balZOO = await contractone.methods.balanceOf('0x00507e1Bc8C476a955768B65E847886721C21586').call() 
            // const balDEZU = await contractone.methods.balanceOf('0xe57ea4FB02a27116E53C02d8DB64ba396a1A2CF6').call() 
            const balUSDCDEZU = await contractone.methods.balanceOf('0x7B68c7a5F7bE36811B366BcbFe005d610F1cE143').call() 
            const balZOOUSDC = await contractone.methods.balanceOf('0x75f41F4C5925b06E2b9614631119e322c295baC3').call() 



            var combine = 0
            combine = balONElp / 1e18
            combine += balDEZUONElp / 1e18
            combine += balUSDC / 1e18
            combine += balZOO / 1e18
            // combine += balDEZU / 1e18
            combine += balUSDCDEZU / 1e18
            combine += balZOOUSDC / 1e18

            // console.log(combine)
            const totalliquidity = combine * oneprice * 2

            // const totalliquidity = (balONElp / 1e18) * oneprice * 2;

            const abia = ZoNulet.abi
            const addr = "0x9C3a2429A288dBEA75C819Fd18C0b35a0C3E1361"
            const contract = new web3t.eth.Contract(abia, addr);
            const zonubal = await contract.methods.balanceOf('0x000000000000000000000000000000000000dead').call();
            const dead = web3t.utils.fromWei(zonubal, 'ether');

            const totalcirc = 100000000000 - dead;
    
            this.setState({ mcap }); 
            this.setState({ totalliquidity });
            this.setState({ totalcirc });

            const networkData = ZonuletNFT.networks[networkId]
            const abi = ZonuletNFT.abi
            const address = networkData.address
            const contractnft = new web3t.eth.Contract(abi, address)

            const totalSupply = await contractnft.methods.totalSupply().call()
            // console.log(totalSupply)
            this.setState({ totalSupply })   


        }, 5000);

        const networkId = 5001;
        
        const blackListed = [238, 239];
        this.setState({ blackListed });

        const sale_networkData = ZonuletNFTSale.networks[networkId]
        const sale_abi = ZonuletNFTSale.abi
        const sale_address = sale_networkData.address
        const sale_contract = new web3t.eth.Contract(sale_abi, sale_address)
        this.setState({ sale_contract })

        const networkData = ZonuletNFT.networks[networkId]
        const abi = ZonuletNFT.abi
        const address = networkData.address
        const contract = new web3t.eth.Contract(abi, address)
        
        const abiv = ZonuletVerified.abi
        const addv = "0xB8D6deA2b38ED7E8194C50ad7Ae163B36ff2b03a"
        const contractv = new web3t.eth.Contract(abiv, addv)

        const abia = ZonuletAvatars.abi
        const addr = "0xEd1A69efced001468a9F7c469fe1F8640e7583C4"
        const contractav = new web3t.eth.Contract(abia, addr)

        const abip = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"getLatestONEPrice","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"pairAddress","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"getLatestTokenPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
        const addp = "0x12Ba58BEb1F85cBEa91DB3Bf7681f66CAadF0fd6";
        const contractp = new web3t.eth.Contract(abip, addp);
        this.setState({ contractp })

        const oneprice = await contractp.methods.getLatestONEPrice().call() / 1e8;
        const zonuperOne = await contractp.methods.getLatestTokenPrice("0x06e6914ae4ee358b28eb613bbdff2c2ea7409523", 1).call();
        const zonuUsd = oneprice / (zonuperOne / 1e18);

        const abilike = ZonuletNFTLikes.abi;
        const contractlike = new web3t.eth.Contract(abilike, "0xB836b7225Cbf6C61A38Ad159E1E6ddc4fC937482");

        const abiblack = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"hashAddress","type":"address"},{"indexed":false,"internalType":"bool","name":"blacklisted","type":"bool"}],"name":"SetBlackListedAddress","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"nftID","type":"uint256"},{"indexed":false,"internalType":"bool","name":"blacklisted","type":"bool"}],"name":"SetBlackListedNFT","type":"event"},{"inputs":[],"name":"AddyCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"IDCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"blAddress","type":"address"}],"name":"getBlackListedAddress","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"nftID","type":"uint256"}],"name":"getBlackListedNFT","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"idupdates","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addy","type":"address"},{"internalType":"bool","name":"blacklisted","type":"bool"}],"name":"setBlackListedAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"nftID","type":"uint256"},{"internalType":"bool","name":"blacklisted","type":"bool"}],"name":"setBlackListedNFT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"updates","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}];
        const contractblack = new web3t.eth.Contract(abiblack, "0x0739948117Ee512eF799132c611c28B201B87c1b");

        const mantleabi = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"PauserAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"PauserRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"constant":true,"inputs":[],"name":"ERR_INVALID_ZERO_VALUE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ERR_NO_ERROR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"addPauser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isPauser","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renouncePauser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"}];

        var SI_SYMBOL = ["", "k", "M", "B", "T", "P", "E"];

        function abbreviateNumber(number){
        
            // what tier? (determines SI symbol)
            var tier = Math.log10(Math.abs(number)) / 3 | 0;
        
            // if zero, we don't need a suffix
            if(tier == 0) return number;
        
            // get suffix and determine scale
            var suffix = SI_SYMBOL[tier];
            var scale = Math.pow(10, tier * 3);
        
            // scale the number
            var scaled = number / scale;
        
            // format number and add suffix
            return scaled.toFixed(1) + suffix;
        }

        if (typeof web3 !== 'undefined') {            
            const mantlebalance = web3.utils.fromWei(await web3.eth.getBalance(this.state.account), 'ether');
            this.setState({ mantlebalance });
            // console.log(mantlebalance)
        }
        if (typeof web3 !== 'undefined') {   
            const abia = ZoNulet.abi
            const addr = "0x9C3a2429A288dBEA75C819Fd18C0b35a0C3E1361"
            const contract = new web3.eth.Contract(abia, addr);
            const zonubal = await contract.methods.balanceOf(this.state.account).call();
            const zonubalance2 = web3.utils.fromWei(zonubal, 'ether');
            const zonubalance = zonubalance2;

            this.setState({ zonubalance });
        }



        this.setState({ contractblack })

        this.setState({ contractlike })

        // console.log(contract)
        this.setState({ contractav })       
        // console.log(contract)
        this.setState({ contractv })

        this.setState({ contract })


        const totalSupply = await contract.methods.totalSupply().call()
        // console.log(totalSupply)
        this.setState({ totalSupply })   


        // console.log(sale_contract)
        const transactions = await sale_contract.getPastEvents('BoughtNFT', { fromBlock: 31945605, toBlock: 'latest' })

        const gtransactions = await sale_contract.getPastEvents('GiftedNFT', { fromBlock: 31945605, toBlock: 'latest' })
        // console.log(transactions)

        // if (this.state.transactions !== transactions) {
        this.setState({ transactions: transactions })

        this.setState({ gtransactions: gtransactions })
        // }
    }

}

export default Landing;

