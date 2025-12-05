interface ICountPrice {
    price: number;
    totalProduct: number;
    wholeSalePrice?: number;
    wholesaleFrom?: number;
    discountPercent?: number;
}
export const countTotalPrice = (props: ICountPrice): number => {

    const { price, wholeSalePrice, wholesaleFrom, discountPercent, totalProduct } = props;

    const useWholesale = wholesaleFrom !== undefined && totalProduct >= wholesaleFrom && wholeSalePrice !== undefined;

    let totalPrice = totalProduct * (useWholesale ? wholeSalePrice! : price);

    if (discountPercent && discountPercent > 0) {
        totalPrice -= (totalPrice * discountPercent) / 100;
    }
    
    return totalPrice;
};