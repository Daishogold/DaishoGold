import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import img1 from '../assets/bikes/CD70Blue-01.png';
import img2 from '../assets/bikes/GD 110.png';
import img3 from '../assets/bikes/GS 150.png';
import img4 from '../assets/bikes/YBR.png';
import img5 from '../assets/bikes/CB 150.png';
import img6 from '../assets/bikes/CB 125 F.png';
import img7 from '../assets/bikes/CB 125 F.png';
import img8 from '../assets/bikes/JH_70-.png';
import img9 from '../assets/bikes/CG 125.png';
import img10 from '../assets/bikes/Harley-Davidson X440.webp';
import img11 from '../assets/bikes/Royal Enfield Hunter 350.webp';

const products = [
    { id: 1, name: "Honda CD 70", image: img1 },
    { id: 2, name: "Suzuki GD 110", image: img2 },
    { id: 3, name: "Suzuki GS 150", image: img3 },
    { id: 4, name: "Yamaha YBR", image: img4 },
    { id: 5, name: "Honda CB 150", image: img5 },
    { id: 6, name: "Honda H125", image: img6 },
    { id: 7, name: "Honda Deluxe 125", image: img7 },
    { id: 8, name: "Jialing JH 70", image: img8 },
    { id: 9, name: "Honda CG 125", image: img9 },
    { id: 10, name: "Harley Davidson X440", image: img10 },
    { id: 11, name: "Royal Enfield Hunter 350", image: img11 },
];

const BikeList = () => {
    const navigate = useNavigate();
    const scrollRef = useRef(null);

    const handleClick = (brandName) => {
        navigate(`/products-by-brand?brandName=${encodeURIComponent(brandName)}`);
    };

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    };

    return (
        <div className="relative container mx-auto p-4">
            <div
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
                onClick={scrollLeft}
            >
                <div className="bg-white rounded-full p-2 shadow-md cursor-pointer">
                    <FaArrowLeft className="text-2xl text-gray-600 hover:text-gray-800" />
                </div>
            </div>
            <div ref={scrollRef} className="flex items-center gap-4 justify-between overflow-scroll scrollbar-none">
                {products.map((bike) => (
                    <div
                        key={bike.id}
                        className="cursor-pointer"
                        onClick={() => handleClick(bike.name)}
                    >
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden p-1 md:p-2 bg-slate-200 flex items-center justify-center">
                            <img
                                src={bike.image}
                                alt={bike.name}
                                className="w-20 h-20 md:w-28 md:h-28 object-cover hover:scale-125 transition-all mix-blend-multiply"
                            />
                        </div>
                        <p className="text-center text-sm md:text-base capitalize line-clamp-1">{bike.name}</p>
                    </div>
                ))}
            </div>
            <div
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
                onClick={scrollRight}
            >
                <div className="bg-white rounded-full p-2 shadow-md cursor-pointer">
                    <FaArrowRight className="text-2xl text-gray-600 hover:text-gray-800" />
                </div>
            </div>
        </div>
    );
};

export default BikeList;
