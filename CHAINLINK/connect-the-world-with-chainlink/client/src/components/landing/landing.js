import React, { Component } from 'react'
import Img from 'react-cool-img'
import { toast } from 'react-toastify'
import { Carousel} from 'react-bootstrap'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'
import ReactPlaceholder from 'react-placeholder'
import 'react-placeholder/lib/reactPlaceholder.css'
import 'react-sweet-progress/lib/style.css'
import ScrollToTop from 'react-scroll-to-top'
import LoadingOverlay from 'react-loading-overlay'
import Web3 from 'web3'
import ZoNulet from '../../abis/ZoNulet.json'
import ZonuletNFT from '../../abis/ZonuletNFT.json'
import ZonuletNFTSale from '../../abis/ZonuletNFTSale.json'
import ZonuletAvatars from '../../abis/ZonuletAvatars.json'
import ZonuletVerified from '../../abis/ZonuletVerified.json'
import ZonuletNFTLikes from '../../abis/ZonuletNFTLikes.json'
import wethAbi from '../../abis/WETH.json'
import ZonuletOracle from '../../abis/ZonuletOracleV2.json'
import ZonuletZDEX from '../../abis/ZonuletZDEX.json'
import ZonuletBlacklist from '../../abis/ZonuletBlacklist.json'



Modal.setAppElement('#root')
LoadingOverlay.propTypes = undefined


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

const customStyle3 = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    backgroundColor: 'rgb(6 8 14)',
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
}

class Landing extends Component {


  handleOpenModal() {
    this.setState({ showModal: true })
  }

  handleOpenZONUModal() {
    this.setState({ showZONUModal: true })
  }

  handleCloseModal() {
    this.setState({ showModal: false })
    localStorage.setItem('agreed', 'true')
  }

  handleCloseZONUModal() {
    this.setState({ showZONUModal: false })
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
      roseAmount: 0,
      minted: [],
      mintedcollection: '',
      maticbalance: 0,
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
      ready: false,
      ready2: false,
      ready3: false,
      readymint: false,
      selling_to: '',
      selling_price: null,
      token_sale_contract: null,
      token_price: 0,
      zonuamount: 0,
      approved: [],
      blackListed: [],
      owned: '',
      ipfs: '',
      mim: '',
      name: '',
      transactions: [],
      gtransactions: [],
    }
    this.handleOpenModal = this.handleOpenModal.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.handleOpenZONUModal = this.handleOpenZONUModal.bind(this)
    this.handleCloseZONUModal = this.handleCloseZONUModal.bind(this)
  }

  async componentWillMount() {
    this.state.ready3 = false
    this.state.ready2 = false
    
    await this.loadBlockchain()
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
      spread: 26,
      startVelocity: 55,
    });

    this.makeShot(0.2, {
      spread: 60,
    });

    this.makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    this.makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    this.makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }

  handlerFire = () => {
    this.fire()
  }

  getInstance = instance => {
    this.animationInstance = instance
  }

  abbreviateNumber = number => {
    // what tier? (determines SI symbol)
    var tier = (Math.log10(Math.abs(number)) / 3) | 0

    // if zero, we don't need a suffix
    if (tier === 0) return number

    var SI_SYMBOL = ['', 'k', 'M', 'B', 'T', 'P', 'E']

    // get suffix and determine scale
    var suffix = SI_SYMBOL[tier]
    var scale = Math.pow(10, tier * 3)

    // scale the number
    var scaled = number / scale

    // format number and add suffix
    return scaled.toFixed(1) + suffix
  }

  buyZonuin = () => {

    const web3 = window.web3
    this.setState({ txpend: true })
    this.setState({ txs: 2 })

    const cryptoAbi = wethAbi.abi
    const ZDEXabi = ZonuletZDEX.abi

    const contractzonulet = new web3.eth.Contract(ZDEXabi, '0x0Ed15F7Bfd55d307C153eA01494284d6E590fba2') // ZonuletZDEX
    const contractone = new web3.eth.Contract(cryptoAbi, '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889') // WETH on Matic Testnet

    const slippage = this.state.zonuamount 
    console.log("slip page", slippage)

    contractzonulet.methods.getEstimatedMATICforZONU(slippage.toString()).call()
      .then(receipt => {
        const estone = receipt[0]
        // make new deadline one hour from now in epoch unix time
        const deadline = Math.floor(Date.now() / 1000) + 6000
        // console.log(deadline)
        // console.log(estone)

        contractone.methods.approve('0x0Ed15F7Bfd55d307C153eA01494284d6E590fba2', estone)
          .send({ from: this.state.account })
          .once('receipt', receipt => {
            this.setState({ txpend: true })
            this.setState({ txs: 1 })



            contractzonulet.methods.zonulet(slippage.toString(), deadline).send({ from: this.state.account, value: estone }).once('receipt', async receipt => {
                this.setState({ txpend: false })
                this.setState({ txs: 0 })

                this.handlerFire()
                toast.success("Swapped, Sweet! 🥳")

                //console.log(receipt);

                console.log('Finishing MATIC to ZONU successfully!')
              })
              .catch(error => {

                toast.error("Transaction failed on the second step from MATIC!")
                this.setState({ txpend: false })
              })
          })
          .catch(error => {
            // Transaction rejected or failed
            console.log(error)
            toast.error("Transaction failed on MATIC approval!")
            this.setState({ txpend: false })
          })
      })
      .catch(error => {
        console.log(error)
        toast.error("Failed to get Zonulet estimate!")
        this.setState({ txpend: false })
      })
  }

  changeAmount = amount => {
    if (amount > 0) {

      const web3 = new Web3('https://polygon-mumbai.infura.io/v3/da9c85c80bd0432dad730f1d5fbfd70b')

      const zonuletZDEXabi2 = ZonuletZDEX.abi
      const contractzonulet2 = new web3.eth.Contract(zonuletZDEXabi2, '0x0Ed15F7Bfd55d307C153eA01494284d6E590fba2')


      this.setState({ roseAmount: amount })

      var SI_SYMBOL = ['', 'k', 'M', 'B', 'T', 'P', 'E']

      function abbreviateNumber(number) {
        // what tier? (determines SI symbol)
        var tier = (Math.log10(Math.abs(number)) / 3) | 0

        // if zero, we don't need a suffix
        if (tier == 0) return number

        // get suffix and determine scale
        var suffix = SI_SYMBOL[tier]
        var scale = Math.pow(10, tier * 3)

        // scale the number
        var scaled = number / scale

        // format number and add suffix
        return scaled.toFixed(1) + suffix
      }

      contractzonulet2.methods.getEstimatedZONUforMATIC(web3.utils.toWei(amount.toString(), 'ether')).call()
        .then(receipt => {
          const estzonu = receipt[1]
          console.log(estzonu)

          this.setState({ zonuamount: estzonu })

          document.getElementById('amounttobuy').innerHTML = abbreviateNumber(estzonu / 1e18)
        })
        .catch(error => {
          // console.log(error)
          toast.error('Failed to get Zonulet estimate!')
        })
    } else {
      document.getElementById('amounttobuy').innerHTML = 0
    }
  }

  async like(e, owner, key) {
    e.preventDefault()
    e.stopPropagation()

    document.getElementById('like' + key).classList.add('fa-pulse')

    const web3t = window.web3

    const accounts = await window.web3.eth.getAccounts()
    const acct = accounts[0]
    // console.log('set account')

    const abilike = ZonuletNFTLikes.abi
    const contractlike = new web3t.eth.Contract(abilike, '0x604950ba06Cb36D53193012E816E07296f995dD8')

    contractlike.methods.LikeNFT(owner, key).send({ from: acct }).once('receipt', receipt => {
        toast.success("Like Succeed, Sweet!")
        document.getElementById('like' + key).classList.remove('fa-pulse')
        document.getElementById('like' + key).classList.add('liked')
        document.getElementById('count' + key).innerHTML = Number(document.getElementById('count' + key).innerHTML) + 1

        // this.setState({ txpend: false })
        // this.setState({ txs: 0 })
      })
      .catch(error => {
        // Transaction rejected or failed
        document.getElementById('like' + key).classList.remove('fa-pulse')
        toast.error("Like failed!")
        // console.log(error)
        // this.setState({ txpend: false });
      })
  }

  async ice(e, owner, key) {
    e.preventDefault()
    e.stopPropagation()

    document.getElementById('ice' + key).classList.add('fa-pulse')

    const web3t = window.web3

    const web3one = new Web3('https://polygon-mumbai.infura.io/v3/da9c85c80bd0432dad730f1d5fbfd70b')

    const accounts = await window.web3.eth.getAccounts()
    const acct = accounts[0]
    // console.log('set account')

    const networkId = 80001
    const networkData = ZonuletNFT.networks[networkId]
    const abi = ZonuletNFT.abi
    const address = networkData.address
    const contract = new web3one.eth.Contract(abi, address)


    // Get minter of NFT
    const minted = await contract.getPastEvents('Transfer', {
      fromBlock: 462592,
      toBlock: 'latest',
    })




    for (var i = 0; i < minted.length; i++) {
      this.setState({ minted: [...this.state.minted, minted[i].returnValues] })
    }

    console.log('minted:',this.state.minted)

    for (i = 0; i < this.state.minted.length; i++) {
      // console.log(this.state.transactions[i]._buyer)
      // console.log(this.state.minted[i].tokenId)
      if (this.state.minted[i].tokenId == key) {
        // console.log('hoorah!');
        if (this.state.minted[i].from == '0x0000000000000000000000000000000000000000') {
          // console.log('hoorah TWICE!')
          // console.log(this.state.minted[i].to);
          this.setState({ mintedcollection: this.state.minted[i].to })
        }
      }
    }

    // console.log(this.state.mintedcollection)

    const abilike = ZonuletNFTLikes.abi
    const contractlike = new web3t.eth.Contract(abilike, '0x604950ba06Cb36D53193012E816E07296f995dD8')

    const abib = ZoNulet.abi
    const addressb = '0x496a89968Fb0e0EffE32Db03102B613084239ED3'
    const token_contract = new web3t.eth.Contract(abib, addressb)

    const pacmanprice = '1'

    token_contract.methods
      .approve('0x604950ba06Cb36D53193012E816E07296f995dD8', web3one.utils.toWei(pacmanprice, 'ether'))
      .send({ from: acct })
      .once('receipt', receipt => {
        contractlike.methods
          .PacmanNFT(this.state.mintedcollection, key)
          .send({ from: acct })
          .once('receipt', receipt => {
            toast.success("Pacmanise Succeed, Sweet!")
            document.getElementById('ice' + key).classList.remove('fa-pulse')
            document.getElementById('ice' + key).classList.add('pacmaned')
            document.getElementById('counti' + key).innerHTML =
              Number(document.getElementById('counti' + key).innerHTML) + 1

            // this.setState({ txpend: false })
            // this.setState({ txs: 0 })
          })
          .catch(error => {
            // Transaction rejected or failed
            document.getElementById('ice' + key).classList.remove('fa-pulse')
            toast.error("Pacmaned Failed, need 1 ZONU!")
            // console.log(error)
            // this.setState({ txpend: false });
          })
      })
      .catch(error => {
        // Transaction rejected or failed
        document.getElementById('ice' + key).classList.remove('fa-pulse')
        toast.error("Pacmaned Failed, need 1 ZONU!")
        // console.log(error)
        // this.setState({ txpend: false });
      })
  }

  async loadBlockchain() {
    // window.loaded_web3 = false;

    function randomNumber(min, max) {
      return Math.random() * (max - min) + min
    }

    if (localStorage.getItem('agreed') === 'true') {
      this.setState({ showModal: false })
    } else {
      this.setState({ showModal: true })
    }

    const web3 = window.web3

    const web3t = new Web3('https://polygon-mumbai.infura.io/v3/da9c85c80bd0432dad730f1d5fbfd70b')

    // Load account

    if (typeof web3 !== 'undefined') {
      const accounts = await web3.eth.getAccounts()
      this.setState({ account: accounts[0] })
      this.setState({ connected: true })
      const chainId = await web3.eth.getChainId()
      if (chainId === 80001) {
        this.setState({ connected: true })
        // console.log(this.state.connected)
        // console.log(this.state.account)
      } else {
        this.setState({ connected: false })
      }
    }

    setInterval(async () => {
      if (typeof web3 !== 'undefined' && this.state.showZONUModal === true) {
        const maticbalance = web3.utils.fromWei(await web3.eth.getBalance(this.state.account), 'ether')
        if (maticbalance > 0 && typeof maticbalance !== 'undefined') {
          this.setState({ maticbalance })

          document.getElementById('onebal').innerHTML = Number(maticbalance).toFixed(4)

          const abia = ZoNulet.abi
          const addr = '0x496a89968Fb0e0EffE32Db03102B613084239ED3'
          const contract = new web3.eth.Contract(abia, addr)
          const zonubal = await contract.methods.balanceOf(this.state.account).call()
          if (zonubal > 0 && zonubal !== null) {
            const zonubalance2 = web3.utils.fromWei(zonubal, 'ether')
            const zonubalance = zonubalance2

            this.setState({ zonubalance })

            document.getElementById('zonubal').innerHTML = this.abbreviateNumber(Number(zonubalance))
          }
        }
      }

      const oracleAbi = ZonuletOracle.abi

      const oracleAddress = '0x3767D165bfab065F12183f9b18B34fdA7feC84dE' // ZonuletPriceOracle
      const oracleContract = new web3t.eth.Contract(oracleAbi, oracleAddress)
      this.setState({ oracleContract })

      const cryptoAbi = wethAbi.abi
      const contractone = new web3t.eth.Contract(cryptoAbi, '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889')

      const balMATIClp = await contractone.methods.balanceOf('0x2BE37f0dfCd4B6851114635322B0953Fe3451Aa5').call() // DexSwap (MATIC - ZONU)
      const balDEZUBITlp = await contractone.methods.balanceOf('0x1c470B6B7452F25a6C967EcAba18E31E8f8C30Db').call() //DexSwap (MATIC - USDC)
      const balUSDC = await contractone.methods.balanceOf('0x1393a83706Bd09b54FaCC0099A26c74Fd4a7DEd3').call() // DexSwap (WBNB - USDC)
      const balZonu = await contractone.methods.balanceOf('0x9996f40D7f4a61B96BcBC1922C0f51aC95E5376B').call() // DexSwap (DEZU - ZONU)

      const maticprice = await oracleContract.methods.getLatestMATICPrice().call() / 1e8
      console.log("Matic/USD", maticprice)
      const zonuperOne = await oracleContract.methods.getLatestTokenPrice('0x2be37f0dfcd4b6851114635322b0953fe3451aa5', 1).call() 
      const zonuUsd = maticprice / (zonuperOne / 1e18)
      console.log("ZONU/USD//PRICE:", zonuUsd);


      var combine = 0
      combine = balMATIClp / 1e18
      combine += balDEZUBITlp / 1e18
      combine += balUSDC / 1e18
      combine += balZonu / 1e18

      const totalliquidity = combine * maticprice * 2
      const mcap = Number(22 * zonuUsd)  // total supply / circ supply



      const abia = ZoNulet.abi
      const addr = '0x496a89968Fb0e0EffE32Db03102B613084239ED3'
      const contract = new web3t.eth.Contract(abia, addr)
      const zonubal = await contract.methods.balanceOf('0x000000000000000000000000000000000000dead').call()
      const dead = web3t.utils.fromWei(zonubal, 'ether')

      const totalcirc = 100000 - dead

      this.setState({ mcap })
      this.setState({ totalliquidity })
      this.setState({ totalcirc })
      // console.log("Total circ:", totalcirc)

      const networkData = ZonuletNFT.networks[networkId]
      const abi = ZonuletNFT.abi
      const address = networkData.address
      const contractnft = new web3t.eth.Contract(abi, address)

      const totalSupply = await contractnft.methods.totalSupply().call()
      // 
      // console.log(totalSupply)
      this.setState({ totalSupply })
    }, 10000)

    const networkId = 80001

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

    const abiv = ZonuletVerified.abi
    const addv = '0x6d4a0F6fb7c24aD9BC90943d9eB626c2EB907004' // Zonulet Verified
    const contractv = new web3t.eth.Contract(abiv, addv)

    const abia = ZonuletAvatars.abi
    const addr = '0xFC1f197c27A0325e35957792Df1355aa40E0B475'
    const contractav = new web3t.eth.Contract(abia, addr)


    const abilike = ZonuletNFTLikes.abi
    const contractlike = new web3t.eth.Contract(abilike, '0x604950ba06Cb36D53193012E816E07296f995dD8')


    const abiblack = ZonuletBlacklist.abi

    const contractblack = new web3t.eth.Contract(abiblack, '0x701E0F3d41b70d180A856099EBe3494E4277c804')


    var SI_SYMBOL = ['', 'k', 'M', 'B', 'T', 'P', 'E']

    function abbreviateNumber(number) {
      // what tier? (determines SI symbol)
      var tier = (Math.log10(Math.abs(number)) / 3) | 0

      // if zero, we don't need a suffix
      if (tier == 0) return number

      // get suffix and determine scale
      var suffix = SI_SYMBOL[tier]
      var scale = Math.pow(10, tier * 3)

      // scale the number
      var scaled = number / scale

      // format number and add suffix
      return scaled.toFixed(1) + suffix
    }

    if (typeof web3 !== 'undefined') {
      const maticbalance = web3.utils.fromWei(await web3.eth.getBalance(this.state.account), 'ether')
      this.setState({ maticbalance })
      // console.log(maticbalance)
    }
    if (typeof web3 !== 'undefined') {
      const abia = ZoNulet.abi
      const addr = '0x496a89968Fb0e0EffE32Db03102B613084239ED3'
      const contract = new web3.eth.Contract(abia, addr)
      const zonubal = await contract.methods.balanceOf(this.state.account).call()
      const zonubalance2 = web3.utils.fromWei(zonubal, 'ether')
      const zonubalance = zonubalance2

      this.setState({ zonubalance })
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
    const transactions = await sale_contract.getPastEvents('BoughtNFT', {
      fromBlock: 462592,
      toBlock: 'latest',
    })

    const gtransactions = await sale_contract.getPastEvents('GiftedNFT', {
      fromBlock: 462592,
      toBlock: 'latest',
    })
    // console.log(transactions)

    // if (this.state.transactions !== transactions) {
    this.setState({ transactions: transactions })

    this.setState({ gtransactions: gtransactions })
    // }
  }

  render() {

    return (
      <div>
        <ScrollToTop smooth/>
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
                Matic Network. Anyone can mint NFTs and list them for sale. This results in possible fakes and
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
            <img src="/matic.svg" border="0" height="66px" width="66px" /> <i className="fa fa-arrow-right"></i>{' '}
              <img src="/zonublue.svg" border="0" height="66px" width="66px" />
            </h2>
            <br />
            <div align="center">
              <p>
                <h3>
                  Swap your <strong>MATIC</strong> to <strong>ZONU</strong>
                </h3>
                <br />
                Balance{' '}
                <strong>
                  <span id="onebal">
                    {Number(this.state.maticbalance)
                      .toString()
                      .slice(
                        0,
                        Number(this.state.maticbalance)
                          .toString()
                          .indexOf('.') + 5,
                      )}
                  </span>
                </strong>{' '}
                MATIC
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
                    placeholder="Amount of MATIC/MUMBAI"
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
          <div className='zonuTech'>
              <a href='https://wiki.polygon.technology/' target='_blank' rel="noopener noreferrer">
                <div className='zonuTech_image'>
                <img src="/crypto_tech.svg"/>
                </div>
              </a>
            </div>
          <div className='col-md-12 carouselInner'>
              <Carousel fade className='carouselBanner'>
                  {/* <Carousel fade> */}
                    <Carousel.Item interval={10000} controls={false} indicators={false}>
                      <div className="col-md-2 card2 cardW100 bg-light m-3 p-2">
                      <form onSubmit={event => {}}>
                            <div className="col-auto max-550">
                              <video
                                    alt="NFT"
                                    className="token rounded"
                                    autoPlay={true}
                                    playsInline
                                    muted={true}
                                    loop={true}
                                    controls
                                    src="https://zonulet.infura-ipfs.io/ipfs/QmegzHhMuG8AyayEBfNsRBH5hJKSeyxvcZUh1DDm7hoCr4"
                                    type="video/mp4"
                                    style={{ background: '#21263e' }}
                                  >
                                   <source
                                      src="https://zonulet.infura-ipfs.io/ipfs/QmegzHhMuG8AyayEBfNsRBH5hJKSeyxvcZUh1DDm7hoCr4"
                                      type="video/mp4"
                                    ></source>
                              </video>
                            </div>
                          </form>
                      </div>
                    </Carousel.Item>
                    {/*  */}
                    <Carousel.Item interval={10000} controls={false} indicators={false}>
                      <div className="col-md-2 card2 cardW100 bg-light m-3 p-2 myes">
                          <form onSubmit={event => {}}>
                            <div className="col-auto max-550">
                            <video
                                    alt="NFT"
                                    className="token rounded"
                                    autoPlay={true}
                                    muted={true}
                                    loop={true}
                                    controls
                                    playsInline
                                    src="https://zonulet.infura-ipfs.io/ipfs/QmbYQ5aoVmME1MRguak7f4MV51n6TcBMxpGVqqbE2Wem1T"
                                    type="video/mp4"
                                    style={{ background: '#21263e' }}
                                  >
                                   <source
                                      src="https://zonulet.infura-ipfs.io/ipfs/QmbYQ5aoVmME1MRguak7f4MV51n6TcBMxpGVqqbE2Wem1T"
                                      type="video/mp4"
                                    ></source>
                              </video>
                            </div>
                          </form>
                      </div>
                    </Carousel.Item>
                    {/*  */}
                    <Carousel.Item interval={10000} controls={false} indicators={false}>
                      <div className="col-md-2 card2 cardW100 bg-light m-3 p-2">
                          <form onSubmit={event => {}}>
                            <div className="col-auto max-550">
                            <video
                                    alt="NFT"
                                    className="token rounded"
                                    autoPlay={true}
                                    playsInline
                                    muted={true}
                                    loop={true}
                                    controls
                                    src="https://zonulet.infura-ipfs.io/ipfs/QmUoSiEyPLirbe6ZysAPxFJV19htHkKWhb8xfPpSDxoHME"
                                    type="video/mp4"
                                    style={{ background: '#21263e' }}
                                  >
                                   <source
                                      src="https://zonulet.infura-ipfs.io/ipfs/QmUoSiEyPLirbe6ZysAPxFJV19htHkKWhb8xfPpSDxoHME"
                                      type="video/mp4"
                                    ></source>
                              </video>
                            </div>
                          </form>
                      </div>
                    </Carousel.Item>
              </Carousel>
          </div>
            <div className="col-md-12" align="center">
              <div className="row">
                <div className="featuredContainer my-auto align-middle">
                  <div className="col-md-6 blockReact1">
                    <h1 className="g-0 g-md-1 textReact">
                    YOUR FAVORITE NFT MARKETPLACE <br/>YOU HAVE NOT SEEN YET
                    </h1>
                    <span className="subheader trsLight">Zonulet is a Decentralized Marketplace that uses most of the
                    <strong><span className='txtGreen'> IPFS |</span>&nbsp;
                    <span className='smallBlue'>CHAINLINK |</span>&nbsp;
                    <span className='smallYellow'>INFURA |</span>&nbsp;
                    and</strong> <strong><span className='txtBlue'>MATIC BLOCKCHAIN </span></strong> technology to fetch NFT Prices, Storing NFT Data and more</span>
                    <div className="blockButton1">
                      <a
                        type="button"
                        href="/explore/exploreall"
                        className="btn btn-primary rounded m-3 homeButton swapbtn homeButton3 trsLight"
                      >
                        EXPLORE
                      </a>
                      <a type="button" onClick={this.handleOpenZONUModal} className="actionGroup">
                        <span className="pointer zonuletBuy">
                          <span className="zonuletBordering trsLight">SWAP MY MATIC</span>
                        </span>
                      </a>
                    </div>
                    <div className="blockPowered" style={{display: 'block'}}>
                      <div className="poweredIconer">
                        <p className="textPowered" style={{textTransform: "uppercase"}}>
                        <span className='warningVersion'>
                        <span className='textWarning'>Matic Testnet Version</span>
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
                                    playsInline
                                    muted={true}
                                    loop={true}
                                    controls
                                    src="https://zonulet.infura-ipfs.io/ipfs/QmegzHhMuG8AyayEBfNsRBH5hJKSeyxvcZUh1DDm7hoCr4"
                                    type="video/mp4"
                                    style={{ background: '#21263e' }}
                                  >
                                   <source
                                      src="https://zonulet.infura-ipfs.io/ipfs/QmegzHhMuG8AyayEBfNsRBH5hJKSeyxvcZUh1DDm7hoCr4"
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
                              <video
                                    alt="NFT"
                                    className="token rounded"
                                    autoPlay={true}
                                    playsInline
                                    muted={true}
                                    loop={true}
                                    controls
                                    src="https://zonulet.infura-ipfs.io/ipfs/QmbYQ5aoVmME1MRguak7f4MV51n6TcBMxpGVqqbE2Wem1T"
                                    type="video/mp4"
                                    style={{ background: '#21263e' }}
                                  >
                                   <source
                                      src="https://zonulet.infura-ipfs.io/ipfs/QmbYQ5aoVmME1MRguak7f4MV51n6TcBMxpGVqqbE2Wem1T"
                                      type="video/mp4"
                                    ></source>
                              </video>
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
                                    playsInline
                                    muted={true}
                                    loop={true}
                                    controls
                                    src="https://zonulet.infura-ipfs.io/ipfs/QmUoSiEyPLirbe6ZysAPxFJV19htHkKWhb8xfPpSDxoHME"
                                    type="video/mp4"
                                    style={{ background: '#21263e' }}
                                  >
                                    <source
                                      src="https://zonulet.infura-ipfs.io/ipfs/QmUoSiEyPLirbe6ZysAPxFJV19htHkKWhb8xfPpSDxoHME"
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
              <div
                className="intro"
              >
                <div className="row" align="center">
                  <div className="grande_partita">
                    <div className="funded_by">
                      <span className="glitch fs17" data-text="STATISTICS">STATISTICS</span>
                    </div>
                  </div>
                  <div className="col-md-4 gryBg">
                    <strong className="trsLight2 fs17">TOTAL VALUE LOCKED</strong>
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
                      <h2 className="txtBlue">
                        $
                        <strong>
                          {this.state.totalliquidity.toLocaleString('en', {
                            style: 'decimal',
                            maximumFractionDigits: 0,
                            minimumFractionDigits: 0,
                          })}
                        </strong>
                      </h2>
                    </ReactPlaceholder>
                  </div>
                  <div className="col-md-4 gryBg">
                    <strong className="trsLight2 fs17">MARKET CAP</strong>
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
                        <h2 className="txtBlue">
                        $
                        <strong>
                          {this.state.mcap.toLocaleString('en', {
                            style: 'decimal',
                            maximumFractionDigits: 0,
                            minimumFractionDigits: 0,
                          })}
                        </strong>{' '}
                      </h2>
                    </ReactPlaceholder>
                  </div>
                  <div className="col-md-4 gryBg">
                  <strong className="trsLight2 fs17">TOTAL NFTs</strong>
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
                      <h2 className="txtBlue">
                        <strong>{this.state.totalSupply}</strong>
                      </h2>
                    </ReactPlaceholder>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </LoadingOverlay>
      </div>
    )
  }
}

export default Landing
