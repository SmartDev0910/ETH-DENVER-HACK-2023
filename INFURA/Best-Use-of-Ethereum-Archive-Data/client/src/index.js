import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { toast, Zoom } from 'react-toastify';
import { unregister as unregisterServiceWorker } from './worker'


import 'react-toastify/dist/ReactToastify.css';
import './index.css'

toast.configure({
  transition: Zoom,
  position: "top-center",
  autoClose: 7000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
});

ReactDOM.render(
  <React.Fragment>
    <App />
  </React.Fragment>,
  document.getElementById('root'),
)

unregisterServiceWorker()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
