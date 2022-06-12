const fs = require('fs');
const readline = require('readline');
const gutil = require('gulp-util');
const utils = require('../utils.js');

async function main() {
  var toadz = await utils.deploy();

  createDirectoryIfNotExists('./scripts/output');
  createDirectoryIfNotExists('./scripts/output/images');
  createDirectoryIfNotExists('./scripts/output/images/frames');
  createDirectoryIfNotExists('./scripts/output/metadata');

  const logPath = './scripts/output/errors.txt';
  deleteFileIfExists(logPath);
  var logger = fs.createWriteStream(logPath);

  try {
    const fileStream = fs.createReadStream('./scripts/tokenIds.txt');
    const lines = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    for await (const line of lines) {
      await utils.collect(toadz, parseInt(line), logger);
    }
  } catch (error) {
    console.error(gutil.colors.red(error));
  }

  fs.closeSync(logger);
}



main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(gutil.colors.red(error));
    process.exit(1);
  });
