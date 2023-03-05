import React, { Component } from 'react'
import ZonuletNFT from '../../abis/ZonuletNFT.json'
import ZonuletNFTSale from '../../abis/ZonuletNFTSale.json'
import { create } from 'ipfs-http-client'
import { toast } from 'react-toastify'
import LoadingOverlay from 'react-loading-overlay'
import ReactCanvasConfetti from 'react-canvas-confetti'
import * as imageConversion from 'image-conversion'
import { isMobile } from 'react-device-detect'
import CanvasDraw from 'react-canvas-draw'
import { saveAs } from 'file-saver'
import { HuePicker , AlphaPicker, SketchPicker, GithubPicker, SliderPicker } from 'react-color'
import axios from 'axios'
import Web3 from 'web3'


const canvasStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
}

class Draw extends Component {
  twoCalls = e => {
    console.log(e.target.files[0])

    if (e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpeg') {
      var compressmodel = document.getElementById('compressing')
      compressmodel.style.display = 'block'
      // Compress the NFT 512kb if png/jpeg/gif
      imageConversion.compressAccurately(e.target.files[0], 512).then(async res => {
        //The res in the promise is a compressed Blob type (which can be treated as a File type) file;
        console.log('Compressed', res)
        compressmodel.style.display = 'none'

        this.setState({ new_image: res })

        document.getElementById('fileupload').innerText = e.target.files[0].name

        var blob = res // See step 1 above
        var fileReader = new FileReader()
        fileReader.onloadend = function(evt) {
          var arr = new Uint8Array(evt.target.result).subarray(0, 4)
          var header = ''
          for (var i = 0; i < arr.length; i++) {
            header += arr[i].toString(16)
          }

          document.getElementById('uplabel').innerText = e.target.files[0].name


          if (res.type === 'image/png' || res.type === 'image/jpeg' || res.type === 'image/gif') {
            var outputmodel = document.getElementById('outputmodel')
            outputmodel.style.display = 'none'
            var outputvideo = document.getElementById('outputvideo')
            outputvideo.style.display = 'none'
            var output = document.getElementById('output')
            var div = document.getElementById('wrapperdiv')
            div.style.display = 'block'
            output.style.display = 'block'
            var mainfile = URL.createObjectURL(res)
            output.src = mainfile
          } else if (res.type === 'video/mp4') {
            var outputmodel = document.getElementById('outputmodel')
            outputmodel.style.display = 'none'
            var output = document.getElementById('output')
            output.style.display = 'none'
            var outputvideo = document.getElementById('outputvideo')
            var div = document.getElementById('wrapperdiv')
            div.style.display = 'block'
            outputvideo.style.display = 'block'
            var mainfile = URL.createObjectURL(res)
            outputvideo.src = mainfile
          } else if (header === '676c5446') {
            var output = document.getElementById('output')
            output.style.display = 'none'
            var outputvideo = document.getElementById('outputvideo')
            outputvideo.style.display = 'none'
            var outputmodel = document.getElementById('outputmodel')
            var div = document.getElementById('wrapperdiv')
            div.style.display = 'block'
            outputmodel.style.display = 'block'
            var mainfile = URL.createObjectURL(res)
            outputmodel.src = mainfile
          }
        }
        fileReader.readAsArrayBuffer(blob)
      })
    } else {
      this.setState({ new_image: e.target.files[0] })
      document.getElementById('fileupload').innerText = e.target.files[0].name
      var blob = e.target.files[0] // See step 1 above
      var fileReader = new FileReader()
      fileReader.onloadend = function(evt) {
        var arr = new Uint8Array(evt.target.result).subarray(0, 4)
        var header = ''
        for (var i = 0; i < arr.length; i++) {
          header += arr[i].toString(16)
        }

        document.getElementById('uplabel').innerText = e.target.files[0].name

        // Check the file signature against known types
        // 676c5446 is glb model (gltf-binary)

        if (
          e.target.files[0].type === 'image/png' ||
          e.target.files[0].type === 'image/jpeg' ||
          e.target.files[0].type === 'image/gif'
        ) {
          var outputmodel = document.getElementById('outputmodel')
          outputmodel.style.display = 'none'
          var outputvideo = document.getElementById('outputvideo')
          outputvideo.style.display = 'none'
          var output = document.getElementById('output')
          var div = document.getElementById('wrapperdiv')
          div.style.display = 'block'
          output.style.display = 'block'
          var mainfile = URL.createObjectURL(e.target.files[0])
          output.src = mainfile
        } else if (e.target.files[0].type === 'video/mp4') {
          var outputmodel = document.getElementById('outputmodel')
          outputmodel.style.display = 'none'
          var output = document.getElementById('output')
          output.style.display = 'none'
          var outputvideo = document.getElementById('outputvideo')
          var div = document.getElementById('wrapperdiv')
          div.style.display = 'block'
          outputvideo.style.display = 'block'
          var mainfile = URL.createObjectURL(e.target.files[0])
          outputvideo.src = mainfile
        } else if (header === '676c5446') {
          var output = document.getElementById('output')
          output.style.display = 'none'
          var outputvideo = document.getElementById('outputvideo')
          outputvideo.style.display = 'none'
          var outputmodel = document.getElementById('outputmodel')
          var div = document.getElementById('wrapperdiv')
          div.style.display = 'block'
          outputmodel.style.display = 'block'
          var mainfile = URL.createObjectURL(e.target.files[0])
          outputmodel.src = mainfile
        }
      }
      fileReader.readAsArrayBuffer(blob)
    }
  }

  handleChangeComplete = color => {
    this.setState({ color: color.hex })
  }

  render() {
    return (
      <div>
        <LoadingOverlay
          active={this.state.txpend}
          spinner
          text={'Waiting on...' + [this.state.txs] + ' Transaction(s)  Please Wait...'}
          styles={{
            overlay: base => ({
              ...base,
              background: 'rgba(0, 0, 0, 0.95)',
              position: 'fixed',
              color: '#ffc107',
              fontWeight: 'bold',
              letterSpacing: '1px'
            }),
            wrapper: {
              width: '100%',
              height: '100%',
              borderRadius: '25px',
            },
          }}
        >
          <div className="head-title col-auto mx-4">
            <h4 className="mb-0 font-weight-normal">Zonulet NFT Drawing </h4>
          </div>
          <div className="container-fluid pt-5 create-mint-adj">
            <div className="row">
              {!this.state.blacklisted ? (
                <div className="col-12 form-wrapper px-3 text-light">
                  <p align="center">
                    Make Your Own NFT! Draw "Save" or "Export"
                  </p>

                  <CanvasDraw
                    ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
                    brushColor={this.state.color}
                    brushRadius={this.state.brushRadius}
                    lazyRadius={this.state.lazyRadius}
                    canvasWidth={isMobile ? this.state.mobwidth : this.state.width}
                    canvasHeight={isMobile ? this.state.mobheight : this.state.height}
                    style={{ margin: '0 auto' }}
                    className='canvasDraw'
                  />
                  <div
                    className="row"
                    style={{
                      margin: '10px',
                      padding: '30px',
                      background: '#1b223d',
                      borderRadius: '15px',
                    }}
                  >
                    <div className="col-md-4">
                    <h2>Canvas Controls</h2>
                      <h2>&nbsp;</h2>
                      <div>
                        <label>Width:</label>
                        <input
                          type="range"
                          min="400"
                          max="2000"
                          value={this.state.width}
                          onChange={e =>
                            this.setState({
                              width: parseInt(e.target.value, 10),
                            })
                          }
                        />
                      </div>
                      <div>
                        <label>Height:</label>
                        <input
                          type="range"
                          min="400"
                          max="2000"
                          value={this.state.height}
                          onChange={e =>
                            this.setState({
                              height: parseInt(e.target.value, 10),
                            })
                          }
                        />
                      </div>
                      <div>
                        <label>Brush-Radius:</label>
                        <input
                          type="range"
                          value={this.state.brushRadius}
                          onChange={e =>
                            this.setState({
                              brushRadius: parseInt(e.target.value, 10),
                            })
                          }
                          min="1"
                          max="900"
                        />
                      </div>
                      <div>
                        <label>Lazy-Radius:</label>
                        <input
                          type="range"
                          min="1"
                          max="900"
                          value={this.state.lazyRadius}
                          onChange={e =>
                            this.setState({
                              lazyRadius: parseInt(e.target.value, 10),
                            })
                          }
                        />
                      </div>
                      <h2>Drawing Options</h2>
                      <h2>&nbsp;</h2>
                      
                      <button
                        className="btn btn-block btn-primary rounded-5 text-light p-2 m-3 buybtn"
                        onClick={() => {
                          this.saveableCanvas.eraseAll()
                        }}
                      >
                        Erase
                      </button>
                      <button
                        className="btn btn-block btn-primary rounded-5 text-light p-2 m-3 buybtn"
                        onClick={() => {
                          this.saveableCanvas.undo()
                        }}
                      >
                        Undo
                      </button>
                      <button
                        className="btn btn-block btn-primary rounded-5 text-light p-2 m-3 buybtn"
                        onClick={() => {
                          console.log(this.saveableCanvas.getDataURL())
                          this.setState({
                            savedimage: this.saveableCanvas.getDataURL(),
                          })
                          this.setState({ saved: true })
                          //   window.location.href = 'data:application/octet-stream;' + this.saveableCanvas.getDataURL();
                          const convertBase64ToFile = (base64String, fileName) => {
                            let arr = base64String.split(',')
                            let mime = arr[0].match(/:(.*?);/)[1]
                            let bstr = atob(arr[1])
                            let n = bstr.length
                            let uint8Array = new Uint8Array(n)
                            while (n--) {
                              uint8Array[n] = bstr.charCodeAt(n)
                            }
                            let file = new File([uint8Array], fileName, {
                              type: mime,
                            })
                            return file
                          }
                          let file = convertBase64ToFile(this.saveableCanvas.getDataURL(), 'zonuletdrawing.png')
                          saveAs(file, 'zonuletdrawing.png')
                        }}
                      >
                        Export PNG
                      </button>
                    </div>
                    <div className="col-md-4">
                      <h2>Brush Color</h2>
                      <SketchPicker
                        color={this.state.color}
                        onChangeComplete={this.handleChangeComplete}
                        style={{ position: 'absolute', bottom: '0px', width: 'auto !important' }}

                      />
                    </div>
                    <div className="col-md-4">
                      <h2>Pick Color</h2>
                    <div className='GitFuckinHub'>
                      <GithubPicker
                        color={this.state.color}
                        onChangeComplete={this.handleChangeComplete}
                        style={{ position: 'absolute', bottom: '0px', width: 'auto !important' }}

                      />
                      </div>
                   <div className='Slfuckinlide'>
                     <SliderPicker
                        color={this.state.color}
                        onChangeComplete={this.handleChangeComplete}
                        style={{ position: 'absolute', bottom: '0px', width: 'auto !important' }}

                      />
                    </div>
                   <div className='AlphaFuckinPicker'>
                     <AlphaPicker
                        color={this.state.color}
                        onChangeComplete={this.handleChangeComplete}
                        style={{ position: 'absolute', bottom: '0px', width: 'auto !important' }}

                      />
                    </div>
                    <div className='HueFuckinPicker'>
                     <HuePicker
                        color={this.state.color}
                        onChangeComplete={this.handleChangeComplete}
                        style={{ position: 'absolute', bottom: '0px', width: 'auto !important' }}

                      />
                    </div>
                    </div>
                  </div>
                  {/* <p>
          The following is a disabled canvas with a hidden grid that we use to
          load & show your saved drawing.
        </p>
        <button
        className='btn btn-block btn-primary rounded-5 text-light p-2 m-3 buybtn'
          onClick={() => {
            this.loadableCanvas.loadSaveData(
              localStorage.getItem("savedDrawing")
            );
          }}
        >
          Load what you saved previously
        </button>
        <h2>Last Temp Saved Drawing</h2>
        <CanvasDraw
          disabled
          hideGrid
          height="400px"
          width="400px"
          style={{margin: "0 auto"}}
          ref={canvasDraw => (this.loadableCanvas = canvasDraw)}
          saveData={localStorage.getItem("savedDrawing")}
        /> */}
                </div>
              ) : (
                <h1 className="text-danger" align="center">
                  You are blacklisted.
                </h1>
              )}
            </div>
          </div>
        </LoadingOverlay>
        <ReactCanvasConfetti refConfetti={this.getInstance} style={canvasStyles} />
      </div>
    )
  }

  constructor(props) {
    super(props)
    this.animationInstance = null
    this.handleInputChange = this.handleInputChange.bind(this)
    this.state = {
      account: '',
      contract: null,
      sale_contract: null,
      isAgree: false,
      totalSupply: 0,
      color: '#00bcd4',
      saved: false,
      width: 1000,
      mobwidth: 400,
      mobheight: 400,
      height: 600,
      brushRadius: 10,
      lazyRadius: 12,
      savedimage: '',
      images: [],
      owners: [],
      imageData_name: [],
      imageData_ipfsData: [],
      imageData_price: [],
      selling_to: '',
      selling_price: null,
      new_image: new Blob(),
      new_name: '',
      blacklisted: false,
      new_category: '',
      ipaddy: '',
      new_mimetype: '',
      modelmime: '',
      new_des: '',
      new_price: '',
      new_url: '',
      progress: '',
      txpend: false,
      txs: 0,
    }
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    if (target.checked === true) {
      this.setState({ isAgree: true })
    }
  }

  makeShot = (particleRatio, opts) => {
    this.animationInstance &&
      this.animationInstance({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio),
      })
  }

  fire = () => {
    this.makeShot(0.25, {
      spread: 100,
      startVelocity: 55,
    })

    this.makeShot(0.2, {
      spread: 180,
    })

    this.makeShot(0.35, {
      spread: 150,
      decay: 0.91,
      scalar: 0.8,
    })

    this.makeShot(0.1, {
      spread: 200,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.5,
    })

    this.makeShot(0.1, {
      spread: 200,
      startVelocity: 45,
    })
  }

  handlerFire = () => {
    this.fire()
  }

  getInstance = instance => {
    this.animationInstance = instance
  }

  async componentWillMount() {
    await this.loadBlockchain()
  }

  async loadBlockchain() {
    const web3 = window.web3

    const web3f = new Web3('https://polygon-mumbai.infura.io/v3/da9c85c80bd0432dad730f1d5fbfd70b')
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

      const abiblack = [{"stateMutability":"nonpayable","type":"constructor","inputs":[]},{"type":"event","name":"SetBlackListedAddress","inputs":[{"internalType":"address","indexed":true,"name":"hashAddress","type":"address"},{"name":"blacklisted","type":"bool","indexed":false,"internalType":"bool"}],"anonymous":false},{"inputs":[{"name":"nftID","indexed":true,"type":"uint256","internalType":"uint256"},{"name":"blacklisted","type":"bool","indexed":false,"internalType":"bool"}],"name":"SetBlackListedNFT","anonymous":false,"type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"idupdates","type":"function","outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"inputs":[],"name":"owner","stateMutability":"view","type":"function","outputs":[{"internalType":"address","type":"address","name":""}]},{"type":"function","outputs":[{"type":"address","name":"","internalType":"address"}],"stateMutability":"view","name":"updates","inputs":[{"type":"uint256","internalType":"uint256","name":""}]},{"outputs":[],"stateMutability":"nonpayable","inputs":[{"internalType":"address","name":"addy","type":"address"},{"internalType":"bool","name":"blacklisted","type":"bool"}],"type":"function","name":"setBlackListedAddress"},{"inputs":[{"internalType":"uint256","name":"nftID","type":"uint256"},{"internalType":"bool","name":"blacklisted","type":"bool"}],"name":"setBlackListedNFT","outputs":[],"type":"function","stateMutability":"nonpayable"},{"outputs":[{"type":"bool","internalType":"bool","name":""}],"stateMutability":"view","name":"getBlackListedAddress","inputs":[{"name":"blAddress","internalType":"address","type":"address"}],"type":"function"},{"type":"function","name":"getBlackListedNFT","inputs":[{"name":"nftID","type":"uint256","internalType":"uint256"}],"stateMutability":"view","outputs":[{"internalType":"bool","type":"bool","name":""}]},{"stateMutability":"view","name":"AddyCount","type":"function","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"inputs":[]},{"outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"type":"function","inputs":[],"name":"IDCount","stateMutability":"view"}]      

    const contractblack = new web3f.eth.Contract(abiblack, '0x701E0F3d41b70d180A856099EBe3494E4277c804')

    if (this.state.account) {
      const blacklisted = await contractblack.methods.getBlackListedAddress(this.state.account).call()
      this.setState({ blacklisted })
    }

    if (!this.state.blacklisted) {
      // let dropArea = document.getElementById('drop-area')

      // ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      //     dropArea.addEventListener(eventName, preventDefaults, false)
      //   })

      // function preventDefaults (e) {
      //     e.preventDefault()
      //     e.stopPropagation()
      // }
      // ;['dragenter', 'dragover'].forEach(eventName => {
      //     dropArea.addEventListener(eventName, highlight, false)
      // })

      // ;['dragleave', 'drop'].forEach(eventName => {
      //     dropArea.addEventListener(eventName, unhighlight, false)
      // })

      // function highlight(e) {
      //     dropArea.classList.add('highlight')
      // }

      // function unhighlight(e) {
      //     dropArea.classList.remove('highlight')
      // }

      const getData = async () => {
        const res = await axios.get('https://geolocation-db.com/json/')
        console.log(res.data)
        this.setState({ ipaddy: res.data.IPv4 })
      }

      getData()

      function handleFiles(file) {
        // this.setState({ new_image: file })
        // document.getElementById('fileupload').innerText = file[0].name;

        console.log('Uncompressed', file[0])

        if (file[0].type === 'image/png' || file[0].type === 'image/jpeg') {
          // Display Compressing Text Info
          var compressmodel = document.getElementById('compressing')
          compressmodel.style.display = 'block'

          // Compress the NFT 512kb if png/jpeg/gif
          imageConversion.compressAccurately(file[0], 512).then(async res => {
            //The res in the promise is a compressed Blob type (which can be treated as a File type) file;
            console.log('Compressed', res)

            compressmodel.style.display = 'none'

            var blob = res // See step 1 above

            // this.state.new_image = file[0];
            document.getElementById('fileupload').innerText = file[0].name
            var fileReader = new FileReader()
            fileReader.onloadend = function(evt) {
              var arr = new Uint8Array(evt.target.result).subarray(0, 4)
              var header = ''
              for (var i = 0; i < arr.length; i++) {
                header += arr[i].toString(16)
              }
              console.log(header)

              // Check the file signature against known types
              // 676c5446 is glb model (gltf-binary)

              if (res.type === 'image/png' || res.type === 'image/jpeg' || res.type === 'image/gif') {
                var outputmodel = document.getElementById('outputmodel')
                outputmodel.style.display = 'none'
                var outputvideo = document.getElementById('outputvideo')
                outputvideo.style.display = 'none'
                var output = document.getElementById('output')
                var div = document.getElementById('wrapperdiv')
                div.style.display = 'block'
                output.style.display = 'block'
                var mainfile = URL.createObjectURL(res)
                output.src = mainfile
              } else if (res.type === 'video/mp4') {
                var outputmodel = document.getElementById('outputmodel')
                outputmodel.style.display = 'none'
                var output = document.getElementById('output')
                output.style.display = 'none'
                var outputvideo = document.getElementById('outputvideo')
                var div = document.getElementById('wrapperdiv')
                div.style.display = 'block'
                outputvideo.style.display = 'block'
                var mainfile = URL.createObjectURL(file[0])
                outputvideo.src = mainfile
              } else if (header === '676c5446') {
                var output = document.getElementById('output')
                output.style.display = 'none'
                var outputvideo = document.getElementById('outputvideo')
                outputvideo.style.display = 'none'
                var outputmodel = document.getElementById('outputmodel')
                var div = document.getElementById('wrapperdiv')
                div.style.display = 'block'
                outputmodel.style.display = 'block'
                var mainfile = URL.createObjectURL(file[0])
                outputmodel.src = mainfile
              }
            }
            fileReader.readAsArrayBuffer(blob)
          })
        } else {
          // Don't compress it yet for gif, mp4, and glb mime types, work in progress

          var blob = file[0] // See step 1 above

          // this.state.new_image = file[0];
          document.getElementById('fileupload').innerText = file[0].name
          var fileReader = new FileReader()
          fileReader.onloadend = function(evt) {
            var arr = new Uint8Array(evt.target.result).subarray(0, 4)
            var header = ''
            for (var i = 0; i < arr.length; i++) {
              header += arr[i].toString(16)
            }
            console.log(header)

            // Check the file signature against known types
            // 676c5446 is glb model (gltf-binary)

            if (file[0].type === 'image/png' || file[0].type === 'image/jpeg' || file[0].type === 'image/gif') {
              var outputmodel = document.getElementById('outputmodel')
              outputmodel.style.display = 'none'
              var outputvideo = document.getElementById('outputvideo')
              outputvideo.style.display = 'none'
              var output = document.getElementById('output')
              var div = document.getElementById('wrapperdiv')
              div.style.display = 'block'
              output.style.display = 'block'
              var mainfile = URL.createObjectURL(file[0])
              output.src = mainfile
            } else if (file[0].type === 'video/mp4') {
              var outputmodel = document.getElementById('outputmodel')
              outputmodel.style.display = 'none'
              var output = document.getElementById('output')
              output.style.display = 'none'
              var outputvideo = document.getElementById('outputvideo')
              var div = document.getElementById('wrapperdiv')
              div.style.display = 'block'
              outputvideo.style.display = 'block'
              var mainfile = URL.createObjectURL(file[0])
              outputvideo.src = mainfile
            } else if (header === '676c5446') {
              var output = document.getElementById('output')
              output.style.display = 'none'
              var outputvideo = document.getElementById('outputvideo')
              outputvideo.style.display = 'none'
              var outputmodel = document.getElementById('outputmodel')
              var div = document.getElementById('wrapperdiv')
              div.style.display = 'block'
              outputmodel.style.display = 'block'
              var mainfile = URL.createObjectURL(file[0])
              outputmodel.src = mainfile
            }
          }
          fileReader.readAsArrayBuffer(blob)
        }
      }

      // const handleDrop = (e) => {
      //     let dt = e.dataTransfer
      //     let files = dt.files
      //     if (files[0].type === 'image/png' || files[0].type === 'image/jpeg') {
      //         // Compress the NFT
      //         imageConversion.compressAccurately(files[0], 512).then(async res=>{
      //             console.log("Compressed", res);
      //             this.setState({ new_image: res });
      //         });
      //     } else {
      //         this.setState({ new_image: files[0] });
      //     }

      //     handleFiles(files)
      // }

      // dropArea.addEventListener('drop', handleDrop, false)

      const networkId = await web3.eth.net.getId()
      const networkData = ZonuletNFT.networks[networkId] //
      if (networkData) {
        const abi = ZonuletNFT.abi
        const address = networkData.address
        const contract = new web3.eth.Contract(abi, address)
        // console.log(contract)
        this.setState({ contract })
        const totalSupply = await contract.methods.totalSupply().call()
        // console.log(totalSupply)
        this.setState({ totalSupply })

        this.setState({ new_price: 10 }) // Default ZONU Price on new fresh mints

        // Load NFTs
        for (var i = 1; i <= totalSupply; i++) {
          const id = await contract.methods.images(i - 1).call()
          // console.log(id)
          this.setState({
            images: [...this.state.images, id],
          })
        }
        // Load Owner
        for (i = 1; i <= totalSupply; i++) {
          const owner = await contract.methods.ownerOf(i - 1).call()
          // console.log(owner)
          this.setState({
            owners: [...this.state.owners, owner],
          })
        }
        // Load NFTs Data
        for (i = 1; i <= totalSupply; i++) {
          const metadata = await contract.methods.imageData(i - 1).call()
          // console.log(metadata)
          this.setState({
            imageData_name: [...this.state.imageData_name, metadata.name],
            imageData_ipfsData: [...this.state.imageData_ipfsData, metadata.ipfsData],
            imageData_price: [...this.state.imageData_price, metadata.price],
          })
        }
      } else {
        // window.alert('Smart contract not deployed to detected network.')
      }

      const sale_networkData = ZonuletNFTSale.networks[networkId]
      if (sale_networkData) {
        const sale_abi = ZonuletNFTSale.abi
        const sale_address = sale_networkData.address
        const sale_contract = new web3.eth.Contract(sale_abi, sale_address)
        // console.log(sale_contract)
        this.setState({ sale_contract })
      } else {
        // window.alert('Smart contract not deployed to detected network.')
      }
    }
  }

  mintImage = () => {
    let file = ''
    let mimetype = ''
    let hash = ''

    const INFURA_ID = process.env.REACT_APP_INFURA_ID
    const INFURA_SECRET_KEY = process.env.REACT_APP_INFURA_SECRET_KEY
    const auth = `Basic ${Buffer.from(INFURA_ID + ':' + INFURA_SECRET_KEY).toString("base64")}`

    this.setState({ txpend: true })
    this.setState({ txs: 1 })

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

      // 2 MB Max File Size Limit
      if (file.size > 2000000) {
        alert('Image size is too large')
        this.setState({ txpend: false })
        this.setState({ txs: 0 })
        return
      }

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

      if (file === null || file === '' || typeof file === 'undefined') {
        // Do nothing if Buffer is empty or null
        return
      } else if (
        this.state.new_url === '' ||
        this.state.new_des === '' ||
        this.state.new_name === '' ||
        this.state.new_category === '' ||
        this.state.new_price === ''
      ) {
        // alert('Please fill in all fields!')
        toast.warning("Please fill in all fields!")
        this.setState({ txpend: false })
        this.setState({ txs: 0 })
        return
      } else if (this.state.isAgree === false) {
        alert('Please check the box to agree that the NFT is your IP!')
        this.setState({ txpend: false })
        this.setState({ txs: 0 })
        return
      } else {
        function progressCall(data) {
          var totalsize = file.length

          //console.log(totalsize);

          document.getElementById('progress').innerHTML =
            'Preparing and Uploading NFT to IPFS <strong>' +
            (data / 1000000).toFixed(2) +
            ' MB</strong> out of <strong>' +
            (totalsize / 1000000).toFixed(2) +
            ' MB</strong>'

          // console.log('uploaded progress: ' + data);
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

        console.log(this.state.new_category)

        fetch('https://ipfs.infura.io:5001/api/v0/pin/add?arg=/ipfs/' + hash, {
          credentials: 'omit',
          method: 'POST',
          credentials: 'omit',
          method: 'POST',
          headers: {
            "Authorization": `Basic ${Buffer.from(INFURA_ID + ':' + INFURA_SECRET_KEY).toString("base64")}`
          }
        })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data)
            if (hash != null && typeof hash != 'undefined') {
              this.state.contract.methods
                .mint(
                  this.state.new_name,
                  mimetype,
                  hash,
                  this.state.new_category,
                  this.state.new_des,
                  this.state.new_url,
                  this.state.new_price,
                )
                .send({ from: this.state.account })
                .once('receipt', receipt => {
                  // console.log(receipt);
                  // console.log(receipt.events.Transfer.returnValues.tokenId);
                  const tokenId = receipt.events.Transfer.returnValues.tokenId
                  toast.success("NFT Created, Sweet!")
                  document.getElementById('progress').innerHTML =
                    "<strong>Successfully minted your new NFT!<br /><a href='https://matic.zonulet.io/nft/" +
                    tokenId +
                    "' style='color:#89b9ff;text-decoration: none;'>Go to your new NFT #" +
                    tokenId +
                    '</a> to list it for sale!</strong>'
                  this.setState({ txpend: false })
                  this.setState({ txs: 0 })
                  this.handlerFire()
                })
                .catch(error => {
                  console.error('Error:', error)
                  this.setState({ txpend: false })
                  this.setState({ txs: 0 })
                })
            }
          })
          .catch(error => {
            console.error('Error:', error)
            this.setState({ txpend: false })
            this.setState({ txs: 0 })
          })

        // localStorage.setItem(this.state.new_name, hash);
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

      if (
        file.type != 'image/png' &&
        file.type != 'image/jpeg' &&
        file.type != 'image/gif' &&
        file.type != 'video/mp4' &&
        header != '676c5446'
      ) {
        cb(null)
        alert('You can only currently mint a NFT that is a png, jpeg, gif, mp4, or glb!')
        window.location.reload()
        return
      }
      if (header === '676c5446') {
        // setState of modelmime
      }

      function getMimetype(signature) {
        switch (signature) {
          case '89504E47':
            return 'image/png'
          case '47494638':
            return 'image/gif'
          case '25504446':
            return 'application/pdf'
          case 'FFD8FFDB':
          case 'FFD8FFE0':
            return 'image/jpeg'
          case '6674797069736F6D':
            return 'video/mp4'
          case '676c5446':
            return 'model/gltf-binary'
          case '504B0304':
            return 'application/zip'
          default:
            return 'Unknown filetype'
        }
      }
    
    }
    reader.readAsArrayBuffer(file)
  }
}
export default Draw
