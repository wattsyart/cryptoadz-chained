# cryptoadz-chained
The same CrypToadz you know and love, preserved on-chain.

# How are images created?

Each toad feature is represented in an intermediate format that is compressed with INFLATE and stored via SSTORE2.

The intermediate format for draw instructions is:

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

# Current deployment cost

```bash
·------------------------|---------------------------|-------------|---------------------------------·
|  Solc version: 0.8.13  ·  Optimizer enabled: true  ·   Runs: 1   ·  Block limit: 900000000000 gas  │
·························|···························|·············|··································
|  Methods               ·               60 gwei/gas               ·          1.00 eth/eth           │
··············|··········|·············|·············|·············|·················|················
|  Contract   ·  Method  ·  Min        ·  Max        ·  Avg        ·  # calls        ·  eth (avg)    │
··············|··········|·············|·············|·············|·················|················
|  Deployments           ·                                         ·  % of limit     ·               │
·························|·············|·············|·············|·················|················
|  CrypToadz             ·          -  ·          -  ·  107637723  ·            0 %  ·         6.46  │
·························|·············|·············|·············|·················|················
|  GIFEncoder            ·          -  ·          -  ·    1552785  ·            0 %  ·         0.09  │
·························|·············|·············|·············|·················|················
|  PixelRenderer         ·          -  ·          -  ·    1187439  ·            0 %  ·         0.07  │
·------------------------|-------------|-------------|-------------|-----------------|---------------·
```

