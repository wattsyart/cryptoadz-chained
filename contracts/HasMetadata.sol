// SPDX-License-Identifier: MPL-2.0

pragma solidity ^0.8.13;

import "./ICrypToadzMetadata.sol";

contract HasMetadata {
    /** @notice Contract responsible for looking up metadata. */
    ICrypToadzMetadata public metadata;

    /**
    @notice Flag to disable use of setMetadata().
     */
    bool public metadataLocked = false;

    /**
    @notice Permanently sets the metadataLocked flag to true.
     */
    function lockMetadata() external {
        require(msg.sender == owner, "only owner");
        require(
            address(metadata).supportsInterface(
                type(ICrypToadzMetadata).interfaceId
            ),
            "Not ICrypToadzMetadata"
        );
        metadataLocked = true;
    }

    /**
    @notice Sets the address of the metadata provider contract.
    @dev No checks are performed when setting, but lockMetadata() ensures that
    the final address implements the ICrypToadzMetadata interface.
     */
    function setMetadata(address _metadata) public {
        require(msg.sender == owner, "only owner");
        require(!metadataLocked, "Metadata locked");
        metadata = ICrypToadzMetadata(_metadata);
    }
}