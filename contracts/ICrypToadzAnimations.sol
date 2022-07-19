// SPDX-License-Identifier: MPL-2.0

pragma solidity ^0.8.13;

import "./GIFEncoder.sol";

interface ICrypToadzAnimations {
    function isAnimation(uint256 tokenId) external view returns (bool);
    function getAnimation(uint256 tokenId) external view returns (GIFEncoder.GIF memory gif);
}