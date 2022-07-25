const fs = require('fs');
const readline = require('readline');

const os = require('os');
const gutil = require('gulp-util');
const superagent = require('superagent');

const jsonDiff = require('json-diff')
const gifToPng = require('gif-to-png');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');

module.exports = {

    crush:
        async function crush() {
            const fileStream = fs.createReadStream('./scripts/customImageIds.txt');
            const lines = readline.createInterface({
                input: fileStream,
                crlfDelay: Infinity
            });

            for await (const line of lines) {
                console.log(`crushing ./assets/TOADZ_${line}.png`);
                superagent.post('https://www.toptal.com/developers/pngcrush/crush').attach('input', `./assets/TOADZ_${line}.png`).end(function (res) {
                    var tempFilePath = `./assets/TOADZ_${line}_crushed.png`;
                    var tempFile = fs.createWriteStream(tempFilePath);
                    res.pipe(tempFile);
                    fs.copyFileSync(tempFilePath, `./assets/${line}.png`);
                    deleteFileIfExists(tempFilePath);
                });
            }
        },

    collect:
        async function collect(contract, tokenId, logger, checkMetadata, checkImage) {

            createDirectoryIfNotExists('./scripts/output');
            createDirectoryIfNotExists('./scripts/output/images');
            createDirectoryIfNotExists('./scripts/output/images/frames');
            createDirectoryIfNotExists('./scripts/output/metadata');

            try {
                const pattern = /^data:.+\/(.+);base64,(.*)$/;

                // call contract to get tokenURI
                var tokenDataUri = await contract.tokenURI(tokenId);

                // convert base64 tokenURI to JSON
                var jsonData = tokenDataUri.match(pattern)[2];
                var jsonBuffer = Buffer.from(jsonData, 'base64');
                var json = jsonBuffer.toString('utf8');                

                // compare metadata
                if (checkMetadata) {

                    // write metadata for comparison
                    const metadataPath = `./scripts/output/metadata/${tokenId}.json`;
                    fs.writeFileSync(metadataPath, json);

                    var jsonA = JSON.parse(json);
                    delete jsonA["image"];

                    // some arweave assets have junk symbols in the first byte, we have to cleanse
                    var assetJson = fs.readFileSync(`./assets/TOADZ_${tokenId}.json`, 'utf8').slice(1).toString('utf8');
                    if (!assetJson.startsWith("{")) {
                        assetJson = "{" + assetJson;
                    }

                    var jsonB = JSON.parse(assetJson);
                    delete jsonB["image"];
                    jsonB.attributes = jsonB.attributes.filter(function (obj) {
                        return obj.trait_type !== 'Size';
                    });

                    var metaDiff = jsonDiff.diff(jsonA, jsonB);
                    var metaDeltaPath = `./scripts/output/metadata/${tokenId}_delta.json`;
                    deleteFileIfExists(metaDeltaPath);
                    if (metaDiff) {
                        // create delta JSON if there isn't an exact match, for inspection                        
                        fs.writeFileSync(metaDeltaPath, JSON.stringify(metaDiff));
                        console.log(gutil.colors.red(metaDeltaPath));
                    } else {
                        console.log(gutil.colors.green(metadataPath));
                    }
                }

                if (checkImage) {
                    // convert image URI to GIF buffer
                    var imageDataUri = JSON.parse(json).image;
                    var imageFormat = imageDataUri.match(pattern)[1];
                    var imageData = imageDataUri.match(pattern)[2];
                    let imageBuffer = Buffer.from(imageData, 'base64');

                    if (imageFormat === 'png') {
                        // save as PNG
                        const imagePath = `./scripts/output/images/${tokenId}.png`;
                        fs.writeFileSync(imagePath, imageBuffer);
                        console.log(gutil.colors.green(imagePath));

                        // write out a fake frame1 so we can compare
                        const framePath = `./scripts/output/images/frames/${tokenId}`;
                        createDirectoryIfNotExists(framePath);
                        fs.writeFileSync(`./scripts/output/images/frames/${tokenId}/frame1.png`, imageBuffer);
                    }
                    else {
                        // write GIF buffer to disk for comparison
                        const imagePath = `./scripts/output/images/${tokenId}.gif`;
                        fs.writeFileSync(imagePath, imageBuffer);
                        console.log(gutil.colors.green(imagePath));

                        // convert GIF to PNG frames for deltas
                        const framePath = `./scripts/output/images/frames/${tokenId}`;
                        createDirectoryIfNotExists(framePath);
                        await gifToPng(imagePath, framePath);
                    }

                    if (fs.existsSync(`./assets/TOADZ_${tokenId}.gif`)) {
                        // convert asset GIF to PNG frames for deltas
                        const framePath = `./scripts/output/images/frames/${tokenId}`;
                        await gifToPng(`./assets/TOADZ_${tokenId}.gif`, framePath);
                        var firstFrameBuffer = fs.readFileSync(`./scripts/output/images/frames/${tokenId}/frame1.png`);
                        fs.writeFileSync(`./assets/TOADZ_${tokenId}.png`, firstFrameBuffer);
                    }

                    // load PNGs for comparison images
                    const asset = PNG.sync.read(fs.readFileSync(`./assets/TOADZ_${tokenId}.png`));
                    const generated = PNG.sync.read(fs.readFileSync(`./scripts/output/images/frames/${tokenId}/frame1.png`));

                    // compare images for exact match
                    const { width, height } = asset;
                    const diff = new PNG({ width, height });
                    const badPixels = pixelmatch(asset.data, generated.data, diff.data, width, height, { threshold: 0 });

                    // create delta image if there isn't an exact match, for inspection
                    var imageDeltaPath = `./scripts/output/images/${tokenId}_delta.png`;
                    deleteFileIfExists(imageDeltaPath);
                    if (badPixels != 0) {
                        fs.writeFileSync(imageDeltaPath, PNG.sync.write(diff));
                        console.log(gutil.colors.red(imageDeltaPath));
                        if (logger) {
                            await logger.write(`${tokenId}` + os.EOL);
                        }
                    }
                }

            } catch (error) {
                console.error(gutil.colors.red(error));
            }
        }
}

function createDirectoryIfNotExists(path) {
    try {
        return fs.mkdirSync(path)
    } catch (error) {
        if (error.code !== 'EEXIST') throw error
    }
}

function deleteFileIfExists(path) {
    try {
        if (fs.existsSync(path)) {
            fs.unlinkSync(path);
        }
    } catch (error) {
        console.error(gutil.colors.red(error));
    }
}

