const ZonuletNFT = artifacts.require('ZonuletNFT')
const ZonuletNFTSale = artifacts.require('ZonuletNFTSale')
const ZonuletNFTLikes = artifacts.require('ZonuletNFTLikes')
const ZonuletAvatars = artifacts.require('ZonuletAvatars')
const ZonuletVerified = artifacts.require('ZonuletVerified')
const ZonuletBlacklist = artifacts.require('ZonuletBlacklist')
const ZonuletZDEX = artifacts.require('ZonuletZDEX')

const argValue = (arg, defaultValue) =>
  process.argv.includes(arg) ? process.argv[process.argv.indexOf(arg) + 1] : defaultValue
const network = () => argValue('--network', 'local')

module.exports = async function(deployer) {

  console.log(':: Deploying Base ZonuletNFT')
  await deployer.deploy(ZonuletNFT)
  const ZonuletNFTInstance = await ZonuletNFT.deployed()

  console.log()
  console.log(':: Deploying ZonuletNFTSale')
  await deployer.deploy(ZonuletNFTSale, ZonuletNFTInstance.address)
  const ZonuletNFTSaleInstance = await ZonuletNFTSale.deployed()

  console.log()
  console.log(':: Deploying ZonuletNFTLikes')
  await deployer.deploy(ZonuletNFTLikes, ZonuletNFTInstance.address)
  const ZonuletNFTLikesInstance = await ZonuletNFTLikes.deployed()

  console.log()
  console.log(':: Deploying ZonuletAvatars')
  await deployer.deploy(ZonuletAvatars)
  const ZonuletAvatarsInstance = await ZonuletAvatars.deployed()

  console.log()
  console.log(':: Deploying ZonuletVerified')
  await deployer.deploy(ZonuletVerified)
  const ZonuletVerifiedInstance = await ZonuletVerified.deployed()

  console.log()
  console.log(':: Deploying ZonuletBlacklist')
  await deployer.deploy(ZonuletBlacklist)
  const ZonuletBlacklistInstance = await ZonuletBlacklist.deployed()

  console.log()
  console.log(':: Deploying ZonuletZDEX')
  await deployer.deploy(ZonuletZDEX)
  const ZonuletZDEXInstance = await ZonuletZDEX.deployed()
  
  console.log('=====================Finished============================')
  console.log(` NFT Base:  ${ZonuletNFTInstance.address}`)
  console.log(` NFT Likes: ${ZonuletNFTLikesInstance.address}`)
  console.log(` NFT Sale:  ${ZonuletNFTSaleInstance.address}`)
  console.log(` Avatars:   ${ZonuletAvatarsInstance.address}`)
  console.log(` Verified:  ${ZonuletVerifiedInstance.address}`)
  console.log(` Blacklist: ${ZonuletBlacklistInstance.address}`)
  console.log(` ZDEX:      ${ZonuletZDEXInstance.address}`)
  console.log('==========================================================')
}
