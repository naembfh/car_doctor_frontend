import { useState, useEffect } from 'react';
import img3 from '../assets/images/car_doctor (3).png';
import img4 from '../assets/images/pexels-pixabay-372810.jpg';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const images = [img3,img4];
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="relative md:py-10 bg-gray-900 text-gray-100">
            <img
                className="h-60 md:h-96 px-10 py-5 md:p-0 w-full max-w-[1050px] mx-auto rounded-lg object-cover shadow-lg transition-all duration-500 ease-in-out"
                src={images[currentIndex]}
                alt="Car Doctor"
            />

            <div className="absolute inset-0 flex items-end justify-center mb-24 md:mb-20">
                <button
                    onClick={() => navigate('/services')}
                    className="text-xl md:text-4xl font-bold text-gray-900 bg-white py-2 px-4 rounded-xl md:rounded-md hover:bg-opacity-80 transition duration-300"
                >
                    Check Services
                </button>
            </div>

            {/* Left Arrow */}
            <i
                onClick={handlePrev}
                className="fi fi-ss-rewind text-3xl md:text-5xl absolute bottom-5 left-10 text-gray-300 hover:text-gray-500 cursor-pointer transition-colors duration-300"
            ></i>

            {/* Right Arrow */}
            <i
                onClick={handleNext}
                className="fi fi-ss-forward text-3xl md:text-5xl absolute bottom-5 right-10 text-gray-300 hover:text-gray-500 cursor-pointer transition-colors duration-300"
            ></i>
        </div>
    );
};

export default HeroSection;
