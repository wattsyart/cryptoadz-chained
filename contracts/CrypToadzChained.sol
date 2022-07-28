// SPDX-License-Identifier: MPL-2.0

/*
CrypToadz Created By:
  ___  ____  ____  __  __  ____  __    ____  _  _ 
 / __)(  _ \( ___)(  \/  )(  _ \(  )  (_  _)( \( )
( (_-. )   / )__)  )    (  )___/ )(__  _)(_  )  ( 
 \___/(_)\_)(____)(_/\/\_)(__)  (____)(____)(_)\_) 
(https://cryptoadz.io)

CrypToadzChained Programmed By:
 __      __         __    __                 
/  \    /  \_____ _/  |__/  |_  _________.__.
\   \/\/   /\__  \\   __\   __\/  ___<   |  |
 \        /  / __ \|  |  |  |  \___ \ \___  |
  \__/\  /  (____  /__|  |__| /____  >/ ____|
       \/        \/                \/ \/     
(https://wattsy.art)
*/

pragma solidity ^0.8.13;

import "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@divergencetech/ethier/contracts/random/PRNG.sol";

import "./IERC721.sol";
import "./ICrypToadzStrings.sol";
import "./ICrypToadzBuilder.sol";
import "./ICrypToadzMetadata.sol";
import "./ICrypToadzCustomImages.sol";
import "./ICrypToadzCustomAnimations.sol";

import "./PixelRenderer.sol";
import "./GIFDraw.sol";

contract CrypToadzChained is IERC721, IERC165 {
    using ERC165Checker for address;

    bytes private constant JSON_URI_PREFIX = "data:application/json;base64,";
    bytes private constant PNG_URI_PREFIX = "data:image/png;base64,";
    bytes private constant GIF_URI_PREFIX = "data:image/gif;base64,";
    bytes private constant DESCRIPTION = "A small, warty, amphibious creature that resides in the metaverse.";
    bytes private constant EXTERNAL_URL = "https://cryptoadz.io";
    bytes private constant NAME = "CrypToadz";

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

    /** @notice Contract responsible for rendering custom images. */
    ICrypToadzCustomImages public customImages;

    /**
    @notice Flag to disable use of setCustomImages().
     */
    bool public customImagesLocked = false;

    /**
    @notice Permanently sets the customImagesLocked flag to true.
     */
    function lockCustomImages() external {
        require(msg.sender == owner, "only owner");
        require(
            address(customImages).supportsInterface(
                type(ICrypToadzCustomImages).interfaceId
            ),
            "Not ICrypToadzCustomImages"
        );
        customImagesLocked = true;
    }

    /**
    @notice Sets the address of the custom images contract.
    @dev No checks are performed when setting, but lockCustomImages() ensures that
    the final address implements the ICrypToadzCustomImages interface.
     */
    function setCustomImages(address _customImages) public {
        require(msg.sender == owner, "only owner");
        require(!customImagesLocked, "CustomImages locked");
        customImages = ICrypToadzCustomImages(_customImages);
    }

    /** @notice Contract responsible for rendering custom animations. */
    ICrypToadzCustomAnimations public customAnimations;

    /**
    @notice Flag to disable use of setCustomAnimations().
     */
    bool public customAnimationsLocked = false;

    /**
    @notice Permanently sets the customAnimationsLocked flag to true.
     */
    function lockCustomAnimations() external {
        require(msg.sender == owner, "only owner");
        require(
            address(customAnimations).supportsInterface(
                type(ICrypToadzCustomAnimations).interfaceId
            ),
            "Not ICrypToadzCustomAnimations"
        );
        customAnimationsLocked = true;
    }

    /**
    @notice Sets the address of the custom animations contract.
    @dev No checks are performed when setting, but lockCustomAnimations() ensures that
    the final address implements the ICrypToadzCustomAnimations interface.
     */
    function setCustomAnimations(address _customAnimations) public {
        require(msg.sender == owner, "only owner");
        require(!customAnimationsLocked, "CustomAnimations locked");
        customAnimations = ICrypToadzCustomAnimations(_customAnimations);
    }   

    address owner;

    constructor(
        address _stringProvider,
        address _builder,
        address _metadataProvider,
        address _customImages,
        address _customAnimations
    ) {
        stringProvider = ICrypToadzStrings(_stringProvider);
        builder = ICrypToadzBuilder(_builder);
        metadataProvider = ICrypToadzMetadata(_metadataProvider);
        customImages = ICrypToadzCustomImages(_customImages);
        customAnimations = ICrypToadzCustomAnimations(_customAnimations);
        owner = msg.sender;
    }

    function random() external view returns (string memory) {
        return _random(uint64(uint(keccak256(abi.encodePacked(address(this), address(msg.sender), block.coinbase, block.number)))));
    }

    function random(uint64 seed) external view returns (string memory) {
        return _random(seed);
    }

    function _random(uint64 seed) private view returns (string memory) {
        PRNG.Source src = PRNG.newSource(keccak256(abi.encodePacked(seed)));

        uint8 traits = 2 + uint8(PRNG.readLessThan(src, 6, 8));            
        if(traits < 2 || traits > 7) revert BadTraitCount(traits);

        uint8[] memory metadata = new uint8[](1 + traits);
        metadata[0] = uint8(PRNG.readBool(src) ? 120 : 119);     // Size        
        metadata[1] = uint8(PRNG.readLessThan(src, 17, 8));      // Background
        metadata[2] = 17 + uint8(PRNG.readLessThan(src, 34, 8)); // Body

        // WARNING: We need a stable order, so there is a possibility of OutOfGas here!
        uint8 picked;
        bool[] memory flags = new bool[](6);
        while(picked < traits) {
            if(!flags[0] && PRNG.readBool(src)) {
                flags[0] = true;
                picked++;
            } else if(!flags[1] && PRNG.readBool(src)) {
                flags[1] = true;
                picked++;
            } else if(!flags[2] && PRNG.readBool(src)) {
                flags[2] = true;
                picked++;
            } else if(!flags[3] && PRNG.readBool(src)) {
                flags[3] = true;
                picked++;
            } else if(!flags[4] && PRNG.readBool(src)) {
                flags[4] = true;
                picked++;
            } else if(!flags[5] && PRNG.readBool(src)) {
                flags[5] = true;
                picked++;
            }
        }

        // WARNING: OS counts match, but currently this won't ever pick Vampire Head/Eyes, Undead Eyes, or Creep Eyes
        uint8 index = 3;
        if(flags[0]) metadata[index++] = uint8(121) + uint8(PRNG.readLessThan(src, 18, 8)); // Mouth        
        if(flags[1]) metadata[index++] = uint8( 51) + uint8(PRNG.readLessThan(src, 53, 8)); // Head
        if(flags[2]) metadata[index++] = uint8(139) + uint8(PRNG.readLessThan(src, 33, 8)); // Eyes
        if(flags[3]) metadata[index++] = uint8(246) + uint8(PRNG.readLessThan(src,  3, 8)); // Clothes
        if(flags[4]) metadata[index++] = uint8(104) + uint8(PRNG.readLessThan(src,  8, 8)); // Accessory II        
        if(flags[5]) metadata[index++] = uint8(237) + uint8(PRNG.readLessThan(src,  9, 8)); // Accessory I
        
        // # Traits
        if(traits == 2) {
            metadata[index++] = 114;
        } else if(traits == 3) {
            metadata[index++] = 116;
        } else if(traits == 4) {
            metadata[index++] = 112;
        } else if(traits == 5) {
            metadata[index++] = 113;
        } else if(traits == 6) {
            metadata[index++] = 115;
        } else if(traits == 7) {
            metadata[index++] = 118;
        } else { 
            revert BadTraitCount(traits);
        }

        string memory json = string(
            abi.encodePacked(
                '{"description":"',
                DESCRIPTION,
                '","external_url":"',
                EXTERNAL_URL,
                '","name":"',
                NAME,
                " #",
                Strings.toString(seed),
                '","image":"',
                GIFEncoder.getDataUri(builder.getImage(metadata)),
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

    function tokenURI(uint256 tokenId) external view returns (string memory) {
        (uint8[] memory metadata) = metadataProvider.getMetadata(tokenId);

        string memory imageUri;
        if (customImages.isCustomImage(tokenId)) {
            bytes memory customImage = customImages.getCustomImage(tokenId);
            imageUri = string(
                abi.encodePacked(
                    PNG_URI_PREFIX,
                    Base64.encode(customImage, customImage.length)
                )
            );
        } else if (customAnimations.isCustomAnimation(tokenId)) {
            bytes memory customAnimation = customAnimations.getCustomAnimation(
                tokenId
            );
            imageUri = string(
                abi.encodePacked(
                    GIF_URI_PREFIX,
                    Base64.encode(customAnimation, customAnimation.length)
                )
            );
        } else {
            GIFEncoder.GIF memory gif = builder.getImage(metadata, tokenId);
            imageUri = GIFEncoder.getDataUri(gif);
        }

        string memory json = string(
            abi.encodePacked(
                '{"description":"',
                DESCRIPTION,
                '","external_url":"',
                EXTERNAL_URL,
                '","name":"',
                NAME,
                " #",
                Strings.toString(tokenId),
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
            
            if(value == 119 || value == 120 || value == 251 || value == 254) {
                continue; // Short, Tall, N/A, stop byte
            }

            string memory traitName = getTraitName(value);
            
            string memory label = stringProvider.getString(
                // Undead
                value == 249 ? 55 : 
                value == 250 ? 55 : 
                // Creep
                value == 252 ? 37 : 
                value == 253 ? 20 : value);

            (string memory a, uint8 t) = appendTrait(
                value >= 112 && value < 119,
                attributes,
                traitName,
                label,
                numberOfTraits
            );
            attributes = a;
            numberOfTraits = t;
        }
        attributes = string(abi.encodePacked(attributes, "]"));
    }

    function appendTrait(
        bool isNumber,
        string memory attributes,
        string memory trait_type,
        string memory value,
        uint8 numberOfTraits
    ) private pure returns (string memory, uint8) {
        if (bytes(value).length > 0) {
            numberOfTraits++;

            if (isNumber) {
                attributes = string(
                    abi.encodePacked(
                        attributes,
                        numberOfTraits > 1 ? "," : "",
                        '{"trait_type":"',
                        trait_type,
                        '","value":',
                        value,
                        "}"
                    )
                );
            } else {
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
        }
        return (attributes, numberOfTraits);
    }

    function getTraitName(uint8 traitValue)
        internal
        pure
        returns (string memory)
    {
        if (traitValue >= 0 && traitValue < 17) {
            return "Background";
        }
        if (traitValue >= 17 && traitValue < 51) {
            return "Body";
        }
        if (traitValue >= 51 && traitValue < 104) {
            if(traitValue == 55) return "Mouth"; // Vampire
            return "Head";
        }
        if (traitValue >= 104 && traitValue < 112) {
            return "Accessory II";
        }
        if (traitValue >= 112 && traitValue < 119) {
            return "# Traits";
        }
        if (traitValue >= 119 && traitValue < 121) {
            return "Size";
        }
        if (traitValue >= 121 && traitValue < 138) {
            return "Mouth";
        }
        if (traitValue >= 138 && traitValue < 168) {
            return "Eyes";
        }
        if (traitValue >= 168 && traitValue < 174) {
            return "Custom";
        }
        if (traitValue >= 174 && traitValue < 237) {
            return "Name";
        }
        if (traitValue >= 237 && traitValue < 246) {
            return "Accessory I";
        }
        if (traitValue >= 246 && traitValue < 249) {
            return "Clothes";
        }

        if(traitValue == 249) return "Head"; // Vampire
        if(traitValue == 250) return "Eyes"; // Vampire

        if(traitValue == 251) return "Size";

        if(traitValue == 252) return "Eyes"; // Undead
        if(traitValue == 253) return "Eyes"; // Creep  

        revert TraitOutOfRange(traitValue);
    }

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
