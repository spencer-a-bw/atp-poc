const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DBToken", function () {
  let dbToken, token, owner, addr1, addr2;
  const tokenName = "DB Token";
  const tokenSymbol = "DBT";
  const initialSupply = 100000;

  beforeEach(async function () {
    dbToken = await ethers.getContractFactory("DBToken");
    [owner, addr1, addr2] = await ethers.getSigners();
    token = await dbToken.deploy(tokenName, tokenSymbol, initialSupply);
    await token.deployed();
    console.log('owner', owner.address);
    console.log('addr1', addr1.address);
    console.log('addr2', addr2.address);
    console.log('contract', token.address);
  });

  
  it("Should deploy with the appropriate tokenName, tokenSymbol, and initialSupply.", async function () {
    const _tokenName = await token.tokenName();
    const _tokenSymbol = await token.tokenSymbol();
    const _initialSupply = await token.initialSupply();
    expect(_tokenName).to.equal(tokenName);
    expect(_tokenSymbol).to.equal(tokenSymbol);
    expect(_initialSupply.toNumber()).to.equal(initialSupply);
  });

  it("Should mint the initialSupply in the owner's public address.", async function () {
    await token.mint();
    
    const _balanceOf = await token.balanceOf(owner.address);
    expect(_balanceOf.toNumber()).to.equal(initialSupply);
  });
});