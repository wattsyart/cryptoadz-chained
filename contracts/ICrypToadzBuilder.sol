// SPDX-License-Identifier: MPL-2.0

pragma solidity ^0.8.13;

import "./GIFEncoder.sol";

struct Rectangle {
    uint8 x;
    uint8 y;
}

interface ICrypToadzBuilder {
    function getImage(
        uint8[] memory metadata,
        uint256 tokenId,        
        bool isTallToken
    ) external view returns (GIFEncoder.GIF memory gif);
}
