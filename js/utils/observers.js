/**
 * Módulo de Observadores (IntersectionObserver)
 * Gerencia observadores para animações e navegação ativa
 */
export const Observers = {
    /**
     * Inicializa o observador para animações fade-in
     */
    initFadeInObserver() {
        const fadeInObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.fade-in').forEach(el => {
            fadeInObserver.observe(el);
        });
    },

    /**
     * Inicializa o observador para destacar links ativos na navegação
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
    }
};

