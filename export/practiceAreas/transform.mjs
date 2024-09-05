import { htmlToBlocks, getBlockContentFeatures } from "@sanity/block-tools";
import { JSDOM } from "jsdom";
import { blockRules, getBlockContentType } from "../lib.mjs";

export default async function transformNodes(nodes) {
  return await Promise.all(nodes.map(async (node) => {
    return await transformNode(node);
  }));
}

async function transformNode({
  title,
  slug,
  excerpt,
  seo,
  featuredImage,
  content,
  practiceAreaId,
  date,
}) {
  const blockType = await getBlockContentType("body");
  const sanityObj = {
    _type: "practice",
    _id: `wordpress-practice-import-${practiceAreaId.toString()}`,
    title,
    date,
    slug: { current: slug },
    body: htmlToBlocks(content, blockType, {
      parseHtml: (html) => new JSDOM(html).window.document,
      rules: blockRules,
    }),
  };
  if (featuredImage?.node?.sourceUrl) {
    sanityObj.image = {
      _type: "image",
      _sanityAsset: `image@${featuredImage.node.sourceUrl}`,
    };
  }
  return sanityObj;
}
