import { createBrowserRouter, useParams } from "react-router-dom";

import Layout from "./Layout.jsx";

function Child() {
    const { id } = useParams();

    return (
        <div>
            <h3>ID: {id}</h3>
        </div>
    );
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
    },
]);

export default router;
