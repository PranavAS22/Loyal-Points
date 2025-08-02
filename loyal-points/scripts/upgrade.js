const { ethers, upgrades } = require("hardhat");

async function main() {
  const proxyAddress = "YOUR_DEPLOYED_PROXY_ADDRESS"; // Replace with your deployed proxy address

  const LoyalV2 = await ethers.getContractFactory("Loyal"); // If you have a new version, use that
  const upgraded = await upgrades.upgradeProxy(proxyAddress, LoyalV2);

  console.log("Loyal upgraded at:", upgraded.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});