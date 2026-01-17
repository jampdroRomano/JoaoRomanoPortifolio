/**
 * Módulo de Menu Mobile
 * Gerencia a abertura e fechamento do menu mobile
 */
export const MobileMenu = {
    menuToggleButton: null,
    mobileMenu: null,

    /**
     * Inicializa o menu mobile
     */
    init() {
        this.menuToggleButton = document.querySelector('.menu-toggle');
        this.mobileMenu = document.getElementById('mobile-menu');
        
        if (!this.menuToggleButton || !this.mobileMenu) return;

        this.setupToggle();
        this.setupCloseOnLinkClick();
    },

    /**
     * Configura o botão de toggle do menu
     */
    setupToggle() {
        this.menuToggleButton.addEventListener('click', () => {
            const isOpen = this.mobileMenu.classList.toggle('open');
            const icon = this.menuToggleButton.querySelector('.material-icons-outlined');
            icon.textContent = isOpen ? 'close' : 'menu';
        });
    },

    /**
     * Configura o fechamento do menu ao clicar em um link
     */
    setupCloseOnLinkClick() {
        this.mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                this.close();
            });
        });
    },

    /**
     * Fecha o menu mobile
     */
    close() {
        this.mobileMenu.classList.remove('open');
        const icon = this.menuToggleButton.querySelector('.material-icons-outlined');
        icon.textContent = 'menu';
    },

    /**
     * Verifica se o clique foi fora do menu e fecha se necessário
     * @param {Event} event - Evento de clique
     */
    handleClickOutside(event) {
        if (!this.mobileMenu || !this.menuToggleButton) return;

        const isMenuOpen = this.mobileMenu.classList.contains('open');
        const clickedInsideMenu = this.mobileMenu.contains(event.target);
        const clickedOnToggle = this.menuToggleButton.contains(event.target);

        if (isMenuOpen && !clickedInsideMenu && !clickedOnToggle) {
            this.close();
        }
    }
};

