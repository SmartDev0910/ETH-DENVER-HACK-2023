import React, { Component } from 'react'
import ZonuletAvatars from '../../abis/ZonuletAvatars.json'
import ZonuletVerified from '../../abis/ZonuletVerified.json'
import { create } from 'ipfs-http-client'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import { toast } from 'react-toastify'



class EditProfile extends Component {
  
  profileInjected = e => {

    this.setState({ new_image: e.target.files[0] })
    document.getElementById('fileupload').innerText = e.target.files[0].name

    console.log(e.target.files[0])

    var blob = e.target.files[0] // See step 1 above

    var fileReader = new FileReader()

    fileReader.onloadend = function(evt) {
      var arr = new Uint8Array(evt.target.result).subarray(0, 4)
      var header = ''
      for (var i = 0; i < arr.length; i++) {
        header += arr[i].toString(16)
      }
      console.log(header)

      if (
        e.target.files[0].type === 'image/png' ||
        e.target.files[0].type === 'image/jpeg' ||
        e.target.files[0].type === 'image/gif'
      ) {
        var outputimage = document.getElementById('outputimage')
        var div = document.getElementById('wrapperdiv')
        var profile_seting = document.getElementById('profile_settings')
        var text_settings = document.getElementById('prof_editor')
        profile_seting.style.display = 'none'
        text_settings.style.display = 'none'
        div.style.display = 'block'
        outputimage.style.display = 'block'
        var mainfile = URL.createObjectURL(e.target.files[0])
        outputimage.src = mainfile
      } else if (e.target.files[0].type === 'video/mp4') {
        var outputvideo = document.getElementById('outputvideo')
        var div = document.getElementById('wrapperdiv')
        var profile_seting = document.getElementById('profile_settings')
        var text_settings = document.getElementById('prof_editor')
        profile_seting.style.display = 'none'
        text_settings.style.display = 'none'
        div.style.display = 'block'
        outputvideo.style.display = 'block'
        var mainfile = URL.createObjectURL(e.target.files[0])
        outputvideo.src = mainfile
      } else if (header === '676c5446') {
        var outputmodel = document.getElementById('outputmodel')
        var div = document.getElementById('wrapperdiv')
        var profile_seting = document.getElementById('profile_settings')
        var text_settings = document.getElementById('prof_editor')
        profile_seting.style.display = 'none'
        text_settings.style.display = 'none'
        div.style.display = 'block'
        outputmodel.style.display = 'block'
        var mainfile = URL.createObjectURL(e.target.files[0])
        outputmodel.src = mainfile
      }
    }
    
    fileReader.readAsArrayBuffer(blob)
  }


  render() {
    return (
      <div>
        <div className="head-title col-auto mx-4">
          <h4 className="mb-0 font-weight-normal">Edit Profile</h4>
        </div>
        <div className="container-fluid pt-5 create-mint-adj">
          <div className="row">
            <div className="col-12 form-wrapper px-3">
              <div className="form-container">
                <div className='col-md-12'>
                  <div className='profile_banner' id='profile_banner'>
                  <div className='profile_banner_default'  id="banner_settings">
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
                      {/* <Jazzicon diameter={100} seed={jsNumberForAddress(this.state.account)} /> */}
                      <img src="https://hyperspace.infura-ipfs.io/ipfs/QmfZ3QHMw3Gg6LbdD7tFVF8znN5mQMppZmyU5vqbTgkXq8" seed={jsNumberForAddress(this.state.account)}/>
                  </div>
                  )}
                  </div>
                  </div>
                  <div className='profile_editor'>
                  <div className='profile_default'  id="profile_settings">
                  {this.state.ipfs !== '' &&
                  (this.state.mim === 'image/jpeg' ||
                    this.state.mim === 'image/png' ||
                    this.state.mim === 'image/gif') ? (
                    <div >
                      <img
                        // src={`${process.env.REACT_APP_INFURA_GATEAWAY}` + this.state.ipfs}
                        src={`${process.env.REACT_APP_INFURA_GATEAWAY}` + this.state.ipfs}
                        alt=""
                        border="0"
                        height="125px"
                        style={{ borderRadius: '10%' }}
                      />
                      {this.state.verified === true ? (
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '5px',
                            right: '5px',
                          }}
                        >
                          <svg
                            width="26"
                            height="26"
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
                  <div>
                      <img src="https://hyperspace.infura-ipfs.io/ipfs/QmfZ3QHMw3Gg6LbdD7tFVF8znN5mQMppZmyU5vqbTgkXq8" seed={jsNumberForAddress(this.state.account)}/>
                      {this.state.verified === true ? (
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '5px',
                            right: '5px',
                          }}
                        >
                          <svg
                            width="26"
                            height="26"
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
                  )}
                  </div>
                  </div>
                </div>
                <div className="col-md-12">
                <p className="text-secondary profile_editor_text" id="prof_editor">
                  This is where you can upload a new avatar for your Filecoin address profile on the Filecoin Blockchain
                  through this form. All avatar data is stored on IPFS and the Filecoin Blockchain with our Zonulet Avatar
                  Contract. This will create one transaction, costs minimal gas, with no extra fee to update your
                  avatar.
                </p>
                </div>
                <div align="center" id="wrapperdiv2" className='banner_editor' 
                  style={{ 
                    display: 'none' ,
                    height: '0px',
                    paddingBottom: '18%',
                    position: 'relative'
                  }}>
                  <img id="output2" className="rounded" width="350px"
                  style={{ 
                    display: 'none',
                    position: 'absolute',
                    inset: '0px',
                    boxSizing: 'border-box',
                    padding: '0px',
                    border: 'none',
                    margin: 'auto',
                    display: 'block',
                    width: '0px',
                    height: '0px',
                    minWidth: '100%',
                    maxWidth: '100%',
                    minHeight: '100%',
                    maxHeight: '100%',
                    objectFit: 'cover',
                    border: '1px solid #ffffff'
                  }} align="center" />
                  <video
                    id="outputvideo2"
                    controls="controls"
                    className="rounded"
                    align="center"
                    position='absolute'
                    inset='0px'
                    boxSizing= 'border-box'
                    padding='0px'
                    margin='auto'
                    display='block'
                    width='0px'
                    height='0px'
                    minWidth='100%'
                    maxWidth='100%'
                    minHeight='100%'
                    maxHeight='100%'
                    objectFit='cover'
                    autoPlay="true"
                    loop="true"
                    muted="true"
                    style={{ display: 'none', margin: '0 auto', border: '1px solid #ffffff' }}
                  >
                    <source id="outputvideo2" type="video/mp4" />
                  </video>
                  <br />
                </div>
                <div align="center" id="wrapperdiv" className='profile_editor' style={{ display: 'none' }}>
                  <img id="outputimage" className="rounded" width="150px" style={{ display: 'none'}} align="center" />
                  <video
                    id="outputvideo"
                    controls="controls"
                    className="rounded"
                    align="center"
                    width="150px"
                    height="100%"
                    autoPlay="true"
                    loop="true"
                    muted="true"
                    style={{ display: 'none', margin: '0 auto', border: '1px solid #ffffff' }}
                  >
                    <source id="outputvideo" type="video/mp4" />
                  </video>
                  <br />
                </div>
                <form
                  className="row divider_border social_media_line" 
                  onSubmit={event => {
                    event.preventDefault()
                    this.mintImage()
                  }}
                >
                  {/* USername+Bio */}
                  <div className="col-md-4">
                  <label className="form-control my-2" id="fileupload">
                      Click here to upload your avatar
                      <input
                        type="file"
                        className="form-control my-2"
                        id="fileupload"
                        style={{ display: 'none' }}
                        onChange={this.profileInjected}
                        accept="image/png, image/gif, image/jpeg"
                      />
                  </label>
                  <span className='textProfile'>Email</span>
                  <input
                      type="text"
                      className="form-control my-2"
                      placeholder={this.state.email === '' ? 'Email' : this.state.email}
                      onChange={event => this.setState({ new_email: event.target.value })}
                    />
                  <span className='textProfile'>Username</span>
                  <textarea
                      type="text"
                      className="form-control my-2"
                      placeholder={this.state.name === '' ? 'Name' : this.state.name}
                      onChange={event => this.setState({ new_name: event.target.value })}
                    />
                  <span className='textProfile'>Bio</span>
                    <textarea
                      type="text"
                      className="form-control my-2"
                      placeholder={this.state.bio === '' ? 'Biography of Profile' : this.state.bio}
                      rows="3"
                      onChange={event => this.setState({ new_bio: event.target.value })}
                    />
                  </div>
                  {/* Social Media */}
                  <div className="col-md-4">
                  <label className="form-control my-2" id="fileupload2">
                      Click here to Upload your Banner
                      {/* Click here to upload your banner */}
                      <input
                        // type="file"
                        className="form-control my-2"
                        id="fileupload2"
                        style={{ display: 'none' }}
                        // onChange={this.bannerInjected}
                        accept="image/png, image/gif, image/jpeg"
                      />
                  </label>
                  <span className='textProfile'>Twitter</span>
                    <input
                      type="text"
                      className="form-control my-2"
                      placeholder={this.state.twitter === '' ? '@username' : this.state.twitter}
                      rows="3"
                      onChange={event => this.setState({ new_twitter: event.target.value })}
                    />
                  <span className='textProfile'>Instagram</span>
                    <input
                      type="text"
                      className="form-control my-2"
                      placeholder={this.state.instagram === '' ? 'username' : this.state.instagram}
                      rows="3"
                      onChange={event => this.setState({ new_instagram: event.target.value })}
                    />
                 <span className='textProfile'>Website</span>
                    <input
                      type="text"
                      className="form-control my-2"
                      placeholder={this.state.website === '' ? 'https://mywebsite.com' : this.state.website}
                      rows="3"
                      onChange={event => this.setState({ new_website: event.target.value })}
                    />
                    <input
                      type="submit"
                      className="btn btn-block btn-primary my-3 rounded lt5px"
                      value="SUBMIT AND SAVE"
                    />
                    <progress id="progressBar" className='once_process' value="0" max="100"></progress>
                    <div id='progressBar2'></div>
                    <span className='once_sending' id='on_sending' >WAITING FOR CONFIRMATION...</span>
                    <span className='once_txhash' id='on_hash'>PROCESSING DATA PLEASE WAIT...</span>
                    <span className='once_receipt' id='on_receipt'>YOUR DATA HAS BEEN UPDATED,PLEASE REFRESH 🔄</span>
                    <div className='bar_content_loading' id='bar_content'>
                      <div id='bar_loading'></div>
                    </div>
                  </div>
                </form>
                </div>
              </div>
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
      imageData_price: [],
      selling_to: '',
      selling_price: null,
      new_image: new Blob(),
      new_name: '',
      new_email: '',
      new_twitter: '',
      new_instagram: '',
      new_website: '',
      new_category: '',
      new_mimetype: '',
      modelmime: '',
      new_bio: '',
      new_price: '',
      new_url: '',
      ipfs: '',
      // ipfs2: '',
      mim: '',
      // mim2: '',
      name: '',
      bio: '',
      email: '',
      website: '',
      instagram: '',
      twitter: '',
      verified: false,
      setIsHovering: false,
    }
  }

  async componentWillMount() {
    await this.loadBlockchain()
  }


  
  async loadBlockchain() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const abi = ZonuletAvatars.abi
    const address = '0x6ac6F871BA34B5Ce59EAF88D782b6e307207AC1B' //  new ZonuletAvatars Contract
    const contractava = new web3.eth.Contract(abi, address)
    // console.log(contract)
    this.setState({ contractava })
    const getIPFS = await contractava.methods.getIPFSHash(this.state.account).call()
    console.log(getIPFS)
    // const getIPFS2 = await contractava.methods.getIPFSHash2(this.state.account).call()
    // console.log(getIPFS2)
    const getMIME = await contractava.methods.getMIMEType(this.state.account).call()
    console.log(getMIME)
    // const getMIME2 = await contractava.methods.getMIMEType2(this.state.account).call()
    // console.log(getMIME2)
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

    this.setState({ ipfs: getIPFS })
    // this.setState({ ipfs2: getIPFS2 })
    this.setState({ mim: getMIME })
    // this.setState({ mim2: getMIME2 })
    this.setState({ name: getName })
    this.setState({ bio: getBio })
    this.setState({ email: getEmail })
    this.setState({ twitter: getTwitter })
    this.setState({ instagram: getInstagram })
    this.setState({ website: getWebsite })


    const abiv = ZonuletVerified.abi
    const addv = '0xD1E7C945945a8Bf16E7aa1bcB18A98aa2159B94D' // ZonuletVerified
    const contractv = new web3.eth.Contract(abiv, addv)
    // console.log(contract)
    this.setState({ contractv })

    const getOwnerVerified = await contractv.methods.getVerified(this.state.account).call()

    this.setState({ verified: getOwnerVerified })
  }

  mintImage = () => {
    let file = ''
    let mimetype = ''
    let hash = ''
    const INFURA_ID = process.env.REACT_APP_INFURA_ID
    const INFURA_SECRET_KEY = process.env.REACT_APP_INFURA_SECRET_KEY
    const auth = `Basic ${Buffer.from(INFURA_ID + ':' + INFURA_SECRET_KEY).toString("base64")}`

    //IPFS
    var ipfs = create({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
      apiPath: "/api/v0",
      headers: {
        "Authorization": auth
      }
    })

    this.getBase64(this.state.new_image, async result => {
      file = result // Buffer of Image for IPFS
      mimetype = this.state.new_image.type

      var arr = new Uint8Array(file).subarray(0, 4)
      var header = ''
      for (var i = 0; i < arr.length; i++) {
        header += arr[i].toString(16)
      }
      console.log(header)

      if (header === '676c5446') {
        mimetype = 'model/gltf-binary'
      }
      console.log(mimetype)

      console.log(this.state.new_url)

      if (file == null || file == '' || typeof file == 'undefined') {
        // Do nothing if Buffer is empty or null
        return
      } else if (this.state.new_bio == '' || this.state.new_name == '' || this.state.new_email == '' || this.state.new_twitter == '' || this.state.new_website == '' || this.state.new_instagram == '') {
        toast.warning("Please fill in all fields!")
        return
      } else {
        function progressCall(data) {
          var totalsize = file.length
          //console.log(totalsize);
          var fileccoinProgress =  document.getElementById('progressBar2');
          var progressBar = document.getElementById('progressBar');
          var percent = (data/totalsize) * 100;

          progressBar.value = Math.round(percent);

          fileccoinProgress.innerHTML = '<strong>PREPARE FOR UPLOADING YOUR DATA TO <span class="txtBlue">FILECOIN</span> & <span class="txtBlue2">IPFS</span><br />TOTAL SIZE: </strong> <strong class="txtGreen">' 
            + (data / 1000000).toFixed(2) + ' MB </strong>'
            fileccoinProgress.classList.add('filecoin_progress');
            fileccoinProgress.style.display= 'block'
            progressBar.style.display = 'block'
        }

        const results = await ipfs.add(
          [
            {
              path: 'zonulet',
              content: file,
            },
          ],
          {
            recursive: true,
            progress: progressCall,
          },
        )

        console.log(results)
        hash = results.cid.toString()
        console.log(hash)

        fetch('https://ipfs.infura.io:5001/api/v0/pin/add?arg=' + hash, {
          credentials: 'omit',
          method: 'POST',
          headers: {
            "Authorization": auth
          }
        })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data) //this
            var fileccoinProgress =  document.getElementById('progressBar2');
            var progressBar = document.getElementById('progressBar');
            var barContent = document.getElementById('bar_content');
            var fileccoinSending = document.getElementById('on_sending');
            var fileccoinHash = document.getElementById('on_hash');
            var fileccoinReceipt = document.getElementById('on_receipt');
            if (hash != null && typeof hash != 'undefined') {
              this.state.contractava.methods.setAvatar(hash,  mimetype, this.state.new_name, this.state.new_bio, this.state.new_instagram, this.state.new_twitter, this.state.new_website, this.state.new_email)
                .send({ from: this.state.account })
                .once('sending', sending=> {
                  fileccoinProgress.style.display = 'none'
                  progressBar.style.display = 'none'
                  barContent.style.display = 'block'
                  fileccoinSending.style.display = 'block'
                })
                .once('transactionHash', transactionHash=> {
                  fileccoinSending.style.display = 'none'
                  fileccoinHash.style.display = 'block'
                })
                .once('receipt', receipt => {
                  console.log('Data Updated!')
                  toast.success("Data Updated, Sweet!")
                  fileccoinHash.style.display = 'none'
                  fileccoinReceipt.style.display = 'block'
                  barContent.style.display = 'none'
                })
            }
          })
          .catch(error => {
            console.error('Error:', error)
          })

        if (hash != null && typeof hash != 'undefined') {
        }

      }
    })
  }

  getBase64(file, cb) {
    let reader = new FileReader()

    reader.onload = function() {
      let buf = new Buffer(reader.result)
      cb(buf)
    }
    reader.onerror = function(error) {
      console.log('Error: ', error)
    }
    reader.onloadend = function(evt) {
      var arr = new Uint8Array(evt.target.result).subarray(0, 4)
      var header = ''
      for (var i = 0; i < arr.length; i++) {
        header += arr[i].toString(16)
      }
      console.log(header)

      if (file.type != 'image/png' && file.type != 'image/jpeg' && file.type != 'image/gif') {
        cb(null)
        alert('avatar supported is [ .png, .jpeg, .gif ] ')
        return
      }
      if (header === '676c5446') {
        // setState of modelmime
      }

    }
    reader.readAsArrayBuffer(file)
  }
}
export default EditProfile
