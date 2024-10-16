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
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Whitelist.sol";
// import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract DBToken is ERC20, Ownable {

    Whitelist private whitelistContract;
    address public whitelistAddress;

    string public assetDescription;
    string public issuerName;
    uint256 public isinNumber;
    uint256 public tokenPriceInEuro;
    uint256 public nominalValue;
    uint256 public maturityDate;
    uint16 public yield;

    uint256 private _decimals = 10 ** uint256(decimals());

    // Deployment and ERC20 registration
    constructor(
        string memory _tokenName,   
        string memory _tokenSymbol, 
        uint256 _initialSupply,
        string memory _assetDescription,
        string memory _issuerName,
        uint256 _isinNumber,
        uint256 _tokenPriceInEuro,
        uint256 _nominalValue,
        uint256 _maturityDate,
        uint16 _yield
        )
        ERC20(_tokenName, _tokenSymbol)
        Ownable()
    {
        whitelistAddress = address(new Whitelist(msg.sender));
        whitelistContract = Whitelist(whitelistAddress);

        // whitelistContract.addToWhitelist(msg.sender);

        assetDescription = _assetDescription;
        issuerName = _issuerName;
        isinNumber = _isinNumber;
        tokenPriceInEuro = _tokenPriceInEuro;
        nominalValue = _nominalValue;
        maturityDate = _maturityDate;
        yield = _yield;

        _mint(msg.sender, _initialSupply * uint256(_decimals));
    }

    // Whitelist modifiers to ensure transaction actors are whitelisted
    modifier onlyWhitelistedRecipient(address _passToAddress) {
        whitelistContract.whitelistFuncTo(_passToAddress); 
        _;
    }

    modifier onlyWhitelistedSender(address _passFromAddress) {
        whitelistContract.whitelistFuncFrom(_passFromAddress); 
        _;
    }

    // Transfer ERC20
    function transferToken(
        address _toAddress,
        uint256 _amount
        ) public 
    onlyWhitelistedRecipient(_toAddress) 
    onlyWhitelistedSender(msg.sender)
    returns(bool) 
    {    
        _transfer(msg.sender, _toAddress, _amount * uint256(_decimals));
        return true;
    }

    function getWhitelistAddress() public view returns(address) {
        return whitelistAddress;
    }
}