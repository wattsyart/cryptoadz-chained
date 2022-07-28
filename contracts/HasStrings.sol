// SPDX-License-Identifier: MPL-2.0

pragma solidity ^0.8.13;

import "./ICrypToadzStrings";

contract HasStrings {
    /** @notice Contract responsible for looking up strings. */
    ICrypToadzStrings public strings;

    /**
    @notice Flag to disable use of setStrings().
     */
    bool public stringsLocked = false;

    /**
    @notice Permanently sets the stringsLocked flag to true.
     */
    function lockStrings() external {
        require(msg.sender == owner, "only owner");
        require(
            address(strings).supportsInterface(
                type(ICrypToadzStrings).interfaceId
            ),
            "Not ICrypToadzStrings"
        );
        stringsLocked = true;
    }

    /**
    @notice Sets the address of the string provider contract.
    @dev No checks are performed when setting, but lockStrings() ensures that
    the final address implements the ICrypToadzStrings interface.
     */
    function setStrings(address _strings) public {
        require(msg.sender == owner, "only owner");
        require(!stringsLocked, "Strings locked");
        strings = ICrypToadzStrings(_strings);
    }
}