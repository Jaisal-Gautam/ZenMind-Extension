export const CHROME_STORE_URL = 'https://chromewebstore.google.com/detail/zenmind/eaoccliembamohhchmmigmpaocanihdg?hl=en-GB&authuser=0';
export const KOFI_URL= 'https://ko-fi.com/jaisalgautam';
export const installZenMind = () => {
  window.open(CHROME_STORE_URL, '_blank', 'noopener,noreferrer');
};

export const tip = () => {
  window.open(KOFI_URL, '_blank', 'noopener,noreferrer');
};


