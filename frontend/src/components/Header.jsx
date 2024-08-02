import { useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { FaRegCircleUser } from 'react-icons/fa6';
import { GrSearch, GrMenu, GrDown } from 'react-icons/gr';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import Logo from '../assets/logo.png';
import SummaryApi from '../common';
import ROLE from '../common/role';
import { FaChevronDown } from 'react-icons/fa';
import Context from '../context';
import scrollToTop from '../helpers/scrollToTop'
import { fetchRates, setCurrency } from '../store/CurrencySlice';

const Header = () => {
    const user = useSelector(state => state.user.user);
    const selectedCurrency = useSelector(state => state.currency.selectedCurrency);
    const rates = useSelector(state => state.currency.rates);
    const dispatch = useDispatch();
    const [menuDisplay, setMenuDisplay] = useState(false);
    const [searchExpanded, setSearchExpanded] = useState(false);
    const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);
    const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
    const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchRates());
    }, [dispatch]);

    const toggleDropdown = () => {
        setCurrencyDropdownOpen(!currencyDropdownOpen);
    };

    const handleCurrencyChange = (currency) => {
        dispatch(setCurrency(currency));
        setCurrencyDropdownOpen(false);
    };

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

    const handleProductClick = () => {
        setProductsDropdownOpen(false);
    };

    const handleMenuClick = () => {
        setHamburgerMenuOpen(false);
        setProductsDropdownOpen(false);
        setCurrencyDropdownOpen(false);
    };

    const isAdminPanel = location.pathname.startsWith('/admin-panel');

    return (
        <header className="h-18 shadow-md bg-white fixed w-full z-40">
            <div className="h-full container mx-auto flex items-center px-4 justify-between">
                <div className="flex items-center justify-center">
                    <Link to="/" onClick={scrollToTop} className="flex flex-col items-center space-y-1">
                        <img src={Logo} alt="logo" className="mb-2 w-24 h-20 object-contain hover:scale-105 transition-transform duration-300 ease-in-out" />
                    </Link>
                </div>

                {!isAdminPanel && (
                    <>
                        {/* Logo, Search Bar, Cart Icon, and Hamburger Menu */}
                        <div className="flex items-center lg:hidden w-full justify-end">
                            <div className="flex items-center space-x-4 ml-auto">
                                <div className="flex-1">
                                    <div className="relative mx-auto -ml-4">
                                        <input
                                            type="text"
                                            placeholder="Search product here..."
                                            className="w-[190px] outline-none px-2 py-1 border rounded-full"
                                            onChange={handleSearch}
                                            value={search}
                                        />
                                    </div>
                                </div>
                                {user?._id && (
                                    <Link to={"/cart"} className='text-2xl relative' onClick={scrollToTop} >
                                        <span><FaShoppingCart /></span>
                                        <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                                            <p className='text-sm'>{context?.cartProductCount}</p>
                                        </div>
                                    </Link>
                                )}
                                <button
                                    className="text-2xl"
                                    onClick={() => setHamburgerMenuOpen(prev => !prev)}
                                >
                                    <GrMenu />
                                </button>
                            </div>

                            {hamburgerMenuOpen && (
                                <div className="absolute top-14 right-0 bg-white shadow-lg rounded p-4 z-50 w-full">
                                    <div className="flex flex-col items-center">
                                        <nav className="w-full flex flex-col items-center">
                                            <Link to="/" onClick={() => { handleMenuClick(); setHamburgerMenuOpen(false); }} className="block py-2 px-4 hover:bg-gray-100">Home</Link>
                                            <div className="relative">
                                                <button
                                                    className="flex items-center justify-between w-full py-2 px-4 hover:bg-gray-100 text-left"
                                                    onClick={() => setProductsDropdownOpen(prev => !prev)}
                                                >
                                                    Products
                                                    <GrDown className={`transition-transform duration-200 ${productsDropdownOpen ? 'rotate-180' : ''}`} />
                                                </button>
                                                {productsDropdownOpen && (
                                                    <div className="absolute left-1/2 transform -translate-x-1/2 top-full bg-white shadow-lg rounded mt-1 w-[230px] text-center">
                                                        {[
                                                            'Honda CD 70',
                                                            'Suzuki GD 110',
                                                            'Suzuki GS 150',
                                                            'Yamaha YBR',
                                                            'Honda CB 150',
                                                            'Honda H125',
                                                            'Honda Deluxe 125',
                                                            'Jialing JH 70',
                                                            'Honda CG 125',
                                                            'Harley Davidson X440',
                                                            'Royal Enfield Hunter 350'
                                                        ].map((brand) => (
                                                            <Link
                                                                to={`/products-by-brand?brandName=${encodeURIComponent(brand)}`}
                                                                onClick={() => { handleProductClick(); setHamburgerMenuOpen(false); }}
                                                                className="block py-2 px-4 hover:bg-gray-100"
                                                                key={brand}
                                                            >
                                                                {brand}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            {!productsDropdownOpen && (
                                                <>
                                                    <div className="relative">
                                                        <button
                                                            onClick={toggleDropdown}
                                                            className="py-2 px-4 w-full text-left flex items-center justify-between hover:bg-gray-100"
                                                        >
                                                            {selectedCurrency}
                                                            <FaChevronDown size={15} className={`ml-2 transition-transform duration-200 ${currencyDropdownOpen ? 'rotate-180' : ''}`} />
                                                        </button>
                                                        {currencyDropdownOpen && (
                                                            <div className="absolute right-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                                                                <ul className="py-1">
                                                                    {['PKR', 'USD', 'EUR', 'GBP'].map((currency) => (
                                                                        <li key={currency}>
                                                                            <button
                                                                                onClick={() => { handleCurrencyChange(currency); setHamburgerMenuOpen(false); }}
                                                                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                                                                            >
                                                                                {currency}
                                                                            </button>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        )}
                                                    </div>
                                                </>
                                            )}
                                        </nav>

                                        {user?._id ? (
                                            <>
                                                <div className="flex flex-col items-center space-y-2 mt-4">
                                                    <Link to={'/wallet'} className='whitespace-nowrap block hover:bg-slate-100 p-2' onClick={() => { setMenuDisplay(prev => !prev); setHamburgerMenuOpen(false); }}>Loyalty Wallet</Link>
                                                    <Link to="/order-details" className="whitespace-nowrap block hover:bg-slate-100 p-2" onClick={() => setHamburgerMenuOpen(false)}>
                                                        My Orders
                                                    </Link>
                                                </div>
                                                <button
                                                    onClick={() => { handleLogout(); handleMenuClick(); setHamburgerMenuOpen(false); }}
                                                    className="w-full mt-4 px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700 text-center"
                                                >
                                                    Logout
                                                </button>
                                            </>
                                        ) : (
                                            <Link
                                                to="/login"
                                                onClick={() => { handleMenuClick(); setHamburgerMenuOpen(false); }}
                                                className="w-full mt-4 px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700 text-center"
                                            >
                                                Login
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden lg:flex items-center space-x-4 mx-auto">
                            <Link to="/" onClick={scrollToTop} className="hover:text-red-600">Home</Link>
                            <div className="relative">
                                <button
                                    className="flex items-center justify-between hover:text-red-600"
                                    onClick={() => setProductsDropdownOpen(prev => !prev)}
                                >
                                    Products
                                    <GrDown className={`transition - transform duration-200 ml-2 ${productsDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {productsDropdownOpen && (
                                    <div className="absolute left-0 top-full bg-white shadow-lg rounded mt-1 w-[230px]">
                                        {[
                                            'Honda CD 70',
                                            'Suzuki GD 110',
                                            'Suzuki GS 150',
                                            'Yamaha YBR',
                                            'Honda CB 150',
                                            'Honda H125',
                                            'Honda Deluxe 125',
                                            'Jialing JH 70',
                                            'Honda CG 125',
                                            'Harley Davidson X440',
                                            'Royal Enfield Hunter 350'
                                        ].map((brand) => (
                                            <Link
                                                to={`/products-by-brand?brandName=${encodeURIComponent(brand)}`}
                                                onClick={handleProductClick}
                                                className="block py-2 px-4 hover:bg-gray-100"
                                                key={brand}
                                            >
                                                {brand}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <Link to="/about" onClick={scrollToTop} className="hover:text-red-600">About Us</Link>
                            <Link to="/contact" onClick={scrollToTop} className="hover:text-red-600">Contact Us</Link>
                        </div>

                        {/* Search Bar */}
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
                                                <>
                                                    <Link to={"/admin-panel/dashboard"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(prev => !prev)}>Admin Panel</Link>
                                                </>
                                            )}
                                            <Link to={'/wallet'} className='whitespace-nowrap block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(prev => !prev)}>Loyalty Wallet</Link>
                                            <Link to="/order-details" className="whitespace-nowrap block hover:bg-slate-100 p-2">
                                                My Orders
                                            </Link>

                                        </nav>
                                    </div>
                                )}
                            </div>

                            {user?._id && (
                                <Link to={"/cart"} className='text-2xl relative' onClick={scrollToTop} >
                                    <span><FaShoppingCart /></span>
                                    <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                                        <p className='text-sm'>{context?.cartProductCount}</p>
                                    </div>
                                </Link>
                            )}

                            {/* Currency Dropdown for Desktop */}
                            <div className="hidden lg:flex items-center space-x-2">
                                <div className="relative">
                                    <button
                                        className="py-2 px-4 hover:bg-gray-100 flex items-center space-x-1"
                                        onClick={toggleDropdown}
                                    >
                                        <span>{selectedCurrency}</span>
                                        <GrDown className={`transition - transform duration-200 ${currencyDropdownOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                    {currencyDropdownOpen && (
                                        <div className="absolute left-0 top-full bg-white shadow-lg rounded mt-1 w-48">
                                            <button onClick={() => handleCurrencyChange('PKR')} className="block py-2 px-4 hover:bg-gray-100 w-full text-left">PKR</button>
                                            <button onClick={() => handleCurrencyChange('USD')} className="block py-2 px-4 hover:bg-gray-100 w-full text-left">USD</button>
                                            <button onClick={() => handleCurrencyChange('EUR')} className="block py-2 px-4 hover:bg-gray-100 w-full text-left">EUR</button>
                                            <button onClick={() => handleCurrencyChange('GBP')} className="block py-2 px-4 hover:bg-gray-100 w-full text-left">GBP</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )}

                <div className="flex items-center space-x-4">
                    {isAdminPanel && (
                        <div className="relative">
                            <button
                                onClick={toggleDropdown}
                                className="py-2 px-4 w-full text-left flex items-center justify-between hover:bg-gray-100"
                            >
                                {selectedCurrency}
                                <FaChevronDown size={15} className={`ml-2 transition-transform duration-200 ${currencyDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {currencyDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                                    <ul className="py-1">
                                        <li>
                                            <button onClick={() => handleCurrencyChange('PKR')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left">
                                                PKR
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={() => handleCurrencyChange('USD')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left">
                                                USD
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={() => handleCurrencyChange('EUR')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left">
                                                EUR
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={() => handleCurrencyChange('GBP')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left">
                                                GBP
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                    {user?._id ? (
                        <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700 hidden sm:block'>
                            Logout
                        </button>
                    ) : (
                        !isAdminPanel && (
                            <Link to={"/login"} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700 hidden sm:block'>
                                Login
                            </Link>
                        )
                    )}
                </div>

            </div>
        </header>

    );
};

export default Header;