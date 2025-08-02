// Replace with your deployed contract address:
const CONTRACT_ADDRESS = " Your Contract Adress";

// Replace with your contract ABI:
const CONTRACT_ABI =  [ Your ABI Here ];

let provider, signer, contract, userAddress;

const connectButton = document.getElementById('connectButton');
const walletAddressDiv = document.getElementById('walletAddress');
const balanceDiv = document.getElementById('balance');
const actionsDiv = document.getElementById('actions');
const statusDiv = document.getElementById('status');
const addTokenButton = document.getElementById('addTokenButton');

connectButton.onclick = async () => {
  if (window.ethereum) {
    provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = await provider.getSigner();
    userAddress = await signer.getAddress();
    walletAddressDiv.innerText = "Connected: " + userAddress;
    contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    actionsDiv.style.display = "block";
    updateBalance();
    statusDiv.innerText = "";
  } else {
    statusDiv.innerText = "MetaMask not found!";
  }
};

async function updateBalance() {
  if (!contract || !userAddress) return;
  try {
    const balance = await contract.balanceOf(userAddress);
    // Format the balance to 5 decimal places
    const formatted = Number(ethers.formatUnits(balance, 18)).toFixed(5);
    balanceDiv.innerText = "Your Loyal Balance: " + formatted;
  } catch (e) {
    balanceDiv.innerText = "Error fetching balance.";
  }
}

// Mint
document.getElementById('mintButton').onclick = async () => {
  const amount = document.getElementById('mintAmount').value;
  if (!amount || isNaN(amount) || Number(amount) <= 0) {
    statusDiv.innerText = "Enter a valid amount to mint.";
    return;
  }
  statusDiv.innerText = "Minting...";
  try {
    const tx = await contract.mint(userAddress, ethers.parseUnits(amount, 18));
    await tx.wait();
    statusDiv.innerText = "Minted!";
    updateBalance();
  } catch (e) {
    statusDiv.innerText = "Mint failed: " + (e.info?.error?.message || e.message);
  }
};

// Burn
document.getElementById('burnButton').onclick = async () => {
  const amount = document.getElementById('burnAmount').value;
  if (!amount || isNaN(amount) || Number(amount) <= 0) {
    statusDiv.innerText = "Enter a valid amount to burn.";
    return;
  }
  statusDiv.innerText = "Burning...";
  try {
    const tx = await contract.burn(ethers.parseUnits(amount, 18));
    await tx.wait();
    statusDiv.innerText = "Burned!";
    updateBalance();
  } catch (e) {
    statusDiv.innerText = "Burn failed: " + (e.info?.error?.message || e.message);
  }
};

// Redeem
document.getElementById('redeemButton').onclick = async () => {
  const amount = document.getElementById('redeemAmount').value;
  if (!amount || isNaN(amount) || Number(amount) <= 0) {
    statusDiv.innerText = "Enter a valid amount to redeem.";
    return;
  }
  statusDiv.innerText = "Redeeming...";
  try {
    const tx = await contract.redeem(ethers.parseUnits(amount, 18));
    await tx.wait();
    statusDiv.innerText = "Redeemed!";
    updateBalance();
  } catch (e) {
    statusDiv.innerText = "Redeem failed: " + (e.info?.error?.message || e.message);
  }
};

// Add LOYAL token to MetaMask
addTokenButton.onclick = async () => {
  try {
    const wasAdded = await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: CONTRACT_ADDRESS,
          symbol: 'LOYAL',
          decimals: 18,
          image: '', // Optional: add a token logo URL here
        },
      },
    });

    if (wasAdded) {
      statusDiv.innerText = "LOYAL token added to MetaMask!";
    } else {
      statusDiv.innerText = "Token not added.";
    }
  } catch (error) {
    statusDiv.innerText = "Error adding token: " + error.message;
  }
};