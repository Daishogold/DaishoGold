import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons
import SummaryApi from '../common';

const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};

const ResetPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (!validatePassword(password)) {
            setPasswordError("Password must be at least 8 characters long, including one uppercase letter, one lowercase letter, one number, and one special character");
            return;
        } else {
            setPasswordError('');
        }

        try {
            const response = await fetch(`${SummaryApi.resetPassword.url}/${token}`, {
                method: SummaryApi.resetPassword.method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });

            const data = await response.json();
            if (data.success) {
                toast.success(data.message);
                setPassword('');
                setConfirmPassword('');
                navigate('/login');
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
                <h2 className='text-2xl font-bold mb-4 text-center'>Reset Password</h2>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <label className='block'>
                        <span className='text-gray-700'>New Password:</span>
                        <div className='relative'>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                            />
                            <span
                                className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </label>
                    {passwordError && <p className='text-red-500 text-sm'>{passwordError}</p>}
                    <label className='block'>
                        <span className='text-gray-700'>Confirm Password:</span>
                        <div className='relative'>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                            />
                            <span
                                className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </label>
                    <button
                        type="submit"
                        className='w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500'
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
