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