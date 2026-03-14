import algoliasearch from "algoliasearch/lite";

export const algoliaClient = algoliasearch(
  "CKG3WW2G9W", // Application ID
  "6cbd95af850435c40e3b0c347f573641" // Search API Key (client)
);

export const blogsIndex = algoliaClient.initIndex(
  "newsArticles"
);

 

// Application ID: CKG3WW2G9W 

// Search API Key : 6cbd95af850435c40e3b0c347f573641 (client API key for search) 

// Write API Key : 678ec390215aaef9743a1b25e7e3c8b8 (for creating firebase algolia extension)


//englishBlogs

// blogCategory
// blogContent
// blogDescription
// blogImageLink
// blogRelatedCategories
// blogTitle
// createdAt


// newsArticles - c name


// effectiveHeadline
// headlineDate
// newsArticleCategory
// newsContent
// profilePictureLink
// sourceOfInformation


