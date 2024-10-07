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

    // Add to whitelist
    function addToWhitelist(address addAddress) 
    public onlyOwner
    {
        generalWhitelist[addAddress] = true;
    }

    // Remove from whitelist
    function removeFromWhitelist(address removeAddress)
    external onlyOwner
    {
        generalWhitelist[removeAddress] = false;
    }

    function whitelistFunc(address _checkAddress) external view
    {
        require(generalWhitelist[msg.sender], "SENDER_NOT_IN_WHITELIST");
        require(generalWhitelist[_checkAddress], "RECIPIENT_NOT_IN_WHITELIST");
    }
}