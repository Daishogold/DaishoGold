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
    const selectedCategory = useSelector(state => state.category.selectedCategory);

    const fetchAllProduct = async () => {
        const response = await fetch(SummaryApi.allProduct.url);
        const dataResponse = await response.json();
        setAllProduct(dataResponse?.data || []);
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
            <div className='bg-white py-2 px-4 flex justify-between items-center'>
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

            <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
                {
                    filteredProducts.map((product, index) => {
                        return (
                            <AdminProductCard data={product} key={index + "allProduct"} fetchdata={fetchAllProduct} />
                        )
                    })
                }
            </div>

            {openUploadProduct && (
                <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct} />
            )}
        </div>
    );
};

export default AllProducts;
