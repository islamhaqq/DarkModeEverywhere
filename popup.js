document.getElementById('toggleDarkMode').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'toggleDarkMode();'}
      );
    });
  });

document.getElementById('excludeSite').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const url = new URL(tabs[0].url);
        const hostname = url.hostname;
        chrome.storage.local.get(['darkModeExclusions'], function(result) {
        const exclusions = result.darkModeExclusions || [];
        if (!exclusions.includes(hostname)) {
            exclusions.push(hostname);
            chrome.storage.local.set({darkModeExclusions: exclusions}, function() {
                alert('This site has been excluded from dark mode.');
                // Optionally refresh the tab for the change to take effect immediately.
                chrome.tabs.reload(tabs[0].id);
            });
        }
        });
    });
});
  