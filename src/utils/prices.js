export const getMinPrice = (inmobiliarias) => {
  const order = inmobiliarias.sort((a, b) => {
    if (a.min_price > b.min_price) {
      return 1;
    }
    if (a.min_price < b.min_price) {
      return -1;
    }
    return 0;
  });
  return order[0].min_price;
};

export const getMaxPrice = (inmobiliarias) => {
  const order = inmobiliarias.sort((a, b) => {
    if (a.min_price < b.min_price) {
      return 1;
    }
    if (a.min_price > b.min_price) {
      return -1;
    }
    return 0;
  });
  return order[0].min_price;
};
