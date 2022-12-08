async function run() {
  console.log('seed placeholder');
}

run()
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });

// https://bobbyhadz.com/blog/typescript-cannot-be-compiled-under-isolatedmodules
export {};
