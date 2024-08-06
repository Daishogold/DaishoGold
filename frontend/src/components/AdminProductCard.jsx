import { useState } from 'react';
import { MdModeEditOutline, MdDeleteOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import PropTypes from 'prop-types';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import displayCurrency from '../helpers/displayCurrency';
import { useSelector } from 'react-redux';

const AdminProductCard = ({ data, fetchdata }) => {
    const [editProduct, setEditProduct] = useState(false);
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

    const handleDelete = async () => {
        try {
            const response = await fetch(`${SummaryApi.deleteProduct.url}/${data._id}`, {
                method: SummaryApi.deleteProduct.method,
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const responseData = await response.json();

            if (responseData.success) {
                toast.success(responseData.message);
                fetchdata();
            } else {
                toast.error(responseData.message);
            }
        } catch (error) {
            console.error('There was an error deleting the product!', error);
            toast.error('Failed to delete product');
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className='bg-white p-4 rounded'>
            <div className='w-40'>
                <div className='w-32 h-32 flex justify-center items-center'>
                    <img src={data?.productImage[0]} className='mx-auto object-fill h-full' alt={data.productName} />
                </div>
                <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>
                <span className='bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit'>{data?.brandName}</span>
                <div>
                    <p className='font-semibold'>
                        {displayPrice(data.sellingPrice)}
                    </p>

                    <div className="flex space-x-2">
                        <div className="w-fit p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer" onClick={() => setEditProduct(true)}>
                            <MdModeEditOutline />
                        </div>
                        <div className="w-fit p-2 bg-red-100 hover:bg-red-600 rounded-full hover:text-white cursor-pointer" onClick={handleDelete}>
                            <MdDeleteOutline />
                        </div>
                    </div>

                    <p className='text-xs text-gray-500'>Added: {formatDate(data.createdAt)}</p>
                    <p className='text-xs text-gray-500'>Updated: {formatDate(data.updatedAt)}</p>
                </div>
            </div>

            {editProduct && (
                <AdminEditProduct productData={data} onClose={() => setEditProduct(false)} fetchdata={fetchdata} />
            )}
        </div>
    );
};

AdminProductCard.propTypes = {
    data: PropTypes.object.isRequired,
    fetchdata: PropTypes.func.isRequired
};

export default AdminProductCard;
