// SPDX-License-Identifier: MPL-2.0

pragma solidity ^0.8.13;

struct GIFFrame {
    uint32[] buffer;
    uint16 delay;
    uint16 width;
    uint16 height;
}