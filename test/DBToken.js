const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DBToken unit testing...", function () {
  let dbToken, token, DBWhitelist, whitelist, owner, 
  issuingAgent, investorA, investorB, blockedAddress;

  // Register test token variables
  const tokenName = "Test Token";
  const tokenSymbol = "Test";
  const initialSupply = 1000;
  const assetDescription = "";
  const issuerName = "";
  const isinNumber = 12345;
  const tokenPriceEuro = 100;
  const nominalValue = initialSupply * tokenPriceEuro;
  const maturityDate = 365; // Need to fix the math measurement and format for testing
  const yield = 1;

  const transferAmount = 10;


  beforeEach(async function () {
    // Initiate local accounts
    [owner, issuingAgent, investorA, investorB, blockedAddress] = await ethers.getSigners();

    // Deploy DBToken
    dbToken = await ethers.getContractFactory("DBToken");
    token = await dbToken.deploy(tokenName, tokenSymbol, initialSupply, assetDescription, issuerName, isinNumber, tokenPriceEuro, nominalValue, maturityDate, yield);
    await token.deployed();

    // Get whitelist instance from DBToken deployment
    const whitelistAddress = await token.whitelistAddress();
    DBWhitelist = await ethers.getContractFactory("Whitelist");
    whitelist = await DBWhitelist.attach(whitelistAddress);

    // Add investors to whitelist
    await whitelist.addToWhitelist(owner.address);
    await whitelist.addToWhitelist(investorA.address);
    await whitelist.addToWhitelist(investorB.address);

    console.log('Owner:', owner.address);
    console.log('Investor A:', investorA.address);
    console.log('Investor B:', investorB.address);
    console.log('Blocked address:', blockedAddress.address)
    console.log('Whitelist contract:', whitelist.address);
    console.log('Token Contract:', token.address);
    console.log('Whitelist - Owner:', await whitelist.connect(owner.address).getWhitelist(owner.address));
    console.log('Whitelist - Investor A:', await whitelist.connect(owner.address).getWhitelist(investorA.address));
    console.log('Whitelist - Investor B:', await whitelist.connect(owner.address).getWhitelist(investorB.address));
    console.log('Whitelist - Blocked Address:', await whitelist.connect(owner.address).getWhitelist(blockedAddress.address));
  });

  it("Should register and deploy with the appropriate tokenName, tokenSymbol, and initialSupply.", async function () {
    const _tokenName = await token.name();
    const _tokenSymbol = await token.symbol();
    const _initialSupply = await token.totalSupply() / 10 ** 18;
    expect(_tokenName).to.equal(tokenName);
    expect(_tokenSymbol).to.equal(tokenSymbol);
    expect(_initialSupply).to.equal(initialSupply);
  });

  it("Should mint the initialSupply in the owner's public address.", async function () {
    const _balanceOf = await token.balanceOf(owner.address) / 10 ** 18;
    expect(_balanceOf).to.equal(initialSupply);
  });

  it("Only whitelisted accounts can transfer tokens.", async function () {
    await token.transferToken(investorA.address, transferAmount);
    console.log(await token.balanceOf(investorA.address) / 10 ** 18);
    await token.connect(investorA).transferToken(investorB.address, transferAmount)
    console.log(await token.balanceOf(investorB.address) / 10 ** 18);
    // await token.transferToken(blockedAddress.address, transferAmount);
  });

  // it("Only the contract owner can mint.", async function () {
  //   await expect(token.connect(issuingAgent).mint()).to.be.revertedWith('Ownable: caller is not the owner');
  // });

  // it("Should not allow transfer of tokens to or from a non-whitelisted public address.", async function () {
  // });

  // it("Should not allow transfer of tokens from an account with insufficient.", async function () {
  // });
});