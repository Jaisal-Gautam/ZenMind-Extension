export const CHROME_STORE_URL = 'https://chrome.google.com/webstore';

export const installZenMind = () => {
  window.open(CHROME_STORE_URL, '_blank', 'noopener,noreferrer');
};
