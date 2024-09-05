require("dotenv").config();
const fetch = require("node-fetch");
const arrayToNdjson = require('array-to-ndjson');
const fs = require("fs");

const exportDir = "export/exports"
const exportFile = `${exportDir}/tags.ndjson`

async function fetchAPI(query, { variables } = {}) {
  // Set up some headers to tell the fetch call
  // that this is an application/json type
  const headers = { "Content-Type": "application/json" };

  // build out the fetch() call using the API_URL
  // environment variable pulled in at the start
  // Note the merging of the query and variables
  const res = await fetch("http://epgrlawyers.local/graphql", {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  // error handling work
  if (json.errors) {
    json.errors.forEach((error) => console.log(error));
    console.log("error details", query, variables);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}

async function exportTags() {
  const data = await fetchAPI(`
  query GetTags {
  tags(first: 10000000) {
    nodes {
      id
      name
      slug
      tagId
    }
  }
}
  `);
  console.log(data.tags.nodes);
  const transformedData = data.tags.nodes.map(({ id, name, slug,tagId }) => {
    console.log(id, name, slug);
    return {
      _id: `wordpress-import-${tagId}`,
      _type: "tag",
      title: name,
    };
  });
  console.log(transformedData);
  // make sure the export exists
  try {
    fs.readdirSync(exportDir);
  } catch (e) {
    fs.mkdirSync(exportDir);
  }

  arrayToNdjson(transformedData).pipe(fs.createWriteStream(exportFile))
}

// Import
exportTags();

exports.exportTags = exportTags