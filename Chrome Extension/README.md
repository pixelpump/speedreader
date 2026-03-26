# SpeedReader Chrome Extension

A Chrome extension that allows you to send selected text from any webpage directly to the SpeedReader app.

## Features

- Right-click any selected text on a webpage
- Choose "Send to SpeedReader" from the context menu
- Instantly opens SpeedReader with the selected text loaded

## Installation

### Option 1: Load as unpacked extension (Development)

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top right corner
3. Click "Load unpacked"
4. Select the `Chrome Extension` folder from this project
5. The extension is now installed and active

### Option 2: Install from Chrome Web Store (Production)

*(Coming soon - once published)*

## Usage

1. Select any text on a webpage by clicking and dragging
2. Right-click on the selection
3. Click "Send to SpeedReader" from the context menu
4. SpeedReader will open in a new tab with your text ready to read

## Configuration

Before using the extension, you may need to update the SpeedReader URL in `background.js`:

```javascript
const speedreaderUrl = 'https://your-speedreader-url.com';
```

Replace this with:
- Your local development URL (e.g., `http://localhost:5173`) for testing
- Your production URL for the deployed app

## File Structure

```
Chrome Extension/
├── manifest.json      # Extension manifest (v3)
├── background.js      # Service worker for context menu
├── popup.html         # Extension popup UI
├── popup.js           # Popup functionality
├── icons/
│   ├── icon16.svg     # Toolbar icon (16x16)
│   ├── icon48.svg     # Extension icon (48x48)
│   └── icon128.svg    # Store icon (128x128)
└── README.md          # This file
```

## How It Works

1. **Context Menu**: The extension registers a context menu item that appears when you right-click selected text
2. **Text Capture**: When you click "Send to SpeedReader", the selected text is captured
3. **URL Encoding**: The text is URL-encoded and appended as a query parameter
4. **Navigation**: A new tab opens with the SpeedReader app, which reads the text from the URL
5. **Auto-Start**: The SpeedReader app automatically starts reading the text

## Permissions

The extension requires minimal permissions:
- `contextMenus`: To add the right-click menu item
- `activeTab`: To interact with the current tab
- `scripting`: For potential future enhancements

## Development

To modify the extension:

1. Make changes to the source files
2. Go to `chrome://extensions/` in Chrome
3. Click the refresh button on the SpeedReader extension card
4. Test your changes

## License

MIT License - Same as the main SpeedReader project
