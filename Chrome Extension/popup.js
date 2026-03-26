// Popup script for SpeedReader extension
document.addEventListener('DOMContentLoaded', () => {
  // Update the button URL to match the current environment
  const button = document.querySelector('.button');
  
  // Check if we have any stored settings
  chrome.storage.local.get(['speedreaderUrl'], (result) => {
    if (result.speedreaderUrl) {
      button.href = result.speedreaderUrl;
    }
  });
});
