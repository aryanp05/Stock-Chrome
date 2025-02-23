import { createRoot } from 'react-dom/client';
import App2 from '@src/App2';
import StockifyButton from '@src/StockifyButton'; // Import React button
import tailwindcssOutput from '../dist/tailwind-output.css?inline'; // Import Tailwind styles

export function stockQuote() {
  const pattern = /^https:\/\/portal\.interactivebrokers\.com\/.*\/quote\/.*/;

  if (pattern.test(window.location.href)) {
    console.log('Matched! Inserting Stockify button...');

    // Find the target div where we want to add the button
    const quoteIconsDiv = document.querySelector('.quote-icons');

    if (quoteIconsDiv && !document.getElementById('stockify-button-container')) {
      const buttonContainer = document.createElement('div');
      buttonContainer.id = 'stockify-button-container';
      quoteIconsDiv.parentNode.insertBefore(buttonContainer, quoteIconsDiv.nextSibling);

      // Render the React StockifyButton inside buttonContainer
      createRoot(buttonContainer).render(<StockifyButton onClick={handleStockifyClick} />);
    }
  }
}

// Function to handle button click (scrape and replace UI)
function handleStockifyClick() {
  console.log('Stockify button clicked! Replacing <main> content with App2...');

  // Scrape the chart iframe
  const chartIframeElement = document.querySelector('#tv-chart iframe');
  let iframeHTML = chartIframeElement ? chartIframeElement.outerHTML : '';
  if (!chartIframeElement) console.error('Chart iframe not found!');

  // Scrape stock ticker, company name, and exchange
  const stockTickerElement = document.querySelector('.quote-symbol .nowrap.ellipsis');
  const companyNameElement = document.querySelector('.quote-name.text-regular.fg70.nowrap.quote-sm');
  const stockExchangeElement = document.querySelector('.quote-exch.text-regular.fg50.nowrap.quote-sm');

  // **FIX: Scrape stock price from correct span inside `.quote-price`**
  const stockPriceElement = document.querySelector('.quote-price.text-semibold.lh-sm.fs2 span');

  const stockTicker = stockTickerElement ? stockTickerElement.textContent.trim() : 'N/A';
  const companyName = companyNameElement ? companyNameElement.textContent.trim() : 'N/A';
  const stockExchange = stockExchangeElement ? stockExchangeElement.textContent.trim() : 'N/A';

  // **Fix stock price extraction**
  let stockPrice = stockPriceElement ? stockPriceElement.innerText.trim() : 'N/A';
  if (!stockPrice || stockPrice === '-' || stockPrice.length < 1) {
    console.error('Stock price scraping failed!');
    stockPrice = 'Price Unavailable';
  }

  console.log('Scraped Ticker:', stockTicker);
  console.log('Scraped Company:', companyName);
  console.log('Scraped Exchange:', stockExchange);
  console.log('Scraped Price:', stockPrice);

  // Find the main content container
  const mainElement = document.getElementById('cp-ib-app-main-content');
  if (!mainElement) {
    console.error('Main content area not found!');
    return;
  }

  // Remove all child elements inside <main> (but keep <main> itself)
  mainElement.innerHTML = '';

  // Remove tablist & header
  document.querySelector('div._ovfl._tabs2.quote-header-tabs[role="tablist"]')?.remove();
  document.querySelector('.quote-details-header')?.remove();

  // Inject TailwindCSS into <main> (since it's outside the Shadow DOM)
  if (!document.getElementById('tailwind-style')) {
    const styleElement = document.createElement('style');
    styleElement.id = 'tailwind-style';
    styleElement.innerHTML = tailwindcssOutput;
    document.head.appendChild(styleElement);
  }

  // Create a new div inside <main> to render App2
  const app2Container = document.createElement('div');
  app2Container.id = 'custom-ui-container';
  mainElement.appendChild(app2Container);

  // Render App2 inside <main>, passing scraped data
  createRoot(app2Container).render(
    <App2
      chartIframe={iframeHTML}
      stockTicker={stockTicker}
      companyName={companyName}
      stockExchange={stockExchange}
      stockPrice={stockPrice}
    />,
  );
}

// Run stockQuote when page loads
stockQuote();
