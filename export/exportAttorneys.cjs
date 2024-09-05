require("dotenv").config();
const fetch = require("node-fetch");
const arrayToNdjson = require("array-to-ndjson");
const fs = require("fs");

const exportDir = "export/exports";
const exportFile = `${exportDir}/attorneys.ndjson`;

async function fetchAPI(query, { variables } = {}) {
  // Set up some headers to tell the fetch call
  // that this is an application/json type
  const headers = { "Content-Type": "application/json" };

  // build out the fetch() call using the API_URL
  // environment variable pulled in at the start
  // Note the merging of the query and variables
  const res = await fetch("http://epgrlawyers.local/graphql", {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  // error handling work
  if (json.errors) {
    json.errors.forEach((error) => console.log(error));
    console.log("error details", query, variables);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}

async function exportTags() {
  const data = await fetchAPI(`
query GetProfile {
  teamMembers(first: 100) {
    nodes {
      title
      slug
      teamMemberId
      teamMemberFields {
        relatedPosts(first: 1000) {
          nodes {
            id
            ... on Post {
              id
              title
            }
          }
        }
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
              ... on PracticeArea {
                id
                slug
                title
              }
            }
          }
        }
        seniorCounsel
        topAssociate
        titleSectionPractice
        youtube {
          target
          title
          url
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
}

  `);
  const transformedData = data.teamMembers.nodes.map(
    ({
      date,
      teamMemberId,
      title,
      slug,
      featuredImage,
      teamMemberFields: { emailTeam: email, linkedin, youtube, biographyImage },
    }) => {
      // console.log(teamMemberId,title,teamMemberFields);
      return {
        date,
        _id: `wordpress-import-${teamMemberId}`,
        _type: "profile",
        title,
        slug: {
          current: slug,
        },
        email,
        profileImage: biographyImage?.node?.sourceUrl
          ? {
              _type: "image",
              _sanityAsset: `image@${biographyImage.node.sourceUrl}`,
              alt: biographyImage?.node?.altText || title,
            }
          : null,
        thumbnail: featuredImage?.node?.sourceUrl
          ? {
              _type: "image",
              _sanityAsset: `image@${featuredImage.node.sourceUrl}`,
              alt: featuredImage?.node?.altText || title,
            }
          : null,
        practices: [],
        linkedin,
        youtube: youtube?.url || null,
      };
    }
  );
  console.log(transformedData);
  // make sure the export exists
  try {
    fs.readdirSync(exportDir);
  } catch (e) {
    fs.mkdirSync(exportDir);
  }

  arrayToNdjson(transformedData).pipe(fs.createWriteStream(exportFile));
}

// Import
exportTags();

exports.exportTags = exportTags;
