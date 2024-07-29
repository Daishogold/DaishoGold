import { useContext, useEffect, useState } from 'react';
import fetchProductsByBrand from '../helpers/fetchBrandWiseProducts';
import displayCurrency from '../helpers/displayCurrency';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Context from '../context';
import addToCart from '../helpers/addToCart';
import scrollToTop from '../helpers/scrollToTop';
import CategoryFilter from './CategoryFilter'; // Import CategoryFilter

const ProductsByBrand = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const selectedCategory = useSelector(state => state.category.selectedCategory);
    const loadingList = new Array(13).fill(null);
    const selectedCurrency = useSelector(state => state.currency.selectedCurrency);
    const rates = useSelector(state => state.currency.rates);
    const defaultCurrency = 'PKR';

    const convertPrice = (price, fromCurrency, toCurrency) => {
        if (!rates || !rates[fromCurrency] || !rates[toCurrency]) {
            return price;
        }
        const basePriceInPKR = price / rates[fromCurrency];
        return (basePriceInPKR * rates[toCurrency]).toFixed(2);
    };

    const displayPrice = (price) => displayCurrency(convertPrice(price, defaultCurrency, selectedCurrency), selectedCurrency);

    const { fetchUserAddToCart } = useContext(Context);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const brandName = queryParams.get("brandName");

    const fetchData = async () => {
        setLoading(true);
        try {
            const brandProducts = await fetchProductsByBrand(brandName);
            setLoading(false);

            if (brandProducts.success) {
                setData(brandProducts.data);
                setFilteredData(brandProducts.data);
            } else {
                console.error(brandProducts.message);
            }
        } catch (error) {
            console.error('Error fetching products by brand:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [brandName]);

    useEffect(() => {
        // Apply category filter based on the selected category
        if (selectedCategory === "all") {
            setFilteredData(data);
        } else {
            setFilteredData(data.filter(product => product.category === selectedCategory));
        }
    }, [selectedCategory, data]);

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id);
        fetchUserAddToCart();
    };

    return (
        <div className='container mx-auto px-4 my-6 relative'>
            <h2 className='text-2xl font-semibold py-4'>
                Products for {brandName} ({filteredData.length} items)
            </h2>
            <CategoryFilter /> {/* No need to pass setCategory since it's handled in CategoryFilter */}

            {loading ? (
                <div className='mt-5 flex flex-wrap justify-between gap-6'>
                    {loadingList.map((_, index) => (
                        <div key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>
                            <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'></div>
                            <div className='p-4 grid gap-3'>
                                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200'></h2>
                                <p className='capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200 py-2'></p>
                                <div className='flex gap-3'>
                                    <p className='text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'></p>
                                    <p className='text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'></p>
                                </div>
                                <button className='text-sm text-white px-3 rounded-full bg-slate-200 py-2 animate-pulse'></button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                filteredData.length === 0 ? (
                    <p className='text-center text-lg font-medium text-gray-500'>No products found in this category.</p>
                ) : (
                    <div className='mt-5 flex flex-wrap justify-between gap-6'>
                        {filteredData.map((product, index) => (
                            <Link to={"/product/" + product._id} key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow' onClick={scrollToTop}>
                                <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                                    <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' alt={product.productName} />
                                </div>
                                <div className='p-4 grid gap-3'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product.productName}</h2>
                                    <p className='capitalize text-slate-500'>{product.category}</p>
                                    <div className='flex gap-3'>
                                        <p className='text-red-600 font-medium'>{displayPrice(product.sellingPrice)}</p>
                                        <p className='text-slate-500 line-through'>{displayPrice(product.price)}</p>
                                    </div>
                                    <button className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full' onClick={(e) => handleAddToCart(e, product._id)}>Add to Cart</button>
                                </div>
                            </Link>
                        ))}
                    </div>
                )
            )}
        </div>
    );
};

export default ProductsByBrand;
