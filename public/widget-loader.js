(function(window) {
    'use strict';
    
    window.StablecoinCalculator = {
        init: function(containerId, config = {}) {
            // Default configuration
            const defaults = {
                width: '100%',
                height: '500px',
                host: window.location.origin,
                autoResize: true,
                minHeight: '300px',
                maxHeight: '1000px'
            };

            // Merge defaults with user config
            const options = { ...defaults, ...config };
            
            // Get or create container
            let container = typeof containerId === 'string'
                ? document.getElementById(containerId)
                : containerId;

            if (!container) {
                console.error('Container element not found');
                return;
            }

            // Create iframe
            const iframe = document.createElement('iframe');
            iframe.src = options.host + '/widget';
            iframe.width = options.width;
            iframe.height = options.height;
            iframe.frameBorder = '0';
            iframe.scrolling = 'no'; // Changed to no for better auto-resizing
            iframe.style.borderRadius = '12px';
            iframe.style.background = 'transparent';
            iframe.style.overflow = 'hidden'; // Changed to hidden for better auto-resizing
            iframe.style.transition = 'height 0.3s ease'; // Smooth height transitions
            iframe.allow = 'clipboard-write';
            iframe.allowFullscreen = true;
            iframe.loading = 'lazy';
            
            // Add iframe to container
            container.appendChild(iframe);

            // Set up auto-resizing if enabled
            if (options.autoResize) {
                // Listen for messages from the iframe content
                window.addEventListener('message', function(event) {
                    // Verify the message origin matches our iframe src
                    const iframeUrl = new URL(iframe.src);
                    const messageOrigin = new URL(event.origin);
                    
                    if (messageOrigin.host === iframeUrl.host && event.data && event.data.type === 'resize') {
                        // Get the height from the message
                        const height = event.data.height;
                        
                        // Apply min/max constraints
                        const minHeight = parseInt(options.minHeight) || 300;
                        const maxHeight = parseInt(options.maxHeight) || 1000;
                        const newHeight = Math.max(minHeight, Math.min(height, maxHeight));
                        
                        // Update iframe height
                        iframe.style.height = newHeight + 'px';
                    }
                });
                
                // Initial resize after load
                iframe.onload = function() {
                    // Force a small delay to ensure content is fully rendered
                    setTimeout(function() {
                        // Try to send a message to the iframe to request its height
                        try {
                            iframe.contentWindow.postMessage({ type: 'requestHeight' }, '*');
                        } catch (e) {
                            console.warn('Could not request height from iframe', e);
                        }
                    }, 300);
                };
            }

            return iframe;
        }
    };
})(window);