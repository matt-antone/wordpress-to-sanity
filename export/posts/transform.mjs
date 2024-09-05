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
  title,
  slug,
  featuredImage,
  content,
  databaseId,
  date,
  postFields,
  categories,
  tags,
}) {
  const blockType = await getBlockContentType("body");
  const sanityObj = {
    _type: "post",
    date,
    _id: `wordpress-post-import-${databaseId.toString()}`,
    title,
    slug: { current: slug },
  };
  if (content) {
    sanityObj.body = htmlToBlocks(content, blockType, {
      parseHtml: (html) => new JSDOM(html).window.document,
      rules: blockRules,
    });
  }
  if (featuredImage?.node?.sourceUrl) {
    sanityObj.image = {
      _type: "image",
      _sanityAsset: `image@${featuredImage.node.sourceUrl}`,
    };
  }
  if (postFields?.teamMember?.nodes) {
    sanityObj.profiles = postFields.teamMember.nodes.map(({databaseId}) => {
      return {
        _type: "reference",
        _ref: `wordpress-import-${databaseId}`,
        "_weak": true,
      };
    });
  }
  if(categories?.nodes) {
    sanityObj.categories = categories.nodes.map(({databaseId}) => {
      return {
        _type: "reference",
        _ref: `wordpress-category-import-${databaseId}`,
        "_weak": true,
      };
    });
  }

  if(tags?.nodes) {
    sanityObj.tags = tags.nodes.map(({databaseId}) => {
      return {
        _type: "reference",
        _ref: `wordpress-import-${databaseId}`,
        "_weak": true,
      };
    });
  }
  return sanityObj;
}
