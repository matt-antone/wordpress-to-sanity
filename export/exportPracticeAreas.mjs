// const fetch = require("node-fetch");
import arrayToNdjson from "array-to-ndjson";
import * as fs from "fs";
import * as path from "path";
import { Schema } from "@sanity/schema";
import types from "./types.mjs";
import {htmlToBlocks, getBlockContentFeatures} from '@sanity/block-tools'
import {JSDOM} from "jsdom";
import { blockRules } from "./lib.mjs";

// const fs = require("fs");
// const Schema = require('@sanity/schema').Schema
// const {convertHTML} =  require("./convertContent.cjs");
// const schemaTypes = import("../src/schema/index.ts").schemaTypes

// configure the export path and filename here
const exportDir = "export/exports";
const exportFile = `${exportDir}/practice-areas.ndjson`;

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

async function getPositions() {
  const defaultSchema = Schema.compile({
    name: "myBlog",
    types,
  });

  const blockContentType = await defaultSchema
    .get("practice")
    .fields.find((field) => field.name === "body").type;

  console.log("blockContentType", blockContentType);
  const data = await fetchAPI(`

query GetPracticeAreas {
  practiceAreas(first: 100000) {
    nodes {
      content
      date
      excerpt(format: RAW)
      menuOrder
      seo {
        title
        metaDesc
        opengraphDescription
      }
      slug
      title
      practiceAreaId
    }
  }
}

  
  `);
  const transformedData = data.practiceAreas.nodes.map(
    ({
      postId,
      title,
      slug,
      excerpt,
      seo,
      featuredImage,
      content,
      practiceAreaId,
      date
    }) => {
      const sanityObj = {
        _type: "practice",
        _id: `wordpress-practice-import-${practiceAreaId.toString()}`,
        title,
        date,
        slug: { current: slug },
        description: seo?.opengraphDescription || excerpt,
        body: htmlToBlocks(content, blockContentType, {
          parseHtml: (html) => new JSDOM(html).window.document,
          rules,
        }),
      };
      if(featuredImage?.node?.sourceUrl){
        sanityObj.image = {
          _type: "image",
          _sanityAsset: `image@${featuredImage.node.sourceUrl}`,
        }
      }

      return sanityObj;
    }
  );
  console.log(transformedData);
  try {
    fs.readdirSync(exportDir);
  } catch (e) {
    fs.mkdirSync(exportDir);
  }

  arrayToNdjson(transformedData).pipe(fs.createWriteStream(exportFile));
}

// Get Attorneys
getPositions();
