import { useState } from 'react';
import loginIcons from '../assets/signin.gif';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
        confirmPassword: "",
        profilePic: "",
    });
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUploadPic = async (e) => {
        const file = e.target.files[0];

        const imagePic = await imageTobase64(file);

        setData((prev) => ({
            ...prev,
            profilePic: imagePic
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (data.password !== data.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (!validatePassword(data.password)) {
            setPasswordError("Password must be at least 8 characters long, including one uppercase letter, one lowercase letter, one number, and one special character");
            return;
        } else {
            setPasswordError("");
        }

        const dataResponse = await fetch(SummaryApi.signUp.url, {
            method: SummaryApi.signUp.method,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const dataApi = await dataResponse.json();

        if (dataApi.success) {
            toast.success(dataApi.message);
            navigate("/login");
        } else {
            toast.error(dataApi.message);
        }
    };

    return (
        <div className='bg-white min-h-screen flex flex-col justify-center'>
            <div className='p-4 md:w-1/3 w-full bg-slate-100 m-auto flex items-center flex-col rounded-lg'>
                <div className='w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md relative'>
                    <img src={data.profilePic ? data.profilePic : loginIcons} className='w-full h-full' />
                    <label htmlFor="profilePic">
                        <div className='absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-60 w-full text-center cursor-pointer'>
                            <p className='text-sm p-1 text-white'>Upload</p>
                        </div>
                        <input type="file" id='profilePic' accept="image/*" className='hidden' onChange={handleUploadPic} />
                    </label>
                </div>
                <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <input type="text" name='name' className='mt-1 mb-2 w-full bg-white px-2 py-1 rounded-lg focus-within:outline-blue-300 shadow' value={data.name} onChange={handleOnChange} required />

                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' className='mt-1 mb-2 w-full bg-white px-2 py-1 rounded-lg focus-within:outline-blue-300 shadow' value={data.email} onChange={handleOnChange} required />

                    <label htmlFor="password">Password</label>
                    <div className='flex px-2 py-1 mt-1 mb-2 rounded-lg bg-white focus-within:outline focus-within:outline-blue-300 shadow'>
                        <input type={showPassword ? "text" : "password"} name='password' className='w-full bg-white border-none outline-none' value={data.password} onChange={handleOnChange} required />
                        <span className='flex text-xl cursor-pointer' onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                    </div>
                    {passwordError && <p className='text-red-500 text-sm'>{passwordError}</p>}

                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className='flex px-2 py-1 mt-1 mb-2 rounded-lg bg-white focus-within:outline focus-within:outline-blue-300 shadow'>
                        <input type={showConfirmPassword ? "text" : "password"} name='confirmPassword' className='w-full bg-white border-none outline-none' value={data.confirmPassword} onChange={handleOnChange} required />
                        <span className='flex text-xl cursor-pointer' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</span>
                    </div>

                    <button type='submit' className='w-full max-w-[150px] m-auto bg-red-600 hover:bg-red-700 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4 drop-shadow-md'>Sign up</button>
                </form>
                <p className='text-left text-sm mt-2'>Already have an account? <Link to={"/login"} className='text-red-500 underline'>Login</Link></p>
            </div>
        </div>
    );
};

export default SignUp;
