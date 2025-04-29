1)Download IPFS Desktop
Go into “Settings”
Change ipfs config
<br>

![ipfs](https://github.com/user-attachments/assets/e55f8700-3bca-47ee-b800-ad39ed3fb757)

Full ipfs config is located in the repository under ipfsconfig

2) Download VScode
<br>
3) Install MetaMask
<br>
4)Open VScode “Clone Git Repository” to desired destination (we use documents)
<br>
5) Open a terminal at root type “ganache --port 7545 --chain.chainId 1337 --chain.networkId 1337”
<br>
6)open a terminal at “CardHead” folder and type “rm -fr build” → “truffle compile”	→ “truffle migrate --reset --network development”
<br>
7)Create an Account
<br>
8)Add a custom network
<br>
 a. Network Name: Ganache Local
<br>
 b. RPC URL: http://127.0.0.1:7545
<br>
 c. Chain ID: 1337
<br>
 d. Symbol: ETH
<br>
9) Open a new terminal in the CardHead folder that contains index.html type “npm serve .”
<br>
10)Connect Accounts from ganache to MetaMask
<br>
![UserPage](https://github.com/user-attachments/assets/e9c1ad51-f56a-41f1-abe9-f5605103dc7f)
