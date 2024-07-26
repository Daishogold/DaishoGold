import { useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { FaRegCircleUser } from 'react-icons/fa6';
import { GrSearch, GrMenu, GrDown } from 'react-icons/gr';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import { MdAttachMoney } from 'react-icons/md'; // Currency exchange icon
import Logo from '../assets/logo.png';
import SummaryApi from '../common';
import ROLE from '../common/role';
import Context from '../context';

const Header = () => {
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    const [menuDisplay, setMenuDisplay] = useState(false);
    const [searchExpanded, setSearchExpanded] = useState(false);
    const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);
    const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
    const context = useContext(Context);
    const navigate = useNavigate();
    const searchInput = useLocation();
    const location = useLocation();

    const searchQuery = useMemo(() => {
        const URLSearch = new URLSearchParams(searchInput.search);
        return URLSearch.get("q") || '';
    }, [searchInput]);

    const [search, setSearch] = useState(searchQuery);

    useEffect(() => {
        setSearch(searchQuery);
    }, [searchQuery]);

    const handleLogout = async () => {
        try {
            const fetchData = await fetch(SummaryApi.Logout_user.url, {
                method: SummaryApi.Logout_user.method,
                credentials: 'include',
            });

            const data = await fetchData.json();

            if (data.success) {
                toast.success(data.message);
                dispatch(setUserDetails(null));
                navigate('/');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Logout failed. Please try again.');
        }
    };

    const handleSearch = (e) => {
        const { value } = e.target;
        setSearch(value);

        if (value) {
            navigate(`/search?q=${value}`);
        } else {
            navigate('/search');
        }
    };

    const isAdminPanel = location.pathname.startsWith('/admin-panel');

    return (
        <header className="h-18 shadow-md bg-white fixed w-full z-40">
            <div className="h-full container mx-auto flex items-center px-4 justify-between">
                <div>
                    <Link to="/">
                        <img src={Logo} alt="logo" style={{ width: '90px', height: '70px' }} />
                    </Link>
                </div>

                {/* Hamburger Menu for Mobile */}
                <div className="lg:hidden flex items-center space-x-4">
                    <div className="flex-1">
                        <div className="relative mx-auto mr-10">
                            {!isAdminPanel && (
                                <input
                                    type="text"
                                    placeholder="Search product here..."
                                    className="w-full outline-none px-2 py-1 border rounded-full"
                                    onChange={handleSearch}
                                    value={search}
                                />
                            )}
                        </div>
                    </div>

                    <button
                        className="text-2xl"
                        onClick={() => setHamburgerMenuOpen(prev => !prev)}
                    >
                        <GrMenu />
                    </button>

                    {hamburgerMenuOpen && (
                        <div className="absolute top-14 right-0 bg-white shadow-lg rounded p-4 z-50 w-full">
                            <div className="flex flex-col items-center">
                                <nav className="w-full">
                                    <Link to="/" className="block py-2 px-4 hover:bg-gray-100">Home</Link>
                                    <div className="relative">
                                        <button
                                            className="flex items-center justify-between w-full py-2 px-4 hover:bg-gray-100 text-left"
                                            onClick={() => setProductsDropdownOpen(prev => !prev)}
                                        >
                                            Products
                                            <GrDown className={`transition-transform duration-200 ${productsDropdownOpen ? 'rotate-180' : ''}`} />
                                        </button>
                                        {productsDropdownOpen && (
                                            <div className="absolute left-0 top-full bg-white shadow-lg rounded mt-1 w-full">
                                                <Link to={`product-category?category=Bearings`} className="block py-2 px-4 hover:bg-gray-100">Honda CD 70</Link>
                                                <Link to={`product-category?category=Bearings`} className="block py-2 px-4 hover:bg-gray-100">Honda GD 110</Link>
                                                <Link to={`product-category?category=Bearings`} className="block py-2 px-4 hover:bg-gray-100">Suzuki GS 150</Link>
                                                <Link to={`product-category?category=Bearings`} className="block py-2 px-4 hover:bg-gray-100">Yamaha YBR</Link>
                                                <Link to={`product-category?category=Bearings`} className="block py-2 px-4 hover:bg-gray-100">Honda CB 150</Link>
                                                <Link to={`product-category?category=Bearings`} className="block py-2 px-4 hover:bg-gray-100">Honda H125</Link>
                                                <Link to={`product-category?category=Bearings`} className="block py-2 px-4 hover:bg-gray-100">Honda Deluxe 125</Link>
                                                <Link to={`product-category?category=Bearings`} className="block py-2 px-4 hover:bg-gray-100">Jialing JH 70</Link>
                                                <Link to={`product-category?category=Bearings`} className="block py-2 px-4 hover:bg-gray-100">Honda CG 125</Link>
                                            </div>
                                        )}
                                    </div>
                                    <Link to="/currency-exchange" className="block py-2 px-4 hover:bg-gray-100">Currency Exchange</Link>
                                    <Link to="/about" className="block py-2 px-4 hover:bg-gray-100">About</Link>
                                </nav>
                                {user?._id && !productsDropdownOpen && (
                                    <Link to="/cart" className="block py-2 px-4 hover:bg-gray-100 relative mt-4">
                                        <span className="flex items-center justify-center"><FaShoppingCart /></span>
                                        <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                                            <p className="text-sm">{context?.cartProductCount}</p>
                                        </div>
                                    </Link>
                                )}
                                {user?._id ? (
                                    <button onClick={handleLogout} className="w-full mt-4 px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700">Logout</button>
                                ) : (
                                    <Link to="/login" className="w-full mt-4 px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700">Login</Link>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center space-x-4 mx-auto">
                    <Link to="/" className="hover:text-red-600">Home</Link>
                    <div className="relative">
                        <button
                            className="flex items-center justify-between hover:text-red-600"
                            onClick={() => setProductsDropdownOpen(prev => !prev)}
                        >
                            Products
                            <GrDown className={`transition-transform duration-200 ${productsDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {productsDropdownOpen && (
                            <div className="w-[170px] absolute left-0 top-full bg-white shadow-lg rounded mt-1">
                                <Link to={`product-category?category=Bearings`} className="block py-2 px-4 hover:bg-gray-100">Honda CD 70</Link>
                                <Link to={`product-category?category=Bearings`} className="block py-2 px-4 hover:bg-gray-100">Honda GD 110</Link>
                                <Link to={`product-category?category=Bearings`} className="block py-2 px-4 hover:bg-gray-100">Suzuki GS 150</Link>
                                <Link to={`product-category?category=Bearings`} className="block py-2 px-4 hover:bg-gray-100">Yamaha YBR</Link>
                                <Link to={`product-category?category=Bearings`} className="block py-2 px-4 hover:bg-gray-100">Honda CB 150</Link>
                                <Link to={`product-category?category=Bearings`} className="block py-2 px-4 hover:bg-gray-100">Honda H125</Link>
                                <Link to={`product-category?category=Bearings`} className="block py-2 px-4 hover:bg-gray-100">Honda Deluxe 125</Link>
                                <Link to={`product-category?category=Bearings`} className="block py-2 px-4 hover:bg-gray-100">Jialing JH 70</Link>
                                <Link to={`product-category?category=Bearings`} className="block py-2 px-4 hover:bg-gray-100">Honda CG 125</Link>
                            </div>
                        )}
                    </div>
                    <Link to="/about" className="hover:text-red-600">About</Link>
                </div>

                {/* Search Bar */}
                {!isAdminPanel && (
                    <div className="hidden lg:flex items-center mx-auto">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search product here..."
                                className="w-80 outline-none px-2 py-1 border rounded-full"
                                onChange={handleSearch}
                                value={search}
                            />
                            <button
                                className="absolute inset-y-0 right-0 flex items-center pr-2"
                                onClick={() => setSearchExpanded(prev => !prev)}
                            >
                                <GrSearch />
                            </button>
                        </div>
                    </div>
                )}

                <div className="hidden lg:flex items-center gap-4 ml-4">
                    <div className='relative flex justify-center'>
                        {user?._id && (
                            <div className='text-3xl cursor-pointer relative flex justify-center' onClick={() => setMenuDisplay(prev => !prev)}>
                                {user?.profilePic ? (
                                    <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                                ) : (
                                    <FaRegCircleUser />
                                )}
                            </div>
                        )}

                        {menuDisplay && (
                            <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
                                <nav>
                                    {user?.role === ROLE.ADMIN && (
                                        <Link to={"/admin-panel/dashboard"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(prev => !prev)}>Admin Panel</Link>
                                    )}
                                    <Link to={'/order'} className='whitespace-nowrap block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(prev => !prev)}>Order</Link>
                                </nav>
                            </div>
                        )}
                    </div>

                    {user?._id && (
                        <Link to={"/cart"} className='text-2xl relative'>
                            <span><FaShoppingCart /></span>
                            <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                                <p className='text-sm'>{context?.cartProductCount}</p>
                            </div>
                        </Link>
                    )}

                    <Link to="/currency-exchange" className="text-3xl border border-gray-500 rounded-full"><MdAttachMoney /></Link>

                    <div>
                        {user?._id ? (
                            <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Logout</button>
                        ) : (
                            <Link to={"/login"} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Login</Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
