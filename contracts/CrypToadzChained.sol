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

import "@openzeppelin/contracts/access/Ownable.sol";
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
import "./Presentation.sol";

contract CrypToadzChained is Ownable, IERC721, IERC165 {
    using ERC165Checker for address;

    bytes private constant DATA_URI_PREFIX = "data:";
    bytes private constant DATA_URI_SUFFIX = abi.encodePacked(DATA_URI_PREFIX, ";base64,");
    bytes private constant DATA_IMAGE_PREFIX = abi.encodePacked(DATA_URI_PREFIX, "image/");
    bytes private constant JSON_URI_PREFIX = abi.encodePacked(DATA_URI_PREFIX, "application/json", DATA_URI_SUFFIX);
    bytes private constant PNG_URI_PREFIX = abi.encodePacked(DATA_IMAGE_PREFIX, "png", DATA_URI_SUFFIX);
    bytes private constant GIF_URI_PREFIX = abi.encodePacked(DATA_IMAGE_PREFIX, "gif", DATA_URI_SUFFIX);
    bytes private constant SVG_URI_PREFIX = abi.encodePacked(DATA_IMAGE_PREFIX, "svg+xml", DATA_URI_SUFFIX);

    bytes private constant DESCRIPTION = "A small, warty, amphibious creature that resides in the metaverse.";
    bytes private constant EXTERNAL_URL = "https://cryptoadz.io";
    bytes private constant NAME = "CrypToadz";

    /** @notice Contract responsible for building non-custom toadz images. */
    ICrypToadzBuilder public builder;

    /**
    @notice Flag to disable use of setBuilder().
     */
    bool public builderLocked = false;

    /**
    @notice Permanently sets the builderLocked flag to true.
     */
    function lockBuilder() external onlyOwner {
        require(
            address(builder).supportsInterface(
                type(ICrypToadzBuilder).interfaceId
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
    function setBuilder(address _builder) external onlyOwner {
        require(!builderLocked, "Builder locked");
        builder = ICrypToadzBuilder(_builder);
    }

    /** @notice Contract responsible for looking up metadata. */
    ICrypToadzMetadata public metadata;

    /**
    @notice Flag to disable use of setMetadata().
     */
    bool public metadataLocked = false;

    /**
    @notice Permanently sets the metadataLocked flag to true.
     */
    function lockMetadata() external onlyOwner {
        require(
            address(metadata).supportsInterface(
                type(ICrypToadzMetadata).interfaceId
            ),
            "Not ICrypToadzMetadata"
        );
        metadataLocked = true;
    }

    /**
    @notice Sets the address of the metadata provider contract.
    @dev No checks are performed when setting, but lockMetadata() ensures that
    the final address implements the ICrypToadzMetadata interface.
     */
    function setMetadata(address _metadata) external onlyOwner {
        require(!metadataLocked, "Metadata locked");
        metadata = ICrypToadzMetadata(_metadata);
    }

    /** @notice Contract responsible for looking up strings. */
    ICrypToadzStrings public strings;

    /**
    @notice Flag to disable use of setStrings().
     */
    bool public stringsLocked = false;

    /**
    @notice Permanently sets the stringsLocked flag to true.
     */
    function lockStrings() external onlyOwner {
        require(
            address(strings).supportsInterface(
                type(ICrypToadzStrings).interfaceId
            ),
            "Not ICrypToadzStrings"
        );
        stringsLocked = true;
    }

    /**
    @notice Sets the address of the string provider contract.
    @dev No checks are performed when setting, but lockStrings() ensures that
    the final address implements the ICrypToadzStrings interface.
     */
    function setStrings(address _strings) external onlyOwner {
        require(!stringsLocked, "Strings locked");
        strings = ICrypToadzStrings(_strings);
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
    function lockCustomImages() external onlyOwner {
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
    function setCustomImages(address _customImages) external onlyOwner {
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
    function lockCustomAnimations() external onlyOwner {
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
    function setCustomAnimations(address _customAnimations) external onlyOwner {
        require(!customAnimationsLocked, "CustomAnimations locked");
        customAnimations = ICrypToadzCustomAnimations(_customAnimations);
    }

    function random() external view returns (string memory) {
        return _random(uint64(uint(keccak256(abi.encodePacked(address(this), address(msg.sender), block.coinbase, block.number)))));
    }

    function fromSeed(uint64 seed) external view returns (string memory) {
        return _random(seed);
    }

    function _random(uint64 seed) private view returns (string memory) {
        PRNG.Source src = PRNG.newSource(keccak256(abi.encodePacked(seed)));

        uint8 traits = 2 + uint8(PRNG.readLessThan(src, 6, 8));            
        if(traits < 2 || traits > 7) revert BadTraitCount(traits);
        
        uint8[] memory meta = new uint8[](1 + traits + 1);
        meta[0] = uint8(PRNG.readBool(src) ? 120 : 119);     // Size
        meta[1] = uint8(PRNG.readLessThan(src, 17, 8));      // Background
        meta[2] = 17 + uint8(PRNG.readLessThan(src, 34, 8)); // Body
        
        uint8 picked;
        uint8 count;
        uint8 maxCount = 30;
        bool[] memory flags = new bool[](6);
        while(picked < traits - 2) {
            if(!flags[0] && (PRNG.readBool(src) || count > maxCount)) {
                flags[0] = true;
                picked++;
            } else if(!flags[1] && (PRNG.readBool(src) || count > maxCount)) {
                flags[1] = true;
                picked++;
            } else if(!flags[2] && (PRNG.readBool(src) || count > maxCount)) {
                flags[2] = true;
                picked++;
            } else if(!flags[3] && (PRNG.readBool(src) || count > maxCount)) {
                flags[3] = true;
                picked++;
            } else if(!flags[4] && (PRNG.readBool(src) || count > maxCount)) {
                flags[4] = true;
                picked++;
            } else if(!flags[5] && (PRNG.readBool(src) || count > maxCount)) {
                flags[5] = true;
                picked++;
            }
            count++;
        }

        uint8 index = 3;
        if(flags[0]) {
            uint8 mouth = uint8(121) + uint8(PRNG.readLessThan(src, 18 + 1, 8));
            if(mouth < 121 || mouth > 139) revert TraitOutOfRange(mouth);
            if(mouth == 139) mouth = 55; // Vampire
            meta[index++] = mouth;
        }
        if(flags[1]) {
            uint8 head = uint8(51) + uint8(PRNG.readLessThan(src, 53 + 1, 8));
            if(head < 51 || head > 104) revert TraitOutOfRange(head);
            if(head == 104) head = 249; // Vampire
            meta[index++] = head;
        }
        if(flags[2]) {
            uint8 eyes = uint8(139) + uint8(PRNG.readLessThan(src, 29 + 3, 8));
            if(eyes < 139 || eyes > 170) revert TraitOutOfRange(eyes);
            if(eyes == 168) eyes = 250; // Vampire
            if(eyes == 169) eyes = 252; // Undead
            if(eyes == 170) eyes = 253; // Creep            
            meta[index++] = eyes;
        } 

        if(flags[3]) {
            uint8 clothes = uint8(246) + uint8(PRNG.readLessThan(src, 3, 8));
            if(clothes < 246 || clothes > 248) revert TraitOutOfRange(clothes);
            meta[index++] = clothes;
        }
        if(flags[4]) {
            uint8 accessoryII = uint8(104) + uint8(PRNG.readLessThan(src, 8, 8));
            if(accessoryII < 104 || accessoryII > 111) revert TraitOutOfRange(accessoryII);
            meta[index++] = accessoryII;
        }
        if(flags[5]) {
            uint8 accessoryI = uint8(237) + uint8(PRNG.readLessThan(src, 9, 8));
            if(accessoryI < 237 || accessoryI > 245) revert TraitOutOfRange(accessoryI);
            meta[index++] = accessoryI;
        }
        
        // # Traits
        if(traits == 2) {
            meta[index++] = 114;
        } else if(traits == 3) {
            meta[index++] = 116;
        } else if(traits == 4) {
            meta[index++] = 112;
        } else if(traits == 5) {
            meta[index++] = 113;
        } else if(traits == 6) {
            meta[index++] = 115;
        } else if(traits == 7) {
            meta[index++] = 118;
        } else { 
            revert BadTraitCount(traits);
        }

        string memory attributes = getAttributes(meta);

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
                GIFEncoder.getDataUri(builder.getImage(meta)),
                '",',
                attributes,
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
        return _getTokenURI(tokenId, Presentation.Image);
    }

    function tokenURIWithPresentation(uint256 tokenId, Presentation presentation) external view returns (string memory) {
        return _getTokenURI(tokenId, presentation);
    }

    function _getTokenURI(uint256 tokenId, Presentation presentation) private view returns (string memory) {
        (uint8[] memory meta) = metadata.getMetadata(tokenId);

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
            GIFEncoder.GIF memory gif = builder.getImage(meta, tokenId);
            imageUri = GIFEncoder.getDataUri(gif);
        }

        string memory imageDataUri;
        if(presentation == Presentation.ImageData || presentation == Presentation.Both) {

            string memory imageData = string(abi.encodePacked(
            '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve">',
            '<image style="image-rendering:-moz-crisp-edges;image-rendering:-webkit-crisp-edges;image-rendering:pixelated;" width="100" height="100" xlink:href="', 
            imageUri, '"/></svg>'));
            
            imageDataUri = string(abi.encodePacked(SVG_URI_PREFIX, Base64.encode(bytes(imageData), bytes(imageData).length)));
        }

        string memory json;

        json = string(
            abi.encodePacked(
                '{"description":"', DESCRIPTION,
                '","external_url":"', EXTERNAL_URL,
                '","name":"', NAME, " #", Strings.toString(tokenId)               
            )
        );

        if(presentation == Presentation.Image || presentation == Presentation.Both) {
            json = string(abi.encodePacked(json, '","image":"', imageUri, '",'));
        }

        if(presentation == Presentation.ImageData || presentation == Presentation.Both) {
            json = string(abi.encodePacked(json, '","image_data":"', imageDataUri, '",'));
        }

        json = string(abi.encodePacked(json, getAttributes(meta), '}'));

        return
            string(
                abi.encodePacked(
                    JSON_URI_PREFIX,
                    Base64.encode(bytes(json), bytes(json).length)
                )
            );
    }

    function getAttributes(uint8[] memory meta)
        private
        view
        returns (string memory attributes)
    {
        attributes = string(abi.encodePacked('"attributes":['));
        uint8 numberOfTraits;
        for (uint8 i = 1; i < meta.length; i++) {
            uint8 value = meta[i];            
            if(value == 254) continue; // stop byte            
            string memory traitName = getTraitName(value);
            
            string memory label = strings.getString(
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
