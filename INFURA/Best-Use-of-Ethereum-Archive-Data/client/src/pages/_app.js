import { Fragment, FunctionComponent } from 'react'
import { NextComponentType, NextPageContext } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Fragment>
        <Head>
          <meta charSet="utf-8" />
          <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <meta httpEquiv="cache-control" content="max-age=0" />
          <meta httpEquiv="cache-control" content="no-cache" />
          <meta httpEquiv="expires" content="0" />
          <meta httpEquiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
          <meta httpEquiv="pragma" content="no-cache" />
          <title>Zonulet Official</title>
          <meta name="description" content="Zonulet NFT Marketplace - Buy and Sell NFTs on the Mantle Blockchain with ZONU"/>
          <meta property="og:description" content="Zonulet NFT Marketplace - Your Favorite Nft Marketplace You Have Not Seen Yet" />
          <meta property="og:image" content="https://zonulet.infura-ipfs.io/ipfs/QmWKP6ZKCxjW6BV4ct2UEvzXJbRfVLqqv5r1g4acfL1pZK" />
          <meta property="og:image:type" content="image/jpeg" />
          <meta property="og:video" content="https://zonulet.infura-ipfs.io/ipfs/QmWUoozJQAYKWc8mDsSKfBKfgvzfLsVHew4eZoUSm42hS9" />
          <meta property="og:video:type" content="video/mp4" />
          <meta property="og:title" content="Zonulet NFT Marketplace" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Zonulet NFT Marketplace" />
          <meta property="og:locale" content="en_US" />
          <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
          <link rel="apple-touch-icon" href="%PUBLIC_URL%/zooblue.png" />
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300&family=Roboto:wght@100&display=swap"
            rel="stylesheet"
          />

          <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />

          <script>window.prerenderReady = false;</script>
          <script
            src="https://cdn.jsdelivr.net/npm/jdenticon@3.1.1/dist/jdenticon.min.js"
            async
            integrity="sha384-l0/0sn63N3mskDgRYJZA6Mogihu0VY3CusdLMiwpJ9LFPklOARUcOiWEIGGmFELx"
          ></script>
          <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet" />
        </Head>
      </Fragment>
    </>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp
