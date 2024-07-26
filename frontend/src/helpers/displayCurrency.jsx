const displayPKRCurrency = (num) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2
    })

    return formatter.format(num)
}

export default displayPKRCurrency