// SPDX-License-Identifier: MPL-2.0

pragma solidity ^0.8.13;

import "../GIFEncoder.sol";

interface IDeltaCompositor {
    function drawDelta(GIFEncoder.GIFFrame memory frame, uint tokenId) external view returns (uint32[] memory buffer, uint position);
    function getDeltaFileForToken(uint tokenId) external view returns (uint8);
}