// CategoryFilter.js
import { useDispatch } from 'react-redux';
import { setCategory } from '../store/categorySlice';
import productCategory from '../helpers/productCategory';

const CategoryFilter = () => {
    const dispatch = useDispatch();

    const handleCategoryChange = (e) => {
        dispatch(setCategory(e.target.value));
    };

    return (
        <select onChange={handleCategoryChange} className="p-2 border rounded">
            <option value="all">All Categories</option>
            {productCategory.map(category => (
                <option key={category.id} value={category.value}>{category.label}</option>
            ))}
        </select>
    );
};


export default CategoryFilter;
