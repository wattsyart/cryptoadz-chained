// SPDX-License-Identifier: MPL-2.0

pragma solidity ^0.8.13;

import "./PixelRenderer.sol";
import "./WaxBase.sol";

error UnexpectedBufferSize();

contract CrypToadzBase is WaxBase {

    mapping(uint8 => address) tall;
    mapping(uint8 => address) short;
    mapping(uint8 => address) any;

    mapping(uint8 => address) imageData;
    mapping(uint8 => uint16) imageLengths;

    function getImage(uint8[] memory metadata, uint tokenId, uint8 file) internal override view returns (GIFEncoder.GIF memory gif) {
        (InflateLib.ErrorCode code, bytes memory buffer) = InflateLib.puff(SSTORE2.read(imageData[file]), imageLengths[file]);
        require(code == InflateLib.ErrorCode.ERR_NONE);
        require(buffer.length == imageLengths[file]);

        gif.width = 36;
        gif.height = 36;

        GIFEncoder.GIFFrame memory frame;
        frame.width = gif.width;
        frame.height = gif.height;

        (uint start,) = advanceToTokenPosition(tokenId, buffer);

        bool isTallToken = isTall(tokenId);

        for (uint8 i = 0; i < metadata.length; i++) {
            uint8 value = metadata[i];

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
                    (uint32 instructionCount, uint p) = PixelRenderer.readUInt32(buffer, position);
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

                {
                     bytes memory featureData = SSTORE2.read(feature);

                     uint position;
                     (uint32[255] memory colors, uint p) = PixelRenderer.getColorTable(featureData, position);
                     position = p;

                     PixelRenderer.DrawFrame memory f = PixelRenderer.DrawFrame(featureData, position, frame, colors);
                     PixelRenderer.drawFrameWithOffsets(f, ox, oy);
                     position = f.position;

                     if(position != featureData.length) revert UnexpectedBufferSize();
                }
            }
        }

        gif.frames[gif.frameCount++] = frame;
    }

    function isTall(uint tokenId) public virtual view returns (bool) { revert(); }
    function getAnimationFileForToken(uint tokenId) internal virtual pure returns (uint8) { revert(); }
    function getCustomImageFileForToken(uint tokenId) internal virtual pure returns (uint8) { revert(); }
}