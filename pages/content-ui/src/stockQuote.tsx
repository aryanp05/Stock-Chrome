import { createRoot } from 'react-dom/client';
import App2 from '@src/App2';
import tailwindcssOutput from '../dist/tailwind-output.css?inline'; // Import Tailwind styles

export function stockQuote() {
  const pattern = /^https:\/\/portal\.interactivebrokers\.com\/.*\/quote\/.*/;

  if (pattern.test(window.location.href)) {
    console.log('Matched! Inserting button...');

    // Find the target div where we want to add the button
    const quoteIconsDiv = document.querySelector('.quote-icons');

    if (quoteIconsDiv && !document.getElementById('stockify-button')) {
      // Create a new button
      const button = document.createElement('button');
      button.id = 'stockify-button';
      button.innerText = 'Click Me NOW!';
      button.style.marginLeft = '10px';

      // Add event listener to replace content inside <main> with App2
      button.addEventListener('click', () => {
        console.log('Button clicked! Replacing <main> content with App2...');

        // Scrape the chart iframe before clearing any content
        const chartIframeElement = document.querySelector('#tv-chart iframe');
        let iframeHTML = '';
        if (chartIframeElement) {
          iframeHTML = chartIframeElement.outerHTML;
          console.log('Scraped chart iframe:', iframeHTML);
        } else {
          console.error('Chart iframe not found!');
        }

        // Find the main content container
        const mainElement = document.getElementById('cp-ib-app-main-content');
        if (!mainElement) {
          console.error('Main content area not found!');
          return;
        }

        // Remove all child elements inside <main> (but keep <main> itself)
        mainElement.innerHTML = '';

        // Find and remove the tablist
        const tabListElement = document.querySelector('div._ovfl._tabs2.quote-header-tabs[role="tablist"]');
        if (tabListElement) {
          tabListElement.remove();
          console.log('Removed tablist successfully!');
        }

        // Find and remove the quote-details-header
        const quoteDetailsHeader = document.querySelector('.quote-details-header');
        if (quoteDetailsHeader) {
          quoteDetailsHeader.remove();
          console.log('Removed quote-details-header successfully!');
        }

        // Inject TailwindCSS into <main> (since it's outside the Shadow DOM)
        const styleElement = document.createElement('style');
        styleElement.innerHTML = tailwindcssOutput;
        document.head.appendChild(styleElement); // Append to <head> to apply styles globally

        // Create a new div inside <main> to render App2
        const app2Container = document.createElement('div');
        app2Container.id = 'custom-ui-container';
        mainElement.appendChild(app2Container);

        // Render App2 inside <main>
        createRoot(app2Container).render(<App2 chartIframe={iframeHTML} />);
      });

      // Insert the button next to quote-icons
      quoteIconsDiv.parentNode.insertBefore(button, quoteIconsDiv.nextSibling);
    }
  }
}
