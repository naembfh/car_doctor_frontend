import { useState, useEffect } from 'react'; 
import img1 from '../assets/images/car_doctor (1).png';
import img2 from '../assets/images/car_doctor (2).png';
import img3 from '../assets/images/car_doctor (3).png';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const images = [img1, img2, img3];
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
        }, 2000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className='relative bg-gray-100 py-10'>
            <img className='h-96 w-[1050px] mx-auto' src={images[currentIndex]} alt="Car Doctor" />

            <div className='absolute inset-0 flex items-center justify-center'>
                <button
                    onClick={() => navigate('/services')}
                    className="text-4xl font-bold text-white bg-gray-900 bg-opacity-50 py-2 px-4 rounded-md hover:bg-opacity-70 transition duration-300"
                >
                    Check Services
                </button>
            </div>

            <i
                onClick={handlePrev}
                className="fi fi-ss-rewind text-5xl absolute bottom-5 left-10 text-gray-700 cursor-pointer hover:text-gray-900 transition-colors duration-300"
            ></i>

            <i
                onClick={handleNext}
                className="fi fi-ss-forward text-5xl absolute bottom-5 right-10 text-gray-700 cursor-pointer hover:text-gray-900 transition-colors duration-300"
            ></i>
        </div>
    );
};

export default HeroSection;
