import React from 'react';
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
  const redirectTo = queryParams.get('redirect') || '/'; // Default to '/' if no redirect param
  console.log('Redirect URL:', redirectTo);

  const handleSubmit = async (data: any) => {
    console.log('Form Data:', data);
    const { email, password } = data;
    try {
      await login({ email, password }).unwrap();
      toast.success("Logged in successfully");
      navigate(redirectTo); // Redirect to the previous page or default home page
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed, please check your credentials.");
    }
  };

  return (
    <div className="grid grid-cols-3 h-screen overflow-hidden">
      {/* Left side: Image */}
      <div className="col-span-1 h-screen">
        <img src={img} alt="Car Doctor" className="w-full h-full object-cover" />
      </div>

      {/* Right side: Form */}
      <div className="col-span-2 flex items-center justify-center h-screen">
        <div className="w-2/3 mx-auto">
          <CdForm onSubmit={handleSubmit}>
            <h1 className="text-3xl font-bold mb-4">Login</h1>
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
              className="border-2 border-gray-50 text-gray-50 font-bold bg-gray-900 rounded-md py-3 px-4 w-full flex items-center justify-center transition duration-500 ease-in-out transform hover:bg-gray-100 hover:text-gray-900 hover:border-gray-50"
              disabled={isLoading}
            >
              Login
              <i className="fi fi-rr-sign-in-alt mt-1 ml-2"></i>
            </button>
            <p className="text-gray-500 mt-4">
              Don't have an account?  
              <Link to="/register" className="text-gray-900 font-semibold">
                <span>Register</span>
              </Link>
            </p>
          </CdForm>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
