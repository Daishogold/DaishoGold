import { useState } from 'react'
import loginIcons from '../assets/signin.gif'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import imageTobase64 from '../helpers/imageTobase64'
import SummaryApi from '../common'
import { toast } from 'react-toastify';

const SignUp = () => {

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
        confirmPassword: "",
        profilePic: "",
    })

    const navigate = useNavigate()

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleUploadPic = async (e) => {
        const file = e.target.files[0]

        const imagePic = await imageTobase64(file)

        setData((preve) => {
            return {
                ...preve,
                profilePic: imagePic
            }
        })

    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (data.password === data.confirmPassword) {
            const dataResponse = await fetch(SummaryApi.signUp.url, {
                method: SummaryApi.signUp.method,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })

            const dataApi = await dataResponse.json()

            if (dataApi.success) {
                toast.success(dataApi.message)
                navigate("/login")
            }

            if (dataApi.error) {
                toast.error(dataApi.message)
            }
        } else {
            toast.error("Please check password and confirm password")
        }
    }

    return (
        <section id="login">
            <div className="mx-auto container p-4">
                <div className="bg-white p-5 w-full max-w-sm mx-auto">
                    <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                        <div>
                            <img src={data.profilePic || loginIcons} alt='login icons' />
                        </div>
                        <form>
                            <label>
                                <div className='text-xs bg-opacity-50 bg-slate-100 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                                    Upload Photo
                                </div>
                                <input type="file" className='hidden' onChange={handleUploadPic} />
                            </label>

                        </form>
                    </div>

                    <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>

                        <div className='grid'>
                            <label>Name: </label>
                            <div className='bg-slate-200 p-2 rounded-lg'>
                                <input type="text"
                                    placeholder='Enter Your Name'
                                    name='name'
                                    value={data.name}
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent' />
                            </div>
                        </div>

                        <div className='grid'>
                            <label>Email: </label>
                            <div className='bg-slate-200 p-2 rounded-lg'>
                                <input type="email"
                                    placeholder='example@domain.com'
                                    name='email'
                                    value={data.email}
                                    required
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent' />
                            </div>
                        </div>

                        <div>
                            <label>Password: </label>
                            <div className='bg-slate-200 p-2 rounded-lg flex'>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder='Enter You Password'
                                    name='password'
                                    value={data.password}
                                    required
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent' />
                                <div className='cursor-pointer text-xl' onClick={() => setShowPassword((prev) => !prev)
                                }>
                                    <span>
                                        {
                                            showPassword ? (
                                                < FaEyeSlash />

                                            ) : (

                                                <FaEye />
                                            )
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label>Confirm Password: </label>
                            <div className='bg-slate-200 p-2 rounded-lg flex'>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder='Enter password again'
                                    name='confirmPassword'
                                    value={data.confirmPassword}
                                    required
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent' />
                                <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword((prev) => !prev)
                                }>
                                    <span>
                                        {
                                            showConfirmPassword ? (
                                                < FaEyeSlash />

                                            ) : (

                                                <FaEye />
                                            )
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 '>Sign Up</button>

                    </form>

                    <p className='my-4'>Already have an account? <Link to="/login" className='text-red-600 hover:text-red-700 hover:underline'>Login </Link> </p>

                </div>
            </div>
        </section>
    )
}
export default SignUp