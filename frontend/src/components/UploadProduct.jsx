import { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { FaCloudUploadAlt } from 'react-icons/fa';
import PropTypes from 'prop-types';
import productCategory from '../helpers/productCategory';
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from 'react-icons/md';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

// Sample bike names array
const bikes = [
    "Honda CD 70",
    "Suzuki GD 110",
    "Suzuki GS 150",
    "Yamaha YBR",
    "Honda CB 150",
    "Honda H125",
    "Honda Deluxe 125",
    "Jialing JH 70",
    "Honda CG 125",
    "Harley Davidson X440",
    "Royal Enfield Hunter 350"
];

const UploadProduct = ({ onClose, fetchData }) => {
    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        customCategory: "",
        productImage: [],
        description: "",
        price: "",
        sellingPrice: ""
    });

    const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
    const [fullScreenImage, setFullScreenImage] = useState("");

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUploadProduct = async (e) => {
        const files = Array.from(e.target.files);
        const uploadedImages = await Promise.all(files.map(async (file) => {
            const uploadImageCloudinary = await uploadImage(file);
            return uploadImageCloudinary.url;
        }));

        setData((prev) => ({
            ...prev,
            productImage: [...prev.productImage, ...uploadedImages]
        }));
    };

    const handleDeleteProductImage = async (index) => {
        const newProductImage = [...data.productImage];
        newProductImage.splice(index, 1);

        setData((prev) => ({
            ...prev,
            productImage: newProductImage
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const finalData = {
                ...data,
                category: data.category === "custom" ? data.customCategory : data.category
            };

            const response = await fetch(SummaryApi.uploadProduct.url, {
                method: SummaryApi.uploadProduct.method,
                credentials: 'include',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(finalData)
            });

            const responseData = await response.json();

            if (responseData.success) {
                toast.success(responseData.message);
                onClose();
                fetchData();
            } else if (responseData.error) {
                toast.error(responseData.message);
            } else {
                toast.error("An unexpected error occurred.");
            }
        } catch (error) {
            toast.error("Failed to upload product. Please try again.");
        }
    };

    return (
        <div className="fixed bg-slate-200 bg-opacity-35 w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center mt-8">
            <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
                <div className='flex justify-between items-center pb-3 mt-3'>
                    <h2 className="font-bold text-lg">Upload Product</h2>
                    <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                        <CgClose />
                    </div>
                </div>

                <form className='grid p-4 gap-3 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
                    <label htmlFor="productName">Product Name:</label>
                    <input
                        type="text"
                        id='productName'
                        placeholder='Enter Product Name'
                        name='productName'
                        value={data.productName}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />

                    <label htmlFor="brandName" className='mt-3'>Brand Name:</label>
                    <select
                        id='brandName'
                        name='brandName'
                        value={data.brandName}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    >
                        <option value="">Select Brand</option>
                        {bikes.map((bike, index) => (
                            <option key={index} value={bike}>{bike}</option>
                        ))}
                    </select>

                    <label htmlFor="category" className='mt-3'>Category:</label>
                    <select
                        value={data.category}
                        name='category'
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    >
                        <option value="">Select Category</option>
                        {productCategory.map((el, index) => (
                            <option value={el.value} key={el.value + index}>
                                {el.label}
                            </option>
                        ))}
                        <option value="custom">Custom Category</option>
                    </select>

                    {data.category === "custom" && (
                        <input
                            type="text"
                            placeholder="Enter Custom Category"
                            name="customCategory"
                            value={data.customCategory}
                            onChange={handleOnChange}
                            className="mt-2 p-2 bg-slate-100 border rounded"
                            required
                        />
                    )}

                    <label htmlFor="productImage" className='mt-3'>Product Image:</label>
                    <label htmlFor='uploadImageInput'>
                        <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                            <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                                <span className='text-4xl'><FaCloudUploadAlt /></span>
                                <p className='text-sm'>Upload Product Image</p>
                                <input
                                    type="file"
                                    id='uploadImageInput'
                                    className='hidden'
                                    onChange={handleUploadProduct}
                                    multiple
                                />
                            </div>
                        </div>
                    </label>

                    <div>
                        {data.productImage.length > 0 ? (
                            <div className='flex items-center gap-2 flex-wrap'>
                                {data.productImage.map((el, index) => (
                                    <div key={index} className='relative group'>
                                        <img
                                            src={el}
                                            alt={el}
                                            width={80}
                                            height={80}
                                            className='bg-slate-100 border cursor-pointer'
                                            onClick={() => {
                                                setOpenFullScreenImage(true);
                                                setFullScreenImage(el);
                                            }}
                                        />
                                        <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' onClick={() => handleDeleteProductImage(index)}>
                                            <MdDelete />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className='text-red-600 text-xs'>*Please upload product image</p>
                        )}
                    </div>

                    <label htmlFor='price' className='mt-3'>Price :</label>
                    <input
                        type='number'
                        id='price'
                        placeholder='Enter Price'
                        value={data.price}
                        name='price'
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />

                    <label htmlFor="sellingPrice" className='mt-3'>Selling Price:</label>
                    <input
                        type="number"
                        id='sellingPrice'
                        placeholder='Enter Selling Price'
                        name='sellingPrice'
                        value={data.sellingPrice}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />

                    <label htmlFor="description" className='mt-3'>Description:</label>
                    <textarea
                        rows={3}
                        onChange={handleOnChange}
                        name='description'
                        value={data.description}
                        className='h-28 bg-slate-100 border resize-none p-1'
                        placeholder='Enter Product Description'
                    />

                    <button className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700'>Upload Product</button>
                </form>
            </div>

            {openFullScreenImage && (
                <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
            )}
        </div>
    );
};

UploadProduct.propTypes = {
    onClose: PropTypes.func.isRequired,
    fetchData: PropTypes.func.isRequired
};

export default UploadProduct;
