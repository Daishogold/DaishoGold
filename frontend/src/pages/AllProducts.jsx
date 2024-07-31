import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UploadProduct from '../components/UploadProduct';
import AdminProductCard from '../components/AdminProductCard';
import SummaryApi from '../common';
import CategoryFilter from '../components/CategoryFilter';
import { FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';

const AllProducts = () => {
    const [openUploadProduct, setOpenUploadProduct] = useState(false);
    const [allProduct, setAllProduct] = useState([]);
    const [sorted, setSorted] = useState(false);
    const [loading, setLoading] = useState(true); // Add loading state
    const selectedCategory = useSelector(state => state.category.selectedCategory);

    const fetchAllProduct = async () => {
        setLoading(true); // Set loading to true when starting to fetch
        try {
            const response = await fetch(SummaryApi.allProduct.url);
            const dataResponse = await response.json();
            setAllProduct(dataResponse?.data || []);
        } catch (error) {
            console.error('Failed to fetch products', error);
        } finally {
            setLoading(false); // Set loading to false after fetching is done
        }
    };

    useEffect(() => {
        fetchAllProduct();
    }, []);

    const handleSortToggle = () => {
        if (sorted) {
            fetchAllProduct(); // Reset to original order
        } else {
            const sortedProducts = [...allProduct].sort((a, b) =>
                a.productName.localeCompare(b.productName)
            );
            setAllProduct(sortedProducts);
        }
        setSorted(!sorted);
    };

    const filteredProducts = selectedCategory === 'all'
        ? allProduct
        : allProduct.filter(product => product.category === selectedCategory);

    return (
        <div>
            <div className='bg-white py-2 px-4 flex justify-between items-center mt-5'>
                <h2 className='font-bold text-lg'>All Products ({filteredProducts.length})</h2>
                <div className='flex gap-4'>
                    <button
                        className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full'
                        onClick={() => setOpenUploadProduct(true)}
                    >
                        Upload Product
                    </button>
                    <button
                        className='border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all py-1 px-3 rounded-full flex items-center gap-2'
                        onClick={handleSortToggle}
                    >
                        {sorted ? <FaSortAlphaUp /> : <FaSortAlphaDown />}
                        Sort A-Z
                    </button>
                </div>
            </div>

            <div className='bg-white py-2 px-4 flex items-center'>
                Filter By Category -  <CategoryFilter />
            </div>

            {loading ? (
                <div className="flex flex-col justify-center items-center h-[calc(100vh-190px)]">
                    <div className="relative w-16 h-16 mb-4">
                        <div className="absolute w-16 h-16 border-4 border-blue-500 border-solid rounded-full border-t-transparent animate-spin"></div>
                    </div>
                    <p className="text-lg text-gray-600">Loading Products...</p>
                </div>
            ) : (
                <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
                    {filteredProducts.map((product, index) => (
                        <AdminProductCard data={product} key={index + "allProduct"} fetchdata={fetchAllProduct} />
                    ))}
                </div>
            )}

            {openUploadProduct && (
                <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct} />
            )}
        </div>
    );
};

export default AllProducts;
