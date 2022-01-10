// https://eth-ropsten.alchemyapi.io/v2/DYKbpc-1MKTHRrXYeMbD_pMNdRqKPpOx

require("@nomiclabs/hardhat-waffle")

module.exports = {
  solidity: "0.8.0",
  networks: {
    ropsten: {
      url: "https://eth-ropsten.alchemyapi.io/v2/DYKbpc-1MKTHRrXYeMbD_pMNdRqKPpOx",
      account:["6af3be001deb6e45d8f4a1b5e9fe00943daaf68449718eff604941eb7c9187d1"]
    }
  }
}