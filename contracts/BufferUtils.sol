// SPDX-License-Identifier: MPL-2.0

pragma solidity ^0.8.13;

import "./lib/InflateLib.sol";
import "./lib/SSTORE2.sol";
import "./Errors.sol";

library BufferUtils {

    function decompress(address compressed, uint decompressedLength) internal view returns (bytes memory) {
        (InflateLib.ErrorCode code, bytes memory buffer) = InflateLib.puff(SSTORE2.read(compressed), decompressedLength);        
        if(code != InflateLib.ErrorCode.ERR_NONE) revert FailedToDecompress(uint(code));
        if(buffer.length != decompressedLength) revert InvalidDecompressionLength(decompressedLength, buffer.length);
        return buffer;
    }

    function advanceToTokenPosition(uint tokenId, bytes memory buffer) internal pure returns (uint position, uint8 length) {
        uint id;
        while(id != tokenId) {
            (id, position) = BufferUtils.readUInt32(position, buffer);            
            (length, position) = BufferUtils.readByte(position, buffer);
            if(id != tokenId) {
                position += length;
                if(position >= buffer.length)
                    return (position, 0);
            }
        }
        return (position, length);
    }

    function advanceToTokenPositionDelta(uint tokenId, bytes memory buffer) internal pure returns (uint position, uint32 length) {
        uint id;
        while(id != tokenId) {
            (id, position) = BufferUtils.readUInt32(position, buffer);            
            (length, position) = BufferUtils.readUInt32(position, buffer);
            if(id != tokenId) {
                position += length;
                if(position >= buffer.length)
                    return (position, 0);
            }
        }
        return (position, length);
    }

    function readUInt32(uint position, bytes memory buffer) internal pure returns (uint32, uint) {
        uint8 d1 = uint8(buffer[position++]);
        uint8 d2 = uint8(buffer[position++]);
        uint8 d3 = uint8(buffer[position++]);
        uint8 d4 = uint8(buffer[position++]);
        return ((16777216 * d4) + (65536 * d3) + (256 * d2) + d1, position);
    }

    function readByte(uint position, bytes memory buffer) internal pure returns (uint8, uint) {
        uint8 value = uint8(buffer[position++]);
        return (value, position);
    }

    function abs(int256 x) internal pure returns (int256) {
        return x >= 0 ? x : -x;
    }
}