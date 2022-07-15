// SPDX-License-Identifier: MPL-2.0

pragma solidity ^0.8.13;

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////

import "./GIFEncoder.sol";
import "./BufferUtils.sol";
import "./lib/InflateLib.sol";
import "./lib/SSTORE2.sol";

interface IERC721 {
    function tokenURI(uint256 tokenId) external view returns(string memory);
}

contract WaxBase is IERC721 {

    bytes constant private JSON_URI_PREFIX = "data:application/json;base64,"; 
    bytes constant private PNG_URI_PREFIX = "data:image/png;base64,";
    bytes constant private GIF_URI_PREFIX = "data:image/gif;base64,";
    bytes constant private DESCRIPTION = "A small, warty, amphibious creature that resides in the metaverse.";
    bytes constant private EXTERNAL_URL = "https://cryptoadz.io";

    mapping(uint8 => string) strings;
    
    mapping(uint8 => uint16) metadataLengths;
    mapping(uint8 => address) metadataData;
    
    mapping(uint => mapping(uint8 => uint16)) animationLengths;
    mapping(uint => mapping(uint8 => address)) animationData;
    
    mapping(uint => mapping(uint8 => uint16)) customImageLengths;
    mapping(uint => mapping(uint8 => address)) customImageData;    

    mapping(uint => mapping(uint8 => uint16)) customAnimationLengths;
    mapping(uint => mapping(uint8 => address)) customAnimationData;

    function tokenURI(uint256 tokenId) external view returns (string memory) {   
        uint8 metadataFile = getMetadataFileForToken(tokenId);
        (uint8[] memory metadata, bool isTallToken) = getMetadata(tokenId, metadataFile);

        string memory imageUri;
        if(animationData[tokenId][0] != address(0)) {
            GIFEncoder.GIF memory gif = getAnimation(tokenId);
            imageUri = GIFEncoder.getDataUri(gif);
        } else if(customImageData[tokenId][0] != address(0)) {
            bytes memory customImage = getCustomImage(tokenId);
            imageUri = string(abi.encodePacked(PNG_URI_PREFIX, Base64.encode(customImage, customImage.length)));
        } else if(customAnimationData[tokenId][0] != address(0)) {
            bytes memory customAnimation = getCustomAnimation(tokenId);
            imageUri = string(abi.encodePacked(GIF_URI_PREFIX, Base64.encode(customAnimation, customAnimation.length)));
        } else {
            GIFEncoder.GIF memory gif = getImage(metadata, tokenId, getImageFileForToken(tokenId), isTallToken);            
            imageUri = GIFEncoder.getDataUri(gif);
        }

        string memory json = string(
            abi.encodePacked(
                '{"description":"',
                DESCRIPTION,
                '","external_url":"',
                EXTERNAL_URL,
                '","image":"',
                imageUri,
                '",',
                getAttributes(metadata),
                "}"
            )
        );
        return string(abi.encodePacked(JSON_URI_PREFIX, Base64.encode(bytes(json), bytes(json).length)));
    }

    function getMetadata(uint tokenId, uint8 file) private view returns (uint8[] memory metadata, bool isTall) {
        (InflateLib.ErrorCode code, bytes memory buffer) = InflateLib.puff(SSTORE2.read(metadataData[file]), metadataLengths[file]);
        require(code == InflateLib.ErrorCode.ERR_NONE);
        require(buffer.length == metadataLengths[file]);

        (uint position, uint8 length) = BufferUtils.advanceToTokenPosition(tokenId, buffer);
        isTall = buffer[position] == bytes1(uint8(120));

        metadata = new uint8[](length);
        for (uint256 i = 0; i < length; i++) {
            uint8 value;
            (value, position) = BufferUtils.readByte(position, buffer);
            metadata[i] = value;
        }
    }

    function getAttributes(uint8[] memory metadata) private view returns (string memory attributes) {
        attributes = string(abi.encodePacked('"attributes":['));   
        uint8 numberOfTraits;
        for (uint8 i = 0; i < metadata.length; i++) {
            uint8 value = metadata[i];
            if(value == 119 || value == 120) {
                continue;
            }
            (string memory a, uint8 t) = appendTrait(
                attributes,
                getTraitName(value),
                strings[value],
                numberOfTraits
            );
            attributes = a;
            numberOfTraits = t;
        }
        attributes = string(abi.encodePacked(attributes, ']'));
    }

    function appendTrait(string memory attributes, string memory trait_type, string memory value, uint8 numberOfTraits) private pure returns (string memory, uint8) {
        if(bytes(value).length > 0) {
            numberOfTraits++;
            attributes = string(abi.encodePacked(attributes, numberOfTraits > 1 ? ',' : '', '{"trait_type":"', trait_type, '","value":"', value, '"}'));
        }
        return (attributes, numberOfTraits);
    }

    function getMetadataFileForToken(uint tokenId) internal virtual pure returns (uint8) { revert(); }
    function getTraitName(uint8 traitValue) internal virtual pure returns (string memory) { revert(); }
    function getImageFileForToken(uint tokenId) internal virtual pure returns (uint8) { revert(); }            

    function getImage(uint8[] memory metadata, uint tokenId, uint8 file, bool isTallToken) internal virtual view returns (GIFEncoder.GIF memory gif) { revert(); }
    function getAnimation(uint tokenId) internal virtual view returns (GIFEncoder.GIF memory gif) { revert(); }
    function getCustomImage(uint256 tokenId) internal virtual view returns (bytes memory buffer) { revert(); }
    function getCustomAnimation(uint256 tokenId) internal virtual view returns (bytes memory buffer) { revert(); }
}