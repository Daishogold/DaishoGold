import PropTypes from 'prop-types';
import { CgClose } from 'react-icons/cg';

const DisplayImage = ({
    imgUrl,
    onClose
}) => {
    return (
        <div className='fixed bottom-0 top-0 right-0 left-0 flex justify-center items-center bg-gray-900 bg-opacity-35'>
            <div className='bg-white shadow-lg rounded w-[50%] max-h-[80%] mx-auto p-4 relative'>
                <div className='absolute top-6 right-4 text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                    <CgClose />
                </div>
                <div className='flex justify-center items-center p-4'>
                    <img src={imgUrl} className='max-w-full max-h-[60vh]' alt="Full Size" />
                </div>
            </div>
        </div>
    )
}

DisplayImage.propTypes = {
    imgUrl: PropTypes.string,
    onClose: PropTypes.func,
};

export default DisplayImage
