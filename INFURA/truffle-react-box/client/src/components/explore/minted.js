import React, { Component } from 'react'
import ZonuletNFT from '../../abis/ZonuletNFT.json'
import ZonuletNFTSale from '../../abis/ZonuletNFTSale.json'
import ZonuletAvatars from '../../abis/ZonuletAvatars.json'
import ZonuletVerified from '../../abis/ZonuletVerified.json'
import ZonuletNFTLikes from '../../abis/ZonuletNFTLikes.json'
import Img from 'react-cool-img'
import ReactPlaceholder from 'react-placeholder'
import 'react-placeholder/lib/reactPlaceholder.css'
import LazyLoad from 'react-lazyload'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import ScrollToTop from 'react-scroll-to-top'
import Web3 from 'web3'

class Minted extends Component {
  render() {
    return (
      <div>
        <ScrollToTop smooth/>
        <div className="head-title col-auto mx-4">
          <h4 className="mb-0 font-weight-normal">Recently Minted NFTs</h4>
        </div>
        <div className="container-fluid mb-5 explore-adj">
          <div className="row justify-content-around">
            <p align="center" className="text-secondary">
              This is where you can view recently minted Zonulet NFTs! This displays the last 50 minted Zonulet NFTs!
            </p>
            <ReactPlaceholder
              type="rect"
              ready={this.state.ready}
              showLoadingAnimation={true}
              color="#333"
              style={{ width: '300px', height: '300px', borderRadius: '15px' }}
            >
              {this.state.images.reverse().map((id, key) => {
                return (
                  // (this.state.approved[key] && (this.state.owners[key] !== this.state.account) && this.state.ready === true) ?
                  this.state.ready === true ? (
                    <div key={key} className="col-md-2 card bg-light m-3 p-2">
                      <LazyLoad height={300}>
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
                          <Link
                            to={{
                              pathname: `/nft/${this.state.imageData_id[key]}`,
                            }}
                          >
                            <form onSubmit={event => {}}>
                              <div className="col-auto max-250">
                                <div className="text-secondary idbadge" align="center">
                                  ID #{this.state.imageData_id[key]}
                                </div>
                                {typeof this.state.imageData_ipfsData[key] !== 'undefined' ? (
                                  this.state.imageData_mimeType[key] === 'image/jpeg' ||
                                  this.state.imageData_mimeType[key] === 'image/png' ||
                                  this.state.imageData_mimeType[key] === 'image/gif' ? (
                                    <Img
                                      alt="NFT"
                                      className="token rounded"
                                      src={
                                        'https://zonulet.infura-ipfs.io/ipfs/' + this.state.imageData_ipfsData[key]
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
                                        'https://zonulet.infura-ipfs.io/ipfs/' + this.state.imageData_ipfsData[key]
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
                                  ) : this.state.imageData_mimeType[key] === 'model/gltf-binary' ? (
                                    <model-viewer
                                      src={
                                        'https://zonulet.infura-ipfs.io/ipfs/' + this.state.imageData_ipfsData[key]
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
                              <div className="m-2" align="center">
                                {this.state.imageData_name[key]}
                              </div>
                            </form>
                          </Link>
                        </ReactPlaceholder>
                      </LazyLoad>
                    </div>
                  ) : null
                )
              })}
            </ReactPlaceholder>
          </div>
        </div>
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
      imageData_name: [],
      imageData_ipfsData: [],
      imageData_mimeType: [],
      imageData_category: [],
      imageData_price: [],
      imageData_id: [],
      imageData_receiver: [],
      imageData_buyeripfs: [],
      imageData_buyermim: [],
      imageData_verified: [],
      imageData_owner: [],
      imageData_likecount: [],
      imageData_icecount: [],
      selling_to: '',
      gtransactions: [],
      selling_price: null,
      token_sale_contract: null,
      token_price: 0,
      approved: [],
    }
  }

  async componentWillMount() {
    await this.loadMantleData()
    // await this.loadTokenSaleContract()
  }

  async loadMantleData() {

    const web3 = new Web3('https://rpc.testnet.mantle.xyz')

    const networkId = 5001
    const networkData = ZonuletNFT.networks[networkId]
    if (networkData) {
      const abi = ZonuletNFT.abi
      const address = networkData.address
      const contract = new web3.eth.Contract(abi, address)

      const sale_networkData = ZonuletNFTSale.networks[networkId]
      const sale_abi = ZonuletNFTSale.abi
      const sale_address = sale_networkData.address
      const sale_contract = new web3.eth.Contract(sale_abi, sale_address)
      this.setState({ sale_contract })

      this.setState({ contract })
      const totalSupply = await contract.methods.totalSupply().call()
      // console.log(totalSupply)
      this.setState({ totalSupply })

      const abiblack = [{"stateMutability":"nonpayable","type":"constructor","inputs":[]},{"type":"event","name":"SetBlackListedAddress","inputs":[{"internalType":"address","indexed":true,"name":"hashAddress","type":"address"},{"name":"blacklisted","type":"bool","indexed":false,"internalType":"bool"}],"anonymous":false},{"inputs":[{"name":"nftID","indexed":true,"type":"uint256","internalType":"uint256"},{"name":"blacklisted","type":"bool","indexed":false,"internalType":"bool"}],"name":"SetBlackListedNFT","anonymous":false,"type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"idupdates","type":"function","outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"inputs":[],"name":"owner","stateMutability":"view","type":"function","outputs":[{"internalType":"address","type":"address","name":""}]},{"type":"function","outputs":[{"type":"address","name":"","internalType":"address"}],"stateMutability":"view","name":"updates","inputs":[{"type":"uint256","internalType":"uint256","name":""}]},{"outputs":[],"stateMutability":"nonpayable","inputs":[{"internalType":"address","name":"addy","type":"address"},{"internalType":"bool","name":"blacklisted","type":"bool"}],"type":"function","name":"setBlackListedAddress"},{"inputs":[{"internalType":"uint256","name":"nftID","type":"uint256"},{"internalType":"bool","name":"blacklisted","type":"bool"}],"name":"setBlackListedNFT","outputs":[],"type":"function","stateMutability":"nonpayable"},{"outputs":[{"type":"bool","internalType":"bool","name":""}],"stateMutability":"view","name":"getBlackListedAddress","inputs":[{"name":"blAddress","internalType":"address","type":"address"}],"type":"function"},{"type":"function","name":"getBlackListedNFT","inputs":[{"name":"nftID","type":"uint256","internalType":"uint256"}],"stateMutability":"view","outputs":[{"internalType":"bool","type":"bool","name":""}]},{"stateMutability":"view","name":"AddyCount","type":"function","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"inputs":[]},{"outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"type":"function","inputs":[],"name":"IDCount","stateMutability":"view"}]      

      const contractblack = new web3.eth.Contract(abiblack, '0x0739948117Ee512eF799132c611c28B201B87c1b')

      this.setState({ contractblack })

      const abiv = ZonuletVerified.abi
      const addv = '0xB8D6deA2b38ED7E8194C50ad7Ae163B36ff2b03a' //verified
      const contractv = new web3.eth.Contract(abiv, addv)

      const abia = ZonuletAvatars.abi
      const addr = '0xEd1A69efced001468a9F7c469fe1F8640e7583C4' //avatars
      const contractav = new web3.eth.Contract(abia, addr)

      this.setState({ contractav })

      this.setState({ contractv })

      const abilike = ZonuletNFTLikes.abi
      const contractlike = new web3.eth.Contract(abilike, '0x93A54F1f67428bfF04394551BfeC98D28bcb0d8b')
      this.setState({ contractlike })


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

      const gtransactions = await sale_contract.getPastEvents('GiftedNFT', {
        fromBlock: 462592,
        toBlock: 'latest',
      })
      this.setState({ gtransactions })

      var j = 0
      for (var k = this.state.totalSupply; k--; ) {
        // i = 159
        // console.log(j)
        if (j < 7) {
          const blacklisted = await contractblack.methods.getBlackListedNFT(k).call()
          if (!blacklisted) {
            const metadata = await contract.methods.imageData(k).call()
            const owner = await contract.methods.ownerOf(k).call()
            const likecount = await contractlike.methods.nftLikes(k).call()
            const pacmancount = await contractlike.methods.nftPacmans(k).call()
            // console.log(metadata)
            this.setState({
              images: [...this.state.images, metadata.name],
              imageData_name: [...this.state.imageData_name, metadata.name],
              imageData_ipfsData: [...this.state.imageData_ipfsData, metadata.ipfsData],
              imageData_mimeType: [...this.state.imageData_mimeType, metadata.mimeType],
              imageData_category: [...this.state.imageData_category, metadata.category],
              imageData_price: [...this.state.imageData_price, metadata.price],
              imageData_owner: [...this.state.imageData_owner, owner],
              imageData_likecount: [...this.state.imageData_likecount, likecount.likes],
              imageData_icecount: [...this.state.imageData_icecount, pacmancount.pacmans],
              imageData_id: [...this.state.imageData_id, k],
            })

            this.setState({ ready: true })
            j++
          }
        } else {
          break
        }
      }

      
    } else {
      toast.error("Switch to Mantle Testnet!")
    }
   
  }

}
export default Minted
