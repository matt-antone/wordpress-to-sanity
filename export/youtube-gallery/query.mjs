export const query = `
query GetYouTubes {
  youtubes(first: 1000) {
    nodes {
      databaseId
      title
      content
      date
      slug
      youtubeGallery {
        youtubeGallery
      }
    }
  }
}`;
