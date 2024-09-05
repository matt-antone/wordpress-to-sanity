export const query = `
query GetPages {
  pages(first: 1000) {
    nodes {
      title
      databaseId
      date
      slug
      featuredImage {
        node {
          altText
          caption
          title
          mediaDetails {
            file
            height
            width
          }
          sourceUrl
        }
      }
      content
    }
  }
}`;
