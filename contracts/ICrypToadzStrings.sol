// SPDX-License-Identifier: MPL-2.0

pragma solidity ^0.8.13;

interface ICrypToadzStrings {
    function getString(uint8 key) external view returns (string memory);
}