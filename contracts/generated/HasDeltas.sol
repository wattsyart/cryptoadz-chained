// SPDX-License-Identifier: MPL-2.0

pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
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
    function lockDeltas() external onlyOwner {
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
    function setDeltas(address _deltas) external onlyOwner {
        require(!deltasLocked, "Deltas locked");
        deltas = ICrypToadzDeltas(_deltas);
    }    
}