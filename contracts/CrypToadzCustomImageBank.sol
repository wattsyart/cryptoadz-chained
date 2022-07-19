// SPDX-License-Identifier: MPL-2.0

pragma solidity ^0.8.13;

import "@divergencetech/ethier/contracts/utils/DynamicBuffer.sol";
import "./BufferUtils.sol";
import "hardhat/console.sol";

library CrypToadzCustomImageBank {
    function getCustomImage(mapping(uint8 => uint16) storage lengths, mapping(uint8 => address) storage data)
        external
        view
        returns (bytes memory buffer)
    {
        uint256 size;
        uint8 count;
        while (lengths[count] != 0) {
            size += lengths[count++];
        }

        console.log("size should be %s, across %s buckets", size, count);

        buffer = DynamicBuffer.allocate(size);
        for (uint8 i = 0; i < count; i++) {
            console.log("chunk length = %s, address = %s", data[i], lengths[i]);
            bytes memory chunk = BufferUtils.decompress(
                data[i],
                lengths[i]
            );            
            DynamicBuffer.appendUnchecked(buffer, chunk);
            console.log("decompressed chunk %s", i);
        }
        
        console.log("buffer with size %s was allocated", size);
    }
}