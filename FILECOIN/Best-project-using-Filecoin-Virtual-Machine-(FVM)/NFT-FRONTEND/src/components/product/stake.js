import React, { Component } from 'react'
import ReactCanvasConfetti from 'react-canvas-confetti'
import { NavDropdown } from 'react-bootstrap'
import ReactPlaceholder from 'react-placeholder'
import 'react-placeholder/lib/reactPlaceholder.css'
import { toast } from 'react-toastify'
import 'react-sweet-progress/lib/style.css'
import Modal from 'react-modal'
import LoadingOverlay from 'react-loading-overlay'
import Web3 from 'web3'
import ZoNulet from '../../abis/ZoNulet.json'
import ZonuletNFT from '../../abis/ZonuletNFT.json'
import ZonuletNFTSale from '../../abis/ZonuletNFTSale.json'
import ZonuletAvatars from '../../abis/ZonuletAvatars.json'
import ZonuletVerified from '../../abis/ZonuletVerified.json'
import ZonuletNFTLikes from '../../abis/ZonuletNFTLikes.json'

Modal.setAppElement('#root')

const canvasStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  width: '100%',
  height: '100%',
  zIndex: '999999',
  top: 0,
  left: 0,
}

const customStyle2 = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    backgroundColor: '#111',
    borderColor: '#004A8B',
    borderRadius: '15px',
    padding: '40px',
    color: '#151a2f',
    bottom: 'auto',
    minWidth: '350px',
    maxWidth: '650px',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    
  },
}

class Stake extends Component {
  handleOpenZONUModal() {
    this.setState({ showZONUModal: true })
  }

  handleCloseZONUModal() {
    this.setState({ showZONUModal: false })
  }

  render() {
    return (
      <div>
        <LoadingOverlay
          active={this.state.txpend}
          spinner
          transition={false}
          text={'Waiting on...' + [this.state.txs] + ' Transaction(s)  Please Wait...'}
          styles={{
            overlay: base => ({
              ...base,
              background: 'rgba(0, 0, 0, 0.95)',
              position: 'fixed',
              color: '#ffc107',
              fontWeight: 'bold',
              letterSpacing: '1px'
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
            isOpen={this.state.showZONUModal}
            contentLabel="Zonulet LP Deposit"
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
              <img src="/zonu_one_lp_balance.svg" border="0" height="66px" width="132px" alt="lplogo"/>
            </h2>
            <br />
            <div align="center">
              <h3>
                Deposit your <strong>ZONU-ONE</strong> LP Tokens
              </h3>
              <br />
              <form
                onSubmit={event => {
                  event.preventDefault()
                  this.handleDeposit()
                }}
              >
                <input
                  type="text"
                  className="form-control"
                  placeholder={this.state.balanceLP.toFixed(4)}
                  onChange={event => this.setState({ amounttodep: event.target.value })}
                  style={{ maxWidth: '200px' }}
                />
                <button type="submit" className="btn btn-primary rounded m-3 homeButton liquid">
                  DEPOSIT
                </button>
              </form>
              <div align="center">OR</div>
              <form
                onSubmit={event => {
                  event.preventDefault()
                  this.handleDepositMax()
                }}
              >
                <button type="submit" className="btn btn-primary rounded m-3 liquid">
                  DEPOSIT MAX
                </button>
              </form>
            </div>
          </Modal>
          <div className="head-title col-auto mx-4">
            <h4 className="mb-0 font-weight-normal">Zonulet Liquidity Pool Stake</h4>
          </div>
          <div className="row home-adj">
            <div className="col-md-12" align="center">
              <div className="row">
                <div className="col-md-12">
                  <h2 className="font65">
                    <span>ZONU</span>&nbsp;&nbsp;
                    <span>LIQUIDITY</span>
                    <br />
                    <span>STAKING POOL</span>
                  </h2>
                  &nbsp;
                  <br />
                  &nbsp;
                  <br />
                </div>

                <div className="col-md-6" style={{ marginTop: 'auto' }}>
                <NavDropdown.Divider />
                  <div
                    className="text-secondary my-auto align-middle align-self-center my-auto justify-content-center "
                    style={{
                      fontSize: '18px',
                      lineHeight: 1.5,
                      wordSpacing: 2,
                      background: '#1b223d',
                      padding: '30px',
                      borderRadius: '15px',
                      paddingTop: '40px',
                      minHeight: '360px',
                      width: '80%',
                      color: '#aaa',
                      verticalAlign: 'middle',
                      display: 'table-cell',
                    }}
                  >
                    <div className="row">
                      <div className="col-12">
                        <strong className='textLight'>Total Zonulet Liquidity</strong>
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
                          <h1 className="text-light">
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
                    </div>
                    This is where you can <strong>stake your ZONU/ONE LP Tokens</strong>
                    <br />
                    Earn ZONU rewards from supporting our liquidity pool on <strong>Viperswap</strong>.<br />
                    <br />
                    <p>
                      <h4>
                        = 83.3m ZONU per day split amongst all stakers
                        <br />
                        <span className='textLight' id="countdown"></span> remaining
                      </h4>
                    </p>
                    <ReactPlaceholder
                      type="rect"
                      ready={this.state.rewardRate}
                      showLoadingAnimation={true}
                      color="#333"
                      style={{
                        width: '250px',
                        height: '50px',
                        marginBottom: '15px',
                        borderRadius: '15px',
                      }}
                    >
                      <h4 style={{ fontSize: '18px' }} className='textLight'>
                        1 ZONU = $
                        {this.state.oneusd.toString().slice(
                          0,
                          Number(this.state.oneusd)
                            .toString()
                            .indexOf('.') + 3,
                        )}{' '}
                        USD
                      </h4>
                      <h3 className="text-light" style={{ fontSize: '22px' }}>
                        Estimate = &nbsp;
                        {Math.trunc(
                          (((Number(5184000) * (this.state.rewardRate / 1e18) * 60) / 5000000000) * 100) / 12,
                        )}
                        % APY
                      </h3>
                    </ReactPlaceholder>
                  </div>
                <NavDropdown.Divider />
                  <br />
                  <br />
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-6 text-light">
                      <br />
                      <img src="/zonulet_stndr_1.svg" height="75px" width="75px" border="0" alt="zonublue" />
                      <br />
                      <br />
                      <h3>ZONU Balance</h3>
                      <div
                        style={{
                          backgroundColor: '#151a2f',
                          borderRadius: '5px',
                          padding: '10px',
                        }}
                      >
                        <ReactPlaceholder
                          type="rect"
                          ready={this.state.balance}
                          showLoadingAnimation={true}
                          color="#333"
                          style={{
                            width: '200px',
                            height: '60px',
                            borderRadius: '15px',
                            backgroundColor: '#1e243c96',
                            boxShadow: '-4px -3px 26px 0 rgb(10 12 22 / 63%)'
                          }}
                        >
                          {' '}
                          {this.state.balance.toString().slice(
                            0,
                            Number(this.state.balance)
                              .toString()
                              .indexOf('.') + 3,
                          )}{' '}
                          ZONU
                          <br />
                          ≈$
                          {Number(this.state.usdbal)
                            .toString()
                            .slice(
                              0,
                              Number(this.state.usdbal)
                                .toString()
                                .indexOf('.') + 3,
                            )}{' '}
                          USD
                        </ReactPlaceholder>
                      </div>
                    </div>
                    <div className="col-md-6 text-light">
                      <br />
                      <img src="/zonu_one_lp_balance.svg" height="75px" width="150px" border="0" alt="zonublue" />
                      <br />
                      <br />
                      <h3>ZONU/ONE LP Balance</h3>
                      <div
                        style={{
                          backgroundColor: '#151a2f',
                          borderRadius: '5px',
                          padding: '10px',
                        }}
                      >
                        <ReactPlaceholder
                          type="rect"
                          ready={this.state.balanceLP}
                          showLoadingAnimation={true}
                          color="#333"
                          style={{
                            width: '200px',
                            height: '60px',
                            borderRadius: '15px',
                            backgroundColor: '#1e243c96',
                            boxShadow: '-4px -3px 26px 0 rgb(10 12 22 / 63%)'
                          }}
                        >
                          {this.state.balanceLP.toString().slice(
                            0,
                            Number(this.state.balanceLP)
                              .toString()
                              .indexOf('.') + 5,
                          )}{' '}
                          LP
                          <br />
                          {this.state.percentageLP}% of liquidity total
                        </ReactPlaceholder>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 text-light">
                      <br />
                      <img src="/zonu_one_lp_balance.svg" height="75px" width="150px" border="0" alt="zonublue" />
                      <br />
                      <br />
                      <h3>Balance in Stake</h3>
                      <div
                        style={{
                          backgroundColor: '#151a2f',
                          borderRadius: '5px',
                          padding: '10px',
                        }}
                      >
                        <ReactPlaceholder
                          type="rect"
                          ready={this.state.balPool}
                          showLoadingAnimation={true}
                          color="#333"
                          style={{
                            width: '200px',
                            height: '60px',
                            borderRadius: '15px',
                            backgroundColor: '#1e243c96',
                            boxShadow: '-4px -3px 26px 0 rgb(10 12 22 / 63%)'
                          }}
                        >
                          {Number(this.state.balPool).toFixed(2)} LP
                          <br />
                          {this.state.percentagePool}% of pool total
                        </ReactPlaceholder>
                      </div>
                    </div>
                    <div className="col-md-6 text-light">
                      <br />
                      <img src="/zonulet_stndr_1.svg" height="75px" width="75px" border="0" alt="zonublue" />
                      <br />
                      <br />
                      <h3>Rewards</h3>
                      <div
                        style={{
                          backgroundColor: '#151a2f',
                          borderRadius: '5px',
                          padding: '10px',
                        }}
                      >
                        <ReactPlaceholder
                          type="rect"
                          ready={this.state.rewardbal}
                          showLoadingAnimation={true}
                          color="#333"
                          style={{
                            width: '200px',
                            height: '60px',
                            borderRadius: '15px',
                            backgroundColor: '#1e243c96',
                            boxShadow: '-4px -3px 26px 0 rgb(10 12 22 / 63%)'
                          }}
                        >
                          {this.state.earned.toString().slice(
                            0,
                            Number(this.state.earned)
                              .toString()
                              .indexOf('.') + 3,
                          )}{' '}
                          ZONU
                          <br />
                          ≈$
                          {Number(this.state.rewardbal)
                            .toString()
                            .slice(
                              0,
                              Number(this.state.rewardbal)
                                .toString()
                                .indexOf('.') + 3,
                            )}{' '}
                          USD
                        </ReactPlaceholder>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <br />
              <br />
              <div className="row">
                <div className="col-md-4">
                  <div id="claim" style={{ display: 'none' }}>
                    <form
                      onSubmit={event => {
                        event.preventDefault()
                        this.handleClaim()
                      }}
                    >
                      <button type="submit" className="btn btn-primary rounded m-3 homeButton liquid">
                        CLAIM
                      </button>
                    </form>
                  </div>
                </div>
                <div className="col-md-4">
                  <div id="approval" style={{ display: 'block' }}>
                    <form
                      onSubmit={event => {
                        event.preventDefault()
                        this.handleApprove('test')
                      }}
                    >
                      <button type="submit" className="btn btn-primary rounded m-3 homeButton liquid">
                        APPROVE
                      </button>
                    </form>
                  </div>
                  <div id="deposit" style={{ display: 'none' }}>
                    <button
                      className="btn btn-primary rounded m-3 homeButton liquid"
                      onClick={this.handleOpenZONUModal}
                    >
                      DEPOSIT
                    </button>
                  </div>
                </div>
                <div className="col-md-4">
                  <div id="withdraw" style={{ display: 'none' }}>
                    <form
                      onSubmit={event => {
                        event.preventDefault()
                        this.handleWithdraw()
                      }}
                    >
                      <button type="submit" className="btn btn-primary rounded m-3 homeButton liquid">
                        WITHDRAW
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-3" align="center" style={{ padding: '30px' }}>
                  <h3 className="text-light">
                    <p>
                      <i className="fa fa-water fa-2x" style={{ color: '#0dcaf0' }}></i>
                    </p>
                    Get liquid
                  </h3>
                  <p className="text-secondary jtlast">
                    Once you’ve added both ZONU and ONE to our liquidity pool in DexSwap/Viperswap you can then deposit
                    them here to earn additional ZONU!
                  </p>
                </div>
                <div className="col-md-3" align="center" style={{ padding: '30px' }}>
                  <h3 className="text-light">
                    <p>
                      <i className="fa fa-angle-double-down fa-2x" style={{ color: '#0dcaf0' }}></i>
                    </p>
                    Deposit LP
                  </h3>
                  <p className="text-secondary jtlast">
                    Click Approve, then enter in an amount of ZONU/ONE LP Tokens to deposit and click "DEPOSIT". LP
                    Tokens can be obtained from putting in ZONU/ONE liquidity on ViperSwap
                  </p>
                </div>
                <div className="col-md-3" align="center" style={{ padding: '30px' }}>
                  <h3 className="text-light">
                    <p>
                      <i className="fa fa-coins fa-2x" style={{ color: '#0dcaf0' }}></i>
                    </p>
                    Earn
                  </h3>
                  <p className="text-secondary jtlast">
                    Earn ZONU from the fixed rate liquidity token staking pool contract. As long as the pool period is
                    open you will earn rewards. Claim ZONU rewards and just hold to earn DEZU!
                  </p>
                </div>
                <div className="col-md-3" align="center" style={{ padding: '30px' }}>
                  <h3 className="text-light">
                    <p>
                      <i className="fa fa-shopping-bag fa-2x" style={{ color: '#0dcaf0' }}></i>
                    </p>
                    Buy a NFT
                  </h3>
                  <p className="text-secondary jtlast">
                    With the extra ZONU you are now earning from providing liquidity and staking it, you can buy more
                    NFTs! Or you can just hold your ZONU which earns you DEZU!
                  </p>
                </div>
              </div>
              <a
                type="button"
                href="https://viperswap.one/#/add/ONE/0x565F39F6B8367a67317349c97dd78B8e4224db5C"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary rounded m-3 homeButton liquid2"
              >
                Get ZONU/ONE on
                <br />
                Viperswap LP Tokens
              </a>
              <br />
              <br />
              <div className="row justify-content-around">
                <p align="center" className="text-light tbg">
                  Prices of ZONU and ONE in USD are powered by our Zonulet Harmony LINK Price Oracle Contract
                </p>
              </div>
            </div>
          </div>
        </LoadingOverlay>
        <ReactCanvasConfetti refConfetti={this.getInstance} style={canvasStyles} />
      </div>
    )
  }
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      contract: null,
      contractlp: null,
      sale_contract: null,
      showZONUModal: false,
      mcap: 0,
      totalSupply: 0,
      balance: 0,
      rewardRate: 0,
      rewards: 0,
      earned: 0,
      oneusd: 0,
      balanceInPool: 0,
      rewardbal: 0,
      balPool: 0,
      percentagePool: 0,
      approved: false,
      balanceLP: 0,
      usdBal: 0,
      amounttodep: 0,
      txpend: false,
      totalliquidity: 0,
      txs: 0,
      percentageLP: 0,
    }
    this.handleOpenZONUModal = this.handleOpenZONUModal.bind(this)
    this.handleCloseZONUModal = this.handleCloseZONUModal.bind(this)
  }

  async UNSAFE_componentWillMount() {
    await this.loadFilecoinData()
  }

  handleApprove = async () => {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    const account = accounts[0]

    this.setState({ txpend: true })
    this.setState({ txs: 1 })
    const abillp = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint112","name":"reserve0","type":"uint112"},{"indexed":false,"internalType":"uint112","name":"reserve1","type":"uint112"}],"name":"Sync","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MINIMUM_LIQUIDITY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint112","name":"_reserve0","type":"uint112"},{"internalType":"uint112","name":"_reserve1","type":"uint112"},{"internalType":"uint32","name":"_blockTimestampLast","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_token0","type":"address"},{"internalType":"address","name":"_token1","type":"address"}],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"kLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"price0CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"price1CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"skim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount0Out","type":"uint256"},{"internalType":"uint256","name":"amount1Out","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swap","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"sync","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]

    const contractlp = new web3.eth.Contract(abillp, '0x06e6914ae4ee358b28eb613bbdff2c2ea7409523')
    contractlp.methods
      .approve('0x4a99667cDaA00846961f6FBC2eAaE623C308Dc4E', '999999999999900000000000000')
      .send({ from: account })
      .once('receipt', receipt => {
        // console.log(receipt)
        // console.log('Approved')

        this.setState({ txpend: false })
        this.setState({ txs: 0 })

        localStorage.setItem('stakeapprove', 'true')
        this.setState({ approved: true })

        document.getElementById('approval').style.display = 'none'
        document.getElementById('deposit').style.display = 'block'
        document.getElementById('withdraw').style.display = 'block'
        document.getElementById('claim').style.display = 'block'
      })
      .catch(error => {
        // console.log(error)
        this.setState({ txpend: false })
        this.setState({ txs: 0 })
      })
  }

  handleDeposit = async () => {
    // const testnetHarmonyRpc = 'https://rpc.testnet.mantlenetwork.io'
    const web3one = new Web3('https://rpc.testnet.mantlenetwork.io')
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    const account = accounts[0]

    this.setState({ txpend: true })
    this.setState({ txs: 1 })

    const abipool = [{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"earned","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"rewards","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_rewardDistribution","type":"address"}],"name":"setRewardDistribution","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"rewardDistribution","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"DURATION","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"rewardRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"zonu","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"zooinlp","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"stake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"lastUpdateTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerToken","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerTokenStored","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"exit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"periodFinish","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"user","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"user","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"user","type":"address"},{"indexed":false,"name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}]
    const contractpool = new web3.eth.Contract(abipool, '0x4a99667cDaA00846961f6FBC2eAaE623C308Dc4E')
    contractpool.methods
      .stake(web3one.utils.toWei(this.state.amounttodep, 'ether'))
      .send({ from: account })
      .once('receipt', receipt => {
        console.log(receipt)
        console.log('Deposited LP Tokens!')
        toast.success('Deposited LP Tokens!')

        this.setState({ txpend: false })
        this.setState({ txs: 0 })

        // localStorage.setItem('stakeapprove', 'true');

        // document.getElementById("approval").style.display = "none";
        this.handleCloseZONUModal()
        document.getElementById('deposit').innerHTML =
          "<h4 style='color: #00ff5a;margin-top:30px;'>Deposited ZONU LP Tokens!</h4>"
        this.handlerFire()
      })
      .catch(error => {
        // console.log(error)
        this.setState({ txpend: false })
        this.setState({ txs: 0 })
      })
  }

  handleDepositMax = async () => {

    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    const account = accounts[0]

    this.setState({ txpend: true })
    this.setState({ txs: 1 })
    const abipool = [{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"earned","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"rewards","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_rewardDistribution","type":"address"}],"name":"setRewardDistribution","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"rewardDistribution","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"DURATION","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"rewardRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"zonu","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"zooinlp","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"stake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"lastUpdateTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerToken","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerTokenStored","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"exit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"periodFinish","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"user","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"user","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"user","type":"address"},{"indexed":false,"name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}]

    const contractpool = new web3.eth.Contract(abipool, '0x4a99667cDaA00846961f6FBC2eAaE623C308Dc4E') //ZooInPool/ZonuletPool

    function toPlainString(num) {
      return ('' + +num).replace(/(-?)(\d*)\.?(\d*)e([+-]\d+)/, function(a, b, c, d, e) {
        return e < 0 ? b + '0.' + Array(1 - e - c.length).join(0) + c + d : b + c + d + Array(e - d.length + 1).join(0)
      })
    }

    const balance = toPlainString(this.state.balanceLP * 1e18 - this.state.balanceLP * 1e18 * 0.00001)

    // console.log(balance)

    if (this.state.balanceLP > 0) {
      const balLP = balance.toString()
      // console.log(balLP)
      contractpool.methods
        .stake(balLP)
        .send({ from: account })
        .once('receipt', receipt => {
          console.log(receipt)
          console.log('Deposited LP Tokens!')
          toast.success('Deposited LP Tokens!')

          this.setState({ txpend: false })
          this.setState({ txs: 0 })

          // localStorage.setItem('stakeapprove', 'true');

          // document.getElementById("approval").style.display = "none";
          this.handleCloseZONUModal()
          document.getElementById('deposit').innerHTML =
            "<h4 style='color: #00ff5a;margin-top:30px;'>Deposited ZONU LP Tokens!</h4>"
          this.handlerFire()
        })
        .catch(error => {
          console.log(error)
          this.setState({ txpend: false })
          this.setState({ txs: 0 })
        })
    }
  }

  makeShot = (particleRatio, opts) => {
    this.animationInstance &&
      this.animationInstance({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio),
      })
  }

  fire = () => {
    this.makeShot(0.25, {
      spread: 100,
      startVelocity: 55,
    })

    this.makeShot(0.2, {
      spread: 180,
    })

    this.makeShot(0.35, {
      spread: 150,
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
    this.fire()
  }

  getInstance = instance => {
    this.animationInstance = instance
  }

  handleWithdraw = async () => {
    // const testnetHarmonyRpc = 'https://rpc.testnet.mantlenetwork.io'
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    const account = accounts[0]

    this.setState({ txpend: true })
    this.setState({ txs: 1 })

    const abipool = [{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"earned","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"rewards","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_rewardDistribution","type":"address"}],"name":"setRewardDistribution","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"rewardDistribution","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"DURATION","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"rewardRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"zonu","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"zooinlp","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"stake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"lastUpdateTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerToken","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerTokenStored","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"exit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"periodFinish","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"user","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"user","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"user","type":"address"},{"indexed":false,"name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}]


    const contractpool = new web3.eth.Contract(abipool, '0x4a99667cDaA00846961f6FBC2eAaE623C308Dc4E')

    contractpool.methods
      .exit()
      .send({ from: account })
      .once('receipt', receipt => {
        console.log(receipt)
        console.log('Withdrawed LP Tokens!')
        toast.success('Withdrawed LP Tokens!')

        this.setState({ txpend: false })
        this.setState({ txs: 0 })

        // localStorage.setItem('stakeapprove', 'true');

        // document.getElementById("approval").style.display = "none";
        document.getElementById('withdraw').innerHTML =
          "<h4 style='color: #00ff5a;margin-top:30px;'>Withdrew all ZONU LP Tokens and rewards!</h4>"
      })
      .catch(error => {
        console.log(error)
        this.setState({ txpend: false })
        this.setState({ txs: 0 })
      })
  }

  handleClaim = async () => {
    // const testnetHarmonyRpc = 'https://rpc.testnet.mantlenetwork.io'
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    const account = accounts[0]

    this.setState({ txpend: true })
    this.setState({ txs: 1 })

    const abipool = [{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"earned","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"rewards","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_rewardDistribution","type":"address"}],"name":"setRewardDistribution","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"rewardDistribution","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"DURATION","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"rewardRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"zonu","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"zooinlp","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"stake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"lastUpdateTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerToken","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerTokenStored","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"exit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"periodFinish","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"user","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"user","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"user","type":"address"},{"indexed":false,"name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}]


    const contractpool = new web3.eth.Contract(abipool, '0x4a99667cDaA00846961f6FBC2eAaE623C308Dc4E')

    contractpool.methods
      .getReward()
      .send({ from: account })
      .once('receipt', receipt => {
        console.log(receipt)
        console.log('Claimed LP Tokens!')
        toast.success('Claimed LP Tokens!')
        

        this.setState({ txpend: false })
        this.setState({ txs: 0 })

        // localStorage.setItem('stakeapprove', 'true');

        // document.getElementById("approval").style.display = "none";
        document.getElementById('claim').innerHTML =
          "<h4 style='color: #00ff5a;margin-top:30px;'>Claimed all ZONU rewards!</h4>"
      })
      .catch(error => {
        console.log(error)
        this.setState({ txpend: false })
        this.setState({ txs: 0 })
      })
  }

  async loadFilecoinData() {
    // window.loaded_web3 = false;

    // function randomNumber(min, max) {
    //   return Math.random() * (max - min) + min
    // }

    var end = new Date('2/2/2022 2:00 AM') // m/d/y

    var _second = 1000
    var _minute = _second * 60
    var _hour = _minute * 60
    var _day = _hour * 24
    var timer

    function showRemaining() {
      var now = new Date()
      var distance = end - now
      if (distance < 0) {
        clearInterval(timer)
        document.getElementById('countdown').innerHTML = 'EXPIRED!'

        return
      }
      var days = Math.floor(distance / _day)
      var hours = Math.floor((distance % _day) / _hour)
      var minutes = Math.floor((distance % _hour) / _minute)
      var seconds = Math.floor((distance % _minute) / _second)

      document.getElementById('countdown').innerHTML = days + ' d '
      document.getElementById('countdown').innerHTML += hours + ' h '
      document.getElementById('countdown').innerHTML += minutes + ' m '
      document.getElementById('countdown').innerHTML += seconds + ' s'
    }

    timer = setInterval(showRemaining, 1000)

    const web3 = window.web3

    // const testnetHarmonyRpc = 'https://rpc.testnet.mantlenetwork.io'
    const web3t = new Web3('https://rpc.testnet.mantlenetwork.io')

    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = 5001

    const blackListed = []
    this.setState({ blackListed })

    const sale_networkData = ZonuletNFTSale.networks[networkId]
    const sale_abi = ZonuletNFTSale.abi
    const sale_address = sale_networkData.address
    const sale_contract = new web3t.eth.Contract(sale_abi, sale_address)
    this.setState({ sale_contract })

    const networkData = ZonuletNFT.networks[networkId]
    const abi = ZonuletNFT.abi
    const address = networkData.address
    const contract = new web3t.eth.Contract(abi, address)

    const abimain = ZoNulet.abi
    const addressmain = '0x565F39F6B8367a67317349c97dd78B8e4224db5C' //Zonulet Token
    const contractmain = new web3.eth.Contract(abimain, addressmain)

    const abiv = ZonuletVerified.abi
    const addv = '0xa6904459eDa7b2D6C5CFCa9eb9EdE39FFf814Eb9' //ZonuletVerified
    const contractv = new web3t.eth.Contract(abiv, addv)

    const abia = ZonuletAvatars.abi
    const addr = '0x1f0fE495d6c1a242c4A86C0c795b78075f79B1aD' //ZonuletAvatars
    const contractav = new web3t.eth.Contract(abia, addr)

    const abip = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"getLatestONEPrice","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"pairAddress","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"getLatestTokenPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]


    const addp = '0x12Ba58BEb1F85cBEa91DB3Bf7681f66CAadF0fd6' //ZonuletPriceOracle

    const contractp = new web3t.eth.Contract(abip, addp)
    this.setState({ contractp })

    const oneprice = (await contractp.methods.getLatestONEPrice().call()) / 1e8
    const zonuperOne = await contractp.methods
      .getLatestTokenPrice('0x06e6914ae4ee358b28eb613bbdff2c2ea7409523', 1)
      .call() // PAIRS
    const zonuUsd = oneprice / (zonuperOne / 1e18)
    const mcap = Number(10 * zonuUsd) 

    this.setState({ mcap })

    this.setState({ oneusd: zonuUsd })

    const abilike = ZonuletNFTLikes.abi
    const contractlike = new web3t.eth.Contract(abilike, '0x7FB56986974896ed4203857bAFf15Cb89cf082Cd') //ZonuletNFTLikes

    const abiblack = [{"stateMutability":"nonpayable","type":"constructor","inputs":[]},{"type":"event","name":"SetBlackListedAddress","inputs":[{"internalType":"address","indexed":true,"name":"hashAddress","type":"address"},{"name":"blacklisted","type":"bool","indexed":false,"internalType":"bool"}],"anonymous":false},{"inputs":[{"name":"nftID","indexed":true,"type":"uint256","internalType":"uint256"},{"name":"blacklisted","type":"bool","indexed":false,"internalType":"bool"}],"name":"SetBlackListedNFT","anonymous":false,"type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"idupdates","type":"function","outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"inputs":[],"name":"owner","stateMutability":"view","type":"function","outputs":[{"internalType":"address","type":"address","name":""}]},{"type":"function","outputs":[{"type":"address","name":"","internalType":"address"}],"stateMutability":"view","name":"updates","inputs":[{"type":"uint256","internalType":"uint256","name":""}]},{"outputs":[],"stateMutability":"nonpayable","inputs":[{"internalType":"address","name":"addy","type":"address"},{"internalType":"bool","name":"blacklisted","type":"bool"}],"type":"function","name":"setBlackListedAddress"},{"inputs":[{"internalType":"uint256","name":"nftID","type":"uint256"},{"internalType":"bool","name":"blacklisted","type":"bool"}],"name":"setBlackListedNFT","outputs":[],"type":"function","stateMutability":"nonpayable"},{"outputs":[{"type":"bool","internalType":"bool","name":""}],"stateMutability":"view","name":"getBlackListedAddress","inputs":[{"name":"blAddress","internalType":"address","type":"address"}],"type":"function"},{"type":"function","name":"getBlackListedNFT","inputs":[{"name":"nftID","type":"uint256","internalType":"uint256"}],"stateMutability":"view","outputs":[{"internalType":"bool","type":"bool","name":""}]},{"stateMutability":"view","name":"AddyCount","type":"function","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"inputs":[]},{"outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"type":"function","inputs":[],"name":"IDCount","stateMutability":"view"}]      

    const contractblack = new web3t.eth.Contract(abiblack, '0x5cDfa8f2127275cbaD2b24a807e1B168A60d485a')

    const abipool = [{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"earned","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"rewards","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_rewardDistribution","type":"address"}],"name":"setRewardDistribution","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"rewardDistribution","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"DURATION","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"rewardRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"zonu","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"zooinlp","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"stake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"lastUpdateTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerToken","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerTokenStored","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"exit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"periodFinish","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"user","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"user","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"user","type":"address"},{"indexed":false,"name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}]


    const contractpool = new web3.eth.Contract(abipool, '0x4a99667cDaA00846961f6FBC2eAaE623C308Dc4E')

    const abillp = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint112","name":"reserve0","type":"uint112"},{"indexed":false,"internalType":"uint112","name":"reserve1","type":"uint112"}],"name":"Sync","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MINIMUM_LIQUIDITY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint112","name":"_reserve0","type":"uint112"},{"internalType":"uint112","name":"_reserve1","type":"uint112"},{"internalType":"uint32","name":"_blockTimestampLast","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_token0","type":"address"},{"internalType":"address","name":"_token1","type":"address"}],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"kLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"price0CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"price1CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"skim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount0Out","type":"uint256"},{"internalType":"uint256","name":"amount1Out","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swap","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"sync","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]

    const contractlp = new web3.eth.Contract(abillp, '0x06e6914ae4ee358b28eb613bbdff2c2ea7409523')


    const oneabi = [{"type":"event","inputs":[{"name":"src","type":"address","internalType":"address","indexed":true},{"type":"address","indexed":true,"name":"guy","internalType":"address"},{"internalType":"uint256","type":"uint256","indexed":false,"name":"wad"}],"anonymous":false,"name":"Approval"},{"anonymous":false,"name":"Deposit","inputs":[{"internalType":"address","name":"dst","type":"address","indexed":true},{"indexed":false,"internalType":"uint256","type":"uint256","name":"wad"}],"type":"event"},{"type":"event","anonymous":false,"inputs":[{"indexed":true,"type":"address","internalType":"address","name":"src"},{"indexed":true,"name":"dst","internalType":"address","type":"address"},{"indexed":false,"name":"wad","type":"uint256","internalType":"uint256"}],"name":"Transfer"},{"name":"Withdrawal","type":"event","inputs":[{"name":"src","indexed":true,"type":"address","internalType":"address"},{"type":"uint256","indexed":false,"name":"wad","internalType":"uint256"}],"anonymous":false},{"name":"allowance","type":"function","stateMutability":"view","outputs":[{"internalType":"uint256","type":"uint256","name":""}],"inputs":[{"name":"","type":"address","internalType":"address"},{"type":"address","internalType":"address","name":""}]},{"type":"function","inputs":[{"name":"","type":"address","internalType":"address"}],"name":"balanceOf","stateMutability":"view","outputs":[{"name":"","type":"uint256","internalType":"uint256"}]},{"inputs":[],"stateMutability":"view","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"name":"decimals","type":"function"},{"outputs":[{"internalType":"string","name":"","type":"string"}],"name":"name","type":"function","stateMutability":"view","inputs":[]},{"name":"symbol","type":"function","inputs":[],"stateMutability":"view","outputs":[{"type":"string","internalType":"string","name":""}]},{"type":"receive","stateMutability":"payable"},{"stateMutability":"payable","name":"deposit","type":"function","inputs":[],"outputs":[]},{"name":"withdraw","type":"function","outputs":[],"inputs":[{"type":"uint256","name":"wad","internalType":"uint256"}],"stateMutability":"nonpayable"},{"name":"totalSupply","inputs":[],"stateMutability":"view","outputs":[{"name":"","internalType":"uint256","type":"uint256"}],"type":"function"},{"inputs":[{"type":"address","internalType":"address","name":"guy"},{"type":"uint256","internalType":"uint256","name":"wad"}],"type":"function","stateMutability":"nonpayable","name":"approve","outputs":[{"type":"bool","internalType":"bool","name":""}]},{"name":"transfer","stateMutability":"nonpayable","type":"function","inputs":[{"name":"dst","internalType":"address","type":"address"},{"internalType":"uint256","type":"uint256","name":"wad"}],"outputs":[{"name":"","internalType":"bool","type":"bool"}]},{"name":"transferFrom","type":"function","inputs":[{"internalType":"address","name":"src","type":"address"},{"name":"dst","internalType":"address","type":"address"},{"name":"wad","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"nonpayable"}]


    const contractfil = new web3.eth.Contract(oneabi, '0x41810F1664ce580072D9c23286Ea5df68db766F1')

    this.setState({ contractlp })

    this.setState({ contractfil })

    this.setState({ contractpool })

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

    // var SI_SYMBOL = ['', 'k', 'M', 'B', 'T', 'P', 'E']


    const rewardRate = await contractpool.methods.rewardRate().call()
    const reward = await contractpool.methods.rewards(this.state.account).call()
    const rewards = reward / 1e18
    const earn = await contractpool.methods.earned(this.state.account).call()
    const earned = earn / 1e18
    const rewardbal = earned * zonuUsd
    const balanceInPool = await contractpool.methods.balanceOf(this.state.account).call()
    const balPool = balanceInPool / 1e18
    const totalinPool = await contractpool.methods.totalSupply().call()
    const bal = await contractmain.methods.balanceOf(this.state.account).call()
    const balance = bal / 1e18
    const usdbal = balance * zonuUsd
    const balLP = await contractlp.methods.balanceOf(this.state.account).call()
    const balanceLP = Number(web3.utils.fromWei(balLP))
    const totalLP = await contractlp.methods.totalSupply().call()
    const percentageLP = Number((balLP / totalLP) * 100).toFixed(2)
    const percentagePool = Number((balanceInPool / totalinPool) * 100).toFixed(2)

    const balONElp = await contractfil.methods.balanceOf('0x06e6914ae4ee358b28eb613bbdff2c2ea7409523').call()

    const totalliquidity = (balONElp / 1e18) * oneprice * 2

    const approval = await contractlp.methods
      .allowance(this.state.account, '0x4a99667cDaA00846961f6FBC2eAaE623C308Dc4E')
      .call()

    if (approval > 900000000000000) {
      this.setState({ approved: true })
    }

    this.setState({ rewardRate })
    this.setState({ rewards })
    this.setState({ earned })
    this.setState({ balanceInPool })
    this.setState({ balPool })
    this.setState({ balance })
    this.setState({ balanceLP })
    this.setState({ totalLP })
    this.setState({ percentageLP })
    this.setState({ percentagePool })
    this.setState({ usdbal })
    this.setState({ totalliquidity })
    this.setState({ rewardbal })

    setInterval(async () => {
      const rewardRate = await contractpool.methods.rewardRate().call()
      const reward = await contractpool.methods.rewards(this.state.account).call()
      const rewards = reward / 1e18
      const earn = await contractpool.methods.earned(this.state.account).call()
      const earned = earn / 1e18
      const rewardbal = earned * zonuUsd
      const balanceInPool = await contractpool.methods.balanceOf(this.state.account).call()
      const balPool = balanceInPool / 1e18
      const totalinPool = await contractpool.methods.totalSupply().call()
      const bal = await contractmain.methods.balanceOf(this.state.account).call()
      const balance = bal / 1e18
      const usdbal = balance * zonuUsd
      const balLP = await contractlp.methods.balanceOf(this.state.account).call()
      const balanceLP = balLP / 1e18
      const totalLP = await contractlp.methods.totalSupply().call()
      const percentageLP = Number((balLP / totalLP) * 100).toFixed(2)
      const percentagePool = Number((balanceInPool / totalinPool) * 100).toFixed(2)

      const balONElp = await contractfil.methods.balanceOf('0x06e6914ae4ee358b28eb613bbdff2c2ea7409523').call()

      const totalliquidity = (balONElp / 1e18) * oneprice * 2

      this.setState({ rewardRate })
      this.setState({ rewards })
      this.setState({ earned })
      this.setState({ balanceInPool })
      this.setState({ balPool })
      this.setState({ balance })
      this.setState({ balanceLP })
      this.setState({ totalLP })
      this.setState({ percentageLP })
      this.setState({ percentagePool })
      this.setState({ usdbal })
      this.setState({ totalliquidity })
      this.setState({ rewardbal })
    }, 10000)

    if (this.state.approved === true) {
      document.getElementById('approval').style.display = 'none'
      document.getElementById('deposit').style.display = 'block'
      document.getElementById('withdraw').style.display = 'block'
      document.getElementById('claim').style.display = 'block'
    }
  }
}

export default Stake
