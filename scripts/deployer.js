const utils = require('./deploy.js');

async function main() {
  await utils.deployContracts();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });