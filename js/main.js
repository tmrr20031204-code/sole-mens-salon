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

// --- QR Code ---
function showQrCode() {
    const qrModal = document.getElementById('qrModal');
    const qrImage = document.getElementById('qrImage');
    const currentUrl = encodeURIComponent(window.location.href);
    qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${currentUrl}`;
    qrModal.classList.remove('hidden');
}

function closeQrCode() {
    document.getElementById('qrModal').classList.add('hidden');
}

// --- PWA Install ---
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
});

function installPWA() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            }
            deferredPrompt = null;
        });
    } else {
        const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        if (isIos) {
            alert('iPhoneの場合は、画面下部の「共有（四角から矢印が飛び出したマーク）」ボタンから「ホーム画面に追加」を選択してください。');
        } else {
            alert('すでにホーム画面に追加されているか、ブラウザのメニューから「ホーム画面に追加」を選択してください。');
        }
    }
}
