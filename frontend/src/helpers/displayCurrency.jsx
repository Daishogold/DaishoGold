const displayPKRCurrency = (num) => {
    const formatter = new Intl.NumberFormat('en-PK', {
        style: "currency",
        currency: "PKR",
        maximumFractionDigits: 2
    })

    return formatter.format(num)
}

export default displayPKRCurrency