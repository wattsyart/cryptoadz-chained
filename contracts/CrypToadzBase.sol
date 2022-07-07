// SPDX-License-Identifier: MPL-2.0

pragma solidity ^0.8.13;

import "./PixelRenderer.sol";
import "./WaxBase.sol";
import "hardhat/console.sol";

error UnexpectedBufferSize(uint position, uint length);

contract CrypToadzBase is WaxBase {

    mapping(uint8 => address) tall;
    mapping(uint8 => address) short;
    mapping(uint8 => address) any;

    mapping(uint8 => address) imageData;
    mapping(uint8 => uint16) imageLengths;

    mapping(uint8 => address) deltaData;
    mapping(uint8 => uint16) deltaLengths;

    function getImage(uint8[] memory metadata, uint tokenId, uint8 file, bool isTallToken) internal override view returns (GIFEncoder.GIF memory gif) {
        bytes memory buffer = decompress(imageData[file], imageLengths[file]);

        gif.width = 36;
        gif.height = 36;

        GIFEncoder.GIFFrame memory frame;
        frame.width = gif.width;
        frame.height = gif.height;

        (uint start,) = advanceToTokenPosition(tokenId, buffer);
        uint8 flag;

        for (uint8 i = 0; i < metadata.length; i++) {
            uint8 value = metadata[i];            

            if(value != 55 && value >= 51 && value < 104) {
                flag = 1;
            } else if(value == 55 && flag == 0) {
                value = 249;
                flag = 1;
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
                {
                    uint position = start;
                    (uint32 instructionCount, uint p) = BufferUtils.readUInt32(buffer, position);
                    position = p;

                    for(uint32 z = 0; z < instructionCount; z++) {
                        uint8 instructionType = uint8(buffer[position++]);
                        if(instructionType == 3) {
                            uint8 featureId = uint8(buffer[position++]);
                            ox = uint8(buffer[position++]);
                            oy = uint8(buffer[position++]);
                            if(featureId == value) {            
                                break;
                            } else {
                                ox = 0;
                                oy = 0;
                            }
                        } else {
                            revert UnsupportedDrawInstruction(instructionType);
                        }
                    }
                }

                bytes memory featureData = SSTORE2.read(feature);
                draw(frame, featureData, ox, oy, true);
                drawDelta(frame, tokenId);
            }
        }

        gif.frames[gif.frameCount++] = frame;
    }

    function drawDelta(GIFEncoder.GIFFrame memory frame, uint tokenId) private view {
        uint8 deltaFile = getDeltaFileForToken(tokenId);
        if(deltaData[deltaFile] != address(0))
        {
            bytes memory deltaData = decompress(deltaData[deltaFile], deltaLengths[deltaFile]);
            draw(frame, deltaData, 0, 0, false);
        }
    }

    function draw(GIFEncoder.GIFFrame memory frame, bytes memory buffer, uint8 ox, uint8 oy, bool blend) private view {
        uint position;
        (uint32[255] memory colors, uint p) = PixelRenderer.getColorTable(buffer, position);
        position = p;
        
        (uint32[1296] memory newBuffer, uint newPosition) = PixelRenderer.drawFrameWithOffsets(
            PixelRenderer.DrawFrame(buffer, position, frame, colors, ox, oy, blend)
        );

        frame.buffer = newBuffer;
        position = newPosition;

        if(position != buffer.length)
        {
            //revert UnexpectedBufferSize(position, buffer.length);
            console.log("position = %s, buffer length = %s", position, buffer.length);
        }
    }

    function isTall(uint tokenId) public virtual view returns (bool) { revert(); }
    function getAnimationFileForToken(uint tokenId) internal virtual pure returns (uint8) { revert(); }
    function getCustomImageFileForToken(uint tokenId) internal virtual pure returns (uint8) { revert(); }
    function getDeltaFileForToken(uint tokenId) internal virtual pure returns (uint8) { revert(); }
}