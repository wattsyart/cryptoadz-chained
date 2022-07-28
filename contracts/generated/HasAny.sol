// SPDX-License-Identifier: MPL-2.0

pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./CrypToadzBuilderAny.sol";

contract HasAny {
    /** @notice Contract responsible for rendering unsized features */
    CrypToadzBuilderAny public any;

    /**
    @notice Flag to disable use of setAny().
     */
    bool public anyLocked = false;    

    /**
    @notice Permanently sets the anyLocked flag to true.
     */
    function lockAny() external onlyOwner {
        require(
            address(any).supportsInterface(
                type(CrypToadzBuilderAny).interfaceId
            ),
            "Not CrypToadzBuilderAny"
        );
        anyLocked = true;
    }

    /**
    @notice Sets the address of the any contract.
    @dev No checks are performed when setting, but lockAny() ensures that
    the final address implements the CrypToadzBuilderAny interface.
     */
    function setAny(address _any) external onlyOwner {
        require(!anyLocked, "Any locked");
        any = CrypToadzBuilderAny(_any);
    }    
}