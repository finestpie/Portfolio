document.addEventListener('DOMContentLoaded', () => {
    
    // 1. PAGE FADE IN (Liquid Entry)
    setTimeout(() => { document.body.classList.add('loaded'); }, 50);

    // 2. MAGNETIC CURSOR LOGIC
    const cursor = document.getElementById('cursor');
    
    if(cursor) {
        // Move cursor with mouse
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // "Magnet" Targets - these trigger the snap/grow effect
        const magnetTargets = document.querySelectorAll('a, button, .project-item, .service-card, .email-premium-card, .reel-card');
        
        magnetTargets.forEach(target => {
            target.addEventListener('mouseenter', () => {
                document.body.classList.add('hovering');
            });
            target.addEventListener('mouseleave', () => {
                document.body.classList.remove('hovering');
            });
        });
    }

    // 3. SMOOTH PAGE TRANSITION INTERCEPTOR
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            const target = link.getAttribute('target');

            // Only intercept internal links
            if (href && !href.startsWith('#') && target !== '_blank' && !href.includes('mailto:')) {
                e.preventDefault();
                document.body.classList.remove('loaded'); // Fade Out
                setTimeout(() => { window.location.href = href; }, 500); // Wait 500ms then go
            }
        });
    });

    // 4. LIGHTBOX LOGIC
    const lightbox = document.getElementById('video-lightbox');
    const closeBtn = document.getElementById('close-btn');
    const videoFrame = document.getElementById('video-frame');
    const projectItems = document.querySelectorAll('.project-item, .reel-card'); // Added reels to lightbox

    if (lightbox) {
        projectItems.forEach(item => {
            item.addEventListener('click', () => {
                const videoSrc = item.getAttribute('data-video');
                if (videoSrc) {
                    videoFrame.src = videoSrc;
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Lock Scroll
                }
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            setTimeout(() => { videoFrame.src = ''; }, 300); // Stop Audio
            document.body.style.overflow = 'auto'; // Unlock Scroll
        };

        if(closeBtn) closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
    }

    // 5. EMAIL COPY LOGIC
    const emailBtn = document.getElementById('email-btn');
    if (emailBtn) {
        emailBtn.addEventListener('click', () => {
            const email = emailBtn.getAttribute('data-email');
            const tooltip = emailBtn.querySelector('.tooltip');
            
            navigator.clipboard.writeText(email).then(() => {
                const originalText = tooltip.innerText;
                tooltip.innerText = "COPIED!";
                tooltip.style.background = "#fff";
                tooltip.style.color = "#000";
                
                setTimeout(() => { 
                    tooltip.innerText = originalText; 
                    tooltip.style.background = ""; 
                    tooltip.style.color = ""; 
                }, 2000);
            });
        });
    }
});