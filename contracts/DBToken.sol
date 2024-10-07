// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
/** 
 * @title DB Token
 * @author Spencer-a Clarke
 * @notice ERC20 Smart Contract for Bank on Tech proof of concept
 * @dev --notes for dev--
 * @param documents a functions parameters
 * @return documents the return of a function
 * @inheritdoc inherit comments regarding another contract
*/

pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "contracts/Whitelist.sol";
// import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";

contract DBToken is ERC20, Whitelist {

    // Whitelist modifier
    modifier onlyWhitelist(address _passToAddress) {
        whitelistFunc(_passToAddress); 
        _;
    }

    // Deployment and ERC20 registration
    constructor(
        string memory _tokenName,   
        string memory _tokenSymbol, 
        uint256 _initialSupply)
        ERC20(_tokenName, _tokenSymbol)
        Ownable()
    {
        _mint(msg.sender, _initialSupply);
    }

    // Transfer ERC20
    function transferToken(
        address _toAddress,
        uint256 _amount
    ) public onlyWhitelist(_toAddress) returns(bool) {    
        _transfer(msg.sender, _toAddress, _amount);
        return true;
    }
}