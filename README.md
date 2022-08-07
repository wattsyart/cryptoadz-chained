# CrypToadzChained
The same CrypToadz you know and love, preserved on-chain.

## Where To Find It?

The contracts are currently [live on Rinkeby](https://rinkeby.etherscan.io/address/0x4190aC5bc2499dC0285AC344F92c6E87dF99f93A#code) 
and you can use the [Viewer App](https://cryptoadzchained.azurewebsites.net) to play with it. 

The code for the viewer is [in this repository](https://github.com/wattsyart/cryptoadz-chained/tree/main/ui).

## Setting Up

Due to complexity, hardhat on its own cannot deploy the project without a private geth client deployed to Docker.

First, you will need to install [Docker Desktop](https://www.docker.com/products/docker-desktop) for your development environment.

In VS Code w/ the Docker Extension installed, you can right-click `./docker/docker-compose.yml` and choose `Compose Up`, or run:

```bash
docker compose -f "docker\docker-compose.yml" up -d --build 
```

On the command line to bring up the private node instance.

Once deployed, you can run the following commands to compile the project, deploy to the private node, and return the `tokenURI` for CrypToadz #1:

```bash
npm install
npx hardhat compile
node scripts/deployer.js
npx hardhat toadz --id 1
```

The following list shows all available hardhat commands.

```bash
npx hardhat toadz                         Validates correctness of a single CrypToadz
npx hardhat toadz-all                     Validates correctness of all CrypToadz tokens
npx hardhat toadz-all-images              Validates correctness of all CrypToadz token images
npx hardhat toadz-all-metadata            Validates correctness of all CrypToadz token metadata
npx hardhat toadz-custom-animations       Validates correctness of CrypToadz custom animations
npx hardhat toadz-custom-images           Validates correctness of CrypToadz custom images
npx hardhat toadz-deploy-bundle           Produces a JSON file containing unsigned transactions for all deployments at a set price budget
npx hardhat toadz-gas                     Produces ETH cost breakdown for deployment by component
npx hardhat toadz-image-deltas            Validates correctness of CrypToadz token images that have deltas
npx hardhat toadz-random-batch            Batch-based random generation for stress testing
npx hardhat toadz-random-image            Generates a random toadz imageURI and saves the image to disk
npx hardhat toadz-random-token            Generates a random toadz tokenURI and saves the metadata and image to disk
toadz-wrapped                 Validates correctness of a single, wrapped CrypToadz
```

## Design Notes

Note that this project is NOT an ERC-721 token in its own right, and only contains the `tokenURI` method from ERC-721
in order to return the on-chain metadata and image for a given CrypToadz Token ID.

Deployment is modular, and split across five main components:

`CrypToadzChained`: contract responsible producing an on-chain tokenURI, and main entrypoint to the project

`CrypToadzBuilder`: contains features and builder logic for "buildable" toadz (non-custom, non-animations)

`CrypToadzDeltas`: contains patch data for built toadz where errors occur (manually edited images, metadata mismatches, etc.)

`CrypToadzMetadata`: contains all metadata

`CrypToadzStrings`: contains all string lookups for metadata

`CrypToadzCustomImages`: contains image data for "1/1" custom toadz that are PNG images

`CrypToadzCustomAnimations`: contains image data for "1/1" custom toadz that are GIF animations

## How are buildable toadz created?

Each toad feature is represented in an intermediate format that is compressed with INFLATE and stored via SSTORE2.

The uncompressed intermediate format for draw instructions is:

`DrawFill`: Fills the canvas with a given color
| Field       | Date Type   | Description                      |
| ----------- | ----------- | -------------------------------- |
| Type        | byte        | Type discriminator, fixed at `0` |
| c           | byte        | An index into the color table    |

`DrawLine`: Draws a line between two points
| Field       | Date Type   | Description                          |
| ----------- | ----------- | ------------------------------------ |
| Type        | byte        | Type discriminator, fixed at `1`     |
| c           | byte        | An index into the color table        |
| x0          | byte        | The x-coordinate of the first point  |
| y0          | byte        | The y-coordinate of the first point  |
| x1          | byte        | The x-coordinate of the second point |
| y1          | byte        | The y-coordinate of the second point |

`DrawDot`: Draws a single pixel
| Field       | Date Type   | Description                      |
| ----------- | ----------- | -------------------------------- |
| Type        | byte        | Type discriminator, fixed at `2` |
| c           | byte        | An index into the color table    | 
| x           | byte        | The x-coordinate to draw a dot   |
| y           | byte        | The y-coordinate to draw a dot   |

`DrawFeature`: Draws another set of drawing instructions at a given offset
| Field       | Date Type   | Description                            |
| ----------- | ----------- | -------------------------------------- |
| Type        | byte        | Type discriminator, fixed at `3`       |
| i           | byte        | An index into the draw instructions    |

## What is the deployment cost?

The current gas cost deployment for each component is listed below, assuming a gas price of 10 gwei.

You may also run the `npx hardhat toadz-gas --gwei [GWEI]` command (to a deployed dev node) to produce the same table, showing the deployment costs for each component for a given `gwei` value, which is useful when trying to time deployments of expensive components.

| Contract                     | Category          | Cost       |
| ---------------------------- | ----------------- | ---------- |
| CrypToadzChained             | Main              | 0.03947024 |
| Total                        | 3947024           | 0.03947024 |

| Contract                     | Category          | Cost       |
| ---------------------------- | ----------------- | ---------- |
| CrypToadzStrings             | Metadata          | 0.05864486 |
| CrypToadzMetadata            | Metadata          | 0.14414749 |
| Total                        | 20279235          | 0.20279235 |

| Contract                     | Category          | Cost       |
| ---------------------------- | ----------------- | ---------- |
| GIFEncoder                   | Builder           | 0.01512106 |
| PixelRenderer                | Builder           | 0.01184819 |
| CrypToadzBuilder             | Builder           | 0.15744763 |
| CrypToadzBuilderAny          | Builder           | 0.00324650 |
| CrypToadzBuilderAnyA         | Builder           | 0.25194182 |
| CrypToadzBuilderAnyB         | Builder           | 0.06069051 |
| CrypToadzBuilderShort        | Builder           | 0.20719718 |
| CrypToadzBuilderTall         | Builder           | 0.21327662 |
| Total                        | 92076951          | 0.92076951 |

| Contract                     | Category          | Cost       |
| ---------------------------- | ----------------- | ---------- |
| CrypToadzDeltas              | Deltas            | 0.01922085 |
| CrypToadzDeltasA             | Deltas            | 0.08789304 |
| CrypToadzDeltasB             | Deltas            | 0.08601827 |
| CrypToadzDeltasC             | Deltas            | 0.03792533 |
| Total                        | 23105749          | 0.23105749 |

| Contract                     | Category          | Cost       |
| ---------------------------- | ----------------- | ---------- |
| CrypToadzCustomAnimations    | Custom Animations | 0.00626628 |
| CrypToadzCustomImage1519     | Custom Animations | 0.00534121 |
| CrypToadzCustomImage1943     | Custom Animations | 0.00528380 |
| CrypToadzCustomImage1943A    | Custom Animations | 0.16161148 |
| CrypToadzCustomImage1943B    | Custom Animations | 0.16161832 |
| CrypToadzCustomImage1943C    | Custom Animations | 0.16160608 |
| CrypToadzCustomImage1943D    | Custom Animations | 0.16160848 |
| CrypToadzCustomImage1943E    | Custom Animations | 0.15707601 |
| CrypToadzCustomImage2208     | Custom Animations | 0.00519112 |
| CrypToadzCustomImage318      | Custom Animations | 0.00567435 |
| CrypToadzCustomImage318A     | Custom Animations | 0.16161388 |
| CrypToadzCustomImage318B     | Custom Animations | 0.16161496 |
| CrypToadzCustomImage318C     | Custom Animations | 0.16161568 |
| CrypToadzCustomImage318D     | Custom Animations | 0.16162420 |
| CrypToadzCustomImage318E     | Custom Animations | 0.16161292 |
| CrypToadzCustomImage318F     | Custom Animations | 0.06711284 |
| CrypToadzCustomImage3250     | Custom Animations | 0.00534793 |
| CrypToadzCustomImage3661     | Custom Animations | 0.00606917 |
| CrypToadzCustomImage3661A    | Custom Animations | 0.16161196 |
| CrypToadzCustomImage3661B    | Custom Animations | 0.16161376 |
| CrypToadzCustomImage3661C    | Custom Animations | 0.16161016 |
| CrypToadzCustomImage3661D    | Custom Animations | 0.16161964 |
| CrypToadzCustomImage3661E    | Custom Animations | 0.16161436 |
| CrypToadzCustomImage3661F    | Custom Animations | 0.16161460 |
| CrypToadzCustomImage3661G    | Custom Animations | 0.12574401 |
| CrypToadzCustomImage37       | Custom Animations | 0.00567219 |
| CrypToadzCustomImage37A      | Custom Animations | 0.16160512 |
| CrypToadzCustomImage37B      | Custom Animations | 0.16160392 |
| CrypToadzCustomImage37C      | Custom Animations | 0.16160584 |
| CrypToadzCustomImage37D      | Custom Animations | 0.16160224 |
| CrypToadzCustomImage37E      | Custom Animations | 0.16161220 |
| CrypToadzCustomImage37F      | Custom Animations | 0.08003805 |
| CrypToadzCustomImage4035     | Custom Animations | 0.00567435 |
| CrypToadzCustomImage4035A    | Custom Animations | 0.16161580 |
| CrypToadzCustomImage4035B    | Custom Animations | 0.16161424 |
| CrypToadzCustomImage4035C    | Custom Animations | 0.16161568 |
| CrypToadzCustomImage4035D    | Custom Animations | 0.16161616 |
| CrypToadzCustomImage4035E    | Custom Animations | 0.16162192 |
| CrypToadzCustomImage4035F    | Custom Animations | 0.02565180 |
| CrypToadzCustomImage43000000 | Custom Animations | 0.00604376 |
| CrypToadzCustomImage466      | Custom Animations | 0.00567435 |
| CrypToadzCustomImage466A     | Custom Animations | 0.16161256 |
| CrypToadzCustomImage466B     | Custom Animations | 0.16162072 |
| CrypToadzCustomImage466C     | Custom Animations | 0.16161904 |
| CrypToadzCustomImage466D     | Custom Animations | 0.16161484 |
| CrypToadzCustomImage466E     | Custom Animations | 0.16161532 |
| CrypToadzCustomImage466F     | Custom Animations | 0.01939848 |
| CrypToadzCustomImage48000000 | Custom Animations | 0.00504155 |
| CrypToadzCustomImage4911     | Custom Animations | 0.00606917 |
| CrypToadzCustomImage4911A    | Custom Animations | 0.16160356 |
| CrypToadzCustomImage4911B    | Custom Animations | 0.16161640 |
| CrypToadzCustomImage4911C    | Custom Animations | 0.16160248 |
| CrypToadzCustomImage4911D    | Custom Animations | 0.16161568 |
| CrypToadzCustomImage4911E    | Custom Animations | 0.16161460 |
| CrypToadzCustomImage4911F    | Custom Animations | 0.16161256 |
| CrypToadzCustomImage4911G    | Custom Animations | 0.10628610 |
| CrypToadzCustomImage5086     | Custom Animations | 0.10842244 |
| CrypToadzCustomImage5844     | Custom Animations | 0.00550114 |
| CrypToadzCustomImage6131     | Custom Animations | 0.00582649 |
| Total                        | 659247795         | 6.59247795 |

| Contract                     | Category          | Cost       |
| ---------------------------- | ----------------- | ---------- |
| CrypToadzCustomImages        | Custom Images     | 0.04367766 |
| CrypToadzCustomImage1000000  | Custom Images     | 0.02141162 |
| CrypToadzCustomImage10000000 | Custom Images     | 0.02138774 |
| CrypToadzCustomImage1005     | Custom Images     | 0.00409990 |
| CrypToadzCustomImage1005A    | Custom Images     | 0.16964778 |
| CrypToadzCustomImage1005B    | Custom Images     | 0.03053586 |
| CrypToadzCustomImage11000000 | Custom Images     | 0.02121881 |
| CrypToadzCustomImage1165     | Custom Images     | 0.02137107 |
| CrypToadzCustomImage12000000 | Custom Images     | 0.02162135 |
| CrypToadzCustomImage123      | Custom Images     | 0.02188471 |
| CrypToadzCustomImage13000000 | Custom Images     | 0.02124210 |
| CrypToadzCustomImage14000000 | Custom Images     | 0.02123609 |
| CrypToadzCustomImage1423     | Custom Images     | 0.02138798 |
| CrypToadzCustomImage15000000 | Custom Images     | 0.02125924 |
| CrypToadzCustomImage1559     | Custom Images     | 0.02114962 |
| CrypToadzCustomImage16000000 | Custom Images     | 0.02119061 |
| CrypToadzCustomImage1637     | Custom Images     | 0.02185724 |
| CrypToadzCustomImage17000000 | Custom Images     | 0.02125924 |
| CrypToadzCustomImage1703     | Custom Images     | 0.02115030 |
| CrypToadzCustomImage1754     | Custom Images     | 0.02134743 |
| CrypToadzCustomImage1793     | Custom Images     | 0.14704553 |
| CrypToadzCustomImage18000000 | Custom Images     | 0.02131537 |
| CrypToadzCustomImage1812     | Custom Images     | 0.00409990 |
| CrypToadzCustomImage1812A    | Custom Images     | 0.16867826 |
| CrypToadzCustomImage1812B    | Custom Images     | 0.04487234 |
| CrypToadzCustomImage19000000 | Custom Images     | 0.02161511 |
| CrypToadzCustomImage1935     | Custom Images     | 0.02144795 |
| CrypToadzCustomImage1975     | Custom Images     | 0.00409966 |
| CrypToadzCustomImage1975A    | Custom Images     | 0.16650058 |
| CrypToadzCustomImage1975B    | Custom Images     | 0.10491339 |
| CrypToadzCustomImage2000000  | Custom Images     | 0.02168974 |
| CrypToadzCustomImage20000000 | Custom Images     | 0.02095945 |
| CrypToadzCustomImage21000000 | Custom Images     | 0.02142686 |
| CrypToadzCustomImage2124     | Custom Images     | 0.02166622 |
| CrypToadzCustomImage22000000 | Custom Images     | 0.02125028 |
| CrypToadzCustomImage2232     | Custom Images     | 0.00409990 |
| CrypToadzCustomImage2232A    | Custom Images     | 0.16671919 |
| CrypToadzCustomImage2232B    | Custom Images     | 0.15443860 |
| CrypToadzCustomImage23000000 | Custom Images     | 0.02131731 |
| CrypToadzCustomImage2327     | Custom Images     | 0.00409990 |
| CrypToadzCustomImage2327A    | Custom Images     | 0.16539068 |
| CrypToadzCustomImage2327B    | Custom Images     | 0.12697277 |
| CrypToadzCustomImage24000000 | Custom Images     | 0.02126776 |
| CrypToadzCustomImage2469     | Custom Images     | 0.02128300 |
| CrypToadzCustomImage2471     | Custom Images     | 0.02116542 |
| CrypToadzCustomImage2482     | Custom Images     | 0.02112006 |
| CrypToadzCustomImage2489     | Custom Images     | 0.00409990 |
| CrypToadzCustomImage2489A    | Custom Images     | 0.16789117 |
| CrypToadzCustomImage2489B    | Custom Images     | 0.06956066 |
| CrypToadzCustomImage25000000 | Custom Images     | 0.02141402 |
| CrypToadzCustomImage2521     | Custom Images     | 0.13046073 |
| CrypToadzCustomImage2569     | Custom Images     | 0.02124014 |
| CrypToadzCustomImage2579     | Custom Images     | 0.02118857 |
| CrypToadzCustomImage26000000 | Custom Images     | 0.02182712 |
| CrypToadzCustomImage27000000 | Custom Images     | 0.02129608 |
| CrypToadzCustomImage2709     | Custom Images     | 0.13044806 |
| CrypToadzCustomImage28000000 | Custom Images     | 0.02123585 |
| CrypToadzCustomImage2825     | Custom Images     | 0.00409990 |
| CrypToadzCustomImage2825A    | Custom Images     | 0.16707831 |
| CrypToadzCustomImage2825B    | Custom Images     | 0.09064839 |
| CrypToadzCustomImage2839     | Custom Images     | 0.02136231 |
| CrypToadzCustomImage2846     | Custom Images     | 0.11866019 |
| CrypToadzCustomImage2865     | Custom Images     | 0.02167462 |
| CrypToadzCustomImage29000000 | Custom Images     | 0.02163215 |
| CrypToadzCustomImage2959     | Custom Images     | 0.00409990 |
| CrypToadzCustomImage2959A    | Custom Images     | 0.17098682 |
| CrypToadzCustomImage2959B    | Custom Images     | 0.15637387 |
| CrypToadzCustomImage2986     | Custom Images     | 0.02127436 |
| CrypToadzCustomImage3000000  | Custom Images     | 0.02125708 |
| CrypToadzCustomImage30000000 | Custom Images     | 0.02127232 |
| CrypToadzCustomImage31000000 | Custom Images     | 0.02243353 |
| CrypToadzCustomImage316      | Custom Images     | 0.12977717 |
| CrypToadzCustomImage3196     | Custom Images     | 0.00409990 |
| CrypToadzCustomImage3196A    | Custom Images     | 0.16964511 |
| CrypToadzCustomImage3196B    | Custom Images     | 0.15475106 |
| CrypToadzCustomImage32000000 | Custom Images     | 0.02128924 |
| CrypToadzCustomImage33000000 | Custom Images     | 0.02136279 |
| CrypToadzCustomImage3309     | Custom Images     | 0.00449453 |
| CrypToadzCustomImage3309A    | Custom Images     | 0.16933404 |
| CrypToadzCustomImage3309B    | Custom Images     | 0.17666080 |
| CrypToadzCustomImage3309C    | Custom Images     | 0.03459359 |
| CrypToadzCustomImage3382     | Custom Images     | 0.00409990 |
| CrypToadzCustomImage3382A    | Custom Images     | 0.17251660 |
| CrypToadzCustomImage3382B    | Custom Images     | 0.11364786 |
| CrypToadzCustomImage34000000 | Custom Images     | 0.02120789 |
| CrypToadzCustomImage35000000 | Custom Images     | 0.02135151 |
| CrypToadzCustomImage36000000 | Custom Images     | 0.02155296 |
| CrypToadzCustomImage37000000 | Custom Images     | 0.02136255 |
| CrypToadzCustomImage3703     | Custom Images     | 0.02182712 |
| CrypToadzCustomImage38000000 | Custom Images     | 0.02142482 |
| CrypToadzCustomImage39000000 | Custom Images     | 0.02143298 |
| CrypToadzCustomImage4000000  | Custom Images     | 0.02130901 |
| CrypToadzCustomImage40000000 | Custom Images     | 0.02103528 |
| CrypToadzCustomImage4096     | Custom Images     | 0.14403647 |
| CrypToadzCustomImage41000000 | Custom Images     | 0.02154888 |
| CrypToadzCustomImage4126     | Custom Images     | 0.02137335 |
| CrypToadzCustomImage4152     | Custom Images     | 0.00409990 |
| CrypToadzCustomImage4152A    | Custom Images     | 0.16937353 |
| CrypToadzCustomImage4152B    | Custom Images     | 0.09803723 |
| CrypToadzCustomImage4192     | Custom Images     | 0.02136879 |
| CrypToadzCustomImage42000000 | Custom Images     | 0.02122973 |
| CrypToadzCustomImage4201     | Custom Images     | 0.02120573 |
| CrypToadzCustomImage4221     | Custom Images     | 0.02124014 |
| CrypToadzCustomImage4238     | Custom Images     | 0.00409978 |
| CrypToadzCustomImage4238A    | Custom Images     | 0.16892196 |
| CrypToadzCustomImage4238B    | Custom Images     | 0.03691051 |
| CrypToadzCustomImage4368     | Custom Images     | 0.02129188 |
| CrypToadzCustomImage44000000 | Custom Images     | 0.02120357 |
| CrypToadzCustomImage45000000 | Custom Images     | 0.02147545 |
| CrypToadzCustomImage4578     | Custom Images     | 0.02119721 |
| CrypToadzCustomImage4580     | Custom Images     | 0.00409990 |
| CrypToadzCustomImage4580A    | Custom Images     | 0.16624033 |
| CrypToadzCustomImage4580B    | Custom Images     | 0.14836392 |
| CrypToadzCustomImage46000000 | Custom Images     | 0.02122109 |
| CrypToadzCustomImage4604     | Custom Images     | 0.02117765 |
| CrypToadzCustomImage47000000 | Custom Images     | 0.02126584 |
| CrypToadzCustomImage4714     | Custom Images     | 0.11000235 |
| CrypToadzCustomImage472      | Custom Images     | 0.02152476 |
| CrypToadzCustomImage4773     | Custom Images     | 0.13374908 |
| CrypToadzCustomImage4845     | Custom Images     | 0.02185724 |
| CrypToadzCustomImage4896     | Custom Images     | 0.00449441 |
| CrypToadzCustomImage4896A    | Custom Images     | 0.15787357 |
| CrypToadzCustomImage4896B    | Custom Images     | 0.17413950 |
| CrypToadzCustomImage4896C    | Custom Images     | 0.03752352 |
| CrypToadzCustomImage49000000 | Custom Images     | 0.02147761 |
| CrypToadzCustomImage491      | Custom Images     | 0.02119073 |
| CrypToadzCustomImage5000000  | Custom Images     | 0.02128336 |
| CrypToadzCustomImage50000000 | Custom Images     | 0.02102824 |
| CrypToadzCustomImage51000000 | Custom Images     | 0.02127232 |
| CrypToadzCustomImage5128     | Custom Images     | 0.13885714 |
| CrypToadzCustomImage5150     | Custom Images     | 0.02173075 |
| CrypToadzCustomImage52000000 | Custom Images     | 0.02129380 |
| CrypToadzCustomImage5262     | Custom Images     | 0.02145817 |
| CrypToadzCustomImage53000000 | Custom Images     | 0.02114814 |
| CrypToadzCustomImage54000000 | Custom Images     | 0.02089382 |
| CrypToadzCustomImage5441     | Custom Images     | 0.02181404 |
| CrypToadzCustomImage5471     | Custom Images     | 0.00449453 |
| CrypToadzCustomImage5471A    | Custom Images     | 0.17017811 |
| CrypToadzCustomImage5471B    | Custom Images     | 0.17734579 |
| CrypToadzCustomImage5471C    | Custom Images     | 0.02122125 |
| CrypToadzCustomImage55000000 | Custom Images     | 0.02127232 |
| CrypToadzCustomImage56000000 | Custom Images     | 0.02138479 |
| CrypToadzCustomImage5730     | Custom Images     | 0.02121017 |
| CrypToadzCustomImage5836     | Custom Images     | 0.02149081 |
| CrypToadzCustomImage5848     | Custom Images     | 0.02136267 |
| CrypToadzCustomImage5902     | Custom Images     | 0.00409990 |
| CrypToadzCustomImage5902A    | Custom Images     | 0.16878944 |
| CrypToadzCustomImage5902B    | Custom Images     | 0.14646734 |
| CrypToadzCustomImage6000000  | Custom Images     | 0.02148217 |
| CrypToadzCustomImage6214     | Custom Images     | 0.00409990 |
| CrypToadzCustomImage6214A    | Custom Images     | 0.17075528 |
| CrypToadzCustomImage6214B    | Custom Images     | 0.06531357 |
| CrypToadzCustomImage6382     | Custom Images     | 0.00409990 |
| CrypToadzCustomImage6382A    | Custom Images     | 0.17018665 |
| CrypToadzCustomImage6382B    | Custom Images     | 0.15008411 |
| CrypToadzCustomImage6491     | Custom Images     | 0.12838924 |
| CrypToadzCustomImage6572     | Custom Images     | 0.14779912 |
| CrypToadzCustomImage6578     | Custom Images     | 0.02244756 |
| CrypToadzCustomImage6631     | Custom Images     | 0.12075636 |
| CrypToadzCustomImage6719     | Custom Images     | 0.02157672 |
| CrypToadzCustomImage6736     | Custom Images     | 0.02132967 |
| CrypToadzCustomImage6852     | Custom Images     | 0.02138774 |
| CrypToadzCustomImage6894     | Custom Images     | 0.02102809 |
| CrypToadzCustomImage6916     | Custom Images     | 0.02093125 |
| CrypToadzCustomImage7000000  | Custom Images     | 0.02164919 |
| CrypToadzCustomImage703      | Custom Images     | 0.10015459 |
| CrypToadzCustomImage8000000  | Custom Images     | 0.02111314 |
| Total                        | 930118110         | 9.30118110 |

Total Gas = 3457549728
Total Cost = 17.28774864 eth @ 10 gwei