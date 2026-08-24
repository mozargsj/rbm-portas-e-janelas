// Esconde a navegação ao descer a página, mostra de novo ao subir.
(function () {
    const nav = document.querySelector("nav");
    if (!nav) return;

    let lastScrollY = window.scrollY;
    const hideThreshold = nav.offsetHeight;
    let ticking = false;

    function onScroll() {
        const currentScrollY = window.scrollY;

        if (currentScrollY <= hideThreshold) {
            nav.classList.remove("nav-hidden");
        } else if (currentScrollY > lastScrollY) {
            nav.classList.add("nav-hidden");
        } else if (currentScrollY < lastScrollY) {
            nav.classList.remove("nav-hidden");
        }

        lastScrollY = currentScrollY;
        ticking = false;
    }

    window.addEventListener(
        "scroll",
        () => {
            if (!ticking) {
                window.requestAnimationFrame(onScroll);
                ticking = true;
            }
        },
        { passive: true }
    );
})();
