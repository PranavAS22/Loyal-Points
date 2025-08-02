const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("Loyal", function () {
  let loyal, admin, user;

  beforeEach(async function () {
    [admin, user] = await ethers.getSigners();
    const Loyal = await ethers.getContractFactory("Loyal");
    loyal = await upgrades.deployProxy(Loyal, [admin.address], { initializer: "initialize" });
    await loyal.deployed();
  });

  it("should mint tokens by admin", async function () {
    await loyal.connect(admin).mint(user.address, 100);
    expect(await loyal.balanceOf(user.address)).to.equal(100);
  });

  it("should not mint tokens by non-minter", async function () {
    await expect(loyal.connect(user).mint(user.address, 100)).to.be.reverted;
  });

  it("should burn tokens", async function () {
    await loyal.connect(admin).mint(user.address, 100);
    await loyal.connect(user).burn(50);
    expect(await loyal.balanceOf(user.address)).to.equal(50);
  });

  it("should redeem tokens", async function () {
    await loyal.connect(admin).mint(user.address, 100);
    await loyal.connect(user).redeem(30);
    expect(await loyal.balanceOf(user.address)).to.equal(70);
    expect(await loyal.redeemedCount()).to.equal(30);
  });

  it("should not redeem more tokens than balance", async function () {
    await loyal.connect(admin).mint(user.address, 10);
    await expect(loyal.connect(user).redeem(20)).to.be.revertedWith("Not enough tokens to redeem");
  });

  // Add upgrade test here if you make a new version
});