import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


import Draw from './product/draw'
import ForSale from './product/forsale'
import Mint from './mint/mint'
import NftDetail from './nft-detail/nft-detail'
import Collection from './collection/collection'
import NavbarMain from './navbar/navbar'
import EditProfile from './editprofile/editprofile'
import NewestNftForSale from './explore/newest'
// import Stake from './product/stake'
import Search from './product/search'

import Art from './categories/art'
import Photography from './categories/photography'
import Metaverse from './categories/metaverse'
import Collectibles from './categories/collectibles'
import Mantle from './categories/mantle'
import Fantasy from './categories/fantasy'
import Cards from './categories/cards'
import Anime from './categories/anime'
import Memes from './categories/memes'
import NSFW from './categories/nsfw'
import Other from './categories/other'
import ExploreAll from './explore/exploreall'
import Gifted from './explore/gifted'
import Purchased from './explore/purchased'
import Minted from './explore/minted'
import SearchAllMinted from './explore/searchallminted'
import NftsForSale from './explore/nftforsale'
import NotFoundPage from './NotFoundPage.js'
import Landing from './landing/landing'

console.warn = () => {};
console.error = () => {};

class App extends Component {
  async componentWillMount() {
    document.addEventListener('contextmenu', e => {
      // e.preventDefault()
    })
    await this.loadWeb3()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      window.loaded_web3 = true
      await window.ethereum.request({ method: 'eth_requestAccounts' })
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
      window.loaded_web3 = true
    } else {
      // window.alert('Non-Mantle browser detected. You should consider trying MetaMask!')
    }
  }

  render() {
    return (
      <>
      <div id='renderHeight'>
        <Router>
          <NavbarMain />
          <div className="container">
            <div>
              <Switch>
                <Route exact path="/">
                  <Landing />
                </Route>
                <Route path="/categories/art">
                  <Art />
                </Route>
                <Route path="/categories/photography">
                  <Photography />
                </Route>
                <Route path="/categories/metaverse">
                  <Metaverse />
                </Route>
                <Route path="/categories/collectibles">
                  <Collectibles />
                </Route>
                <Route path="/categories/mantle">
                  <Mantle />
                </Route>
                <Route path="/categories/fantasy">
                  <Fantasy />
                </Route>
                <Route path="/categories/cards">
                  <Cards />
                </Route>
                <Route path="/categories/anime">
                  <Anime />
                </Route>
                <Route path="/categories/memes">
                  <Memes />
                </Route>
                <Route path="/categories/nsfw">
                  <NSFW />
                </Route>
                <Route path="/categories/other">
                  <Other />
                </Route>
                <Route path="/explore/exploreall">
                  <ExploreAll />
                </Route>
                <Route path="/explore/gifted">
                  <Gifted />
                </Route>
                <Route path="/explore/purchased">
                  <Purchased />
                </Route>
                <Route path="/explore/minted">
                  <Minted />
                </Route>
                <Route path="/explore/searchallminted">
                  <SearchAllMinted />
                </Route>
                <Route path="/explore/nftforsale">
                  <NftsForSale />
                </Route>
                <Route path="/explore/newest">
                  <NewestNftForSale />
                </Route>

                <Route path="/mint">
                  <Mint />
                </Route>
                <Route path="/product/search">
                  <Search />
                </Route>
                <Route path="/product/draw">
                  <Draw />
                </Route>
                <Route path="/product/forsale">
                  <ForSale />
                </Route>
                <Route path="/collection/:owner">
                  <Collection />
                </Route>
                <Route path="/editprofile">
                  <EditProfile />
                </Route>
                <Route path="/nft/:name">
                  <NftDetail />
                </Route>
                <Route path="/nft-detail/:name">
                  <NftDetail />
                </Route>
                <Route path="*" component={NotFoundPage} />
              </Switch>
            </div>
          </div>
        </Router>
      </div>
      </>
    )
  }
}

export default App
