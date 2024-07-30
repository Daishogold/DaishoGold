import { useEffect, useState } from 'react';
import img1 from '../assets/banner/poster.webp';
import img2 from '../assets/banner/poster 2.webp';
import img3 from '../assets/banner/poster 3.png';

import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0);

    const Images = [
        img1,
        img2,
        img3
    ];

    const nextImage = () => {
        if (Images.length - 1 > currentImage) {
            setCurrentImage(prev => prev + 1);
        }
    };

    const prevImage = () => {
        if (currentImage !== 0) {
            setCurrentImage(prev => prev - 1);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (Images.length - 1 > currentImage) {
                nextImage();
            } else {
                setCurrentImage(0);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [currentImage]);

    return (
        <div className='container mx-auto px-4 rounded'>
            <div className='h-96 md:h-[30rem] w-full bg-slate-200 relative'>

                <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
                    <div className='flex justify-between w-full text-2xl'>
                        <button onClick={prevImage} className='bg-white shadow-md rounded-full p-2 md:p-3 lg:p-4'>
                            <FaAngleLeft />
                        </button>
                        <button onClick={nextImage} className='bg-white shadow-md rounded-full p-2 md:p-3 lg:p-4'>
                            <FaAngleRight />
                        </button>
                    </div>
                </div>

                {/**desktop and tablet version */}
                <div className='hidden md:flex h-full w-full overflow-hidden'>
                    {Images.map((imageURL, index) => (
                        <div className='w-full h-full flex-shrink-0 transition-transform duration-700' key={index} style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                            <img src={imageURL} className='w-full h-full object-cover' alt={`Banner ${index + 1}`} />
                        </div>
                    ))}
                </div>

                {/**mobile version */}
                <div className='md:hidden flex h-full w-full overflow-hidden'>
                    {Images.map((imageURL, index) => (
                        <div className='w-full h-full flex-shrink-0 transition-transform duration-700' key={index} style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                            <img src={imageURL} className='w-full h-full object-cover' alt={`Banner ${index + 1}`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BannerProduct;
