# cryptoadz-chained
The same CrypToadz you know and love, preserved on-chain.

## Setting Up

Due to complexity, hardhat on its own cannot deploy the project without a private geth client deployed to Docker.

In VS Code w/ the Docker Extension installed, you can right-click `./docker/docker-compose.yml` and choose `Compose Up`, or run

```bash
docker compose -f "docker\docker-compose.yml" up -d --build 
```

On the command line to bring up the private node instance.

Once deployed, you can run the following commands to compile the project, deploy to the private node, and return the `tokenURI` for CrypToadz #1.

```bash
npm install
npx hardhat compile
node scripts/deployer.js
npx hardhat toadz --id 1
```

To see additional toadz-related commands, run `npx hardhat`.

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
| x           | byte        | The x-offset to begin drawing from     |
| y           | byte        | The y-offset to begin drawing from     |

## What is the deployment cost?

The current gas cost deployment for each component is listed below, assuming a gas price of 20 gwei.

You may also run the `npx hardhat toadz-gas --gwei [GWEI]` command (to a deployed dev node) to produce the same table, showing the deployment costs for each component for a given `gwei` value, which is useful when trying to time deployments of expensive components.

| Contract                     | Category          | Cost       |
| ---------------------------- | ----------------- | ---------- |
| CrypToadzChained             | Main              | 0.04300602 |
| Total                        | 2150301           | 0.04300602 |

| Contract                     | Category          | Cost       |
| ---------------------------- | ----------------- | ---------- |
| CrypToadzStrings             | Metadata          | 0.11728972 |
| CrypToadzMetadata            | Metadata          | 0.28778912 |
| Total                        | 20253942          | 0.40507884 |

| Contract                     | Category          | Cost       |
| ---------------------------- | ----------------- | ---------- |
| GIFEncoder                   | Builder           | 0.03105570 |
| PixelRenderer                | Builder           | 0.02374398 |
| CrypToadzBuilder             | Builder           | 0.44400466 |
| CrypToadzBuilderAny          | Builder           | 0.61933112 |
| CrypToadzBuilderShort        | Builder           | 0.33640576 |
| CrypToadzBuilderTall         | Builder           | 0.35102242 |
| Total                        | 90278182          | 1.80556364 |

| Contract                     | Category          | Cost       |
| ---------------------------- | ----------------- | ---------- |
| CrypToadzDeltas              | Deltas            | 0.05641454 |
| CrypToadzDeltasA             | Deltas            | 0.18742350 |
| CrypToadzDeltasB             | Deltas            | 0.19075568 |
| CrypToadzDeltasC             | Deltas            | 0.18476800 |
| CrypToadzDeltasD             | Deltas            | 0.19476304 |
| CrypToadzDeltasE             | Deltas            | 0.19163488 |
| CrypToadzDeltasF             | Deltas            | 0.19430492 |
| CrypToadzDeltasG             | Deltas            | 0.05533638 |
| Total                        | 62770047          | 1.25540094 |

| Contract                     | Category          | Cost       |
| ---------------------------- | ----------------- | ---------- |
| CrypToadzCustomAnimations    | Custom Animations | 0.01142050 |
| CrypToadzCustomImage1519     | Custom Animations | 0.00857340 |
| CrypToadzCustomImage1943     | Custom Animations | 0.00911620 |
| CrypToadzCustomImage1943A    | Custom Animations | 0.32234782 |
| CrypToadzCustomImage1943B    | Custom Animations | 0.32035260 |
| CrypToadzCustomImage1943C    | Custom Animations | 0.31967042 |
| CrypToadzCustomImage1943D    | Custom Animations | 0.32229862 |
| CrypToadzCustomImage1943E    | Custom Animations | 0.31335002 |
| CrypToadzCustomImage2208     | Custom Animations | 0.00844434 |
| CrypToadzCustomImage318      | Custom Animations | 0.01019906 |
| CrypToadzCustomImage318A     | Custom Animations | 0.32242116 |
| CrypToadzCustomImage318B     | Custom Animations | 0.32208294 |
| CrypToadzCustomImage318C     | Custom Animations | 0.32207854 |
| CrypToadzCustomImage318D     | Custom Animations | 0.32244876 |
| CrypToadzCustomImage318E     | Custom Animations | 0.32218282 |
| CrypToadzCustomImage318F     | Custom Animations | 0.13328136 |
| CrypToadzCustomImage3250     | Custom Animations | 0.00820934 |
| CrypToadzCustomImage3661     | Custom Animations | 0.01128250 |
| CrypToadzCustomImage3661A    | Custom Animations | 0.32242452 |
| CrypToadzCustomImage3661B    | Custom Animations | 0.32230966 |
| CrypToadzCustomImage3661C    | Custom Animations | 0.32242068 |
| CrypToadzCustomImage3661D    | Custom Animations | 0.32243964 |
| CrypToadzCustomImage3661E    | Custom Animations | 0.32242908 |
| CrypToadzCustomImage3661F    | Custom Animations | 0.32225010 |
| CrypToadzCustomImage3661G    | Custom Animations | 0.25063926 |
| CrypToadzCustomImage37       | Custom Animations | 0.01019498 |
| CrypToadzCustomImage37A      | Custom Animations | 0.32231782 |
| CrypToadzCustomImage37B      | Custom Animations | 0.32234590 |
| CrypToadzCustomImage37C      | Custom Animations | 0.32241180 |
| CrypToadzCustomImage37D      | Custom Animations | 0.32240484 |
| CrypToadzCustomImage37E      | Custom Animations | 0.32242476 |
| CrypToadzCustomImage37F      | Custom Animations | 0.15915766 |
| CrypToadzCustomImage4035     | Custom Animations | 0.01019834 |
| CrypToadzCustomImage4035A    | Custom Animations | 0.32240310 |
| CrypToadzCustomImage4035B    | Custom Animations | 0.31885108 |
| CrypToadzCustomImage4035C    | Custom Animations | 0.32243172 |
| CrypToadzCustomImage4035D    | Custom Animations | 0.32225860 |
| CrypToadzCustomImage4035E    | Custom Animations | 0.32244444 |
| CrypToadzCustomImage4035F    | Custom Animations | 0.05029398 |
| CrypToadzCustomImage43000000 | Custom Animations | 0.00851810 |
| CrypToadzCustomImage466      | Custom Animations | 0.01019906 |
| CrypToadzCustomImage466A     | Custom Animations | 0.32223930 |
| CrypToadzCustomImage466B     | Custom Animations | 0.32244180 |
| CrypToadzCustomImage466C     | Custom Animations | 0.32243844 |
| CrypToadzCustomImage466D     | Custom Animations | 0.32243004 |
| CrypToadzCustomImage466E     | Custom Animations | 0.32243100 |
| CrypToadzCustomImage466F     | Custom Animations | 0.03778742 |
| CrypToadzCustomImage48000000 | Custom Animations | 0.00737264 |
| CrypToadzCustomImage4911     | Custom Animations | 0.01128226 |
| CrypToadzCustomImage4911A    | Custom Animations | 0.32239076 |
| CrypToadzCustomImage4911B    | Custom Animations | 0.32200334 |
| CrypToadzCustomImage4911C    | Custom Animations | 0.32240532 |
| CrypToadzCustomImage4911D    | Custom Animations | 0.32234686 |
| CrypToadzCustomImage4911E    | Custom Animations | 0.32242956 |
| CrypToadzCustomImage4911F    | Custom Animations | 0.32242548 |
| CrypToadzCustomImage4911G    | Custom Animations | 0.21169968 |
| CrypToadzCustomImage5086     | Custom Animations | 0.21348062 |
| CrypToadzCustomImage5844     | Custom Animations | 0.00881418 |
| CrypToadzCustomImage6131     | Custom Animations | 0.00829466 |
| Total                        | 655412144         | 13.10824288 |

| Contract                     | Category          | Cost       |
| ---------------------------- | ----------------- | ---------- |
| CrypToadzCustomImageBank     | Custom Images     | 0.03788578 |
| CrypToadzCustomImages        | Custom Images     | 0.06328856 |
| CrypToadzCustomImage1000000  | Custom Images     | 0.00820478 |
| CrypToadzCustomImage10000000 | Custom Images     | 0.00819614 |
| CrypToadzCustomImage1005     | Custom Images     | 0.00586668 |
| CrypToadzCustomImage1005A    | Custom Images     | 0.30559102 |
| CrypToadzCustomImage1005B    | Custom Images     | 0.02506562 |
| CrypToadzCustomImage11000000 | Custom Images     | 0.00785332 |
| CrypToadzCustomImage1165     | Custom Images     | 0.00820526 |
| CrypToadzCustomImage12000000 | Custom Images     | 0.00886848 |
| CrypToadzCustomImage123      | Custom Images     | 0.00947888 |
| CrypToadzCustomImage13000000 | Custom Images     | 0.00780658 |
| CrypToadzCustomImage14000000 | Custom Images     | 0.00786094 |
| CrypToadzCustomImage1423     | Custom Images     | 0.00822230 |
| CrypToadzCustomImage15000000 | Custom Images     | 0.00795652 |
| CrypToadzCustomImage1559     | Custom Images     | 0.00783256 |
| CrypToadzCustomImage16000000 | Custom Images     | 0.00773604 |
| CrypToadzCustomImage1637     | Custom Images     | 0.00946136 |
| CrypToadzCustomImage17000000 | Custom Images     | 0.00783664 |
| CrypToadzCustomImage1703     | Custom Images     | 0.00769080 |
| CrypToadzCustomImage1754     | Custom Images     | 0.00814016 |
| CrypToadzCustomImage1793     | Custom Images     | 0.25799220 |
| CrypToadzCustomImage18000000 | Custom Images     | 0.00813182 |
| CrypToadzCustomImage1812     | Custom Images     | 0.00586668 |
| CrypToadzCustomImage1812A    | Custom Images     | 0.30715298 |
| CrypToadzCustomImage1812B    | Custom Images     | 0.04757146 |
| CrypToadzCustomImage19000000 | Custom Images     | 0.00900256 |
| CrypToadzCustomImage1935     | Custom Images     | 0.00835544 |
| CrypToadzCustomImage1975     | Custom Images     | 0.00586668 |
| CrypToadzCustomImage1975A    | Custom Images     | 0.30309932 |
| CrypToadzCustomImage1975B    | Custom Images     | 0.16659746 |
| CrypToadzCustomImage2000000  | Custom Images     | 0.00895620 |
| CrypToadzCustomImage20000000 | Custom Images     | 0.00735920 |
| CrypToadzCustomImage21000000 | Custom Images     | 0.00825692 |
| CrypToadzCustomImage2124     | Custom Images     | 0.00903312 |
| CrypToadzCustomImage22000000 | Custom Images     | 0.00786384 |
| CrypToadzCustomImage2232     | Custom Images     | 0.00586644 |
| CrypToadzCustomImage2232A    | Custom Images     | 0.30263892 |
| CrypToadzCustomImage2232B    | Custom Images     | 0.26916416 |
| CrypToadzCustomImage23000000 | Custom Images     | 0.00803294 |
| CrypToadzCustomImage2327     | Custom Images     | 0.00586668 |
| CrypToadzCustomImage2327A    | Custom Images     | 0.30020988 |
| CrypToadzCustomImage2327B    | Custom Images     | 0.21336266 |
| CrypToadzCustomImage24000000 | Custom Images     | 0.00796084 |
| CrypToadzCustomImage2469     | Custom Images     | 0.00806804 |
| CrypToadzCustomImage2471     | Custom Images     | 0.00775882 |
| CrypToadzCustomImage2482     | Custom Images     | 0.00754062 |
| CrypToadzCustomImage2489     | Custom Images     | 0.00586668 |
| CrypToadzCustomImage2489A    | Custom Images     | 0.30491426 |
| CrypToadzCustomImage2489B    | Custom Images     | 0.09968604 |
| CrypToadzCustomImage25000000 | Custom Images     | 0.00834224 |
| CrypToadzCustomImage2521     | Custom Images     | 0.16063102 |
| CrypToadzCustomImage2569     | Custom Images     | 0.00792220 |
| CrypToadzCustomImage2579     | Custom Images     | 0.00745818 |
| CrypToadzCustomImage26000000 | Custom Images     | 0.00915252 |
| CrypToadzCustomImage27000000 | Custom Images     | 0.00804164 |
| CrypToadzCustomImage2709     | Custom Images     | 0.15804908 |
| CrypToadzCustomImage28000000 | Custom Images     | 0.00782338 |
| CrypToadzCustomImage2825     | Custom Images     | 0.00586668 |
| CrypToadzCustomImage2825A    | Custom Images     | 0.30387904 |
| CrypToadzCustomImage2825B    | Custom Images     | 0.14070986 |
| CrypToadzCustomImage2839     | Custom Images     | 0.00815792 |
| CrypToadzCustomImage2846     | Custom Images     | 0.20029686 |
| CrypToadzCustomImage2865     | Custom Images     | 0.00892998 |
| CrypToadzCustomImage29000000 | Custom Images     | 0.00899848 |
| CrypToadzCustomImage2959     | Custom Images     | 0.00586668 |
| CrypToadzCustomImage2959A    | Custom Images     | 0.31083278 |
| CrypToadzCustomImage2959B    | Custom Images     | 0.27319188 |
| CrypToadzCustomImage2986     | Custom Images     | 0.00790924 |
| CrypToadzCustomImage3000000  | Custom Images     | 0.00786958 |
| CrypToadzCustomImage30000000 | Custom Images     | 0.00795700 |
| CrypToadzCustomImage31000000 | Custom Images     | 0.01073478 |
| CrypToadzCustomImage316      | Custom Images     | 0.22307842 |
| CrypToadzCustomImage3196     | Custom Images     | 0.00586644 |
| CrypToadzCustomImage3196A    | Custom Images     | 0.30924014 |
| CrypToadzCustomImage3196B    | Custom Images     | 0.26824710 |
| CrypToadzCustomImage32000000 | Custom Images     | 0.00796108 |
| CrypToadzCustomImage33000000 | Custom Images     | 0.00816200 |
| CrypToadzCustomImage3309     | Custom Images     | 0.00694928 |
| CrypToadzCustomImage3309A    | Custom Images     | 0.30731922 |
| CrypToadzCustomImage3309B    | Custom Images     | 0.31957604 |
| CrypToadzCustomImage3309C    | Custom Images     | 0.02978324 |
| CrypToadzCustomImage3382     | Custom Images     | 0.00586644 |
| CrypToadzCustomImage3382A    | Custom Images     | 0.31124994 |
| CrypToadzCustomImage3382B    | Custom Images     | 0.19341004 |
| CrypToadzCustomImage34000000 | Custom Images     | 0.00778386 |
| CrypToadzCustomImage35000000 | Custom Images     | 0.00805892 |
| CrypToadzCustomImage36000000 | Custom Images     | 0.00854024 |
| CrypToadzCustomImage37000000 | Custom Images     | 0.00816608 |
| CrypToadzCustomImage3703     | Custom Images     | 0.00937556 |
| CrypToadzCustomImage38000000 | Custom Images     | 0.00829490 |
| CrypToadzCustomImage39000000 | Custom Images     | 0.00833744 |
| CrypToadzCustomImage4000000  | Custom Images     | 0.00796882 |
| CrypToadzCustomImage40000000 | Custom Images     | 0.00759106 |
| CrypToadzCustomImage4096     | Custom Images     | 0.17530940 |
| CrypToadzCustomImage41000000 | Custom Images     | 0.00869498 |
| CrypToadzCustomImage4126     | Custom Images     | 0.00820094 |
| CrypToadzCustomImage4152     | Custom Images     | 0.00586668 |
| CrypToadzCustomImage4152A    | Custom Images     | 0.30894988 |
| CrypToadzCustomImage4152B    | Custom Images     | 0.15438332 |
| CrypToadzCustomImage4192     | Custom Images     | 0.00814856 |
| CrypToadzCustomImage42000000 | Custom Images     | 0.00784960 |
| CrypToadzCustomImage4201     | Custom Images     | 0.00788740 |
| CrypToadzCustomImage4221     | Custom Images     | 0.00784704 |
| CrypToadzCustomImage4238     | Custom Images     | 0.00586668 |
| CrypToadzCustomImage4238A    | Custom Images     | 0.30754360 |
| CrypToadzCustomImage4238B    | Custom Images     | 0.03327166 |
| CrypToadzCustomImage4368     | Custom Images     | 0.00828650 |
| CrypToadzCustomImage44000000 | Custom Images     | 0.00784072 |
| CrypToadzCustomImage45000000 | Custom Images     | 0.00832496 |
| CrypToadzCustomImage4578     | Custom Images     | 0.00786982 |
| CrypToadzCustomImage4580     | Custom Images     | 0.00586644 |
| CrypToadzCustomImage4580A    | Custom Images     | 0.30227942 |
| CrypToadzCustomImage4580B    | Custom Images     | 0.25620704 |
| CrypToadzCustomImage46000000 | Custom Images     | 0.00779314 |
| CrypToadzCustomImage4604     | Custom Images     | 0.00763458 |
| CrypToadzCustomImage47000000 | Custom Images     | 0.00793948 |
| CrypToadzCustomImage4714     | Custom Images     | 0.13168428 |
| CrypToadzCustomImage472      | Custom Images     | 0.00851378 |
| CrypToadzCustomImage4773     | Custom Images     | 0.16726874 |
| CrypToadzCustomImage4845     | Custom Images     | 0.00966368 |
| CrypToadzCustomImage4896     | Custom Images     | 0.00694928 |
| CrypToadzCustomImage4896A    | Custom Images     | 0.28642728 |
| CrypToadzCustomImage4896B    | Custom Images     | 0.31493088 |
| CrypToadzCustomImage4896C    | Custom Images     | 0.03448058 |
| CrypToadzCustomImage49000000 | Custom Images     | 0.00836360 |
| CrypToadzCustomImage491      | Custom Images     | 0.00769920 |
| CrypToadzCustomImage5000000  | Custom Images     | 0.00792604 |
| CrypToadzCustomImage50000000 | Custom Images     | 0.00784528 |
| CrypToadzCustomImage51000000 | Custom Images     | 0.00787414 |
| CrypToadzCustomImage5128     | Custom Images     | 0.17556328 |
| CrypToadzCustomImage5150     | Custom Images     | 0.00898504 |
| CrypToadzCustomImage52000000 | Custom Images     | 0.00797362 |
| CrypToadzCustomImage5262     | Custom Images     | 0.00867746 |
| CrypToadzCustomImage53000000 | Custom Images     | 0.00780570 |
| CrypToadzCustomImage54000000 | Custom Images     | 0.00714992 |
| CrypToadzCustomImage5441     | Custom Images     | 0.00928590 |
| CrypToadzCustomImage5471     | Custom Images     | 0.00694928 |
| CrypToadzCustomImage5471A    | Custom Images     | 0.31005334 |
| CrypToadzCustomImage5471B    | Custom Images     | 0.31752098 |
| CrypToadzCustomImage5471C    | Custom Images     | 0.00603266 |
| CrypToadzCustomImage55000000 | Custom Images     | 0.00798226 |
| CrypToadzCustomImage56000000 | Custom Images     | 0.00817040 |
| CrypToadzCustomImage5730     | Custom Images     | 0.00791308 |
| CrypToadzCustomImage5836     | Custom Images     | 0.00843210 |
| CrypToadzCustomImage5848     | Custom Images     | 0.00812964 |
| CrypToadzCustomImage5902     | Custom Images     | 0.00586668 |
| CrypToadzCustomImage5902A    | Custom Images     | 0.30694982 |
| CrypToadzCustomImage5902B    | Custom Images     | 0.25066092 |
| CrypToadzCustomImage6000000  | Custom Images     | 0.00850106 |
| CrypToadzCustomImage6214     | Custom Images     | 0.00586668 |
| CrypToadzCustomImage6214A    | Custom Images     | 0.30785336 |
| CrypToadzCustomImage6214B    | Custom Images     | 0.09671816 |
| CrypToadzCustomImage6382     | Custom Images     | 0.00586668 |
| CrypToadzCustomImage6382A    | Custom Images     | 0.30942954 |
| CrypToadzCustomImage6382B    | Custom Images     | 0.26048968 |
| CrypToadzCustomImage6491     | Custom Images     | 0.16035870 |
| CrypToadzCustomImage6572     | Custom Images     | 0.18123104 |
| CrypToadzCustomImage6578     | Custom Images     | 0.01077822 |
| CrypToadzCustomImage6631     | Custom Images     | 0.14775378 |
| CrypToadzCustomImage6719     | Custom Images     | 0.00868610 |
| CrypToadzCustomImage6736     | Custom Images     | 0.00802454 |
| CrypToadzCustomImage6852     | Custom Images     | 0.00848402 |
| CrypToadzCustomImage6894     | Custom Images     | 0.00728908 |
| CrypToadzCustomImage6916     | Custom Images     | 0.00713732 |
| CrypToadzCustomImage7000000  | Custom Images     | 0.00886488 |
| CrypToadzCustomImage703      | Custom Images     | 0.11709896 |
| CrypToadzCustomImage8000000  | Custom Images     | 0.00751392 |
| CrypToadzCustomImage864      | Custom Images     | 0.00784704 |
| CrypToadzCustomImage9000000  | Custom Images     | 0.00780610 |
| CrypToadzCustomImage916      | Custom Images     | 0.00586668 |
| CrypToadzCustomImage916A     | Custom Images     | 0.30205578 |
| CrypToadzCustomImage916B     | Custom Images     | 0.26781730 |
| CrypToadzCustomImage936      | Custom Images     | 0.00586644 |
| CrypToadzCustomImage936A     | Custom Images     | 0.30153796 |
| CrypToadzCustomImage936B     | Custom Images     | 0.29189486 |
| CrypToadzCustomImage966      | Custom Images     | 0.00751464 |
| Total                        | 700614088         | 14.01228176 |

Total Cost = 30.62957408 eth @ 20 gwei