// SPDX-License-Identifier: CC0-1.0

pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";

import "../../../BufferUtils.sol";
import "../../../ICrypToadzCustomImageBank.sol";
import "../../../CrypToadzCustomImageBank.sol";

contract CrypToadzCustomImage48000000 is Ownable, ICrypToadzCustomImageBank {
    address immutable customImageData;

    function isCustomImage(uint tokenId) external pure returns (bool) { return tokenId == 48000000; }

    function getCustomImage() external view returns (bytes memory buffer) {
        return CrypToadzCustomImageBank.getCustomImageSingleUncompressed(customImageData);
    }

    constructor() {
        customImageData = SSTORE2.write(hex"47494638396124002400f2000000000018191c5e7253ff00007da269c4da539bbc8800000021ff0b4e45545343415045322e30030100000021f904042100000021ff0b496d6167654d616769636b0d67616d6d613d302e3435343535002c000000002400240000039218badcfe30ca49abbd38ebcdbbff60288e64699e1ca0aeacfa01846010f44cd34007dffc3d1bb90d404024c68a82182198810d9e2ac27310b5312d3b5a92b7e5b9b08082784c2ec700c00a2cdc6aab0a38dc04bd2c170476fc6c484847f802593d5c3759570e82307b714b358d4a8788065b868d893d9188514b2b962c9c6b1482858ca3726a6ea92d28acadaeafb0b117090021f9040c2100000021ff0b496d6167654d616769636b0d67616d6d613d302e3435343535002c0b0012000b00010081000000ff00007da269000000020504826218050021f904052100000021ff0b496d6167654d616769636b0e67616d6d613d302e343534353435002c000000000100010000020244010021f9040c2100000021ff0b496d6167654d616769636b0d67616d6d613d302e3435343535002c0b0012000b00010081000000ff00007da269000000020504826218050021f904052100000021ff0b496d6167654d616769636b0e67616d6d613d302e343534353435002c000000000100010000020244010021f9040c2100000021ff0b496d6167654d616769636b0d67616d6d613d302e3435343535002c0b0012000b00010081000000ff00007da269000000020504826218050021f904052100000021ff0b496d6167654d616769636b0e67616d6d613d302e343534353435002c000000000100010000020244010021f904042100000021ff0b496d6167654d616769636b0d67616d6d613d302e3435343535002c0b0012000b00010081000000ff00007da269000000020504826218050021f9040c2100000021ff0b496d6167654d616769636b0d67616d6d613d302e3435343535002c0b0011000b000200805e72537da26902078c8f01bbca50000021f904052100000021ff0b496d6167654d616769636b0e67616d6d613d302e343534353435002c000000000100010000020244010021f904042100000021ff0b496d6167654d616769636b0d67616d6d613d302e3435343535002c0b0012000b00010081000000ff00007da26900000002058c01628105003b");
    }
}