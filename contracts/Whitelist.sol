// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
/** 
 * @title Whitelist
 * @author Spencer-a Clarke
 * @notice Whitelist Smart Contract for Bank on Tech proof of concept
 * @dev --notes for dev--
 * @param documents a functions parameters
 * @return documents the return of a function
 * @inheritdoc inherit comments regarding another contract
*/

pragma solidity ^0.8.26;

// import "@openzeppelin/contracts/access/Ownable.sol";

contract Whitelist {

    address whitelistOwner;

    mapping(address => bool) public generalWhitelist;

    constructor(address _ownerAddress) {
       whitelistOwner = _ownerAddress;
    }

    modifier onlyOwner {
        require(msg.sender == whitelistOwner);
        _;
    }

    // Add public address to whitelist
    function addToWhitelist(address addAddress) 
    public onlyOwner
    {
       generalWhitelist[addAddress] = true;
    }

    // Remove public address from whitelist
    function removeFromWhitelist(address removeAddress)
    public onlyOwner
    {
        generalWhitelist[removeAddress] = false;
    }
    
    // Ensure transaction sender is whitelisted
    function whitelistFuncFrom(address _fromAddress) external view
    {
        require(generalWhitelist[_fromAddress], "SENDER_NOT_IN_WHITELIST");
    }

    // Ensure transaction recipient is whitelisted
    function whitelistFuncTo(address _toAddress) external view
    {
        require(generalWhitelist[_toAddress], "RECIPIENT_NOT_IN_WHITELIST");
    }

    // Return mapping value
    function getWhitelist(address _address) public view returns(bool) {
        return generalWhitelist[_address];
    }
}