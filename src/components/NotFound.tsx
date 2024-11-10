import { Link } from 'react-router-dom';

const NotFound = () => (
    <div className="p-8 text-center  bg-gray-900  text-gray-500 min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="mt-4">Sorry, the page you're looking for does not exist.</p>
        <div className="mt-6 flex justify-center gap-4">
            <Link to="/" className="text-blue-500 hover:underline">Go back to Home</Link>
            <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
            <Link to="/about" className="text-blue-500 hover:underline">About Us</Link>
        </div>
    </div>
);

export default NotFound;
