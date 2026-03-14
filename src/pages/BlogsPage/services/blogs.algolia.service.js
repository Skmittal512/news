import { blogsIndex } from "../../../lib/AlgoliaConfig";

export const getBlogsFromAlgolia = async ({
  page = 0,
  hitsPerPage = 18,
  category = "All",
} = {}) => {

  const filters =
    category !== "All"
      ? `newsArticleCategory:"${category}"`
      : "";

  const res = await blogsIndex.search("", {
    page,
    hitsPerPage,
    filters,
  });

  return {
    blogs: res.hits.map((hit) => ({
      id: hit.objectID,
      ...hit,
    })),
    totalPages: res.nbPages,
  };
};

export const getCategoriesFromAlgolia = async () => {
  const res = await blogsIndex.search("", {
    hitsPerPage: 1000,
  });

  const categories = new Set();

  res.hits.forEach((hit) => {
    if (hit.newsArticleCategory) {
      categories.add(hit.newsArticleCategory);
    }
  });

  return Array.from(categories);
};