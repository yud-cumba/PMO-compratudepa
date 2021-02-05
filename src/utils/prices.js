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
export const priceStyle = (value) => {
  const num2 = value.toString().split('.');
  const thousands = num2[0].split('').reverse().join('').match(/.{1,3}/g)
    .join(',');
  const decimals = (num2[1]) ? `.${num2[1]}` : '';

  const answer = thousands.split('').reverse().join('') + decimals;
  return answer;
};
