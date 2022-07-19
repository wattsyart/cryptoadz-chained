// SPDX-License-Identifier: MPL-2.0

pragma solidity ^0.8.13;

import "./GIFEncoder.sol";
import "./PixelRenderer.sol";

library GIFDraw {
    function draw(
        GIFEncoder.GIFFrame memory frame,
        bytes memory buffer,
        uint256 position,
        uint8 offsetX,
        uint8 offsetY,
        bool blend
    ) internal pure returns (uint256) {
        (uint32[] memory colors, uint256 positionAfterColor) = PixelRenderer
            .getColorTable(buffer, position);
        position = positionAfterColor;

        (uint32[] memory newBuffer, uint256 positionAfterDraw) = PixelRenderer
            .drawFrameWithOffsets(
                PixelRenderer.DrawFrame(
                    buffer,
                    position,
                    frame,
                    colors,
                    offsetX,
                    offsetY,
                    blend
                )
            );

        frame.buffer = newBuffer;
        return positionAfterDraw;
    }
}
