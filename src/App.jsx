import { useEffect, useState } from "react";

import { getArticles } from "./services/article.service.js";

// TODO: Move to Components Folder
const ArticleComponent = ({ article }) => (
    <div>
        <h2>{article.title}</h2>
        <p>{article.content}</p>
        <img src={article.urlToImage} alt="No Image Available" />
        <hr />
    </div>
);

const App = () => {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const _getArticles = async () => {
        setIsLoading(true);
        const response = await getArticles();
        if (response?.articles) {
            setArticles(response.articles);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        _getArticles();
    }, []);

    return (
        <div className="container">
            <h1>Today Top Headlines</h1>
            {isLoading ? (
                <p>Getting Headlines</p>
            ) : (
                articles.map((v, i) => <ArticleComponent key={i} article={v} />)
            )}
        </div>
    );
};

export default App;
