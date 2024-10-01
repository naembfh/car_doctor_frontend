import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { toast } from 'sonner';

const Footer = () => {
    const [email, setEmail] = useState('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleRegister = () => {
        // Add registration logic here
        console.log('Registered with:', email);
        toast("We will get back to you soon!")
    };

    return (
        <footer className="bg-gray-900 text-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Top Section */}
                <div className="flex flex-col md:flex-row items-center justify-between border-b border-gray-700 pb-6 mb-6">
                    <div className="text-3xl font-bold mb-4 md:mb-0 text-center md:text-left">
                        Car Doctor
                    </div>
                    <div className="text-center md:text-left">
                        <h2 className="text-lg font-semibold mb-2">New to Car Doctor?</h2>
                        <p className="mb-3">Subscribe to our newsletter:</p>
                        <div className="flex items-center">
                            <input
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                placeholder="Your Email"
                                className="p-2 rounded-l-md border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={handleRegister}
                                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-r-md transition duration-300"
                            >
                                Register
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
                    <div>
                        <h3 className="font-semibold mb-2">Help</h3>
                        <ul>
                            <li><Link to="/faq" className="text-gray-400 hover:text-gray-200 transition">FAQ</Link></li>
                            <li><Link to="/support" className="text-gray-400 hover:text-gray-200 transition">Support</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">About</h3>
                        <ul>
                            <li><Link to="/about" className="text-gray-400 hover:text-gray-200 transition">Our Story</Link></li>
                            <li><Link to="/team" className="text-gray-400 hover:text-gray-200 transition">Our Team</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">Contact Us</h3>
                        <ul>
                            <li><Link to="/contact" className="text-gray-400 hover:text-gray-200 transition">Get in Touch</Link></li>
                            <li><Link to="/locations" className="text-gray-400 hover:text-gray-200 transition">Our Locations</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Social Icons */}
                <div className="mt-8 flex justify-center md:justify-between items-center text-center">
                    <div className="flex space-x-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition">
                            <FaFacebook size={24} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition">
                            <FaTwitter size={24} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition">
                            <FaInstagram size={24} />
                        </a>
                    </div>
                    <p className="mt-4 md:mt-0 text-sm text-gray-500">© 2024 Car Doctor. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
