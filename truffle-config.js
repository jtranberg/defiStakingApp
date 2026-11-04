module.exports = {
  contracts_directory: "./src/contracts",
  contracts_build_directory: "./src/truffle_abis",

  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    }
  },

  mocha: {},

  compilers: {
    solc: {
      version: require.resolve("solc/soljson.js")
    }
  }
};