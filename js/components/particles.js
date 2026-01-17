/**
 * Módulo de Partículas
 * Cria e gerencia o efeito de partículas no background
 */
export const Particles = {
    /**
     * Cria as partículas no container especificado
     */
    create() {
        const particleContainer = document.getElementById('global-particle-background');
        if (!particleContainer) return;

        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = this.createParticle(i);
            particleContainer.appendChild(particle);
        }
    },

    /**
     * Cria uma partícula individual com propriedades aleatórias
     * @param {number} index - Índice da partícula
     * @returns {HTMLElement} Elemento da partícula criada
     */
    createParticle(index) {
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

        if (index % 2 === 0) {
            particle.style.animationDirection = 'reverse';
        }

        return particle;
    }
};

