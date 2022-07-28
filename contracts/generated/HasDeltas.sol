// SPDX-License-Identifier: MPL-2.0

pragma solidity ^0.8.13;

import "../ICrypToadzDeltas.sol";

contract HasDeltas {
    /** @notice Contract responsible for rendering delta patches */
    ICrypToadzDeltas public deltas;

    /**
    @notice Flag to disable use of setDeltas().
     */
    bool public deltasLocked = false;    

    /**
    @notice Permanently sets the deltasLocked flag to true.
     */
    function lockDeltas() external {
        require(msg.sender == owner, "only owner");
        require(
            address(deltas).supportsInterface(
                type(ICrypToadzDeltas).interfaceId
            ),
            "Not ICrypToadzDeltas"
        );
        deltasLocked = true;
    }

    /**
    @notice Sets the address of the deltas contract.
    @dev No checks are performed when setting, but lockDeltas() ensures that
    the final address implements the ICrypToadzDeltas interface.
     */
    function setDeltas(address _deltas) public {
        require(msg.sender == owner, "only owner");
        require(!deltasLocked, "Deltas locked");
        deltas = ICrypToadzDeltas(_deltas);
    }    
}