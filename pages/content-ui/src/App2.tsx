import { Button } from '@extension/ui';
import EsgDisplay from './EsgDisplay';

export default function App2({ chartIframe }) {

  // Example ESG ratings (replace with actual data)
  const eRating = 7; // Environmental
  const sRating = 9; // Social
  const gRating = 5; // Governance
  const overallRating = 7; // Overall

  // Static stock data (replace with API data later)
  const stock = {
    name: 'Tesla, Inc.',
    ticker: 'TSLA',
    price: 885.67,
    change: '+12.45 (1.42%)',
    volume: '23.5M',
    marketCap: '889.76B',
  };

  // Construct TipRanks URLs dynamically based on the stock ticker
  const tipranksCoverageUrl = `https://widgets.tipranks.com/content/ib/coverage/?ticker=${stock.ticker}&token=61025434A3b6dA4f5dA85a9A18d04a9880fe&color=white`;
  const tipranksAnalysisUrl = `https://widgets.tipranks.com/content/ib/analysis/?ticker=${stock.ticker}&token=fcf8e976A71c1A490cAa2c4A51aa09ac84c1&color=white`;

return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      {/* Stock Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">
            {stock.name} ({stock.ticker})
          </h1>
          <p className="text-gray-500">NASDAQ: {stock.ticker}</p>
        </div>
        <div>
          <p className="text-3xl font-semibold">${stock.price.toFixed(2)}</p>
          <p className={`text-lg ${stock.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
            {stock.change}
          </p>
        </div>
      </div>

      {/* Stock Chart */}
      <div className="mt-6">
        {chartIframe ? (
          <div
            className="chart-iframe-container"
            dangerouslySetInnerHTML={{ __html: chartIframe }}
          />
        ) : (
          <div className="h-40 bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">[Stock Chart Placeholder]</p>
          </div>
        )}
      </div>
      
      {/* ESG Ratings */}
      <div className="mt-6">
        <EsgDisplay e={eRating} s={sRating} g={gRating} score={overallRating}/>
      </div>

      {/* Stock Info */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-500">Market Cap</p>
          <p className="font-semibold">{stock.marketCap}</p>
        </div>
        <div>
          <p className="text-gray-500">Volume</p>
          <p className="font-semibold">{stock.volume}</p>
        </div>
      </div>
      
      {/* TipRanks Coverage Iframe (cropped, no scroll) */}
      <div className="mt-6" style={{ height: '150px', overflow: 'hidden' }}>
        <article className="outsety-16">
          <iframe
            src={tipranksCoverageUrl}
            width="100%"
            scrolling="no"
            sandbox="allow-scripts allow-popups allow-forms allow-top-navigation"
            style={{ height: '500px', border: 'none' }}
          ></iframe>
        </article>
      </div>
      
      {/* TipRanks Analysis Iframe (cropped, no scroll) */}
      <div className="mt-6" style={{ height: '560px', overflow: 'hidden' }}>
        <article className="outsety-16">
          <iframe
            src={tipranksAnalysisUrl}
            width="100%"
            scrolling="no"
            sandbox="allow-scripts allow-popups allow-forms allow-top-navigation"
            style={{ height: '600px', border: 'none' }}
          ></iframe>
        </article>
      </div>
      

      {/* Action Button */}
      <div className="mt-6 flex justify-end">
        <Button>Trade Now</Button>
      </div>
    </div>
  );
}