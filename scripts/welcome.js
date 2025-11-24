// Welcome Animation Controller
document.addEventListener('DOMContentLoaded', function() {
    console.log('Welcome animation initialized');
    
    const welcomeAnimation = document.getElementById('welcomeAnimation');
    const mainContent = document.getElementById('mainContent');
    
    // Check if elements exist
    if (!welcomeAnimation) {
        console.error('Welcome animation element not found!');
        return;
    }
    
    // Function to hide animation and show main content
    function completeAnimation() {
        console.log('Completing welcome animation');
        
        // Add hidden class to trigger fade out
        welcomeAnimation.classList.add('hidden');
        
        // Show main content after animation
        setTimeout(() => {
            if (mainContent) {
                mainContent.style.display = 'block';
            }
            
            // Remove element from DOM after animation completes
            setTimeout(() => {
                welcomeAnimation.style.display = 'none';
                console.log('Welcome animation completed and removed');
            }, 800);
        }, 500);
    }
    
    // Auto-complete after 4 seconds (1s buffer for loading animation)
    const autoCompleteTimer = setTimeout(completeAnimation, 4000);
    
    // Skip animation function (global for HTML onclick)
    window.skipAnimation = function() {
        console.log('Skipping animation');
        clearTimeout(autoCompleteTimer); // Clear the auto timer
        completeAnimation();
    };
    
    // Skip on keyboard press
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape' || e.key === 'Spacebar') {
            console.log('Skipping via keyboard: ' + e.key);
            skipAnimation();
        }
    });
    
    // Skip on click/tap anywhere (except the skip button)
    welcomeAnimation.addEventListener('click', function(e) {
        // Only skip if not clicking the skip button
        if (!e.target.classList.contains('skip-button') && 
            !e.target.closest('.skip-button')) {
            console.log('Skipping via background click');
            skipAnimation();
        }
    });
    
    // Emergency fallback - hide after 8 seconds no matter what
    setTimeout(() => {
        if (welcomeAnimation.style.display !== 'none' && 
            !welcomeAnimation.classList.contains('hidden')) {
            console.warn('Emergency fallback - forcing animation completion');
            completeAnimation();
        }
    }, 8000);
    
    // Log when everything is ready
    console.log('Welcome animation ready. Auto-complete in 4 seconds.');
});

// Optional: If you want to manually trigger the animation completion from other scripts
window.hideWelcomeAnimation = function() {
    const welcomeAnimation = document.getElementById('welcomeAnimation');
    if (welcomeAnimation) {
        welcomeAnimation.classList.add('hidden');
        setTimeout(() => {
            welcomeAnimation.style.display = 'none';
        }, 800);
    }
};