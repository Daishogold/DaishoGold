import img1 from '../assets/bikes/CD70Blue-01.png';
import img2 from '../assets/bikes/GD 110.png';
import img3 from '../assets/bikes/GS 150.png';
import img4 from '../assets/bikes/YBR.png';
import img5 from '../assets/bikes/CB 150.png';
import img6 from '../assets/bikes/CB 125 F.png';
import img7 from '../assets/bikes/CB 125 F.png';
import img8 from '../assets/bikes/JH_70-.png';
import img9 from '../assets/bikes/CG 125.png';
import { Link } from "react-router-dom";

const products = [
    { id: 1, name: "Honda CD 70", image: img1 },
    { id: 2, name: "Honda GD 110", image: img2 },
    { id: 3, name: "Suzuki GS 150", image: img3 },
    { id: 4, name: "Yamaha YBR", image: img4 },
    { id: 5, name: "Honda CB 150", image: img5 },
    { id: 6, name: "Honda H125", image: img6 },
    { id: 7, name: "Honda Deluxe 125", image: img7 },
    { id: 8, name: "Jialing JH 70", image: img8 },
    { id: 9, name: "Honda CG 125", image: img9 },
];

const BikeList = () => {
    return (
        <div className="container mx-auto p-4">
            <div className="flex items-center gap-4 justify-between overflow-x-scroll scrollbar-none">
                {products.map((bike) => (
                    <Link to={"/product-category?category=Bearings"} key={bike.id} className="cursor-pointer">
                        <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden p-2 md:p-3 lg:p-4 bg-slate-200 flex items-center justify-center">
                            <img
                                src={bike.image}
                                alt={bike.name}
                                className="h-full w-full object-contain mix-blend-multiply hover:scale-125 transition-all"
                            />
                        </div>
                        <p className="text-center text-sm md:text-base lg:text-lg capitalize">{bike.name}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default BikeList;
