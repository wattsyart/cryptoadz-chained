require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter");
require("solidity-coverage");

require("./tasks/tasks.js");

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
  networks: {
    hardhat: {
      gas: "auto",
      blockGasLimit: 900_000_000_000,
      initialBaseFeePerGas: 0,
      timeout: 43200000
    }
  },
  solidity: {
    version: "0.8.13",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1
      }
    }
  },
  mocha: {
    timeout: 2000000000
  },
  gasReporter: {
    currency: 'ETH',
    gasPriceApi: 'https://api.etherscan.io/api?module=proxy&action=eth_gasPrice',
    coinmarketcap: 'COINMARKETCAP_API_KEY'
  }
};

