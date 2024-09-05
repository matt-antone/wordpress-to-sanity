const { importTags } = require("./importTags.cjs");

require("../export/export.cjs");
require("./importTags.cjs");
require("./importCategories.cjs");

async function importAll() {
  // export content from WordPress and save to files in export folder
  await exportAll();
  await importTags();
  await importCategories();
  console.log("done")

}

