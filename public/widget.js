(function() {
    window.StablecoinCalculator = {
        init: function(containerId, options = {}) {
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
            const config = { ...defaults, ...options };
            
            const container = document.getElementById(containerId);
            if (!container) {
                console.error('Container element not found');
                return;
            }

            const iframe = document.createElement('iframe');
            iframe.src = config.host ? `${config.host}/widget` : '/widget';
            iframe.width = config.width;
            iframe.height = config.height;
            iframe.frameBorder = '0';
            iframe.scrolling = 'no'; // Changed to no for better auto-resizing
            iframe.allow = 'clipboard-write';
            iframe.style.borderRadius = '12px';
            iframe.style.overflow = 'hidden'; // Changed to hidden for better auto-resizing
            iframe.style.transition = 'height 0.3s ease'; // Smooth height transitions
            iframe.allowFullscreen = true;
            iframe.loading = 'lazy';

            container.appendChild(iframe);
            
            // Set up auto-resizing if enabled
            if (config.autoResize) {
                // Listen for messages from the iframe content
                window.addEventListener('message', function(event) {
                    // Verify the message origin matches our iframe src
                    const iframeUrl = new URL(iframe.src);
                    const messageOrigin = new URL(event.origin);
                    
                    if (messageOrigin.host === iframeUrl.host && event.data && event.data.type === 'resize') {
                        // Get the height from the message
                        const height = event.data.height;
                        
                        // Apply min/max constraints
                        const minHeight = parseInt(config.minHeight) || 300;
                        const maxHeight = parseInt(config.maxHeight) || 1000;
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
})();