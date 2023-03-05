import React, { useState, useEffect } from 'react'
import Img from 'react-cool-img'
import ReactPlaceholder from 'react-placeholder'
import LazyLoad, { forceCheck } from 'react-lazyload'
import ScrollToTop from 'react-scroll-to-top'
import Fuse from 'fuse.js'
import { Link } from 'react-router-dom'
import Web3 from 'web3'
import { toast } from 'react-toastify';
import 'react-placeholder/lib/reactPlaceholder.css'
import 'react-sweet-progress/lib/style.css'
import ZonuletNFT from '../../abis/ZonuletNFT.json'

function Search() {

  const [images, setData] = useState([])
  const [ready, setReady] = useState(false)
  const [totalSupply, setTotal] = useState(0)
  const [loaded, ] = useState(false)

  const [, setPageCount] = useState(1)
  const [perPage, ] = useState(12)

  async function getNFTs() {

    const web3 = new Web3('https://api.hyperspace.node.glif.io/rpc/v1')
    
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
      // Grabs nftlist.json which is a compiled list of NFTs from the API server
      fetch(`${process.env.REACT_APP_INFURA_HYPERSPACE}`, {
        mode: 'cors',
      })
        .then(response => {
          // console.log(response)
          return response.json()
        })
        .then(data => {
          // console.log(data.length)
          setTotal(data.length)
          setData(data)
          setPageCount(Math.ceil(data.length / perPage))
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
      <ScrollToTop smooth />
      <div className="head-title col-auto mx-4">
        <h4 className="mb-0 font-weight-normal">
          All <strong>{totalSupply}</strong> Minted NFTs on Filecoin/Hyperspace
        </h4>
      </div>
      <div className="container-fluid mb-5 explore-adj">
        <div className="row justify-content-around">
          <p align="center" className="text-secondary">
            THIS IS WHERE YOU CAN EXPLORE ALL NFTS THAT WERE MINTED WITH ZONULET NFT MARKET. INDEX MINTED NFTS EVERY 5-10 MINUTES.
          </p>
          <p>
            <div align="center" style={{ maxWidth: '500px', margin: '0 auto' }}>
              <input
                placeholder="SEARCH ALL ZONU NFTS..."
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
            color="#000"
            style={{ width: '300px', height: '300px', borderRadius: '15px' }}
          >
            {images.map(key => (

              <div key={key.id} className="col-md-2 card bg-light m-3 p-2">
                <LazyLoad height={300}>
                  <div className="m-2 row" align="center">
                    <div className="col-6">
                      <span id={'count' + key.id}>{key.likecount}</span>{' '}
                      <i className="fas fa-thumbs-up like" id={'like' + key.id}></i>
                    </div>
                    <div className="col-6">
                      <span id={'counti' + key.id}>{key.pacmancount}</span>{' '}
                      <i className="fab fa-codiepie ice" id={'ice' + key.id}></i>
                    </div>
                  </div>
                  <Link
                    to={{
                      pathname: `/nft/${key.id}`,
                      // state: {name: "agin"}
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
                              className="token rounded bordsky"
                              style={{ background: '#21263e' }}
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
                      <div className="m-2 bgName" align="center">
                        {key.name}
                      </div>
                    </form>
                  </Link>
                </LazyLoad>
              </div>
            ))}
          </ReactPlaceholder>
        </div>
      </div>
    </div>
  )
}


export default Search
