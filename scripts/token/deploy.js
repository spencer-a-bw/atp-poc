async function main() {
  
    const _token = await ethers.getContractFactory("DBToken");
    const token = await _token.deploy("Test Token", "TST", 100000);
    await token.deployed();

    const _gas = await token.estimateGas.balanceOf(token.address);
    const gas = _gas * (10 ** 18);
    const _initialSupply = await token.initialSupply();
    const initialSupply = _initialSupply * (10 ** 18);

    console.log("Gas estimate:", gas);
  
    console.log("TokenizedBond deployed to:", token.address);
    console.log(await token.tokenName());
    console.log(await token.tokenSymbol());
    console.log(initialSupply);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });