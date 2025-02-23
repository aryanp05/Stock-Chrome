import { Button } from '@extension/ui';
import bird1 from '../public/ezgif-frame-004-removebg-preview.png';

export default function App2({ stockTicker, companyName, stockExchange, stockPrice, chartIframe, widgets }) {
  return (
    <div className="w-[98vw] max-w-[1600px] mx-auto mt-8 p-6 bg-red shadow-lg rounded-lg border border-gray-200">
      {/* Centered Bird Image */}
      <div className="flex justify-center mb-4">
        <img
          src={bird1}
          alt="Bird"
          className="w-40 h-40 md:w-60 md:h-60 object-cover rounded-full border-4 border-gray-400 shadow-lg"
        />
      </div>

      {/* Stock Header */}
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-bold">
          {companyName} ({stockTicker})
        </h1>
        <p className="text-gray-500 text-lg">
          {stockExchange}: {stockTicker}
        </p>
        <p className="text-5xl font-semibold mt-2">
          {stockPrice && stockPrice !== '-' ? `$${stockPrice}` : 'Price Unavailable'}
        </p>
      </div>

      {/* Main Layout: 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side: Stock Chart */}
        <div className="h-[500px] w-full flex items-center justify-center">
          {chartIframe ? (
            <div
              dangerouslySetInnerHTML={{ __html: chartIframe }}
              className="border rounded-lg shadow p-4 bg-white w-full h-full"
            />
          ) : (
            <div className="h-full w-full bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">[Stock Chart Placeholder]</p>
            </div>
          )}
        </div>

        {/* Right Side: Full-Size Widgets */}
        <div className="flex flex-col gap-6 w-full">
          {/* Analyst Buy Widget */}
          {widgets[0] && (
            <div className="border rounded-lg shadow p-4 bg-white w-full h-auto">
              <h2 className="text-xl font-semibold mb-2">Analyst Buy Ratings</h2>
              <div dangerouslySetInnerHTML={{ __html: widgets[0] }} />
            </div>
          )}

          {/* Analyst Targets Widget */}
          {widgets[1] && (
            <div className="border rounded-lg shadow p-4 bg-white w-full h-auto">
              <h2 className="text-xl font-semibold mb-2">Analyst Target Prices</h2>
              <div dangerouslySetInnerHTML={{ __html: widgets[1] }} />
            </div>
          )}

          {/* Key Ratios Widget */}
          {widgets[2] && (
            <div className="border rounded-lg shadow p-4 bg-white w-full h-auto">
              <h2 className="text-xl font-semibold mb-2">Key Ratios</h2>
              <div dangerouslySetInnerHTML={{ __html: widgets[2] }} />
            </div>
          )}

          {/* ESG Widget */}
          {widgets[3] && (
            <div className="border rounded-lg shadow p-4 bg-white w-full h-auto">
              <h2 className="text-xl font-semibold mb-2">ESG Ratings</h2>
              <div dangerouslySetInnerHTML={{ __html: widgets[3] }} />
            </div>
          )}
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-6 flex justify-end">
        <Button className="text-md px-4 py-2">Trade Now</Button>
      </div>
    </div>
  );
}
