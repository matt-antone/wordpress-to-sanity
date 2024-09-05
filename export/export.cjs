const {exportCategories} = require("./exportCategories.cjs"); // exportCategories
const {exportTags} = require("./exportTags.cjs"); // exportTags
async function exportAll() {
  await exportCategories();
  await exportTags();
  console.log("done")
}

exportAll();

exports.exportAll = exportAll