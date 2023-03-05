
# Deploy your Dapp on Infura with MetaMask and Truffle Dashboard
## Video Tutorial: https://youtu.be/ZUqpU-_4inc
# Truffle Dashboard

## Installation

Run the `truffle dahsbnoard`

```sh
$ truffle dahsbnoard
```

## In separate  terminal 

```sh
$ cd truffle
$ truffle migrate --network dashboard
```

Result 
```sh

Starting migrations...
======================
> Network name:    'dashboard'
> Network id:      5001
> Block gas limit: 30000000 (0x1c9c380)


1_migrations.js
===============

   Replacing 'Migrations'
   ----------------------
   > transaction hash:    0x8b757ca48bfbc80f9abbecbb90a22b38cadb2518e7238c8ebaf59017a4c94522sage.
   > Blocks: 0            Seconds: 0
   > contract address:    0x85F5739fa1Db8FBBaDEe8673065C6980a28e40B7
   > block number:        661202
   > block timestamp:     1677382041
   > account:             0xE8596204d3F66DF17452BdfA796b0e03C27E9DbA
   > balance:             958.063665711159801557
   > gas used:            250142 (0x3d11e)
   > gas price:           0.000000001 gwei
   > value sent:          0 ETH
   > total cost:          0.000000000000250142 ETH

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:     0.000000000000250142 ETH


2_deploy_contracts.js
=====================
:: Deploying Base ZonuletNFT

   Replacing 'ZonuletNFT'
   ----------------------
   > transaction hash:    0x26323a99128521a38109dec7ea801dfde9fd3a8ba266f493f8414fb16feff34asage.
   > Blocks: 11           Seconds: 25
   > contract address:    0x9585ded5626a6A9b9D462483cd022043A6Da2B2a
   > block number:        661215
   > block timestamp:     1677382089
   > account:             0xE8596204d3F66DF17452BdfA796b0e03C27E9DbA
   > balance:             958.063665689095501013
   > gas used:            3764219 (0x396ffb)
   > gas price:           0.000000001 gwei
   > value sent:          0 ETH
   > total cost:          0.000000000003764219 ETH


:: Deploying ZonuletNFTSale

   Replacing 'ZonuletNFTSale'
   --------------------------
   > transaction hash:    0xd359682e4de624e886b6fa95b152ac4fd060eccbe8e1fc944586becd630c258bsage.
   > Blocks: 4            Seconds: 30
   > contract address:    0x3E9a2183Ad88F859B800CAef970A68D2Cc88E382
   > block number:        661218
   > block timestamp:     1677382121
   > account:             0xE8596204d3F66DF17452BdfA796b0e03C27E9DbA
   > balance:             958.063665683048825651
   > gas used:            1141782 (0x116c16)
   > gas price:           0.000000001 gwei
   > value sent:          0 ETH
   > total cost:          0.000000000001141782 ETH


:: Deploying ZonuletNFTLikes

   Replacing 'ZonuletNFTLikes'
   ---------------------------
   > transaction hash:    0x93971a42588d2df4870fadfe55180f3f10158b13cf19274f5286ff244619b1bbsage.
   > Blocks: 3            Seconds: 25
   > contract address:    0x223e95C3fed9bF11320bD4B8F14cb3bAd667E6b1
   > block number:        661222
   > block timestamp:     1677382146
   > account:             0xE8596204d3F66DF17452BdfA796b0e03C27E9DbA
   > balance:             958.063665678168919109
   > gas used:            935338 (0xe45aa)
   > gas price:           0.000000001 gwei
   > value sent:          0 ETH
   > total cost:          0.000000000000935338 ETH


:: Deploying ZonuletAvatars

   Replacing 'ZonuletAvatars'
   --------------------------
   > transaction hash:    0xe2080f7e23303e7d4d4db3e78d8516d33d502be9dd975431bd5064a1d7f0d449sage.
   > Blocks: 3            Seconds: 23
   > contract address:    0xf0a8220053541901e76Acb951a2F9442A12C5b27
   > block number:        661225
   > block timestamp:     1677382174
   > account:             0xE8596204d3F66DF17452BdfA796b0e03C27E9DbA
   > balance:             958.063665671910991139
   > gas used:            1201423 (0x12550f)
   > gas price:           0.000000001 gwei
   > value sent:          0 ETH
   > total cost:          0.000000000001201423 ETH


:: Deploying ZonuletVerified

   Replacing 'ZonuletVerified'
   ---------------------------
   > transaction hash:    0x7e62b54d2b56df3801aaf4fc1c043b348ed2705be7ddb5d93429a6decb074168sage.
   > Blocks: 10           Seconds: 27
   > contract address:    0xB0b5ECFCf6B4e3A1a89024471B3f0B63Be09a2b6
   > block number:        661233
   > block timestamp:     1677382207
   > account:             0xE8596204d3F66DF17452BdfA796b0e03C27E9DbA
   > balance:             958.063665669995222753
   > gas used:            373082 (0x5b15a)
   > gas price:           0.000000001 gwei
   > value sent:          0 ETH
   > total cost:          0.000000000000373082 ETH


:: Deploying ZonuletBlacklist

   Replacing 'ZonuletBlacklist'
   ----------------------------
   > transaction hash:    0x2d0c7175a6e4215bcc601ce5535e3d14b5e5574f52b3acf68edfa70158855fd1sage.
   > Blocks: 8            Seconds: 24
   > contract address:    0x2d853c9f9086e36676C90aEA7819F10E16e2Ba15
   > block number:        661243
   > block timestamp:     1677382239
   > account:             0xE8596204d3F66DF17452BdfA796b0e03C27E9DbA
   > balance:             958.063665667708411583
   > gas used:            503220 (0x7adb4)
   > gas price:           0.000000001 gwei
   > value sent:          0 ETH
   > total cost:          0.00000000000050322 ETH


:: Deploying ZonuletZDEX

   Replacing 'ZonuletZDEX'
   -----------------------
   > transaction hash:    0xf7eb2f0a96f78a83ae7ce466d47372d2df37cfce414da2964175f45d6e1f6a8csage.
   > Blocks: 4            Seconds: 29
   > contract address:    0xFC1fDf7E9310CAdfA27d3bfaF774d952357547f6
   > block number:        661247
   > block timestamp:     1677382268
   > account:             0xE8596204d3F66DF17452BdfA796b0e03C27E9DbA
   > balance:             958.063665663366395513
   > gas used:            964656 (0xeb830)
   > gas price:           0.000000001 gwei
   > value sent:          0 ETH
   > total cost:          0.000000000000964656 ETH

=====================Finished============================
 NFT Base:  0x9585ded5626a6A9b9D462483cd022043A6Da2B2a
 NFT Likes: 0x223e95C3fed9bF11320bD4B8F14cb3bAd667E6b1
 NFT Sale:  0x3E9a2183Ad88F859B800CAef970A68D2Cc88E382
 Avatars:   0xf0a8220053541901e76Acb951a2F9442A12C5b27
 Verified:  0xB0b5ECFCf6B4e3A1a89024471B3f0B63Be09a2b6
 Blacklist: 0x2d853c9f9086e36676C90aEA7819F10E16e2Ba15
 ZDEX:      0xFC1fDf7E9310CAdfA27d3bfaF774d952357547f6
==========================================================
   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:     0.00000000000888372 ETH

Summary
=======
> Total deployments:   8
> Final cost:          0.000000000009133862 ETH

```

