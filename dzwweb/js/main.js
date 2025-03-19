document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Language switching
    let currentLang = 'en';
    const langToggle = document.getElementById('languageToggle');
    const langText = document.getElementById('langText');

    function updateLanguage(lang) {
        currentLang = lang;
        langText.textContent = lang.toUpperCase();
        
        // Update all translatable elements
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.dataset.translate;
            const keys = key.split('.');
            let translation = translations[lang];
            
            for (const k of keys) {
                translation = translation[k];
            }
            
            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
    }

    langToggle.addEventListener('click', () => {
        const newLang = currentLang === 'en' ? 'fr' : 'en';
        updateLanguage(newLang);
    });

    // Discord webhook functionality
    function sendToDiscord(webhookUrl, data) {
        fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.ok ? console.log('Message sent successfully') : console.error('Failed to send message'))
        .catch(error => console.error('Error:', error));
    }

    // Example webhook function for whitelist applications
    window.submitWhitelist = function(form) {
        const formData = new FormData(form);
        const data = {
            embeds: [{
                title: 'New Whitelist Application',
                fields: Array.from(formData.entries()).map(([key, value]) => ({
                    name: key,
                    value: value.toString(),
                    inline: true
                })),
                color: 3447003,
                timestamp: new Date().toISOString()
            }]
        };
        
        sendToDiscord(config.discordWebhook.whitelist, data);
        return false; // Prevent form submission
    };

    // Smooth scroll functionality
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Initialize with English
    updateLanguage('en');
});