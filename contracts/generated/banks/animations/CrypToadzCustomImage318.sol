// SPDX-License-Identifier: CC0-1.0

pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";

import "../../../BufferUtils.sol";
import "../../../ICrypToadzCustomImageBank.sol";
import "../../../CrypToadzCustomImageBank.sol";

import "./CrypToadzCustomImage318A.sol";
import "./CrypToadzCustomImage318B.sol";
import "./CrypToadzCustomImage318C.sol";
import "./CrypToadzCustomImage318D.sol";
import "./CrypToadzCustomImage318E.sol";
import "./CrypToadzCustomImage318F.sol";

contract CrypToadzCustomImage318 is Ownable, ICrypToadzCustomImageBank {
    function isCustomImage(uint tokenId) external pure returns (bool) { return tokenId == 318; }

    function getCustomImage() external view returns (bytes memory buffer) {
        bytes memory bufferA = CrypToadzCustomImage318A(a).getCustomImage();
        bytes memory bufferB = CrypToadzCustomImage318B(b).getCustomImage();
        bytes memory bufferC = CrypToadzCustomImage318C(c).getCustomImage();
        bytes memory bufferD = CrypToadzCustomImage318D(d).getCustomImage();
        bytes memory bufferE = CrypToadzCustomImage318E(e).getCustomImage();
        bytes memory bufferF = CrypToadzCustomImage318F(f).getCustomImage();
        buffer = DynamicBuffer.allocate(bufferA.length + bufferB.length + bufferC.length + bufferD.length + bufferE.length + bufferF.length);
        DynamicBuffer.appendUnchecked(buffer, bufferA);
        DynamicBuffer.appendUnchecked(buffer, bufferB);
        DynamicBuffer.appendUnchecked(buffer, bufferC);
        DynamicBuffer.appendUnchecked(buffer, bufferD);
        DynamicBuffer.appendUnchecked(buffer, bufferE);
        DynamicBuffer.appendUnchecked(buffer, bufferF);
    }

    address a;
    address b;
    address c;
    address d;
    address e;
    address f;

    function setAddresses(address _a, address _b, address _c, address _d, address _e, address _f) external onlyOwner {
        a = _a;
        b = _b;
        c = _c;
        d = _d;
        e = _e;
        f = _f;
    }
}

