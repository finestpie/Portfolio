document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('video-lightbox');
    const closeBtn = document.getElementById('close-btn');
    const videoFrame = document.getElementById('video-frame');
    const projectItems = document.querySelectorAll('.project-item');

    // Open Lightbox
    projectItems.forEach(item => {
        item.addEventListener('click', () => {
            const videoSrc = item.getAttribute('data-video');
            if (videoSrc) {
                videoFrame.src = videoSrc;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; // Stop background scrolling
            }
        });
    });

    // Close Lightbox Function
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        videoFrame.src = ''; // Stop video
        document.body.style.overflow = 'auto'; // Restore scrolling
    };

    // Event Listeners for Closing
    closeBtn.addEventListener('click', closeLightbox);
    
    // Close if clicking outside the video
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // --- LIGHTBOX LOGIC (Keep existing code here) ---
    const lightbox = document.getElementById('video-lightbox');
    const closeBtn = document.getElementById('close-btn');
    const videoFrame = document.getElementById('video-frame');
    const projectItems = document.querySelectorAll('.project-item');

    if(lightbox) {
        projectItems.forEach(item => {
            item.addEventListener('click', () => {
                const videoSrc = item.getAttribute('data-video');
                if (videoSrc) {
                    videoFrame.src = videoSrc;
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            videoFrame.src = '';
            document.body.style.overflow = 'auto';
        };

        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
        });
    }

    // --- NEW: EMAIL COPY LOGIC ---
    const emailBtn = document.getElementById('email-btn');
    
    if (emailBtn) {
        emailBtn.addEventListener('click', () => {
            const email = emailBtn.getAttribute('data-email');
            const tooltip = emailBtn.querySelector('.tooltip');
            
            navigator.clipboard.writeText(email).then(() => {
                // Change tooltip text temporarily
                const originalText = tooltip.innerText;
                tooltip.innerText = "Copied!";
                emailBtn.classList.add('copied');

                setTimeout(() => {
                    tooltip.innerText = originalText;
                    emailBtn.classList.remove('copied');
                }, 2000);
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. PAGE FADE-IN (Entry) ---
    // Slight delay to ensure elements are ready, then show body
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 50);

    // --- 2. SMOOTH PAGE SWITCHING (Exit) ---
    // Find all links on the page
    const links = document.querySelectorAll('a');

    links.forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            const target = link.getAttribute('target');

            // Only run transition if it's an internal link (not #hashtags or external sites)
            if (href && !href.startsWith('#') && target !== '_blank' && !href.includes('mailto:')) {
                e.preventDefault(); // Stop immediate jump

                // 1. Fade OUT the current page
                document.body.classList.remove('loaded');

                // 2. Wait for fade out (500ms), then go to new page
                setTimeout(() => {
                    window.location.href = href;
                }, 500); 
            }
        });
    });

    // --- 3. LIGHTBOX LOGIC (Your existing video player code) ---
    const lightbox = document.getElementById('video-lightbox');
    const closeBtn = document.getElementById('close-btn');
    const videoFrame = document.getElementById('video-frame');
    const projectItems = document.querySelectorAll('.project-item');

    if (lightbox) {
        projectItems.forEach(item => {
            item.addEventListener('click', () => {
                const videoSrc = item.getAttribute('data-video');
                if (videoSrc) {
                    videoFrame.src = videoSrc;
                    lightbox.classList.add('active');
                }
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            // Small delay to clear source so audio stops completely
            setTimeout(() => { videoFrame.src = ''; }, 300);
        };

        if(closeBtn) closeBtn.addEventListener('click', closeLightbox);
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
        });
    }

    // --- 4. COPY TO CLIPBOARD LOGIC ---
    const emailBtn = document.getElementById('email-btn');
    if (emailBtn) {
        emailBtn.addEventListener('click', () => {
            const email = emailBtn.getAttribute('data-email');
            const tooltip = emailBtn.querySelector('.tooltip');
            
            navigator.clipboard.writeText(email).then(() => {
                const originalText = tooltip.innerText;
                tooltip.innerText = "Copied!";
                setTimeout(() => { tooltip.innerText = originalText; }, 2000);
            });
        });
    }
});


// --- 4. COPY TO CLIPBOARD LOGIC ---
    const emailBtn = document.getElementById('email-btn');
    if (emailBtn) {
        emailBtn.addEventListener('click', () => {
            const email = emailBtn.getAttribute('data-email');
            
            // Note: We are targeting the new .copy-pill class which has the "tooltip" class as well
            const tooltip = emailBtn.querySelector('.tooltip'); 
            
            navigator.clipboard.writeText(email).then(() => {
                const originalText = tooltip.innerText;
                tooltip.innerText = "Copied!";
                
                // Optional: Change style slightly to indicate success
                tooltip.style.background = "#4ade80"; // Green tint
                tooltip.style.color = "#000";

                setTimeout(() => { 
                    tooltip.innerText = originalText; 
                    tooltip.style.background = ""; // Reset style
                    tooltip.style.color = "";
                }, 2000);
            });
        });
    }