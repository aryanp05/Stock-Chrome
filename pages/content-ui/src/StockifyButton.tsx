import { useEffect } from 'react';
import { Button } from '@extension/ui';
import tailwindcssOutput from '../dist/tailwind-output.css?inline'; // Import Tailwind styles dynamically

export default function StockifyButton({ onClick }: { onClick: () => void }) {
  useEffect(() => {
    // Inject TailwindCSS if it's not already added
    if (!document.getElementById('tailwind-style')) {
      const styleElement = document.createElement('style');
      styleElement.id = 'tailwind-style';
      styleElement.innerHTML = tailwindcssOutput;
      document.head.appendChild(styleElement);
    }
  }, []);

  return (
    <Button
      onClick={onClick}
      theme="custom"
      className="relative px-6 py-3 font-bold text-yellow-400 bg-white-600 rounded-full shadow-md border-2 border-yellow-400 
      transition-all duration-300 hover:bg-red-700 hover:shadow-lg hover:border-yellow-300 focus:outline-none active:bg-white-800">
      Stockify!
    </Button>
  );
}
