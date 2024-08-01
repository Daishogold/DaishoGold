import { useEffect, useState } from 'react';

import Poster1 from '../assets/banner/Poster1.png';
import Poster2 from '../assets/banner/Poster2.png';
import Poster3 from '../assets/banner/Poster3.png';

import Mobile1 from '../assets/banner/Mobile1.png';
import Mobile2 from '../assets/banner/Mobile2.png';
import Mobile3 from '../assets/banner/Mobile3.png';

import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

    const DesktopImages = [
        Poster1,
        Poster2,
        Poster3
    ];

    const MobileImages = [
        Mobile1,
        Mobile2,
        Mobile3
    ];

    const Images = isDesktop ? DesktopImages : MobileImages;

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
    }, [currentImage, Images.length]);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 768);
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

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

                <div className='flex h-full w-full overflow-hidden'>
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
