async function main() {
  
    const _token = await ethers.getContractFactory("DBToken");
    const token = await _token.deploy("Test Token", "TST", 100000);
    await token.deployed();
  
    console.log("TokenizedBond deployed to:", token.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });