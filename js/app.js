/**
 * Controlador Principal da Aplicação
 * Inicializa todos os módulos e gerencia o ciclo de vida da aplicação
 */
import { SmoothScroll } from './utils/scroll.js';
import { Observers } from './utils/observers.js';
import { Particles } from './components/particles.js';
import { Theme } from './components/theme.js';
import { MobileMenu } from './components/mobileMenu.js';
import { Language } from './components/language.js';

/**
 * Classe principal que gerencia a inicialização da aplicação
 */
class App {
    /**
     * Inicializa todos os módulos da aplicação
     */
    async init() {
        // Inicializa componentes visuais
        Particles.create();
        Theme.init();
        
        // Inicializa observadores
        Observers.initFadeInObserver();
        Observers.initActiveLinkObserver();
        
        // Inicializa navegação
        SmoothScroll.init();
        
        // Inicializa componentes interativos
        MobileMenu.init();
        await Language.init();
        
        // Inicializa handlers de clique fora
        this.initClickOutsideHandlers();
    }

    /**
     * Configura os handlers para fechar menus ao clicar fora
     */
    initClickOutsideHandlers() {
        document.addEventListener('click', (e) => {
            MobileMenu.handleClickOutside(e);
            Language.handleClickOutside(e);
        });
    }
}

// Inicializa a aplicação quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
    const app = new App();
    app.init();
});

