// SPDX-License-Identifier: MPL-2.0

pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./ICrypToadzCustomAnimations.sol";

contract HasCustomAnimations {
    /** @notice Contract responsible for rendering custom animations. */
    ICrypToadzCustomAnimations public customAnimations;

    /**
    @notice Flag to disable use of setCustomAnimations().
     */
    bool public customAnimationsLocked = false;

    /**
    @notice Permanently sets the customAnimationsLocked flag to true.
     */
    function lockCustomAnimations() external onlyOwner {
        require(
            address(customAnimations).supportsInterface(
                type(ICrypToadzCustomAnimations).interfaceId
            ),
            "Not ICrypToadzCustomAnimations"
        );
        customAnimationsLocked = true;
    }

    /**
    @notice Sets the address of the custom animations contract.
    @dev No checks are performed when setting, but lockCustomAnimations() ensures that
    the final address implements the ICrypToadzCustomAnimations interface.
     */
    function setCustomAnimations(address _customAnimations) external onlyOwner {
        require(!customAnimationsLocked, "CustomAnimations locked");
        customAnimations = ICrypToadzCustomAnimations(_customAnimations);
    }       
}