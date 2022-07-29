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
| CrypToadzChained             | Main              | 0.03252549 |
| Total                        | 3252549           | 0.03252549 |

| Contract                     | Category          | Cost       |
| ---------------------------- | ----------------- | ---------- |
| CrypToadzStrings             | Metadata          | 0.05864486 |
| CrypToadzMetadata            | Metadata          | 0.14382145 |
| Total                        | 20246631          | 0.20246631 |

| Contract                     | Category          | Cost       |
| ---------------------------- | ----------------- | ---------- |
| GIFEncoder                   | Builder           | 0.01552785 |
| PixelRenderer                | Builder           | 0.01187223 |
| CrypToadzBuilder             | Builder           | 0.15687256 |
| CrypToadzBuilderAny          | Builder           | 0.31166861 |
| CrypToadzBuilderShort        | Builder           | 0.20719718 |
| CrypToadzBuilderTall         | Builder           | 0.21327662 |
| Total                        | 91641505          | 0.91641505 |

| Contract                     | Category          | Cost       |
| ---------------------------- | ----------------- | ---------- |
| CrypToadzDeltas              | Deltas            | 0.01759244 |
| CrypToadzDeltasA             | Deltas            | 0.08789292 |
| CrypToadzDeltasB             | Deltas            | 0.08601815 |
| CrypToadzDeltasC             | Deltas            | 0.03792545 |
| Total                        | 22942896          | 0.22942896 |

| Contract                     | Category          | Cost       |
| ---------------------------- | ----------------- | ---------- |
| CrypToadzCustomAnimations    | Custom Animations | 0.00626640 |
| CrypToadzCustomImage1519     | Custom Animations | 0.00428670 |
| CrypToadzCustomImage1943     | Custom Animations | 0.00455798 |
| CrypToadzCustomImage1943A    | Custom Animations | 0.16117391 |
| CrypToadzCustomImage1943B    | Custom Animations | 0.16017630 |
| CrypToadzCustomImage1943C    | Custom Animations | 0.15983521 |
| CrypToadzCustomImage1943D    | Custom Animations | 0.16114931 |
| CrypToadzCustomImage1943E    | Custom Animations | 0.15667501 |
| CrypToadzCustomImage2208     | Custom Animations | 0.00422217 |
| CrypToadzCustomImage318      | Custom Animations | 0.00509953 |
| CrypToadzCustomImage318A     | Custom Animations | 0.16121046 |
| CrypToadzCustomImage318B     | Custom Animations | 0.16104147 |
| CrypToadzCustomImage318C     | Custom Animations | 0.16103927 |
| CrypToadzCustomImage318D     | Custom Animations | 0.16122438 |
| CrypToadzCustomImage318E     | Custom Animations | 0.16109141 |
| CrypToadzCustomImage318F     | Custom Animations | 0.06664068 |
| CrypToadzCustomImage3250     | Custom Animations | 0.00410467 |
| CrypToadzCustomImage3661     | Custom Animations | 0.00564137 |
| CrypToadzCustomImage3661A    | Custom Animations | 0.16121226 |
| CrypToadzCustomImage3661B    | Custom Animations | 0.16115483 |
| CrypToadzCustomImage3661C    | Custom Animations | 0.16121034 |
| CrypToadzCustomImage3661D    | Custom Animations | 0.16121982 |
| CrypToadzCustomImage3661E    | Custom Animations | 0.16121454 |
| CrypToadzCustomImage3661F    | Custom Animations | 0.16112505 |
| CrypToadzCustomImage3661G    | Custom Animations | 0.12531963 |
| CrypToadzCustomImage37       | Custom Animations | 0.00509749 |
| CrypToadzCustomImage37A      | Custom Animations | 0.16115891 |
| CrypToadzCustomImage37B      | Custom Animations | 0.16117307 |
| CrypToadzCustomImage37C      | Custom Animations | 0.16120602 |
| CrypToadzCustomImage37D      | Custom Animations | 0.16120242 |
| CrypToadzCustomImage37E      | Custom Animations | 0.16121238 |
| CrypToadzCustomImage37F      | Custom Animations | 0.07957883 |
| CrypToadzCustomImage4035     | Custom Animations | 0.00509953 |
| CrypToadzCustomImage4035A    | Custom Animations | 0.16120155 |
| CrypToadzCustomImage4035B    | Custom Animations | 0.15942554 |
| CrypToadzCustomImage4035C    | Custom Animations | 0.16121586 |
| CrypToadzCustomImage4035D    | Custom Animations | 0.16112918 |
| CrypToadzCustomImage4035E    | Custom Animations | 0.16122210 |
| CrypToadzCustomImage4035F    | Custom Animations | 0.02514699 |
| CrypToadzCustomImage43000000 | Custom Animations | 0.00425905 |
| CrypToadzCustomImage466      | Custom Animations | 0.00509917 |
| CrypToadzCustomImage466A     | Custom Animations | 0.16111965 |
| CrypToadzCustomImage466B     | Custom Animations | 0.16122090 |
| CrypToadzCustomImage466C     | Custom Animations | 0.16121922 |
| CrypToadzCustomImage466D     | Custom Animations | 0.16121502 |
| CrypToadzCustomImage466E     | Custom Animations | 0.16121550 |
| CrypToadzCustomImage466F     | Custom Animations | 0.01889371 |
| CrypToadzCustomImage48000000 | Custom Animations | 0.00368632 |
| CrypToadzCustomImage4911     | Custom Animations | 0.00564137 |
| CrypToadzCustomImage4911A    | Custom Animations | 0.16119526 |
| CrypToadzCustomImage4911B    | Custom Animations | 0.16100155 |
| CrypToadzCustomImage4911C    | Custom Animations | 0.16120242 |
| CrypToadzCustomImage4911D    | Custom Animations | 0.16117355 |
| CrypToadzCustomImage4911E    | Custom Animations | 0.16121478 |
| CrypToadzCustomImage4911F    | Custom Animations | 0.16121274 |
| CrypToadzCustomImage4911G    | Custom Animations | 0.10584984 |
| CrypToadzCustomImage5086     | Custom Animations | 0.10674031 |
| CrypToadzCustomImage5844     | Custom Animations | 0.00440697 |
| CrypToadzCustomImage6131     | Custom Animations | 0.00414733 |
| Total                        | 655467723         | 6.55467723 |

| Contract                     | Category          | Cost       |
| ---------------------------- | ----------------- | ---------- |
| CrypToadzCustomImageBank     | Custom Images     | 0.01894289 |
| CrypToadzCustomImages        | Custom Images     | 0.02510286 |
| CrypToadzCustomImage1000000  | Custom Images     | 0.00410239 |
| CrypToadzCustomImage10000000 | Custom Images     | 0.00409831 |
| CrypToadzCustomImage1005     | Custom Images     | 0.00293334 |
| CrypToadzCustomImage1005A    | Custom Images     | 0.15279551 |
| CrypToadzCustomImage1005B    | Custom Images     | 0.01253281 |
| CrypToadzCustomImage11000000 | Custom Images     | 0.00392666 |
| CrypToadzCustomImage1165     | Custom Images     | 0.00410263 |
| CrypToadzCustomImage12000000 | Custom Images     | 0.00443424 |
| CrypToadzCustomImage123      | Custom Images     | 0.00473956 |
| CrypToadzCustomImage13000000 | Custom Images     | 0.00390329 |
| CrypToadzCustomImage14000000 | Custom Images     | 0.00393047 |
| CrypToadzCustomImage1423     | Custom Images     | 0.00411115 |
| CrypToadzCustomImage15000000 | Custom Images     | 0.00397814 |
| CrypToadzCustomImage1559     | Custom Images     | 0.00391628 |
| CrypToadzCustomImage16000000 | Custom Images     | 0.00386802 |
| CrypToadzCustomImage1637     | Custom Images     | 0.00473068 |
| CrypToadzCustomImage17000000 | Custom Images     | 0.00391832 |
| CrypToadzCustomImage1703     | Custom Images     | 0.00384540 |
| CrypToadzCustomImage1754     | Custom Images     | 0.00407008 |
| CrypToadzCustomImage1793     | Custom Images     | 0.12899610 |
| CrypToadzCustomImage18000000 | Custom Images     | 0.00406591 |
| CrypToadzCustomImage1812     | Custom Images     | 0.00293334 |
| CrypToadzCustomImage1812A    | Custom Images     | 0.15357649 |
| CrypToadzCustomImage1812B    | Custom Images     | 0.02378573 |
| CrypToadzCustomImage19000000 | Custom Images     | 0.00450128 |
| CrypToadzCustomImage1935     | Custom Images     | 0.00417772 |
| CrypToadzCustomImage1975     | Custom Images     | 0.00293334 |
| CrypToadzCustomImage1975A    | Custom Images     | 0.15154966 |
| CrypToadzCustomImage1975B    | Custom Images     | 0.08329873 |
| CrypToadzCustomImage2000000  | Custom Images     | 0.00447810 |
| CrypToadzCustomImage20000000 | Custom Images     | 0.00367984 |
| CrypToadzCustomImage21000000 | Custom Images     | 0.00412846 |
| CrypToadzCustomImage2124     | Custom Images     | 0.00451644 |
| CrypToadzCustomImage22000000 | Custom Images     | 0.00393192 |
| CrypToadzCustomImage2232     | Custom Images     | 0.00293334 |
| CrypToadzCustomImage2232A    | Custom Images     | 0.15131946 |
| CrypToadzCustomImage2232B    | Custom Images     | 0.13458208 |
| CrypToadzCustomImage23000000 | Custom Images     | 0.00401647 |
| CrypToadzCustomImage2327     | Custom Images     | 0.00293322 |
| CrypToadzCustomImage2327A    | Custom Images     | 0.15010494 |
| CrypToadzCustomImage2327B    | Custom Images     | 0.10668133 |
| CrypToadzCustomImage24000000 | Custom Images     | 0.00398042 |
| CrypToadzCustomImage2469     | Custom Images     | 0.00403402 |
| CrypToadzCustomImage2471     | Custom Images     | 0.00387941 |
| CrypToadzCustomImage2482     | Custom Images     | 0.00377031 |
| CrypToadzCustomImage2489     | Custom Images     | 0.00293334 |
| CrypToadzCustomImage2489A    | Custom Images     | 0.15245713 |
| CrypToadzCustomImage2489B    | Custom Images     | 0.04984302 |
| CrypToadzCustomImage25000000 | Custom Images     | 0.00417112 |
| CrypToadzCustomImage2521     | Custom Images     | 0.08031551 |
| CrypToadzCustomImage2569     | Custom Images     | 0.00396110 |
| CrypToadzCustomImage2579     | Custom Images     | 0.00372909 |
| CrypToadzCustomImage26000000 | Custom Images     | 0.00457626 |
| CrypToadzCustomImage27000000 | Custom Images     | 0.00402082 |
| CrypToadzCustomImage2709     | Custom Images     | 0.07902454 |
| CrypToadzCustomImage28000000 | Custom Images     | 0.00391169 |
| CrypToadzCustomImage2825     | Custom Images     | 0.00293334 |
| CrypToadzCustomImage2825A    | Custom Images     | 0.15193952 |
| CrypToadzCustomImage2825B    | Custom Images     | 0.07035493 |
| CrypToadzCustomImage2839     | Custom Images     | 0.00407896 |
| CrypToadzCustomImage2846     | Custom Images     | 0.10014843 |
| CrypToadzCustomImage2865     | Custom Images     | 0.00446499 |
| CrypToadzCustomImage29000000 | Custom Images     | 0.00449924 |
| CrypToadzCustomImage2959     | Custom Images     | 0.00293334 |
| CrypToadzCustomImage2959A    | Custom Images     | 0.15541627 |
| CrypToadzCustomImage2959B    | Custom Images     | 0.13659594 |
| CrypToadzCustomImage2986     | Custom Images     | 0.00395462 |
| CrypToadzCustomImage3000000  | Custom Images     | 0.00393479 |
| CrypToadzCustomImage30000000 | Custom Images     | 0.00397850 |
| CrypToadzCustomImage31000000 | Custom Images     | 0.00536727 |
| CrypToadzCustomImage316      | Custom Images     | 0.11153921 |
| CrypToadzCustomImage3196     | Custom Images     | 0.00293334 |
| CrypToadzCustomImage3196A    | Custom Images     | 0.15462019 |
| CrypToadzCustomImage3196B    | Custom Images     | 0.13412355 |
| CrypToadzCustomImage32000000 | Custom Images     | 0.00398054 |
| CrypToadzCustomImage33000000 | Custom Images     | 0.00408088 |
| CrypToadzCustomImage3309     | Custom Images     | 0.00347464 |
| CrypToadzCustomImage3309A    | Custom Images     | 0.15365961 |
| CrypToadzCustomImage3309B    | Custom Images     | 0.15978802 |
| CrypToadzCustomImage3309C    | Custom Images     | 0.01489174 |
| CrypToadzCustomImage3382     | Custom Images     | 0.00293334 |
| CrypToadzCustomImage3382A    | Custom Images     | 0.15562521 |
| CrypToadzCustomImage3382B    | Custom Images     | 0.09670514 |
| CrypToadzCustomImage34000000 | Custom Images     | 0.00389193 |
| CrypToadzCustomImage35000000 | Custom Images     | 0.00402946 |
| CrypToadzCustomImage36000000 | Custom Images     | 0.00427012 |
| CrypToadzCustomImage37000000 | Custom Images     | 0.00408304 |
| CrypToadzCustomImage3703     | Custom Images     | 0.00468778 |
| CrypToadzCustomImage38000000 | Custom Images     | 0.00414745 |
| CrypToadzCustomImage39000000 | Custom Images     | 0.00416872 |
| CrypToadzCustomImage4000000  | Custom Images     | 0.00398441 |
| CrypToadzCustomImage40000000 | Custom Images     | 0.00379553 |
| CrypToadzCustomImage4096     | Custom Images     | 0.08765470 |
| CrypToadzCustomImage41000000 | Custom Images     | 0.00434749 |
| CrypToadzCustomImage4126     | Custom Images     | 0.00410047 |
| CrypToadzCustomImage4152     | Custom Images     | 0.00293334 |
| CrypToadzCustomImage4152A    | Custom Images     | 0.15447482 |
| CrypToadzCustomImage4152B    | Custom Images     | 0.07719166 |
| CrypToadzCustomImage4192     | Custom Images     | 0.00407428 |
| CrypToadzCustomImage42000000 | Custom Images     | 0.00392468 |
| CrypToadzCustomImage4201     | Custom Images     | 0.00394370 |
| CrypToadzCustomImage4221     | Custom Images     | 0.00392352 |
| CrypToadzCustomImage4238     | Custom Images     | 0.00293310 |
| CrypToadzCustomImage4238A    | Custom Images     | 0.15377180 |
| CrypToadzCustomImage4238B    | Custom Images     | 0.01663559 |
| CrypToadzCustomImage4368     | Custom Images     | 0.00414325 |
| CrypToadzCustomImage44000000 | Custom Images     | 0.00392036 |
| CrypToadzCustomImage45000000 | Custom Images     | 0.00416248 |
| CrypToadzCustomImage4578     | Custom Images     | 0.00393503 |
| CrypToadzCustomImage4580     | Custom Images     | 0.00293322 |
| CrypToadzCustomImage4580A    | Custom Images     | 0.15113971 |
| CrypToadzCustomImage4580B    | Custom Images     | 0.12810352 |
| CrypToadzCustomImage46000000 | Custom Images     | 0.00389657 |
| CrypToadzCustomImage4604     | Custom Images     | 0.00381729 |
| CrypToadzCustomImage47000000 | Custom Images     | 0.00396974 |
| CrypToadzCustomImage4714     | Custom Images     | 0.06584238 |
| CrypToadzCustomImage472      | Custom Images     | 0.00425689 |
| CrypToadzCustomImage4773     | Custom Images     | 0.08363437 |
| CrypToadzCustomImage4845     | Custom Images     | 0.00483172 |
| CrypToadzCustomImage4896     | Custom Images     | 0.00347464 |
| CrypToadzCustomImage4896A    | Custom Images     | 0.14321364 |
| CrypToadzCustomImage4896B    | Custom Images     | 0.15746556 |
| CrypToadzCustomImage4896C    | Custom Images     | 0.01724029 |
| CrypToadzCustomImage49000000 | Custom Images     | 0.00418180 |
| CrypToadzCustomImage491      | Custom Images     | 0.00384960 |
| CrypToadzCustomImage5000000  | Custom Images     | 0.00396314 |
| CrypToadzCustomImage50000000 | Custom Images     | 0.00392264 |
| CrypToadzCustomImage51000000 | Custom Images     | 0.00393707 |
| CrypToadzCustomImage5128     | Custom Images     | 0.08778164 |
| CrypToadzCustomImage5150     | Custom Images     | 0.00449252 |
| CrypToadzCustomImage52000000 | Custom Images     | 0.00398681 |
| CrypToadzCustomImage5262     | Custom Images     | 0.00433873 |
| CrypToadzCustomImage53000000 | Custom Images     | 0.00390285 |
| CrypToadzCustomImage54000000 | Custom Images     | 0.00357496 |
| CrypToadzCustomImage5441     | Custom Images     | 0.00464295 |
| CrypToadzCustomImage5471     | Custom Images     | 0.00347464 |
| CrypToadzCustomImage5471A    | Custom Images     | 0.15502667 |
| CrypToadzCustomImage5471B    | Custom Images     | 0.15876049 |
| CrypToadzCustomImage5471C    | Custom Images     | 0.00301645 |
| CrypToadzCustomImage55000000 | Custom Images     | 0.00399125 |
| CrypToadzCustomImage56000000 | Custom Images     | 0.00408520 |
| CrypToadzCustomImage5730     | Custom Images     | 0.00395666 |
| CrypToadzCustomImage5836     | Custom Images     | 0.00421605 |
| CrypToadzCustomImage5848     | Custom Images     | 0.00406494 |
| CrypToadzCustomImage5902     | Custom Images     | 0.00293334 |
| CrypToadzCustomImage5902A    | Custom Images     | 0.15347491 |
| CrypToadzCustomImage5902B    | Custom Images     | 0.12533046 |
| CrypToadzCustomImage6000000  | Custom Images     | 0.00425053 |
| CrypToadzCustomImage6214     | Custom Images     | 0.00293334 |
| CrypToadzCustomImage6214A    | Custom Images     | 0.15392668 |
| CrypToadzCustomImage6214B    | Custom Images     | 0.04835908 |
| CrypToadzCustomImage6382     | Custom Images     | 0.00293322 |
| CrypToadzCustomImage6382A    | Custom Images     | 0.15471477 |
| CrypToadzCustomImage6382B    | Custom Images     | 0.13024484 |
| CrypToadzCustomImage6491     | Custom Images     | 0.08017935 |
| CrypToadzCustomImage6572     | Custom Images     | 0.09061540 |
| CrypToadzCustomImage6578     | Custom Images     | 0.00538911 |
| CrypToadzCustomImage6631     | Custom Images     | 0.07387689 |
| CrypToadzCustomImage6719     | Custom Images     | 0.00434305 |
| CrypToadzCustomImage6736     | Custom Images     | 0.00401227 |
| CrypToadzCustomImage6852     | Custom Images     | 0.00424201 |
| CrypToadzCustomImage6894     | Custom Images     | 0.00364454 |
| CrypToadzCustomImage6916     | Custom Images     | 0.00356866 |
| CrypToadzCustomImage7000000  | Custom Images     | 0.00443256 |
| CrypToadzCustomImage703      | Custom Images     | 0.05854948 |
| CrypToadzCustomImage8000000  | Custom Images     | 0.00375696 |
| CrypToadzCustomImage864      | Custom Images     | 0.00392352 |
| CrypToadzCustomImage9000000  | Custom Images     | 0.00390317 |
| CrypToadzCustomImage916      | Custom Images     | 0.00293334 |
| CrypToadzCustomImage916A     | Custom Images     | 0.15102777 |
| CrypToadzCustomImage916B     | Custom Images     | 0.13390865 |
| CrypToadzCustomImage936      | Custom Images     | 0.00293334 |
| CrypToadzCustomImage936A     | Custom Images     | 0.15076898 |
| CrypToadzCustomImage936B     | Custom Images     | 0.14594743 |
| CrypToadzCustomImage966      | Custom Images     | 0.00375732 |
| Total                        | 699960054         | 6.99960054 |

Total Gas = 2987022716
Total Cost = 14.93511358 eth @ 10 gwei