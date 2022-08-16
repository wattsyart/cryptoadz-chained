// SPDX-License-Identifier: CC0-1.0

pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";

import "../../../BufferUtils.sol";
import "../../../ICrypToadzCustomImageBank.sol";
import "../../../CrypToadzCustomImageBank.sol";

import "./CrypToadzCustomImage1943A.sol";
import "./CrypToadzCustomImage1943B.sol";
import "./CrypToadzCustomImage1943C.sol";
import "./CrypToadzCustomImage1943D.sol";
import "./CrypToadzCustomImage1943E.sol";

contract CrypToadzCustomImage1943 is Ownable, ICrypToadzCustomImageBank {
    function isCustomImage(uint tokenId) external pure returns (bool) { return tokenId == 1943; }

    function getCustomImage() external view returns (bytes memory buffer) {
        bytes memory bufferA = CrypToadzCustomImage1943A(a).getCustomImage();
        bytes memory bufferB = CrypToadzCustomImage1943B(b).getCustomImage();
        bytes memory bufferC = CrypToadzCustomImage1943C(c).getCustomImage();
        bytes memory bufferD = CrypToadzCustomImage1943D(d).getCustomImage();
        bytes memory bufferE = CrypToadzCustomImage1943E(e).getCustomImage();
        buffer = DynamicBuffer.allocate(bufferA.length + bufferB.length + bufferC.length + bufferD.length + bufferE.length);
        DynamicBuffer.appendUnchecked(buffer, bufferA);
        DynamicBuffer.appendUnchecked(buffer, bufferB);
        DynamicBuffer.appendUnchecked(buffer, bufferC);
        DynamicBuffer.appendUnchecked(buffer, bufferD);
        DynamicBuffer.appendUnchecked(buffer, bufferE);
    }

    address a;
    address b;
    address c;
    address d;
    address e;

    function setAddresses(address _a, address _b, address _c, address _d, address _e) external onlyOwner {
        a = _a;
        b = _b;
        c = _c;
        d = _d;
        e = _e;
    }
}