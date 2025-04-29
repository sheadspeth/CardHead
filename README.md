Download IPFS Desktop
Go into “Settings”
Change ipfs config
&nbsp;
![ipfs](https://github.com/user-attachments/assets/e55f8700-3bca-47ee-b800-ad39ed3fb757)

Full ipfs config is located in the repository under ipfsconfig
Download VScode
Install MetaMask
Open VScode “Clone Git Repository” to desired destination (we use documents)
open a terminal at root type “ganache --port 7545 --chain.chainId 1337 --chain.networkId 1337”
open a terminal at “CardHead” folder and type “rm -fr build” → “truffle compile”	→ “truffle migrate --reset --network development”
Create an Account
Add a custom network
Network Name: Ganache Local
RPC URL: http://127.0.0.1:7545
Chain ID: 1337
Symbol: ETH
open a new terminal in the CardHead folder that contains index.html type “npm serve .”
Connect Accounts from ganache to MetaMask
![UserPage](https://github.com/user-attachments/assets/e9c1ad51-f56a-41f1-abe9-f5605103dc7f)
