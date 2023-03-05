const TokenFactory = artifacts.require('TokenFactory')
const PriceFeeder = artifacts.require('PriceFeeder')
const MockToken = artifacts.require("MockToken")
const Perpetual = artifacts.require('Perpetual')
const FundingCalculator = artifacts.require('FundingCalculator');
const AMM = artifacts.require('AMM');


module.exports = async (deployer, network, accounts) => {

    if (network === "development" || network === "scrollTestnet") {

        const admin = accounts[0]

        // Setup account factory
       await deployer.deploy(TokenFactory, {
            from: admin
        });
        const tokenFactoryInstance = await TokenFactory.deployed();

        // Setup Colleteral Token || WMATIC ~ USD
        await deployer.deploy(
            MockToken,
            "Fake Scroll USD",
            "FUSD",
            {
                from: admin
            })
        const ColleteralInstance = await MockToken.deployed();

        // Setup Oracle
        await deployer.deploy(
            PriceFeeder,
            "Dow Jones Index",
            {
                from: admin
            })
        const PriceFeederInstance = await PriceFeeder.deployed();
        // Setup Perpetual Contract
        await deployer.deploy(
            Perpetual,
            MockToken.address,
            PriceFeeder.address,
            {
                from: admin
            })

        const PerpetualInstance = await Perpetual.deployed();

        // Setup AMM
        await deployer.deploy(
            AMM,
            "Dow Scroll Index Perpetual",
            "DOW-SCROLL",
            TokenFactory.address,
            PriceFeeder.address,
            Perpetual.address,
            {
                from: admin
            })

        const AMMInstance = await AMM.deployed();

        // Setup Funding Calculator
        await deployer.deploy(
            FundingCalculator,
            AMM.address,
            {
                from: admin
            })

        const FundingCalculatorInstance = await FundingCalculator.deployed();

        await AMMInstance.setFundingCalculator(FundingCalculatorInstance.address, { from: admin })

        await PerpetualInstance.setupAmm(AMMInstance.address, { from: admin })

        // Setup initial values
        await PriceFeederInstance.updateValue(web3.utils.toWei("30000"), { from: admin });
        await PriceFeederInstance.confirmValueUpdate({ from: admin });
        await ColleteralInstance.approve( PerpetualInstance.address , '9999999999999999999999999999', {from :admin})


        await PerpetualInstance.deposit(web3.utils.toWei("70000"), { from: admin })
        await AMMInstance.createPool(web3.utils.toWei("1"), {
            from: admin
        });

        console.log("token factory", tokenFactoryInstance.address);
        console.log("Colateral Address", ColleteralInstance.address);
        console.log("Price Feeder Address", PriceFeederInstance.address);
        console.log("Perpetual Address", PerpetualInstance.address);
        console.log("AMM Address", AMMInstance.address);
        console.log("Funding Calculator Address", FundingCalculatorInstance.address);

    }


}