const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Whitelist unit testing...", function () {
  let dbWhitelist, whitelist, owner, investorA, investorB, blockedAddress;
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
    await whitelist.addToWhitelist(owner.address);
    await whitelist.addToWhitelist(investorA.address);
    await whitelist.addToWhitelist(investorB.address);

    console.log('Owner:', owner.address);
    console.log('Investor A:', investorA.address);
    console.log('Investor B:', investorB.address);
    console.log('Blocked address:', blockedAddress.address)
    console.log('Whitelist contract:', whitelist.address);
  });

  // it("Add and remove from whitelist functionality works properly.", async function () {
  //   console.log('---CHECK WHITELIST---');
  //   console.log('Whitelist - Owner:', await whitelist.getWhitelist(owner.address));
  //   console.log('Whitelist - Investor A:', await whitelist.getWhitelist(investorA.address));
  //   console.log('Whitelist - Investor B:', await whitelist.getWhitelist(investorB.address));
  //   console.log('Whitelist - Blocked Address:', await whitelist.getWhitelist(blockedAddress.address));
  // });

  // it("Only owner can add to whitelist.", async function () {
  // });

  // it("Only owner can remove from whitelist.", async function () {
  // });

});