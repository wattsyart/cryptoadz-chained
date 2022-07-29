// SPDX-License-Identifier: MPL-2.0

pragma solidity ^0.8.13;

import "./Rectangle.sol";

interface ICrypToadzFeatureBuilder {
    function get(uint8 key) external view returns (address);
    function getRect(uint8 key) external view returns (Rectangle memory);
}
