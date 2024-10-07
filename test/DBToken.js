const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DBToken unit testing...", function () {
  let dbToken, token, owner, issuingAgent, investorA, investorB, blockedAddress;
  const tokenName = "DB Token";
  const tokenSymbol = "DBT";
  const initialSupply = 100000;
  const transferAmount = 100;


  beforeEach(async function () {
    dbToken = await ethers.getContractFactory("DBToken");
    [owner, issuingAgent, investorA, investorB, blockedAddress] = await ethers.getSigners();
    token = await dbToken.deploy(tokenName, tokenSymbol, initialSupply);
    await token.deployed();
    await token.mint();
    await token.addToWhitelist(owner.address);
    await token.addToWhitelist(investorA.address);
    await token.addToWhitelist(investorB.address);
    console.log('Owner', owner.address);
    console.log('Issuing Agent', issuingAgent.address);
    console.log('Investor A', investorA.address);
    console.log('Investor B', investorB.address);
    console.log('Public address - NOT Whitelisted', blockedAddress.address);
    console.log('Contract', token.address);
  });
  

  it("Should register and deploy with the appropriate tokenName, tokenSymbol, and initialSupply.", async function () {
    const _tokenName = await token.tokenName();
    const _tokenSymbol = await token.tokenSymbol();
    const _initialSupply = await token.initialSupply();
    expect(_tokenName).to.equal(tokenName);
    expect(_tokenSymbol).to.equal(tokenSymbol);
    expect(_initialSupply.toNumber()).to.equal(initialSupply);
  });

  it("Should mint the initialSupply in the owner's public address.", async function () {
    const _balanceOf = await token.balanceOf(owner.address);
    expect(_balanceOf.toNumber()).to.equal(initialSupply);
  });

  // it("Only the contract owner can mint.", async function () {
  //   await expect(token.connect(issuingAgent).mint()).to.be.revertedWith('Ownable: caller is not the owner');
  // });

  it("Should transfer tokens between accounts.", async function () {
    await token.transferToken(investorA.address, transferAmount);

    const _balanceOfInvestorA = await token.viewBalance(investorA.address);
    const _balanceOfOwner = await token.viewBalance(owner.address);

    console.log("Investor A balance:", _balanceOfInvestorA);
    console.log("Owner balance:", _balanceOfOwner);

    expect(_balanceOfInvestorA.toNumber()).to.equal(transferAmount);
    expect(_balanceOfOwner.toNumber()).to.equal(99900);
  });

  it("Only whitelisted addresses can transfer DBToken.", async function () {
    await token.transferToken(investorA.address, transferAmount);
    console.log(await token.viewBalance(investorA.address));
    await token.connect(investorA).transferToken(investorB.address, transferAmount)
    console.log(await token.viewBalance(investorB.address));
    // await token.transferToken(blockedAddress.address, transferAmount);
  });

  // it("Should not allow transfer of tokens from an account with insufficient.", async function () {
  // });

  // it("Should not allow transfer of tokens TO or FROM non whitelisted public addresses.", async function () {
  // });
});