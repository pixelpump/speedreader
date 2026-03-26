chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'sendToSpeedReader',
    title: 'Send to SpeedReader',
    contexts: ['selection']
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'sendToSpeedReader' && info.selectionText) {
    const selectedText = info.selectionText;
    
    // Open the bundled SpeedReader app in a new tab
    const readerUrl = chrome.runtime.getURL('reader.html');
    
    // Pass text via URL parameter
    const encodedText = encodeURIComponent(selectedText);
    const url = `${readerUrl}?text=${encodedText}`;
    
    chrome.tabs.create({ url });
  }
});
