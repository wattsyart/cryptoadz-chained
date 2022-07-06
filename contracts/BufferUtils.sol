// SPDX-License-Identifier: MPL-2.0

pragma solidity ^0.8.13;

library BufferUtils {
    function readUInt32(bytes memory buffer, uint position) internal pure returns (uint32, uint) {
        uint8 d1 = uint8(buffer[position++]);
        uint8 d2 = uint8(buffer[position++]);
        uint8 d3 = uint8(buffer[position++]);
        uint8 d4 = uint8(buffer[position++]);
        return ((16777216 * d4) + (65536 * d3) + (256 * d2) + d1, position);
    }

    function readInt32(uint position, bytes memory buffer) internal pure returns (int32, uint) {
        int32 value;
        value |= int32(uint32(uint8(buffer[position++]))) <<  0;
        value |= int32(uint32(uint8(buffer[position++]))) <<  8;
        value |= int32(uint32(uint8(buffer[position++]))) << 16;
        value |= int32(uint32(uint8(buffer[position++]))) << 32;
        return (value, position);
    }

    function readByte(uint position, bytes memory buffer) internal pure returns (uint8, uint) {
        uint8 value = uint8(buffer[position++]);
        return (value, position);
    }

    function abs(int256 x) internal pure returns (int256) {
        return x >= 0 ? x : -x;
    }
}