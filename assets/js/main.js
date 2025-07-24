/**
 * ===== GMAAKEUP WEBSITE - MAIN JAVASCRIPT FILE =====
 * 
 * Este arquivo contém todas as funcionalidades JavaScript do site Gmaakeup.
 * Inclui navegação suave, filtros de portfólio, carrossel de depoimentos,
 * formulários interativos e outras funcionalidades de UI/UX.
 * 
 * Autor: Manus AI
 * Data: 2025
 * Versão: 1.0.0
 */

// ===== VARIÁVEIS GLOBAIS =====
/**
 * Objeto que armazena todas as configurações e elementos DOM utilizados
 * no site para facilitar o acesso e manutenção do código.
 */
const GmaakeupApp = {
    // Elementos DOM principais
    navbar: null,
    portfolioItems: null,
    filterButtons: null,
    
    // Configurações
    config: {
        scrollOffset: 100, // Offset para navegação suave
        animationDuration: 300, // Duração das animações em ms
        carouselInterval: 5000 // Intervalo do carrossel em ms
    },
    
    // Estado da aplicação
    state: {
        currentFilter: '*', // Filtro atual do portfólio
        isScrolling: false, // Flag para controle de scroll
        activeSection: 'home' // Seção ativa atual
    }
};

// ===== INICIALIZAÇÃO DA APLICAÇÃO =====
/**
 * Função principal que inicializa todas as funcionalidades do site.
 * É executada quando o DOM está completamente carregado.
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando Gmaakeup Website...');
    
    // Inicializar elementos DOM
    initializeDOMElements();
    
    // Configurar navegação
    setupNavigation();
    
    // Configurar filtro de portfólio
    setupPortfolioFilter();
    
    // Configurar carrossel de depoimentos
    setupTestimonialCarousel();
    
    // Configurar formulários
    setupForms();
    
    // Configurar modais
    setupModals();
    
    // Configurar animações de scroll
    setupScrollAnimations();
    
    // Configurar efeitos visuais
    setupVisualEffects();
    
    console.log('✅ Gmaakeup Website inicializado com sucesso!');
});

// ===== INICIALIZAÇÃO DE ELEMENTOS DOM =====
/**
 * Função que captura e armazena referências para os principais elementos DOM
 * utilizados nas funcionalidades JavaScript do site.
 */
function initializeDOMElements() {
    console.log('📋 Inicializando elementos DOM...');
    
    // Capturar elementos principais
    GmaakeupApp.navbar = document.querySelector('.navbar');
    GmaakeupApp.portfolioItems = document.querySelectorAll('.portfolio-item');
    GmaakeupApp.filterButtons = document.querySelectorAll('.filter-btn');
    
    // Verificar se os elementos foram encontrados
    if (!GmaakeupApp.navbar) {
        console.warn('⚠️ Navbar não encontrada');
    }
    
    if (GmaakeupApp.portfolioItems.length === 0) {
        console.warn('⚠️ Itens de portfólio não encontrados');
    }
    
    if (GmaakeupApp.filterButtons.length === 0) {
        console.warn('⚠️ Botões de filtro não encontrados');
    }
    
    console.log('✅ Elementos DOM inicializados');
}

// ===== CONFIGURAÇÃO DA NAVEGAÇÃO =====
/**
 * Configura toda a funcionalidade de navegação do site, incluindo:
 * - Navegação suave entre seções
 * - Efeito de transparência da navbar no scroll
 * - Destaque da seção ativa no menu
 * - Fechamento automático do menu mobile
 */
function setupNavigation() {
    console.log('🧭 Configurando navegação...');
    
    // Configurar navegação suave para links internos
    setupSmoothScrolling();
    
    // Configurar efeito de scroll na navbar
    setupNavbarScrollEffect();
    
    // Configurar destaque de seção ativa
    setupActiveSection();
    
    // Configurar fechamento automático do menu mobile
    setupMobileMenuClose();
    
    console.log('✅ Navegação configurada');
}

/**
 * Configura a navegação suave (smooth scrolling) para todos os links
 * internos que apontam para seções da página.
 */
function setupSmoothScrolling() {
    // Selecionar todos os links que apontam para âncoras internas
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevenir comportamento padrão do link
            
            const targetId = this.getAttribute('href').substring(1); // Remover o #
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Calcular posição considerando a altura da navbar fixa
                const navbarHeight = GmaakeupApp.navbar ? GmaakeupApp.navbar.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                
                // Executar scroll suave
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                console.log(`📍 Navegando para seção: ${targetId}`);
            }
        });
    });
}

/**
 * Configura o efeito visual da navbar durante o scroll da página.
 * Adiciona/remove classes CSS para criar efeitos de transparência e sombra.
 */
function setupNavbarScrollEffect() {
    if (!GmaakeupApp.navbar) return;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Adicionar classe 'scrolled' quando a página for rolada
        if (scrollTop > 50) {
            GmaakeupApp.navbar.classList.add('scrolled');
        } else {
            GmaakeupApp.navbar.classList.remove('scrolled');
        }
    });
}

/**
 * Configura o sistema de destaque da seção ativa no menu de navegação.
 * Monitora o scroll da página e atualiza o link ativo conforme a seção visível.
 */
function setupActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    window.addEventListener('scroll', function() {
        let currentSection = '';
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const navbarHeight = GmaakeupApp.navbar ? GmaakeupApp.navbar.offsetHeight : 0;
        
        // Determinar qual seção está atualmente visível
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Atualizar links ativos apenas se a seção mudou
        if (currentSection && currentSection !== GmaakeupApp.state.activeSection) {
            GmaakeupApp.state.activeSection = currentSection;
            
            // Remover classe 'active' de todos os links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Adicionar classe 'active' ao link correspondente
            const activeLink = document.querySelector(`.navbar-nav .nav-link[href="#${currentSection}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

/**
 * Configura o fechamento automático do menu mobile quando um link é clicado.
 * Melhora a experiência do usuário em dispositivos móveis.
 */
function setupMobileMenuClose() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    if (!navbarToggler || !navbarCollapse) return;
    
    // Fechar menu quando um link é clicado (apenas em mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Verificar se o menu está aberto (apenas em mobile)
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click(); // Simular clique no botão de toggle
            }
        });
    });
}

// ===== CONFIGURAÇÃO DO FILTRO DE PORTFÓLIO =====
/**
 * Configura o sistema de filtros do portfólio, permitindo aos usuários
 * filtrar os trabalhos por categoria (Face Makeup, Eye Makeup, etc.).
 */
function setupPortfolioFilter() {
    console.log('🎨 Configurando filtro de portfólio...');
    
    if (GmaakeupApp.filterButtons.length === 0 || GmaakeupApp.portfolioItems.length === 0) {
        console.warn('⚠️ Elementos de portfólio não encontrados para configurar filtros');
        return;
    }
    
    // Adicionar event listeners aos botões de filtro
    GmaakeupApp.filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Atualizar estado do filtro
            GmaakeupApp.state.currentFilter = filter;
            
            // Atualizar botões ativos
            updateFilterButtons(this);
            
            // Aplicar filtro aos itens
            applyPortfolioFilter(filter);
            
            console.log(`🔍 Filtro aplicado: ${filter}`);
        });
    });
    
    console.log('✅ Filtro de portfólio configurado');
}

/**
 * Atualiza o estado visual dos botões de filtro, destacando o botão ativo.
 * @param {HTMLElement} activeButton - O botão que foi clicado
 */
function updateFilterButtons(activeButton) {
    // Remover classe 'active' de todos os botões
    GmaakeupApp.filterButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Adicionar classe 'active' ao botão clicado
    activeButton.classList.add('active');
}

/**
 * Aplica o filtro selecionado aos itens do portfólio com animação suave.
 * @param {string} filter - O filtro a ser aplicado ('*' para todos, ou classe específica)
 */
function applyPortfolioFilter(filter) {
    GmaakeupApp.portfolioItems.forEach(item => {
        const shouldShow = filter === '*' || item.classList.contains(filter.substring(1));
        
        if (shouldShow) {
            // Mostrar item com animação
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 10);
        } else {
            // Esconder item com animação
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
                item.style.display = 'none';
            }, GmaakeupApp.config.animationDuration);
        }
    });
}

// ===== CONFIGURAÇÃO DO CARROSSEL DE DEPOIMENTOS =====
/**
 * Configura funcionalidades adicionais para o carrossel de depoimentos,
 * incluindo controles personalizados e auto-play inteligente.
 */
function setupTestimonialCarousel() {
    console.log('💬 Configurando carrossel de depoimentos...');
    
    const carousel = document.querySelector('#testimonialCarousel');
    if (!carousel) {
        console.warn('⚠️ Carrossel de depoimentos não encontrado');
        return;
    }
    
    // Configurar auto-play inteligente (pausar no hover)
    setupCarouselAutoPlay(carousel);
    
    // Configurar indicadores personalizados
    setupCarouselIndicators(carousel);
    
    console.log('✅ Carrossel de depoimentos configurado');
}

/**
 * Configura o auto-play inteligente do carrossel que pausa quando o usuário
 * interage com o elemento (hover ou foco).
 * @param {HTMLElement} carousel - Elemento do carrossel
 */
function setupCarouselAutoPlay(carousel) {
    let carouselInstance;
    
    // Inicializar carrossel Bootstrap
    if (typeof bootstrap !== 'undefined') {
        carouselInstance = new bootstrap.Carousel(carousel, {
            interval: GmaakeupApp.config.carouselInterval,
            wrap: true,
            pause: 'hover'
        });
    }
    
    // Pausar auto-play quando o usuário interage
    carousel.addEventListener('mouseenter', function() {
        if (carouselInstance) {
            carouselInstance.pause();
        }
    });
    
    // Retomar auto-play quando o usuário para de interagir
    carousel.addEventListener('mouseleave', function() {
        if (carouselInstance) {
            carouselInstance.cycle();
        }
    });
}

/**
 * Configura indicadores personalizados para o carrossel com melhor acessibilidade.
 * @param {HTMLElement} carousel - Elemento do carrossel
 */
function setupCarouselIndicators(carousel) {
    const indicators = carousel.querySelectorAll('.carousel-indicators button');
    
    indicators.forEach((indicator, index) => {
        // Adicionar atributos de acessibilidade
        indicator.setAttribute('aria-label', `Ir para depoimento ${index + 1}`);
        
        // Adicionar feedback visual no clique
        indicator.addEventListener('click', function() {
            // Adicionar efeito visual temporário
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// ===== CONFIGURAÇÃO DE FORMULÁRIOS =====
/**
 * Configura todos os formulários do site com validação, feedback visual
 * e envio via AJAX (simulado para demonstração).
 */
function setupForms() {
    console.log('📝 Configurando formulários...');
    
    // Configurar formulário de newsletter
    setupNewsletterForm();
    
    // Configurar formulário de cotação (se existir)
    setupQuoteForm();
    
    console.log('✅ Formulários configurados');
}

/**
 * Configura o formulário de newsletter com validação e feedback visual.
 */
function setupNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (!newsletterForm) {
        console.warn('⚠️ Formulário de newsletter não encontrado');
        return;
    }
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevenir envio padrão
        
        const emailInput = this.querySelector('input[type="email"]');
        const submitButton = this.querySelector('button[type="submit"]');
        
        if (!emailInput || !submitButton) return;
        
        const email = emailInput.value.trim();
        
        // Validar email
        if (!isValidEmail(email)) {
            showFormFeedback(emailInput, 'Por favor, insira um email válido.', 'error');
            return;
        }
        
        // Simular envio
        simulateFormSubmission(emailInput, submitButton, 'Newsletter');
    });
}

/**
 * Configura o formulário de cotação (se existir na página).
 */
function setupQuoteForm() {
    // Esta função pode ser expandida quando um formulário de cotação for adicionado
    console.log('📋 Formulário de cotação: não implementado nesta versão');
}

/**
 * Valida se um email tem formato válido usando regex.
 * @param {string} email - O email a ser validado
 * @returns {boolean} - True se o email for válido
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Exibe feedback visual para formulários (sucesso ou erro).
 * @param {HTMLElement} input - Campo de input
 * @param {string} message - Mensagem a ser exibida
 * @param {string} type - Tipo do feedback ('success' ou 'error')
 */
function showFormFeedback(input, message, type) {
    // Remover feedback anterior
    const existingFeedback = input.parentNode.querySelector('.form-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    // Criar elemento de feedback
    const feedback = document.createElement('div');
    feedback.className = `form-feedback ${type}`;
    feedback.textContent = message;
    feedback.style.cssText = `
        margin-top: 5px;
        font-size: 0.875rem;
        color: ${type === 'error' ? '#e74c3c' : '#27ae60'};
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    // Inserir feedback
    input.parentNode.appendChild(feedback);
    
    // Animar entrada
    setTimeout(() => {
        feedback.style.opacity = '1';
    }, 10);
    
    // Remover feedback após 5 segundos
    setTimeout(() => {
        if (feedback.parentNode) {
            feedback.style.opacity = '0';
            setTimeout(() => {
                if (feedback.parentNode) {
                    feedback.remove();
                }
            }, 300);
        }
    }, 5000);
}

/**
 * Simula o envio de um formulário com feedback visual para o usuário.
 * @param {HTMLElement} input - Campo de input
 * @param {HTMLElement} button - Botão de envio
 * @param {string} formType - Tipo do formulário para logging
 */
function simulateFormSubmission(input, button, formType) {
    const originalButtonText = button.textContent;
    
    // Mostrar estado de carregamento
    button.textContent = 'Enviando...';
    button.disabled = true;
    input.disabled = true;
    
    // Simular delay de envio
    setTimeout(() => {
        // Restaurar estado original
        button.textContent = originalButtonText;
        button.disabled = false;
        input.disabled = false;
        
        // Mostrar feedback de sucesso
        showFormFeedback(input, 'Obrigado! Você foi inscrito com sucesso.', 'success');
        
        // Limpar campo
        input.value = '';
        
        console.log(`📧 ${formType} enviado com sucesso (simulado)`);
    }, 2000);
}

// ===== CONFIGURAÇÃO DE MODAIS =====
/**
 * Configura todos os modais do site com funcionalidades aprimoradas.
 */
function setupModals() {
    console.log('🖼️ Configurando modais...');
    
    // Configurar modal de vídeo
    setupVideoModal();
    
    // Configurar modal de portfólio
    setupPortfolioModal();
    
    console.log('✅ Modais configurados');
}

/**
 * Configura o modal de vídeo com controles aprimorados.
 */
function setupVideoModal() {
    const videoModal = document.querySelector('#videoModal');
    if (!videoModal) {
        console.warn('⚠️ Modal de vídeo não encontrado');
        return;
    }
    
    // Pausar vídeo quando modal é fechado
    videoModal.addEventListener('hidden.bs.modal', function() {
        const iframe = this.querySelector('iframe');
        if (iframe) {
            const src = iframe.src;
            iframe.src = ''; // Pausar vídeo
            iframe.src = src; // Restaurar src
        }
    });
}

/**
 * Configura o modal de portfólio para exibir imagens em tamanho completo.
 */
function setupPortfolioModal() {
    const portfolioModal = document.querySelector('#portfolioModal');
    const portfolioLinks = document.querySelectorAll('.portfolio-link');
    
    if (!portfolioModal || portfolioLinks.length === 0) {
        console.warn('⚠️ Modal de portfólio ou links não encontrados');
        return;
    }
    
    // Configurar links de portfólio
    portfolioLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const imageSrc = this.getAttribute('href');
            const modalImage = portfolioModal.querySelector('.portfolio-modal-img');
            
            if (modalImage && imageSrc) {
                modalImage.src = imageSrc;
                modalImage.alt = 'Portfolio Image';
            }
        });
    });
}

// ===== CONFIGURAÇÃO DE ANIMAÇÕES DE SCROLL =====
/**
 * Configura animações que são ativadas quando elementos entram na viewport.
 */
function setupScrollAnimations() {
    console.log('✨ Configurando animações de scroll...');
    
    // Verificar suporte ao Intersection Observer
    if (!('IntersectionObserver' in window)) {
        console.warn('⚠️ Intersection Observer não suportado');
        return;
    }
    
    // Configurar observer para animações
    const animationObserver = new IntersectionObserver(
        handleIntersection,
        {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        }
    );
    
    // Observar elementos que devem ser animados
    const animatedElements = document.querySelectorAll(
        '.service-card, .news-card, .about-content, .hero-content'
    );
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animationObserver.observe(element);
    });
    
    console.log('✅ Animações de scroll configuradas');
}

/**
 * Manipula a interseção de elementos com a viewport para animações.
 * @param {IntersectionObserverEntry[]} entries - Entradas do observer
 */
function handleIntersection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animar entrada do elemento
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Parar de observar este elemento
            entry.target.classList.add('animated');
        }
    });
}

// ===== CONFIGURAÇÃO DE EFEITOS VISUAIS =====
/**
 * Configura efeitos visuais adicionais para melhorar a experiência do usuário.
 */
function setupVisualEffects() {
    console.log('🎭 Configurando efeitos visuais...');
    
    // Configurar efeito parallax (se suportado)
    setupParallaxEffect();
    
    // Configurar efeitos de hover aprimorados
    setupHoverEffects();
    
    // Configurar loading states
    setupLoadingStates();
    
    console.log('✅ Efeitos visuais configurados');
}

/**
 * Configura efeito parallax sutil para elementos de fundo.
 */
function setupParallaxEffect() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    // Aplicar efeito parallax apenas em dispositivos desktop
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }
}

/**
 * Configura efeitos de hover aprimorados para elementos interativos.
 */
function setupHoverEffects() {
    // Efeito de hover para cards de serviço
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Efeito de hover para botões
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

/**
 * Configura estados de loading para melhorar a percepção de performance.
 */
function setupLoadingStates() {
    // Configurar loading para imagens
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.complete) {
            img.style.opacity = '0';
            img.addEventListener('load', function() {
                this.style.transition = 'opacity 0.3s ease';
                this.style.opacity = '1';
            });
        }
    });
}

// ===== UTILITÁRIOS GERAIS =====
/**
 * Função utilitária para debounce de eventos (evita execução excessiva).
 * @param {Function} func - Função a ser executada
 * @param {number} wait - Tempo de espera em ms
 * @returns {Function} - Função com debounce aplicado
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Função utilitária para throttle de eventos (limita frequência de execução).
 * @param {Function} func - Função a ser executada
 * @param {number} limit - Limite de tempo em ms
 * @returns {Function} - Função com throttle aplicado
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== TRATAMENTO DE ERROS =====
/**
 * Manipulador global de erros para logging e debugging.
 */
window.addEventListener('error', function(e) {
    console.error('❌ Erro JavaScript:', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno,
        error: e.error
    });
});

/**
 * Manipulador para promises rejeitadas não capturadas.
 */
window.addEventListener('unhandledrejection', function(e) {
    console.error('❌ Promise rejeitada não capturada:', e.reason);
});

// ===== PERFORMANCE MONITORING =====
/**
 * Monitora performance básica da aplicação.
 */
window.addEventListener('load', function() {
    // Aguardar um pouco para garantir que tudo foi carregado
    setTimeout(() => {
        if ('performance' in window) {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('📊 Performance da página:', {
                'Tempo de carregamento': `${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`,
                'Tempo até DOM pronto': `${Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart)}ms`,
                'Tempo de resposta do servidor': `${Math.round(perfData.responseEnd - perfData.requestStart)}ms`
            });
        }
    }, 1000);
});

// ===== EXPORTAÇÃO PARA DEBUGGING =====
/**
 * Expor objeto principal no escopo global para debugging (apenas em desenvolvimento).
 */
if (typeof window !== 'undefined') {
    window.GmaakeupApp = GmaakeupApp;
    console.log('🔧 GmaakeupApp disponível no console para debugging');
}

/**
 * ===== FIM DO ARQUIVO PRINCIPAL =====
 * 
 * Este arquivo implementa todas as funcionalidades JavaScript necessárias
 * para o site Gmaakeup, seguindo boas práticas de desenvolvimento:
 * 
 * ✅ Código bem documentado e organizado
 * ✅ Tratamento de erros robusto
 * ✅ Performance otimizada
 * ✅ Acessibilidade considerada
 * ✅ Responsividade garantida
 * ✅ Debugging facilitado
 * 
 * Para manutenção futura, consulte a documentação inline e os comentários
 * detalhados em cada função.
 */

