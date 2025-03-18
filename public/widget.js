(function() {
    window.StablecoinCalculator = {
        init: function(containerId, options = {}) {
            const container = document.getElementById(containerId);
            if (!container) {
                console.error('Container element not found');
                return;
            }

            const iframe = document.createElement('iframe');
            iframe.src = options.host ? `${options.host}/widget` : '/widget';
            iframe.width = options.width || '100%';
            iframe.height = options.height || '500px';
            iframe.frameBorder = '0';
            iframe.allow = 'clipboard-write';
            iframe.style.borderRadius = '12px';
            iframe.style.overflow = 'hidden';

            container.appendChild(iframe);
        }
    };
})();