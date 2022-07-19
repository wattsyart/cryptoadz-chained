// SPDX-License-Identifier: MPL-2.0

pragma solidity ^0.8.13;

import "@divergencetech/ethier/contracts/utils/DynamicBuffer.sol";

import "./ICrypToadzAnimations.sol";
import "./GIFEncoder.sol";
import "./GIFDraw.sol";
import "./BufferUtils.sol";

contract CrypToadzAnimations is ICrypToadzAnimations {

    mapping(uint256 => mapping(uint8 => uint16)) animationLengths;
    mapping(uint256 => mapping(uint8 => address)) animationData;

    function isAnimation(uint tokenId) external view returns (bool) {
        return animationData[tokenId][0] != address(0);
    }

    function getAnimation(uint256 tokenId)
        external
        view
        returns (GIFEncoder.GIF memory gif)
    {
        uint256 size;
        uint8 count;
        while (animationLengths[tokenId][count] != 0) {
            size += animationLengths[tokenId][count++];
        }

        bytes memory buffer = DynamicBuffer.allocate(size);
        for (uint8 i = 0; i < count; i++) {
            bytes memory chunk = BufferUtils.decompress(
                animationData[tokenId][i],
                animationLengths[tokenId][i]
            );
            DynamicBuffer.appendUnchecked(buffer, chunk);
        }

        uint256 position;
        uint8 frameCount;
        (frameCount, position) = BufferUtils.readByte(position, buffer);

        gif.width = 36;
        gif.height = 36;
        gif.frames = new GIFEncoder.GIFFrame[](frameCount);

        for (uint8 i = 0; i < frameCount; i++) {
            GIFEncoder.GIFFrame memory frame;
            frame.width = gif.width;
            frame.height = gif.height;
            frame.buffer = new uint32[](frame.width * frame.height);

            position = GIFDraw.draw(frame, buffer, position, 0, 0, false);

            gif.frames[gif.frameCount++] = frame;
        }
    }
}