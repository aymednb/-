// Language Configuration
const translations = {
    en: {
      nav: {
        home: 'Home',
        vip: 'VIP Store',
        rules: 'Rules',
        whitelist: 'Whitelist',
        staff: 'Staff Team',
        news: 'News'
      },
      hero: {
        title: 'DZ WORLD ROLEPLAY',
        subtitle: 'Experience Immersive FiveM Roleplay',
        join: 'Join Now'
      }
    },
    fr: {
      nav: {
        home: 'Accueil',
        vip: 'Boutique VIP',
        rules: 'Règles',
        whitelist: 'Liste Blanche',
        staff: 'Équipe',
        news: 'Actualités'
      },
      hero: {
        title: 'DZ WORLD ROLEPLAY',
        subtitle: 'Vivez une Expérience Roleplay FiveM Immersive',
        join: 'Rejoindre'
      }
    }
  };
  
  // Initialize i18next
  i18next.init({
    lng: 'en',
    resources: translations
  }).then(() => {
    updateContent();
  });
  
  // Mobile Menu Toggle
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  
  mobileMenuButton.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden');
    
    // Update menu icon
    menuIcon.innerHTML = isOpen 
      ? `<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>`
      : `<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>`;
  });
  
  // Language Toggle
  const languageToggle = document.getElementById('language-toggle');
  const languageToggleMobile = document.querySelector('.language-toggle-mobile');
  
  function toggleLanguage() {
    const currentLang = i18next.language;
    const newLang = currentLang === 'en' ? 'fr' : 'en';
    i18next.changeLanguage(newLang).then(updateContent);
  }
  
  languageToggle.addEventListener('click', toggleLanguage);
  languageToggleMobile.addEventListener('click', toggleLanguage);
  
  // Update Content
  function updateContent() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      element.textContent = i18next.t(key);
    });
  }
  
  // Intersection Observer for Animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, {
    threshold: 0.1
  });
  
  document.querySelectorAll('.feature-card').forEach(card => {
    observer.observe(card);
  });