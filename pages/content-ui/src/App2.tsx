import { Button } from '@extension/ui';

export default function App2() {
  // Static stock data (replace with API data later)
  const stock = {
    name: 'Tesla, Inc.',
    ticker: 'TSLA',
    price: 885.67,
    change: '+12.45 (1.42%)',
    volume: '23.5M',
    marketCap: '889.76B',
  };

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

      {/* Stock Graph (Placeholder) */}
      <div className="mt-6 h-40 bg-gray-200 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">[Stock Chart Placeholder]</p>
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

      {/* Action Button */}
      <div className="mt-6 flex justify-end">
        <Button>Trade Now</Button>
      </div>
    </div>
  );
}
