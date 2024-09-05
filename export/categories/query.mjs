export const query = `
query GetCategories {
  categories(first: 10000000) {
    nodes {
      databaseId
      name
    }
  }
}`;
