import { useState, useEffect } from 'react';
import { Button } from '@extension/ui';
import gooseGif from '../public/goose.gif';
import gooseTalking from '../public/goose_speaking.gif';

// Import mp3 audio presets
import morningstarAudio from '../public/morningstar.mp3';
import analystAudio from '../public/analyst.mp3';
import epsAudio from '../public/eps.mp3';
import keyratioAudio from '../public/keyratio.mp3';
import esgAudio from '../public/esg.mp3';

// AI API function
async function getGeminiResponse(prompt) {
  const url = 'https://stockifychrome.azurewebsites.net/api/getGeminiResponse';
  try {
    const response = await fetch(url + '?' + new URLSearchParams({ prompt }), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors', // Ensures cross-origin requests work
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Gemini Response:', data.response);
    return data.response;
  } catch (error) {
    console.error('Error fetching Gemini response:', error);
  }
}

// Predefined lines for each widget type
const predefinedLines = {
  morningstar:
    "MMore stars equals better value! A wide moat means strong competitive advantages, while moat trend shows if they're growing or shrinking. Uncertainty measures risk, and ESG risk scores how sustainable a company is!",
  analyst:
    'AAnalyst ratings tell you whether experts think a stock is a Buy, Sell, or Hold. The target price is what they expect the stock to reach in the future!',
  esg: "TThe ESG score measures how well a company handles environmental, social, and governance issues. Higher ratings mean they're more sustainable and responsible!",
  keymetric:
    "KKey metrics like revenue, profit margins, and debt levels help investors understand a company's financial health. It's like checking the stats before a big game!",
  eps: 'EEarnings per share (EPS) predictions show how much profit a company is expected to make. If actual earnings beat predictions, the stock might jump!',
};

// Mapping of widget types to their corresponding audio file
const widgetAudio = {
  morningstar: morningstarAudio,
  analyst: analystAudio,
  eps: epsAudio,
  keymetric: keyratioAudio, // using keyratioAudio for key metric
  esg: esgAudio,
};

// A Typewriter component that reveals text character-by-character after an initial delay.
function Typewriter({ text, speed = 50, delay = 1000 }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText('');
    let currentIndex = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        currentIndex++;
        if (currentIndex >= text.length) {
          clearInterval(interval);
        }
      }, speed);
      // Cleanup interval if text changes before finishing
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return <span>{displayedText}</span>;
}

export default function App2({ stockTicker, companyName, stockExchange, stockPrice, chartIframe, widgets = [] }) {
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedWidget, setSelectedWidget] = useState(null);
  const [popupText, setPopupText] = useState('');

  // Ordered array mapping widget indices to widget types
  const widgetTypesOrder = ['morningstar', 'analyst', 'eps', 'keymetric', 'esg'];

  // Handler for when the goose gif is clicked
  const handleGifClick = async index => {
    if (!widgets[index]) {
      console.error('No widget data available.');
      return;
    }

    // Determine widget type based on our ordered list
    const widgetType = widgetTypesOrder[index] || 'general';

    // Play the corresponding audio
    if (widgetAudio[widgetType]) {
      const audio = new Audio(widgetAudio[widgetType]);
      audio.play();
    }

    setPopupVisible(true);
    setSelectedWidget(index);
    setPopupText(''); // Start with no text

    // Get widget HTML and truncate if too long (300 characters)
    const widgetHtml = widgets[index];
    const truncatedHtml = widgetHtml.length > 300 ? widgetHtml.slice(0, 300) + '...' : widgetHtml;

    // Get the hardcoded line for the widget type
    const initialLine = predefinedLines[widgetType];

    // Build the prompt using stock info and the truncated widget summary.
    const prompt = `
      You are an AI model helping a beginner investor understand a financial widget on their investing platform.
      Please explain what the information means, why it is important, and how they can use it to make an investing decision in 2-3 lines.
      Here is the stock ticker code ${stockTicker}, stock exchange ${stockExchange}.
      Here is a summary of the widget information: ${truncatedHtml}.
      Here is the line that was previously said, say 2-4 more lines following it: ${initialLine}
    `;
    console.log('Sending API request with prompt:', prompt);

    try {
      const aiResponse = await getGeminiResponse(prompt);
      if (aiResponse) {
        // Combine the hardcoded line and the AI response
        const combinedText = initialLine + '\n' + aiResponse;
        setPopupText(combinedText);
        console.log(`AI Response for ${widgetType}:`, aiResponse);
      }
    } catch (error) {
      console.error('Error fetching AI response:', error);
    }
  };

  // Handler to close the pop-up overlay
  const closePopup = () => {
    setPopupVisible(false);
  };

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
                  onClick={() => handleGifClick(widgets.length - 1)}
                />
                <div dangerouslySetInnerHTML={{ __html: widgets[widgets.length - 1] }} />
              </div>
            )}
          </div>
        </div>

        {/* Widgets (4 known) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {widgets.map((widget, index) => (
            <div key={index} className="border rounded-lg shadow p-4 bg-white relative">
              <img
                src={gooseGif}
                alt="widget icon"
                className="w-11 h-11 absolute top-2 right-2 cursor-pointer"
                onClick={() => handleGifClick(index)}
              />
              <div dangerouslySetInnerHTML={{ __html: widget }} />
            </div>
          ))}
        </div>
      </div>

      {/* Popup overlay for the goose gif with typewriter effect */}
      {popupVisible && (
        <div
          className="fixed inset-0 z-[10000] bg-black bg-opacity-50 flex flex-col items-center justify-center cursor-pointer"
          onClick={closePopup}>
          <img src={gooseTalking} alt="Goose Popup" className="w-90 h-90 object-contain" />
          <div
            className="mt-4 text-white text-lg font-mono"
            style={{ fontSize: '1.25rem', maxWidth: '80vw', padding: '0 1rem' }}>
            <Typewriter text={popupText} speed={50} delay={1000} />
          </div>
        </div>
      )}
    </>
  );
}
