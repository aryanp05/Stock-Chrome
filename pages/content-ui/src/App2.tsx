import { useState } from 'react';
import { Button } from '@extension/ui';
// Import the goose gif (renamed to gooseGif to avoid naming conflicts)
import gooseGif from '../public/goose.gif';
import gooseTalking from '../public/goose_speaking.gif';

export default function App2({ stockTicker, companyName, stockExchange, stockPrice, chartIframe, widgets = [] }) {
  const [popupVisible, setPopupVisible] = useState(false);

  // Handler for when the goose gif is clicked
  const handleGifClick = () => {
    setPopupVisible(true);
  };

  // Handler to close the pop-up overlay
  const closePopup = () => {
    setPopupVisible(false);
  };

  // The text to be "typed" in the popup
  const typewriterText = 'Hello, welcome to Stockify! Enjoy the insights.';

  return (
    <>
      <div className="w-full max-w-none mt-8 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
        {/* Main Two-Column Layout for Chart (left) and Stock Info + Last Widget (right) */}
        <div className="grid grid-cols-1 md:grid-cols-[60%_40%] gap-6 mb-6">
          {/* Left Column: Stock Chart */}
          <div className="h-[500px] w-full flex items-center justify-center">
            {chartIframe ? (
              <div className="border rounded-lg shadow bg-white w-full h-full">
                <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: chartIframe }} />
              </div>
            ) : (
              <div className="h-full w-full bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">[Stock Chart Placeholder]</p>
              </div>
            )}
          </div>

          {/* Right Column: Stock Info & Last Widget */}
          <div className="flex flex-col items-start justify-start">
            {/* Stock Info */}
            <h1 className="text-4xl font-bold">
              {companyName} ({stockTicker})
            </h1>
            <p className="text-gray-500 text-lg mt-1">
              {stockExchange}: {stockTicker}
            </p>
            <p className="text-5xl font-semibold mt-2">
              {stockPrice && stockPrice !== '-' ? `$${stockPrice}` : 'Price Unavailable'}
            </p>

            {/* Last Widget (if exists) */}
            {widgets.length > 0 && (
              <div className="border rounded-lg shadow p-4 bg-white relative mt-6 w-full">
                <img
                  src={gooseGif}
                  alt="widget icon"
                  className="w-11 h-11 absolute top-2 right-2 cursor-pointer"
                  onClick={handleGifClick}
                />
                <div dangerouslySetInnerHTML={{ __html: widgets[widgets.length - 1] }} />
              </div>
            )}
          </div>
        </div>

        {/* Widgets (4 known) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Widget 0 */}
          <div className="border rounded-lg shadow p-4 bg-white relative">
            <img
              src={gooseGif}
              alt="widget icon"
              className="w-11 h-11 absolute top-2 right-2 cursor-pointer"
              onClick={handleGifClick}
            />
            {widgets[0] ? (
              <div dangerouslySetInnerHTML={{ __html: widgets[0] }} />
            ) : (
              <p className="text-gray-500">No widget 0 data</p>
            )}
          </div>

          {/* Widget 1 */}
          <div className="border rounded-lg shadow p-4 bg-white relative">
            <img
              src={gooseGif}
              alt="widget icon"
              className="w-11 h-11 absolute top-2 right-2 cursor-pointer"
              onClick={handleGifClick}
            />
            {widgets[1] ? (
              <div dangerouslySetInnerHTML={{ __html: widgets[1] }} />
            ) : (
              <p className="text-gray-500">No widget 1 data</p>
            )}
          </div>

          {/* Widget 2 */}
          <div className="border rounded-lg shadow p-4 bg-white relative">
            <img
              src={gooseGif}
              alt="widget icon"
              className="w-11 h-11 absolute top-2 right-2 cursor-pointer"
              onClick={handleGifClick}
            />
            {widgets[2] ? (
              <div dangerouslySetInnerHTML={{ __html: widgets[2] }} />
            ) : (
              <p className="text-gray-500">No widget 2 data</p>
            )}
          </div>

          {/* Widget 3 */}
          <div className="border rounded-lg shadow p-4 bg-white relative">
            <img
              src={gooseGif}
              alt="widget icon"
              className="w-11 h-11 absolute top-2 right-2 cursor-pointer"
              onClick={handleGifClick}
            />
            {widgets[3] ? (
              <div dangerouslySetInnerHTML={{ __html: widgets[3] }} />
            ) : (
              <p className="text-gray-500">No widget 3 data</p>
            )}
          </div>
        </div>
      </div>

      {/* Popup overlay for the goose gif with typewriter animation */}
      {popupVisible && (
        <div
          className="fixed inset-0 z-[10000] bg-black bg-opacity-50 flex flex-col items-center justify-center cursor-pointer"
          onClick={closePopup}>
          <img src={gooseTalking} alt="Goose Popup" className="max-w-full max-h-full" />
          <div className="mt-4">
            <div
              className="text-white text-lg font-mono overflow-hidden whitespace-nowrap border-r-4 border-r-white"
              style={{
                fontSize: '1.25rem',
                width: '100ch',
                animation: 'typing 4s steps(40, end) forwards, blink-caret 0.75s step-end infinite',
              }}>
              {typewriterText}
            </div>
          </div>
          <style>{`
            @keyframes typing {
              from { width: 0; }
              to { width: 40ch; }
            }
            @keyframes blink-caret {
              from, to { border-color: transparent; }
              50% { border-color: white; }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
