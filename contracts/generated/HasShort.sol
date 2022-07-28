// SPDX-License-Identifier: MPL-2.0

pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
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
    function lockShort() external onlyOwner {
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
    function setShort(address _short) external onlyOwner {
        require(!shortLocked, "Short locked");
        short = CrypToadzBuilderShort(_short);
    }    
}