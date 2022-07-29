// SPDX-License-Identifier: MPL-2.0

pragma solidity ^0.8.13;

import "./GIFFrame.sol";

struct GIF {
    uint32 frameCount;
    GIFFrame[] frames;
    uint16 width;
    uint16 height;
}

    