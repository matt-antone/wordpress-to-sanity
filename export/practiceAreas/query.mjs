export const query = `
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
}`;
