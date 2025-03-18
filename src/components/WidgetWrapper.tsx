import React, { useEffect, useRef } from 'react';
import SavingsCalculator from './SavingsCalculator';

const WidgetWrapper: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Function to send height to parent window
  const sendHeightToParent = () => {
    if (containerRef.current) {
      const height = containerRef.current.scrollHeight;
      
      // Send message to parent window with current height
      if (window.parent !== window) {
        window.parent.postMessage({
          type: 'resize',
          height: height
        }, '*');
      }
    }
  };

  useEffect(() => {
    // Set up resize observer to detect content height changes
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        sendHeightToParent();
      });
      
      resizeObserver.observe(containerRef.current);
      
      // Listen for height request messages from parent
      const handleMessage = (event: MessageEvent) => {
        if (event.data && event.data.type === 'requestHeight') {
          sendHeightToParent();
        }
      };
      
      window.addEventListener('message', handleMessage);
      
      // Initial height send after a short delay to ensure content is rendered
      setTimeout(sendHeightToParent, 300);
      
      // Clean up
      return () => {
        resizeObserver.disconnect();
        window.removeEventListener('message', handleMessage);
      };
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full bg-transparent"
    >
      <SavingsCalculator />
    </div>
  );
};

export default WidgetWrapper;