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

import "@openzeppelin/contracts/access/Ownable.sol";

contract Whitelist is Ownable {

    mapping(address => bool) public generalWhitelist;

    address[] public whitelist;

    constructor() Ownable() {
        addToWhitelist(msg.sender);
    }

    // Add to whitelist
    function addToWhitelist(address addAddress) 
    public onlyOwner
    {
       generalWhitelist[addAddress] = true;
    }

    // Remove from whitelist
    function removeFromWhitelist(address removeAddress)
    public onlyOwner
    {
        generalWhitelist[removeAddress] = false;
    }

    function whitelistFuncFrom(address _fromAddress) external view
    {
    require(generalWhitelist[_fromAddress], "SENDER_NOT_IN_WHITELIST");
    }

    function whitelistFuncTo(address _toAddress) external view
    {
        require(generalWhitelist[_toAddress], "RECIPIENT_NOT_IN_WHITELIST");
    }

    // Get mapping value
    function getWhitelist(address _address) public view returns(bool) {
        return generalWhitelist[_address];
    }
}