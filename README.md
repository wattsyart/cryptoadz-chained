# cryptoadz-chained
The same CrypToadz you know and love, preserved on-chain.

## Setting up

The following code will compile the project and build the tokenURI for CrypToadz #1.

```bash
npm install
npx hardhat compile
npx hardhat toad --id 1
```

The following code will run a test pass across all toads, building delta images of any errors. 
_WARNING: This takes a long time..._

```bash
npx hardhat toadz-all
```

## Design Notes

Deployment is modular, and split across five main components:

`CrypToadzChained`: main contract, responsible producing the final tokenURI

`CrypToadzBuilder`: contains features and builder logic for "buildable" toadz (non-custom, non-animations)
    `CrypToadzDeltas`: contains patch data for built toadz where errors occur (manually edited images, metadata mismatches, etc.)

`CrypToadzMetadata`: contains all metadata
    `CrypToadzStrings`: contains all string lookups for metadata

`CrypToadzCustomImages`: contains image data for "1/1" custom toadz that are PNG images

`CrypToadzCustomAnimations`: contains image data for "1/1" custom toadz that are GIF animations

## How are buildable toadz created?

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

## What is the deployment cost?

The current gas cost deployment for each component is listed below. 

You may also run the `npx hardhat toadz-gas --gwei [GWEI]` command to show the deployment costs for each component for a given `gwei` value, which is useful when trying to time deployments of expensive components.

Each component in the table indicates the current optimization level, and the estimated possible improvement for further development.

```bash
```