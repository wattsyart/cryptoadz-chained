// SPDX-License-Identifier: MPL-2.0

pragma solidity ^0.8.13;

interface ICrypToadzCustomImageBank {
    function isCustomImage(uint256 tokenId) external view returns (bool);

    function getCustomImage()
        external
        view
        returns (bytes memory buffer);
}