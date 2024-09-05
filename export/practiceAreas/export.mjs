// const fetch = require("node-fetch");
import arrayToNdjson from "array-to-ndjson";
import * as fs from "fs";
import { query } from "./query.mjs";
import transformNodes from "./transform.mjs";
import { fetchGraphql } from "../lib.mjs";


// configure the export path and filename here
const exportDir = "export/exports";
const exportFile = `${exportDir}/practice-areas.ndjson`;

async function exportType() {
  const data = await fetchGraphql(query);
  const transformedData = await transformNodes(data.practiceAreas.nodes);
  try {
    fs.readdirSync(exportDir);
  } catch (e) {
    fs.mkdirSync(exportDir);
  }
  console.log(`Exporting ${transformedData.length} positions to ${exportFile}`);
  arrayToNdjson(transformedData).pipe(fs.createWriteStream(exportFile));
}

// Get Attorneys
exportType();
