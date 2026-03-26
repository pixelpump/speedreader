# SpeedReader Chrome Extension

A Chrome extension that allows you to send selected text from any webpage directly to the SpeedReader app.

## Features

- **Quick Access**: Right-click any selected text to send it to SpeedReader
- **Offline Support**: The entire SpeedReader app is bundled — works without internet
- **Fast Loading**: No external server requests, instant startup
- **Seamless Integration**: Opens in a new tab with your text ready to read

---

## Quick Start

### For Users

1. **Install the extension** (see [Installation](#installation) below)
2. **Select text** on any webpage
3. **Right-click** → **"Send to SpeedReader"**
4. **Read faster** in the new tab that opens

### For Developers

```bash
# 1. Build the main SpeedReader app
cd /Volumes/250Gb/speedreader
npm run build

# 2. Copy assets to extension (if needed)
cp -r dist/assets/* "Chrome Extension/assets/"

# 3. Load in Chrome (see Installation section)
```

---

## Installation

### Option 1: Load as Unpacked Extension (Development)

1. **Open Chrome Extensions page**
   - Navigate to `chrome://extensions/` in your address bar
   - Or click the menu → More tools → Extensions

2. **Enable Developer Mode**
   - Toggle "Developer mode" switch in the top-right corner

3. **Load the Extension**
   - Click **"Load unpacked"** button (appears after enabling Developer mode)
   - Select the `Chrome Extension` folder from this project
   - Click "Select" (or "Open")

4. **Verify Installation**
   - The SpeedReader extension should appear in your extensions list
   - You should see the extension icon in your toolbar

**Note:** If you rebuild the main SpeedReader app (`npm run build`), you'll need to copy the new `dist/assets/` files to the extension folder to update the bundled app.

### Option 2: Install from Chrome Web Store (Production)

> ⚠️ **Coming soon** — The extension is not yet published to the Chrome Web Store.

Once published, you will be able to install it directly from the Chrome Web Store.

---

## Usage Guide

### Sending Text to SpeedReader

There are two ways to use the extension:

#### Method 1: Context Menu (Recommended)

1. **Navigate to any webpage** with text you want to read
2. **Select the text** by clicking and dragging your cursor
3. **Right-click** on the highlighted text
4. Click **"Send to SpeedReader"** from the context menu
5. A new tab opens with SpeedReader and your text automatically loads

#### Method 2: Extension Popup

1. Click the **SpeedReader icon** in your Chrome toolbar
2. Click **"Open SpeedReader"** button in the popup
3. The SpeedReader app opens in a new tab

### Reading Your Text

Once SpeedReader opens:

1. Your text is automatically loaded and ready
2. Use the **speed controls** to adjust WPM (words per minute)
3. Click **Pause** or **Reset** to control playback

---

## Updating the Bundled App

When you make changes to the main SpeedReader app, update the extension:

### Step 1: Rebuild

```bash
npm run build
```

### Step 2: Copy Assets

```bash
cp -r dist/assets/* "Chrome Extension/assets/"
```

> **Note:** Asset filenames include content hashes. Make sure `reader.html` points to the correct files.

### Step 3: Reload Extension

1. Go to `chrome://extensions/`
2. Find SpeedReader in the list
3. Click the **refresh icon** ↻ (or press `Cmd+R` / `Ctrl+R`)

---

## Troubleshooting

### Extension Not Appearing

- Make sure "Developer mode" is enabled at `chrome://extensions/`
- Check that you selected the correct folder (`Chrome Extension`, not the parent)
- Try refreshing the extensions page (`Cmd+R` / `Ctrl+R`)

### "Send to SpeedReader" Not Showing

- Ensure you've selected text (highlighted) before right-clicking
- Some websites block context menus (try a different site)
- Reload the page and try again

### App Not Loading

- Check that the `assets/` folder exists inside `Chrome Extension/`
- Verify `reader.html` points to the correct asset filenames
- Open browser console (F12) to see error messages
- Reload the extension on `chrome://extensions/`

### Text Not Appearing

- Make sure text was selected before sending
- Very long text may be truncated by URL limits
- Try selecting a smaller portion

---

## Configuration

No configuration required! The extension works out of the box.

### Using a Hosted Version Instead

If you prefer a hosted SpeedReader instead of the bundled app:

1. Open `background.js`
2. Find line 14:
   ```javascript
   const readerUrl = chrome.runtime.getURL('reader.html');
   ```
3. Replace with your hosted URL:
   ```javascript
   const readerUrl = 'https://your-speedreader-url.com';
   ```
4. Save and reload the extension

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

1. **Context Menu Registration**: When installed, the extension registers a context menu item that appears when you right-click selected text
2. **Text Capture**: When you click "Send to SpeedReader", the selected text is captured from the page
3. **URL Encoding**: The text is URL-encoded and appended as a query parameter to the local reader URL
4. **Local Navigation**: A new tab opens with `chrome-extension://[id]/reader.html?text=...`
5. **App Initialization**: The bundled SpeedReader app reads the text from the URL parameter and starts automatically

---

## Permissions Explained

The extension requires minimal permissions:

| Permission | Purpose |
|------------|---------|
| `contextMenus` | Add the right-click menu item |
| `activeTab` | Access the currently active tab |
| `scripting` | Reserved for future enhancements |

**Privacy**: The extension does not send your data anywhere. Text processing happens entirely locally.

---

## Development

### Making Changes

1. **Modify source files** in the `Chrome Extension/` folder
2. **Test changes**:
   - Go to `chrome://extensions/`
   - Find SpeedReader
   - Click the **refresh icon** ↻
3. **For main app changes**: Rebuild with `npm run build` and copy assets

### Debugging

- **Background script**: Go to `chrome://extensions/` → Click "service worker" on SpeedReader card
- **Popup**: Right-click extension icon → "Inspect popup"
- **Reader page**: Open SpeedReader tab → Press `F12` for DevTools

## License

MIT License - Same as the main SpeedReader project
