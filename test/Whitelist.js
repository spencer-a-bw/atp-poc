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
    dbWhitelist = await ethers.getContractFactory("whitelist");
    whitelist = dbWhitelist.deploy();
    whitelist.addToWhitelist(owner.address);
    whitelist.addToWhitelist(investorA.address);
    whitelist.addToWhitelist(investorB.address);

    // Deploy and mint token
    dbToken = await ethers.getContractFactory("DBToken");
    token = await dbToken.deploy(tokenName, tokenSymbol, initialSupply);
    await token.deployed();
    await token.mint();
    console.log('Owner:', owner.address);
    console.log('Investor A:', investorA.address);
    console.log('Investor B:', investorB.address);
    console.log('Blocked address:', blockedAddress.address)
    console.log('Whitelist contract:', whitelist.address);
    console.log('Token Contract:', token.address);
  });

  it("Only whitelisted accounts can transfer tokens.", async function () {
    await token.transferToken(investorA.address, transferAmount);
    console.log(await token.viewBalance(investorA.address));
    await token.connect(investorA).transferToken(investorB.address, transferAmount)
    console.log(await token.viewBalance(investorB.address));
    // await token.transferToken(blockedAddress.address, transferAmount);
  });

});