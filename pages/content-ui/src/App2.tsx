import { Button } from '@extension/ui';

export default function App2({ chartIframe, stockTicker, companyName, stockExchange, stockPrice }) {
  return (
    <div className="w-[90vw] max-w-full mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      {/* Stock Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            {companyName} ({stockTicker})
          </h1>
          <p className="text-gray-500">
            {stockExchange}: {stockTicker}
          </p>
        </div>
        <div>
          <p className="text-4xl font-semibold">
            {stockPrice && stockPrice !== '-' ? `$${stockPrice}` : 'Price Unavailable'}
          </p>
        </div>
      </div>

      {/* Stock Chart */}
      <div className="mt-6">
        {chartIframe ? (
          <div className="chart-iframe-container" dangerouslySetInnerHTML={{ __html: chartIframe }} />
        ) : (
          <div className="h-60 bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">[Stock Chart Placeholder]</p>
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className="mt-6 flex justify-end">
        <Button>Trade Now</Button>
      </div>
    </div>
  );
}
