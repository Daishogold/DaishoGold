import { useContext, useState } from 'react';
import loginIcons from '../assets/signin.gif';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(SummaryApi.signIn.url, {
            method: SummaryApi.signIn.method,
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const dataApi = await response.json();

        if (dataApi.success) {
            toast.success(dataApi.message);
            // Fetch user details and cart after successful login
            fetchUserDetails();
            fetchUserAddToCart();
            navigate('/');
        } else {
            toast.error(dataApi.message);
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        const idToken = credentialResponse.credential;
        const response = await fetch(SummaryApi.googleSignIn.url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ idToken }),
            credentials: 'include' // Ensure cookies are sent
        });

        const dataApi = await response.json();

        if (dataApi.success) {
            toast.success(dataApi.message);
            // Fetch user details and cart after successful Google login
            fetchUserDetails();
            fetchUserAddToCart();
            navigate('/');
        } else {
            toast.error(dataApi.message);
        }
    };

    return (
        <section id='login'>
            <div className='mx-auto container p-4 bg-white mt-6 mb-6 bg-cover bg-center'>
                <div className='bg-gray-100 p-5 w-full max-w-sm mx-auto'>
                    <div className='w-20 h-20 mx-auto'>
                        <img src={loginIcons} alt='login icons' />
                    </div>

                    <form className='pt-6 flex flex-col gap-4 items-center' onSubmit={handleSubmit}>
                        <div className='grid w-full'>
                            <label>Email : </label>
                            <div className='bg-white p-2'>
                                <input
                                    type='email'
                                    placeholder='Enter Email'
                                    name='email'
                                    value={data.email}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent' />
                            </div>
                        </div>

                        <div className='w-full'>
                            <label>Password : </label>
                            <div className='bg-white p-2 flex'>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder='Enter Password'
                                    value={data.password}
                                    name='password'
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent' />
                                <div className='cursor-pointer text-xl' onClick={() => setShowPassword(prev => !prev)}>
                                    <span>
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                            </div>
                            <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-600'>
                                Forgot password ?
                            </Link>
                        </div>

                        <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-4'>Login</button>

                        <div className="text-center mt-2">
                            <span className="block text-gray-600 mb-2">or</span>
                            <GoogleLogin
                                onSuccess={handleGoogleSuccess}
                                onError={() => {
                                    toast.error('Login Failed');
                                }}
                                className='mt-2'
                            />
                        </div>
                    </form>


                    <p className='my-5'>Don&apos;t have account ? <Link to={"/sign-up"} className=' text-red-600 hover:text-red-700 hover:underline'>Sign up</Link></p>
                </div>
            </div>
        </section>
    );
};

export default Login;
