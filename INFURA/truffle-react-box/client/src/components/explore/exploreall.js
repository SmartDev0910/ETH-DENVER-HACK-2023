import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Img from 'react-cool-img'
import Modal from 'react-modal'
import ReactCanvasConfetti from 'react-canvas-confetti'
import ReactPlaceholder from 'react-placeholder'
import 'react-placeholder/lib/reactPlaceholder.css'
import 'react-sweet-progress/lib/style.css'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import ScrollToTop from 'react-scroll-to-top'
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
    maxWidth: '550px',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}


class ExploreAll extends Component {




  constructor(props) {
    super(props)
    this.state = {
      account: '',
      contract: null,
      sale_contract: null,
      totalSupply: 0,
      totalliquidity: 0,
      totalcirc: 0,
      mcap: 0,
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
      mimageData_id: [],
      mimageData_category: [],
      mimageData_price: [],
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
      iData_usdprice: [],
      iData_price: [],
      iData_id: [],
      ready2: false,
      ready3: false,
      latest_collections: false,
      latest_mint: false,
      random_NFTs: false,
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

  }

  async componentWillMount() {
    this.state.tximages = []
    this.state.tximageData_name = []
    this.state.tximageData_ipfsData = []
    this.state.tximageData_mimeType = []
    this.state.tximageData_category = []
    this.state.tximageData_price = []
    this.state.tximageData_id = []
    this.state.tximageData_buyer = []
    this.state.tximageData_boughtprice = []
    this.state.tximageData_buyeripfs = []
    this.state.tximageData_buyermim = []
    this.state.tximageData_buyername = []
    this.state.tximageData_verified = []
    this.state.mimages = []
    this.state.mimageData_name = []
    this.state.mimageData_ipfsData = []
    this.state.mimageData_mimeType = []
    this.state.mimageData_id = []
    this.state.mimageData_category = []
    this.state.mimageData_price = []
    this.state.ready3 = false
    this.state.ready2 = false
    this.state.feature_verified = []
    this.state.iData_name = []
    this.state.iData_ipfsData = []
    this.state.iData_mimeType = []
    this.state.iData_category = []
    this.state.iData_usdprice = []
    this.state.iData_price = []
    this.state.iData_id = []
    this.state.owned = ''
    this.state.ipfs = ''
    this.state.mim = ''
    this.state.transactions = []
    this.state.transactions = []
    this.state.transactions = []
    this.state.transactions = []

    await this.loadMantleData()
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

  async loadMantleData() {
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

    const web3t = new Web3('https://rpc.testnet.mantle.xyz')


    if (typeof web3 !== 'undefined') {

      const accounts = await web3.eth.getAccounts()

      this.setState({ account: accounts[0] })
      this.setState({ connected: true })

      const chainId = await web3.eth.getChainId()

      if (chainId === 5001) {
        this.setState({ connected: true })
        // console.log(this.state.connected)
        // console.log(this.state.account)
      } else {
        this.setState({ connected: false })
      }
    }

    setInterval(async () => {
      if (typeof web3 !== 'undefined' && this.state.showZONUModal === true) {
        // console.log('start typing number??')
        const mantlebalance = web3.utils.fromWei(await web3.eth.getBalance(this.state.account), 'ether')
        if (mantlebalance > 0 && typeof mantlebalance !== 'undefined') {
          this.setState({ mantlebalance })

          document.getElementById('onebal').innerHTML = Number(mantlebalance).toFixed(4)

          const abia = ZoNulet.abi
          const addr = '0x9C3a2429A288dBEA75C819Fd18C0b35a0C3E1361'
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
    }, 100)

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

    const abiv = ZonuletVerified.abi
    const addv = '0xB8D6deA2b38ED7E8194C50ad7Ae163B36ff2b03a' //ZonuletVerified
    const contractVerifiy = new web3t.eth.Contract(abiv, addv)

    const abia = ZonuletAvatars.abi
    const addr = '0xEd1A69efced001468a9F7c469fe1F8640e7583C4' //ZonuletAvatars
    const contractAvatars = new web3t.eth.Contract(abia, addr)

    const abilike = ZonuletNFTLikes.abi
    const contractlike = new web3t.eth.Contract(abilike, '0x93A54F1f67428bfF04394551BfeC98D28bcb0d8b')

    const abiblack = [{"stateMutability":"nonpayable","type":"constructor","inputs":[]},{"type":"event","name":"SetBlackListedAddress","inputs":[{"internalType":"address","indexed":true,"name":"hashAddress","type":"address"},{"name":"blacklisted","type":"bool","indexed":false,"internalType":"bool"}],"anonymous":false},{"inputs":[{"name":"nftID","indexed":true,"type":"uint256","internalType":"uint256"},{"name":"blacklisted","type":"bool","indexed":false,"internalType":"bool"}],"name":"SetBlackListedNFT","anonymous":false,"type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"idupdates","type":"function","outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"inputs":[],"name":"owner","stateMutability":"view","type":"function","outputs":[{"internalType":"address","type":"address","name":""}]},{"type":"function","outputs":[{"type":"address","name":"","internalType":"address"}],"stateMutability":"view","name":"updates","inputs":[{"type":"uint256","internalType":"uint256","name":""}]},{"outputs":[],"stateMutability":"nonpayable","inputs":[{"internalType":"address","name":"addy","type":"address"},{"internalType":"bool","name":"blacklisted","type":"bool"}],"type":"function","name":"setBlackListedAddress"},{"inputs":[{"internalType":"uint256","name":"nftID","type":"uint256"},{"internalType":"bool","name":"blacklisted","type":"bool"}],"name":"setBlackListedNFT","outputs":[],"type":"function","stateMutability":"nonpayable"},{"outputs":[{"type":"bool","internalType":"bool","name":""}],"stateMutability":"view","name":"getBlackListedAddress","inputs":[{"name":"blAddress","internalType":"address","type":"address"}],"type":"function"},{"type":"function","name":"getBlackListedNFT","inputs":[{"name":"nftID","type":"uint256","internalType":"uint256"}],"stateMutability":"view","outputs":[{"internalType":"bool","type":"bool","name":""}]},{"stateMutability":"view","name":"AddyCount","type":"function","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"inputs":[]},{"outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"type":"function","inputs":[],"name":"IDCount","stateMutability":"view"}]      

    const contractblack = new web3t.eth.Contract(abiblack, '0x0739948117Ee512eF799132c611c28B201B87c1b')

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
      const mantlebalance = web3.utils.fromWei(await web3.eth.getBalance(this.state.account), 'ether')
      this.setState({ mantlebalance })
      // console.log('your MANTLE BALANCE', mantlebalance)
    }

    if (typeof web3 !== 'undefined') {
      const abia = ZoNulet.abi
      const addr = '0x9C3a2429A288dBEA75C819Fd18C0b35a0C3E1361'
      const contract = new web3.eth.Contract(abia, addr)
      const zonubal = await contract.methods.balanceOf(this.state.account).call()
      const zonubalance2 = web3.utils.fromWei(zonubal, 'ether')
      const zonubalance = zonubalance2

      this.setState({ zonubalance })
    }

    this.setState({ contractblack })

    this.setState({ contractlike })

    // console.log(contract)
    this.setState({ contractAvatars })
    // console.log(contract)
    this.setState({ contractVerifiy })

    this.setState({ contract })

    const totalSupply = await contract.methods.totalSupply().call()
    // console.log('total supply of',totalSupply)
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

    // console.log(gtransactions);

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

    var randomnum2 = parseInt(randomNumber(0, totalSupply))
    const blacklisted = await contractblack.methods.getBlackListedNFT(randomnum2).call()
    
    if (!blacklisted) {
      const metadata = await contract.methods.imageData(randomnum2).call()

      // console.log(metadata)
      this.setState({ iData_name: metadata.name })
      this.setState({ iData_ipfsData: metadata.ipfsData })
      this.setState({ iData_category: metadata.category })
      this.setState({ iData_price: abbreviateNumber(metadata.price) })

      this.setState({ iData_des: metadata.description })
      this.setState({ iData_url: metadata.url })
      this.setState({ iData_mimeType: metadata.mimeType })
      this.setState({ iData_id: randomnum2 })


      const owned = await contract.methods.ownerOf(randomnum2).call()
      // console.log(owner)
      this.setState({ owned })
      const getVerified = await contractVerifiy.methods.getVerified(this.state.owned).call()
      this.setState({ feature_verified: getVerified })

      if (owned !== '') {
        const getIPFS = await contractAvatars.methods.getIPFSHash(owned).call()
        // console.log(getIPFS)
        const getMIME = await contractAvatars.methods.getMIMEType(owned).call()
        // console.log(getMIME)
        const getName = await contractAvatars.methods.getName(owned).call()
        // console.log(getName)
        this.setState({ ipfs: getIPFS })
        this.setState({ mim: getMIME })
        this.setState({ name: getName })
        this.setState({ ready2: true })
      }
    }

    var j = 0
    for (var k = this.state.totalSupply; k--; ) {
      // i = 159
      // console.log(j)
      if (j < 10) {
        const blacklisted = await contractblack.methods.getBlackListedNFT(k).call()
        if (!blacklisted) {
          const metadata = await contract.methods.imageData(k).call()
          const owner = await contract.methods.ownerOf(k).call()
          const likecount = await contractlike.methods.nftLikes(k).call()
          const pacmancount = await contractlike.methods.nftPacmans(k).call()
          // console.log(metadata)
          this.setState({
            mimages: [...this.state.mimages, metadata.name],
            mimageData_name: [...this.state.mimageData_name, metadata.name],
            mimageData_ipfsData: [...this.state.mimageData_ipfsData, metadata.ipfsData],
            mimageData_mimeType: [...this.state.mimageData_mimeType, metadata.mimeType],
            mimageData_category: [...this.state.mimageData_category, metadata.category],
            mimageData_price: [...this.state.mimageData_price, metadata.price],
            mimageData_owner: [...this.state.mimageData_owner, owner],
            mimageData_likecount: [...this.state.mimageData_likecount, likecount.likes],
            mimageData_icecount: [...this.state.mimageData_icecount, pacmancount.pacmans],
            mimageData_id: [...this.state.mimageData_id, k],
          })
          j++

          // console.log(this.state.mimages)
          if (j === 10) {
            // this.setState({ latest_mint: true })
            this.setState({ random_NFTs: true })
            this.setState({ latest_collections: true })
            // console.log(this.state.readymint)
            break
          }
        }
      } else {
        break
      }
    }

    var numtofeature = 10

    fetch(`${process.env.REACT_APP_INFURA_MANTLE}`, {
      mode: 'cors',
    })
      .then(response => {
        // console.log(response);
        return response.json()
      })
      .then(data => {
        // Work with JSON data here
        // console.log(data);
        // console.log(data.length)
        for (var b = numtofeature; b--; ) {
          var randomnum = parseInt(randomNumber(0, data.length))
          // console.log(metadata)
          this.setState({
            images: [...this.state.images, data[randomnum]],
            imageData_name: [...this.state.imageData_name, data[randomnum].name],
            imageData_ipfsData: [...this.state.imageData_ipfsData, data[randomnum].ipfsData],
            imageData_mimeType: [...this.state.imageData_mimeType, data[randomnum].mimeType],
            imageData_category: [...this.state.imageData_category, data[randomnum].category],
            imageData_price: [...this.state.imageData_price, data[randomnum].price],
            imageData_owner: [...this.state.imageData_owner, data[randomnum].owner],
            imageData_id: [...this.state.imageData_id, data[randomnum].id],
          })
          // console.log(b)
          this.setState({ ready: true })
        }
      })
      .catch(err => {
        // Do something for an error here
        // console.log('Error Reading data ' + err)
      })

    // for each transaction in transactions setstate for buyer, tokenId, and price
    if (transactions.length > 0) {
      for (var i = transactions.length; i--; ) {
        var transaction = this.state.transactions[i]
        // console.log(transaction.returnValues._tokenId)
        if (typeof transaction !== 'undefined') {
          if (transaction.returnValues !== 'undefined') {
            const metadata = await contract.methods.imageData(transaction.returnValues._tokenId).call()

            const getIPFS = await contractAvatars.methods.getIPFSHash(transaction.returnValues._buyer).call()
            const getMIME = await contractAvatars.methods.getMIMEType(transaction.returnValues._buyer).call()
            const getVerified = await contractVerifiy.methods.getVerified(transaction.returnValues._buyer).call()

            // console.log(metadata)
            this.setState({
              tximages: [...this.state.tximages, metadata.name],
              tximageData_name: [...this.state.tximageData_name, metadata.name],
              tximageData_ipfsData: [...this.state.tximageData_ipfsData, metadata.ipfsData],
              tximageData_mimeType: [...this.state.tximageData_mimeType, metadata.mimeType],
              tximageData_category: [...this.state.tximageData_category, metadata.category],
              tximageData_price: [...this.state.tximageData_price, metadata.price],
              tximageData_buyer: [...this.state.tximageData_buyer, transaction.returnValues._buyer],
              tximageData_boughtprice: [...this.state.tximageData_boughtprice, abbreviateNumber(transaction.returnValues._price),
              ],
              tximageData_buyeripfs: [...this.state.tximageData_buyeripfs, getIPFS],
              tximageData_buyermim: [...this.state.tximageData_buyermim, getMIME],
              tximageData_verified: [...this.state.tximageData_verified, getVerified],
              tximageData_id: [...this.state.tximageData_id, transaction.returnValues._tokenId],
            })

            this.setState({ ready3: true })
          }
        }
      }
    }

    if (gtransactions.length > 0) {
      var n = gtransactions.length
      while (n--) {
        var gtransaction = this.state.gtransactions[n]
        // console.log(transaction.returnValues._tokenId)
        if (typeof gtransaction !== 'undefined') {
          if (gtransaction.returnValues !== 'undefined') {
            const metadata = await contract.methods.imageData(gtransaction.returnValues._tokenId).call()

            const getIPFS = await contractAvatars.methods.getIPFSHash(gtransaction.returnValues._receiver).call()
            const getMIME = await contractAvatars.methods.getMIMEType(gtransaction.returnValues._receiver).call()
            const getVerified = await contractVerifiy.methods.getVerified(gtransaction.returnValues._receiver).call()

            // const blacklisted = await contractblack.methods.getBlackListedNFT(gtransaction.returnValues._tokenId).call();

            // if (!blacklisted) {
            // console.log(metadata)
            this.setState({
              gtximages: [...this.state.gtximages, metadata.name],
              gtximageData_name: [...this.state.gtximageData_name, metadata.name],
              gtximageData_ipfsData: [...this.state.gtximageData_ipfsData, metadata.ipfsData],
              gtximageData_mimeType: [...this.state.gtximageData_mimeType, metadata.mimeType],
              gtximageData_category: [...this.state.gtximageData_category, metadata.category],
              gtximageData_price: [...this.state.gtximageData_price, metadata.price],
              gtximageData_receiver: [...this.state.gtximageData_receiver, gtransaction.returnValues._receiver],
              gtximageData_buyeripfs: [...this.state.gtximageData_buyeripfs, getIPFS],
              gtximageData_buyermim: [...this.state.gtximageData_buyermim, getMIME],
              gtximageData_verified: [...this.state.gtximageData_verified, getVerified],
              gtximageData_id: [...this.state.gtximageData_id, gtransaction.returnValues._tokenId],
            })

            this.setState({ readyg: true })
            // }
          }
        }
      }
    }

    setInterval(async () => {
      this.state.images = []
      this.state.owners = []
      this.state.imageData_name = []
      this.state.imageData_ipfsData = []
      this.state.imageData_mimeType = []
      this.state.imageData_category = []
      this.state.imageData_price = []
      this.state.imageData_id = []
      this.state.approved = []
      this.state.transactions = []
      // this.state.ready = false;

      var numtofeature = 10

      fetch(`${process.env.REACT_APP_INFURA_MANTLE}`, {
        mode: 'no-cors',
      })
        .then(response => {
          // console.log(response);
          return response.json()
        })
        .then(data => {
          // Work with JSON data here
          // console.log(data);
          // console.log(data.length)
          for (var b = numtofeature; b--; ) {
            var randomnum = parseInt(randomNumber(0, data.length))
            // console.log(metadata)
            this.setState({
              images: [...this.state.images, data[randomnum]],
              imageData_name: [...this.state.imageData_name, data[randomnum].name],
              imageData_ipfsData: [...this.state.imageData_ipfsData, data[randomnum].ipfsData],
              imageData_mimeType: [...this.state.imageData_mimeType, data[randomnum].mimeType],
              imageData_category: [...this.state.imageData_category, data[randomnum].category],
              imageData_price: [...this.state.imageData_price, data[randomnum].price],
              imageData_owner: [...this.state.imageData_owner, data[randomnum].owner],
              imageData_id: [...this.state.imageData_id, randomnum],
            })
            // console.log('number feautre:', b)
            this.setState({ ready: true })
          }
        })
        .catch(err => {
          // Do something for an error here
          // console.log('Error Reading data ' + err)
        })
    }, 100)
  }

    render() {
    return (
      <div>
        <ScrollToTop smooth/>
        <LoadingOverlay
          active={this.state.txpend}
          spinner
          transition={false}
          text={'Waiting on...' + this.state.txs + 'transaction(s)'}
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
          <div className="row home-adj">
            <div className="col-md-12" align="center">
              <div className="row">
                <div className="col-md-6 my-auto">
                  <h2>
                  <div className="vcrFont mobilefont18">Mantle Mash Hackathon</div> 
                  </h2>
                  <div className="fs15">Chalenges For NFT & GAMING and DEFI </div> 
                  <div className="row">
                  <div className="col-md-6">
                  <div className="market_cap mt15">
                  <span className="trsLight ls_4 mobilefont14"><strong className="nameNFTs">1.[DEFI] DEXSWAP</strong></span>
                  <div className="trsLight mobilefont12"></div>
                  <span className="trsLight ls_4 mobileNone"><strong className="nameNFTs"></strong></span>
                  </div>
                  </div>
                  <div className="col-md-6">
                  <div className="total_nfts mt15">
                  <span className="trsLight ls_4 mobilefont14"><strong className="nameNFTs">2.[NFT] ZONULET</strong></span>
                  <div className="trsLight mobilefont12"></div>
                  <span className="trsLight ls_4 mobileNone"><strong className="nameNFTs"></strong></span>
                  </div>
                  </div>
                  </div>
                  <div className="row">
                    <div className="my-auto total_funded"  style={{display:"flex", justifyContent: "center"}}>
                      <span className="nameNFTs mobilefont14">
                      <a href= "https://github.com/Agin-DropDisco/Mantle-Hackathon/tree/main/Mantle%20Mash%20-%20Gitcoin%20Hackathon%20Bounty%20-%20NFT%20%26%20Gaming" target="_blank" rel="noopener noreferrer">
                        SOURCE CODE CAN BE FOUND HERE
                      </a>
                      </span>
                    </div>
                  </div>
                  <br />
                  <br />
                </div>
                <div className="col-md-6">
                  <ReactPlaceholder
                    type="rect"
                    ready={this.state.ready2}
                    showLoadingAnimation={true}
                    color="#333"
                    style={{
                      width: '100%',
                      height: '450px',
                      marginTop: '15px',
                      borderRadius: '15px',
                    }}
                  >
                    <a href={'/nft/' + this.state.iData_id}>
                      <div
                        style={{
                          backgroundColor: '#151a2f',
                          borderRadius: '13px',
                          borderTop: '1px solid rgb(32, 235, 240)',
                          borderBottom: '1px solid rgb(32, 235, 240)',
                          height: '100%',
                          margin: '0',
                          padding: '0',
                          width: '100%'
                        }}
                      >
                        <div className="row align-items-start">
                          <div className='text_upper'>
                            <div className="col" align="center">
                            <div className="m-2 text-light btAddress">
                            <span className="nameNFTs">
                              {this.state.iData_name.length > 20
                                ? this.state.iData_name.slice(0, 20) + '...'
                                : this.state.iData_name}
                              </span>
                            <br />
                              <span style={{ fontSize: '13px' }}>
                                Owned By <strong style={{color: '#d17e67', fontWeight: 'bold'}}>{this.state.owned.substring(0, 8) + '...'}</strong>
                              </span>
                            </div>
                            </div>
                            <div className="col" align="center">
                            {this.state.owned.length > 0 ? (
                              this.state.ipfs !== '' &&
                              (this.state.mim === 'image/jpeg' ||
                                this.state.mim === 'image/png' ||
                                this.state.mim === 'image/gif') ? (
                                <div
                                  style={{
                                    position: 'relative',
                                    width: '45px',
                                  }}
                                >
                                  <Img
                                    src={`${process.env.REACT_APP_INFURA_GATEAWAY}` + this.state.ipfs}
                                    cache
                                    alt=""
                                    border="0"
                                    height="50px"
                                    width="50px"
                                    style={{ borderRadius: '50%' }}
                                  />

                                  {this.state.feature_verified === true ? (
                                    <div
                                      style={{
                                        position: 'absolute',
                                        bottom: '-3px',
                                        right: '-1px',
                                      }}
                                    >
                                      <svg
                                        width="16"
                                        height="16"
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
                                    width: '45px',
                                    marginTop: '10px',
                                    marginBottom: '0px',
                                  }}
                                  className="jazzProfile"
                                >
                                  <Jazzicon diameter={45} seed={jsNumberForAddress(this.state.owned)} />
                                  {this.state.feature_verified === true ? (
                                    <div
                                      style={{
                                        position: 'absolute',
                                        bottom: '-3px',
                                        right: '-2px',
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
                                          fill="#07efff"
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
                            ) : null}
                            </div>
                          <div className="col" align="center">
                            <div className="m-2 text-light btAddress">
                              <span className="nameNFTs">Price: <span style={{color: '#0dcaf0', fontWeight: 'bold'}}>{this.state.iData_price}</span> &nbsp;
                                <strong>ZONU</strong>
                              </span>
                            </div>
                          </div>
                          </div>
                        </div>
                        <div className="col-auto" style={{ height: '400px' }}>
                          {typeof this.state.iData_ipfsData !== 'undefined' ? (
                            this.state.iData_mimeType === 'image/jpeg' ||
                            this.state.iData_mimeType === 'image/png' ||
                            this.state.iData_mimeType === 'image/gif' ? (
                              <Img
                                alt="NFT"
                                className="token rounded"
                                src={`${process.env.REACT_APP_INFURA_GATEAWAY}` + this.state.iData_ipfsData}
                                cache
                                style={{ background: '#21263e' }}
                              />
                            ) : this.state.iData_mimeType === 'video/mp4' ? (
                              <video
                                alt="NFT"
                                className="token rounded"
                                autoPlay={true}
                                muted={true}
                                loop={true}
                                controls
                                playsInline
                                src={`${process.env.REACT_APP_INFURA_GATEAWAY}` + this.state.iData_ipfsData}
                                type="video/mp4"
                              >
                                <source
                                  src={`${process.env.REACT_APP_INFURA_GATEAWAY}` + this.state.iData_ipfsData}
                                  type="video/mp4"
                                ></source>
                              </video>
                            ) : this.state.iData_mimeType === 'model/gltf-binary' ? (
                              <model-viewer
                                src={`${process.env.REACT_APP_INFURA_GATEAWAY}` + this.state.iData_ipfsData}
                                alt={this.state.iData_name}
                                ar
                                ar-modes="webxr scene-viewer quick-look"
                                environment-image="neutral"
                                auto-rotate
                                camera-controls
                                style={{ width: '100%', height: '400px' }}
                              ></model-viewer>
                            ) : null
                          ) : null}
                        </div>
                      </div>
                    </a>
                  </ReactPlaceholder>
                  <br />
                </div>
              </div>
              <br />
              <br />
              <div className="row justify-content-around">
                <h4 className="text-light">Latest Minted/Collections</h4>
                <ReactPlaceholder
                  type="rect"
                  ready={this.state.latest_collections}
                  showLoadingAnimation={true}
                  color="#333"
                  style={{
                    width: '300px',
                    height: '300px',
                    marginTop: '15px',
                    borderRadius: '15px',
                  }}
                >
                  {this.state.mimages.reverse().map((id, key) => {
                    return key < 8 ? (
                      this.state.latest_collections === true ? (
                        <div key={key} className="col-md-2 card cardW200 bg-light m-3 p-2 myes mbBottom">                         
                          <Link
                            to={{
                              pathname: `/collection/${this.state.mimageData_owner[key]}`,
                            }}
                          >
                            <form onSubmit={event => {}}>
                            <div className="col-auto max-350">
                                <div className="text-secondary idbadge idbadgeOrange" align="center">
                                  <span>{this.state.mimageData_name[key]}</span>
                                </div>
                                {typeof this.state.mimageData_ipfsData[key] !== 'undefined' ? (
                                  this.state.mimageData_mimeType[key] === 'image/jpeg' ||
                                  this.state.mimageData_mimeType[key] === 'image/png' ||
                                  this.state.mimageData_mimeType[key] === 'image/gif' ? (
                                    <Img
                                      alt="NFT"
                                      className="token rounded multiBox_bg"
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
                                  ) : this.state.mimageData_mimeType2[key] === 'model/gltf-binary' ? (
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
                                      style={{ width: '100%', height: '250px' }}
                                    ></model-viewer>
                                  ) : null
                                ) : null}
                            </div>
                            <div className="bs_bottom">
                              <div className="multibox_btm">
                                <div className="multibox_avatext">
                                  <div className="multibox_ava"></div>
                                  <div className="multibox_text"></div>
                                </div>
                              </div>
                            <div className="m-2 collection_category" align="center">
                              <strong>OWNER : </strong>&nbsp;&nbsp;
                              <span>{this.state.mimageData_owner[key].substring(0, 15) + '...'}</span>
                              {/* {this.state.owned.substring(0, 8) + '...'} */}
                            </div>
                            </div>
                            </form>
                          </Link>
                        </div>
                      ) : null
                    ) : null
                  })}
                </ReactPlaceholder>
                <ReactPlaceholder
                  type="rect"
                  ready={this.state.latest_collections}
                  showLoadingAnimation={true}
                  color="#333"
                  style={{
                    width: '300px',
                    height: '300px',
                    marginTop: '15px',
                    borderRadius: '15px',
                  }}
                >
                  <span style={{ display: 'none' }}>&nbsp;</span>
                </ReactPlaceholder>
                <ReactPlaceholder
                  type="rect"
                  ready={this.state.latest_collections}
                  showLoadingAnimation={true}
                  color="#333"
                  style={{
                    width: '300px',
                    height: '300px',
                    marginTop: '15px',
                    borderRadius: '15px',
                  }}
                >
                  <span style={{ display: 'none' }}>&nbsp;</span>
                </ReactPlaceholder>
              </div>
              <br />
              <div className="row justify-content-around">
              <h4 className="text-light">Random NFTs</h4>
                <ReactPlaceholder
                  type="rect"
                  ready={this.state.random_NFTs}
                  showLoadingAnimation={true}
                  color="#333"
                  style={{
                    width: '300px',
                    height: '300px',
                    marginTop: '15px',
                    borderRadius: '15px',
                  }}
                >
                  {this.state.images.map((id, key) => {
                    return key < 4 ? (
                      this.state.random_NFTs === true ? (
                        <div key={key} className="col-md-2 card cardW200 bg-light m-3 p-2 myes mbBottom">
                          <div className="m-2 row" align="center">
                           <div className="col-6">
                              <a
                                href=""
                                onClick={e =>
                                  this.like(e, this.state.mimageData_owner[key], this.state.mimageData_id[key])
                                }
                                className="refCount fs21"
                              >
                                <span id={'count' + this.state.mimageData_id[key]} className="likecount">
                                  {this.state.mimageData_likecount[key]}
                                </span>{' '}
                                <i className="fas fa-thumbs-up like" id={'like' + this.state.mimageData_id[key]}></i>
                              </a>
                            </div>
                            <div className="col-6">
                              <a
                                href=""
                                onClick={e =>
                                  this.ice(e, this.state.mimageData_owner[key], this.state.mimageData_id[key])
                                }
                                className="refCount fs21"
                              >
                                <span id={'counti' + this.state.mimageData_id[key]} className="pacmancount">
                                  {this.state.mimageData_icecount[key]}
                                </span>{' '}
                                <i className="fab fa-codiepie ice" id={'ice' + this.state.mimageData_id[key]}></i>
                              </a>
                            </div>
                          </div>
                        <Link
                          to={{
                            pathname: `/nft/${this.state.imageData_id[key]}`,
                          }}
                        >
                            <form onSubmit={event => {}}>
                              <div className="col-auto max-350">
                                <div className="text-secondary idbadge idbadgeGreen" align="center">
                                <span>Category:&nbsp;{this.state.mimageData_category[key]}</span>
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
                                  ) : this.state.imageData_mimeType[key] === 'video/mp4' ? (
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
                                  ) : this.state.mimageData_mimeType[key] === 'model/gltf-binary' ? (
                                    <model-viewer
                                      src={
                                        'https://zonulet.infura-ipfs.io/ipfs/' +
                                        this.state.imageData_ipfsData[key]
                                      }
                                      alt={this.state.imageData_name[key]}
                                      ar
                                      ar-modes="webxr scene-viewer quick-look"
                                      environment-image="neutral"
                                      auto-rotate
                                      camera-controls
                                      style={{ width: '100%', height: '250px' }}
                                    ></model-viewer>
                                  ) : null
                                ) : null}
                              </div>
                            </form>
                          </Link>
                        </div>
                      ) : null
                    ) : null
                  })}
                </ReactPlaceholder>
                <ReactPlaceholder
                  type="rect"
                  ready={this.state.random_NFTs}
                  showLoadingAnimation={true}
                  color="#333"
                  style={{
                    width: '300px',
                    height: '300px',
                    marginTop: '15px',
                    borderRadius: '15px',
                  }}
                >
                  <span style={{ display: 'none' }}>&nbsp;</span>
                </ReactPlaceholder>
                <ReactPlaceholder
                  type="rect"
                  ready={this.state.random_NFTs}
                  showLoadingAnimation={true}
                  color="#333"
                  style={{
                    width: '300px',
                    height: '300px',
                    marginTop: '15px',
                    borderRadius: '15px',
                  }}
                >
                  <span style={{ display: 'none' }}>&nbsp;</span>
                </ReactPlaceholder>
                <ReactPlaceholder
                  type="rect"
                  ready={this.state.random_NFTs}
                  showLoadingAnimation={true}
                  color="#333"
                  style={{
                    width: '300px',
                    height: '300px',
                    marginTop: '15px',
                    borderRadius: '15px',
                  }}
                >
                  <span style={{ display: 'none' }}>&nbsp;</span>
                </ReactPlaceholder>
              </div>
              <br />
              <div className="row">
                <div className="col-md-3" align="center" style={{ padding: '30px' }}>
                  <h3 className="text-light">
                    <p>
                      <i className="fa fa-wallet fa-2x" style={{ color: '#0dcaf0' }}></i>
                    </p>
                    Set up your wallet
                  </h3>
                  <p className="text-secondary jtlast">
                    Once you’ve set up your wallet with Metamask, connect it to Zonulet by clicking the "Connect Wallet"
                    button in the top right corner. Only Metamask is supported.
                  </p>
                </div>
                <div className="col-md-3" align="center" style={{ padding: '30px' }}>
                  <h3 className="text-light">
                    <p>
                      <i className="fa fa-compress-arrows-alt fa-2x" style={{ color: '#0dcaf0' }}></i>
                    </p>
                    Add your collection
                  </h3>
                  <p className="text-secondary jtlast">
                    Click "Mint a NFT" and set up your Zonulet NFT collection. You can also edit your profile to get a
                    biography, profile avatar, and name stored on chain.
                  </p>
                </div>
                <div className="col-md-3" align="center" style={{ padding: '30px' }}>
                  <h3 className="text-light">
                    <p>
                      <i className="fa fa-funnel-dollar fa-2x" style={{ color: '#0dcaf0' }}></i>
                    </p>
                    Mint your NFTs
                  </h3>
                  <p className="text-secondary jtlast">
                    Upload your work (image, video, audio, or 3D model), add a name, category, and description, it is
                    cheaper than ever before with Zonulet on the Mantle network.
                  </p>
                </div>
                <div className="col-md-3" align="center" style={{ padding: '30px' }}>
                  <h3 className="text-light">
                    <p>
                      <i className="fa fa-coins fa-2x" style={{ color: '#0dcaf0' }}></i>
                    </p>
                    List them for sale
                  </h3>
                  <p className="text-secondary jtlast">
                    Choose between auctions (coming soon) and fixed-price listings. By selling an NFT you receive Zonulet
                    (ZONU) which rewards you DexSwap Token (DEZU)
                  </p>
                </div>
              </div>
              <a type="button" href="/product/search" className="btn btn-primary rounded m-3 homeButton6">
                <span>SEARCH ALL MINTED</span>
              </a>
              <br />
              <br />
              <div className="row justify-content-around">
                <h4 className="text-light">Recently Purchased NFTs</h4>
                <ReactPlaceholder
                  type="rect"
                  ready={this.state.ready3}
                  showLoadingAnimation={true}
                  color="#333"
                  style={{
                    width: '150px',
                    height: '300px',
                    marginTop: '15px',
                    borderRadius: '15px',
                  }}
                >
                  {this.state.tximages.reverse().map((id, key) => {
                    return key < 10 ? (
                      <div key={key} className="col-md-2 card bg-light m-3 p-2">
                        <Link
                          to={{
                            pathname: `/nft/${this.state.tximageData_id[key]}`,
                          }}
                        >
                          <form onSubmit={event => {}}>
                            <div className="col-auto max-150 c250">
                              <div className="text-secondary idbadge" align="center">
                                ID #{this.state.tximageData_id[key]}
                              </div>
                              {typeof this.state.tximageData_ipfsData[key] !== 'undefined' ? (
                                this.state.tximageData_mimeType[key] === 'image/jpeg' ||
                                this.state.tximageData_mimeType[key] === 'image/png' ||
                                this.state.tximageData_mimeType[key] === 'image/gif' ? (
                                  <Img
                                    alt="NFT"
                                    className="token rounded"
                                    src={
                                      'https://zonulet.infura-ipfs.io/ipfs/' + this.state.tximageData_ipfsData[key]
                                    }
                                    cache
                                    style={{ background: '#21263e' }}
                                  />
                                ) : this.state.tximageData_mimeType[key] === 'video/mp4' ? (
                                  <video
                                    alt="NFT"
                                    className="token rounded"
                                    autoPlay={true}
                                    muted={true}
                                    loop={true}
                                    playsInline
                                    controls
                                    src={
                                      'https://zonulet.infura-ipfs.io/ipfs/' + this.state.tximageData_ipfsData[key]
                                    }
                                    type="video/mp4"
                                  >
                                    <source
                                      src={
                                        'https://zonulet.infura-ipfs.io/ipfs/' +
                                        this.state.tximageData_ipfsData[key]
                                      }
                                      type="video/mp4"
                                    ></source>
                                  </video>
                                ) : this.state.tximageData_mimeType[key] === 'model/gltf-binary' ? (
                                  <model-viewer
                                    src={
                                      'https://zonulet.infura-ipfs.io/ipfs/' + this.state.tximageData_ipfsData[key]
                                    }
                                    alt={this.state.tximageData_name[key]}
                                    ar
                                    ar-modes="webxr scene-viewer quick-look"
                                    environment-image="neutral"
                                    auto-rotate
                                    camera-controls
                                    style={{ width: '100%', height: '250px' }}
                                  ></model-viewer>
                                ) : null
                              ) : null}
                            </div>
                            <div className="m-2" align="center">
                              {this.state.tximageData_name[key].length > 15 ? this.state.tximageData_name[key].substring(0, 15) + '...' : this.state.tximageData_name[key]}
                            </div>
                            <div className="m-2" align="center">
                              {this.state.tximageData_buyeripfs[key] !== '' &&
                              (this.state.tximageData_buyermim[key] === 'image/jpeg' ||
                                this.state.tximageData_buyermim[key] === 'image/png' ||
                                this.state.tximageData_buyermim[key] === 'image/gif') ? (
                                <div
                                  style={{
                                    position: 'relative',
                                    width: '45px',
                                  }}
                                >
                                  <img
                                    src={
                                      'https://zonulet.infura-ipfs.io/ipfs/' +
                                      this.state.tximageData_buyeripfs[key]
                                    }
                                    alt=""
                                    border="0"
                                    height="50px"
                                    width="50px"
                                    style={{ borderRadius: '50%' }}
                                  />

                                  {this.state.tximageData_verified[key] === true ? (
                                    <div
                                      style={{
                                        position: 'absolute',
                                        bottom: '-3px',
                                        right: '-1px',
                                      }}
                                    >
                                      <svg
                                        width="16"
                                        height="16"
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
                                    marginTop: '10px',
                                    marginBottom: '0px',
                                    width: '45px',
                                  }}
                                >
                                  <Jazzicon
                                    diameter={45}
                                    seed={jsNumberForAddress(this.state.tximageData_buyer[key])}
                                  />

                                  {this.state.tximageData_verified[key] === true ? (
                                    <div
                                      style={{
                                        position: 'absolute',
                                        bottom: '-3px',
                                        right: '-2px',
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
                              )}{' '}
                            </div>
                            <div className="m-2" align="center">
                                <strong>SOLD</strong> &nbsp;
                                <span style={{color: '#0dcaf0', fontWeight: 'bold'}}>
                                {this.state.tximageData_boughtprice[key]}&nbsp;
                                <img src="/zonulet_stndr_1.svg" alt="" style={{ width: '19px', height: '21px', verticalAlign: 'sub', marginLeft: '2px' }} />
                                </span>
                              </div>
                          
                          </form>
                        </Link>
                      </div>
                    ) : null
                  })}
                </ReactPlaceholder>
                <ReactPlaceholder
                  type="rect"
                  ready={this.state.ready3}
                  showLoadingAnimation={true}
                  color="#333"
                  style={{
                    width: '150px',
                    height: '300px',
                    marginTop: '15px',
                    borderRadius: '15px',
                  }}
                >
                  <span style={{ display: 'none' }}>&nbsp;</span>
                </ReactPlaceholder>
                <ReactPlaceholder
                  type="rect"
                  ready={this.state.ready3}
                  showLoadingAnimation={true}
                  color="#333"
                  style={{
                    width: '150px',
                    height: '300px',
                    marginTop: '15px',
                    borderRadius: '15px',
                  }}
                >
                  <span style={{ display: 'none' }}>&nbsp;</span>
                </ReactPlaceholder>
                <ReactPlaceholder
                  type="rect"
                  ready={this.state.ready3}
                  showLoadingAnimation={true}
                  color="#333"
                  style={{
                    width: '150px',
                    height: '300px',
                    marginTop: '15px',
                    borderRadius: '15px',
                  }}
                >
                  <span style={{ display: 'none' }}>&nbsp;</span>
                </ReactPlaceholder>
                <ReactPlaceholder
                  type="rect"
                  ready={this.state.ready3}
                  showLoadingAnimation={true}
                  color="#333"
                  style={{
                    width: '150px',
                    height: '300px',
                    marginTop: '15px',
                    borderRadius: '15px',
                  }}
                >
                  <span style={{ display: 'none' }}>&nbsp;</span>
                </ReactPlaceholder>
              </div>
              <br />
              <br />
            </div>
          </div>
        </LoadingOverlay>
        <ReactCanvasConfetti refConfetti={this.getInstance} style={canvasStyles} />
      </div>
    )
  }
}

export default ExploreAll
