export const fetchExchangeRates = async () => {
    try {
        const response = await fetch('https://v6.exchangerate-api.com/v6/bc5dfffb9a3f70a1717dabb1/latest/USD');
        const data = await response.json();
        return data.conversion_rates;
    } catch (error) {
        console.error('Failed to fetch exchange rates', error);
        return null;
    }
};
