const PageNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <h1 className="text-5xl font-bold text-red-500 mb-4">404</h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-slate-700 mb-4 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12">
                Sorry.. The Page you are looking for is Not Found!
            </p>

            <a href="/" className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Go to Home
            </a>
        </div>
    );
};

export default PageNotFound;
