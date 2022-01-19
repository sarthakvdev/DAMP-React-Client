const BigNumber = require('bignumber.js');

export const getTimeStamp = () => Math.floor(Date.now() / 1000);

export const getDate = (timestamp) => new Date(timestamp * 1000).toDateString();

// Function for converting amount from larger unit (like eth) to smaller unit (like wei)
export function convertTo(amount, decimals) {
  return new BigNumber(amount)
    .times('1e' + decimals)
    .integerValue()
    .toString(10);
}

// Function for converting amount from smaller unit (like wei) to larger unit (like ether)
export function convertFrom(amount, decimals) {
  return new BigNumber(amount).div('1e' + decimals).toString(10);
}
