document.addEventListener('DOMContentLoaded', () => {
    
    // 1. PAGE FADE IN
    setTimeout(() => { document.body.classList.add('loaded'); }, 50);

    // 2. MAGNETIC CURSOR
    const cursor = document.getElementById('cursor');
    if(cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        const magnetTargets = document.querySelectorAll('a, button, .project-item, .service-card, .email-premium-card, .reel-card, .scroll-nav-btn');
        magnetTargets.forEach(target => {
            target.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
            target.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
        });
    }

    // 3. SMOOTH PAGE TRANSITION
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            const target = link.getAttribute('target');
            if (href && !href.startsWith('#') && target !== '_blank' && !href.includes('mailto:')) {
                e.preventDefault();
                document.body.classList.remove('loaded');
                setTimeout(() => { window.location.href = href; }, 500);
            }
        });
    });

    // 4. LIGHTBOX LOGIC (FIXED)
    const lightbox = document.getElementById('video-lightbox');
    const closeBtn = document.getElementById('close-btn');
    const videoFrame = document.getElementById('video-frame');
    
    // Select BOTH project items AND reel cards
    const projectItems = document.querySelectorAll('.project-item, .reel-card');

    if (lightbox) {
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

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            setTimeout(() => { videoFrame.src = ''; }, 300); // Stop audio
            document.body.style.overflow = 'auto'; // Restore scrolling
        };

        if(closeBtn) closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
    }

    // 5. EMAIL COPY
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

    // 6. COLOR COMPARISON SLIDER
    const sliderContainer = document.querySelector('.comparison-container');
    const rawLayer = document.querySelector('.img-layer.raw');
    const sliderHandle = document.getElementById('slider-handle');

    if (sliderContainer && rawLayer && sliderHandle) {
        let isDragging = false;

        const updateSlider = (x) => {
            const rect = sliderContainer.getBoundingClientRect();
            let pos = x - rect.left;
            if (pos < 0) pos = 0;
            if (pos > rect.width) pos = rect.width;
            const percent = (pos / rect.width) * 100;

            sliderHandle.style.left = percent + "%";
            const clipAmount = 100 - percent; 
            rawLayer.style.clipPath = `inset(0 ${clipAmount}% 0 0)`;
        };

        sliderContainer.addEventListener('mousedown', (e) => {
            isDragging = true;
            updateSlider(e.clientX);
        });
        window.addEventListener('mouseup', () => { isDragging = false; });
        window.addEventListener('mousemove', (e) => { if (isDragging) updateSlider(e.clientX); });
        
        sliderContainer.addEventListener('touchstart', (e) => { isDragging = true; updateSlider(e.touches[0].clientX); }, { passive: false });
        window.addEventListener('touchend', () => { isDragging = false; });
        window.addEventListener('touchmove', (e) => { if (isDragging) updateSlider(e.touches[0].clientX); }, { passive: false });
    }

    // 7. REELS SCROLL BUTTONS
    const reelsStrip = document.querySelector('.reels-strip');
    const btnLeft = document.querySelector('.scroll-nav-btn.left');
    const btnRight = document.querySelector('.scroll-nav-btn.right');

    if (reelsStrip && btnLeft && btnRight) {
        btnLeft.addEventListener('click', () => {
            reelsStrip.scrollBy({ left: -1120, behavior: 'smooth' });
        });
        btnRight.addEventListener('click', () => {
            reelsStrip.scrollBy({ left: 1120, behavior: 'smooth' });
        });
    }
});