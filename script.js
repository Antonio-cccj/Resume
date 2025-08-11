/**
 * Advanced Resume Website - Interactive Experience
 * Modern animations, smooth interactions, and professional effects
 */
class AdvancedResumeApp {
    constructor() {
        this.isLoaded = false;
        this.currentSection = 'about';
        this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.init();
    }

    async init() {
        this.initLoadingScreen();
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initApp());
        } else {
            this.initApp();
        }
    }

    initApp() {
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupAnimations();
        this.setupTypingEffect();
        this.setupCounterAnimations();
        this.setupInteractiveElements();
        this.setupKeyboardNavigation();
        setTimeout(() => this.markAsLoaded(), 2000);
    }

    // Loading Screen
    initLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (!loadingScreen) return;

        const progressBar = loadingScreen.querySelector('.loading-progress');
        if (progressBar) {
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 15;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                }
                progressBar.style.width = `${progress}%`;
            }, 100);
        }
    }

    markAsLoaded() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('loaded');
            setTimeout(() => loadingScreen.style.display = 'none', 500);
        }
        this.triggerInitialAnimations();
    }

    triggerInitialAnimations() {
        const heroElements = document.querySelectorAll('.hero-section .fade-in-up, .hero-section .fade-in-right');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0) translateX(0)';
            }, index * 200);
        });
    }

    // Navigation
    setupNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (navToggle && navLinks) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navLinks.classList.toggle('active');
            });
        }

        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').slice(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    this.smoothScrollTo(targetSection);
                    this.updateActiveNavLink(targetId);
                    
                    if (navLinks && navLinks.classList.contains('active')) {
                        navToggle.classList.remove('active');
                        navLinks.classList.remove('active');
                    }
                }
            });
        });

        this.setupScrollSpy();
    }

    smoothScrollTo(element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({ top: offsetTop, behavior: this.reducedMotion ? 'auto' : 'smooth' });
    }

    setupScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.updateActiveNavLink(entry.target.id);
                }
            });
        }, { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' });

        sections.forEach(section => observer.observe(section));
    }

    updateActiveNavLink(sectionId) {
        document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
        if (activeLink) activeLink.classList.add('active');
    }

    // Scroll Effects
    setupScrollEffects() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateScrollEffects();
                    ticking = false;
                });
                ticking = true;
            }
        });

        this.setupScrollProgress();
    }

    updateScrollEffects() {
        const scrollTop = window.pageYOffset;
        
        const nav = document.getElementById('nav-menu');
        if (nav) nav.classList.toggle('scrolled', scrollTop > 50);

        if (!this.reducedMotion && scrollTop < window.innerHeight) {
            const heroSection = document.querySelector('.hero-section');
            if (heroSection) {
                heroSection.style.transform = `translateY(${scrollTop * 0.5}px)`;
            }
            
            const shapes = document.querySelectorAll('.geometric-shapes .shape');
            shapes.forEach((shape, index) => {
                const speed = 0.2 + (index * 0.1);
                const yPos = scrollTop * speed;
                const rotation = scrollTop * (0.1 + index * 0.05);
                shape.style.transform = `translateY(${yPos}px) rotate(${rotation}deg)`;
            });
        }
    }

    setupScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed; top: 0; left: 0; width: 0%; height: 3px;
            background: linear-gradient(90deg, #d4af37, #f7e98e);
            z-index: 10001; transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
        });
    }

    // Animations
    setupAnimations() {
        const animatedElements = document.querySelectorAll('.timeline-item, .skill-category, .cert-item, .award-item, .publication-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
            observer.observe(el);
        });

        this.setupHoverEffects();
    }

    animateElement(element) {
        if (this.reducedMotion) {
            element.style.opacity = '1';
            element.style.transform = 'none';
            return;
        }

        if (element.classList.contains('timeline-item')) {
            const items = Array.from(element.parentElement.children);
            const index = items.indexOf(element);
            
            setTimeout(() => {
                element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        } else {
            element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    }

    setupHoverEffects() {
        document.querySelectorAll('.skill-tag').forEach(tag => {
            tag.addEventListener('click', () => this.showSkillModal(tag.textContent.trim()));
        });

        document.querySelectorAll('.timeline-item').forEach(item => {
            if (!this.reducedMotion) {
                item.addEventListener('mouseenter', () => {
                    item.style.transform = 'translateY(-8px) scale(1.02)';
                    item.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
                });
                item.addEventListener('mouseleave', () => {
                    item.style.transform = 'translateY(0) scale(1)';
                    item.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)';
                });
            }
        });
    }

    // Typing Effect
    setupTypingEffect() {
        const typingElement = document.querySelector('.typing-text');
        if (!typingElement || this.reducedMotion) return;

        const texts = ['Quantitative Trader', 'Data Scientist', 'Algorithm Developer', 'Risk Analyst'];
        let textIndex = 0, charIndex = 0, isDeleting = false;
        
        const typeText = () => {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let speed = isDeleting ? 50 : 100;
            
            if (!isDeleting && charIndex === currentText.length) {
                speed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                speed = 500;
            }
            
            setTimeout(typeText, speed);
        };
        
        typeText();
    }

    // Counter Animations
    setupCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number[data-target]');
        
        const animateCounter = (counter) => {
            if (this.reducedMotion) {
                counter.textContent = counter.dataset.target;
                return;
            }

            const target = parseFloat(counter.dataset.target);
            const duration = 2000;
            const start = performance.now();
            
            const updateCounter = (currentTime) => {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const current = target * easeOutQuart;
                
                counter.textContent = target % 1 === 0 ? Math.floor(current) : current.toFixed(1);
                
                if (progress < 1) requestAnimationFrame(updateCounter);
            };
            
            requestAnimationFrame(updateCounter);
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counters.forEach(counter => animateCounter(counter));
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const heroSection = document.querySelector('.hero-section');
        if (heroSection) observer.observe(heroSection);
    }

    // Interactive Elements
    setupInteractiveElements() {
        this.setupSkillModals();
        this.setupPrintFunctionality();
        this.setupContactInteractions();
    }

    setupSkillModals() {
        if (!document.querySelector('.modal-overlay')) {
            const modalOverlay = document.createElement('div');
            modalOverlay.className = 'modal-overlay';
            modalOverlay.style.cssText = `
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0, 0, 0, 0.8); backdrop-filter: blur(10px);
                display: flex; align-items: center; justify-content: center;
                z-index: 10000; opacity: 0; visibility: hidden; transition: all 0.3s ease;
            `;
            
            document.body.appendChild(modalOverlay);
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) this.closeModal();
            });
        }
    }

    showSkillModal(skillName) {
        const modalOverlay = document.querySelector('.modal-overlay');
        if (!modalOverlay) return;

        const skillDetails = this.getSkillDetails(skillName);
        
        modalOverlay.innerHTML = `
            <div class="modal-content" style="
                background: white; border-radius: 20px; padding: 40px;
                max-width: 600px; width: 90%; max-height: 80vh; overflow-y: auto;
                transform: scale(0.8); transition: transform 0.3s ease;
            ">
                <div class="modal-header" style="
                    display: flex; justify-content: space-between; align-items: center;
                    margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #e2e8f0;
                ">
                    <h3 style="font-family: 'Playfair Display', serif; font-size: 28px; color: #1e293b; margin: 0;">${skillName}</h3>
                    <button class="close-modal" style="
                        background: none; border: none; font-size: 24px; cursor: pointer;
                        color: #64748b; width: 40px; height: 40px; border-radius: 50%;
                        display: flex; align-items: center; justify-content: center;
                    ">&times;</button>
                </div>
                <div class="modal-body">
                    <p style="color: #475569; line-height: 1.7; margin-bottom: 20px; font-size: 16px;">${skillDetails.description}</p>
                    <div style="margin-bottom: 20px;">
                        <h4 style="color: #1e40af; margin-bottom: 10px; font-size: 18px;">Experience Level</h4>
                        <div style="background: #f1f5f9; border-radius: 10px; padding: 10px; display: flex; align-items: center; gap: 10px;">
                            <div style="width: 100px; height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
                                <div style="width: ${skillDetails.level}%; height: 100%; background: linear-gradient(135deg, #1e40af, #6366f1);"></div>
                            </div>
                            <span style="font-weight: 600; color: #1e40af;">${skillDetails.level}%</span>
                        </div>
                    </div>
                    <div>
                        <h4 style="color: #1e40af; margin-bottom: 10px; font-size: 18px;">Applications</h4>
                        <ul style="color: #475569; line-height: 1.7; padding-left: 20px;">
                            ${skillDetails.applications.map(app => `<li>${app}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;
        
        modalOverlay.style.opacity = '1';
        modalOverlay.style.visibility = 'visible';
        
        setTimeout(() => {
            const modalContent = modalOverlay.querySelector('.modal-content');
            if (modalContent) modalContent.style.transform = 'scale(1)';
        }, 50);
        
        modalOverlay.querySelector('.close-modal').addEventListener('click', () => this.closeModal());
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        const modalOverlay = document.querySelector('.modal-overlay');
        if (modalOverlay) {
            modalOverlay.style.opacity = '0';
            modalOverlay.style.visibility = 'hidden';
            const modalContent = modalOverlay.querySelector('.modal-content');
            if (modalContent) modalContent.style.transform = 'scale(0.8)';
        }
        document.body.style.overflow = '';
    }

    getSkillDetails(skillName) {
        const skillsDatabase = {
            'Python': {
                description: 'Advanced proficiency in Python for quantitative analysis, including libraries like NumPy, Pandas, and Scikit-learn.',
                level: 95,
                applications: ['Algorithmic trading development', 'Financial data analysis', 'Risk management systems', 'Backtesting frameworks']
            },
            'Random Forest': {
                description: 'Expertise in Random Forest algorithms for predictive modeling in quantitative trading.',
                level: 90,
                applications: ['Alpha factor ranking', 'Market regime classification', 'Risk factor modeling', 'Portfolio optimization']
            },
            'XGBoost': {
                description: 'Advanced XGBoost implementation for high-performance machine learning in trading applications.',
                level: 88,
                applications: ['Price movement prediction', 'Factor optimization', 'Risk calculation', 'Anomaly detection']
            },
            'SQL': {
                description: 'Expert-level SQL skills for financial database management and large-scale data extraction.',
                level: 92,
                applications: ['Database design', 'Complex query optimization', 'Data pipeline automation', 'Performance tuning']
            },
            'LSTM (Long Short-Term Memory)': {
                description: 'Deep learning expertise in LSTM networks for time series forecasting and sequential pattern recognition in financial markets.',
                level: 85,
                applications: ['Stock price prediction', 'Market volatility forecasting', 'Trading signal generation', 'Risk pattern recognition']
            },
            'SVM (Support Vector Machine)': {
                description: 'Proficient in Support Vector Machines for classification and regression tasks in quantitative finance.',
                level: 82,
                applications: ['Market regime detection', 'Credit risk classification', 'Portfolio optimization', 'Anomaly detection']
            },
            'Logistic Regression': {
                description: 'Classical statistical method for binary and multiclass classification problems in financial modeling.',
                level: 90,
                applications: ['Credit risk assessment', 'Market direction prediction', 'Portfolio classification', 'Binary outcome modeling']
            },
            'Decision Trees': {
                description: 'Interpretable machine learning algorithm for both classification and regression tasks.',
                level: 88,
                applications: ['Rule-based trading strategies', 'Risk factor analysis', 'Feature importance ranking', 'Model interpretability']
            },
            'Neural Networks': {
                description: 'Deep learning architectures for complex pattern recognition and non-linear modeling.',
                level: 83,
                applications: ['Complex market pattern recognition', 'Non-linear factor modeling', 'Advanced signal processing', 'Deep feature extraction']
            },
            'PCA (Principal Component Analysis)': {
                description: 'Dimensionality reduction technique for factor analysis and risk management in quantitative finance.',
                level: 87,
                applications: ['Factor dimensionality reduction', 'Risk factor analysis', 'Portfolio optimization', 'Noise reduction in financial data']
            },
            'SQLite': {
                description: 'Expertise in SQLite for lightweight, fast financial data storage and retrieval in trading systems.',
                level: 90,
                applications: ['Local backtesting databases', 'Real-time data caching', 'Strategy development', 'Performance analytics']
            },
            'PostgreSQL': {
                description: 'Advanced open-source relational database management with strong SQL compliance and extensibility.',
                level: 85,
                applications: ['Enterprise data warehousing', 'Complex financial analytics', 'Large-scale data processing', 'Advanced query optimization']
            },
            'MySQL': {
                description: 'Proficient in MySQL for reliable, scalable database solutions in financial applications.',
                level: 83,
                applications: ['Web application backends', 'Financial data storage', 'Transaction processing', 'Data replication and backup']
            },
            'Linear Regression': {
                description: 'Fundamental statistical modeling technique for quantitative analysis and factor modeling.',
                level: 93,
                applications: ['Factor model construction', 'Risk attribution analysis', 'Beta calculation', 'Performance attribution']
            },
            'Ridge Regression': {
                description: 'Regularized regression technique for robust factor modeling with multicollinearity handling.',
                level: 88,
                applications: ['Alpha factor regularization', 'Risk model stability', 'Feature selection', 'Overfitting prevention']
            }
        };
        
        return skillsDatabase[skillName] || {
            description: `Professional expertise in ${skillName} with applications in quantitative trading.`,
            level: 80,
            applications: ['Trading strategy development', 'Financial analysis', 'Risk management']
        };
    }

    setupPrintFunctionality() {
        const printBtn = document.createElement('button');
        printBtn.innerHTML = '<i class="fas fa-print"></i> Print Resume';
        printBtn.style.cssText = `
            position: fixed; bottom: 30px; right: 30px;
            background: linear-gradient(135deg, #1e40af, #6366f1); color: white;
            border: none; padding: 15px 25px; border-radius: 50px; cursor: pointer;
            font-size: 14px; font-weight: 600; z-index: 1000;
            box-shadow: 0 10px 25px rgba(30, 64, 175, 0.3);
            display: flex; align-items: center; gap: 8px;
        `;

        printBtn.addEventListener('click', () => window.print());
        document.body.appendChild(printBtn);
    }

    setupContactInteractions() {
        document.querySelectorAll('.contact-item').forEach(item => {
            item.addEventListener('click', () => {
                const contactValue = item.querySelector('.contact-value').textContent;
                if (contactValue.includes('@')) {
                    window.location.href = `mailto:${contactValue}`;
                } else if (contactValue.includes('+')) {
                    window.location.href = `tel:${contactValue}`;
                }
            });
        });
    }

    // Keyboard Navigation
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'Escape': this.closeModal(); break;
                case 'p': case 'P':
                    if (e.ctrlKey || e.metaKey) { e.preventDefault(); window.print(); }
                    break;
                case 'Home': e.preventDefault(); this.smoothScrollTo(document.querySelector('#about')); break;
                case 'End': e.preventDefault(); this.smoothScrollTo(document.querySelector('.footer')); break;
            }
        });

        document.querySelectorAll('.skill-tag, .hobby-tag, .timeline-item').forEach(el => {
            el.setAttribute('tabindex', '0');
            el.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    el.click();
                }
            });
        });
    }
}

// Add required CSS
const style = document.createElement('style');
style.textContent = `
    .modal-overlay .close-modal:hover { background: #f1f5f9 !important; color: #1e40af !important; }
`;
document.head.appendChild(style);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    window.resumeApp = new AdvancedResumeApp();
});
