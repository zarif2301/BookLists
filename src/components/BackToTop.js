import React, { useEffect, useState } from 'react';

// Displays a floating "Back to Top" button when the user scrolls down the page
// Clicking the button smoothly scrolls the page back to the top
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Checks the current scroll position and updates the visible state.
    // The button is shown only if the page has been scrolled down more than 300px.
    const toggleVisibility = () => setVisible(window.pageYOffset > 300);

    // Attach the scroll event listener
    window.addEventListener('scroll', toggleVisibility);

    // Cleanup the event listener when the component unmounts
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Smoothly scrolls the window back to the top of the page when the button is clicked.
  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' });
  
  // If the button is not visible, render nothing
  if (!visible) return null;

  return (
    <button onClick={scrollToTop} className="back-to-top" aria-label="Back to top">
      ↑
    </button>
  );
}
