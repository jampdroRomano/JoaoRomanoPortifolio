/**
 * Módulo de Gerenciamento de Tema
 * Controla a alternância entre tema claro e escuro
 */
export const Theme = {
    /**
     * Inicializa o sistema de tema
     */
    init() {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;

        const body = document.body;
        const icon = themeToggle.querySelector('.material-icons-outlined');

        // Carrega o tema salvo ou usa 'dark' como padrão
        const savedTheme = localStorage.getItem('theme') || 'dark';
        this.setTheme(savedTheme, body, icon);

        // Adiciona listener para alternar tema
        themeToggle.addEventListener('click', () => {
            const currentTheme = body.dataset.theme;
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            this.setTheme(newTheme, body, icon);
            localStorage.setItem('theme', newTheme);
        });
    },

    /**
     * Define o tema e atualiza o ícone
     * @param {string} theme - Tema a ser aplicado ('dark' ou 'light')
     * @param {HTMLElement} body - Elemento body
     * @param {HTMLElement} icon - Elemento do ícone
     */
    setTheme(theme, body, icon) {
        body.dataset.theme = theme;
        icon.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
    }
};

