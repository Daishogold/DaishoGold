import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchExchangeRates } from '../helpers/currencyApi';

export const fetchRates = createAsyncThunk('currency/fetchRates', async () => {
    const rates = await fetchExchangeRates();
    return rates;
});

const currencySlice = createSlice({
    name: 'currency',
    initialState: {
        selectedCurrency: 'USD',
        rates: {},
        status: 'idle',
        error: null,
    },
    reducers: {
        setCurrency: (state, action) => {
            state.selectedCurrency = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRates.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchRates.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.rates = action.payload;
            })
            .addCase(fetchRates.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { setCurrency } = currencySlice.actions;

export default currencySlice.reducer;