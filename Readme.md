# Uniswap Clone

Follow along with Clever Programmer's tutorial video

[https://www.youtube.com/watch?v=xXxjRzdYIss&t=30s&ab_channel=CleverProgrammer]

## Tech used

- Next JS
- Sanity DB
- Solidity
- Hardhat

## Folder Structure

- Client
- Smart_Contract
- Studio

### Sanity installation

- First install sanity

```bash
sudo npm install -g @sanity/cli
```

- Then use cleverprogrammer token (it will provide us with best setup for sanity)

```bash
sanity init --coupon cleverprogrammer
```

- To start Database

```bash
sanity start
```

### How to connect to wallet ?

- First we need to get metamask extension installed in our browser
- The event called when we click on metamask is :

```js
let event = window.ethereum;
```

- Now we will check our browser for meta mask using javascript

```js
let eth;
if (typeof window !== "undefined") {
  eth = window.ethereum;
}
// Here 'eth' variable stores our metamask boolean (present or not)
```

- Now to request the method for connecting to metamask wallet we will use

```js
const accounts = await metamask.request({ method: "eth_requestAccounts" });
```

- And Boom we have our wallet Accounts store in our accounts variable

## Making our smart contract (solidity + hardhat)

- Install hardhat using command (This is also for initialising a new project)

```bash
npx hardhat
```

- In our contracts folder make a contract 'Transaction.sol' and write our contract to transfer money.
- After writing our contract make a script for deploying our contract in 'scripts' folder.
- Then we will deploy our contract using hardhat command :

```bash
npx hardhat run scripts/deploy.js --network rinkeby
```

- To set up the networks we will edit our "hardhat.config.js" file

```js
require("@nomiclabs/hardhat-waffle");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: "alchemy url (http)",
      accounts: ["Account_private_key"],
    },
  },
};
```
