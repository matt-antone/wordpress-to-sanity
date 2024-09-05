export default async function transformNodes(nodes) {
  return await Promise.all(
    nodes.map(async (node) => {
      return await transformNode(node);
    })
  );
}

async function transformNode({
  databaseId,
  title,
  content,
  date,
  slug,
  youtubeGallery: { youtubeGallery: link },
}) {
  const sanityObj = {
    _type: "youtubePage",
    _id: `wordpress-youtube-import-${databaseId.toString()}`,
    title,
    date,
    slug: { current: slug },
    shareCode: content.replace("autoplay;", ''),
    link,
  };
  return sanityObj;
}
