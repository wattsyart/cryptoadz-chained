# CrypToadzChained
The same CrypToadz you know and love, preserved on-chain.

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
npx hardhat toadz-gas                     Produces ETH cost breakdown for deployment by component
npx hardhat toadz-image-deltas            Validates correctness of CrypToadz token images that have deltas
npx hardhat toadz-random                  Generates a random toadz and saves the metadata and image to disk
npx hardhat toadz-random-batch            Batch-based random generation for stress testing
npx hardhat toadz-wrapped                 Validates correctness of a single, wrapped CrypToadz
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
| CrypToadzChained             | Main              | 0.03186386 |
| Total                        | 3186386           | 0.03186386 |

| Contract                     | Category          | Cost       |
| ---------------------------- | ----------------- | ---------- |
| CrypToadzStrings             | Metadata          | 0.05864486 |
| CrypToadzMetadata            | Metadata          | 0.14382145 |
| Total                        | 20246631          | 0.20246631 |

| Contract                     | Category          | Cost       |
| ---------------------------- | ----------------- | ---------- |
| GIFEncoder                   | Builder           | 0.01512106 |
| PixelRenderer                | Builder           | 0.01184819 |
| CrypToadzBuilder             | Builder           | 0.15743527 |
| CrypToadzBuilderAny          | Builder           | 0.31166861 |
| CrypToadzBuilderShort        | Builder           | 0.20719718 |
| CrypToadzBuilderTall         | Builder           | 0.21327662 |
| Total                        | 91654693          | 0.91654693 |

| Contract                     | Category          | Cost       |
| ---------------------------- | ----------------- | ---------- |
| CrypToadzDeltas              | Deltas            | 0.01921233 |
| CrypToadzDeltasA             | Deltas            | 0.08789304 |
| CrypToadzDeltasB             | Deltas            | 0.08601827 |
| CrypToadzDeltasC             | Deltas            | 0.03792545 |
| Total                        | 23104909          | 0.23104909 |

| Contract                     | Category          | Cost       |
| ---------------------------- | ----------------- | ---------- |
| CrypToadzCustomAnimations    | Custom Animations | 0.00626640 |
| CrypToadzCustomImage1519     | Custom Animations | 0.02174313 |
| CrypToadzCustomImage1943     | Custom Animations | 0.00528392 |
| CrypToadzCustomImage1943A    | Custom Animations | 0.17804219 |
| CrypToadzCustomImage1943B    | Custom Animations | 0.17704446 |
| CrypToadzCustomImage1943C    | Custom Animations | 0.17670337 |
| CrypToadzCustomImage1943D    | Custom Animations | 0.17801759 |
| CrypToadzCustomImage1943E    | Custom Animations | 0.17354317 |
| CrypToadzCustomImage2208     | Custom Animations | 0.02167870 |
| CrypToadzCustomImage318      | Custom Animations | 0.00567435 |
| CrypToadzCustomImage318A     | Custom Animations | 0.17807886 |
| CrypToadzCustomImage318B     | Custom Animations | 0.17790975 |
| CrypToadzCustomImage318C     | Custom Animations | 0.17790755 |
| CrypToadzCustomImage318D     | Custom Animations | 0.17809266 |
| CrypToadzCustomImage318E     | Custom Animations | 0.17795969 |
| CrypToadzCustomImage318F     | Custom Animations | 0.08351012 |
| CrypToadzCustomImage3250     | Custom Animations | 0.02156124 |
| CrypToadzCustomImage3661     | Custom Animations | 0.00606917 |
| CrypToadzCustomImage3661A    | Custom Animations | 0.17808054 |
| CrypToadzCustomImage3661B    | Custom Animations | 0.17802311 |
| CrypToadzCustomImage3661C    | Custom Animations | 0.17807850 |
| CrypToadzCustomImage3661D    | Custom Animations | 0.17808810 |
| CrypToadzCustomImage3661E    | Custom Animations | 0.17808282 |
| CrypToadzCustomImage3661F    | Custom Animations | 0.17799333 |
| CrypToadzCustomImage3661G    | Custom Animations | 0.14218767 |
| CrypToadzCustomImage37       | Custom Animations | 0.00567219 |
| CrypToadzCustomImage37A      | Custom Animations | 0.17802719 |
| CrypToadzCustomImage37B      | Custom Animations | 0.17804135 |
| CrypToadzCustomImage37C      | Custom Animations | 0.17807430 |
| CrypToadzCustomImage37D      | Custom Animations | 0.17807070 |
| CrypToadzCustomImage37E      | Custom Animations | 0.17808066 |
| CrypToadzCustomImage37F      | Custom Animations | 0.09644687 |
| CrypToadzCustomImage4035     | Custom Animations | 0.00567435 |
| CrypToadzCustomImage4035A    | Custom Animations | 0.17806983 |
| CrypToadzCustomImage4035B    | Custom Animations | 0.17629382 |
| CrypToadzCustomImage4035C    | Custom Animations | 0.17808402 |
| CrypToadzCustomImage4035D    | Custom Animations | 0.17799758 |
| CrypToadzCustomImage4035E    | Custom Animations | 0.17809050 |
| CrypToadzCustomImage4035F    | Custom Animations | 0.04201607 |
| CrypToadzCustomImage43000000 | Custom Animations | 0.02171566 |
| CrypToadzCustomImage466      | Custom Animations | 0.00567435 |
| CrypToadzCustomImage466A     | Custom Animations | 0.17798805 |
| CrypToadzCustomImage466B     | Custom Animations | 0.17808918 |
| CrypToadzCustomImage466C     | Custom Animations | 0.17808750 |
| CrypToadzCustomImage466D     | Custom Animations | 0.17808330 |
| CrypToadzCustomImage466E     | Custom Animations | 0.17808378 |
| CrypToadzCustomImage466F     | Custom Animations | 0.03576279 |
| CrypToadzCustomImage48000000 | Custom Animations | 0.02114370 |
| CrypToadzCustomImage4911     | Custom Animations | 0.00606917 |
| CrypToadzCustomImage4911A    | Custom Animations | 0.17806366 |
| CrypToadzCustomImage4911B    | Custom Animations | 0.17786995 |
| CrypToadzCustomImage4911C    | Custom Animations | 0.17807094 |
| CrypToadzCustomImage4911D    | Custom Animations | 0.17804171 |
| CrypToadzCustomImage4911E    | Custom Animations | 0.17808306 |
| CrypToadzCustomImage4911F    | Custom Animations | 0.17808102 |
| CrypToadzCustomImage4911G    | Custom Animations | 0.12271788 |
| CrypToadzCustomImage5086     | Custom Animations | 0.12484303 |
| CrypToadzCustomImage5844     | Custom Animations | 0.02186336 |
| CrypToadzCustomImage6131     | Custom Animations | 0.02160395 |
| Total                        | 742419586         | 7.42419586 |

| Contract                     | Category          | Cost       |
| ---------------------------- | ----------------- | ---------- |
| CrypToadzCustomImages        | Custom Images     | 0.02510274 |
| CrypToadzCustomImage1000000  | Custom Images     | 0.02155920 |
| CrypToadzCustomImage10000000 | Custom Images     | 0.02155512 |
| CrypToadzCustomImage1005     | Custom Images     | 0.00409990 |
| CrypToadzCustomImage1005A    | Custom Images     | 0.16966367 |
| CrypToadzCustomImage1005B    | Custom Images     | 0.02874599 |
| CrypToadzCustomImage11000000 | Custom Images     | 0.02138376 |
| CrypToadzCustomImage1165     | Custom Images     | 0.02155932 |
| CrypToadzCustomImage12000000 | Custom Images     | 0.02189047 |
| CrypToadzCustomImage123      | Custom Images     | 0.02219536 |
| CrypToadzCustomImage13000000 | Custom Images     | 0.02136027 |
| CrypToadzCustomImage14000000 | Custom Images     | 0.02138750 |
| CrypToadzCustomImage1423     | Custom Images     | 0.02156784 |
| CrypToadzCustomImage15000000 | Custom Images     | 0.02143526 |
| CrypToadzCustomImage1559     | Custom Images     | 0.02137323 |
| CrypToadzCustomImage16000000 | Custom Images     | 0.02132515 |
| CrypToadzCustomImage1637     | Custom Images     | 0.02218648 |
| CrypToadzCustomImage17000000 | Custom Images     | 0.02137539 |
| CrypToadzCustomImage1703     | Custom Images     | 0.02130244 |
| CrypToadzCustomImage1754     | Custom Images     | 0.02152680 |
| CrypToadzCustomImage1793     | Custom Images     | 0.14709927 |
| CrypToadzCustomImage18000000 | Custom Images     | 0.02152270 |
| CrypToadzCustomImage1812     | Custom Images     | 0.00409990 |
| CrypToadzCustomImage1812A    | Custom Images     | 0.17044453 |
| CrypToadzCustomImage1812B    | Custom Images     | 0.04065481 |
| CrypToadzCustomImage19000000 | Custom Images     | 0.02195754 |
| CrypToadzCustomImage1935     | Custom Images     | 0.02163431 |
| CrypToadzCustomImage1975     | Custom Images     | 0.00409990 |
| CrypToadzCustomImage1975A    | Custom Images     | 0.16841794 |
| CrypToadzCustomImage1975B    | Custom Images     | 0.10016677 |
| CrypToadzCustomImage2000000  | Custom Images     | 0.02193439 |
| CrypToadzCustomImage20000000 | Custom Images     | 0.02113722 |
| CrypToadzCustomImage21000000 | Custom Images     | 0.02158524 |
| CrypToadzCustomImage2124     | Custom Images     | 0.02197266 |
| CrypToadzCustomImage22000000 | Custom Images     | 0.02138899 |
| CrypToadzCustomImage2232     | Custom Images     | 0.00409990 |
| CrypToadzCustomImage2232A    | Custom Images     | 0.16818762 |
| CrypToadzCustomImage2232B    | Custom Images     | 0.15145012 |
| CrypToadzCustomImage23000000 | Custom Images     | 0.02147341 |
| CrypToadzCustomImage2327     | Custom Images     | 0.00409990 |
| CrypToadzCustomImage2327A    | Custom Images     | 0.16697310 |
| CrypToadzCustomImage2327B    | Custom Images     | 0.12354949 |
| CrypToadzCustomImage24000000 | Custom Images     | 0.02143742 |
| CrypToadzCustomImage2469     | Custom Images     | 0.02149081 |
| CrypToadzCustomImage2471     | Custom Images     | 0.02133639 |
| CrypToadzCustomImage2482     | Custom Images     | 0.02122745 |
| CrypToadzCustomImage2489     | Custom Images     | 0.00409990 |
| CrypToadzCustomImage2489A    | Custom Images     | 0.16932529 |
| CrypToadzCustomImage2489B    | Custom Images     | 0.06671230 |
| CrypToadzCustomImage25000000 | Custom Images     | 0.02162783 |
| CrypToadzCustomImage2521     | Custom Images     | 0.09841850 |
| CrypToadzCustomImage2569     | Custom Images     | 0.02141798 |
| CrypToadzCustomImage2579     | Custom Images     | 0.02118629 |
| CrypToadzCustomImage26000000 | Custom Images     | 0.02203242 |
| CrypToadzCustomImage27000000 | Custom Images     | 0.02147773 |
| CrypToadzCustomImage2709     | Custom Images     | 0.09712756 |
| CrypToadzCustomImage28000000 | Custom Images     | 0.02136879 |
| CrypToadzCustomImage2825     | Custom Images     | 0.00409990 |
| CrypToadzCustomImage2825A    | Custom Images     | 0.16880780 |
| CrypToadzCustomImage2825B    | Custom Images     | 0.08722465 |
| CrypToadzCustomImage2839     | Custom Images     | 0.02153568 |
| CrypToadzCustomImage2846     | Custom Images     | 0.11825139 |
| CrypToadzCustomImage2865     | Custom Images     | 0.02192119 |
| CrypToadzCustomImage29000000 | Custom Images     | 0.02195538 |
| CrypToadzCustomImage2959     | Custom Images     | 0.00409990 |
| CrypToadzCustomImage2959A    | Custom Images     | 0.17228455 |
| CrypToadzCustomImage2959B    | Custom Images     | 0.15346398 |
| CrypToadzCustomImage2986     | Custom Images     | 0.02141150 |
| CrypToadzCustomImage3000000  | Custom Images     | 0.02139182 |
| CrypToadzCustomImage30000000 | Custom Images     | 0.02143550 |
| CrypToadzCustomImage31000000 | Custom Images     | 0.02282240 |
| CrypToadzCustomImage316      | Custom Images     | 0.12964241 |
| CrypToadzCustomImage3196     | Custom Images     | 0.00409990 |
| CrypToadzCustomImage3196A    | Custom Images     | 0.17148847 |
| CrypToadzCustomImage3196B    | Custom Images     | 0.15099159 |
| CrypToadzCustomImage32000000 | Custom Images     | 0.02143754 |
| CrypToadzCustomImage33000000 | Custom Images     | 0.02153784 |
| CrypToadzCustomImage3309     | Custom Images     | 0.00449453 |
| CrypToadzCustomImage3309A    | Custom Images     | 0.17052789 |
| CrypToadzCustomImage3309B    | Custom Images     | 0.17665642 |
| CrypToadzCustomImage3309C    | Custom Images     | 0.03176082 |
| CrypToadzCustomImage3382     | Custom Images     | 0.00409990 |
| CrypToadzCustomImage3382A    | Custom Images     | 0.17249337 |
| CrypToadzCustomImage3382B    | Custom Images     | 0.11357306 |
| CrypToadzCustomImage34000000 | Custom Images     | 0.02134903 |
| CrypToadzCustomImage35000000 | Custom Images     | 0.02148637 |
| CrypToadzCustomImage36000000 | Custom Images     | 0.02172670 |
| CrypToadzCustomImage37000000 | Custom Images     | 0.02153988 |
| CrypToadzCustomImage3703     | Custom Images     | 0.02214365 |
| CrypToadzCustomImage38000000 | Custom Images     | 0.02160419 |
| CrypToadzCustomImage39000000 | Custom Images     | 0.02162531 |
| CrypToadzCustomImage4000000  | Custom Images     | 0.02144138 |
| CrypToadzCustomImage40000000 | Custom Images     | 0.02125276 |
| CrypToadzCustomImage4096     | Custom Images     | 0.10575769 |
| CrypToadzCustomImage41000000 | Custom Images     | 0.02180397 |
| CrypToadzCustomImage4126     | Custom Images     | 0.02155716 |
| CrypToadzCustomImage4152     | Custom Images     | 0.00409990 |
| CrypToadzCustomImage4152A    | Custom Images     | 0.17134298 |
| CrypToadzCustomImage4152B    | Custom Images     | 0.09406126 |
| CrypToadzCustomImage4192     | Custom Images     | 0.02153088 |
| CrypToadzCustomImage42000000 | Custom Images     | 0.02138187 |
| CrypToadzCustomImage4201     | Custom Images     | 0.02140058 |
| CrypToadzCustomImage4221     | Custom Images     | 0.02138047 |
| CrypToadzCustomImage4238     | Custom Images     | 0.00409978 |
| CrypToadzCustomImage4238A    | Custom Images     | 0.17063996 |
| CrypToadzCustomImage4238B    | Custom Images     | 0.03350491 |
| CrypToadzCustomImage4368     | Custom Images     | 0.02159987 |
| CrypToadzCustomImage44000000 | Custom Images     | 0.02137743 |
| CrypToadzCustomImage45000000 | Custom Images     | 0.02161919 |
| CrypToadzCustomImage4578     | Custom Images     | 0.02139194 |
| CrypToadzCustomImage4580     | Custom Images     | 0.00409990 |
| CrypToadzCustomImage4580A    | Custom Images     | 0.16800787 |
| CrypToadzCustomImage4580B    | Custom Images     | 0.14497156 |
| CrypToadzCustomImage46000000 | Custom Images     | 0.02135367 |
| CrypToadzCustomImage4604     | Custom Images     | 0.02127436 |
| CrypToadzCustomImage47000000 | Custom Images     | 0.02142674 |
| CrypToadzCustomImage4714     | Custom Images     | 0.08394708 |
| CrypToadzCustomImage472      | Custom Images     | 0.02171338 |
| CrypToadzCustomImage4773     | Custom Images     | 0.10173736 |
| CrypToadzCustomImage4845     | Custom Images     | 0.02228751 |
| CrypToadzCustomImage4896     | Custom Images     | 0.00449453 |
| CrypToadzCustomImage4896A    | Custom Images     | 0.16008168 |
| CrypToadzCustomImage4896B    | Custom Images     | 0.17433384 |
| CrypToadzCustomImage4896C    | Custom Images     | 0.03410937 |
| CrypToadzCustomImage49000000 | Custom Images     | 0.02163851 |
| CrypToadzCustomImage491      | Custom Images     | 0.02130664 |
| CrypToadzCustomImage5000000  | Custom Images     | 0.02142014 |
| CrypToadzCustomImage50000000 | Custom Images     | 0.02137971 |
| CrypToadzCustomImage51000000 | Custom Images     | 0.02139410 |
| CrypToadzCustomImage5128     | Custom Images     | 0.10588463 |
| CrypToadzCustomImage5150     | Custom Images     | 0.02194866 |
| CrypToadzCustomImage52000000 | Custom Images     | 0.02144378 |
| CrypToadzCustomImage5262     | Custom Images     | 0.02179509 |
| CrypToadzCustomImage53000000 | Custom Images     | 0.02135995 |
| CrypToadzCustomImage54000000 | Custom Images     | 0.02103253 |
| CrypToadzCustomImage5441     | Custom Images     | 0.02209889 |
| CrypToadzCustomImage5471     | Custom Images     | 0.00449453 |
| CrypToadzCustomImage5471A    | Custom Images     | 0.17189483 |
| CrypToadzCustomImage5471B    | Custom Images     | 0.17562877 |
| CrypToadzCustomImage5471C    | Custom Images     | 0.01923799 |
| CrypToadzCustomImage55000000 | Custom Images     | 0.02144822 |
| CrypToadzCustomImage56000000 | Custom Images     | 0.02154204 |
| CrypToadzCustomImage5730     | Custom Images     | 0.02141354 |
| CrypToadzCustomImage5836     | Custom Images     | 0.02167258 |
| CrypToadzCustomImage5848     | Custom Images     | 0.02152169 |
| CrypToadzCustomImage5902     | Custom Images     | 0.00409990 |
| CrypToadzCustomImage6572     | Custom Images     | 0.10871851 |
| CrypToadzCustomImage6578     | Custom Images     | 0.02284400 |
| CrypToadzCustomImage6631     | Custom Images     | 0.09197991 |
| CrypToadzCustomImage6719     | Custom Images     | 0.02179941 |
| CrypToadzCustomImage6736     | Custom Images     | 0.02146897 |
| CrypToadzCustomImage6852     | Custom Images     | 0.02169850 |
| CrypToadzCustomImage6894     | Custom Images     | 0.02110175 |
| CrypToadzCustomImage6916     | Custom Images     | 0.02102596 |
| CrypToadzCustomImage7000000  | Custom Images     | 0.02188891 |
| CrypToadzCustomImage703      | Custom Images     | 0.07665405 |
| CrypToadzCustomImage8000000  | Custom Images     | 0.02121425 |
| CrypToadzCustomImage864      | Custom Images     | 0.02138047 |
| CrypToadzCustomImage9000000  | Custom Images     | 0.02136027 |
| CrypToadzCustomImage916      | Custom Images     | 0.00409990 |
| CrypToadzCustomImage916A     | Custom Images     | 0.16789605 |
| CrypToadzCustomImage916B     | Custom Images     | 0.15077657 |
| CrypToadzCustomImage936      | Custom Images     | 0.00409990 |
| CrypToadzCustomImage936A     | Custom Images     | 0.16763714 |
| CrypToadzCustomImage936B     | Custom Images     | 0.16281547 |
| CrypToadzCustomImage966      | Custom Images     | 0.02121449 |
| Total                        | 967368054         | 9.67368054 |

Total Gas = 3695960518
Total Cost = 18.47980259 eth @ 10 gwei