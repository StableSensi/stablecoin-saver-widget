(function(window) {
    'use strict';
    
    window.StablecoinCalculator = {
        init: function(containerId, config = {}) {
            // Default configuration
            const defaults = {
                width: '100%',
                height: 500,
                host: window.location.origin
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
            iframe.scrolling = 'yes';
            iframe.style.borderRadius = '12px';
            iframe.style.background = 'transparent';
            iframe.style.overflow = 'auto';
            
            // Add iframe to container
            container.appendChild(iframe);

            return iframe;
        }
    };
})(window);