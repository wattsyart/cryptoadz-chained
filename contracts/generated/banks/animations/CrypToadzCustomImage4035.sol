// SPDX-License-Identifier: CC0-1.0

pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";

import "../../../BufferUtils.sol";
import "../../../ICrypToadzCustomImageBank.sol";
import "../../../CrypToadzCustomImageBank.sol";

import "./CrypToadzCustomImage4035A.sol";
import "./CrypToadzCustomImage4035B.sol";
import "./CrypToadzCustomImage4035C.sol";
import "./CrypToadzCustomImage4035D.sol";
import "./CrypToadzCustomImage4035E.sol";
import "./CrypToadzCustomImage4035F.sol";

contract CrypToadzCustomImage4035 is Ownable, ICrypToadzCustomImageBank {
    function isCustomImage(uint tokenId) external pure returns (bool) { return tokenId == 4035; }

    function getCustomImage() external view returns (bytes memory buffer) {
        bytes memory bufferA = CrypToadzCustomImage4035A(a).getCustomImage();
        bytes memory bufferB = CrypToadzCustomImage4035B(b).getCustomImage();
        bytes memory bufferC = CrypToadzCustomImage4035C(c).getCustomImage();
        bytes memory bufferD = CrypToadzCustomImage4035D(d).getCustomImage();
        bytes memory bufferE = CrypToadzCustomImage4035E(e).getCustomImage();
        bytes memory bufferF = CrypToadzCustomImage4035F(f).getCustomImage();
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