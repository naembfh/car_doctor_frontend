
import { useParams, useNavigate } from 'react-router-dom';
import img from '../assets/images/car_doctor (3).png'; 
import { useGetServiceByIdQuery } from '../redux/api/ProductsApi';

const ServiceDetail = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();

    // Fetch service details using the API hook
    const { data, error, isLoading } = useGetServiceByIdQuery(id as string);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // Destructure the actual service data
    const service = data?.data;

    return (
        <div className="relative p-8 flex bg-white rounded-md">
            <div className='w-1/3'>
                <img 
                    src={service?.image || img} 
                    alt={service?.name} 
                    className="w-96 h-96 object-cover rounded-lg" 
                />
            </div>
            <div className='w-2/3 ml-16 mr-28'>
                <h1 className="text-2xl font-bold">{service?.name}</h1>
                <p>{service?.description}</p>
                <h1 className="text-xl font-bold">$ {service?.price}</h1>
                <button 
                    type="submit"  
                    className="border-2 border-gray-50 text-gray-50 font-bold bg-gray-900 rounded-md py-3 px-4 w-full flex items-center justify-center transition duration-500 ease-in-out transform hover:bg-gray-100 hover:text-gray-900 hover:border-gray-50"
                >
                    Add to cart
                    <i className="fi fi-rr-shopping-cart mt-1 ml-2"></i>
                </button>
            </div>
            <button 
                onClick={() => navigate(-1)} 
                className='absolute top-4 right-4 text-gray-500 hover:text-gray-900'
            >
                <i className="fi fi-rr-rectangle-xmark text-2xl"></i>
                <span className="sr-only">Close</span>
            </button>
        </div>
    );
};

export default ServiceDetail;
