// Background service worker for context menu
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
    
    // Get the speedreader URL - use the hosted version or local development
    // For production, this should be the deployed URL
    const speedreaderUrl = 'https://speedreader.example.com';
    
    // Open speedreader in a new tab with the text as a query parameter
    const encodedText = encodeURIComponent(selectedText);
    const url = `${speedreaderUrl}?text=${encodedText}`;
    
    chrome.tabs.create({ url });
  }
});
