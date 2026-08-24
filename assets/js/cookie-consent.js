/*
 * Banner de cookies (padrão UE). Injeta o próprio HTML para não ter de
 * duplicar este bloco em todas as páginas — basta incluir este script.
 */
(function () {
    const STORAGE_KEY = "rbm-cookie-consent";

    function getPrivacyHref() {
        // pags/*.html estão um nível abaixo da raiz; index.html está na raiz.
        const inPagsFolder = location.pathname.includes("/pags/");
        return inPagsFolder ? "privacidade.html" : "pags/privacidade.html";
    }

    function hasChoice() {
        try {
            return Boolean(localStorage.getItem(STORAGE_KEY));
        } catch (e) {
            return true; // se localStorage falhar, não insiste com o banner
        }
    }

    function saveChoice(value) {
        try {
            localStorage.setItem(STORAGE_KEY, value);
        } catch (e) {
            /* localStorage indisponível — ignora silenciosamente */
        }
    }

    function renderBanner() {
        const banner = document.createElement("div");
        banner.className = "cookie-banner";
        banner.setAttribute("role", "dialog");
        banner.setAttribute("aria-label", "Consentimento de cookies");
        banner.innerHTML =
            '<p>Usamos cookies essenciais ao funcionamento do site. Não usamos cookies de publicidade ou de terceiros. Saiba mais na nossa ' +
            '<a href="' + getPrivacyHref() + '">Política de Privacidade</a>.</p>' +
            '<div class="cookie-banner-actions">' +
            '<button type="button" class="cookie-btn cookie-btn-reject">Rejeitar não essenciais</button>' +
            '<button type="button" class="cookie-btn cookie-btn-accept">Aceitar todos</button>' +
            "</div>";

        document.body.appendChild(banner);
        requestAnimationFrame(() => banner.classList.add("is-visible"));

        banner.querySelector(".cookie-btn-accept").addEventListener("click", () => {
            saveChoice("accepted");
            banner.classList.remove("is-visible");
            setTimeout(() => banner.remove(), 300);
        });

        banner.querySelector(".cookie-btn-reject").addEventListener("click", () => {
            saveChoice("rejected");
            banner.classList.remove("is-visible");
            setTimeout(() => banner.remove(), 300);
        });
    }

    if (!hasChoice()) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", renderBanner);
        } else {
            renderBanner();
        }
    }
})();
