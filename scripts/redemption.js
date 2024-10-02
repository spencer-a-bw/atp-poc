async function main () {
    //  Localhost
    // const issuingAgent = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';

    // Sepolia
    const issuingAgent = '0x8206454bfBb833F8Be815806751C97c37875B0D8';

    // Localhost
    // const investorB = '0x90F79bf6EB2c4f870365E785982E1f101E93b906';

    // Sepolia
    const investorB = '0xcB723EA4F940Ce07AabE4fB6675c02BA0bD58E0A';

    const redemptionAmount = 10;

    // Localhost
    // const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
    
    // Sepolia
    const contractAddress = '0x7af70d376C8B97598f160486e13bB9d4f2e1D34D'
    
    const signer = await ethers.getSigner(issuingAgent);
    const _Token = await ethers.getContractFactory("DigitalAsset");
    const Token = _Token.attach(contractAddress);

    await Token.connect(signer).redemption(investorB, redemptionAmount);

    console.log("Token successfully transferred.");
    console.log("Investor B Balance:", await Token.viewBalance(investorB));
    console.log("Issuing Agent Balance:", await Token.viewIssuerBalance());
}

// Execute the main function, handle errors, and end cleanly
main()
    .then(() => process.exit(0))
    .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
});