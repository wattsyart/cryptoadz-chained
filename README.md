# CrypToadzChained
The same CrypToadz you know and love, preserved on-chain.

## Where To Find It?

The contracts are [live on Mainnet](https://etherscan.io/address/0xE8D8C0A6f174e08C44aB399b7CE810Bc4Dce096A#code) 
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

# Install hardhat and dev dependencies
npm install

# Compile the contracts
npx hardhat compile

# Deploy the contracts to the dev node
node scripts/deployer.js

# Retried CrypToadz #1's image and metadata from the devnode
npx hardhat toadz --id 1

# Create one million random toadz, because you deserve it!
# npx hardhat toadz-random-token-batch --count 1000000
```

The following list shows all available hardhat commands.

```bash
npx hardhat toadz                     Validates correctness of a single CrypToadz
npx hardhat toadz-all                 Validates correctness of all CrypToadz tokens
npx hardhat toadz-all-images          Validates correctness of all CrypToadz token images
npx hardhat toadz-all-metadata        Validates correctness of all CrypToadz token metadata
npx hardhat toadz-custom-animations   Validates correctness of CrypToadz custom animations
npx hardhat toadz-custom-images       Validates correctness of CrypToadz custom images
npx hardhat toadz-deploy-bundle       Produces a JSON file containing unsigned transactions for all deployments at a set price budget
npx hardhat toadz-gas                 Produces ETH cost breakdown for deployment by component
npx hardhat toadz-image-deltas        Validates correctness of CrypToadz token images that have deltas
npx hardhat toadz-random-image        Generates a random toadz imageURI and saves the image to disk
npx hardhat toadz-random-token        Generates a random toadz tokenURI and saves the metadata and image to disk
npx hardhat toadz-random-image-batch  Batch-based random token generation for stress testing
npx hardhat toadz-random-token-batch  Batch-based random image generation for stress testing
npx hardhat toadz-wrapped             Validates correctness of a single, wrapped CrypToadz
```

## Running the Viewer App

To run the app locally:

Install the [.NET 6 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/6.0) for your environment

Run the following in your terminal from the repository root to bring up the server
```
dotnet run --project "./ui/CrypToadzChained/CrypToadzChained/Server/CrypToadzChained.Server.csproj" --configuration Release --urls=http://localhost:7025/
```

Once running, the app is available at `https://localhost:7025`, or the port you specified.

You will need to [provide your own values](https://github.com/wattsyart/cryptoadz-chained/blob/main/ui/CrypToadzChained/CrypToadzChained/Server/appsettings.json) for the `appsettings.json` file:

```json
{
  "Web3": {
    "OnChainRpcUrl": "YOUR_ALCHEMY_OR_INFURA_URL_GOES_HERE",
    "OnChainContractAddress": "0x60d9d8bc30812fdee9cc5e3fcb630233a924cc97"
  },
  "Discord": {
    "PublicKey": "public-key",
    "ApplicationID": "application-id",
    "BotToken": "bot-token"
  }
}
```

_Note: it is safe to leave the Discord values as is, and ignore the related error on startup_

## How do you know it's a perfect copy of the real CrypToadz metadata and assets?

Every metadata JSON file and each frame of every image is checked in the validation commands, written in NodeJS and based on `pngjs` and `pixelmatch` libraries.

In addition, the [Viewer App](https://cryptoadzchained.com) performs a completely separate implementation of the same verification
on both the current BaseURI assets (Arweave) and the provenance images (IPFS), written in C# and based on the `ImageSharp` library.

This means we have two completely distinct validators to confirm the results. You are also welcome to write your own validator :)

_**Note**:
All generated toadz and pixel-art animated toadz are rendered at 36x36 on-chain, while the originals are 1440x1440. To compare them, you will need to resize the on-chain toad to 1440x1440, or the off-chain toad to 36x36, using [nearest-neighbor interpolation](https://en.wikipedia.org/wiki/Nearest-neighbor_interpolation), no smoothing or anti-aliasing of any kind, and, depending on your graphics package, a half-step pixel offset. This is possible, because pixel art is safely scalable to any size
in powers of two. If you want an on-chain image that is "wrapped" with an SVG wrapper that will display at any size, use the tokenURI function that provides the Presentation parameter, and select `Presentation.ImageData` or `Presentation.Both`_

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

The uncompressed intermediate format for draw instructions is linked below.

[Builder Format](https://github.com/wattsyart/cryptoadz-chained/wiki/Builder-Format)

## What is the deployment cost?

The current gas cost deployment for each component is linked below, assuming a gas price of 10 gwei.

You may also run the `npx hardhat toadz-gas --gwei [GWEI]` command (to a deployed dev node) to produce the same table, showing the deployment costs for each component for a given `gwei` value, which is useful when trying to time deployments of expensive components.

[Gas Cost Report](https://github.com/wattsyart/cryptoadz-chained/wiki/Gas-Cost-Report)
