import { Button } from '@extension/ui';
import bird1 from '../public/ezgif-frame-004-removebg-preview.png';

export default function App2({
  stockTicker,
  companyName,
  stockExchange,
  stockPrice,
  chartIframe,
  widgets = [],
}) {
  return (
    <div className="w-full max-w-none mt-8 p-6 bg-red shadow-lg rounded-lg border border-gray-200">
      {/* Main Two-Column Layout for Chart (left) and Stock Info + Last Widget (right) */}
      <div className="grid grid-cols-1 md:grid-cols-[60%_40%] gap-6 mb-6">
        {/* Left Column: Stock Chart */}
        <div className="h-[500px] w-full flex items-center justify-center">
          {chartIframe ? (
            <div className="border rounded-lg shadow bg-white w-full h-full">
              <div
                className="w-full h-full"
                dangerouslySetInnerHTML={{ __html: chartIframe }}
              />
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
            <div className="border rounded-lg shadow p-4 bg-white mt-6 w-full">
              <div dangerouslySetInnerHTML={{ __html: widgets[widgets.length - 1] }} />
            </div>
          )}
        </div>
      </div>

  {/* Widgets (4 known) */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
  {/* Widget 0 */}
  <div className="border rounded-lg shadow p-4 bg-white">
    {widgets[0] ? (
      <div dangerouslySetInnerHTML={{ __html: widgets[0] }} />
    ) : (
      <p className="text-gray-500">No widget 0 data</p>
    )}
  </div>

  {/* Widget 1 */}
  <div className="border rounded-lg shadow p-4 bg-white">
  <h1>Earnings per share</h1>
    {widgets[1] ? (
      <div dangerouslySetInnerHTML={{ __html: widgets[1] }} />
    ) : (
      <p className="text-gray-500">No widget 1 data</p>
    )}
  </div>

  {/* Widget 2 */}
  <div className="border rounded-lg shadow p-4 bg-white">
    {widgets[2] ? (
      <div dangerouslySetInnerHTML={{ __html: widgets[2] }} />
    ) : (
      <p className="text-gray-500">No widget 2 data</p>
    )}
  </div>

  {/* Widget 3 */}
  <div className="border rounded-lg shadow p-4 bg-white">
    {widgets[3] ? (
      <div dangerouslySetInnerHTML={{ __html: widgets[3] }} />
    ) : (
      <p className="text-gray-500">No widget 3 data</p>
    )}
  </div>
</div>
      </div>

      {/* Action Button */}
      <div className="mt-6 flex justify-end">
        <Button className="text-md px-4 py-2">Trade Now</Button>
      </div>
    </div>
  );
}
