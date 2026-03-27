const getAvailableQuantity = (item: any) => {
  if (item.optionId) {
    return item.option.optionStock - (item.option.optionReserved || 0);
  }

  return item.product.availableProduct;
};

export default getAvailableQuantity;
