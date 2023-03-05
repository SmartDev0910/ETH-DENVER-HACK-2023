import React, { useState, useEffect } from 'react'
import ZonuletNFT from '../../abis/ZonuletNFT.json'
import ZonuletNFTLikes from '../../abis/ZonuletNFTLikes.json'
import ZoNulet from '../../abis/ZoNulet.json'
import Img from 'react-cool-img'
import LazyLoad, { forceCheck } from 'react-lazyload'
import Fuse from 'fuse.js'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import Web3 from 'web3'
import ReactPlaceholder from 'react-placeholder'
import 'react-placeholder/lib/reactPlaceholder.css'
import 'react-sweet-progress/lib/style.css'

function Fantasy() {
  const [images, setData] = useState([])
  const [ready, setReady] = useState(false)
  const [totalSupply, setTotal] = useState(0)
  const [loaded, setLoad] = useState(false)
  const [offset, setOffset] = useState(0)

  const [currentPage, setcurrentPage] = useState(0)
  const [pageCount, setPageCount] = useState(1)
  const [perPage, setPerPage] = useState(12)

  async function getNFTs() {

    const web3 = new Web3('https://api.hyperspace.node.glif.io/rpc/v1')
    // Load account
    // const accounts = await web3.eth.getAccounts()
    // this.setState({ account: accounts[0] })

    const networkId = 3141
    const networkData = ZonuletNFT.networks[networkId]
    if (networkData) {
      const abi = ZonuletNFT.abi
      const address = networkData.address
      const contract = new web3.eth.Contract(abi, address)
      // console.log(contract)

      const totalSupply = await contract.methods.totalSupply().call()
      // console.log(totalSupply)
      setTotal(totalSupply)

      const abilike = ZonuletNFTLikes.abi
      const contractlike = new web3.eth.Contract(abilike, '0xeb91A74782CE3f6C7C5DED926E3ea762d1dBBc0b')

      const abiblack = [{"stateMutability":"nonpayable","type":"constructor","inputs":[]},{"type":"event","name":"SetBlackListedAddress","inputs":[{"internalType":"address","indexed":true,"name":"hashAddress","type":"address"},{"name":"blacklisted","type":"bool","indexed":false,"internalType":"bool"}],"anonymous":false},{"inputs":[{"name":"nftID","indexed":true,"type":"uint256","internalType":"uint256"},{"name":"blacklisted","type":"bool","indexed":false,"internalType":"bool"}],"name":"SetBlackListedNFT","anonymous":false,"type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"idupdates","type":"function","outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"inputs":[],"name":"owner","stateMutability":"view","type":"function","outputs":[{"internalType":"address","type":"address","name":""}]},{"type":"function","outputs":[{"type":"address","name":"","internalType":"address"}],"stateMutability":"view","name":"updates","inputs":[{"type":"uint256","internalType":"uint256","name":""}]},{"outputs":[],"stateMutability":"nonpayable","inputs":[{"internalType":"address","name":"addy","type":"address"},{"internalType":"bool","name":"blacklisted","type":"bool"}],"type":"function","name":"setBlackListedAddress"},{"inputs":[{"internalType":"uint256","name":"nftID","type":"uint256"},{"internalType":"bool","name":"blacklisted","type":"bool"}],"name":"setBlackListedNFT","outputs":[],"type":"function","stateMutability":"nonpayable"},{"outputs":[{"type":"bool","internalType":"bool","name":""}],"stateMutability":"view","name":"getBlackListedAddress","inputs":[{"name":"blAddress","internalType":"address","type":"address"}],"type":"function"},{"type":"function","name":"getBlackListedNFT","inputs":[{"name":"nftID","type":"uint256","internalType":"uint256"}],"stateMutability":"view","outputs":[{"internalType":"bool","type":"bool","name":""}]},{"stateMutability":"view","name":"AddyCount","type":"function","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"inputs":[]},{"outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"type":"function","inputs":[],"name":"IDCount","stateMutability":"view"}]      

      const contractblack = new web3.eth.Contract(abiblack, '0x5bee4C3E37B9f6dFc7E9da3bE48667651b96FA08')

      fetch(`${process.env.REACT_APP_INFURA_HYPERSPACE}`, {
        mode: 'cors',
      })
        .then(response => {
          // console.log(response)
          return response.json()
        })
        .then(data => {
          // Work with JSON data here
          // console.log(data);
          // console.log(data.length)
          setTotal(data.length)
          // const slice = data.slice(offset, offset + perPage);
          // setData(slice);
          const fuse = new Fuse(data, {
            keys: ['category'],
          })

          var matches = []

          const result = fuse.search('=Fantasy$')
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
            // console.log(matches);
            //   setData(matches);
          }
          // setData(data);
          setPageCount(Math.ceil(images.length / perPage))
          setReady(true)
        })
        .catch(err => {
          // Do something for an error here
          // console.log('Error Reading data ' + err)
        })

    } else {
      toast.error("Switch to Filecoin Testnet!")
    }
  }

  useEffect(() => {
    getNFTs()
  }, [])

  const handlePageChange = e => {
    setcurrentPage(e.selected)
    const offset = Math.ceil(e.selected * perPage)
    setOffset(offset)
    console.log(currentPage)
    console.log(offset)
    getNFTs()
  }


  const searchData = pattern => {
    var matches = []

    if (!pattern) {
      setData([])
      setReady(false)
      getNFTs()

      return
    }

    const fuse = new Fuse(images, {
      keys: ['name', 'category'],
    })

    const result = fuse.search(pattern)
    if (!result.length) {
      setData([])
    } else {
      result.forEach(({ item }) => {
        matches.push(item)
      })
      setData(matches)
      forceCheck()

    }
  }

  return (
    <div>
      <div className="head-title col-auto mx-4">
        <h4 className="mb-0 font-weight-normal">
          All <strong>{images.length}</strong> "Fantasy" NFTs on Zonulet
        </h4>
      </div>
      <div className="container-fluid mb-5 explore-adj">
        <div className="row justify-content-around">
          <p align="center" className="text-secondary">
            This is where you can explore all "Fantasy" category NFTs that were minted within Zonulet NFT Market.
          </p>

          <p>
            <div align="center" style={{ maxWidth: '500px', margin: '0 auto' }}>
              <input
                placeholder="Search all 'Fantasy' ZONU NFTs..."
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


export default Fantasy
