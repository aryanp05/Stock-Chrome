import { createRoot } from 'react-dom/client';
import App2 from '@src/App2';
import StockifyButton from '@src/StockifyButton'; // Import React button
import tailwindcssOutput from '../dist/tailwind-output.css?inline'; // Import Tailwind styles
import bird3 from '../public/goose_loading.gif'; // Import the GIF image
import windBlow from '../public/wind_blow.mp3'; // Import the wind sound MP3
import geeseQuack from '../public/geese-cackle-31344.mp3';

let scrapedWidgets = []; // Store scraped widget content
let storedChartIframe = ''; // Store stock chart iframe
let scrapedStockData = {}; // Store stock details (ticker, name, exchange, price)

// Function to display the full-screen GIF overlay for 5 seconds with a loading bar and play wind sound
// Function to display the GIF overlay for 5 seconds with a loading bar and wind sound
// Function to display the GIF overlay for 5 seconds with a loading bar and wind sound
function showGifOverlay() {
  const audioG = new Audio(geeseQuack);
  audioG.play();

  // Remove the overlay and stop the audio after 5 seconds
  setTimeout(() => {
    audioG.pause();
    audioG.currentTime = 0;
    overlay.remove();
  }, 5000);
  const overlay = document.createElement('div');
  overlay.id = 'gif-overlay';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.zIndex = '9999';

  // ✅ Set background to slightly translucent white
  overlay.style.background = 'rgba(255, 255, 255, 0.95)'; // 85% opacity white

  overlay.style.overflow = 'hidden';
  overlay.style.display = 'flex';
  overlay.style.flexDirection = 'column';
  overlay.style.justifyContent = 'center'; // Center vertically
  overlay.style.alignItems = 'center'; // Center horizontally

  // Create the GIF image element (Big but not fullscreen)
  const gifImg = document.createElement('img');
  gifImg.src = bird3;
  gifImg.alt = 'Loading...';

  // ✅ Increase size but keep it responsive
  gifImg.style.width = '80vw'; // 80% of viewport width
  gifImg.style.maxWidth = '1000px'; // Ensure it doesn’t get too large
  gifImg.style.height = 'auto'; // Maintain aspect ratio

  overlay.appendChild(gifImg);

  // Create loading bar container positioned below the GIF
  const loadingContainer = document.createElement('div');
  loadingContainer.style.position = 'relative';
  loadingContainer.style.zIndex = '1';
  loadingContainer.style.width = '300px';
  loadingContainer.style.height = '20px';
  loadingContainer.style.background = '#ccc';
  loadingContainer.style.borderRadius = '10px';
  loadingContainer.style.overflow = 'hidden';
  loadingContainer.style.marginTop = '20px'; // Space below GIF

  // Create loading bar element
  const loadingBar = document.createElement('div');
  loadingBar.style.height = '100%';
  loadingBar.style.background = '#007bff';
  loadingBar.style.width = '0%';
  loadingBar.style.transition = 'width 5s linear';

  loadingContainer.appendChild(loadingBar);
  overlay.appendChild(loadingContainer);

  document.body.appendChild(overlay);

  // Trigger the loading bar animation
  requestAnimationFrame(() => {
    loadingBar.style.width = '100%';
  });

  // Create and play the wind sound audio
  const audio = new Audio(windBlow);
  audio.play();

  // Remove the overlay and stop the audio after 5 seconds
  setTimeout(() => {
    audio.pause();
    audio.currentTime = 0;
    overlay.remove();
  }, 5000);
}

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

// Function to handle button click (clicks Fundamentals tab first)
async function handleStockifyClick() {
  console.log('Stockify button clicked! Navigating to Fundamentals tab...');

  // Show the full-screen GIF overlay with loading bar and wind sound
  showGifOverlay();

  // Store the current page URL before navigating
  const originalPageUrl = window.location.href;

  // **Scrape stock details first, before modifying the page**
  scrapeStockDetails();

  // Find the Fundamentals tab link and click it
  const fundamentalsTab = document.querySelector('a[href*="fundamentals"]');
  if (fundamentalsTab) {
    fundamentalsTab.click();
    console.log('Clicked Fundamentals tab.');

    // Wait for the page to load before scraping (adjust delay if needed)
    await new Promise(resolve => setTimeout(resolve, 3000));
  } else {
    console.error('Fundamentals tab not found!');
    return;
  }

  // Scrape the required widgets from the Fundamentals page
  scrapeFundamentalsWidgets();

  // Return to the original stock page
  console.log('Returning to the original quote page...');
  window.location.href = originalPageUrl;

  // Wait for the Quote page to fully load
  await new Promise(resolve => setTimeout(resolve, 3000));

  // **Store the stock chart after switching back to the Quote page**
  storeStockChart();

  // **Remove Only `quote-details-header`**
  removeQuoteDetailsHeader();

  // Inject Stockify UI with scraped widgets and stock chart
  injectStockifyUI();
}

// **Function to scrape stock details (before removing elements)**
function scrapeStockDetails() {
  console.log('Scraping stock details before modifying the page...');

  const stockTickerElement = document.querySelector('.quote-symbol .nowrap.ellipsis');
  const companyNameElement = document.querySelector('.quote-name.text-regular.fg70.nowrap.quote-sm');
  const stockExchangeElement = document.querySelector('.quote-exch.text-regular.fg50.nowrap.quote-sm');
  const stockPriceElement = document.querySelector('.quote-price.text-semibold.lh-sm.fs2 span');

  scrapedStockData = {
    stockTicker: stockTickerElement ? stockTickerElement.textContent.trim() : 'N/A',
    companyName: companyNameElement ? companyNameElement.textContent.trim() : 'N/A',
    stockExchange: stockExchangeElement ? stockExchangeElement.textContent.trim() : 'N/A',
    stockPrice: stockPriceElement ? stockPriceElement.innerText.trim() : 'N/A',
  };

  if (!scrapedStockData.stockPrice || scrapedStockData.stockPrice === '-' || scrapedStockData.stockPrice.length < 1) {
    console.error('Stock price scraping failed!');
    scrapedStockData.stockPrice = 'Price Unavailable';
  }

  console.log('Scraped stock data:', scrapedStockData);
}

// Function to scrape widgets from the Fundamentals page
function scrapeFundamentalsWidgets() {
  console.log('Scraping widgets from the Fundamentals page...');

  // Define selectors for the widgets we want to store
  const widgetSelectors = [
    'div.analystRatings-widget',
    '#analyst-forecast',
    'div.keyRatios-widget',
    'div._row.esg-widget__row.after-16',
    'div.morningstar-widget',
  ];

  // Loop through selectors and store the HTML of matching elements
  scrapedWidgets = [];
  widgetSelectors.forEach(selector => {
    const widgetElement = document.querySelector(selector);
    if (widgetElement) {
      scrapedWidgets.push(widgetElement.outerHTML);
      console.log(`Scraped widget: ${selector}`);
    } else {
      console.error(`Widget not found: ${selector}`);
    }
  });

  console.log('Scraped widgets:', scrapedWidgets);
}

// Function to store the stock chart after switching back to Quote page
function storeStockChart() {
  console.log('Storing stock chart after returning to Quote page...');

  // Find the stock chart iframe on the Quote page
  const chartIframeElement = document.querySelector('#tv-chart iframe');
  storedChartIframe = chartIframeElement ? chartIframeElement.outerHTML : '';

  if (chartIframeElement) {
    console.log('Stock chart successfully stored!');
  } else {
    console.error('Stock chart iframe not found!');
  }
}

// **Function to remove only `quote-details-header`**
function removeQuoteDetailsHeader() {
  console.log('Removing `quote-details-header`...');

  const headerElement = document.querySelector('.quote-details-header');
  if (headerElement) {
    headerElement.remove();
    console.log('`quote-details-header` removed successfully.');
  } else {
    console.error('`quote-details-header` not found!');
  }
}

// Function to inject Stockify UI with the scraped widgets and stock chart
function injectStockifyUI() {
  console.log('Injecting Stockify UI with scraped widgets and stock chart...');

  // Find the main content container
  const mainElement = document.getElementById('cp-ib-app-main-content');
  if (!mainElement) {
    console.error('Main content area not found!');
    return;
  }

  // Remove all child elements inside <main> before injecting Stockify UI
  mainElement.innerHTML = '';

  // Inject TailwindCSS into <main>
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
      stockTicker={scrapedStockData.stockTicker}
      companyName={scrapedStockData.companyName}
      stockExchange={scrapedStockData.stockExchange}
      stockPrice={scrapedStockData.stockPrice}
      chartIframe={storedChartIframe} // Keep stock chart (stored after switching back)
      widgets={scrapedWidgets} // Pass scraped widgets
    />,
  );
}

// Run stockQuote when page loads
stockQuote();
