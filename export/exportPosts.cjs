require("dotenv").config();
const fetch = require("node-fetch");

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

async function getPositions(){
  const data = await fetchAPI(`
  
  query GetPosts {
  posts(first: 100000) {
    edges {
      node {
        content
        articleFeaturedVideo {
          articleVideoCode
        }
        date
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
        slug
        title
        postFields {
          teamMember(first: 100) {
            pageInfo {
              hasPreviousPage
              hasNextPage
            }
            edges {
              node {
                slug
              }
            }
          }
        }
        seo {
          title
          twitterTitle
          opengraphTitle
          opengraphDescription
        }
        postId
      }
    }
  }
}
  
  `);
  console.log(data.posts.edges)
  const transformedData = data.posts.edges.map(({ node: {
    postId,
    title,
    slug,
    excerpt,
    seo,
    featuredImage,
    articleFeaturedVideo,
    postFields,
  }}) => {
    return {
      _id: postId,
      title: title,
      slug: slug,
      desription: seo?.opengraphDescription || excerpt,
      image: featuredImage?.node?.sourceUrl ? {
        _type: "image",
        _sanityAsset: `image@${featuredImage.node.sourceUrl}`,
      }: null
    }
  });
  console.log(transformedData)
}


// Get Attorneys
getPositions()