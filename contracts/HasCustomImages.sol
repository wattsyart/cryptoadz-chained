// SPDX-License-Identifier: MPL-2.0

pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./ICrypToadzCustomImages.sol";

contract HasCustomImages {
    /** @notice Contract responsible for rendering custom images. */
    ICrypToadzCustomImages public customImages;

    /**
    @notice Flag to disable use of setCustomImages().
     */
    bool public customImagesLocked = false;

    /**
    @notice Permanently sets the customImagesLocked flag to true.
     */
    function lockCustomImages() external onlyOwner {
        require(
            address(customImages).supportsInterface(
                type(ICrypToadzCustomImages).interfaceId
            ),
            "Not ICrypToadzCustomImages"
        );
        customImagesLocked = true;
    }

    /**
    @notice Sets the address of the custom images contract.
    @dev No checks are performed when setting, but lockCustomImages() ensures that
    the final address implements the ICrypToadzCustomImages interface.
     */
    function setCustomImages(address _customImages) external onlyOwner {
        require(!customImagesLocked, "CustomImages locked");
        customImages = ICrypToadzCustomImages(_customImages);
    }
}