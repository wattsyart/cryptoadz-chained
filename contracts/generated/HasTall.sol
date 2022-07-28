// SPDX-License-Identifier: MPL-2.0

pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./CrypToadzBuilderTall.sol";

contract HasTall {
    /** @notice Contract responsible for rendering tall features */
    CrypToadzBuilderTall public tall;

    /**
    @notice Flag to disable use of setTall().
     */
    bool public shortLocked = false;    

    /**
    @notice Permanently sets the shortLocked flag to true.
     */
    function lockTall() external onlyOwner {
        require(
            address(tall).supportsInterface(
                type(CrypToadzBuilderTall).interfaceId
            ),
            "Not CrypToadzBuilderTall"
        );
        shortLocked = true;
    }

    /**
    @notice Sets the address of the tall contract.
    @dev No checks are performed when setting, but lockTall() ensures that
    the final address implements the CrypToadzBuilderTall interface.
     */
    function setTall(address _tall) external onlyOwner {
        require(!shortLocked, "Tall locked");
        tall = CrypToadzBuilderTall(_tall);
    }    
}