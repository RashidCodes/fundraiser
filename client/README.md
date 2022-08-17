# Learning about Web3 

Note the difference in the following ```web3``` declarations.

<br/>

```javascript
// import getWeb3 from "./utils/getWeb3.js
const web3 = getWeb3();

// import Web3 from "web3"
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
```