/**
 * Révélation au scroll + légers effets (respecte prefers-reduced-motion)
 * Cartes / blocs d’abord, puis sections « vides » pour éviter les opacity imbriquées.
 */
(function () {
    'use strict';

    var observer;

    if (!window.IntersectionObserver) {
        document.querySelectorAll('.g1-reveal').forEach(function (el) {
            el.classList.add('is-visible');
        });
        return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll('.g1-reveal').forEach(function (el) {
            el.classList.add('is-visible');
        });
        return;
    }

    observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) {
                    return;
                }
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        },
        { root: null, rootMargin: '0px 0px -6% 0px', threshold: 0.06 }
    );

    function markReveal(el, delayIndex) {
        if (!el || el.classList.contains('g1-reveal') || el.classList.contains('animate-in')) {
            return;
        }
        if (el.closest('.g1-reveal')) {
            return;
        }
        el.classList.add('g1-reveal');
        el.style.setProperty('--g1-delay', Math.min(delayIndex, 14) * 0.045 + 's');
        observer.observe(el);
    }

    var cardSelectors = [
        '.formation-card',
        '.event-card',
        '.reference-card',
        '.campus-card',
        '.team-preview-card',
        '.testimonial-card',
        '.faq-item',
        '.contact-card',
        '.blog-card',
        '.article-card',
        '.formation-nav',
        '.stats-grid .stat-item',
        '.hero-buttons',
        '.login-page',
        '.download-section',
        '.blog-hero',
        '.faq-hero',
        '.contact-hero',
        '.formations-hero',
        '.teams-hero',
        '.hero-stat',
        '.about-feature',
        '.section-header',
        '.formation-detail-card',
        '.feature-item',
        '.program-item',
        '.team-card',
        '.teams-header',
        '.popular-card',
        '.search-container',
        '.contact-form-container',
        '.faq-support-grid',
        '.category-nav',
        '.sidebar-widget',
        '.articles-list-page',
        '.testimonials-section',
        '.filters',
        'main.container article',
        '.entry-content'
    ];

    var sectionSelectors = 'body > section, main > section, main .container > section, section.blog-content, section.faq-categories, section.faq-section';

    function init() {
        var d = 0;
        var i;

        var header = document.querySelector('.site-header');
        if (header) {
            header.classList.add('g1-reveal', 'g1-reveal-left');
            header.style.setProperty('--g1-delay', '0s');
            observer.observe(header);
        }

        document.querySelectorAll('.breadcrumb-nav').forEach(function (el) {
            markReveal(el, d++);
        });

        document.querySelectorAll(cardSelectors.join(',')).forEach(function (el, idx) {
            var variant = idx % 11;
            if (variant === 4) {
                el.classList.add('g1-reveal-scale');
            } else if (variant === 8) {
                el.classList.add('g1-reveal-right');
            }
            markReveal(el, idx % 9);
        });

        document.querySelectorAll(sectionSelectors).forEach(function (el) {
            if (el.querySelector('.g1-reveal')) {
                return;
            }
            markReveal(el, d++ % 7);
        });

        document.querySelectorAll('footer').forEach(function (el) {
            if (el.querySelector('.g1-reveal')) {
                return;
            }
            markReveal(el, 0);
        });
    }

    function revealInRoot(root) {
        if (!root || !observer) {
            return;
        }
        root.querySelectorAll('.article-full').forEach(function (el) {
            if (el.classList.contains('g1-reveal') || el.classList.contains('animate-in')) {
                return;
            }
            markReveal(el, 0);
        });
    }

    var blogDetail = document.getElementById('article-detail');
    if (blogDetail && window.MutationObserver) {
        var debounce;
        var mo = new MutationObserver(function () {
            clearTimeout(debounce);
            debounce = setTimeout(function () {
                revealInRoot(blogDetail);
            }, 80);
        });
        mo.observe(blogDetail, { childList: true, subtree: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
