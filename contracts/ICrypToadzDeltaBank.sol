// SPDX-License-Identifier: MPL-2.0

pragma solidity ^0.8.13;

import "./GIFEncoder.sol";

interface ICrypToadzDeltaBank {
    function getBufferAtIndex(uint8 index) external view returns (bytes memory buffer);    
}