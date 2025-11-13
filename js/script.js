document.addEventListener("DOMContentLoaded", () => {

    /**
     * Initializes and manages the interactive elements of the portfolio page.
     */
    const AppController = {
        
        /**
         * Initializes all functionalities.
         */
        async init() {
            this.createParticles();
            this.initFadeInObserver();
            this.initSmoothScroll();
            this.initActiveLinkObserver();
            this.initThemeToggle();
            this.initMobileMenu();
            await this.initLanguageSelector();
            this.initClickOutsideClosers();
        },

        /**
         * Creates and animates background particles.
         */
        createParticles() {
            const particleContainer = document.getElementById('global-particle-background');
            if (!particleContainer) return;

            const particleCount = 30;
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('span');
                particle.classList.add('particle');

                const size = Math.random() * 5 + 3;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.top = `${Math.random() * 100}%`;
                particle.style.left = `${Math.random() * 100}%`;

                const duration = Math.random() * 10 + 15;
                const delay = Math.random() * -20;

                particle.style.animationDuration = `${duration}s`;
                particle.style.animationDelay = `${delay}s`;

                if (i % 2 === 0) {
                    particle.style.animationDirection = 'reverse';
                }
                particleContainer.appendChild(particle);
            }
        },

        /**
         * Sets up an IntersectionObserver to fade in elements as they become visible.
         */
        initFadeInObserver() {
            const fadeInObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.fade-in').forEach(el => fadeInObserver.observe(el));
        },

        /**
         * Attaches smooth scroll behavior to all anchor links pointing to sections.
         */
        initSmoothScroll() {
            document.querySelectorAll('a[href^="#"]').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.smoothScrollTo(link.getAttribute('href'));
                });
            });
        },

        /**
         * Scrolls smoothly to a target element on the page.
         * @param {string} targetId - The ID of the target element (e.g., "#about").
         */
        smoothScrollTo(targetId) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        },

        /**
         * Sets up an IntersectionObserver to update the active navigation link based on scroll position.
         */
        initActiveLinkObserver() {
            const sections = document.querySelectorAll('section[id]');
            const navActiveObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('id');
                        document.querySelectorAll('.nav-menu a').forEach(link => {
                            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                        });
                    }
                });
            }, { rootMargin: '-30% 0px -70% 0px' });

            sections.forEach(section => navActiveObserver.observe(section));
        },

        /**
         * Manages the theme (dark/light mode) toggle functionality.
         */
        initThemeToggle() {
            const themeToggle = document.getElementById('theme-toggle');
            const body = document.body;
            const icon = themeToggle.querySelector('.material-icons-outlined');

            const savedTheme = localStorage.getItem('theme') || 'dark';
            body.dataset.theme = savedTheme;
            icon.textContent = savedTheme === 'dark' ? 'light_mode' : 'dark_mode';


            themeToggle.addEventListener('click', () => {
                const newTheme = body.dataset.theme === 'dark' ? 'light' : 'dark';
                body.dataset.theme = newTheme;
                localStorage.setItem('theme', newTheme);
                icon.textContent = newTheme === 'dark' ? 'light_mode' : 'dark_mode';
            });
        },

        /**
         * Handles the mobile navigation menu toggle and link clicks.
         */
        initMobileMenu() {
            const menuToggleButton = document.querySelector('.menu-toggle');
            const mobileMenu = document.getElementById('mobile-menu');
            
            if (!menuToggleButton || !mobileMenu) return;

            menuToggleButton.addEventListener('click', () => {
                const isOpen = mobileMenu.classList.toggle('open');
                menuToggleButton.querySelector('.material-icons-outlined').textContent = isOpen ? 'close' : 'menu';
            });

            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('open');
                    menuToggleButton.querySelector('.material-icons-outlined').textContent = 'menu';
                    // Smooth scroll is already handled by initSmoothScroll
                });
            });
        },

        /**
         * Manages the language selection dropdown.
         */
        async initLanguageSelector() {
            const langSelector = document.querySelector('.language-selector');
            if (!langSelector) return;

            const langToggleButton = document.getElementById('lang-toggle');
            const langOptions = langSelector.querySelectorAll('.lang-dropdown button');
            
            const savedLang = localStorage.getItem('language') || 'pt';
            await this.loadLanguage(savedLang);

            langToggleButton.addEventListener('click', (e) => {
                e.stopPropagation();
                langSelector.classList.toggle('open');
            });

            langOptions.forEach(option => {
                option.addEventListener('click', async (e) => {
                    const lang = e.target.getAttribute('data-lang');
                    await this.loadLanguage(lang);
                    
                    langOptions.forEach(opt => opt.classList.remove('active'));
                    e.target.classList.add('active');
                    
                    langSelector.classList.remove('open');
                });
            });
        },

        async loadLanguage(lang) {
            try {
                const response = await fetch(`languages/${lang}.json`);
                if (!response.ok) {
                    throw new Error(`Could not load language file: ${lang}.json`);
                }
                const translations = await response.json();
                this.applyTranslations(translations);
                localStorage.setItem('language', lang);
                document.documentElement.lang = lang;

                // Update active button
                const langOptions = document.querySelectorAll('.language-selector .lang-dropdown button');
                langOptions.forEach(opt => {
                    opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
                });

            } catch (error) {
                console.error('Failed to load language:', error);
            }
        },

        applyTranslations(translations) {
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                if (translations[key]) {
                    element.innerHTML = translations[key];
                }
            });
        },

        /**
         * Adds a global click listener to close open menus (mobile nav, language dropdown).
         */
        initClickOutsideClosers() {
            const mobileMenu = document.getElementById('mobile-menu');
            const menuToggleButton = document.querySelector('.menu-toggle');
            const langSelector = document.querySelector('.language-selector');

            document.addEventListener('click', (e) => {
                if (mobileMenu && mobileMenu.classList.contains('open') && !mobileMenu.contains(e.target) && !menuToggleButton.contains(e.target)) {
                    mobileMenu.classList.remove('open');
                    menuToggleButton.querySelector('.material-icons-outlined').textContent = 'menu';
                }
                
                if (langSelector && langSelector.classList.contains('open') && !langSelector.contains(e.target)) {
                    langSelector.classList.remove('open');
                }
            });
        }
    };

    AppController.init();
});