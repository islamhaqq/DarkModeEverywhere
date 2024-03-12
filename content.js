(function() {
    const hostname = window.location.hostname;

    function shouldApplyDarkMode(callback) {
        chrome.storage.local.get(['darkModeExclusions'], function(result) {
            const exclusions = result.darkModeExclusions || [];
            callback(!exclusions.includes(hostname));
        });
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
        const style = document.createElement('style');
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
        document.addEventListener('DOMContentLoaded', () => {
            shouldApplyDarkMode(apply => {
                if (apply && !isDarkTheme()) {
                    applyDarkMode();
                }
            });
        });
    } else {
        shouldApplyDarkMode(apply => {
            if (apply && !isDarkTheme()) {
                applyDarkMode();
            }
        });
    }
})();
