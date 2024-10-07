const { ethers } = require("hardhat");

async function main () {
    const contractAddress = '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9';
    const _token = await ethers.getContractFactory("DBToken");
    const token = _token.attach(contractAddress);

    console.log("Minting tokens...");
    await token.mint();

    console.log("Token successfully issued.");
    console.log("Issuing Agent - ", issuingAgent, "ERC20 Token Balance: ", await Token.viewIssuerBalance());
}

// Execute the main function, handle errors, and end cleanly
main()
    .then(() => process.exit(0))
    .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
});