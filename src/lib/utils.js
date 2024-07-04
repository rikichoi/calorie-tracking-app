export const numberFormatter = (amount) => {
    const formatter = Intl.NumberFormat("en-US", {
        currency: "USD",
        style: "decimal"
    })
    return formatter.format(amount);
};

