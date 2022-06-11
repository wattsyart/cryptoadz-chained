// SPDX-License-Identifier: MPL-2.0

pragma solidity ^0.8.13;

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////

import "./GIFEncoder.sol";

error UnsupportedDrawInstruction(uint8 instructionType);
error DoNotAddBlackToColorTable();

/** @notice Pixel renderer using basic drawing instructions: fill, line, and dot. */
library PixelRenderer {

    struct Point2D {
        int32 x;
        int32 y;
    }

    struct Line2D {
        Point2D v0;
        Point2D v1;
        uint32 color;
    }

    struct DrawFrame {
        bytes buffer;
        uint position;
        GIFEncoder.GIFFrame frame;
        uint32[255] colors;
    }

    function drawFrameWithOffsets(DrawFrame memory f, uint8 ox, uint8 oy) internal pure {       
        (uint32 instructionCount, uint position) = readUInt32(f.buffer, f.position);
        f.position = position;

        for(uint32 i = 0; i < instructionCount; i++) {

            uint8 instructionType = uint8(f.buffer[f.position++]);                   

            if(instructionType == 0) {   
                uint32 color = f.colors[uint8(f.buffer[f.position++])];
                for (uint16 x = 0; x < f.frame.width; x++) {
                    for (uint16 y = 0; y < f.frame.height; y++) {
                        f.frame.buffer[f.frame.width * y + x] = color;
                    }
                }
            }
            else if(instructionType == 1)
            {                
                uint32 color = f.colors[uint8(f.buffer[f.position++])];

                int32 x0 = int8(uint8(f.buffer[f.position++]));                
                int32 y0 = int8(uint8(f.buffer[f.position++]));                
                int32 x1 = int8(uint8(f.buffer[f.position++]));
                int32 y1 = int8(uint8(f.buffer[f.position++]));

                x0 += int8(ox);
                y0 += int8(oy);
                x1 += int8(ox);
                y1 += int8(oy);

                line(f.frame, PixelRenderer.Line2D(
                    PixelRenderer.Point2D(x0, y0), 
                    PixelRenderer.Point2D(x1, y1),
                    color));
            }
            else if(instructionType == 2)
            {   
                uint32 color = f.colors[uint8(f.buffer[f.position++])];
                
                int32 x = int8(uint8(f.buffer[f.position++]));
                int32 y = int8(uint8(f.buffer[f.position++]));
                x += int8(ox);
                y += int8(oy);

                dot(f.frame, x, y, color);
            } else {
                revert UnsupportedDrawInstruction(instructionType);
            }
        }
    }
    
    function drawFrame(DrawFrame memory f) internal pure {       
        drawFrameWithOffsets(f, 0, 0);
    }    

    function getColorTable(bytes memory buffer, uint position) internal pure returns(uint32[255] memory colors, uint) {
        
        uint8 colorCount = uint8(buffer[position++]);
        colors[0] = 0xFF000000;
        
        for(uint8 i = 0; i < colorCount; i++) {
            uint32 r = uint32(uint8(buffer[position++]));
            uint32 g = uint32(uint8(buffer[position++]));
            uint32 b = uint32(uint8(buffer[position++]));
            uint32 color = 0;
            color |= 255 << 24;
            color |= r << 16;
            color |= g << 8;
            color |= b << 0;

            if(color == colors[0]) {
                revert DoNotAddBlackToColorTable();
            }
             
            colors[i + 1] = color;                   
        }

        return (colors, position);
    }

    function dot(
        GIFEncoder.GIFFrame memory frame,
        int32 x,
        int32 y,
        uint32 color
    ) private pure {
        uint32 p = uint32(int16(frame.width) * y + x);
        frame.buffer[p] = color;
    }

    function line(GIFEncoder.GIFFrame memory frame, Line2D memory f)
        private
        pure
    {
        int256 x0 = f.v0.x;
        int256 x1 = f.v1.x;
        int256 y0 = f.v0.y;
        int256 y1 = f.v1.y;

        int256 dx = abs(x1 - x0);
        int256 dy = abs(y1 - y0);

        int256 err = (dx > dy ? dx : -dy) / 2;

        for (;;) {
            if (
                x0 <= int32(0) + int16(frame.width) - 1 &&
                x0 >= int32(0) &&
                y0 <= int32(0) + int16(frame.height) - 1 &&
                y0 >= int32(0)
            ) {
                uint256 p = uint256(int16(frame.width) * y0 + x0);
                frame.buffer[p] = f.color;
            }

            if (x0 == x1 && y0 == y1) break;
            int256 e2 = err;
            if (e2 > -dx) {
                err -= dy;
                x0 += x0 < x1 ? int8(1) : -1;
            }
            if (e2 < dy) {
                err += dx;
                y0 += y0 < y1 ? int8(1) : -1;
            }
        }
    }

    function readUInt32(bytes memory buffer, uint position) internal pure returns (uint32, uint) {
        uint8 d1 = uint8(buffer[position++]);
        uint8 d2 = uint8(buffer[position++]);
        uint8 d3 = uint8(buffer[position++]);
        uint8 d4 = uint8(buffer[position++]);
        return ((16777216 * d4) + (65536 * d3) + (256 * d2) + d1, position);
    }

    function abs(int256 x) private pure returns (int256) {
        return x >= 0 ? x : -x;
    }
}