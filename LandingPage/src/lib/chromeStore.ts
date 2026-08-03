export const CHROME_STORE_URL = 'https://chrome.google.com/webstore';
export const KOFI_URL= 'https://ko-fi.com/jaisalgautam';
export const installZenMind = () => {
  window.open(CHROME_STORE_URL, '_blank', 'noopener,noreferrer');
};

export const tip = () => {
  window.open(KOFI_URL, '_blank', 'noopener,noreferrer');
};


