export const query = `
query GetPosts {
  posts(first: 100000) {
    nodes {
      title
      date
      databaseId
      content
      categories(first: 1000) {
        nodes {
          databaseId
        }
      }
      articleFeaturedVideo {
        articleVideoCode
      }
      featuredImage {
        node {
          altText
          caption
          date
          mediaDetails {
            file
            height
            width
          }
          slug
          sourceUrl
          title(format: RAW)
        }
      }
      postFields {
        teamMember(first: 100) {
          pageInfo {
            hasPreviousPage
            hasNextPage
          }
          nodes {
            databaseId
          }
        }
      }
      slug
      seo {
        title
        twitterTitle
        opengraphTitle
        opengraphDescription
      }
      postId
      tags(first: 100) {
        nodes {
          databaseId
        }
      }
    }
  }
}`;
