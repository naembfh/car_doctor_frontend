;
import CdForm from '../components/form/CdForm';
import CdInput from '../components/form/CdInput';
import img from '../assets/images/car_doctor (2).png';
import { Link, useNavigate } from 'react-router-dom';
import { useSignUpMutation } from '../redux/api/authApi';
import { toast } from 'sonner';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [signUp, { isLoading }] = useSignUpMutation();

  const handleSubmit = async (data:any) => {
    console.log('Registration Data:', data);
    const { name, email, password } = data;

    try {
      await signUp({ name, email, password }).unwrap(); 
      toast.success("Registration successful");
      navigate("/login"); // Redirect to login page after successful registration
    } catch (error) {
      console.log(error)
      console.error("Registration failed:", error);
      toast.error("Registration failed, please try again.");
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
            <h1 className="text-3xl font-bold mb-4">Register</h1>
            
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

            <button 
              type="submit"  
              name="register-submit" 
              className="border-2 border-gray-50 text-gray-50 font-bold bg-gray-900 rounded-md py-3 px-4 w-full flex items-center justify-center transition duration-500 ease-in-out transform hover:bg-gray-100 hover:text-gray-900 hover:border-gray-50"
              disabled={isLoading}
            >
              Register
              <i className="fi fi-rr-clipboard-list mt-1 ml-2"></i>
            </button>

            <h1 className='text-gray-500 mt-4'>
              Already have an account?  
              <Link to="/login" className='text-gray-900 font-semibold'> 
                <span>Log in</span> 
              </Link>
            </h1>
          </CdForm>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
