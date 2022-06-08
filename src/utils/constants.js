import {CURRENCIES} from './themes';

export function currencyFormat(num, nodp) {
  return `${CURRENCIES?.naira}${num
    .toFixed(nodp ? 0 : 2)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function normaliseCase(value) {
  return value.toLowerCase() == true ? value : value.toLowerCase();
}
