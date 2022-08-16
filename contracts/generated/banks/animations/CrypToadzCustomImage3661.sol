// SPDX-License-Identifier: CC0-1.0

pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";

import "../../../BufferUtils.sol";
import "../../../ICrypToadzCustomImageBank.sol";
import "../../../CrypToadzCustomImageBank.sol";

import "./CrypToadzCustomImage3661A.sol";
import "./CrypToadzCustomImage3661B.sol";
import "./CrypToadzCustomImage3661C.sol";
import "./CrypToadzCustomImage3661D.sol";
import "./CrypToadzCustomImage3661E.sol";
import "./CrypToadzCustomImage3661F.sol";
import "./CrypToadzCustomImage3661G.sol";

contract CrypToadzCustomImage3661 is Ownable, ICrypToadzCustomImageBank {
    function isCustomImage(uint tokenId) external pure returns (bool) { return tokenId == 3661; }

    function getCustomImage() external view returns (bytes memory buffer) {
        bytes memory bufferA = CrypToadzCustomImage3661A(a).getCustomImage();
        bytes memory bufferB = CrypToadzCustomImage3661B(b).getCustomImage();
        bytes memory bufferC = CrypToadzCustomImage3661C(c).getCustomImage();
        bytes memory bufferD = CrypToadzCustomImage3661D(d).getCustomImage();
        bytes memory bufferE = CrypToadzCustomImage3661E(e).getCustomImage();
        bytes memory bufferF = CrypToadzCustomImage3661F(f).getCustomImage();
        bytes memory bufferG = CrypToadzCustomImage3661G(g).getCustomImage();
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