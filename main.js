document.addEventListener('DOMContentLoaded', () => {
    // INTRO ANIMATION
    const introOverlay = document.getElementById('intro-overlay');
    
    if (introOverlay) {
        setTimeout(() => {
            introOverlay.style.opacity = '0';
            setTimeout(() => {
                introOverlay.style.display = 'none';
            }, 800);
        }, 2500); 
    }
    console.log('Portfolio Loaded');
});