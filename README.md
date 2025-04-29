1) Download IPFS Desktop
 a. Go into “Settings”
 b.Change ipfs config
<br>
![ipfs](https://github.com/user-attachments/assets/e55f8700-3bca-47ee-b800-ad39ed3fb757)

Full ipfs config is located in the repository under ipfsconfig
<br>
2)Download VScode
3)Install MetaMask
4)Open VScode “Clone Git Repository” to desired destination (we use documents)
5) Open a terminal at root type “ganache --port 7545 --chain.chainId 1337 --chain.networkId 1337”
6)open a terminal at “CardHead” folder and type “rm -fr build” → “truffle compile”	→ “truffle migrate --reset --network development”
7)Create an Account
8)Add a custom network
 a. Network Name: Ganache Local
 b. RPC URL: http://127.0.0.1:7545
 c. Chain ID: 1337
 d. Symbol: ETH
9) Open a new terminal in the CardHead folder that contains index.html type “npm serve .”
10)Connect Accounts from ganache to MetaMask
![UserPage](https://github.com/user-attachments/assets/e9c1ad51-f56a-41f1-abe9-f5605103dc7f)
