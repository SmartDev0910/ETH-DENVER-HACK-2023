import React, { Component } from 'react'
import ZoNulet from '../../abis/ZoNulet.json'
import ZonuletNFT from '../../abis/ZonuletNFT.json'
import ZonuletNFTSale from '../../abis/ZonuletNFTSale.json'
import ReactPlaceholder from 'react-placeholder'
import 'react-placeholder/lib/reactPlaceholder.css'
import Img from 'react-cool-img'
import { Tabs, Tab } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Web3 from 'web3'

class MyCollection extends Component {
  
  render() {
    if (this.state.account) {
      return (
        <div>
          <div className="head-title col-auto mx-4">
            <h4 className="mb-0 font-weight-normal">My NFT Collection</h4>
          </div>
          <div className="container-fluid mb-5 my-collect-adj">
            <div className="row justify-content-around">
              <div className="row" style={{ marginBottom: '15px' }}>
                <div
                  style={{
                    backgroundColor: '#151a2f',
                    border: '1px solid #6fb8d5',
                    width: '100%',
                    padding: '15px',
                    borderRadius: '15px',
                    marginBottom: '15px',
                  }}
                >
                  <div className="row" align="center">
                    <div className="col-md-4">
                    <img src="/mantle.svg" height="75px" width="75px" style={{ marginBottom: '10px' }} />
                      <br />
                      <strong className="text-light">Your MANTLE BALANCE</strong>
                      <br />
                      <ReactPlaceholder
                        type="rect"
                        ready={this.state.mantlebalance}
                        showLoadingAnimation={true}
                        color="#333"
                        style={{
                          width: '250px',
                          height: '40px',
                          marginTop: '5px',
                          marginBottom: '0px',
                          borderRadius: '15px',
                        }}
                      >
                        <h2
                          className="text-light"
                          style={{
                            textShadow: '1px 4px 5px #000',
                            fontWeight: 'black',
                          }}
                        >
                          <strong>
                            {this.state.mantlebalance.toString().slice(
                              0,
                              Number(this.state.mantlebalance)
                                .toString()
                                .indexOf('.') + 4,
                            )}
                          </strong>
                        </h2>
                      </ReactPlaceholder>
                    </div>
                    <div className="col-md-4">
                      <img src="/zonublue.svg" height="75px" width="75px" style={{ marginBottom: '10px' }} />
                      <br />
                      <strong className="text-light">Your ZONU Balance</strong>
                      <br />
                      <ReactPlaceholder
                        type="rect"
                        ready={this.state.zonuBalance}
                        showLoadingAnimation={true}
                        color="#333"
                        style={{
                          width: '250px',
                          height: '40px',
                          marginTop: '5px',
                          marginBottom: '0px',
                          borderRadius: '15px',
                        }}
                      >
                        <h2
                          className="text-light"
                          style={{
                            textShadow: '1px 4px 5px #000',
                            fontWeight: 'black',
                          }}
                        >
                          <strong>
                            {this.state.zonuBalance.toString().slice(
                              0,
                              Number(this.state.zonuBalance)
                                .toString()
                                .indexOf('.') + 4,
                            )}
                          </strong>
                        </h2>
                      </ReactPlaceholder>
                    </div>
                    <div className="col-md-4">
                      <img src="/dezublue.svg" height="75px" width="75px" style={{ marginBottom: '10px' }} />
                      <br />
                      <strong className="text-light">Your DEZU Balance</strong>
                      <br />
                      <ReactPlaceholder
                        type="rect"
                        ready={this.state.dezubalance}
                        showLoadingAnimation={true}
                        color="#333"
                        style={{
                          width: '250px',
                          height: '40px',
                          marginTop: '5px',
                          marginBottom: '0px',
                          borderRadius: '15px',
                        }}
                      >
                        <h2
                          className="text-light"
                          style={{
                            textShadow: '1px 4px 5px #000',
                            fontWeight: 'black',
                          }}
                        >
                          <strong>
                            {this.state.dezubalance.toString().slice(
                              0,
                              Number(this.state.dezubalance)
                                .toString()
                                .indexOf('.') + 4,
                            )}
                          </strong>{' '}
                        </h2>
                      </ReactPlaceholder>
                    </div>
                    {/* TEST REWARD BALANCE */}
                    <div className="col-md-4">
                      <img src="/dezublue.svg" height="75px" width="75px" style={{ marginBottom: '10px' }} />
                      <br />
                      <strong className="text-light">Your DEZU Rewards Balance</strong>
                      <br />
                      <ReactPlaceholder
                        type="rect"
                        ready={this.state.dezuReward}
                        showLoadingAnimation={true}
                        color="#333"
                        style={{
                          width: '250px',
                          height: '40px',
                          marginTop: '5px',
                          marginBottom: '0px',
                          borderRadius: '15px',
                        }}
                      >
                        <h2
                          className="text-light"
                          style={{
                            textShadow: '1px 4px 5px #000',
                            fontWeight: 'black',
                          }}
                        >
                          <strong>
                            {this.state.dezuReward.toString().slice(
                              0,
                              Number(this.state.dezuReward)
                                .toString()
                                .indexOf('.') + 4,
                            )}
                          </strong>{' '}
                        </h2>
                      </ReactPlaceholder>
                    </div>
                  </div>
                </div>
                <br />
                <div className="col-md-4" align="center">
                  <p
                    align="center"
                    className="text-light addy"
                    style={{
                      backgroundColor: '#151a2f',
                      maxWidth: '90%',
                      borderRadius: '15px',
                      padding: '20px',
                      boxShadow: '1px 1px 0 0 #20ebf0'
                    }}
                  >
                    View and Manage your ZONU NFT Collection.
                    <br />
                    My Account Address{' '}
                    <a href="/editprofile">
                      <span style={{color: '#20ebf0'}}>{this.state.account.substring(0, 15)}...</span>&nbsp;&nbsp;<i className="fa fa-cogs"></i>
                    </a>
                  </p>
                </div>
                <div className="col-md-4" align="center">
                  <a
                    href={'/collection/' + this.state.account}
                    className="button btn btn-primary rounded"
                    style={{ padding: '25px', borderRadius: '15px important' }}
                  >
                    View your Public Collection!
                  </a>
                </div>
                <div className="col-md-4 mnope" align="center">
                  <p
                    align="center"
                    className="text-light addy"
                    style={{
                      backgroundColor: '#151a2f',
                      maxWidth: '90%',
                      borderRadius: '15px',
                      padding: '20px',
                      boxShadow: '#20ebf0 -1px 1px 0px 0px'
                    }}
                  >
                    View ZonuletNFT Contracts.
                    <br />
                    Mantle Explorer{' '}
                    <a href="https://explorer.testnet.mantle.xyz/address/0x2F400bb9bd8c5D29433F4DfDeEE6264031cda78f?activeTab=7" target='_blank' rel='noopener'>
                      <span style={{color: '#20ebf0'}}>0x2F400bb9bd8c..</span>&nbsp;&nbsp;<i className="fa fa-cogs"></i>
                    </a>
                  </p>
                </div>
              </div>
              <br />
              &nbsp;
              <br /> &nbsp;
              <br /> &nbsp;
              <br />
              <Tabs defaultActiveKey="1" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="1" title="Owned">
                  <div className="container-fluid mb-5">
                    <div className="row justify-content-around">
                      <h4 className="text-light colltxt" align="center">
                        <strong>{this.state.ownedcount}</strong> NFTs OWNED
                      </h4>
                      <h3 className="text-light" align="center">
                        {this.state.readytxto}
                      </h3>
                      <ReactPlaceholder
                        type="rect"
                        ready={this.state.ready}
                        showLoadingAnimation={true}
                        color="#333"
                        style={{
                          marginTop: '10px',
                          width: '300px',
                          height: '300px',
                          borderRadius: '15px',
                        }}
                      >
                        {this.state.images.map((id, key) => {
                          return this.state.owner === this.state.account && this.state.ready === true ? (
                            <div key={key} className="col-md-2 card bg-light p-2 m-3">
                              <Link
                                to={{
                                  pathname: `/nft/${this.state.ownercollection[key]}`,
                                  // state: {name: "vikas"}
                                }}
                              >
                                <div className="col-auto max-250">
                                  <div className="text-secondary idbadge" align="center">
                                    ID #{this.state.ownercollection[key]}
                                  </div>
                                  {typeof this.state.imageData_ipfsData[key] !== 'undefined' ? (
                                    this.state.imageData_mimeType[key] === 'image/jpeg' ||
                                    this.state.imageData_mimeType[key] === 'image/png' ||
                                    this.state.imageData_mimeType[key] === 'image/gif' ? (
                                      <Img
                                        alt="NFT"
                                        className="token rounded"
                                        src={
                                          'https://zonulet.infura-ipfs.io/ipfs/' +
                                          this.state.imageData_ipfsData[key]
                                        }
                                        cache
                                        style={{ background: '#21263e' }}
                                      />
                                    ) : (
                                      <video
                                        alt="NFT"
                                        className="token rounded"
                                        autoPlay={true}
                                        muted={true}
                                        loop={true}
                                        controls
                                        playsInline
                                        src={
                                          'https://zonulet.infura-ipfs.io/ipfs/' +
                                          this.state.imageData_ipfsData[key]
                                        }
                                        type="video/mp4"
                                      >
                                        <source
                                          src={
                                            'https://zonulet.infura-ipfs.io/ipfs/' +
                                            this.state.imageData_ipfsData[key]
                                          }
                                          type="video/mp4"
                                        ></source>
                                      </video>
                                    )
                                  ) : null}
                                </div>
                                <div className="m-3" align="center">
                                  {this.state.imageData_name[key]}
                                </div>
                                <div className="m-3" align="center">
                                  {this.state.approved[key]
                                    ? 'Price: ' + this.state.imageData_price[key]
                                    : 'Not For Sale'}
                                  <img alt="main" className="eth-class" src="../zonulet_stndr_1.svg" />
                                </div>
                              </Link>
                            </div>
                          ) : null
                        })}
                      </ReactPlaceholder>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="2" title="For Sale">
                  <div className="container-fluid mb-5">
                    <div className="row justify-content-around">
                      <ReactPlaceholder
                        type="rect"
                        ready={this.state.ready}
                        showLoadingAnimation={true}
                        color="#333"
                        style={{
                          width: '300px',
                          height: '300px',
                          borderRadius: '15px',
                        }}
                      >
                        <h4 className="text-light colltxt" align="center">
                          <strong>{this.state.forsale}</strong> NFTs For Sale
                        </h4>
                        <h3 className="text-light" align="center">
                          {this.state.readytxts}
                        </h3>
                        {this.state.images.map((id, key) => {
                          return this.state.approved[key] &&
                            this.state.owner === this.state.account &&
                            this.state.ready === true ? (
                            <div key={key} className="col-md-2 card bg-light p-2 m-3">
                              <Link
                                to={{
                                  pathname: `/nft/${this.state.ownercollection[key]}`,
                                  // state: {name: "dropdisco"}
                                }}
                              >
                                <div className="col-auto max-250">
                                  <div className="text-secondary idbadge" align="center">
                                    ID #{this.state.ownercollection[key]}
                                  </div>
                                  {typeof this.state.imageData_ipfsData[key] !== 'undefined' ? (
                                    this.state.imageData_mimeType[key] === 'image/jpeg' ||
                                    this.state.imageData_mimeType[key] === 'image/png' ||
                                    this.state.imageData_mimeType[key] === 'image/gif' ? (
                                      <Img
                                        alt="NFT"
                                        className="token rounded"
                                        src={
                                          'https://zonulet.infura-ipfs.io/ipfs/' +
                                          this.state.imageData_ipfsData[key]
                                        }
                                        cache
                                        style={{ background: '#21263e' }}
                                      />
                                    ) : (
                                      <video
                                        alt="NFT"
                                        className="token rounded"
                                        autoPlay={true}
                                        muted={true}
                                        loop={true}
                                        controls
                                        playsInline
                                        src={
                                          'https://zonulet.infura-ipfs.io/ipfs/' +
                                          this.state.imageData_ipfsData[key]
                                        }
                                        type="video/mp4"
                                      >
                                        <source
                                          src={
                                            'https://zonulet.infura-ipfs.io/ipfs/' +
                                            this.state.imageData_ipfsData[key]
                                          }
                                          type="video/mp4"
                                        ></source>
                                      </video>
                                    )
                                  ) : null}
                                </div>
                                <div className="m-3" align="center">
                                  {this.state.imageData_name[key]}
                                </div>
                                <div className="m-3" align="center">
                                  {this.state.approved[key]
                                    ? 'Price: ' + this.state.imageData_price[key]
                                    : 'Not For Sale'}
                                  <img alt="main" className="eth-class" src="../zonulet_stndr_1.svg" />
                                </div>
                              </Link>
                            </div>
                          ) : null
                        })}
                      </ReactPlaceholder>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="3" title="Minted">
                  <div className="container-fluid mb-5">
                    <div className="row justify-content-around">
                      <ReactPlaceholder
                        type="rect"
                        ready={this.state.ready2}
                        showLoadingAnimation={true}
                        color="#333"
                        style={{
                          width: '300px',
                          height: '300px',
                          borderRadius: '15px',
                        }}
                      >
                        <h4 className="text-light colltxt" align="center">
                          <strong>{this.state.mintedcollection.length}</strong> NFTs Minted
                        </h4>
                        <h3 className="text-light" align="center">
                          {this.state.readytxt}
                        </h3>
                        {this.state.mimages.map((id, key) => {
                          return this.state.ready2 === true ? (
                            // transaction._tokenId === this.state.ownercollection[key] &&

                            <div key={key} className="col-md-2 card bg-light p-2 m-3">
                              <Link
                                to={{
                                  pathname: `/nft/${this.state.mintedcollection[key]}`,
                                  // state: {name: "vikas"}
                                }}
                              >
                                <div className="col-auto max-250">
                                  <div className="text-secondary idbadge" align="center">
                                    ID #{this.state.mintedcollection[key]}
                                  </div>
                                  {typeof this.state.mimageData_ipfsData[key] !== 'undefined' ? (
                                    this.state.mimageData_mimeType[key] === 'image/jpeg' ||
                                    this.state.mimageData_mimeType[key] === 'image/png' ||
                                    this.state.mimageData_mimeType[key] === 'image/gif' ? (
                                      <Img
                                        alt="NFT"
                                        className="token rounded"
                                        src={
                                          'https://zonulet.infura-ipfs.io/ipfs/' +
                                          this.state.mimageData_ipfsData[key]
                                        }
                                        cache
                                        style={{ background: '#21263e' }}
                                      />
                                    ) : this.state.mimageData_mimeType[key] === 'video/mp4' ? (
                                      <video
                                        alt="NFT"
                                        className="token rounded"
                                        autoPlay={true}
                                        muted={true}
                                        loop={true}
                                        controls
                                        playsInline
                                        src={
                                          'https://zonulet.infura-ipfs.io/ipfs/' +
                                          this.state.mimageData_ipfsData[key]
                                        }
                                        type="video/mp4"
                                      >
                                        <source
                                          src={
                                            'https://zonulet.infura-ipfs.io/ipfs/' +
                                            this.state.mimageData_ipfsData[key]
                                          }
                                          type="video/mp4"
                                        ></source>
                                      </video>
                                    ) : this.state.mimageData_mimeType[key] === 'model/gltf-binary' ? (
                                      <model-viewer
                                        src={
                                          'https://zonulet.infura-ipfs.io/ipfs/' +
                                          this.state.mimageData_ipfsData[key]
                                        }
                                        alt={this.state.mimageData_name[key]}
                                        ar
                                        ar-modes="webxr scene-viewer quick-look"
                                        environment-image="neutral"
                                        auto-rotate
                                        camera-controls
                                        style={{
                                          width: '100%',
                                          height: '250px',
                                        }}
                                      ></model-viewer>
                                    ) : null
                                  ) : null}
                                </div>
                                <div className="m-3" align="center">
                                  {this.state.mimageData_name[key]}
                                </div>
                                <div className="m-3" align="center">
                                  {this.state.approvedmint[key]
                                    ? 'Price: ' + this.state.mimageData_price[key]
                                    : 'Not For Sale'}
                                  <img alt="main" className="eth-class" src="../zonulet_stndr_1.svg" />
                                </div>
                              </Link>
                            </div>
                          ) : null
                        })}
                      </ReactPlaceholder>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="4" title="Activity" style={{textAlign: 'center'}}>
                  <img src='/chart-sample.svg' style={{width: '24%', padding: '0px 15px 0px 15px', opacity: '0.8'}}/>
                  <div style={{color: '#ffffff8f', marginTop: '10px'}}>
                  COMING SOON
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div className="container-fluid mb-5 my-collect-adj">
            <div className="row justify-content-around">
              <h1 align="center" className="text-secondary">
                You have no collection yet! <br />
                Get started by purchasing a NFT or minting one!
              </h1>
            </div>
          </div>
        </div>
      )
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      account: '',
      contract: null,
      totalSupply: 0,
      dezuReward: 0,
      zonuBalance: 0,
      mantlebalance: 0,
      dezubalance: 0,
      ownedcount: 0,
      images: [],
      mimages: [],
      owner: null,
      approved: [],
      approvedmint: [],
      ownercount: 0,
      transactions: [],
      created: [],
      ownercollection: [],
      imageData_name: [],
      imageData_ipfsData: [],
      imageData_mimeType: [],
      imageData_price: [],
      imageData_created: [],
      imageData_id: [],
      mimageData_name: [],
      mimageData_ipfsData: [],
      mimageData_mimeType: [],
      mimageData_price: [],
      mimageData_created: [],
      mimageData_id: [],
      token_sale_contract: null,
      minted: [],
      forsale: 0,
      ready2: false,
      readytxt: null,
      readytxts: null,
      readytxto: null,
      mintedcollection: [],
      token_price: 0,
    }
  }

  async componentWillMount() {
    await this.loadMantleData()
  }

  async loadMantleData() {
    const web3 = window.web3

    const web3one = new Web3('https://rpc.testnet.mantle.xyz')

    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    // const networkId = 5001
    const networkData = ZonuletNFT.networks[5001]
    
    if (networkData) {
      const abi = ZonuletNFT.abi
      const address = networkData.address
      const contract = new web3.eth.Contract(abi, address)
      // console.log(contract)
      this.setState({ contract })
      const totalSupply = await contract.methods.totalSupply().call()
      // console.log(totalSupply)
      this.setState({ totalSupply })

      // Load Owner
      const owner = this.state.account
      // console.log(owner)
      this.setState({ owner: owner })

      const ownercount = await contract.methods.balanceOf(this.state.account).call()

      this.setState({ ownercount: ownercount })
      this.setState({ ownedcount: ownercount })

      setInterval(async () => {

        const web3one = new Web3('https://rpc.testnet.mantle.xyz')

        const abia = ZoNulet.abi
        const addr = '0x9C3a2429A288dBEA75C819Fd18C0b35a0C3E1361'
        const contract = new web3one.eth.Contract(abia, addr)

        const abidezu = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}];

        const dezuAddress = '0xCab6D79dD732779f081B5868AAb1e64F357e90A9' 
        const contractDezu = new web3one.eth.Contract(abidezu, dezuAddress)

        if (this.state.account) {

          const balanceOne = await contract.methods.balanceOf(this.state.account).call()
          const balanceDezu = await contractDezu.methods.balanceOf(this.state.account).call()
          const balanceZonu = web3one.utils.fromWei(balanceOne, 'ether')
          const zonuBalance = Number(balanceZonu).toFixed(2)

          const dexswapZonuBalance = web3one.utils.fromWei(balanceDezu, 'ether')

          const mantlebalance = web3one.utils.fromWei(await web3one.eth.getBalance(this.state.account), 'ether')

          const dezubalance = Number(dexswapZonuBalance).toFixed(2)

          const reward = await contract.methods.getAccountDividendsInfo(this.state.account).call()

          const dezuReward = web3one.utils.fromWei(reward['4'], 'ether')

          this.setState({ mantlebalance })

          this.setState({ dezubalance })

          this.setState({ zonuBalance })

          this.setState({ dezuReward })
        }
      }, 10000)

      console.log('\x1b[33m%s\x1b[0m', 'NFT YOU HAVE:', ownercount)

      // if (ownercount > 0) {

      // Find owners collection of NFT IDs
      for (var i = ownercount; i--; ) {
        const ownerindex = await contract.methods.tokenOfOwnerByIndex(owner, i).call()
        this.setState({
          ownercollection: [...this.state.ownercollection, ownerindex],
        })
      }
      // }

      // console.log(this.state.ownercollection)

      //abi of mint(string,string,string,string,string,string,uint256) // NFT BLOCK
      const minted = await contract.getPastEvents('Transfer', {
        fromBlock: 462592,
        toBlock: 'latest',
      })

      for (i = 0; i < minted.length; i++) {
        this.setState({
          minted: [...this.state.minted, minted[i].returnValues],
        })
      }

      // console.log(this.state.minted)

      for (i = 0; i < this.state.minted.length; i++) {
        // console.log(this.state.transactions[i]._buyer)
        if (
          this.state.account === this.state.minted[i].to &&
          this.state.minted[i].from === '0x0000000000000000000000000000000000000000'
        ) {
          // console.log(this.state.minted[i].tokenId)
          this.setState({
            mintedcollection: [...this.state.mintedcollection, this.state.minted[i].tokenId],
          })
        } else {
          // Nothing atm
        }
      }


      // Load NFTs Data
      for (i = 0; i < ownercount; i++) {
        if (this.state.ownercollection) {
          const metadata = await contract.methods.imageData(this.state.ownercollection[i]).call()
          // console.log(metadata)
          this.setState({
            images: [...this.state.images, metadata.name],
            imageData_name: [...this.state.imageData_name, metadata.name],
            imageData_ipfsData: [...this.state.imageData_ipfsData, metadata.ipfsData],
            imageData_mimeType: [...this.state.imageData_mimeType, metadata.mimeType],
            imageData_price: [...this.state.imageData_price, metadata.price],
            imageData_id: [...this.state.imageData_id, i],
          })
          //ZonuletNFTSale
          var approv = await this.state.contract.methods
            .isApprovedOrOwner('0xA7eEe2528D0858988950664aFC71b4B0Cdaf074d', this.state.ownercollection[i])
            .call()
          this.setState({ approved: [...this.state.approved, approv] })
          // console.log(approv)
          if (approv === true) {
            this.state.forsale++
          }
          this.setState({ ready: true })
        }
      }

      // Load Minted NFTs Data
      for (i = 0; i < this.state.mintedcollection.length; i++) {
        const metadata = await contract.methods.imageData(this.state.mintedcollection[i]).call()
        // console.log(metadata)
        this.setState({
          mimages: [...this.state.mimages, metadata.name],
          mimageData_name: [...this.state.mimageData_name, metadata.name],
          mimageData_ipfsData: [...this.state.mimageData_ipfsData, metadata.ipfsData],
          mimageData_mimeType: [...this.state.mimageData_mimeType, metadata.mimeType],
          mimageData_price: [...this.state.mimageData_price, metadata.price],
          mimageData_id: [...this.state.mimageData_id, i],
        })
        var approvs = await this.state.contract.methods
          .isApprovedOrOwner('0xA7eEe2528D0858988950664aFC71b4B0Cdaf074d', this.state.mintedcollection[i])
          .call()
        this.setState({ approvedmint: [...this.state.approvedmint, approvs] })
        this.setState({ ready2: true })
      }

      if (this.state.mintedcollection.length === 0) {
        this.setState({ ready2: true })
        this.setState({ readytxt: 'No NFTs have been created by this user' })
      }

      const sale_networkData = ZonuletNFTSale.networks[5001]
      const sale_abi = ZonuletNFTSale.abi
      const sale_address = sale_networkData.address
      const sale_contract = new web3one.eth.Contract(sale_abi, sale_address)
      this.setState({ sale_contract })

      if (this.state.ownercollection.length === 0) {
        this.setState({ ready: true })
        this.setState({ readytxto: 'No NFTs are owned by this user' })
      }

      if (this.state.ownercollection.length === 0) {
        this.setState({ ready: true })
        this.setState({ readytxts: 'No NFTs are for sale by this user' })
      }

    
    } else {
      toast.error("Switch to Mantle Testnet!")
    }


  }
}
export default MyCollection
