import { getData } from "./http.service.js";

export const Categories = [
    "Business",
    "Entertainment",
    "Political",
    "Sports",
    "Technology",
];

const options = {
    headers: new Headers({
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    }),
};

/**
 * // TODO: Check to fix document comment
 * @returns {{articles: {author: string, content: string, description: string, publishedAt: string, source: string, title: string, url: string, urlToImage: string}[]}}
 */
export const getArticles = (category) => {
    return getData(
        `/api/v2/everything?q=${category}&from=2024-06-17&sortBy=popularity`,
        options
    );
};

export const getTopHeadlines = (country = "in", page = 1, pageSize = 10) => {
    return getData(
        `/api/v2/top-headlines?country=${country}&pageSize=${pageSize}&page=${page}`,
        options
    );
};

export const getArticlesLocal = async () => {
    return getData(`./src/data.json`);
};
