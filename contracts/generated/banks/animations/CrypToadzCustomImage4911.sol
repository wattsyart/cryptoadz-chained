// SPDX-License-Identifier: CC0-1.0

pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";

import "../../../BufferUtils.sol";
import "../../../ICrypToadzCustomImageBank.sol";
import "../../../CrypToadzCustomImageBank.sol";

import "./CrypToadzCustomImage4911A.sol";
import "./CrypToadzCustomImage4911B.sol";
import "./CrypToadzCustomImage4911C.sol";
import "./CrypToadzCustomImage4911D.sol";
import "./CrypToadzCustomImage4911E.sol";
import "./CrypToadzCustomImage4911F.sol";
import "./CrypToadzCustomImage4911G.sol";

contract CrypToadzCustomImage4911 is Ownable, ICrypToadzCustomImageBank {
    function isCustomImage(uint tokenId) external pure returns (bool) { return tokenId == 4911; }

    function getCustomImage() external view returns (bytes memory buffer) {
        bytes memory bufferA = CrypToadzCustomImage4911A(a).getCustomImage();
        bytes memory bufferB = CrypToadzCustomImage4911B(b).getCustomImage();
        bytes memory bufferC = CrypToadzCustomImage4911C(c).getCustomImage();
        bytes memory bufferD = CrypToadzCustomImage4911D(d).getCustomImage();
        bytes memory bufferE = CrypToadzCustomImage4911E(e).getCustomImage();
        bytes memory bufferF = CrypToadzCustomImage4911F(f).getCustomImage();
        bytes memory bufferG = CrypToadzCustomImage4911G(g).getCustomImage();
        buffer = DynamicBuffer.allocate(bufferA.length + bufferB.length + bufferC.length + bufferD.length + bufferE.length + bufferF.length + bufferG.length);
        DynamicBuffer.appendUnchecked(buffer, bufferA);
        DynamicBuffer.appendUnchecked(buffer, bufferB);
        DynamicBuffer.appendUnchecked(buffer, bufferC);
        DynamicBuffer.appendUnchecked(buffer, bufferD);
        DynamicBuffer.appendUnchecked(buffer, bufferE);
        DynamicBuffer.appendUnchecked(buffer, bufferF);
        DynamicBuffer.appendUnchecked(buffer, bufferG);
    }

    address a;
    address b;
    address c;
    address d;
    address e;
    address f;
    address g;

    function setAddresses(address _a, address _b, address _c, address _d, address _e, address _f, address _g) external onlyOwner {
        a = _a;
        b = _b;
        c = _c;
        d = _d;
        e = _e;
        f = _f;
        g = _g;
    }
}