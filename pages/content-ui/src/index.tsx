import { createRoot } from 'react-dom/client';
import App from '@src/App';
import App2 from '@src/App2'; // Import App2
import { stockQuote } from '@src/stockQuote';
import tailwindcssOutput from '../dist/tailwind-output.css?inline';

const root = document.createElement('div');
root.id = 'chrome-extension-boilerplate-react-vite-content-view-root';

document.body.append(root);

const rootIntoShadow = document.createElement('div');
rootIntoShadow.id = 'shadow-root';

const shadowRoot = root.attachShadow({ mode: 'open' });

if (navigator.userAgent.includes('Firefox')) {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = tailwindcssOutput;
  shadowRoot.appendChild(styleElement);
} else {
  const globalStyleSheet = new CSSStyleSheet();
  globalStyleSheet.replaceSync(tailwindcssOutput);
  shadowRoot.adoptedStyleSheets = [globalStyleSheet];
}

shadowRoot.appendChild(rootIntoShadow);

// Check if URL matches portal.interactivebrokers.com/*
const currentURL = window.location.href;
const shouldRenderApp2 = currentURL.includes('portal.interactivebrokers.com');

// Initially render App or App2
createRoot(rootIntoShadow).render(shouldRenderApp2 ? <App2 /> : <App />);

// Start MutationObserver to handle UI changes
const observer = new MutationObserver(() => stockQuote());
observer.observe(document.body, { childList: true, subtree: true });
