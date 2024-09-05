import { Schema } from "@sanity/schema";
import types from "./types.mjs";

const checkProtocol = (url) => {
  console.log(url);
  return url?.includes("http") ? url : `http://epgrlawyers.local/${url}`;
};

const getImageURL = (url) => {
  let newURL = url;
  const checkedURL = checkProtocol(url);
  if (
    checkedURL.includes("uploads/2000") ||
    checkedURL.includes("uploads/2001") ||
    checkedURL.includes("uploads/2002") ||
    checkedURL.includes("uploads/2003") ||
    checkedURL.includes("uploads/2004") ||
    checkedURL.includes("uploads/2005") ||
    checkedURL.includes("uploads/2006") ||
    checkedURL.includes("uploads/2007") ||
    checkedURL.includes("uploads/2008") ||
    checkedURL.includes("uploads/2009") ||
    checkedURL.includes("uploads/2010") ||
    checkedURL.includes("uploads/2011") ||
    checkedURL.includes("uploads/2012") ||
    checkedURL.includes("uploads/2013") ||
    checkedURL.includes("uploads/2014") ||
    checkedURL.includes("uploads/2015") ||
    checkedURL.includes("uploads/2016") ||
    checkedURL.includes("uploads/2017") ||
    checkedURL.includes("uploads/2018")
  ) {
    console.log("invalid Image URL", checkedURL);
    return "http://epgrlawyers.local/wp-content/uploads/2022/05/EPG_logo_tagline-1.png";
  }
  if (checkedURL.includes("http://staging.enensteinlaw.com")) {
    newURL = checkedURL.replace(
      "http://staging.enensteinlaw.com",
      "http://epgrlawyers.local"
    );
  }
  if (checkedURL.includes("http://enensteinlaw.com/news")) {
    newURL = checkedURL.replace(
      "http://enensteinlaw.com",
      "http://epgrlawyers.local"
    );
  }


  return newURL;
};

const getLinkURL = (url) => {
  let newURL = url;
  let checkedURL = checkProtocol(url);
  if (checkedURL.includes("http://staging.enensteinlaw.com")) {
    newURL = checkedURL.replace("http://staging.enensteinlaw.com", "");
  }
  if (checkedURL.includes("http://enensteinlaw.com/news")) {
    newURL = checkedURL.replace("http://enensteinlaw.com", "/articles");
  }
  if (
    checkedURL.includes("uploads/2000") ||
    checkedURL.includes("uploads/2001") ||
    checkedURL.includes("uploads/2002") ||
    checkedURL.includes("uploads/2003") ||
    checkedURL.includes("uploads/2004") ||
    checkedURL.includes("uploads/2005") ||
    checkedURL.includes("uploads/2006") ||
    checkedURL.includes("uploads/2007") ||
    checkedURL.includes("uploads/2008") ||
    checkedURL.includes("uploads/2009") ||
    checkedURL.includes("uploads/2010") ||
    checkedURL.includes("uploads/2011") ||
    checkedURL.includes("uploads/2012") ||
    checkedURL.includes("uploads/2013") ||
    checkedURL.includes("uploads/2014") ||
    checkedURL.includes("uploads/2015") ||
    checkedURL.includes("uploads/2016") ||
    checkedURL.includes("uploads/2017") ||
    checkedURL.includes("uploads/2018")
  ) {
    console.log("invalid Link URL", checkedURL);
    return "#";
  }
  //http://enensteinlaw.com/wp-content
  // console.log("getLinkURL", newURL, checkedURL);
  return newURL;
};

export const blockRules = [
  // Custom rule for handling images
  {
    deserialize(el, next, block) {
      if (el.tagName && el.tagName === "IMG") {
        return block({
          _type: "image",
          _sanityAsset: `image@${getImageURL(el.src)}`,
          alt: el.alt || el.src.substring(el.src.lastIndexOf("/") + 1),
        });
      }

      // if (el.tagName && el.tagName === "A") {
      //   return block({
      //     _type: "link",
      //     href: `${getLinkURL(el.href)}`,
      //   });
      // }
      return undefined;
    },
  },
];

export async function fetchGraphql(query, options = {}) {
  const headers = { "Content-Type": "application/json" };
  const res = await fetch("http://epgrlawyers.local/graphql", {
    method: "POST",
    headers,
    body: JSON.stringify({ query, options }),
  });

  const json = await res.json();
  // error handling work
  if (json.errors) {
    json.errors.forEach((error) => console.log(error));
    console.log("error details", query, options);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}

export async function getBlockContentType(fieldName) {
  const defaultSchema = Schema.compile({
    name: "myBlog",
    types,
  });

  return await defaultSchema
    .get("practice")
    .fields.find((field) => field.name === fieldName).type;
}
