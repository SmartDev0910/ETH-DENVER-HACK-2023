import React, {  useState, useEffect } from 'react'
import ZonuletNFT from '../../abis/ZonuletNFT.json'
import ZonuletNFTLikes from '../../abis/ZonuletNFTLikes.json'
import ZoNulet from '../../abis/ZoNulet.json'
import Img from 'react-cool-img'
import LazyLoad, { forceCheck } from 'react-lazyload'
import Fuse from 'fuse.js'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';

import Web3 from 'web3'
import ReactPlaceholder from 'react-placeholder'
import 'react-placeholder/lib/reactPlaceholder.css'
import 'react-sweet-progress/lib/style.css'

function Art() {
  const [images, setData] = useState([])
  const [ready, setReady] = useState(false)
  const [totalSupply, setTotal] = useState(0)
  const [loaded, setLoad] = useState(false)
  const [offset, setOffset] = useState(0)

  const [currentPage, setcurrentPage] = useState(0)
  const [pageCount, setPageCount] = useState(1)
  const [perPage, setPerPage] = useState(12)

  async function getNFTs() {

    const web3 = new Web3('https://polygon-mumbai.infura.io/v3/da9c85c80bd0432dad730f1d5fbfd70b')

    const networkId = 80001
    const networkData = ZonuletNFT.networks[networkId]
    if (networkData) {
      const abi = ZonuletNFT.abi
      const address = networkData.address
      const contract = new web3.eth.Contract(abi, address)

      const totalSupply = await contract.methods.totalSupply().call()
      setTotal(totalSupply)


      fetch(`${process.env.REACT_APP_INFURA_POLYGON}`, {
        mode: 'cors',
      })
        .then(response => {
          return response.json()
        })
        .then(data => {
          // Work with JSON data here
          setTotal(data.length)
          // const slice = data.slice(offset, offset + perPage);
          // setData(slice);
          const fuse = new Fuse(data, {
            keys: ['category'],
          })

          var matches = []

          const result = fuse.search('=Art$')
          if (!result.length) {
            setData([])
            // setData(images);
          } else {
            result.forEach(({ item }) => {
              matches.push(item)
            })
            setData(matches)
            forceCheck()
          }
          // setData(data);
          setPageCount(Math.ceil(images.length / perPage))
          setReady(true)
        })
        .catch(err => {
        })
    } else {
      toast.error("Switch to Matic Testnet!")
    }
  }

  useEffect(() => {
    getNFTs()
  }, [])

  const handlePageChange = e => {
    setcurrentPage(e.selected)
    const offset = Math.ceil(e.selected * perPage)
    setOffset(offset)
    // console.log(currentPage)
    // console.log(offset)
    getNFTs()
  }

  // render() {

  const searchData = pattern => {
    var matches = []

    if (!pattern) {
      setData([])
      setReady(false)
      getNFTs()
      //   matches = [];
      //   getNFTs();
      // setData(images);
      return
    }

    const fuse = new Fuse(images, {
      keys: ['name', 'category'],
    })

    const result = fuse.search(pattern)
    if (!result.length) {
      setData([])
      // setData(images);
    } else {
      result.forEach(({ item }) => {
        matches.push(item)
      })
      // setData([]);
      setData(matches)
      forceCheck()
     
    }
  }

  return (
    <div>
      <div className="head-title col-auto mx-4">
        <h4 className="mb-0 font-weight-normal">
          All <strong>{images.length}</strong> "Art" NFTs on Zonulet 
        </h4>
      </div>
      <div className="container-fluid mb-5 explore-adj">
        <div className="row justify-content-around">
          <p align="center" className="text-secondary">
            This is where you can explore all "Art" category NFTs that were minted within Zonulet NFT Market.
          </p>
          <p>
            <div align="center" style={{ maxWidth: '500px', margin: '0 auto' }}>
              <input
                placeholder="Search all 'Art' ZONU NFTs..."
                type="text"
                className="form-control my-2"
                onChange={e => searchData(e.target.value)}
                disabled={loaded}
              ></input>
            </div>
          </p>
          <ReactPlaceholder
            type="rect"
            ready={ready}
            showLoadingAnimation={true}
            color="#333"
            style={{ width: '300px', height: '300px', borderRadius: '15px' }}
          >
            {images.map(key => (

              <div key={key.id} className="col-md-2 card bg-light m-3 p-2">
                <LazyLoad height={300}>
                  <Link
                    to={{
                      pathname: `/nft/${key.id}`,
                    }}
                  >
                    <form onSubmit={event => {}}>
                      <div className="col-auto max-250">
                        <div className="text-secondary idbadge" align="center">
                          ID #{key.id}
                        </div>
                        {typeof key.ipfsData !== 'undefined' ? (
                          key.mimeType === 'image/jpeg' ||
                          key.mimeType === 'image/png' ||
                          key.mimeType === 'image/gif' ? (
                            <Img
                              alt="NFT"
                              className="token rounded"
                              src={`${process.env.REACT_APP_INFURA_GATEAWAY}` + key.ipfsData}
                              cache
                              style={{ background: '#21263e' }}
                            />
                          ) : key.mimeType === 'video/mp4' ? (
                            <video
                              alt="NFT"
                              className="token rounded"
                              autoPlay={true}
                              muted={true}
                              loop={true}
                              controls
                              playsInline
                              src={`${process.env.REACT_APP_INFURA_GATEAWAY}` + key.ipfsData}
                              type="video/mp4"
                            >
                              <source
                                src={`${process.env.REACT_APP_INFURA_GATEAWAY}` + key.ipfsData}
                                type="video/mp4"
                              ></source>
                            </video>
                          ) : key.mimeType === 'model/gltf-binary' ? (
                            <model-viewer
                              src={`${process.env.REACT_APP_INFURA_GATEAWAY}` + key.ipfsData}
                              alt={key.name}
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
                      <div className="m-2 category_menu" align="center">
                        <small>{key.name}</small>
                      </div>
                    </form>
                  </Link>
                  <div className="m-2 forsale_price" align="center">
                  <span>
                    {'Last Price : ' + key.price} &nbsp; ZONU &nbsp;<img alt="main" className="zonu-class" src="../zonulet_stndr_1.svg" />
                    </span>{' '}
                  </div>
                </LazyLoad>
              </div>
            ))}
          </ReactPlaceholder>
        </div>
      </div>
    </div>
  )
}


async function like(ev, owner, key) {
  ev.preventDefault()
  ev.stopPropagation()
  ev.stopImmediatePropagation()

  document.getElementById('like' + key).classList.add('fa-pulse')

  const web3t = window.web3

  const accounts = await window.web3.eth.getAccounts()
  const acct = accounts[0]
  // console.log('set account')

  const abilike = ZonuletNFTLikes.abi
  const contractlike = new web3t.eth.Contract(abilike, '0x604950ba06Cb36D53193012E816E07296f995dD8')

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

async function ice(ev, owner, key) {
  ev.preventDefault()
  ev.stopPropagation()
  ev.stopImmediatePropagation()

  document.getElementById('ice' + key).classList.add('fa-pulse')

  const web3t = window.web3
  const web3one = new Web3('https://polygon-mumbai.infura.io/v3/da9c85c80bd0432dad730f1d5fbfd70b')

  const accounts = await window.web3.eth.getAccounts()
  const acct = accounts[0]

  const networkId = 80001
  const networkData = ZonuletNFT.networks[networkId]
  const abi = ZonuletNFT.abi
  const address = networkData.address
  const contract = new web3one.eth.Contract(abi, address)

  // Get minter of NFT
  const minted = await contract.getPastEvents('Transfer', {
    fromBlock: 31945605,
    toBlock: 'latest',
  })

  for (var i = 0; i < minted.length; i++) {
    this.setState({ minted: [...this.state.minted, minted[i].returnValues] })
  }

  // console.log(this.state.minted)

  for (i = 0; i < this.state.minted.length; i++) {

    if (this.state.minted[i].tokenId == key) {
      if (this.state.minted[i].from == '0x0000000000000000000000000000000000000000') {

        this.setState({ mintedcollection: this.state.minted[i].to })
      }
    }

  }



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
          console.log(error)
          // this.setState({ txpend: false });
        })
    })
    .catch(error => {
      // Transaction rejected or failed
      document.getElementById('ice' + key).classList.remove('fa-pulse')
      toast.error("Pacmaned Failed, need 1 ZONU!")
      console.log(error)
      // this.setState({ txpend: false });
    })
}

export default Art