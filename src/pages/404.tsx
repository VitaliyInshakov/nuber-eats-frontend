import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <Helmet>
                <title>Not Found | Nuber Eats</title>
            </Helmet>
            <h2 className="font-semibold text-2xl mb-3">Page Not Found</h2>
            <h4 className="font-medium text-base mb-5">The page you're looking for doesn't exist</h4>
            <Link to="/" className="text-lime-600 hover:underline">Go back home</Link>
        </div>
    );
};

export default NotFound;