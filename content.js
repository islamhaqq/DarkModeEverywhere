(function() {
    const hostname = window.location.hostname;

    function applyOrRemoveDarkMode(callback) {
        chrome.storage.local.get(['darkModeExclusions'], function(result) {
            const exclusions = result.darkModeExclusions || [];
            const isExcluded = exclusions.includes(hostname);
            const isDarkThemeCurrently = isDarkTheme();

            if (!isExcluded && !isDarkThemeCurrently) {
                applyDarkMode();
            } else if (isExcluded && isDarkThemeCurrently) {
                removeDarkMode();
            }
        });
    }

    // Define a function to remove dark mode (by removing or adjusting the relevant styles)
    function removeDarkMode() {
        // Target the style element added for dark mode
        const style = document.head.querySelector('style#dark-mode-style'); 
        if (style) {
            document.head.removeChild(style);
        }
    }

    // Function to check if the current theme is dark
    function isDarkTheme() {
        const bgColor = getComputedStyle(document.body).backgroundColor;
        const colorValues = bgColor.match(/\d+/g); // Extract RGB values
        if (!colorValues) return false; // Default to light if no background color is defined
        
        // Simple algorithm to check if background is dark: 
        // Convert RGB to brightness value using a formula
        const brightness = Math.round(((parseInt(colorValues[0]) * 299) +
                                       (parseInt(colorValues[1]) * 587) +
                                       (parseInt(colorValues[2]) * 114)) / 1000);
        return brightness < 128; // Dark if brightness is less than 128
    }

    // Function to apply dark mode by inverting colors
    function applyDarkMode() {
        // Remove existing style if it exists to avoid duplicates
        removeDarkMode(); // Ensure there's no existing dark mode style before applying a new one

        const style = document.createElement('style');
        style.id = 'dark-mode-style'; // Assign an ID to the style for easy identification and removal
        style.innerHTML = `
        html {
            filter: invert(100%) hue-rotate(180deg);
        }
        img, video {
            filter: invert(100%) hue-rotate(180deg);
        }`;
        document.head.appendChild(style);
    }


    // Main logic to determine if dark mode should be applied
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyOrRemoveDarkMode);
    } else {
        applyOrRemoveDarkMode();
    }
})();
