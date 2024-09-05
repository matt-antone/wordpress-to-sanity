import { htmlToBlocks, getBlockContentFeatures } from "@sanity/block-tools";
import { JSDOM } from "jsdom";
import { blockRules, getBlockContentType } from "../lib.mjs";

export default async function transformNodes(nodes) {
  return await Promise.all(
    nodes.map(async (node) => {
      return await transformNode(node);
    })
  );
}

async function transformNode({
  databaseId,
  name,
}) {
  const sanityObj = {
    _type: "category",
    _id: `wordpress-category-import-${databaseId.toString()}`,
    title: name,
  };
  return sanityObj;
}
