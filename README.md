# Reddit Blocker - Chrome Extension

A Chrome extension that blocks access to Reddit.

## Features

- 🛑 **Blocks Reddit Access**: Automatically redirects any attempt to visit reddit.com, old.reddit.com, new.reddit.com, or redd.it to a motivational blocked page
- 📊 **Statistics Tracking**: Tracks how many pages have been blocked and search results hidden
- 🎛️ **Toggle On/Off**: Easy toggle switch in the popup to enable/disable blocking
- 💪 **Motivational Messages**: Shows inspirational quotes on the blocked page

## Screenshots

<img width="2559" height="1232" alt="image" src="https://github.com/user-attachments/assets/249ff10e-1234-4087-ad8f-862a7f63004c" />
<img width="351" height="400" alt="image" src="https://github.com/user-attachments/assets/681a6681-a37c-4a7a-9985-23318458fc07" />



## Installation

### Method 1: Load as Unpacked Extension (Developer Mode)

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** in the top right corner
3. Click **Load unpacked**
4. Select the `redditblocker` folder
5. The extension should now appear in your extensions list

### Method 2: Create Icons First (Recommended)

Before loading the extension, you need PNG icons. You can:

1. **Use an online converter**: Convert the SVG file at `icons/icon16.svg` to PNG files at 16x16, 48x48, and 128x128 pixels
2. **Use any image editing software**: Create simple icons with an "X" or block symbol
3. **Use these placeholder commands** (requires ImageMagick):
   ```bash
   convert -size 16x16 xc:#ff4500 icons/icon16.png
   convert -size 48x48 xc:#ff4500 icons/icon48.png
   convert -size 128x128 xc:#ff4500 icons/icon128.png
   ```

Or simply create any 16x16, 48x48, and 128x128 pixel PNG images named `icon16.png`, `icon48.png`, and `icon128.png` in the `icons` folder.

## Usage

1. Click the Reddit Blocker icon in your Chrome toolbar
2. Use the toggle switch to enable/disable blocking
3. View your blocking statistics in the popup
4. Try visiting reddit.com - you'll see the blocked page!


## How It Works

### Blocking Reddit
The extension uses Chrome's Declarative Net Request API to intercept and redirect any requests to Reddit domains before they're made. This is efficient and works even in the background.


## Privacy

This extension:
- Does NOT collect any personal data
- Does NOT send any data to external servers
- Only stores statistics locally in Chrome's storage
- Only has access to reddit.com domains

## Troubleshooting

**Extension not blocking Reddit?**
- Make sure the extension is enabled in `chrome://extensions/`
- Check that the toggle in the popup is turned on
- Try reloading the extension

**Icons not showing?**
- Make sure you have PNG files (not just SVG) in the icons folder
- The files must be named exactly: `icon16.png`, `icon48.png`, `icon128.png`

## License

MIT License - Feel free to modify and distribute!
