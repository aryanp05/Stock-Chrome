export function stockQuote() {
  const pattern = /^https:\/\/portal\.interactivebrokers\.com\/.*\/quote\/.*/;
  if (pattern.test(window.location.href)) {
    console.log('Matched! Inserting button...');

    // Find the target div
    const quoteIconsDiv = document.querySelector('.quote-icons');

    if (quoteIconsDiv && !document.getElementById('stockify-button')) {
      // Create a new button
      const button = document.createElement('button');
      button.id = 'stockify-button';
      button.innerText = 'Click Me';
      button.style.marginLeft = '10px'; // Adjust spacing

      // Add an event listener (optional)
      button.addEventListener('click', () => {
        alert('Button Clicked!');
      });

      // Insert the button next to quote-icons
      quoteIconsDiv.parentNode.insertBefore(button, quoteIconsDiv.nextSibling);
    }
  }
}
