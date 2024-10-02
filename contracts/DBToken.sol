// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
/** 
 * @title Digital Asset
 * @author Spencer-a Clarke
 * @notice ERC20 Smart Contract for Bank on Tech proof of concept
 * @dev --notes for dev--
 * @param documents a functions parameters
 * @return documents the return of a function
 * @inheritdoc inherit comments regarding another contract
*/

pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DBToken is ERC20, ERC20Burnable, Ownable {

    string public tokenName;
    string public tokenSymbol;
    uint256 public initialSupply;
    address private contractOwner;
    address private issuingAgent;
    
    // Deployment and ERC20 Initialization
    constructor(
        string memory _tokenName, 
        string memory _tokenSymbol, 
        uint256 _initialSupply)
        ERC20(_tokenName, _tokenSymbol)
        Ownable()
    {
        tokenName = _tokenName;
        tokenSymbol = _tokenSymbol;
        initialSupply = _initialSupply;
        contractOwner = msg.sender;
    }

    // Mint
    function mint() public onlyOwner returns(bool) {
        _mint(contractOwner, initialSupply);
        return true;
    }
}