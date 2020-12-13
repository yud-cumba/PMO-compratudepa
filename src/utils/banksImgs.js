const bankToImg = (bank) => {
  alert(bank);
  if (bank.includes('BCP')) {
    return 'bank-bcp.png';
  } if (bank.includes('INTERBANK')) {
    return 'bank-interbank.png';
  } if (bank.includes('Azteca')) {
    return 'bank-azteca.png';
  } if (bank.includes('Falabella')) {
    return 'bank-falabella.png';
  }
  if (bank.includes('BBVA')) {
    return 'bank-bbva.jpg';
  }
  if (bank.includes('GNB')) {
    return 'bank-gnb.png';
  } if (bank.includes('National')) {
    return 'bank-national-bank.png';
  }
  if (bank.includes('Scotiabank')) {
    return 'bank-scotiabank.png';
  }
  if (bank.includes('otros')) {
    return 'bank.jpg';
  }
  return 'bank.jpg';
};
export default bankToImg;
