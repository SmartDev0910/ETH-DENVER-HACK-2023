import React, { useState, useEffect } from 'react'
import ZonuletNFT from '../../abis/ZonuletNFT.json'
import Img from 'react-cool-img'
import LazyLoad, { forceCheck } from 'react-lazyload'
import Fuse from 'fuse.js'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import Web3 from 'web3'
import ReactPlaceholder from 'react-placeholder'
import 'react-placeholder/lib/reactPlaceholder.css'
import 'react-sweet-progress/lib/style.css'

function Anime() {
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
      // console.log(contract)

      const totalSupply = await contract.methods.totalSupply().call()
      // console.log(totalSupply)
      setTotal(totalSupply)

      fetch(`${process.env.REACT_APP_INFURA_POLYGON}`, {
        mode: 'cors',
      })
        .then(response => {
          // console.log(response)
          return response.json()
        })
        .then(data => {
          // console.log(data.length)
          setTotal(data.length)
          const fuse = new Fuse(data, {
            keys: ['category'],
          })

          var matches = []

          const result = fuse.search('=Anime$')
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
          // setData(data);
          setPageCount(Math.ceil(images.length / perPage))
          setReady(true)
        })
        .catch(err => {
          // Do something for an error here
          // console.log('Error Reading data ' + err)
        })

    } else {
      toast.error("Switch to Matic Testnet!")
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
          All <strong>{images.length}</strong> "Anime" NFTs on Zonulet
        </h4>
      </div>
      <div className="container-fluid mb-5 explore-adj">
        <div className="row justify-content-around">
          <p align="center" className="text-secondary">
            This is where you can explore all "Anime" category NFTs that were minted within Zonulet NFT Market.
          </p>
          <p>
            <div align="center" style={{ maxWidth: '500px', margin: '0 auto' }}>
              <input
                placeholder="Search all 'Anime' ZONU NFTs..."
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

export default Anime
