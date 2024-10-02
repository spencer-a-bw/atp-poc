async function main () {

    // Localhost
    // const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
    
    // Sepolia
    const contractAddress = '0x7af70d376C8B97598f160486e13bB9d4f2e1D34D';
    
    const _Token = await ethers.getContractFactory("DigitalAsset");
    const Token = _Token.attach(contractAddress);

    console.log("Minting tokens...");
    await Token.mint();

    console.log("Token successfully minted.");
    console.log("Contract owner ERC20 Token Balance: ", await Token.viewOwnerBalance());
}

// Execute the main function, handle errors, and end cleanly
main()
    .then(() => process.exit(0))
    .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
});