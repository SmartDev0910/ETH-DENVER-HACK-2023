import React, { Component } from 'react'

import Img from 'react-cool-img'
import ReactPlaceholder from 'react-placeholder'
import { Tabs, Tab } from 'react-bootstrap'
import MetaTags from 'react-meta-tags'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import ScrollToTop from 'react-scroll-to-top'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Web3 from 'web3'
import 'react-placeholder/lib/reactPlaceholder.css'
import ZoNulet from '../../abis/ZoNulet.json'
import ZonuletNFT from '../../abis/ZonuletNFT.json'
import ZonuletNFTSale from '../../abis/ZonuletNFTSale.json'
import ZonuletVerified from '../../abis/ZonuletVerified.json'
import ZonuletAvatars from '../../abis/ZonuletAvatars.json'
import DexSwapZonu from '../../abis/DexSwapERC20.json'
import ZonuletBlacklist from '../../abis/ZonuletBlacklist.json'
import ZonuletOracle from '../../abis/ZonuletOracleV2.json'

class Collection extends Component {
  render() {
    var isAddress = function(address) {
      if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
        // check if it has the basic requirements of an address
        return false
      } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
        // If it's all small caps or all all caps, return true
        return true
      } else {
        // Otherwise check each case
        return true
      }
    }

    const nft_id_path = window.location.href.split('/')
    const address = nft_id_path[nft_id_path.length - 1]

    if (isAddress(address)) {
      return (
        <div>
          <ScrollToTop smooth />
          <MetaTags>
            <title>Zonulet NFT Collection of {address}</title>
            <meta name="description" content={this.state.imageData_des} />
            <meta property="og:title" content={'Zonulet NFT Collection of ' + address + ''} />
            <meta property="og:description"  
            content={ this.state.name && this.state.bio  ? this.state.name + 
              ' - ' + this.state.bio + 
              ' - ' + this.state.email + 
              ' - ' + this.state.website + 
              ' - ' + this.state.twitter + 
              ' - ' + this.state.instagram + 
              ' - ' : 'Collection Address of ' + address
              }
            />
            <meta
              property="og:image"
              content={this.state.ipfs ? `${process.env.REACT_APP_INFURA_GATEAWAY}` + this.state.ipfs : null}
            />
          </MetaTags>
          <div className="head-title col-auto mx-4">
            <h4 className="mb-0 font-weight-normal">NFT Collection</h4>
          </div>
          <div className="container-fluid mb-5 my-collect-adj">
            <div className="row">
              <div className='col-md-12'>
                <div className='profile_banner'>
                  <div className='profile_banner_default'>
                  {this.state.ipfs !== '' &&
                  (this.state.mim === 'image/jpeg' ||
                    this.state.mim === 'image/png' ||
                    this.state.mim === 'image/gif') ? (
                    <div className="profile_banner_default_setting">
                      <img
                        src={`${process.env.REACT_APP_INFURA_GATEAWAY}` + this.state.ipfs}
                        alt=""
                        border="0"
                      />
                    </div>

                  ) : (
                  <div>
                      <img src="/editor_profile.png" seed={jsNumberForAddress(this.state.account)}/>
                  </div>
                  )}
                  </div>
                </div>
                <div className='profile_editor editor_collections'>
                  <div className='profile_default profile_collections'>
                  {this.state.ipfs !== '' &&
                  (this.state.mim === 'image/jpeg' ||
                    this.state.mim === 'image/png' ||
                    this.state.mim === 'image/gif') ? (
                    <div >
                      <img
                        src={`${process.env.REACT_APP_INFURA_GATEAWAY}` + this.state.ipfs}
                        alt=""
                        border="0"
                        height="125px"
                        style={{ borderRadius: '10%' }}
                      />
                    </div>
                  ) : (
                  <div>
                      <img src="/editor_profile.png" seed={jsNumberForAddress(this.state.account)}/>
                      {this.state.verified === true ? (
                        <div
                          style={{
                            display: 'inline-block',
                            verticalAlign: 'super',
                            marginLeft: '8px',
                          }}
                        >
                          <svg
                            width="26"
                            height="26"
                            viewBox="0 0 12 12"
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
                  )}
                  </div>
              </div>
            </div>
            <div className='col-md-6'>
              <div className='account_collection'>
              <span className="account_name_collections">{this.state.name}</span>
                {this.state.verified === true ? (
                        <div
                          style={{
                            display: 'inline-block',
                            verticalAlign: 'super',
                            marginLeft: '8px',
                          }}
                        >
                          <svg
                            width="26"
                            height="26"
                            viewBox="0 0 12 12"
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
              <div className='account_address'>
                <span className='account_name'>
                <span className='nft_collection_of'>NFT COLLECTION BY 
                {this.state.name === '' ? ' ADDRESS' : <strong className='txtPinkBlack'>{' ' + this.state.name}</strong>}</span>
                </span>
              </div>
              <div className='account_bio'>
              <span className="text_bio">
                {this.state.bio}
              </span>
              </div>
              <div className='account_user_balance'>
                <span className="dezu_balance text-light">
                  <ReactPlaceholder
                  type="rect"
                  ready={this.state.dezubalance}
                  showLoadingAnimation={true}
                  color="#333"
                  style={{height: '20px', width: '20px',borderRadius: '25px', display: 'inline-block'}}>
                      <span><strong className='count_balance'>
                        {this.state.dezubalance.toString().slice(0, Number(this.state.dezubalance).toString().indexOf('.') + 4,)}
                      </strong></span>
                  </ReactPlaceholder>
                  <br />
                  <span className='nameText_balance'>DEZU Balance
                </span>
                </span>
                <span className="zonu_balance text-light">
                  <ReactPlaceholder
                  type="rect"
                  ready={this.state.zonuBalance}
                  showLoadingAnimation={true}
                  color="#333"
                  style={{height: '20px', width: '20px',borderRadius: '25px', display: 'inline-block'}}>
                      <span><strong className='count_balance'>
                        {this.state.zonuBalance.toString().slice(0, Number(this.state.zonuBalance).toString().indexOf('.') + 4,)}
                      </strong></span>
                  </ReactPlaceholder>
                  <br />
                  <span className='nameText_balance'>ZONU Balance
                </span>
                </span>
                <span className="one_balance text-light">
                  <ReactPlaceholder
                  type="rect"
                  ready={this.state.maticbalance}
                  showLoadingAnimation={true}
                  color="#333"
                  style={{height: '20px', width: '20px',borderRadius: '25px', display: 'inline-block'}}>
                      <span><strong className='count_balance'>
                        {this.state.maticbalance.toString().slice(0, Number(this.state.maticbalance).toString().indexOf('.') + 4,)}
                        &nbsp;MATIC
                      </strong></span>
                  </ReactPlaceholder>
                  <br />
                  <span className='nameText_balance'>MATIC BALANCE
                </span>
                </span>
              </div>
            </div>
            <div className='col-md-6 pdl-50'>
              <div className='other_links'></div>
              <div className="users_links">
                <span className='address_img'> <strong className="text-light">{this.state.account}</strong>
                <a href={ 'https://mumbai.polygonscan.com/address/0x0fA3Ef5140eCa8c860FcA92b29E06A769d76f921?a=' + this.state.account }
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ top: '-1px', position: 'relative', marginLeft: '5px' }}
                >
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
                </span>
              </div>
              <div className='social_links'>
              <span className='social_markup'>
                <span className='crypto_link'>
                <a href={ 'https://mumbai.polygonscan.com/address/' + this.state.account } target="_blank" rel="noopener noreferrer" >
                  <img src='/svg/crypto_border.svg' alt='matic'></img>
                </a>
                </span>
                <span className='twitter_link'>
                <a href={ 'https://twitter.com/' + this.state.twitter } target="_blank" rel="noopener noreferrer" >
                  <img src='/svg/twitter_border.svg' alt='twitter'></img>
                </a>
                </span>
                <span className='instagram_link'>
                <a href={ 'https://instagram.com/' + this.state.instagram } target="_blank" rel="noopener noreferrer" >
                <img src='/svg/instagram_border.svg' alt='instagram'></img>
                </a>
                </span>
                <span className='website_link'>
                <a href={ this.state.website } target="_blank" rel="noopener noreferrer" >
                <img src='/svg/website_border.svg' alt='website'></img>
                </a>
                </span>
                <span className='email_link'>
                <a href={ 'mailto:' + this.state.email } target="_blank" rel="noopener noreferrer" >
                <img src='/svg/email_border.svg' alt='email'></img>
                </a>
                </span>
              </span>
              </div>
              <div className='count_total_activity'>
                <span className="text-light owner_nft">
              <ReactPlaceholder
                  type="rect"
                  ready={this.state.ready}
                  showLoadingAnimation={true}
                  color="#333"
                  style={{height: '20px', width: '20px',borderRadius: '25px', display: 'inline-block'}} >
                <span><strong className='count_nft'>{this.state.ownercollection.length}</strong></span>
                </ReactPlaceholder>
                <br />
                <span className='nameText_nft'>NFT Owned</span>
                </span>
                <span className="rewards_balance text-light">
                  <ReactPlaceholder
                  type="rect"
                  ready={this.state.dezuReward}
                  showLoadingAnimation={true}
                  color="#333"
                  style={{height: '20px', width: '20px',borderRadius: '25px', display: 'inline-block'}}>
                      <span><strong className='count_balance'>
                        {this.state.dezuReward.toString().slice(0, Number(this.state.dezuReward).toString().indexOf('.') + 4,)}
                      </strong></span>
                  </ReactPlaceholder>
                  <br />
                  <span className='nameText_balance'>total reward</span>
                </span>
                <span className="text-light minted_nft" >
              <ReactPlaceholder
                  type="rect"
                  ready={this.state.ready2}
                  showLoadingAnimation={true}
                  color="#333"
                  style={{height: '20px', width: '20px',borderRadius: '25px', display: 'inline-block'}} >
                <span><strong className='count_nft'>{this.state.mintedcollection.length}</strong></span>
                </ReactPlaceholder>
                <br />
                <span className='nameText_nft'>Total Minted</span>
                </span>
              </div>
            </div>
              {this.state.blacklisted ? (
                <p align="center" style={{ color: 'red', fontSize: '21px' }}>
                  BLACKLISTED CREATOR
                </p>
              ) : null}
              {this.state.blacklisted ? (
                <p align="center" style={{ color: 'red', fontSize: '21px' }}>
                  BLACKLISTED COLLECTION
                </p>
              ) : (
                <Tabs defaultActiveKey="1" id="uncontrolled-tab-example" className="mt-35">
                  <Tab eventKey="1" title="Owned">
                    <div className="container-fluid mb-5">
                      <div className="row justify-content-around">
                        <h4 className="text-light colltxt" align="center">
                          <strong>{this.state.ownercollection.length}</strong> NFTs OWNED
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
                                            `${process.env.REACT_APP_INFURA_GATEAWAY}` +
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
                                            `${process.env.REACT_APP_INFURA_GATEAWAY}` +
                                            this.state.imageData_ipfsData[key]
                                          }
                                          type="video/mp4"
                                        >
                                          <source
                                            src={
                                              `${process.env.REACT_APP_INFURA_GATEAWAY}` +
                                              this.state.imageData_ipfsData[key]
                                            }
                                            type="video/mp4"
                                          ></source>
                                        </video>
                                      ) : this.state.imageData_mimeType[key] === 'model/gltf-binary' ? (
                                        <model-viewer
                                          src={
                                            `${process.env.REACT_APP_INFURA_GATEAWAY}` +
                                            this.state.imageData_ipfsData[key]
                                          }
                                          alt={this.state.imageData_name[key]}
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
                                <div className="m-2" align="center">{this.state.imageData_name[key]}</div>
                                <div className="m-2 forsale_category" align="center">
                                    <strong>Category : </strong>&nbsp;&nbsp;
                                    {this.state.imageData_category[key]}
                                </div>
                                <div className="m-2 forsale_price" align="center">
                                  <span>
                                   {this.state.approved [key]? 'Price: ' + this.state.imageData_price[key] + " ZONU": 'Not For Sale'}&nbsp;
                                    {/* <strong>ZONU</strong>
                                    &nbsp;or ${this.state.imageData_usdprice[key]} <strong>USD</strong> */}
                                  </span>
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
                                            `${process.env.REACT_APP_INFURA_GATEAWAY}` +
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
                                            `${process.env.REACT_APP_INFURA_GATEAWAY}` +
                                            this.state.imageData_ipfsData[key]
                                          }
                                          type="video/mp4"
                                        >
                                          <source
                                            src={
                                              `${process.env.REACT_APP_INFURA_GATEAWAY}` +
                                              this.state.imageData_ipfsData[key]
                                            }
                                            type="video/mp4"
                                          ></source>
                                        </video>
                                      ) : this.state.imageData_mimeType[key] === 'model/gltf-binary' ? (
                                        <model-viewer
                                          src={
                                            `${process.env.REACT_APP_INFURA_GATEAWAY}` +
                                            this.state.imageData_ipfsData[key]
                                          }
                                          alt={this.state.imageData_name[key]}
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
                                  <div className="m-2" align="center">{this.state.imageData_name[key]}</div>
                                  <div className="m-2 forsale_category" align="center">
                                    <strong>Category : </strong>&nbsp;&nbsp;
                                    {this.state.imageData_category[key]}
                                  </div>
                                  <div className="m-2 forsale_price" align="center">
                                  <span>
                                   {this.state.approved [key]? 'Price: ' +  this.state.imageData_price[key]  : 'Not For Sale'}&nbsp;
                                   <strong>ZONU</strong>
                                    &nbsp;or ${this.state.imageData_usdprice[key]} <strong>USD</strong>
                                  </span>
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
                                            `${process.env.REACT_APP_INFURA_GATEAWAY}` +
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
                                            `${process.env.REACT_APP_INFURA_GATEAWAY}` +
                                            this.state.mimageData_ipfsData[key]
                                          }
                                          type="video/mp4"
                                        >
                                          <source
                                            src={
                                              `${process.env.REACT_APP_INFURA_GATEAWAY}` +
                                              this.state.mimageData_ipfsData[key]
                                            }
                                            type="video/mp4"
                                          ></source>
                                        </video>
                                      ) : this.state.mimageData_mimeType[key] === 'model/gltf-binary' ? (
                                        <model-viewer
                                          src={
                                            `${process.env.REACT_APP_INFURA_GATEAWAY}` +
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
                                <div className="m-2" align="center">{this.state.mimageData_name[key]}</div>
                                <div className="m-2 forsale_category" align="center">
                                    <strong>Category : </strong>&nbsp;&nbsp;
                                    {this.state.mimageData_category[key]}
                                </div>
                                <div className="m-2 forsale_price" align="center">
                                  <span>
                                   {this.state.approvedmint[key]? 'Price: ' + this.state.mimageData_price[key]  : 'Not For Sale'}&nbsp;
                                   <strong>ZONU</strong>
                                    &nbsp;or {this.state.imageData_usdprice[key]} <strong>USD</strong>
                                  </span>
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
              )}
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
                No NFT Collection at that address found!
              </h1>
            </div>
          </div>
        </div>
      )
    }
  }

  isAddress = function(address) {
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
      // check if it has the basic requirements of an address
      return false
    } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
      // If it's all small caps or all all caps, return true
      return true
    } else {
      // Otherwise check each case
      return true
    }
  }

  constructor(props) {
    super(props)
    const nft_id_path = window.location.href.split('/')
    const address = nft_id_path[nft_id_path.length - 1]





    var isAddress = function(address) {
      if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
        // check if it has the basic requirements of an address
        return false
      } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
        // If it's all small caps or all all caps, return true
        return true
      } else {
        // Otherwise check each case
        return true
      }
    }

    if (isAddress(address)) {
      this.state = {
        account: address,
        contract: null,
        totalSupply: 0,
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
        mimageData_category: [],
        mimageData_oneprice: [],
        mimageData_usdprice: [],
        token_sale_contract: null,
        ready2: false,
        readytxt: null,
        readytxts: null,
        readytxto: null,
        forsale: 0,
        minted: [],
        mintedcollection: [],
        token_price: 0,
        verified: false,
        blacklisted: false,
        ipfs: '',
        mim: '',
        name: '',
        bio: '',
        website: '',
        twitter: '',
        instagram: '',
        email: '',
        imageData_category: [],
        imageData_oneprice: [],
        imageData_usdprice: [],
        dezubalance: 0,
        zonuBalance: 0,
        maticbalance: 0,
        dezuReward: 0,
      }
    } else {
      this.state = {
        account: null,
        contract: null,
        totalSupply: 0,
        images: [],
        mimages: [],
        history: [],
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
        mimageData_category: [],
        mimageData_oneprice: [],
        mimageData_usdprice: [],
        history_image: [],
        history_buyer: [],
        history_price: [],
        history_minted: [],
        token_sale_contract: null,
        minted: [],
        verifed: false,
        blacklisted: false,
        forsale: 0,
        ready2: false,
        readytxt: null,
        readytxts: null,
        readytxto: null,
        mintedcollection: [],
        token_price: 0,
        ipfs: '',
        mim: '',
        name: '',
        bio: '',
        website: '',
        twitter: '',
        instagram: '',
        email: '',
        imageData_category: [],
        imageData_oneprice: [],
        imageData_usdprice: [],
        dezubalance: 0,
        zonuBalance: 0,
        maticbalance: 0,
        dezuReward: 0,

      }
    }
  }

  async componentWillMount() {
    if (this.state.account !== null) {
      await this.loadBlockchain()
    }
  }

  async loadBlockchain() {
    window.prerenderReady = false

    const web3crypto = new Web3('https://polygon-mumbai.infura.io/v3/da9c85c80bd0432dad730f1d5fbfd70b')

    const networkId = 80001
    const networkData = ZonuletNFT.networks[networkId]

    if (networkData) {
      const abi = ZonuletNFT.abi
      const address = networkData.address
      const contract = new web3crypto.eth.Contract(abi, address)
      // console.log(contract)
      this.setState({ contract })
      const totalSupply = await contract.methods.totalSupply().call()

      // console.log(totalSupply)
      this.setState({ totalSupply })

      const abia = ZoNulet.abi
      const addr = '0x496a89968Fb0e0EffE32Db03102B613084239ED3'
      const contractZonulet = new web3crypto.eth.Contract(abia, addr)

      const abidezu =DexSwapZonu.abi
      const dezuAddress = '0x55dd6D5b534e4B5EC178f99eC344B6915e78CCB6' 
      const contractDezu = new web3crypto.eth.Contract(abidezu, dezuAddress)

      // Load Owner
      if (web3crypto.utils.isAddress(this.state.account)) {

        const balanceOne = await contractZonulet.methods.balanceOf(this.state.account).call()
        const balanceDezu = await contractDezu.methods.balanceOf(this.state.account).call()
        const balanceZonu = web3crypto.utils.fromWei(balanceOne, 'ether')
        const zonuBalance = Number(balanceZonu).toFixed(2)
        const dexswapZonuBalance = web3crypto.utils.fromWei(balanceDezu, 'ether')

        const maticbalance = web3crypto.utils.fromWei(await web3crypto.eth.getBalance(this.state.account), 'ether')

        const dezubalance = Number(dexswapZonuBalance).toFixed(2)

        const reward = await contractZonulet.methods.getAccountDividendsInfo(this.state.account).call()

        const dezuReward = web3crypto.utils.fromWei(reward['4'], 'ether')

        const newabi = ZonuletAvatars.abi
        const addressa = '0xFC1f197c27A0325e35957792Df1355aa40E0B475' // avatars
        const contractava = new web3crypto.eth.Contract(newabi, addressa)
        // console.log(contract)
        this.setState({ contractava })
        const getIPFS = await contractava.methods.getIPFSHash(this.state.account).call()
        console.log(getIPFS)
        const getMIME = await contractava.methods.getMIMEType(this.state.account).call()
        console.log(getMIME)
        const getName = await contractava.methods.getName(this.state.account).call()
        console.log(getName)
        const getBio = await contractava.methods.getBio(this.state.account).call()
        console.log(getBio)
        const getEmail = await contractava.methods.getEmail(this.state.account).call()
        console.log(getEmail)
        const getTwitter = await contractava.methods.getTwitter(this.state.account).call()
        console.log(getTwitter)
        const getInstagram = await contractava.methods.getInstagram(this.state.account).call()
        console.log(getInstagram)
        const getWebsite = await contractava.methods.getWebsite(this.state.account).call()
        console.log(getWebsite)
        // IPFS MARKUP
        console.log("myBio", getBio)
        this.setState({ ipfs: getIPFS })
        this.setState({ mim: getMIME })
        this.setState({ name: getName })
        this.setState({ bio: getBio })
        this.setState({ twitter: getTwitter })
        this.setState({ instagram: getInstagram })
        this.setState({ website: getWebsite })
        this.setState({ email: getEmail })

        // Matic Markup
        this.setState({ maticbalance })
        this.setState({ dezubalance })
        this.setState({ zonuBalance })
        this.setState({ dezuReward })

        console.log('maticbalance',maticbalance )
        console.log('dezubalance',dezubalance )
        console.log('zonuBalance',zonuBalance )
        console.log('dezuReward',dezuReward )

        const abiv = ZonuletVerified.abi
        const addv = '0x6d4a0F6fb7c24aD9BC90943d9eB626c2EB907004' // verified
        const contractv = new web3crypto.eth.Contract(abiv, addv)
        // console.log(contract)
        this.setState({ contractv })

        const getOwnerVerified = await contractv.methods.getVerified(this.state.account).call()

        this.setState({ verified: getOwnerVerified })

        const owner = this.state.account
        // console.log(owner)
        this.setState({ owner: owner })

        const ownercount = await contract.methods.balanceOf(this.state.account).call()

        this.setState({ ownercount: ownercount })

        const abiblack = ZonuletBlacklist.abi
        const contractblack = new web3crypto.eth.Contract(abiblack, '0x701E0F3d41b70d180A856099EBe3494E4277c804')

        this.setState({ contractblack })

        const blacklisted = await contractblack.methods.getBlackListedAddress(owner).call()

        this.setState({ blacklisted })

        const oracleAbi = ZonuletOracle.abi

        const oracleAddress = '0x3767D165bfab065F12183f9b18B34fdA7feC84dE' // ZonuletPriceOracle
        const oracleContract = new web3crypto.eth.Contract(oracleAbi, oracleAddress)
        this.setState({ oracleContract })
        const maticprice = (await oracleContract.methods.getLatestMATICPrice().call()) / 1e8
        console.log("Matic/USD", maticprice)
        const zonuperOne = await oracleContract.methods.getLatestTokenPrice('0x2be37f0dfcd4b6851114635322b0953fe3451aa5', 1).call() 
        const zonuUsd = maticprice / (zonuperOne / 1e18)
        console.log("ZONU/USD//PRICE:", zonuUsd);
        
        
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

        for (var i = ownercount; i--; ) {
          const ownerindex = await contract.methods.tokenOfOwnerByIndex(owner, i).call()
          this.setState({
            ownercollection: [...this.state.ownercollection, ownerindex],
          })
        }
    
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

        for (i = 0; i < ownercount; i++) {
          // console.log(this.state.ownercollection)
          if (this.state.ownercollection[i]) {
            const metadata = await contract.methods.imageData(this.state.ownercollection[i]).call()
            // console.log(metadata)
            this.setState({
              images: [...this.state.images, metadata.name],
              imageData_name: [...this.state.imageData_name, metadata.name],
              imageData_ipfsData: [...this.state.imageData_ipfsData, metadata.ipfsData],
              imageData_mimeType: [...this.state.imageData_mimeType, metadata.mimeType],
              imageData_price: [...this.state.imageData_price, metadata.price],
              imageData_id: [...this.state.imageData_id, i],
              imageData_category: [...this.state.imageData_category, metadata.category],
              imageData_price: [...this.state.imageData_price, abbreviateNumber(metadata.price)],
              imageData_usdprice: [...this.state.imageData_usdprice, Number(metadata.price * zonuUsd).toFixed(2)],
            })
            // NFT SALE
            var approv = await this.state.contract.methods
              .isApprovedOrOwner('0xB13cb334ADAD49BCa571C7aB2995800EDBaa94b1', this.state.ownercollection[i])
              .call()
            this.setState({ approved: [...this.state.approved, approv] })
            // console.log(approv)
            if (approv === true) {
              this.state.forsale++
            }
            this.setState({ ready: true })
          }
        }

        // Load Minted NFTs Data for tab menu
        for (i = 0; i < this.state.mintedcollection.length; i++) {
          const metadata = await contract.methods.imageData(this.state.mintedcollection[i]).call()
          // console.log(metadata)
          this.setState({
            mimages: [...this.state.mimages, metadata.name],
            mimageData_name: [...this.state.mimageData_name, metadata.name],
            mimageData_ipfsData: [...this.state.mimageData_ipfsData, metadata.ipfsData],
            mimageData_mimeType: [...this.state.mimageData_mimeType, metadata.mimeType],
            mimageData_category: [...this.state.mimageData_category, metadata.category],
            mimageData_price: [...this.state.mimageData_price, metadata.price],
            mimageData_id: [...this.state.mimageData_id, i],
          })
          var approvs = await this.state.contract.methods.isApprovedOrOwner('0xB13cb334ADAD49BCa571C7aB2995800EDBaa94b1', this.state.mintedcollection[i]).call()
          this.setState({ approvedmint: [...this.state.approvedmint, approvs] })
          this.setState({ ready2: true })
        }

        if (this.state.mintedcollection.length === 0) {
          this.setState({ ready2: true })
          this.setState({ readytxt: 'No NFTs have been created by this user' })
        }

        if (this.state.ownercollection.length === 0) {
          this.setState({ ready: true })
          this.setState({ readytxto: 'No NFTs are owned by this user' })
        }

        if (this.state.ownercollection.length === 0) {
          this.setState({ ready: true })
          this.setState({ readytxts: 'No NFTs are for sale by this user' })
        }

        const sale_networkData = ZonuletNFTSale.networks[networkId]
        const sale_abi = ZonuletNFTSale.abi
        const sale_address = sale_networkData.address
        const sale_contract = new web3crypto.eth.Contract(sale_abi, sale_address)
        this.setState({ sale_contract })

        window.prerenderReady = true
      }

    } else {
      toast.error("Switch to Matic Testnet!")
    }

  }
}

export default Collection
