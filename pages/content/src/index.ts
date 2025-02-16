import { sampleFunction } from '@src/sampleFunction';
import { stockQuote } from '@src/stockQuote';

console.log('content script loaded');
console.log('This is the content script');

stockQuote();

const observer = new MutationObserver(() => stockQuote());
observer.observe(document.body, { childList: true, subtree: true });
