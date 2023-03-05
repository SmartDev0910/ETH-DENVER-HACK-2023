import React, { Component } from 'react'
import Img from 'react-cool-img'
import MetaTags from 'react-meta-tags'
import ReactPlaceholder from 'react-placeholder'
import {  NavDropdown } from 'react-bootstrap'
import 'react-placeholder/lib/reactPlaceholder.css'
import ZonuletAvatars from '../../abis/ZonuletAvatars.json'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import LoadingOverlay from 'react-loading-overlay'
import { TwitterTweetButton } from 'react-social-sharebuttons'
// import '@google/model-viewer'
import Web3 from 'web3'
import { toast } from 'react-toastify';
import ZonuletNFT from '../../abis/ZonuletNFT.json'
import ZonuletNFTSale from '../../abis/ZonuletNFTSale.json'
import ZoNulet from '../../abis/ZoNulet.json'
import ZonuletVerified from '../../abis/ZonuletVerified.json'
import ZonuletNFTLikes from '../../abis/ZonuletNFTLikes.json'

class Mint extends Component {



  constructor(props) {
    super(props)
    this.state = {
      account: '',
      contract: null,
      loaded: false,
      sale_contract: null,
      token_contract: null,
      contractzonulet: null,
      totalSupply: 0,
      token_price: 0,
      images: [],
      owner: null,
      estone: 0,
      blacklisted: false,
      imageData_name: [],
      imageData_ipfsData: [],
      imageData_mimeType: null,
      imageData_category: [],
      imageData_price: [],
      imageData_des: [],
      imageData_url: [],
      imageData_slippage: [],
      selling_to: '',
      selling_price: null,
      approved: false,
      new_price: null,
      txpend: false,
      readyowner: false,
      readyminter: false,
      txs: 0,
      minted: [],
      minter: '',
      connected: false,
      transactionl: 0,
      transactions: [],
      owner_verified: [],
      mint_verified: [],
      mintedr: [],
      mintedcollection: '',
      ipfs: '',
      mim: '',
      name: '',
      ipfsmint: '',
      mimmint: '',
      namemint: '',
      ipfsb: '',
      mimb: '',
      accttosend: '',
      likecount: 0,
      pacmancount: 0,
    }
  }

  async componentWillMount() {
    await this.loadMantleData()
  }

  async like(e, owner, key) {
    e.preventDefault()
    e.stopPropagation()
    if (!window.loaded_web3) {
      toast.error("You must connect with Metamask!")
      return
    }

    document.getElementById('like' + key).classList.add('fa-pulse')

    const web3t = window.web3
    const accounts = await window.web3.eth.getAccounts()
    const acct = accounts[0]

    const abilike = ZonuletNFTLikes.abi
    const contractlike = new web3t.eth.Contract(abilike, '0x93A54F1f67428bfF04394551BfeC98D28bcb0d8b')

    contractlike.methods
      .LikeNFT(owner, key)
      .send({ from: acct })
      .once('receipt', receipt => {
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
        toast.error("Liked Failed")
        console.log(error)
        // this.setState({ txpend: false });
      })
  }

  async ice(e, owner, key) {
    e.preventDefault()
    e.stopPropagation()

    if (!window.loaded_web3) {
      toast.error("You must connect with Metamask!")
      return
    }

    document.getElementById('ice' + key).classList.add('fa-pulse')

    const web3t = window.web3

    const web3one = new Web3('https://rpc.testnet.mantle.xyz')

    const accounts = await window.web3.eth.getAccounts()
    const acct = accounts[0]

    const networkId = 5001
    const networkData = ZonuletNFT.networks[networkId]
    const abi = ZonuletNFT.abi
    const address = networkData.address
    const contract = new web3one.eth.Contract(abi, address)

    // Get minter of NFT
    const mintedr = await contract.getPastEvents('Transfer', {
      fromBlock: 462592,
      toBlock: 'latest',
    })

    for (var i = 0; i < mintedr.length; i++) {
      this.setState({
        mintedr: [...this.state.mintedr, mintedr[i].returnValues],
      })
    }

    // console.log(this.state.minted)

    for (i = 0; i < this.state.mintedr.length; i++) {
      // console.log(this.state.transactions[i]._buyer)
      // console.log(this.state.minted[i].tokenId)
      if (this.state.mintedr[i].tokenId == key) {
        // console.log('hoorah!');
        if (this.state.mintedr[i].from == '0x0000000000000000000000000000000000000000') {
          // console.log('hoorah TWICE!')
          // console.log(this.state.minted[i].to);
          this.setState({ mintedcollection: this.state.mintedr[i].to })
        }
      }
    }

    // console.log(this.state.mintedcollection)

    const abilike = ZonuletNFTLikes.abi
    const contractlike = new web3t.eth.Contract(abilike, '0x93A54F1f67428bfF04394551BfeC98D28bcb0d8b')

    const abib = ZoNulet.abi
    const addressb = '0x9C3a2429A288dBEA75C819Fd18C0b35a0C3E1361'
    const token_contract = new web3t.eth.Contract(abib, addressb)

    const pacmanprice = '1'

    token_contract.methods
      .approve('0x93A54F1f67428bfF04394551BfeC98D28bcb0d8b', web3one.utils.toWei(pacmanprice, 'ether'))
      .send({ from: acct })
      .once('receipt', receipt => {
        contractlike.methods
          .PacmanNFT(this.state.mintedcollection, key)
          .send({ from: acct })
          .once('receipt', receipt => {
            toast.success("Pacmaned Succceed, Sweet!")
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
            toast.error("Pacmaned Failed, need 1 ZONU")
            console.log(error)
            // this.setState({ txpend: false });
          })
      })
      .catch(error => {
        // Transaction rejected or failed
        document.getElementById('ice' + key).classList.remove('fa-pulse')
        toast.error("Pacmaned Failed, need 1 ZONU")
        console.log(error)
        // this.setState({ txpend: false });
      })
  }

  async loadMantleData() {
    const web3 = window.web3

    const web3t = new Web3('https://rpc.testnet.mantle.xyz')


    // Load account
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

    // console.log(web3)

    const networkId = 5001
    const networkData = ZonuletNFT.networks[networkId]

    const abi = ZonuletNFT.abi
    const address = networkData.address

    if (web3 !== undefined) {
      const contract = new web3.eth.Contract(abi, address)
      // console.log(contract)
      this.setState({ contract })
    }

    const abiaa = ZonuletNFT.abi
    const addressaa = networkData.address
    const maincontract = new web3t.eth.Contract(abiaa, addressaa)
    // console.log(maincontract)
    this.setState({ maincontract })

    const sale_networkData = ZonuletNFTSale.networks[networkId]
    const sale_abi = ZonuletNFTSale.abi
    const sale_address = sale_networkData.address
    if (web3 !== undefined) {
      const sale_contract = new web3.eth.Contract(sale_abi, sale_address)
      this.setState({ sale_contract })
    }

    const sale_networkData2 = ZonuletNFTSale.networks[networkId]
    const sale_abi2 = ZonuletNFTSale.abi
    const sale_address2 = sale_networkData2.address
    const sale_contract2 = new web3t.eth.Contract(sale_abi2, sale_address2)
    this.setState({ sale_contract2 })

    // 
    const abib = ZoNulet.abi
    const addressb = '0x9C3a2429A288dBEA75C819Fd18C0b35a0C3E1361'
    if (web3 !== undefined) {
      const token_contract = new web3.eth.Contract(abib, addressb)
      this.setState({ token_contract })
    }

    const newabi = ZonuletAvatars.abi
    const addressa = '0xEd1A69efced001468a9F7c469fe1F8640e7583C4' //ZonuletAvatars
    const contractav = new web3t.eth.Contract(newabi, addressa)
    // console.log(contract)
    this.setState({ contractav })

    const abiv = ZonuletVerified.abi
    const addv = '0xB8D6deA2b38ED7E8194C50ad7Ae163B36ff2b03a' //ZonuletVerified
    const contractv = new web3t.eth.Contract(abiv, addv)
    // console.log(contract)
    this.setState({ contractv })


    const abilike = ZonuletNFTLikes.abi
    const contractlike = new web3t.eth.Contract(abilike, '0x93A54F1f67428bfF04394551BfeC98D28bcb0d8b')

    this.setState({ contractlike })

    const abiblack = [{"stateMutability":"nonpayable","type":"constructor","inputs":[]},{"type":"event","name":"SetBlackListedAddress","inputs":[{"internalType":"address","indexed":true,"name":"hashAddress","type":"address"},{"name":"blacklisted","type":"bool","indexed":false,"internalType":"bool"}],"anonymous":false},{"inputs":[{"name":"nftID","indexed":true,"type":"uint256","internalType":"uint256"},{"name":"blacklisted","type":"bool","indexed":false,"internalType":"bool"}],"name":"SetBlackListedNFT","anonymous":false,"type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"idupdates","type":"function","outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"inputs":[],"name":"owner","stateMutability":"view","type":"function","outputs":[{"internalType":"address","type":"address","name":""}]},{"type":"function","outputs":[{"type":"address","name":"","internalType":"address"}],"stateMutability":"view","name":"updates","inputs":[{"type":"uint256","internalType":"uint256","name":""}]},{"outputs":[],"stateMutability":"nonpayable","inputs":[{"internalType":"address","name":"addy","type":"address"},{"internalType":"bool","name":"blacklisted","type":"bool"}],"type":"function","name":"setBlackListedAddress"},{"inputs":[{"internalType":"uint256","name":"nftID","type":"uint256"},{"internalType":"bool","name":"blacklisted","type":"bool"}],"name":"setBlackListedNFT","outputs":[],"type":"function","stateMutability":"nonpayable"},{"outputs":[{"type":"bool","internalType":"bool","name":""}],"stateMutability":"view","name":"getBlackListedAddress","inputs":[{"name":"blAddress","internalType":"address","type":"address"}],"type":"function"},{"type":"function","name":"getBlackListedNFT","inputs":[{"name":"nftID","type":"uint256","internalType":"uint256"}],"stateMutability":"view","outputs":[{"internalType":"bool","type":"bool","name":""}]},{"stateMutability":"view","name":"AddyCount","type":"function","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"inputs":[]},{"outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"type":"function","inputs":[],"name":"IDCount","stateMutability":"view"}]      

    const contractblack = new web3t.eth.Contract(abiblack, '0x0739948117Ee512eF799132c611c28B201B87c1b')

    this.setState({ contractblack })

    const zonuletZDEXabi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"zonuAmount","type":"uint256"}],"name":"getEstimatedMANTLEforZONU","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"mantleAmount","type":"uint256"}],"name":"getEstimatedZONUforMANTLE","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"uniswapRouter","outputs":[{"internalType":"contract IUniswapV2Router02","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"zonuAmount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"zonulet","outputs":[],"stateMutability":"payable","type":"function"},{"stateMutability":"payable","type":"receive"}];    


    if (web3 !== undefined) {
      const contractzonulet = new web3.eth.Contract(zonuletZDEXabi, '0x527c79B07993067390780514cBC6c41E041E3e3e') 
      this.setState({ contractzonulet })
    }


    // const nft_id_path = window.location.hash.split('/')
    const nft_id_path = window.location.href.split('/')
    const key = nft_id_path[nft_id_path.length - 1]

    const totalSupply = await maincontract.methods.totalSupply().call()
    // console.log(totalSupply)
    this.setState({ totalSupply })

    // Load Owner
    const owner = await maincontract.methods.ownerOf(key).call()

    this.setState({ owner })

    // Load NFTs Data

    const metadata = await maincontract.methods.imageData(key).call()
    console.log(metadata)

    this.setState({
      images: [...this.state.images, metadata.name],
      imageData_name: [...this.state.imageData_name, metadata.name],
      imageData_ipfsData: [...this.state.imageData_ipfsData, metadata.ipfsData],
      imageData_category: [...this.state.imageData_category, metadata.category],
      imageData_price: [...this.state.imageData_price, metadata.price],
      imageData_des: [...this.state.imageData_des, metadata.description],
      imageData_url: [...this.state.imageData_url, metadata.url]
    })

    // console.log(key)
    if (web3 !== undefined) {
      const slippage = Number(metadata.price * 0.25 ) + Number(metadata.price) 
      console.log("slip-page-nft-detail", slippage)
      const est = await this.state.contractzonulet.methods.getEstimatedMANTLEforZONU(parseInt(web3.utils.toWei(slippage.toString()).toString() / 1e18)).call()
      const estone = est[0] 
      console.log("estone", est[0])
      this.setState({ estone })
    } else {
      // console.log('No web3')
    }

    this.setState({ imageData_name: metadata.name })
    this.setState({ imageData_ipfsData: metadata.ipfsData })
    this.setState({ imageData_category: metadata.category })
    this.setState({ imageData_price: metadata.price })
    if (web3 !== undefined) {
      this.setState({ imageData_slippage: this.state.estone })
    }

    this.setState({ imageData_des: metadata.description })
    this.setState({ imageData_url: metadata.url })
    this.setState({ imageData_mimeType: metadata.mimeType })
    var approved = await maincontract.methods.isApprovedOrOwner('0xA7eEe2528D0858988950664aFC71b4B0Cdaf074d', key).call() //ZonuletNFTSale
    this.setState({ approved })
    this.setState({ ready: true })

    this.setState({ loaded: true })
    const likecount = await contractlike.methods.nftLikes(key).call()
    const pacmancount = await contractlike.methods.nftPacmans(key).call()
    this.setState({ likecount: likecount.likes })
    this.setState({ pacmancount: pacmancount.pacmans })

    const blacklisted = await contractblack.methods.getBlackListedNFT(key).call()
    this.setState({ blacklisted })

    const token_ID = key

    // console.log(sale_contract)
    const transactions = await sale_contract2.getPastEvents('BoughtNFT', {
      fromBlock: 462592,
      toBlock: 'latest',
    })

    for (var i = 0; i < transactions.length; i++) {
      this.setState({
        transactions: [...this.state.transactions, transactions[i].returnValues],
      })
    }

    this.setState({ transactionl: 0 })

    for (i = 0; i < this.state.transactions.length; i++) {
      if (token_ID === this.state.transactions[i]._tokenId) {
        this.setState({ transactionl: 1 })
      }
    }

    const minted = await maincontract.getPastEvents('Transfer', {
      fromBlock: 462592,
      toBlock: 'latest',
    })



    for (i = 0; i < minted.length; i++) {
      this.setState({ minted: [...this.state.minted, minted[i].returnValues] })
    }

    // console.log(this.state.minted)

    for (i = 0; i < this.state.minted.length; i++) {
      // console.log(this.state.minted[i])
      if (
        token_ID === this.state.minted[i].tokenId &&
        this.state.minted[i].from === '0x0000000000000000000000000000000000000000'
      ) {
        console.log(this.state.minted[i].tokenId)
        console.log(this.state.minted[i])
        console.log("\x1b[30m\x1b[42m%s", "FETCH IPFS Data and Mantle Blockchain Succeed");
        // console.log(c` PLAY WITH IT ${'NOW!!'}.underline `.white.redBG.bold.style('font-size: 24px;'));

        this.setState({ minter: this.state.minted[i].to })
      } else {
        // Nothing atm
      }
    }

    const getIPFS = await contractav.methods.getIPFSHash(this.state.owner).call()
    // console.log(getIPFS)
    const getMIME = await contractav.methods.getMIMEType(this.state.owner).call()
    // console.log(getMIME)
    const getName = await contractav.methods.getName(this.state.owner).call()
    this.setState({ ipfs: getIPFS })
    this.setState({ mim: getMIME })
    this.setState({ name: getName })

    const getIPFSm = await contractav.methods.getIPFSHash(this.state.minter).call()
    // console.log(getIPFSm)
    const getMIMEm = await contractav.methods.getMIMEType(this.state.minter).call()
    // console.log(getMIMEm)
    const getNamem = await contractav.methods.getName(this.state.minter).call()
    // console.log(getNamem)
    this.setState({ ipfsmint: getIPFSm })
    this.setState({ mimmint: getMIMEm })
    this.setState({ namemint: getNamem })

    const getIPFSb = await contractav.methods.getIPFSHash(this.state.minter).call()
    // console.log(getIPFSb)
    const getMIMEb = await contractav.methods.getMIMEType(this.state.minter).call()
    // console.log(getMIMEb)
    this.setState({ ipfsb: getIPFSb })
    this.setState({ mimb: getMIMEb })

    const getOwnerVerified = await contractv.methods.getVerified(this.state.owner).call()
    const getMintVerified = await contractv.methods.getVerified(this.state.minter).call()

    this.setState({ owner_verified: getOwnerVerified })
    this.setState({ mint_verified: getMintVerified })
    this.setState({ readyowner: true })
    this.setState({ readyminter: true })
    this.setState({ ready: true })

    window.prerenderReady = true
  }

  buyZonu = key => {
    const web3 = window.web3
    this.setState({ txpend: true })
    this.setState({ txs: 2 })

    this.state.token_contract.methods
      .approve('0xA7eEe2528D0858988950664aFC71b4B0Cdaf074d', web3.utils.toWei(this.state.imageData_price, 'ether'))
      .send({ from: this.state.account })
      .once('receipt', receipt => {
        this.setState({ txpend: true })
        this.setState({ txs: 1 })

        this.state.sale_contract.methods
          .BuyNFT(this.state.owner, key, this.state.imageData_price)
          .send({ from: this.state.account })
          .once('receipt', receipt => {
            // console.log('NFT Bought!')
            toast.success("Bought NFT Succceed, Sweet!")
            document.getElementById('buyanNFT').innerHTML =
              "<span style='color: #00ff5a !important;font-weight:bold;'>NFT Purchased, Go to your collection!</span>"
            this.setState({ txpend: false })
            this.setState({ txs: 0 })
          })
          .catch(error => {
            // Transaction rejected or failed
            toast.error("Transaction Failed on Second Tx!")
            this.setState({ txpend: false })
          })
      })
      .catch(error => {
        toast.error("Transaction Failed!")
        this.setState({ txpend: false })
      })
  }

  buyZonuin = key => {
    const web3 = window.web3
    this.setState({ txpend: true })
    this.setState({ txs: 4 })


    const mantleabi = [{"type":"event","inputs":[{"name":"src","type":"address","internalType":"address","indexed":true},{"type":"address","indexed":true,"name":"guy","internalType":"address"},{"internalType":"uint256","type":"uint256","indexed":false,"name":"wad"}],"anonymous":false,"name":"Approval"},{"anonymous":false,"name":"Deposit","inputs":[{"internalType":"address","name":"dst","type":"address","indexed":true},{"indexed":false,"internalType":"uint256","type":"uint256","name":"wad"}],"type":"event"},{"type":"event","anonymous":false,"inputs":[{"indexed":true,"type":"address","internalType":"address","name":"src"},{"indexed":true,"name":"dst","internalType":"address","type":"address"},{"indexed":false,"name":"wad","type":"uint256","internalType":"uint256"}],"name":"Transfer"},{"name":"Withdrawal","type":"event","inputs":[{"name":"src","indexed":true,"type":"address","internalType":"address"},{"type":"uint256","indexed":false,"name":"wad","internalType":"uint256"}],"anonymous":false},{"name":"allowance","type":"function","stateMutability":"view","outputs":[{"internalType":"uint256","type":"uint256","name":""}],"inputs":[{"name":"","type":"address","internalType":"address"},{"type":"address","internalType":"address","name":""}]},{"type":"function","inputs":[{"name":"","type":"address","internalType":"address"}],"name":"balanceOf","stateMutability":"view","outputs":[{"name":"","type":"uint256","internalType":"uint256"}]},{"inputs":[],"stateMutability":"view","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"name":"decimals","type":"function"},{"outputs":[{"internalType":"string","name":"","type":"string"}],"name":"name","type":"function","stateMutability":"view","inputs":[]},{"name":"symbol","type":"function","inputs":[],"stateMutability":"view","outputs":[{"type":"string","internalType":"string","name":""}]},{"type":"receive","stateMutability":"payable"},{"stateMutability":"payable","name":"deposit","type":"function","inputs":[],"outputs":[]},{"name":"withdraw","type":"function","outputs":[],"inputs":[{"type":"uint256","name":"wad","internalType":"uint256"}],"stateMutability":"nonpayable"},{"name":"totalSupply","inputs":[],"stateMutability":"view","outputs":[{"name":"","internalType":"uint256","type":"uint256"}],"type":"function"},{"inputs":[{"type":"address","internalType":"address","name":"guy"},{"type":"uint256","internalType":"uint256","name":"wad"}],"type":"function","stateMutability":"nonpayable","name":"approve","outputs":[{"type":"bool","internalType":"bool","name":""}]},{"name":"transfer","stateMutability":"nonpayable","type":"function","inputs":[{"name":"dst","internalType":"address","type":"address"},{"internalType":"uint256","type":"uint256","name":"wad"}],"outputs":[{"name":"","internalType":"bool","type":"bool"}]},{"name":"transferFrom","type":"function","inputs":[{"internalType":"address","name":"src","type":"address"},{"name":"dst","internalType":"address","type":"address"},{"name":"wad","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"nonpayable"}]


    const zonuletZDEXabi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"zonuAmount","type":"uint256"}],"name":"getEstimatedMANTLEforZONU","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"mantleAmount","type":"uint256"}],"name":"getEstimatedZONUforMANTLE","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"uniswapRouter","outputs":[{"internalType":"contract IUniswapV2Router02","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"zonuAmount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"zonulet","outputs":[],"stateMutability":"payable","type":"function"},{"stateMutability":"payable","type":"receive"}];    


    const contractzonulet = new web3.eth.Contract(zonuletZDEXabi, '0x527c79B07993067390780514cBC6c41E041E3e3e') 

    const contractone = new web3.eth.Contract(mantleabi, '0x707f2fE56A440E766bec41aBC9fc8695567D0ceA')

    const slippage = Number(this.state.imageData_price * 0.25) + Number(this.state.imageData_price)

    console.log("slippage", slippage);

    contractzonulet.methods
      .getEstimatedMANTLEforZONU(web3.utils.toWei(slippage.toString(), 'ether'))
      .call()
      .then(receipt => {
        const estone = receipt[0]
        // console.log(estone)

        contractone.methods
          .approve('0x527c79B07993067390780514cBC6c41E041E3e3e', estone)
          .send({ from: this.state.account })
          .once('receipt', receipt => {
            this.setState({ txpend: true })
            this.setState({ txs: 3 })

            // make new deadline one hour from now in epoch unix time
            const deadline = Math.floor(Date.now() / 1000) + 6000
            console.log(deadline)

            contractzonulet.methods
              .zonulet(web3.utils.toWei(slippage.toString(), 'ether'), deadline)
              .send({ from: this.state.account, value: estone })
              .once('receipt', receipt => {
                this.setState({ txpend: true })
                this.setState({ txs: 2 })

                //console.log(receipt);

                toast.success('Zonuined BIT to ZONU successfully!')
                console.log('Zonuined BIT to ZONU successfully!')

                this.state.token_contract.methods
                  .approve(
                    '0xA7eEe2528D0858988950664aFC71b4B0Cdaf074d',
                    web3.utils.toWei(this.state.imageData_price, 'ether'),
                  )
                  .send({ from: this.state.account })
                  .once('receipt', receipt => {
                    this.setState({ txpend: true })
                    this.setState({ txs: 1 })

                    this.state.sale_contract.methods
                      .BuyNFT(this.state.owner, key, this.state.imageData_price)
                      .send({ from: this.state.account })
                      .once('receipt', receipt => {
                        toast.success('NFT Bought done, Sweet!')
                        console.log('NFT Bought!')
                        document.getElementById('buyanNFT').innerHTML =
                          "<span style='color: #00ff5a !important;font-weight:bold;'>NFT Purchased, Go to your collection!</span>"
                        this.setState({ txpend: false })
                        this.setState({ txs: 0 })
                      })
                      .catch(error => {
                        // Transaction rejected or failed
                        toast.error("Purchase Failed, Try Again!")
                        this.setState({ txpend: false })
                      })
                  })
                  .catch(error => {
                    toast.error("Transaction Failed on ZONU Approval!")
                    this.setState({ txpend: false })
                  })
              })
              .catch(error => {
                toast.error("Failed on  Zooining from BIT!")
                this.setState({ txpend: false })
              })
          })
          .catch(error => {
            // Transaction rejected or failed
            toast.error("Transaction Failed on ZONU Approval!")
            this.setState({ txpend: false })
          })
      })
      .catch(error => {
        // console.log(error)
        toast.error("Failed to Get Zonulet Estimate!!")
        this.setState({ txpend: false })
      })
  }

  giftNFT = key => {
    const web3 = window.web3

    this.setState({ txpend: true })
    this.setState({ txs: 2 })

    if (this.state.accttosend) {
      this.state.contract.methods
        .approveNFT('0xA7eEe2528D0858988950664aFC71b4B0Cdaf074d', key)
        .send({ from: this.state.account })
        .once('receipt', receipt => {
          // console.log('nft approved for gifting')
          document.getElementById('approvedsale').innerHTML =
            "<span style='color: #00ff5a !important;font-weight:bold;'>NFT Approved for Gifting</span>"
          this.setState({ txpend: true })
          this.setState({ txs: 1 })

          this.state.sale_contract.methods
            .GiftNFT(this.state.owner, key, this.state.accttosend)
            .send({ from: this.state.account })
            .once('receipt', receipt => {
              toast.success("NFT Gifted, Sweet!")
              document.getElementById('giftNFT').innerHTML =
                "<br /><span style='color: #00ff5a !important;font-weight:bold;'>NFT Gifted! You are so sweet!</span>"
              this.setState({ txpend: false })
              this.setState({ txs: 0 })
            })
            .catch(error => {
              // Transaction rejected or failed
              toast.error("Failed Gifting NFT!")
              this.setState({ txpend: false })
              this.setState({ txs: 0 })
            })
        })
        .catch(error => {
          toast.error("Transaction Failed on Spproval!")
          this.setState({ txpend: false })
          this.setState({ txs: 0 })
        })
    } else {
      toast.error("Please Enter in a One Address to Send to!")
      this.setState({ txpend: false })
    }
  }

  approveNFT = key => {
    this.setState({ txpend: true })
    this.setState({ txs: 2 })

    if (this.state.new_price == null) {
      this.setState({ new_price: this.state.imageData_price })

      this.state.new_price = this.state.imageData_price

      this.state.contract.methods
        .updatePrice(key, this.state.new_price)
        .send({ from: this.state.account })
        .once('receipt', receipt => {
          // console.log('price updated')
          // toast.success("price updated successfully!")
          this.setState({ txpend: true })
          this.setState({ txs: 1 })

          this.state.contract.methods
            .approveNFT('0xA7eEe2528D0858988950664aFC71b4B0Cdaf074d', key)
            .send({ from: this.state.account })
            .once('receipt', receipt => {
              // console.log('nft approved for sale')
              toast.success("nft approved and updated for sale!")
              document.getElementById('approvedsale').innerHTML =
                "<span style='color: #00ff5a !important;font-weight:bold;'>NFT Approved and Listed for sale!</span>"
              this.setState({ txpend: false })
              this.setState({ txs: 0 })
            })
            .catch(error => {
              // Transaction rejected or failed
              toast.error("Transaction failed on second tx!")
              this.setState({ txpend: false })
            })
        })
        .catch(error => {
          // Transaction rejected or failed
          toast.error("Transaction failed!")
          this.setState({ txpend: false })
        })
    } else {
      console.log(this.state.new_price)

      this.state.contract.methods
        .updatePrice(key, this.state.new_price)
        .send({ from: this.state.account })
        .once('receipt', receipt => {
          // console.log('price updated')
          // toast.success("price updated, Sweet!")
          this.setState({ txpend: true })
          this.setState({ txs: 1 })

          this.state.contract.methods
            .approveNFT('0xA7eEe2528D0858988950664aFC71b4B0Cdaf074d', key)
            .send({ from: this.state.account })
            .once('receipt', receipt => {
              console.log('nft approved for sale')
              toast.success("nft approved and updated for sale!")
              document.getElementById('approvedsale').innerHTML =
                "<span style='color: #00ff5a !important;font-weight:bold;'>NFT Approved and Updated for sale!</span>"
              this.setState({ txpend: false })
              this.setState({ txs: 0 })
            })
            .catch(error => {
              // Transaction rejected or failed

              toast.error("Transaction failed on second tx!")
              this.setState({ txpend: false })
            })
        })
        .catch(error => {
          // Transaction rejected or failed
          toast.error("Transaction failed!")
          this.setState({ txpend: false })
        })
    }
  }
  

  render() {
    const nft_id_path = window.location.href.split('/')
    // const nft_id_path = window.location.hash.split('/')
    const key = nft_id_path[nft_id_path.length - 1]

    return (
      <div>
        <MetaTags>
          <title>
            ZONU NFT #{key} - {this.state.imageData_name}
          </title>
          <meta name="description" content={this.state.imageData_des} />
          <meta property="og:title" content={'ZONU NFT #' + key + ' - ' + this.state.imageData_name} />
          <meta property="og:description" content={'Zonulet NFT #' + key + ' - ' + this.state.imageData_des + ' '} />
          <meta
            property="og:image"
            content={'https://zonulet.infura-ipfs.io/ipfs/' + this.state.imageData_ipfsData}
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@zonulet_io" />
          <meta name="twitter:title" content={'ZONU NFT #' + key + ' - ' + this.state.imageData_name} />
          <meta name="twitter:description" content={this.state.imageData_des} />
          <meta
            name="twitter:image"
            content={'https://zonulet.infura-ipfs.io/ipfs/' + this.state.imageData_ipfsData}
          />
        </MetaTags>
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
          <div className="head-title col-auto mx-4">
            <h4 className="mb-0 font-weight-normal">NFT #{key} Details</h4>
          </div>
          <div className="nft-detail-adj">
            <div className="">
              <div className="row">
                <div className="col-md-6">
                  <ReactPlaceholder
                    type="rect"
                    ready={this.state.ready}
                    showLoadingAnimation={true}
                    color="#333"
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '15px',
                    }}
                  >
                    <h1 className="text-light" align="center">
                      <strong>{this.state.imageData_name}</strong>
                    </h1>
                    <p
                      className="text-light"
                      align="center"
                      style={{
                        padding: '20px',
                        borderRadius: '5px',
                        backgroundColor: '#1b223d',
                        boxShadow: '#0b0d1ce0 -4px -3px 26px 0px',
                        overflow:"overlay"
                      }}
                    >
                      {this.state.imageData_des}
                    </p>
                    <div className="max-400" style={{ width: '98%', margin: '0 auto'}} align="center">
                      {this.state.imageData_mimeType === 'image/jpeg' ||
                      this.state.imageData_mimeType === 'image/png' ||
                      this.state.imageData_mimeType === 'image/gif' ? (
                        <Img
                          alt="NFT"
                          className="homeimage shadow-lg rounded"
                          src={`${process.env.REACT_APP_INFURA_GATEAWAY}` + this.state.imageData_ipfsData}
                          cache
                          style={{ background: '#1b223d', maxWidth: '800px'}}
                        />
                      ) : this.state.imageData_mimeType === 'video/mp4' ? (
                        <video
                          alt="NFT"
                          className="homeimage shadow-lg rounded"
                          autoPlay={true}
                          muted={true}
                          loop={true}
                          controls
                          playsInline
                          src={`${process.env.REACT_APP_INFURA_GATEAWAY}` + this.state.imageData_ipfsData}
                          type="video/mp4"
                          style={{ background: '#21263e', maxWidth: '900px' }}
                        >
                          <source
                            src={`${process.env.REACT_APP_INFURA_GATEAWAY}` + this.state.imageData_ipfsData}
                            type="video/mp4"
                            style={{ background: '#21263e', maxWidth: '900px' }}
                          ></source>
                        </video>
                      ) : this.state.imageData_mimeType === 'model/gltf-binary' ? (
                        <model-viewer
                          src={`${process.env.REACT_APP_INFURA_GATEAWAY}` + this.state.imageData_ipfsData}
                          alt={this.state.imageData_name}
                          ar
                          ar-modes="webxr scene-viewer quick-look"
                          environment-image="neutral"
                          auto-rotate
                          camera-controls
                          style={{
                            width: '100%',
                            height: '500px',
                            maxWidth: '800px',
                          }}
                        ></model-viewer>
                      ) : null}
                    </div>

                    <br />
                  </ReactPlaceholder>
                </div>
                <div className="col-md-6">
                  <ReactPlaceholder
                    type="rect"
                    ready={this.state.loaded}
                    showLoadingAnimation={true}
                    color="#333"
                    style={{
                      width: '60%',
                      height: '150px',
                      margin: '15px auto',
                      borderRadius: '15px',
                    }}
                  >
                    <div className="d-flex justify-content-center align-items-center text-light" id="giftNFT">
                      <div className="mx-2">
                        {this.state.owner === this.state.account && this.state.loaded === true ? (
                          <form
                            onSubmit={event => {
                              event.preventDefault()
                              this.giftNFT(key)
                            }}
                          >
                            <br />
                            <div className="d-flex">
                              <input
                                type="text"
                                className="form-control mx-1"
                                placeholder="Mantle Address 0x..."
                                onChange={event =>
                                  this.setState({
                                    accttosend: event.target.value,
                                  })
                                }
                              />
                              <input
                                type="submit"
                                className="btn btn-block btn-primary rounded-0 mx-1 buybtn"
                                value="Gift This NFT!"
                                disabled={!this.state.blacklisted ? false : true}
                              />
                            </div>
                          </form>
                        ) : null}
                      </div>
                    </div>
                    <br />
                    {this.state.owner === this.state.account && this.state.loaded === true ? (
                      <div align="center" style={{top: '20px', position: 'relative'}}>
                      <span  className='txtWhite'>PRICE IN ZONU</span>
                      <div><i className="fa fa-chevron-down" style={{ fontSize: '12px', color:'#20ebf0'}}/></div>
                      </div>
                    ) : null}
                    <br />
                    <div className="d-flex justify-content-center align-items-center my-1 text-light" id="approvedsale">
                      {this.state.owner === this.state.account && this.state.loaded === true ? (
                        <form
                          onSubmit={event => {
                            event.preventDefault()
                            this.approveNFT(key)
                          }}
                        >
                          <div className="d-flex">
                            {/* <div className="w-75 my-2 text-secondary">Price in ZONU</div> */}
                            <input
                              type="text"
                              className="form-control mx-1"
                              placeholder="New Price in ZONU"
                              defaultValue={this.state.imageData_price}
                              onChange={event => this.setState({ new_price: event.target.value })}
                            />
                            <input
                              type="submit"
                              className="btn btn-block btn-primary rounded-0 mx-1 buybtn"
                              value={!this.state.approved ? 'Approve & List for Sale' : 'Update & Relist'}
                              disabled={!this.state.blacklisted ? false : true}
                            />
                          </div>
                        </form>
                      ) : null}
                    </div>

                    <div className="d-flex justify-content-center align-items-center text-light" id="buyanNFT">
                    <div className="mx-2">
                        {this.state.approved &&
                        this.state.owner !== this.state.account &&
                        this.state.loaded === true ? (
                          !this.state.blacklisted ? (
                            <form
                              onSubmit={event => {
                                event.preventDefault()
                                this.buyZonu(key)
                              }}
                            >
                              <button
                                type="submit"
                                className="btn btn-block btn-primary rounded-15 text-light p-3 buybtn"
                                disabled={
                                  typeof this.state.account !== 'undefined' &&
                                  !this.state.blacklisted &&
                                  this.state.connected === true
                                    ? false
                                    : true
                                }
                              >
                                <img alt="main" height="24px" src="/zonulet_stndr_1.svg" />
                                <br />
                                <strong>BUY WITH ZONU!</strong>
                                <br />
                                <span>
                                {this.state.connected === true ? (
                                  <>
                                  {this.state.imageData_price} &nbsp; <small className='smallGreen'>ZONU</small>&nbsp;
                                </>
                                ) : (
                                  <div>Connect Wallet</div>
                                )}
                                </span>
                              </button>
                            </form>
                          ) : (
                            <h2 className="text-danger">BLACKLISTED NFT</h2>
                          )
                        ) : null}
                      </div>                   
                      <div className="mx-2">
                        {this.state.approved &&
                        this.state.owner !== this.state.account &&
                        this.state.loaded === true ? (
                          !this.state.blacklisted ? (
                            <form
                              onSubmit={event => {
                                event.preventDefault()
                                this.buyZonuin(key)
                              }}
                            >
                              <button
                                type="submit"
                                className="btn btn-block btn-primary rounded-15 text-light p-3 buybtn"
                                disabled={
                                  typeof this.state.account !== 'undefined' &&
                                  !this.state.blacklisted &&
                                  this.state.connected === true
                                    ? false
                                    : true
                                }
                              >
                                <img alt="main" height="24px" src="/new_Base.svg" />
                                <br />
                                <strong>BUY WITH MANTLE!</strong>
                                <br />
                                <span>
                                {this.state.connected === true ? (
                                  <>
                                  {this.state.imageData_slippage} &nbsp;<small className='smallGreen'>BIT</small>
                                  </>
                                ) : (
                                  <div>Connect Wallet</div>
                                )}
                                </span>
                              </button>
                            </form>
                          ) : null
                        ) : null}
                      </div>
                    </div>

                    <div className="d-flex justify-content-center align-items-center my-1">
                      {!this.state.approved && this.state.owner !== this.state.account && this.state.loaded === true ? (
                        <div className="text-danger">{'This NFT is not approved for sale by the owner'}</div>
                      ) : null}
                    </div>
                    <br />
                    <div className="row">
                      <div className="col-md-6" align="center">
                        <div
                          style={{
                            color: 'white',
                            marginBottom: '5px',
                            fontWeight: 'bold',
                          }}
                        >
                          Owner
                        </div>
                        <ReactPlaceholder
                          type="rect"
                          ready={this.state.readyowner}
                          showLoadingAnimation={true}
                          color="#333"
                          style={{
                            width: '100px',
                            height: '100px',
                            marginTop: '10px',
                            borderRadius: '15px',
                          }}
                        >
                          {this.state.owner !== null ? (
                            this.state.ipfs !== '' &&
                            (this.state.mim === 'image/jpeg' ||
                              this.state.mim === 'image/png' ||
                              this.state.mim === 'image/gif') ? (
                              <a href={'/collection/' + this.state.owner}>
                                <div
                                  style={{
                                    position: 'relative',
                                    width: '75px',
                                  }}
                                >
                                  <Img
                                    cache
                                    src={`${process.env.REACT_APP_INFURA_GATEAWAY}` + this.state.ipfs}
                                    alt=""
                                    border="0"
                                    height="75px"
                                    width="75px"
                                    style={{
                                      borderRadius: '50%',
                                      marginBottom: '5px',
                                    }}
                                  />
                                  {this.state.owner_verified === true ? (
                                    <div
                                      style={{
                                        position: 'absolute',
                                        bottom: '5px',
                                        right: '5px',
                                      }}
                                    >
                                      <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 12 12"
                                        fill="#feda03"
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
                              </a>
                            ) : (
                              <a href={'/collection/' + this.state.owner}>
                                <div
                                  style={{
                                    position: 'relative',
                                    width: '75px',
                                  }}
                                >
                                  <Jazzicon diameter={75} seed={jsNumberForAddress(this.state.owner)} />
                                  {this.state.owner_verified === true ? (
                                    <div
                                      style={{
                                        position: 'absolute',
                                        bottom: '5px',
                                        right: '5px',
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
                              </a>
                            )
                          ) : null}

                          <p style={{ color: 'white' }}>
                            {this.state.owner !== null
                              ? this.state.name === ''
                                ? this.state.owner.substring(0, 8) + '...'
                                : this.state.name
                              : null}{' '}
                            <a href={'/collection/' + this.state.owner}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="#0dcaf0"
                                className="bi bi-arrow-up-right-square-fill"
                                viewBox="0 0 16 16"
                              >
                                <path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12zM5.904 10.803 10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707z" />
                              </svg>
                            </a>
                          </p>
                        </ReactPlaceholder>
                        <br />
                      </div>
                      <div className="col-md-6" align="center">
                        <div
                          style={{
                            color: 'white',
                            marginBottom: '5px',
                            fontWeight: 'bold',
                          }}
                        >
                          Creator
                        </div>
                        <ReactPlaceholder
                          type="rect"
                          ready={this.state.readyminter}
                          showLoadingAnimation={true}
                          color="#333"
                          style={{
                            width: '100px',
                            height: '100px',
                            marginTop: '10px',
                            borderRadius: '15px',
                          }}
                        >
                          {this.state.minter !== '' ? (
                            this.state.ipfsmint !== '' &&
                            (this.state.mimmint === 'image/jpeg' ||
                              this.state.mimmint === 'image/png' ||
                              this.state.mimmint === 'image/gif') ? (
                              <a href={'/collection/' + this.state.minter}>
                                <div
                                  style={{
                                    position: 'relative',
                                    width: '75px',
                                  }}
                                >
                                  <Img
                                    cache
                                    src={`${process.env.REACT_APP_INFURA_GATEAWAY}` + this.state.ipfsmint}
                                    alt=""
                                    border="0"
                                    height="75px"
                                    width="75px"
                                    style={{
                                      borderRadius: '50%',
                                      marginBottom: '5px',
                                    }}
                                  />
                                  {this.state.mint_verified === true ? (
                                    <div
                                      style={{
                                        position: 'absolute',
                                        bottom: '5px',
                                        right: '5px',
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
                                          fill="#0dcaf0"
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
                              </a>
                            ) : (
                              <a href={'/collection/' + this.state.minter}>
                                <div
                                  style={{
                                    position: 'relative',
                                    width: '75px',
                                  }}
                                >
                                  <Jazzicon diameter={75} seed={jsNumberForAddress(this.state.minter)} />
                                  {this.state.mint_verified === true ? (
                                    <div
                                      style={{
                                        position: 'absolute',
                                        bottom: '5px',
                                        right: '5px',
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
                              </a>
                            )
                          ) : null}

                          <p style={{ color: 'white' }}>
                            {this.state.minter !== ''
                              ? this.state.namemint === ''
                                ? this.state.minter.substring(0, 8) + '...'
                                : this.state.namemint
                              : null}{' '}
                            <a href={'/collection/' + this.state.minter}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="#0dcaf0"
                                className="bi bi-arrow-up-right-square-fill"
                                viewBox="0 0 16 16"
                              >
                                <path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12zM5.904 10.803 10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707z" />
                              </svg>
                            </a>
                          </p>
                        </ReactPlaceholder>
                        <br />
                      </div>
                    </div>
                  </ReactPlaceholder>
                  <ReactPlaceholder
                    type="rect"
                    ready={this.state.likecount}
                    showLoadingAnimation={true}
                    color="#333"
                    style={{
                      width: '100%',
                      height: '75px',
                      marginTop: '10px',
                      borderRadius: '15px',
                    }}
                  >
                    <div className="row" align="center">
                      <div className="col-6" align="center">
                        <a href="" onClick={e => this.like(e, this.state.owner, key)}>
                          <i className="fas fa-thumbs-up fa-2x like" id={'like' + key}></i>
                        </a>
                        <br />
                        <span id={'count' + key} style={{ fontSize: '19px', color: 'white' }}>
                          {this.state.likecount}
                        </span>
                      </div>
                      <div className="col-6" align="center">
                        <a href="" onClick={e => this.ice(e, this.state.minter, key)}>
                          <i className="fab fa-codiepie fa-2x ice" id={'ice' + key}></i>
                        </a>
                        <br />
                        <span id={'counti' + key} style={{ fontSize: '19px', color: 'white' }}>
                          {this.state.pacmancount}
                        </span>
                      </div>
                    </div>
                  </ReactPlaceholder>
                  <br />
                  <div className="table-adj">
                    <div className="table-responsive">
                      <ReactPlaceholder
                        type="rect"
                        ready={this.state.ready}
                        showLoadingAnimation={true}
                        color="#333"
                        style={{
                          width: '100%',
                          height: '400px',
                          borderRadius: '15px',
                        }}
                        align="center"
                      >
                        <table className="table table-sm table-borderless bNone">
                          <tbody className="tableNoborder">
                            <tr>
                              <th className="pl-0 w-40" scope="row">
                                <strong>IPFS Hash</strong>
                              </th>

                              <td style={{ fontSize: '14px' }}>
                                <ReactPlaceholder
                                  type="rect"
                                  ready={this.state.imageData_ipfsData}
                                  showLoadingAnimation={true}
                                  color="#333"
                                  style={{
                                    width: '150px',
                                    height: '24px',
                                    marginTop: '10px',
                                    borderRadius: '15px',
                                  }}
                                >
                                  {' '}
                                  {this.state.imageData_ipfsData}{' '}
                                  <a href={'https://zonulet.infura-ipfs.io/ipfs/' + this.state.imageData_ipfsData} target='_blank'>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      fill="#0dcaf0"
                                      className="bi bi-arrow-up-right-square-fill"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12zM5.904 10.803 10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707z" />
                                    </svg>
                                  </a>
                                </ReactPlaceholder>
                              </td>
                            </tr>
                            <tr>
                              <th className="pl-0 w-60" scope="row">
                                <strong>Category</strong>
                              </th>
                              <td>{this.state.imageData_category}</td>
                            </tr>
                            <tr>
                              <th className="pl-0 w-60" scope="row">
                                <strong>Type</strong>
                              </th>
                              <td>{this.state.imageData_mimeType}</td>
                            </tr>
                            <tr>
                              <th className="pl-0 w-60" scope="row">
                                <strong>Status</strong>
                              </th>
                              <td>
                                {this.state.blacklisted ? 'Blacklisted' : 'Listed'}
                                &nbsp;&nbsp;&nbsp;
                              </td>
                            </tr>
                            <tr>
                              <th className="pl-0 w-60" scope="row">
                                <strong>Website</strong>
                              </th>
                              <td>{this.state.imageData_url}</td>
                            </tr>
                            <tr>
                              <th className="pl-0 w-60" scope="row">
                                <strong>Last Price</strong>
                              </th>
                              <td>
                              <span className="smallYellow">{this.state.imageData_price}</span> &nbsp;
                                <small className='smallGreen'>ZONU</small>&nbsp;
                              </td>
                            </tr>
                            <tr>
                              <th className="pl-0 w-60" scope="row">
                                <strong>For Sale</strong>
                              </th>
                              <td>
                                <ReactPlaceholder
                                  type="rect"
                                  ready={this.state.loaded}
                                  showLoadingAnimation={true}
                                  color="#333"
                                  style={{
                                    width: '150px',
                                    height: '24px',
                                    marginTop: '10px',
                                    borderRadius: '15px',
                                  }}
                                >
                                  {this.state.loaded === true
                                    ? this.state.approved
                                    ? <span className='smallGreen'>Available for Purchase</span>
                                    : <span className='cRed'>Not For Sale</span>
                                    : null}
                                </ReactPlaceholder>
                              </td>
                            </tr>
                            <tr>
                              <th className="pl-0 w-60" scope="row">
                                <strong>ZONU NFT ID</strong>
                              </th>
                              <td>
                                {key} &nbsp;&nbsp;&nbsp;
                                <div  style={{ position: 'relative', top: '5px', display: 'inline-block' }}>
                                <TwitterTweetButton url={'https://zonulet.io/nft/' + key} user="zonulet_io" align="center" />
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div align="center" className='dataNft'>
                          <div className='dataShareable mr15'>
                          <NavDropdown.Item href={'https://zonulet.infura-ipfs.io/ipfs/' + this.state.imageData_ipfsData} target="_blank"  className="dal">
                            <i className="fa fa-compress-arrows-alt mr12 mt5 cSky"></i>
                              <span>VIEW FULL NFT</span>
                          </NavDropdown.Item>
                          <NavDropdown.Divider />
                          </div>
                          <div className='dataShareable mr15'>
                          <NavDropdown.Item href="https://forms.gle/pQWUmHssUifE3jh56" target="_blank"  className="dal">
                            <i className="fa fa-bug mr12 mt5 cRed"></i>
                              <span>REPORT NFT</span>
                          </NavDropdown.Item>
                          <NavDropdown.Divider />
                          </div>
                        </div>
                      </ReactPlaceholder>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4" align="center">
              {this.state.transactionl > 0 ? (
                <ReactPlaceholder
                  type="rect"
                  ready={this.state.ready}
                  showLoadingAnimation={true}
                  color="#333"
                  style={{
                    width: '100%',
                    height: '200px',
                    borderRadius: '15px',
                  }}
                  align="center"
                >
                  <h4 className="text-secondary">Transactions</h4>
                  <NavDropdown.Divider />
                  <table className="table table-sm table-borderless bTransparent" align="center">
                    <thead align="center">
                      <tr align="center">
                        <th align="center">Buyer</th>
                        <th align="center">Price in ZONU</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.transactions
                        .slice(0)
                        .reverse()
                        .map((transaction, i) => {
                          return transaction._tokenId === key ? (
                            <tr key={i} align="center" className="font12 alCenter">
                              <td align="center" className="font12">
                                {transaction._buyer}{' '}
                                <a href={'https://explorer.testnet.mantle.xyz/address/' + transaction._buyer } target="_blank" rel="noopener noreferrer">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="#0dcaf0"
                                    className="bi bi-arrow-up-right-square-fill"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12zM5.904 10.803 10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707z" />
                                  </svg>
                                </a>
                              </td>
                              <td align="center">{transaction._price}</td>
                            </tr>
                          ) : null
                        })}
                    </tbody>
                  </table>
                </ReactPlaceholder>
              ) : null}
             <NavDropdown.Divider />
            </div>
          </div>
        </LoadingOverlay>
      </div>
    )
  }
  
}
export default Mint
