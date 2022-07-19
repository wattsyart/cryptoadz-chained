// SPDX-License-Identifier: MPL-2.0

pragma solidity ^0.8.13;

import "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import "@divergencetech/ethier/contracts/utils/DynamicBuffer.sol";

import "./IERC721.sol";
import "./ICrypToadzStrings.sol";
import "./ICrypToadzBuilder.sol";
import "./ICrypToadzMetadata.sol";
import "./PixelRenderer.sol";
import "./GIFDraw.sol";

contract CrypToadzBase is IERC721, IERC165 {
    using ERC165Checker for address;

    bytes private constant JSON_URI_PREFIX = "data:application/json;base64,";
    bytes private constant PNG_URI_PREFIX = "data:image/png;base64,";
    bytes private constant GIF_URI_PREFIX = "data:image/gif;base64,";
    bytes private constant DESCRIPTION = "A small, warty, amphibious creature that resides in the metaverse.";
    bytes private constant EXTERNAL_URL = "https://cryptoadz.io";    

    mapping(uint256 => mapping(uint8 => uint16)) animationLengths;
    mapping(uint256 => mapping(uint8 => address)) animationData;

    mapping(uint256 => mapping(uint8 => uint16)) customImageLengths;
    mapping(uint256 => mapping(uint8 => address)) customImageData;

    mapping(uint256 => mapping(uint8 => uint16)) customAnimationLengths;
    mapping(uint256 => mapping(uint8 => address)) customAnimationData;

    /** @notice Contract responsible for looking up strings. */
    ICrypToadzStrings public stringProvider;

    /**
    @notice Flag to disable use of setStringProvider().
     */
    bool public stringProviderLocked = false;

    /**
    @notice Permanently sets the stringProviderLocked flag to true.
     */
    function lockStringProvider() external {
        require(msg.sender == owner, "only owner");
        require(
            address(stringProvider).supportsInterface(
                type(ICrypToadzStrings).interfaceId
            ),
            "Not ICrypToadzStrings"
        );
        stringProviderLocked = true;
    }

    /**
    @notice Sets the address of the string provider contract.
    @dev No checks are performed when setting, but lockStringProvider() ensures that
    the final address implements the ICryptoadzStrings interface.
     */
    function setStringProvider(address _stringProvider) public {
        require(msg.sender == owner, "only owner");
        require(!stringProviderLocked, "StringProvider locked");
        stringProvider = ICrypToadzStrings(_stringProvider);
    }

    /** @notice Contract responsible for building non-custom toadz images. */
    ICrypToadzBuilder public builder;

    /**
    @notice Flag to disable use of setBuilder().
     */
    bool public builderLocked = false;

    /**
    @notice Permanently sets the builderLocked flag to true.
     */
    function lockBuilder() external {
        require(msg.sender == owner, "only owner");
        require(
            address(builder).supportsInterface(
                type(ICrypToadzStrings).interfaceId
            ),
            "Not ICrypToadzBuilder"
        );
        builderLocked = true;
    }

    /**
    @notice Sets the address of the builder contract.
    @dev No checks are performed when setting, but lockBuilder() ensures that
    the final address implements the ICrypToadzBuilder interface.
     */
    function setBuilder(address _builder) public {
        require(msg.sender == owner, "only owner");
        require(!builderLocked, "Builder locked");
        builder = ICrypToadzBuilder(_builder);
    }


    /** @notice Contract responsible for looking up metadata. */
    ICrypToadzMetadata public metadataProvider;

    /**
    @notice Flag to disable use of setMetadataProvider().
     */
    bool public metadataProviderLocked = false;

    /**
    @notice Permanently sets the metadataProviderLocked flag to true.
     */
    function lockMetadataProvider() external {
        require(msg.sender == owner, "only owner");
        require(
            address(metadataProvider).supportsInterface(
                type(ICrypToadzMetadata).interfaceId
            ),
            "Not ICrypToadzMetadata"
        );
        metadataProviderLocked = true;
    }

    /**
    @notice Sets the address of the metadata provider contract.
    @dev No checks are performed when setting, but lockMetadataProvider() ensures that
    the final address implements the ICrypToadzMetadata interface.
     */
    function setMetadataProvider(address _metadataProvider) public {
        require(msg.sender == owner, "only owner");
        require(!metadataProviderLocked, "MetadataProvider locked");
        metadataProvider = ICrypToadzMetadata(_metadataProvider);
    }

    address owner;

    constructor(address _stringProvider, address _builder) {
        stringProvider = ICrypToadzStrings(_stringProvider);
        builder = ICrypToadzBuilder(_builder);
        owner = msg.sender;
    }

    function tokenURI(uint256 tokenId) external view returns (string memory) {
        (uint8[] memory metadata, bool isTallToken) = metadataProvider.getMetadata(tokenId);

        string memory imageUri;
        if (animationData[tokenId][0] != address(0)) {
            GIFEncoder.GIF memory gif = getAnimation(tokenId);
            imageUri = GIFEncoder.getDataUri(gif);
        } else if (customImageData[tokenId][0] != address(0)) {
            bytes memory customImage = getCustomImage(tokenId);
            imageUri = string(
                abi.encodePacked(
                    PNG_URI_PREFIX,
                    Base64.encode(customImage, customImage.length)
                )
            );
        } else if (customAnimationData[tokenId][0] != address(0)) {
            bytes memory customAnimation = getCustomAnimation(tokenId);
            imageUri = string(
                abi.encodePacked(
                    GIF_URI_PREFIX,
                    Base64.encode(customAnimation, customAnimation.length)
                )
            );
        } else {
            GIFEncoder.GIF memory gif = builder.getImage(
                metadata,
                tokenId,
                isTallToken
            );
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
        return
            string(
                abi.encodePacked(
                    JSON_URI_PREFIX,
                    Base64.encode(bytes(json), bytes(json).length)
                )
            );
    }    

    function getAttributes(uint8[] memory metadata)
        private
        view
        returns (string memory attributes)
    {
        attributes = string(abi.encodePacked('"attributes":['));
        uint8 numberOfTraits;
        for (uint8 i = 0; i < metadata.length; i++) {
            uint8 value = metadata[i];
            if (value == 119 || value == 120) {
                continue;
            }
            (string memory a, uint8 t) = appendTrait(
                attributes,
                getTraitName(value),
                stringProvider.getString(value),
                numberOfTraits
            );
            attributes = a;
            numberOfTraits = t;
        }
        attributes = string(abi.encodePacked(attributes, "]"));
    }

    function appendTrait(
        string memory attributes,
        string memory trait_type,
        string memory value,
        uint8 numberOfTraits
    ) private pure returns (string memory, uint8) {
        if (bytes(value).length > 0) {
            numberOfTraits++;
            attributes = string(
                abi.encodePacked(
                    attributes,
                    numberOfTraits > 1 ? "," : "",
                    '{"trait_type":"',
                    trait_type,
                    '","value":"',
                    value,
                    '"}'
                )
            );
        }
        return (attributes, numberOfTraits);
    }

    function getCustomImage(uint256 tokenId)
        internal
        view
        returns (bytes memory buffer)
    {
        uint256 size;
        uint8 count;
        while (customImageLengths[tokenId][count] != 0) {
            size += customImageLengths[tokenId][count++];
        }

        buffer = DynamicBuffer.allocate(size);
        for (uint8 i = 0; i < count; i++) {
            bytes memory chunk = BufferUtils.decompress(
                customImageData[tokenId][i],
                customImageLengths[tokenId][i]
            );
            DynamicBuffer.appendUnchecked(buffer, chunk);
        }
    }

    function getCustomAnimation(uint256 tokenId)
        internal
        view
        returns (bytes memory buffer)
    {
        uint256 size;
        uint8 count;
        while (customAnimationLengths[tokenId][count] != 0) {
            size += customAnimationLengths[tokenId][count++];
        }

        buffer = DynamicBuffer.allocate(size);
        for (uint8 i = 0; i < count; i++) {
            bytes memory chunk = BufferUtils.decompress(
                customAnimationData[tokenId][i],
                customAnimationLengths[tokenId][i]
            );
            DynamicBuffer.appendUnchecked(buffer, chunk);
        }
    }

    function getAnimation(uint256 tokenId)
        internal
        view
        returns (GIFEncoder.GIF memory gif)
    {
        uint256 size;
        uint8 count;
        while (animationLengths[tokenId][count] != 0) {
            size += animationLengths[tokenId][count++];
        }

        bytes memory buffer = DynamicBuffer.allocate(size);
        for (uint8 i = 0; i < count; i++) {
            bytes memory chunk = BufferUtils.decompress(
                animationData[tokenId][i],
                animationLengths[tokenId][i]
            );
            DynamicBuffer.appendUnchecked(buffer, chunk);
        }

        uint256 position;
        uint8 frameCount;
        (frameCount, position) = BufferUtils.readByte(position, buffer);

        gif.width = 36;
        gif.height = 36;
        gif.frames = new GIFEncoder.GIFFrame[](frameCount);

        for (uint8 i = 0; i < frameCount; i++) {
            GIFEncoder.GIFFrame memory frame;
            frame.width = gif.width;
            frame.height = gif.height;
            frame.buffer = new uint32[](frame.width * frame.height);

            position = GIFDraw.draw(frame, buffer, position, 0, 0, false);

            gif.frames[gif.frameCount++] = frame;
        }
    }    

    function getAnimationFileForToken(uint256 tokenId)
        internal
        pure
        virtual
        returns (uint8)
    {
        revert();
    }

    function getCustomImageFileForToken(uint256 tokenId)
        internal
        pure
        virtual
        returns (uint8)
    {
        revert();
    }

    function getTraitName(uint8 traitValue) internal virtual pure returns (string memory) { revert(); }      

    /**
    @notice Adds ERC2981 interface to the set of already-supported interfaces.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        pure
        override(IERC165)
        returns (bool)
    {
        return interfaceId == type(IERC721).interfaceId;
    }   
}
