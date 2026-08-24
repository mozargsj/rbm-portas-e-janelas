// Scroll-reveal: fade + slide up elements as they enter the viewport.
(function () {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;

    const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';
    const STEP_DELAY = 90;

    const groups = [
        document.querySelectorAll('.hero-content > *'),
        document.querySelectorAll('.hero-image'),
        document.querySelectorAll('.grid-showcase > .grid-item'),
        document.querySelectorAll('.differentials-grid > .differential'),
        document.querySelectorAll('.suppliers .container > *'),
        document.querySelectorAll('.process-timeline > .process-step'),
        document.querySelectorAll('.contact-cta > *'),
        document.querySelectorAll('.form-wrapper > *')
    ];

    const delays = new Map();
    groups.forEach((list) => {
        list.forEach((el, i) => {
            el.classList.add('reveal');
            delays.set(el, i * STEP_DELAY);
        });
    });

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const delay = delays.get(el) || 0;

            el.style.transition = `opacity 700ms ${EASE} ${delay}ms, transform 700ms ${EASE} ${delay}ms`;
            requestAnimationFrame(() => el.classList.add('is-visible'));

            el.addEventListener('transitionend', function cleanup(e) {
                if (e.propertyName !== 'transform') return;
                el.style.transition = '';
                el.removeEventListener('transitionend', cleanup);
            });

            obs.unobserve(el);
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    delays.forEach((_delay, el) => observer.observe(el));
})();
