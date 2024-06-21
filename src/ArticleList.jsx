import { useEffect, useState } from "react";

import {
    Categories,
    getArticles,
    getArticlesLocal,
    getTopHeadlines,
} from "./services/article.service.js";

import NoImagePlaceholder from "./assets/No-Image-Placeholder.png";

// TODO: Move to Components Folder
const ArticleComponent = ({ article }) => (
    <div className="article-card">
        <h2>{article.title}</h2>
        <img
            src={article.urlToImage || NoImagePlaceholder}
            alt="No Image Available"
        />
        <p>{article.content}</p>
        <hr />
    </div>
);

const ArticleList = () => {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [category, setCategory] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 3;

    const _getArticles = async (_category, _page) => {
        setIsLoading(true);
        const response = _category
            ? await getArticles(_category)
            : await getTopHeadlines("in", _page, pageSize);
        if (response?.articles) {
            setArticles(response.articles);
            setIsLoading(false);
        }
        setTotalPages(Math.ceil((response.totalResults || 0) / pageSize));
    };

    const handleCategoryChange = (e) => {
        const _category = e.target.value;
        setCategory(_category);
        _getArticles(_category);
    };

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
        _getArticles(category, pageNumber);
    };

    useEffect(() => {
        _getArticles(category, page);
    }, []);

    return (
        <div className="articles-container">
            <h1>Today Top Headlines</h1>
            <select onChange={handleCategoryChange} value={category}>
                <option value=""></option>
                {Categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
            {isLoading ? (
                <p>Getting Headlines</p>
            ) : (
                articles.map((v, i) => <ArticleComponent key={i} article={v} />)
            )}
            <div className="pagination-container">
                {[...Array(totalPages).keys()].map((v, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        style={{
                            fontWeight: page === index + 1 ? "bold" : "initial",
                        }}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ArticleList;
