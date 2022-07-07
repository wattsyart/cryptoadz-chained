// SPDX-License-Identifier: MPL-2.0

pragma solidity ^0.8.13;

import "./GIFEncoder.sol";
import "./PixelRenderer.sol";

library GIFDraw {
    function draw(GIFEncoder.GIFFrame memory frame, bytes memory buffer, uint position, uint8 offsetX, uint8 offsetY, bool blend) internal pure returns(uint) {
        (uint32[255] memory colors, uint p) = PixelRenderer.getColorTable(buffer, position);
        position = p;
        
        (uint32[1296] memory newBuffer, uint newPosition) = PixelRenderer.drawFrameWithOffsets(
            PixelRenderer.DrawFrame(buffer, position, frame, colors, offsetX, offsetY, blend)
        );

        frame.buffer = newBuffer;
        return position;
    }
}