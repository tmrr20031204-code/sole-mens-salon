document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');

    const toggleMenu = () => {
        hamburger.classList.toggle('is-active');
        mobileMenu.classList.toggle('is-active');
        document.body.style.overflow = mobileMenu.classList.contains('is-active') ? 'hidden' : '';
    };

    hamburger.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });


    // --- Intersection Observer for Scroll Animations ---
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once faded in to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        observer.observe(el);
    });

});

// --- Share Functions ---
function shareCopy() {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl).then(() => {
        alert('URLをコピーしました！');
    }).catch(err => {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = shareUrl;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            alert('URLをコピーしました！');
        } catch (err) {
            alert('コピーに失敗しました。');
        }
        document.body.removeChild(textArea);
    });
}

function shareLine() {
    window.open('https://line.me/R/msg/text/?' + encodeURIComponent(window.location.href), '_blank');
}

function shareSms() {
    const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const separator = isIos ? '&' : '?';
    window.open('sms:' + separator + 'body=' + encodeURIComponent('Men\'s Salon SOLE のサイトはこちら\n' + window.location.href), '_self');
}
