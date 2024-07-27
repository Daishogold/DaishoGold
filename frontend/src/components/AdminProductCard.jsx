import { useState } from 'react';
import { MdModeEditOutline, MdDeleteOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import PropTypes from 'prop-types';
import displayPKRCurrency from '../helpers/displayCurrency';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const AdminProductCard = ({ data, fetchdata }) => {
    const [editProduct, setEditProduct] = useState(false);

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

    return (
        <div className='bg-white p-4 rounded '>
            <div className='w-40'>
                <div className='w-32 h-32 flex justify-center items-center'>
                    <img src={data?.productImage[0]} className='mx-auto object-fill h-full' />
                </div>
                <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>
                <div>
                    <p className='font-semibold'>
                        {displayPKRCurrency(data.sellingPrice)}
                    </p>
                    <div className="flex space-x-2">
                        <div className="w-fit p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer" onClick={() => setEditProduct(true)}>
                            <MdModeEditOutline />
                        </div>
                        <div className="w-fit p-2 bg-red-100 hover:bg-red-600 rounded-full hover:text-white cursor-pointer" onClick={handleDelete}>
                            <MdDeleteOutline />
                        </div>
                    </div>
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
