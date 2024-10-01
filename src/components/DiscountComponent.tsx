import img1 from '../assets/images/car_doctor (1).png';
import { Link } from 'react-router-dom';

const DiscountComponent = () => {
    return (
      <div className='w-full bg-gray-900 text-gray-100 p-8'>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center rounded-lg shadow-lg">
            {/* Left Side Image */}
            <div className="md:w-1/2 flex justify-center mb-5 md:mb-0">
                <img 
                    src={img1} 
                    alt="Car Cleaning Services" 
                    className="w-full h-auto rounded-lg shadow-lg"
                />
            </div>

            {/* Right Side Content */}
            <div className="md:w-1/2 p-5">
                <h2 className="text-3xl font-bold mb-4 text-center md:text-left">
                    Thinking About What to Get?
                </h2>
                <ul className="list-disc list-inside mb-4 text-lg text-left md:pl-5 space-y-2">
                    <li className="text-gray-300">Seats Washing</li>
                    <li className="text-gray-300">Vacuum Cleaning</li>
                    <li className="text-gray-300">Interior Wet Cleaning</li>
                    <li className="text-gray-300">Window Wiping</li>
                </ul>
                <div className="flex justify-center md:justify-end mt-4">
                    <Link 
                        to="/services" 
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                    >
                        Explore More
                    </Link>
                </div>
            </div>
        </div>
      </div>
    );
};

export default DiscountComponent;

