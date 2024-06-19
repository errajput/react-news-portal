import { getData } from "./http.service.js";

/**
 * // TODO: Check to fix document comment
 * @returns {{articles: {author: string, content: string, description: string, publishedAt: string, source: string, title: string, url: string, urlToImage: string}[]}}
 */
export const getArticles = () => {
    const options = {
        headers: new Headers({
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        }),
    };

    return getData(
        "/api/v2/everything?q=Apple&from=2024-06-17&sortBy=popularity",
        options
    );
};

export const getArticlesLocal = async () => {
    return getData(`./src/data.json`);
};
