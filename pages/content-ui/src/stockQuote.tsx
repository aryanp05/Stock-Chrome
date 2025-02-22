import { createRoot } from 'react-dom/client';
import App2 from '@src/App2';
import StockifyButton from '@src/StockifyButton'; // Import the React button
import tailwindcssOutput from '../dist/tailwind-output.css?inline'; // Import Tailwind styles
export function stockQuote() {
  const pattern = /^https:\/\/portal\.interactivebrokers\.com\/.*\/quote\/.*/;

  if (pattern.test(window.location.href)) {
    console.log('Matched! Inserting Stockify button...');

    // Find the target div where we want to add the button
    const quoteIconsDiv = document.querySelector('.quote-icons');

    if (quoteIconsDiv && !document.getElementById('stockify-button-container')) {
      // Create a container for the React button
      const buttonContainer = document.createElement('div');
      buttonContainer.id = 'stockify-button-container';
      quoteIconsDiv.parentNode.insertBefore(buttonContainer, quoteIconsDiv.nextSibling);

      // Render StockifyButton using React
      createRoot(buttonContainer).render(<StockifyButton onClick={() => handleStockifyClick()} />);
    }
  }
}

// Function to handle button click (replaces UI with App2)
function handleStockifyClick() {
  console.log('Stockify button clicked! Replacing <main> content with App2...');

  // Find the main content container
  const mainElement = document.getElementById('cp-ib-app-main-content');
  if (!mainElement) {
    console.error('Main content area not found!');
    return;
  }

  // Remove all child elements inside <main>
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

  // Inject TailwindCSS into <main>
  const styleElement = document.createElement('style');
  styleElement.innerHTML = tailwindcssOutput;
  document.head.appendChild(styleElement); // Append to <head> to apply styles globally

  // Create a new div inside <main> to render App2
  const app2Container = document.createElement('div');
  app2Container.id = 'custom-ui-container';
  mainElement.appendChild(app2Container);

  // Render App2 inside <main>
  createRoot(app2Container).render(<App2 />);
}
