// SPDX-License-Identifier: MPL-2.0

pragma solidity ^0.8.13;

import "../CrypToadzBuilderShort.sol";

contract HasShort {
    /** @notice Contract responsible for rendering short features */
    CrypToadzBuilderShort public short;

    /**
    @notice Flag to disable use of setShort().
     */
    bool public shortLocked = false;    

    /**
    @notice Permanently sets the shortLocked flag to true.
     */
    function lockShort() external {
        require(msg.sender == owner, "only owner");
        require(
            address(short).supportsInterface(
                type(CrypToadzBuilderShort).interfaceId
            ),
            "Not CrypToadzBuilderShort"
        );
        shortLocked = true;
    }

    /**
    @notice Sets the address of the short contract.
    @dev No checks are performed when setting, but lockShort() ensures that
    the final address implements the CrypToadzBuilderShort interface.
     */
    function setShort(address _short) public {
        require(msg.sender == owner, "only owner");
        require(!shortLocked, "Short locked");
        short = CrypToadzBuilderShort(_short);
    }    
}