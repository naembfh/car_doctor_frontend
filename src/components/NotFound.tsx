// NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
    <div className="p-8 text-center">
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="mt-4">Sorry, the page you're looking for does not exist.</p>
        <Link to="/" className="mt-4 text-blue-500 hover:underline">Go back to Home</Link>
    </div>
);

export default NotFound;
