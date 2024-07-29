import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { toast } from 'react-toastify';
import SummaryApi from '../common';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(SummaryApi.forgotPasword.url, {
                method: SummaryApi.forgotPasword.method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await response.json();
            if (data.success) {
                toast.success(data.message);
                setEmail('');
                navigate(`/reset-password/${data.data.token}`); // Redirect to reset password page with token
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div className='container mx-auto p-4'>
            <div className='bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto'>
                <h2 className='text-2xl font-bold mb-4 text-center'>Forgot Password</h2>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <label className='block'>
                        <span className='text-gray-700'>Email:</span>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        />
                    </label>
                    <button
                        type="submit"
                        className='w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500'
                    >
                        Verify Email
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
