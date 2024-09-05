// const fetch = require("node-fetch");
import arrayToNdjson from "array-to-ndjson";
import * as fs from "fs";
import { query } from "./query.mjs";
import transformNodes from "./transform.mjs";
import { fetchGraphql } from "../lib.mjs";

// configure the export path and filename here
const exportDir = "export/exports";
const exportFile = `${exportDir}/posts.ndjson`;

async function exportType() {
  const data = await fetchGraphql(query);
  const transformedData = await transformNodes(
    data.posts.nodes
  );
  try {
    fs.readdirSync(exportDir);
  } catch (e) {
    fs.mkdirSync(exportDir);
  }
  console.log(`Exporting ${transformedData.length} posts to ${exportFile}`);
  arrayToNdjson(transformedData.sort((a, b) => {
    const aDate = new Date(a.date).getTime();
    const bDate = new Date(b.date).getTime();
    return aDate > bDate ? 1 : -1;
  })).pipe(fs.createWriteStream(exportFile));
}

// Get Attorneys
exportType();
