import { createRoot } from 'react-dom/client';
import { stockQuote } from '@src/stockQuote';
import tailwindcssOutput from '../dist/tailwind-output.css?inline';

// Ensure TailwindCSS is injected into the document
if (!document.getElementById('tailwind-style')) {
  const styleElement = document.createElement('style');
  styleElement.id = 'tailwind-style';
  styleElement.innerHTML = tailwindcssOutput;
  document.head.appendChild(styleElement);
}

// Run stockQuote to handle UI modifications
stockQuote();
