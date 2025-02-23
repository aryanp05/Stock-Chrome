import React from 'react';

// Converts a rating (assumed 0–10) to a color. Adjust thresholds/colors as needed.
function getColor(rating: number): string {
  if (rating >= 8) return '#15803d';   // dark green (Tailwind bg-green-700)
  if (rating >= 6) return '#4ade80';   // medium green (Tailwind bg-green-400)
  if (rating >= 4) return '#facc15';   // yellow (Tailwind bg-yellow-400)
  return '#ef4444';                   // red (Tailwind bg-red-500)
}

// Builds a conic gradient string that fills the circle up to the rating's percentage.
function getConicGradient(rating: number): string {
  // Convert rating to a percentage of 360° (e.g. 7/10 => 252°)
  const angle = (rating / 10) * 360;
  const color = getColor(rating);
  // #e5e7eb is Tailwind's gray-200. You can replace it with any “unfilled” color.
  return `conic-gradient(${color} 0deg, ${color} ${angle}deg, #e5e7eb ${angle}deg, #e5e7eb 360deg)`;
}

type EsgDisplayProps = {
  e: number;    // Environmental rating
  s: number;    // Social rating
  g: number;    // Governance rating
  score?: number; // Overall ESG score (0–10), optional if you don't have one
};

export default function EsgDisplay({ e, s, g, score }: EsgDisplayProps) {
  // Renders one ESG circle with a label
  const renderEsgCircle = (rating: number, label: string) => (
    <div className="flex flex-col items-center">
      {/* Outer ring: conic gradient for the colored portion */}
      <div className="relative w-12 h-12">
        <div
          className="absolute inset-0 rounded-full"
          style={{ background: getConicGradient(rating) }}
        />
        {/* Inner circle: white background with the rating in black */}
        <div className="absolute inset-1 flex items-center justify-center bg-white rounded-full text-black font-bold">
          {rating}
        </div>
      </div>
      <span className="mt-2">{label}</span>
    </div>
  );

  return (
    <div>
      {/* Three main ESG circles */}
      <div className="flex items-center space-x-6">
        {renderEsgCircle(e, 'Environmental')}
        {renderEsgCircle(s, 'Social')}
        {renderEsgCircle(g, 'Governance')}
      </div>

      {/* Optional small circle for Overall ESG Score */}
      {score !== undefined && (
        <div className="mt-6 flex items-center space-x-2">
          {/* You can reuse the same circle or make it smaller. Below is slightly smaller. */}
          <div className="relative w-10 h-10">
            <div
              className="absolute inset-0 rounded-full"
              style={{ background: getConicGradient(score) }}
            />
            <div className="absolute inset-1 flex items-center justify-center bg-white rounded-full text-black font-bold text-sm">
              {score}
            </div>
          </div>
          <span className="text-sm">ESG Score</span>
        </div>
      )}
    </div>
  );
}
