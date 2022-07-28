// SPDX-License-Identifier: MPL-2.0

pragma solidity ^0.8.13;

import "./ICrypToadzBuilder.sol";

contract HasBuilder {
    /** @notice Contract responsible for building non-custom toadz images. */
    ICrypToadzBuilder public builder;

    /**
    @notice Flag to disable use of setBuilder().
     */
    bool public builderLocked = false;

    /**
    @notice Permanently sets the builderLocked flag to true.
     */
    function lockBuilder() external {
        require(msg.sender == owner, "only owner");
        require(
            address(builder).supportsInterface(
                type(ICrypToadzBuilder).interfaceId
            ),
            "Not ICrypToadzBuilder"
        );
        builderLocked = true;
    }

    /**
    @notice Sets the address of the builder contract.
    @dev No checks are performed when setting, but lockBuilder() ensures that
    the final address implements the ICrypToadzBuilder interface.
     */
    function setBuilder(address _builder) public {
        require(msg.sender == owner, "only owner");
        require(!builderLocked, "Builder locked");
        builder = ICrypToadzBuilder(_builder);
    }
}