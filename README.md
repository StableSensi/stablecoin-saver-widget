# Stablecoin Savings Calculator Widget

A widget that calculates potential savings when using stablecoins for international transfers.

## Deployment to Vercel

This project is configured to be deployed on Vercel. Follow these steps to deploy:

1. Push your code to a GitHub repository
2. Go to [Vercel](https://vercel.com) and sign in
3. Click "New Project"
4. Import your GitHub repository
5. Keep the default settings (Vercel will automatically detect it's a Vite project)
6. Click "Deploy"

## Embedding the Widget

Once deployed, you can embed the widget on any website using one of these methods:

### Method 1: Direct iframe (Recommended)

```html
<iframe
    src="https://stablecoin-saver-widget.vercel.app/widget"
    width="100%"
    height="500px"
    frameborder="0"
    scrolling="no"
    allowfullscreen
    loading="lazy"
    allow="clipboard-write"
    style="border-radius: 12px; background: transparent; overflow: hidden; transition: height 0.3s ease;"
></iframe>

<script>
    // Add this script to enable auto-resizing
    window.addEventListener('message', function(event) {
        // Only accept messages from the widget domain
        if (event.origin !== 'https://stablecoin-saver-widget.vercel.app') return;
        
        // Check if it's a resize message
        if (event.data && event.data.type === 'resize') {
            // Find our iframe
            const iframes = document.querySelectorAll('iframe');
            for (let i = 0; i < iframes.length; i++) {
                if (iframes[i].src.includes('stablecoin-saver-widget.vercel.app/widget')) {
                    // Update the height (with min/max constraints)
                    const minHeight = 300;
                    const maxHeight = 1000;
                    const newHeight = Math.max(minHeight, Math.min(event.data.height, maxHeight));
                    iframes[i].style.height = newHeight + 'px';
                }
            }
        }
    });
</script>
```

### Method 2: JavaScript Loader (Easiest)

```html
<div id="stablecoin-calculator"></div>
<script src="https://stablecoin-saver-widget.vercel.app/widget-loader.js"></script>
<script>
    StablecoinCalculator.init('stablecoin-calculator', {
        width: '100%',
        host: 'https://stablecoin-saver-widget.vercel.app',
        autoResize: true,
        minHeight: '300px',
        maxHeight: '1000px'
    });
</script>
```

### Advanced Configuration Options

The JavaScript loader accepts the following configuration options:

```javascript
StablecoinCalculator.init('container-id', {
    // Required
    host: 'https://stablecoin-saver-widget.vercel.app', // Widget host URL
    
    // Optional with defaults
    width: '100%',                // Width of the iframe
    height: '500px',              // Initial height (will adjust if autoResize is true)
    autoResize: true,             // Enable automatic height adjustment
    minHeight: '300px',           // Minimum height constraint
    maxHeight: '1000px',          // Maximum height constraint
});
```

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/a17e11bf-a28a-4980-be58-72a3c021d25c

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/a17e11bf-a28a-4980-be58-72a3c021d25c) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/a17e11bf-a28a-4980-be58-72a3c021d25c) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)
