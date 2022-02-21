# Uniswap Clone

Follow along with Clever Programmer's tutorial video

[https://www.youtube.com/watch?v=xXxjRzdYIss&t=30s&ab_channel=CleverProgrammer]

## Tech used

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
