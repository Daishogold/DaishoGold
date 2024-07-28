import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import categoryReducer from './categorySlice';
import currencyReducer from './CurrencySlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        category: categoryReducer,
        currency: currencyReducer,
    },
});