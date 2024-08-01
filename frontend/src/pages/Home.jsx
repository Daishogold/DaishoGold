import { useState } from 'react';
import BannerProduct from "../components/BannerProduct";
import CategoryList from "../components/CategoryList";
import VerticalCardProduct from "../components/VerticalCardProduct";
import BikeList from "../components/BikeList";
import { MdOutlineKeyboardDoubleArrowUp, MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import WhatsAppButton from '../components/whatsapp';
import img from '../assets/banner/Poster4.png';

const Home = () => {
    const allCards = [
        { category: "Carburetors", heading: "Carburetors", type: "horizontal" },
        { category: "Engine Parts", heading: "Engine Parts", type: "horizontal" },
        { category: "Control Cables", heading: "Control Cables", type: "horizontal" },
        { category: "Air Filters & Intakes", heading: "Best Air Filters & Intakes", type: "vertical" },
        { category: "Bearings", heading: "Top's Bearings", type: "vertical" },
        { category: "Body Parts", heading: "Body Parts", type: "vertical" },
        { category: "Battery", heading: "Battery", type: "vertical" },
        { category: "Brakes", heading: "Brakes", type: "vertical" },
        { category: "Electrical Parts", heading: "Electrical Parts", type: "vertical" },
        { category: "Jumps & Shocks", heading: "Jumps & Shocks", type: "vertical" },
        { category: "Lubricants", heading: "Lubricants", type: "vertical" },
        { category: "Meters", heading: "Meters", type: "vertical" },
    ];

    const [visibleCount, setVisibleCount] = useState(4);
    const [showMore, setShowMore] = useState(true);

    const handleShowMore = () => {
        if (visibleCount + 4 < allCards.length) {
            setVisibleCount(visibleCount + 4);
        } else {
            setVisibleCount(allCards.length);
            setShowMore(false);
        }
    };

    const handleShowLess = () => {
        setVisibleCount(4);
        setShowMore(true);
    };

    const displayedCards = allCards.slice(0, visibleCount);

    return (
        <div>
            <CategoryList />
            <BannerProduct />
            <BikeList />

            <div className="flex justify-center my-6">
                <img src={img} className="w-full h-auto object-cover rounded-lg shadow-md" alt="Banner" />
            </div>

            {displayedCards.map((card, index) => (
                card.type === "horizontal" ? (
                    <VerticalCardProduct
                        key={index}
                        category={card.category}
                        heading={card.heading}
                    />
                ) : (
                    <VerticalCardProduct
                        key={index}
                        category={card.category}
                        heading={card.heading}
                    />
                )
            ))}

            <div className="flex justify-center mt-4 mb-10">
                <button
                    onClick={showMore ? handleShowMore : handleShowLess}
                    className="px-4 py-2 bg-red-600 text-white rounded-full flex items-center gap-2"
                >
                    {showMore ? (
                        <>
                            <MdOutlineKeyboardDoubleArrowDown className="text-lg" />
                            Show More
                        </>
                    ) : (
                        <>
                            <MdOutlineKeyboardDoubleArrowUp className="text-lg" />
                            Show Less
                        </>
                    )}
                </button>
            </div>
            <WhatsAppButton />
        </div>
    );
};

export default Home;
