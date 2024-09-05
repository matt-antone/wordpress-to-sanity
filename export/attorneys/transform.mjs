import { htmlToBlocks } from "@sanity/block-tools";
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
  date,
  teamMemberId,
  title,
  slug,
  featuredImage,

  teamMemberFields: {
    emailTeam: email,
    phoneNumber: phone,
    linkedin,
    youtube,
    biographyData,
    biographyImage,
    relatedPractices,
    practice,
    position,
    featuredVideo,
  },
}) {
  const trimmed =
    phone?.title
      .trim()
      .split(" ")
      .join("")
      .split("–")
      .join("")
      .split("-")
      .join("")
      .split("(")
      .join("")
      .split(")")
      .join("") || null;
  const blockType = await getBlockContentType("body");
  let sanityObj = {
    date,
    _id: `wordpress-import-${teamMemberId}`,
    _type: "profile",
    title,
    slug: {
      current: slug,
    },
    email,
    phone: trimmed,
    practices: [],
    linkedin: { url: linkedin?.url || null, title: linkedin?.title || null },
    youtube: { url: youtube?.url || null, title: youtube?.title || null },
    position: position,
    practice,
    featuredVideo: featuredVideo.videoCode
  };
  if (featuredImage?.node?.sourceUrl) {
    sanityObj.thumbnail = {
      _type: "image",
      _sanityAsset: `image@${featuredImage.node.sourceUrl}`,
    };
  }
  if (biographyImage?.node?.sourceUrl) {
    sanityObj.profileImage = {
      _type: "image",
      _sanityAsset: `image@${biographyImage.node.sourceUrl}`,
    };
  }

  // get the biography
  const bio = biographyData.find((bd) => bd.titleSelect[0] === "bio");

  if (bio?.descriptionTab) {
    sanityObj.bio = htmlToBlocks(bio.descriptionTab, blockType, {
      parseHtml: (html) => new JSDOM(html).window.document,
      rules: blockRules,
    });
  }

  if (biographyData.length > 1) {
    const accordion = [];
    biographyData.forEach((bd) => {
      if (bd.titleSelect[0] !== "bio") {
        accordion.push({
          // _key: bd.titleSelect[0],
          // _type: "accordionItem",
          title: bd.titleSelect[1],
          content: htmlToBlocks(bd.descriptionTab, blockType, {
            parseHtml: (html) => new JSDOM(html).window.document,
            rules: blockRules,
          }),
        });
      }
    });
    sanityObj.accordion = accordion;
  }

  if (relatedPractices?.nodes) {
    relatedPractices.nodes.forEach((p) => {
      sanityObj.practices.push({
        _type: "reference",
        _weak: true,
        _ref: `wordpress-practice-import-${p.databaseId}`,
      });
    });
  }
  return sanityObj;
}
