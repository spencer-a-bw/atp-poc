const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DBToken unit testing...", function () {
  let dbToken, token, owner, issuingAgent, investorA, investorB;
  const tokenName = "DB Token";
  const tokenSymbol = "DBT";
  const initialSupply = 100000;
  const transferAmount = 100;


  beforeEach(async function () {
    // Initiate accounts
    [owner, investorA, investorB, blockedAddress] = await ethers.getSigners();

    // Deploy whitelist and onboard addresses
    dbWhitelist = await ethers.getContractFactory("Whitelist");
    whitelist = await dbWhitelist.deploy();
    // owner is added to whitelist upon deployment of whitelist smart contract
    await whitelist.addToWhitelist(investorA.address);
    await whitelist.addToWhitelist(investorB.address);

    // Deploy and register contract, mint token, and integrate whitelist contract
    dbToken = await ethers.getContractFactory("DBToken");
    token = await dbToken.deploy(tokenName, tokenSymbol, initialSupply, whitelist.address);
    await token.deployed();

    console.log('Owner:', owner.address);
    console.log('Investor A:', investorA.address);
    console.log('Investor B:', investorB.address);
    console.log('Blocked address:', blockedAddress.address)
    console.log('Whitelist contract:', whitelist.address);
    console.log('Token Contract:', token.address);
    console.log('Whitelist - Owner:', await whitelist.getWhitelist(owner.address));
    console.log('Whitelist - Investor A:', await whitelist.getWhitelist(investorA.address));
    console.log('Whitelist - Investor B:', await whitelist.getWhitelist(investorB.address));
    console.log('Whitelist - Blocked Address:', await whitelist.getWhitelist(blockedAddress.address));
  });

  it("Only whitelisted accounts can transfer tokens.", async function () {
    await token.transferToken(investorA.address, transferAmount);
    console.log(await token.balanceOf(investorA.address));
    await token.connect(investorA).transferToken(investorB.address, transferAmount)
    console.log(await token.balanceOf(investorB.address));
    // await token.transferToken(blockedAddress.address, transferAmount);
  });

});