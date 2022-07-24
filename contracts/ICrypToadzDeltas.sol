// SPDX-License-Identifier: MPL-2.0

pragma solidity ^0.8.13;

import "./GIFEncoder.sol";

interface ICrypToadzDeltas {
    function drawDelta(GIFEncoder.GIFFrame memory frame, uint tokenId, uint8 deltaFile) external view returns (uint32[] memory buffer);
    function getDeltaFileForToken(uint tokenId) external view returns (int8);
}