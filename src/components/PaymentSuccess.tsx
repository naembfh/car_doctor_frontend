import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConfirmCheckoutSessionMutation } from '../redux/api/bookingApi';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [confirmCheckoutSession] = useConfirmCheckoutSessionMutation(); 

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get('session_id');

    if (!sessionId) {
      navigate('/dashboard', { state: { showPaidBookings: true } });
      return;
    }

    // Call the API to confirm the payment
    const confirmPayment = async () => {
      try {
        await confirmCheckoutSession({ sessionId }).unwrap();
        console.log('Payment confirmation successful');
      } catch (err) {
        console.error('Payment confirmation failed:', err);
      } finally {
        // Regardless of success or failure, navigate to the dashboard
        navigate('/dashboard/past-bookings', { state: { showPaidBookings: true } });
      }
    };

    confirmPayment();
  }, [navigate, confirmCheckoutSession]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Processing Payment...</h1>
        <p className="text-gray-700 mb-6">Please wait while we confirm your payment.</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;

