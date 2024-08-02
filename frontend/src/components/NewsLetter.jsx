import img1 from '../assets/banner/poster.png';

const Newsletter = () => {
    return (
        <section id="newsletter" className="relative p-4 py-40 flex justify-center z-10 mt-6">
            <div className="absolute z-[1] w-full h-full top-0 left-0 bg-gray-900 opacity-75" />
            <img src={img1} alt="Newsletter Background" className="absolute z-[2] w-full h-full top-0 left-0 object-cover object-center opacity-30" />
            <form className="container px-0 flex justify-center items-center relative z-[3] w-full text-center flex-col gap-2 text-white">
                <h2 className="text-3xl font-bold">
                    SUBSCRIBE TO OUR NEWSLETTER
                </h2>
                <p>
                    KEEP UP TO DATE WITH LATEST PRODUCTS
                </p>
                <div className="w-full max-w-xl mt-2 flex justify-center">
                    <input
                        required
                        type="email"
                        className="outline-none bg-white text-black px-4 py-2 rounded-l-sm flex-grow"
                        placeholder="Your Email Address"
                    />
                    <button type="submit" className="bg-red-500 text-white hover:bg-red-700 px-4 py-2 rounded-r-sm">
                        Submit
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Newsletter;
