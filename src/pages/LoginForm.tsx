
import { Link, useNavigate, useLocation } from 'react-router-dom';
import CdForm from '../components/form/CdForm';
import CdInput from '../components/form/CdInput';
import img from '../assets/images/car_doctor (2).png';
import { useLoginMutation } from '../redux/api/authApi';
import { toast } from 'sonner';

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [login, { isLoading }] = useLoginMutation();

  // Extract the 'redirect' query parameter from the URL
  const queryParams = new URLSearchParams(location.search);
  const redirectTo = queryParams.get('redirect') || '/'; 

  const handleSubmit = async (data: any) => {
    const { email, password } = data;
    try {
      await login({ email, password }).unwrap();
      toast.success('Logged in successfully');
      navigate(redirectTo); 
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed, please check your credentials.');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 h-screen overflow-hidden bg-gray-900 text-gray-100">
      {/* Left side: Image */}
      <div className="hidden lg:block col-span-1 h-screen">
        <img src={img} alt="Car Doctor" className="w-full h-full object-cover opacity-80" />
      </div>

      {/* Right side: Form */}
      <div className="col-span-2 flex items-center justify-center h-full lg:h-screen p-5 lg:p-0">
        <div className="w-full max-w-md mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
          <CdForm onSubmit={handleSubmit}>
            <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
            <CdInput 
              type="email"
              label="Email"
              name="email"
              placeHolder="Enter Your Email"
              validation={{ required: 'Email is required' }}
           
            />
            <CdInput 
              type="password"
              label="Password"
              name="password"
              placeHolder="Enter Your Password"
              validation={{ required: 'Password is required' }}
            
            />
            <button 
              type="submit"  
              className="bg-blue-600 text-white font-semibold rounded-md py-3 px-4 w-full flex items-center justify-center transition duration-300 ease-in-out transform hover:bg-blue-500 mt-4"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
              <i className="fi fi-rr-sign-in-alt mt-1 ml-2"></i>
            </button>
            <p className="text-gray-400 mt-6 text-center">
              Don't have an account?  
              <Link to="/register" className="text-blue-400 font-semibold hover:underline">
                <span> Register</span>
              </Link>
            </p>
          </CdForm>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
