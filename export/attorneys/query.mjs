export const query = `
query GetProfile {
  teamMembers(first: 100) {
    nodes {
      title
      slug
      teamMemberFields {
        biographyData {
          descriptionTab
          titleSelect
        }
        biographyImage {
          node {
            altText
            caption
            date
            mediaDetails {
              height
              width
              file
            }
            sourceUrl
          }
        }
        card {
          target
          title
          url
        }
        emailTeam
        phoneNumber {
          title
          url
          target
        }
        featuredVideo {
          videoCode
          videoTitle
        }
        linkedin {
          url
          title
          target
        }
        position
        practice
        practiceAreasTeam {
          edges {
            node {
              id
              date
              slug
              databaseId
              ... on PracticeArea {
                id
                slug
                title
              }
            }
          }
        }
        practice
        seniorCounsel
        topAssociate
        titleSectionPractice
        youtube {
          target
          title
          url
        }
        relatedPractices {
          nodes {
            databaseId
          }
        }
      }
      date
      featuredImage {
        node {
          altText
          caption
          mediaDetails {
            file
            height
            width
          }
          sourceUrl
        }
      }
      teamMemberId
    }
  }
}`;
