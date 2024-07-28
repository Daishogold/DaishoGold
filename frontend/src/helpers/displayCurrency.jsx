// const displayPKRCurrency = (num) => {
//     const formatter = new Intl.NumberFormat('en-PK', {
//         style: "currency",
//         currency: "PKR",
//         maximumFractionDigits: 2
//     })

//     return formatter.format(num)
// }

// export default displayPKRCurrency


const displayCurrency = (num, currency = 'USD') => {
    const formatter = new Intl.NumberFormat('en', {
        style: "currency",
        currency,
        maximumFractionDigits: 2
    });
    return formatter.format(num);
};

export default displayCurrency;