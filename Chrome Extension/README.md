# SpeedReader Chrome Extension

A Chrome extension that allows you to send selected text from any webpage directly to the SpeedReader app.

## Features

- Right-click any selected text on a webpage
- Choose "Send to SpeedReader" from the context menu
- Instantly opens the bundled SpeedReader app in a new tab with the selected text loaded
- **Works offline** - the entire app is bundled within the extension

## Installation

### Option 1: Load as unpacked extension (Development)

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top right corner
3. Click "Load unpacked"
4. Select the `Chrome Extension` folder from this project
5. The extension is now installed and active

**Note:** If you rebuild the main SpeedReader app (`npm run build`), you'll need to copy the new `dist/assets/` files to the extension folder to update the bundled app.

### Option 2: Install from Chrome Web Store (Production)

*(Coming soon - once published)*

## Usage

1. Select any text on a webpage by clicking and dragging
2. Right-click on the selection
3. Click "Send to SpeedReader" from the context menu
4. SpeedReader will open in a new tab with your text ready to read

## Configuration

No configuration required! The extension now bundles the entire SpeedReader app, so it works completely offline.

If you want to use a hosted version instead, edit `background.js` and change:
```javascript
const readerUrl = chrome.runtime.getURL('reader.html');
```
to your hosted URL.

## File Structure

```
Chrome Extension/
├── manifest.json      # Extension manifest (v3)
├── background.js      # Service worker for context menu
├── popup.html         # Extension popup UI
├── popup.js           # Popup functionality
├── reader.html        # Entry point for bundled SpeedReader app
├── favicon.svg        # App favicon
├── assets/            # Bundled React app files
│   ├── index-*.js     # Compiled JavaScript
│   └── index-*.css    # Compiled styles
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
