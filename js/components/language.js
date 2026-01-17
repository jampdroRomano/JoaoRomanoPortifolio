/**
 * Módulo de Gerenciamento de Idiomas
 * Controla a troca de idiomas e aplicação de traduções
 */
import { TypingEffect } from '../components/typingEffect.js';

export const Language = {
    /**
     * Inicializa o seletor de idiomas
     */
    async init() {
        const langSelector = document.querySelector('.language-selector');
        if (!langSelector) return;

        const langToggleButton = document.getElementById('lang-toggle');
        const langOptions = langSelector.querySelectorAll('.lang-dropdown button');
        
        // Carrega o idioma salvo ou usa 'pt' como padrão
        const savedLang = localStorage.getItem('language') || 'pt';
        await this.loadLanguage(savedLang);

        // Configura o toggle do dropdown
        langToggleButton.addEventListener('click', (e) => {
            e.stopPropagation();
            langSelector.classList.toggle('open');
        });

        // Configura os botões de seleção de idioma
        langOptions.forEach(option => {
            option.addEventListener('click', async (e) => {
                const lang = e.target.getAttribute('data-lang');
                await this.loadLanguage(lang);
                
                // Atualiza o estado ativo dos botões
                langOptions.forEach(opt => opt.classList.remove('active'));
                e.target.classList.add('active');
                
                // Fecha o dropdown
                langSelector.classList.remove('open');
            });
        });
    },

    /**
     * Carrega e aplica um idioma
     * @param {string} lang - Código do idioma (ex: 'pt', 'en')
     */
    async loadLanguage(lang) {
        try {
            const response = await fetch(`languages/${lang}.json`);
            if (!response.ok) {
                throw new Error(`Could not load language file: ${lang}.json`);
            }
            
            const translations = await response.json();
            this.applyTranslations(translations);
            
            // Reinicia o efeito de digitação com o novo idioma
            TypingEffect.start();

            // Salva o idioma selecionado
            localStorage.setItem('language', lang);
            document.documentElement.lang = lang;

            // Atualiza o estado ativo dos botões
            const langOptions = document.querySelectorAll('.language-selector .lang-dropdown button');
            langOptions.forEach(opt => {
                opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
            });

        } catch (error) {
            console.error('Failed to load language:', error);
        }
    },

    /**
     * Aplica as traduções aos elementos com data-i18n
     * @param {Object} translations - Objeto com as traduções
     */
    applyTranslations(translations) {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[key]) {
                element.innerHTML = translations[key];
            }
        });
    },

    /**
     * Verifica se o clique foi fora do seletor de idioma e fecha se necessário
     * @param {Event} event - Evento de clique
     */
    handleClickOutside(event) {
        const langSelector = document.querySelector('.language-selector');
        if (!langSelector) return;

        const isOpen = langSelector.classList.contains('open');
        const clickedInside = langSelector.contains(event.target);

        if (isOpen && !clickedInside) {
            langSelector.classList.remove('open');
        }
    }
};

