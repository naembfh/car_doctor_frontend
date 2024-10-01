import { Link, useNavigate } from 'react-router-dom';
import CdForm from '../components/form/CdForm';
import CdInput from '../components/form/CdInput';
import img from '../assets/images/car_doctor (2).png';
import { useSignUpMutation, useLoginMutation } from '../redux/api/authApi'; 
import { toast } from 'sonner';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [signUp, { isLoading: isSigningUp }] = useSignUpMutation();
  const [login, { isLoading: isLoggingIn }] = useLoginMutation(); 

  const handleSubmit = async (data: any) => {
    const { name, email, password, address } = data;

    try {
      // First, sign up the user
      await signUp({ name, email, password, address }).unwrap();
      toast.success('Registration successful. Logging you in...');

      // Immediately log the user in
      await login({ email, password }).unwrap();
      toast.success('Logged in successfully');
      navigate('/'); 
    } catch (error) {
      console.error('Registration or Login failed:', error);
      toast.error('Registration or login failed, please try again.');
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
            <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>

            <CdInput
              type="text"
              label="Name"
              name="name"
              placeHolder="Enter Your Name"
              validation={{ required: 'Name is required' }}
            />
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
            <CdInput
              type="text"
              label="Address"
              name="address"
              placeHolder="Enter Your Address"
              validation={{ required: 'Address is required' }}
            />

            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold rounded-md py-3 px-4 w-full flex items-center justify-center transition duration-300 ease-in-out transform hover:bg-blue-500 mt-4"
              disabled={isSigningUp || isLoggingIn} // Disable during signup or login
            >
              {isSigningUp || isLoggingIn ? 'Processing...' : 'Register'}
              <i className="fi fi-rr-clipboard-list mt-1 ml-2"></i>
            </button>

            <h1 className="text-gray-400 mt-6 text-center">
              Already have an account?
              <Link to="/login" className="text-blue-400 font-semibold hover:underline">
                <span> Log in</span>
              </Link>
            </h1>
          </CdForm>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
