// SPDX-License-Identifier: MPL-2.0

pragma solidity ^0.8.13;

interface IERC721 {
    function tokenURI(uint256 tokenId) external view returns(string memory);
}