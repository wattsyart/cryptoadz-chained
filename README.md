# CrypToadzChained
The same CrypToadz you know and love, preserved on-chain.

## Where To Find It?

The contracts are currently [live on Rinkeby](https://rinkeby.etherscan.io/address/0x60d9d8bc30812fdee9cc5e3fcb630233a924cc97#code) 
and you can use the [Viewer App](https://cryptoadzchained.com) to play with it. 

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
| CrypToadzChained             | Main              | 0.03961896 |
| Total                        | 3961896           | 0.03961896 |

| Contract                     | Category          | Cost       |
| ---------------------------- | ----------------- | ---------- |
| CrypToadzStrings             | Metadata          | 0.05864486 |
| CrypToadzMetadata            | Metadata          | 0.14414749 |
| Total                        | 20279235          | 0.20279235 |

| Contract                     | Category          | Cost       |
| ---------------------------- | ----------------- | ---------- |
| GIFEncoder                   | Builder           | 0.01512106 |
| PixelRenderer                | Builder           | 0.01184819 |
| CrypToadzBuilder             | Builder           | 0.15744775 |
| CrypToadzBuilderAny          | Builder           | 0.00324650 |
| CrypToadzBuilderAnyA         | Builder           | 0.25194182 |
| CrypToadzBuilderAnyB         | Builder           | 0.06069051 |
| CrypToadzBuilderShort        | Builder           | 0.20929275 |
| CrypToadzBuilderTall         | Builder           | 0.21327662 |
| Total                        | 92286520          | 0.92286520 |

| Contract                     | Category          | Cost       |
| ---------------------------- | ----------------- | ---------- |
| CrypToadzDeltas              | Deltas            | 0.01922085 |
| CrypToadzDeltasA             | Deltas            | 0.08789304 |
| CrypToadzDeltasB             | Deltas            | 0.08601827 |
| CrypToadzDeltasC             | Deltas            | 0.03792533 |
| Total                        | 23105749          | 0.23105749 |

| Contract                     | Category          | Cost       |
| ---------------------------- | ----------------- | ---------- |
| CrypToadzCustomAnimations    | Custom Animations | 0.00626640 |
| CrypToadzCustomImage1519     | Custom Animations | 0.00605036 |
| CrypToadzCustomImage1943     | Custom Animations | 0.00528392 |
| CrypToadzCustomImage1943A    | Custom Animations | 0.16161148 |
| CrypToadzCustomImage1943B    | Custom Animations | 0.16161832 |
| CrypToadzCustomImage1943C    | Custom Animations | 0.16160620 |
| CrypToadzCustomImage1943D    | Custom Animations | 0.16160848 |
| CrypToadzCustomImage1943E    | Custom Animations | 0.15707601 |
| CrypToadzCustomImage2208     | Custom Animations | 0.00562418 |
| CrypToadzCustomImage318      | Custom Animations | 0.00567423 |
| CrypToadzCustomImage318A     | Custom Animations | 0.16161388 |
| CrypToadzCustomImage318B     | Custom Animations | 0.16161484 |
| CrypToadzCustomImage318C     | Custom Animations | 0.16161568 |
| CrypToadzCustomImage318D     | Custom Animations | 0.16162420 |
| CrypToadzCustomImage318E     | Custom Animations | 0.16161292 |
| CrypToadzCustomImage318F     | Custom Animations | 0.06711284 |
| CrypToadzCustomImage3250     | Custom Animations | 0.00583637 |
| CrypToadzCustomImage3661     | Custom Animations | 0.00606917 |
| CrypToadzCustomImage3661A    | Custom Animations | 0.16161208 |
| CrypToadzCustomImage3661B    | Custom Animations | 0.16161376 |
| CrypToadzCustomImage3661C    | Custom Animations | 0.16161016 |
| CrypToadzCustomImage3661D    | Custom Animations | 0.16161964 |
| CrypToadzCustomImage3661E    | Custom Animations | 0.16161436 |
| CrypToadzCustomImage3661F    | Custom Animations | 0.16161460 |
| CrypToadzCustomImage3661G    | Custom Animations | 0.12574401 |
| CrypToadzCustomImage37       | Custom Animations | 0.00567207 |
| CrypToadzCustomImage37A      | Custom Animations | 0.16160512 |
| CrypToadzCustomImage37B      | Custom Animations | 0.16160392 |
| CrypToadzCustomImage37C      | Custom Animations | 0.16160584 |
| CrypToadzCustomImage37D      | Custom Animations | 0.16160224 |
| CrypToadzCustomImage37E      | Custom Animations | 0.16161220 |
| CrypToadzCustomImage37F      | Custom Animations | 0.08003805 |
| CrypToadzCustomImage4035     | Custom Animations | 0.00567435 |
| CrypToadzCustomImage4035A    | Custom Animations | 0.16161580 |
| CrypToadzCustomImage4035B    | Custom Animations | 0.16161424 |
| CrypToadzCustomImage4035C    | Custom Animations | 0.16161544 |
| CrypToadzCustomImage4035D    | Custom Animations | 0.16161616 |
| CrypToadzCustomImage4035E    | Custom Animations | 0.16162204 |
| CrypToadzCustomImage4035F    | Custom Animations | 0.02565180 |
| CrypToadzCustomImage43000000 | Custom Animations | 0.00735320 |
| CrypToadzCustomImage466      | Custom Animations | 0.00567435 |
| CrypToadzCustomImage466A     | Custom Animations | 0.16161256 |
| CrypToadzCustomImage466B     | Custom Animations | 0.16162072 |
| CrypToadzCustomImage466C     | Custom Animations | 0.16161904 |
| CrypToadzCustomImage466D     | Custom Animations | 0.16161484 |
| CrypToadzCustomImage466E     | Custom Animations | 0.16161532 |
| CrypToadzCustomImage466F     | Custom Animations | 0.01939848 |
| CrypToadzCustomImage48000000 | Custom Animations | 0.00583774 |
| CrypToadzCustomImage4911     | Custom Animations | 0.00606917 |
| CrypToadzCustomImage4911A    | Custom Animations | 0.16160356 |
| CrypToadzCustomImage4911B    | Custom Animations | 0.16161640 |
| CrypToadzCustomImage4911C    | Custom Animations | 0.16160236 |
| CrypToadzCustomImage4911D    | Custom Animations | 0.16161568 |
| CrypToadzCustomImage4911E    | Custom Animations | 0.16161460 |
| CrypToadzCustomImage4911F    | Custom Animations | 0.16161256 |
| CrypToadzCustomImage4911G    | Custom Animations | 0.10628610 |
| CrypToadzCustomImage5086     | Custom Animations | 0.10842244 |
| CrypToadzCustomImage5844     | Custom Animations | 0.00550054 |
| CrypToadzCustomImage6131     | Custom Animations | 0.00597827 |
| Total                        | 659636529         | 6.59636529 |

| Contract                     | Category          | Cost       |
| ---------------------------- | ----------------- | ---------- |
| CrypToadzCustomImages        | Custom Images     | 0.04367766 |
| CrypToadzCustomImage1000000  | Custom Images     | 0.00488246 |
| CrypToadzCustomImage10000000 | Custom Images     | 0.00485700 |
| CrypToadzCustomImage1005     | Custom Images     | 0.00409990 |
| CrypToadzCustomImage1005A    | Custom Images     | 0.16137676 |
| CrypToadzCustomImage1005B    | Custom Images     | 0.01787964 |
| CrypToadzCustomImage11000000 | Custom Images     | 0.00469180 |
| CrypToadzCustomImage1165     | Custom Images     | 0.00484185 |
| CrypToadzCustomImage12000000 | Custom Images     | 0.00509248 |
| CrypToadzCustomImage123      | Custom Images     | 0.00535529 |
| CrypToadzCustomImage13000000 | Custom Images     | 0.00471937 |
| CrypToadzCustomImage14000000 | Custom Images     | 0.00470683 |
| CrypToadzCustomImage1423     | Custom Images     | 0.00485724 |
| CrypToadzCustomImage15000000 | Custom Images     | 0.00473217 |
| CrypToadzCustomImage1559     | Custom Images     | 0.00462758 |
| CrypToadzCustomImage16000000 | Custom Images     | 0.00466561 |
| CrypToadzCustomImage1637     | Custom Images     | 0.00532870 |
| CrypToadzCustomImage17000000 | Custom Images     | 0.00473445 |
| CrypToadzCustomImage1703     | Custom Images     | 0.00462926 |
| CrypToadzCustomImage1754     | Custom Images     | 0.00481821 |
| CrypToadzCustomImage1793     | Custom Images     | 0.13174838 |
| CrypToadzCustomImage18000000 | Custom Images     | 0.00479020 |
| CrypToadzCustomImage1812     | Custom Images     | 0.00409990 |
| CrypToadzCustomImage1812A    | Custom Images     | 0.16138948 |
| CrypToadzCustomImage1812B    | Custom Images     | 0.03298966 |
| CrypToadzCustomImage19000000 | Custom Images     | 0.00508612 |
| CrypToadzCustomImage1935     | Custom Images     | 0.00491889 |
| CrypToadzCustomImage1975     | Custom Images     | 0.00409990 |
| CrypToadzCustomImage1975A    | Custom Images     | 0.16132096 |
| CrypToadzCustomImage1975B    | Custom Images     | 0.09180076 |
| CrypToadzCustomImage2000000  | Custom Images     | 0.00516109 |
| CrypToadzCustomImage20000000 | Custom Images     | 0.00444692 |
| CrypToadzCustomImage21000000 | Custom Images     | 0.00489762 |
| CrypToadzCustomImage2124     | Custom Images     | 0.00513587 |
| CrypToadzCustomImage22000000 | Custom Images     | 0.00472749 |
| CrypToadzCustomImage2232     | Custom Images     | 0.00409990 |
| CrypToadzCustomImage2232A    | Custom Images     | 0.16123768 |
| CrypToadzCustomImage2232B    | Custom Images     | 0.14213816 |
| CrypToadzCustomImage23000000 | Custom Images     | 0.00478636 |
| CrypToadzCustomImage2327     | Custom Images     | 0.00409990 |
| CrypToadzCustomImage2327A    | Custom Images     | 0.16123816 |
| CrypToadzCustomImage2327B    | Custom Images     | 0.11479118 |
| CrypToadzCustomImage24000000 | Custom Images     | 0.00473829 |
| CrypToadzCustomImage2469     | Custom Images     | 0.00475608 |
| CrypToadzCustomImage2471     | Custom Images     | 0.00464675 |
| CrypToadzCustomImage2482     | Custom Images     | 0.00459470 |
| CrypToadzCustomImage2489     | Custom Images     | 0.00409990 |
| CrypToadzCustomImage2489A    | Custom Images     | 0.16138084 |
| CrypToadzCustomImage2489B    | Custom Images     | 0.05764127 |
| CrypToadzCustomImage25000000 | Custom Images     | 0.00488474 |
| CrypToadzCustomImage2521     | Custom Images     | 0.11707875 |
| CrypToadzCustomImage2569     | Custom Images     | 0.00471307 |
| CrypToadzCustomImage2579     | Custom Images     | 0.00467860 |
| CrypToadzCustomImage26000000 | Custom Images     | 0.00529843 |
| CrypToadzCustomImage27000000 | Custom Images     | 0.00476664 |
| CrypToadzCustomImage2709     | Custom Images     | 0.11649397 |
| CrypToadzCustomImage28000000 | Custom Images     | 0.00470899 |
| CrypToadzCustomImage2825     | Custom Images     | 0.00409990 |
| CrypToadzCustomImage2825A    | Custom Images     | 0.16127692 |
| CrypToadzCustomImage2825B    | Custom Images     | 0.07939616 |
| CrypToadzCustomImage2839     | Custom Images     | 0.00483309 |
| CrypToadzCustomImage2846     | Custom Images     | 0.10605786 |
| CrypToadzCustomImage2865     | Custom Images     | 0.00514503 |
| CrypToadzCustomImage29000000 | Custom Images     | 0.00510308 |
| CrypToadzCustomImage2959     | Custom Images     | 0.00409990 |
| CrypToadzCustomImage2959A    | Custom Images     | 0.16141468 |
| CrypToadzCustomImage2959B    | Custom Images     | 0.14486555 |
| CrypToadzCustomImage2986     | Custom Images     | 0.00474504 |
| CrypToadzCustomImage3000000  | Custom Images     | 0.00472785 |
| CrypToadzCustomImage30000000 | Custom Images     | 0.00474309 |
| CrypToadzCustomImage31000000 | Custom Images     | 0.00590566 |
| CrypToadzCustomImage316      | Custom Images     | 0.11731561 |
| CrypToadzCustomImage3196     | Custom Images     | 0.00409990 |
| CrypToadzCustomImage3196A    | Custom Images     | 0.16135756 |
| CrypToadzCustomImage3196B    | Custom Images     | 0.14346976 |
| CrypToadzCustomImage32000000 | Custom Images     | 0.00475980 |
| CrypToadzCustomImage33000000 | Custom Images     | 0.00483333 |
| CrypToadzCustomImage3309     | Custom Images     | 0.00449453 |
| CrypToadzCustomImage3309A    | Custom Images     | 0.16131628 |
| CrypToadzCustomImage3309B    | Custom Images     | 0.16158076 |
| CrypToadzCustomImage3309C    | Custom Images     | 0.02269625 |
| CrypToadzCustomImage3382     | Custom Images     | 0.00409990 |
| CrypToadzCustomImage3382A    | Custom Images     | 0.16139104 |
| CrypToadzCustomImage3382B    | Custom Images     | 0.10267120 |
| CrypToadzCustomImage34000000 | Custom Images     | 0.00468088 |
| CrypToadzCustomImage35000000 | Custom Images     | 0.00482217 |
| CrypToadzCustomImage36000000 | Custom Images     | 0.00502376 |
| CrypToadzCustomImage37000000 | Custom Images     | 0.00483321 |
| CrypToadzCustomImage3703     | Custom Images     | 0.00529855 |
| CrypToadzCustomImage38000000 | Custom Images     | 0.00489546 |
| CrypToadzCustomImage39000000 | Custom Images     | 0.00490374 |
| CrypToadzCustomImage4000000  | Custom Images     | 0.00477988 |
| CrypToadzCustomImage40000000 | Custom Images     | 0.00451791 |
| CrypToadzCustomImage4096     | Custom Images     | 0.12870105 |
| CrypToadzCustomImage41000000 | Custom Images     | 0.00501980 |
| CrypToadzCustomImage4126     | Custom Images     | 0.00484413 |
| CrypToadzCustomImage4152     | Custom Images     | 0.00409990 |
| CrypToadzCustomImage4152A    | Custom Images     | 0.16131712 |
| CrypToadzCustomImage4152B    | Custom Images     | 0.08644653 |
| CrypToadzCustomImage4192     | Custom Images     | 0.00483957 |
| CrypToadzCustomImage42000000 | Custom Images     | 0.00470248 |
| CrypToadzCustomImage4201     | Custom Images     | 0.00468532 |
| CrypToadzCustomImage4221     | Custom Images     | 0.00471343 |
| CrypToadzCustomImage4238     | Custom Images     | 0.00409990 |
| CrypToadzCustomImage4238A    | Custom Images     | 0.16140772 |
| CrypToadzCustomImage4238B    | Custom Images     | 0.02415496 |
| CrypToadzCustomImage4368     | Custom Images     | 0.00476268 |
| CrypToadzCustomImage44000000 | Custom Images     | 0.00468700 |
| CrypToadzCustomImage45000000 | Custom Images     | 0.00494627 |
| CrypToadzCustomImage4578     | Custom Images     | 0.00467656 |
| CrypToadzCustomImage4580     | Custom Images     | 0.00409990 |
| CrypToadzCustomImage4580A    | Custom Images     | 0.16125004 |
| CrypToadzCustomImage4580B    | Custom Images     | 0.13710118 |
| CrypToadzCustomImage46000000 | Custom Images     | 0.00469180 |
| CrypToadzCustomImage4604     | Custom Images     | 0.00465265 |
| CrypToadzCustomImage47000000 | Custom Images     | 0.00473829 |
| CrypToadzCustomImage4714     | Custom Images     | 0.09741989 |
| CrypToadzCustomImage472      | Custom Images     | 0.00499409 |
| CrypToadzCustomImage4773     | Custom Images     | 0.11900587 |
| CrypToadzCustomImage4845     | Custom Images     | 0.00532870 |
| CrypToadzCustomImage4896     | Custom Images     | 0.00449453 |
| CrypToadzCustomImage4896A    | Custom Images     | 0.16142836 |
| CrypToadzCustomImage4896B    | Custom Images     | 0.16151860 |
| CrypToadzCustomImage4896C    | Custom Images     | 0.02963089 |
| CrypToadzCustomImage49000000 | Custom Images     | 0.00494831 |
| CrypToadzCustomImage491      | Custom Images     | 0.00467416 |
| CrypToadzCustomImage5000000  | Custom Images     | 0.00475404 |
| CrypToadzCustomImage50000000 | Custom Images     | 0.00451220 |
| CrypToadzCustomImage51000000 | Custom Images     | 0.00474285 |
| CrypToadzCustomImage5128     | Custom Images     | 0.12498628 |
| CrypToadzCustomImage5150     | Custom Images     | 0.00520220 |
| CrypToadzCustomImage52000000 | Custom Images     | 0.00476436 |
| CrypToadzCustomImage5262     | Custom Images     | 0.00492753 |
| CrypToadzCustomImage53000000 | Custom Images     | 0.00462290 |
| CrypToadzCustomImage54000000 | Custom Images     | 0.00438237 |
| CrypToadzCustomImage5441     | Custom Images     | 0.00528370 |
| CrypToadzCustomImage5471     | Custom Images     | 0.00449453 |
| CrypToadzCustomImage5471A    | Custom Images     | 0.16135084 |
| CrypToadzCustomImage5471B    | Custom Images     | 0.16160140 |
| CrypToadzCustomImage5471C    | Custom Images     | 0.00991167 |
| CrypToadzCustomImage55000000 | Custom Images     | 0.00474504 |
| CrypToadzCustomImage56000000 | Custom Images     | 0.00485484 |
| CrypToadzCustomImage5730     | Custom Images     | 0.00468292 |
| CrypToadzCustomImage5836     | Custom Images     | 0.00496166 |
| CrypToadzCustomImage5848     | Custom Images     | 0.00483345 |
| CrypToadzCustomImage5902     | Custom Images     | 0.00409990 |
| CrypToadzCustomImage5902A    | Custom Images     | 0.16131604 |
| CrypToadzCustomImage5902B    | Custom Images     | 0.13463067 |
| CrypToadzCustomImage6000000  | Custom Images     | 0.00495311 |
| CrypToadzCustomImage6214     | Custom Images     | 0.00409990 |
| CrypToadzCustomImage6214A    | Custom Images     | 0.16139464 |
| CrypToadzCustomImage6214B    | Custom Images     | 0.05290048 |
| CrypToadzCustomImage6382     | Custom Images     | 0.00409990 |
| CrypToadzCustomImage6382A    | Custom Images     | 0.16138504 |
| CrypToadzCustomImage6382B    | Custom Images     | 0.13848468 |
| CrypToadzCustomImage6491     | Custom Images     | 0.11606549 |
| CrypToadzCustomImage6572     | Custom Images     | 0.13312325 |
| CrypToadzCustomImage6578     | Custom Images     | 0.00591830 |
| CrypToadzCustomImage6631     | Custom Images     | 0.10838326 |
| CrypToadzCustomImage6719     | Custom Images     | 0.00504791 |
| CrypToadzCustomImage6736     | Custom Images     | 0.00480042 |
| CrypToadzCustomImage6852     | Custom Images     | 0.00485700 |
| CrypToadzCustomImage6894     | Custom Images     | 0.00452871 |
| CrypToadzCustomImage6916     | Custom Images     | 0.00442149 |
| CrypToadzCustomImage7000000  | Custom Images     | 0.00512024 |
| CrypToadzCustomImage703      | Custom Images     | 0.08858393 |
| CrypToadzCustomImage8000000  | Custom Images     | 0.00459062 |
| CrypToadzCustomImage864      | Custom Images     | 0.00469156 |
| CrypToadzCustomImage9000000  | Custom Images     | 0.00465925 |
| CrypToadzCustomImage916      | Custom Images     | 0.00409990 |
| CrypToadzCustomImage916A     | Custom Images     | 0.16122868 |
| CrypToadzCustomImage916B     | Custom Images     | 0.14290030 |
| CrypToadzCustomImage936      | Custom Images     | 0.00409990 |
| CrypToadzCustomImage936A     | Custom Images     | 0.16118860 |
| CrypToadzCustomImage936B     | Custom Images     | 0.15359234 |
| CrypToadzCustomImage966      | Custom Images     | 0.00459518 |
| Total                        | 783387230         | 7.83387230 |

Total Gas = 3165314318
Total Cost = 15.82657159 eth @ 10 gwei
