// Multilingual support
const supportedLangs = ['fr', 'en', 'ar'];
let currentLang = 'fr';

function setLang(lang) {
    if (!supportedLangs.includes(lang)) return;
    currentLang = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    // Update all elements with data-lang attributes
    document.querySelectorAll('[data-fr]').forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`);
    });

    // Update placeholders
    const searchInput = document.getElementById('tracking-number');
    if (searchInput) {
        searchInput.placeholder =
            lang === 'fr' ? 'Numéro de suivi...' :
            lang === 'en' ? 'Tracking number...' :
            'رقم التتبع...';
    }

    // Update button active state
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
}

// Language selector event
const langBtns = document.querySelectorAll('.lang-btn');
langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        setLang(btn.getAttribute('data-lang'));
    });
});

// Mobile menu toggle
const mobileToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');
if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Tracking logic (demo only)
const trackBtn = document.getElementById('track-btn');
const trackingInput = document.getElementById('tracking-number');
const trackingResults = document.getElementById('tracking-results');
const trackingNumberDisplay = document.querySelector('.tracking-number-display');
const statusText = document.querySelector('.status-text');

const statuses = [
    'En cours de livraison',
    'Livré',
    'Refusé par le client',
    'Retardé',
    'En attente de prise en charge'
];

function showTrackingResult(number) {
    if (!trackingResults) return;
    trackingResults.style.display = 'block';
    if (trackingNumberDisplay) trackingNumberDisplay.textContent = number;
    // Random status for demo
    const idx = Math.floor(Math.random() * statuses.length);
    if (statusText) statusText.textContent = statuses[idx];
}

if (trackBtn && trackingInput) {
    trackBtn.addEventListener('click', () => {
        const val = trackingInput.value.trim();
        if (val.length > 0) {
            showTrackingResult(val);
        }
    });
    trackingInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            trackBtn.click();
        }
    });
}

// Set default language on load
document.addEventListener('DOMContentLoaded', () => {
    setLang(currentLang);
}); 