document.getElementById('toggleDarkMode').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'toggleDarkMode();'}
      );
    });
  });

  document.getElementById('toggleSite').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const url = new URL(tabs[0].url);
        const hostname = url.hostname;
        chrome.storage.local.get(['darkModeExclusions'], function(result) {
            let exclusions = result.darkModeExclusions || [];
            if (exclusions.includes(hostname)) {
                // Remove from exclusions
                exclusions = exclusions.filter(h => h !== hostname);
            } else {
                // Add to exclusions
                exclusions.push(hostname);
            }
            chrome.storage.local.set({darkModeExclusions: exclusions}, function() {
                // Communicate the change to the content script
                chrome.tabs.sendMessage(tabs[0].id, {action: "toggleDarkMode"});
            });
        });
    });
});
