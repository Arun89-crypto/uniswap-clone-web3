require("@nomiclabs/hardhat-waffle");


/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    solidity: "0.8.4",
    networks: {
        rinkeby: {
            url: "https://eth-rinkeby.alchemyapi.io/v2/NMQTe34rIFeFdPruVpoqjQHhU0G11K5x",
            accounts: [
                '6e96bd2242a939fe98149cc8e736170555cbd32e102e2d52fe1d004ac04eb356'
            ]
        }
    }
};
