## Loyal Points – Upgradeable Loyalty Token System ##

A simple, upgradeable ERC20-based loyalty points system called Loyal.
Admins can mint points, users can burn or redeem them, and the contract is upgradeable using the UUPS proxy pattern.
Includes a minimal web frontend for wallet connection and token management.

### Features ###
Upgradeable ERC20 Token (LOYAL) using UUPS proxy pattern
Mint: Only admin/minter can mint new tokens
Burn: Any user can burn their own tokens
Redeem: Any user can redeem tokens for a placeholder reward (event log/counter)
Access Control: Admin and minter roles
Simple Frontend: Connect wallet, view balance, mint, burn, redeem, add token to MetaMask

### Setup Instructions ###

#### 1. Clone the Repository ####

```
git clone https://github.com/yourusername/loyal-loyalty-points.git
cd loyal-loyalty-points

 ```
#### 2. Install Dependencies ####

``` npm install ```

#### 3. Configure Environment Variables ####

Create a .env file in the root directory:

```
ALCHEMY_API_KEY=your-alchemy-api-key
PRIVATE_KEY=your-wallet-private-key
```

#### 4. Compile Contracts ####

``` npx hardhat compile ```

### 5. Deploy Contracts ###

Deploy to Sepolia (or your chosen network):

``` npx hardhat run scripts/deploy.js --network sepolia ```

The script will print your deployed contract address.
Save this address for the frontend.(frontend/app.js)

#### 6. Run the Frontend ####

No build step needed!
Just open frontend/index.html in your browser.

#### Upgradeability Notes: ####

The contract uses the UUPS proxy pattern (OpenZeppelin).
To upgrade, write a new contract version (e.g., LoyalV2.sol), then run:

``` npx hardhat run scripts/upgrade.js --network sepolia ```

note: Only the admin can authorize upgrades.


