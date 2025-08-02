const { ethers, upgrades } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const Loyal = await ethers.getContractFactory("Loyal");
  const loyal = await upgrades.deployProxy(Loyal, [deployer.address], { initializer: "initialize" });

  await loyal.waitForDeployment();

  // This is the correct way to get the proxy address in Ethers v6
  const proxyAddress = await loyal.getAddress();
  console.log("Loyal deployed to:", proxyAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});