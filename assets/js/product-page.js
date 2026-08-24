/*
 * Página de detalhe de produto (pags/produto.html?id=<slug>).
 * Lê o produto da query string e preenche a página a partir de PRODUCTS.
 */
(function () {
    function getProduct() {
        const id = new URLSearchParams(location.search).get("id");
        return (typeof PRODUCTS !== "undefined" ? PRODUCTS : []).find((p) => p.id === id);
    }

    function buildGallery(images, altText) {
        const wrapper = document.createElement("div");
        wrapper.className = "product-gallery";

        const main = document.createElement("div");
        main.className = "product-gallery-main";

        images.forEach((src, index) => {
            const slide = document.createElement("div");
            slide.className = "gallery-slide" + (index === 0 ? " is-active" : "");
            slide.style.backgroundImage = "url('" + resolveAssetPath(src) + "')";
            slide.setAttribute("role", "img");
            slide.setAttribute("aria-label", altText + " - imagem " + (index + 1));
            main.appendChild(slide);
        });

        const zoomBtn = document.createElement("button");
        zoomBtn.type = "button";
        zoomBtn.className = "gallery-zoom-button";
        zoomBtn.setAttribute("aria-label", "Ver imagem em ecrã inteiro");
        zoomBtn.innerHTML = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><use href="#icon-maximize"></use></svg>';
        main.appendChild(zoomBtn);

        wrapper.appendChild(main);

        let current = 0;
        const slides = main.querySelectorAll(".gallery-slide");
        let thumbEls = null;

        function goTo(index) {
            current = (index + images.length) % images.length;
            slides.forEach((slide, i) => slide.classList.toggle("is-active", i === current));
            if (thumbEls) thumbEls.forEach((thumb, i) => thumb.classList.toggle("is-active", i === current));
        }

        if (images.length > 1) {
            const prev = document.createElement("button");
            prev.type = "button";
            prev.className = "carousel-arrow carousel-prev";
            prev.setAttribute("aria-label", "Imagem anterior");
            prev.innerHTML = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><use href="#icon-chevron-left"></use></svg>';

            const next = document.createElement("button");
            next.type = "button";
            next.className = "carousel-arrow carousel-next";
            next.setAttribute("aria-label", "Imagem seguinte");
            next.innerHTML = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><use href="#icon-chevron-right"></use></svg>';

            const thumbs = document.createElement("div");
            thumbs.className = "gallery-thumbs";
            images.forEach((src, index) => {
                const thumb = document.createElement("button");
                thumb.type = "button";
                thumb.className = "gallery-thumb" + (index === 0 ? " is-active" : "");
                thumb.style.backgroundImage = "url('" + resolveAssetPath(src) + "')";
                thumb.setAttribute("aria-label", "Ver imagem " + (index + 1));
                thumbs.appendChild(thumb);
            });

            thumbEls = thumbs.querySelectorAll(".gallery-thumb");

            prev.addEventListener("click", () => goTo(current - 1));
            next.addEventListener("click", () => goTo(current + 1));
            thumbEls.forEach((thumb, index) => thumb.addEventListener("click", () => goTo(index)));

            main.appendChild(prev);
            main.appendChild(next);
            wrapper.appendChild(thumbs);
        }

        slides.forEach((slide, index) => {
            slide.addEventListener("click", () => openLightbox(images, altText, index, goTo));
        });
        zoomBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            openLightbox(images, altText, current, goTo);
        });

        return wrapper;
    }

    /* ====== LIGHTBOX (visualização em ecrã inteiro, com navegação) ====== */
    let lightboxOverlay = null;
    let lightboxState = null;

    function ensureLightbox() {
        if (lightboxOverlay) return lightboxOverlay;

        const overlay = document.createElement("div");
        overlay.className = "lightbox-overlay";
        overlay.innerHTML =
            '<button type="button" class="lightbox-close" aria-label="Fechar"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><use href="#icon-x"></use></svg></button>' +
            '<button type="button" class="lightbox-arrow lightbox-prev" aria-label="Imagem anterior"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><use href="#icon-chevron-left"></use></svg></button>' +
            '<div class="lightbox-figure"><img class="lightbox-image" alt=""><span class="lightbox-counter"></span></div>' +
            '<button type="button" class="lightbox-arrow lightbox-next" aria-label="Imagem seguinte"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><use href="#icon-chevron-right"></use></svg></button>';
        document.body.appendChild(overlay);

        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) closeLightbox();
        });
        overlay.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
        overlay.querySelector(".lightbox-prev").addEventListener("click", () => navigateLightbox(-1));
        overlay.querySelector(".lightbox-next").addEventListener("click", () => navigateLightbox(1));

        document.addEventListener("keydown", (e) => {
            if (!overlay.classList.contains("is-open")) return;
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowLeft") navigateLightbox(-1);
            if (e.key === "ArrowRight") navigateLightbox(1);
        });

        lightboxOverlay = overlay;
        return overlay;
    }

    function renderLightboxImage() {
        const overlay = lightboxOverlay;
        const { images, altText, index } = lightboxState;
        const img = overlay.querySelector(".lightbox-image");
        img.src = resolveAssetPath(images[index]);
        img.alt = altText + " - imagem " + (index + 1);

        const counter = overlay.querySelector(".lightbox-counter");
        counter.textContent = images.length > 1 ? (index + 1) + " / " + images.length : "";

        const showArrows = images.length > 1;
        overlay.querySelector(".lightbox-prev").hidden = !showArrows;
        overlay.querySelector(".lightbox-next").hidden = !showArrows;
    }

    function navigateLightbox(delta) {
        if (!lightboxState) return;
        const total = lightboxState.images.length;
        lightboxState.index = (lightboxState.index + delta + total) % total;
        renderLightboxImage();
        if (lightboxState.onNavigate) lightboxState.onNavigate(lightboxState.index);
    }

    function openLightbox(images, altText, startIndex, onNavigate) {
        const overlay = ensureLightbox();
        lightboxState = { images: images, altText: altText, index: startIndex, onNavigate: onNavigate };
        renderLightboxImage();
        overlay.classList.add("is-open");
        document.body.classList.add("lightbox-open");
    }

    function closeLightbox() {
        if (lightboxOverlay) lightboxOverlay.classList.remove("is-open");
        document.body.classList.remove("lightbox-open");
    }

    function renderNotFound() {
        document.getElementById("product-content").innerHTML =
            '<div class="product-not-found">' +
            "<h1>Produto não encontrado</h1>" +
            "<p>O produto que procura pode ter sido removido ou o link está incorreto.</p>" +
            '<a class="hero-cta" href="produtos.html">Ver catálogo completo ' +
            '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><use href="#icon-arrow-right"></use></svg></a>' +
            "</div>";
    }

    function buildDestaques(product) {
        if (!product.destaques || !product.destaques.length) return "";
        return (
            '<div class="product-destaques">' +
            product.destaques
                .map(
                    (d) =>
                        '<div class="destaque-item"><img src="' + resolveAssetPath(d.icone) + '" alt="" class="destaque-icon">' +
                        "<span>" + d.label + "</span></div>"
                )
                .join("") +
            "</div>"
        );
    }

    function renderProduct(product) {
        document.title = product.nome + " | RBM - Portas e Janelas";

        const content = document.getElementById("product-content");
        content.innerHTML =
            '<div class="product-breadcrumb" role="navigation" aria-label="Localização"><a href="produtos.html">Catálogo</a> <span aria-hidden="true">/</span> <span>' + product.nome + "</span></div>" +
            '<div class="product-main" id="product-main">' +
            '<div class="product-gallery-slot"></div>' +
            '<div class="product-info">' +
            '<span class="product-card-category">' + product.categoria.charAt(0).toUpperCase() + product.categoria.slice(1) + " &middot; " + product.material + "</span>" +
            "<h1>" + product.nome + "</h1>" +
            '<div class="product-card-meta product-detail-meta">' +
            '<div class="meta-row"><span>Dimensões</span><strong>' + product.dimensoes + "</strong></div>" +
            '<div class="meta-row"><span>Sentido de abertura</span><strong>' + product.abertura + "</strong></div>" +
            "</div>" +
            buildDestaques(product) +
            "<p class=\"product-description\">" + product.descricao + "</p>" +
            '<button type="button" class="cart-add-button" data-product-id="' + product.id + '">' +
            '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><use href="#icon-shopping-bag"></use></svg>' +
            " Adicionar ao Orçamento</button>" +
            "</div>" +
            "</div>" +
            '<div class="product-specs">' +
            "<h2>Especificações</h2>" +
            '<table class="specs-table"><tbody>' +
            product.especificacoes.map((spec) => "<tr><th>" + spec.label + "</th><td>" + spec.valor + "</td></tr>").join("") +
            "</tbody></table>" +
            "</div>";

        content.querySelector(".product-gallery-slot").appendChild(buildGallery(product.imagens, product.nome));

        content.querySelectorAll(".cart-add-button").forEach((btn) => {
            btn.addEventListener("click", () => {
                if (window.RBMQuoteCart) window.RBMQuoteCart.add(btn.getAttribute("data-product-id"));
            });
        });

        buildStickyBar(product);
    }

    function buildStickyBar(product) {
        const bar = document.createElement("div");
        bar.className = "product-sticky-bar";
        bar.innerHTML =
            '<img src="' + resolveAssetPath(product.imagens[0]) + '" alt="" class="product-sticky-image">' +
            '<div class="product-sticky-info">' +
            "<strong>" + product.nome + "</strong>" +
            "<span>" + product.dimensoes + " &middot; " + product.abertura + "</span>" +
            "</div>" +
            '<button type="button" class="cart-add-button cart-add-button-sticky" data-product-id="' + product.id + '">' +
            '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><use href="#icon-shopping-bag"></use></svg>' +
            " Adicionar ao Orçamento</button>";
        document.body.appendChild(bar);

        bar.querySelector(".cart-add-button").addEventListener("click", () => {
            if (window.RBMQuoteCart) window.RBMQuoteCart.add(product.id);
        });

        // Observa o botão principal (não o bloco todo) para que a barra apareça
        // assim que o utilizador o ultrapassa a rolar — independente de quão
        // curto ou longo é o resto da página.
        const trigger = document.querySelector(".product-main .cart-add-button");
        if (trigger && "IntersectionObserver" in window) {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    const scrolledPast = !entry.isIntersecting && entry.boundingClientRect.top < 0;
                    bar.classList.toggle("is-visible", scrolledPast);
                },
                { threshold: 0 }
            );
            observer.observe(trigger);
        }
    }

    function init() {
        const product = getProduct();
        if (!product) {
            renderNotFound();
            return;
        }
        renderProduct(product);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
