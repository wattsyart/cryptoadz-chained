// SPDX-License-Identifier: MPL-2.0

pragma solidity ^0.8.13;

import "./GIFEncoder.sol";

interface ICrypToadzCustomAnimations {
    function isCustomAnimation(uint256 tokenId) external view returns (bool);
    function getCustomAnimation(uint256 tokenId) external view returns (bytes memory buffer);
}