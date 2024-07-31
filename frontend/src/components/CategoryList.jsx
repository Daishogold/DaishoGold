import { useEffect, useState, useRef } from "react";
import SummaryApi from "../common";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const CategoryList = () => {
    const [categoryProduct, setCategoryProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef(null);

    const categoryLoading = new Array(13).fill(null);

    const fetchCategoryProduct = async () => {
        setLoading(true);
        try {
            const response = await fetch(SummaryApi.categoryProduct.url);
            const dataResponse = await response.json();
            setCategoryProduct(dataResponse?.data || []);
        } catch (error) {
            console.error('Error fetching category products:', error);
            setCategoryProduct([]);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCategoryProduct();
    }, []);

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    };

    return (
        <div className="container mx-auto p-4 mt-4 relative">
            <div
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
                onClick={scrollLeft}
            >
                <div className="bg-white rounded-full p-2 shadow-md cursor-pointer">
                    <FaArrowLeft className="text-xl text-gray-600 hover:text-gray-800" />
                </div>
            </div>
            <div ref={scrollRef} className="flex items-center gap-4 justify-between overflow-x-scroll scrollbar-none">
                {loading
                    ? categoryLoading.map((el, index) => (
                        <div key={"categoryLoading" + index} className="h-20 w-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden bg-slate-200 animate-pulse"></div>
                    ))
                    : categoryProduct.length > 0 ? (
                        categoryProduct.map((product, index) => (
                            <Link to={"/product-category?category=" + product?.category} key={index} className="cursor-pointer">
                                <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden p-1 md:p-2 lg:p-2.5 bg-slate-200 flex items-center justify-center">
                                    <img src={product?.productImage[0]} alt={product?.category} className="h-full w-full object-cover hover:scale-125 transition-all mix-blend-multiply" />
                                </div>
                                <p className="text-center text-sm md:text-base lg:text-lg capitalize line-clamp-1">{product?.category}</p>
                            </Link>
                        ))
                    ) : (
                        <p>No categories found.</p>
                    )}
            </div>
            <div
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
                onClick={scrollRight}
            >
                <div className="bg-white rounded-full p-2 shadow-md cursor-pointer">
                    <FaArrowRight className="text-xl text-gray-600 hover:text-gray-800" />
                </div>
            </div>
        </div>
    );
};

export default CategoryList;
