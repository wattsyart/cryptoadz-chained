// SPDX-License-Identifier: MPL-2.0

pragma solidity ^0.8.13;

import "./lib/DynamicBuffer.sol";
import "./PixelRenderer.sol";
import "./WaxBase.sol";
import "./GIFDraw.sol";

import "hardhat/console.sol";

error InvalidDrawOrder(uint8 featureId);

contract CrypToadzBase is WaxBase {

    mapping(uint8 => address) tall;
    mapping(uint8 => address) short;
    mapping(uint8 => address) any;

    mapping(uint8 => address) imageData;
    mapping(uint8 => uint16) imageLengths;

    function getAnimation(uint tokenId) override internal view returns (GIFEncoder.GIF memory gif) {

        uint size;
        uint8 count;
        while(animationLengths[tokenId][count] != 0) {
            size += animationLengths[tokenId][count++];
        }

        console.log("total buffer size is %s", size);

        bytes memory buffer = DynamicBuffer.allocate(size);
        for(uint8 i = 0; i < count; i++) {
            bytes memory chunk = BufferUtils.decompress(animationData[tokenId][i], animationLengths[tokenId][i]);
            DynamicBuffer.appendUnchecked(buffer, chunk);
        }

        uint position;
        uint8 frameCount;
        (frameCount, position) = BufferUtils.readByte(position, buffer);
        console.log("position after frameCount = %s", position);

        gif.width = 36;
        gif.height = 36;
        gif.frames = new GIFEncoder.GIFFrame[](frameCount);

        console.log("initialized %s frames", frameCount);

        for(uint8 i = 0; i < frameCount; i++)
        {
            GIFEncoder.GIFFrame memory frame;
            frame.width = gif.width;
            frame.height = gif.height;
            frame.buffer = new uint32[](frame.width * frame.height);

            console.log("position before frame = %s", position);
            position = GIFDraw.draw(frame, buffer, position, 0, 0, false);
            
            gif.frames[gif.frameCount++] = frame;
            console.log("position after frame = %s", position);
        }        
    }

    function getImage(uint8[] memory metadata, uint tokenId, uint8 file, bool isTallToken) internal override view returns (GIFEncoder.GIF memory gif) {
        bytes memory buffer = BufferUtils.decompress(imageData[file], imageLengths[file]);

        gif.width = 36;
        gif.height = 36;
        gif.frames = new GIFEncoder.GIFFrame[](1);

        GIFEncoder.GIFFrame memory frame;
        frame.width = gif.width;
        frame.height = gif.height;
        frame.buffer = new uint32[](frame.width * frame.height);

        (uint position, uint length) = BufferUtils.advanceToTokenPosition(tokenId, buffer);
        uint8 flag;

        (, position) = BufferUtils.readUInt32(buffer, position);

        for (uint8 i = 0; i < metadata.length; i++) {
            uint8 value = metadata[i];            

            if(value != 55 && value >= 51 && value < 104) {
                flag = 1;
            } else if(value == 55 && flag == 0) {
                value = 249;
                flag = 1;
            }
            
            if(value != 55 && value >= 121 && value < 139) {
                flag = 2;
            } else if(value == 55 && flag == 1) {
                value = 250;
                flag = 2;
            }
            
            address feature;
            if(isTallToken) {
                if(tall[value] != address(0)) {
                    feature = tall[value];
                } else if(any[value] != address(0)) {
                    feature = any[value];
                }
            } else {
                if(short[value] != address(0)) {
                    feature = short[value];
                } else if(any[value] != address(0)) {
                    feature = any[value];
                }
            }

            if(feature != address(0)) {
                uint8 ox;
                uint8 oy;
                uint8 instructionType = uint8(buffer[position++]);
                if(instructionType == 3) {
                    uint8 featureId = uint8(buffer[position++]);
                    if(featureId != value) {            
                        revert InvalidDrawOrder(featureId);
                    }
                    ox = uint8(buffer[position++]);
                    oy = uint8(buffer[position++]);                    
                } else {
                    revert UnsupportedDrawInstruction(instructionType);
                }
                GIFDraw.draw(frame, SSTORE2.read(feature), 0, ox, oy, true);
            }
        }

        // drawDelta(frame, tokenId);

        gif.frames[gif.frameCount++] = frame;
    }

    function getAnimationFileForToken(uint tokenId) internal virtual pure returns (uint8) { revert(); }
    function getCustomImageFileForToken(uint tokenId) internal virtual pure returns (uint8) { revert(); }
}