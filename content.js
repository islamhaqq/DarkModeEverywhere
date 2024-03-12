const invertColors = () => {
    const style = document.createElement('style');
    style.innerHTML = `
        html {
        filter: invert(100%) hue-rotate(180deg);
        }
        img, video {
        filter: invert(100%) hue-rotate(180deg);
        }`;
    document.head.appendChild(style);
};
  
// Run the inversion script when the document is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', invertColors);
} else {
    invertColors();
}
