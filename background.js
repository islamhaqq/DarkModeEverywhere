// Listen for extension installation
chrome.runtime.onInstalled.addListener(() => {
    console.log('Dark Mode Everywhere installed.');
    // Default settings can be set here if needed
});
  

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.action === "toggleDarkMode") {
          applyOrRemoveDarkMode();
      }
    }
  );
  