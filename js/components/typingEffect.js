/**
 * Módulo de Efeito de Digitação
 * Cria o efeito de digitação para a lista de roles
 */
export const TypingEffect = {
    typingTimeout: null,

    /**
     * Inicia o efeito de digitação
     */
    start() {
        const roleListI18nElement = document.getElementById('role-list-i18n');
        const typedTextElement = document.getElementById('typed-role-text');

        if (!roleListI18nElement || !typedTextElement) return;
        
        // Limpa timeout anterior se existir
        this.clear();

        // Limpa o texto atual
        typedTextElement.textContent = '';

        // Processa a lista de roles
        const rolesString = roleListI18nElement.textContent;
        const roles = rolesString.split(',')
                                  .map(role => role.trim())
                                  .filter(role => role.length > 0);

        if (roles.length === 0) return;

        // Inicia a animação
        this.animate(roles, typedTextElement);
    },

    /**
     * Limpa o timeout atual
     */
    clear() {
        if (this.typingTimeout) {
            clearTimeout(this.typingTimeout);
            this.typingTimeout = null;
        }
    },

    /**
     * Anima o efeito de digitação
     * @param {string[]} roles - Array de roles para exibir
     * @param {HTMLElement} typedTextElement - Elemento onde o texto será exibido
     */
    animate(roles, typedTextElement) {
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 150;
        const pauseDuration = 1500;

        const typeWriter = () => {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                typedTextElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 75;
            } else {
                typedTextElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 150;
            }

            // Quando termina de digitar, espera e começa a deletar
            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                this.typingTimeout = setTimeout(typeWriter, pauseDuration);
                return;
            }

            // Quando termina de deletar, passa para o próximo role
            if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingSpeed = 150;
            }
            
            this.typingTimeout = setTimeout(typeWriter, typingSpeed);
        };

        typeWriter();
    }
};

