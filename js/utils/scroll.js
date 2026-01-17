/**
 * Módulo de Scroll Suave
 * Gerencia a navegação suave entre seções da página
 */
export const SmoothScroll = {
    /**
     * Inicializa o scroll suave para todos os links âncora
     */
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.scrollTo(link.getAttribute('href'));
            });
        });
    },

    /**
     * Realiza scroll suave até o elemento alvo
     * @param {string} targetId - ID do elemento alvo (ex: "#profile")
     */
    scrollTo(targetId) {
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;

        const headerOffset = 100;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
};

