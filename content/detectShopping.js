const PRICE_REGEX = /\$\s?\d+(?:,\d{3})*(?:\.\d{2})?/;

const text = document.body.innerText;
const isShopping = PRICE_REGEX.test(text);

if (isShopping) {
  chrome.runtime.sendMessage({ type: "SHOPPING_PAGE" });
}
