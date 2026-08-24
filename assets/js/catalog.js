/*
 * Página de catálogo (pags/produtos.html): filtros dinâmicos + grid de
 * cards. Os filtros são construídos a partir dos valores existentes em
 * PRODUCTS (products-data.js), por isso "aprendem" sozinhos sempre que
 * um produto novo é acrescentado ao catálogo.
 */
(function () {
    const FILTER_LABELS = { categoria: "Categoria", material: "Material", abertura: "Sentido de abertura" };

    function slugify(value) {
        const accents = { "á": "a", "ã": "a", "â": "a", "à": "a", "é": "e", "ê": "e", "í": "i", "ó": "o", "õ": "o", "ô": "o", "ú": "u", "ç": "c" };
        return value
            .toLowerCase()
            .split("")
            .map((ch) => accents[ch] || ch)
            .join("")
            .replace(/[^a-z0-9]+/g, "-");
    }

    function capitalize(value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }

    function computeFacets(products) {
        const facets = { categoria: new Set(), material: new Set(), abertura: new Set() };
        products.forEach((p) => {
            facets.categoria.add(p.categoria);
            facets.material.add(p.material);
            facets.abertura.add(p.abertura);
        });
        return {
            categoria: Array.from(facets.categoria).sort(),
            material: Array.from(facets.material).sort(),
            abertura: Array.from(facets.abertura).sort()
        };
    }

    function renderFilters(facets, initialCategoria) {
        const container = document.getElementById("product-filters");
        if (!container) return;
        container.innerHTML = "";

        Object.keys(facets).forEach((key) => {
            if (facets[key].length === 0) return;
            const fieldset = document.createElement("fieldset");
            fieldset.className = "filter-group";
            const legend = document.createElement("legend");
            legend.textContent = FILTER_LABELS[key] || capitalize(key);
            fieldset.appendChild(legend);

            facets[key].forEach((value) => {
                const id = "filter-" + key + "-" + slugify(value);
                const label = document.createElement("label");
                label.className = "filter-checkbox";
                const checked = key === "categoria" && initialCategoria && value === initialCategoria;
                label.innerHTML =
                    '<input type="checkbox" id="' + id + '" data-filter-key="' + key + '" value="' + value + '"' + (checked ? " checked" : "") + ">" +
                    '<span>' + capitalize(value) + "</span>";
                fieldset.appendChild(label);
            });

            container.appendChild(fieldset);
        });
    }

    function getActiveFilters() {
        const filters = { categoria: [], material: [], abertura: [] };
        document.querySelectorAll("#product-filters input[type=checkbox]:checked").forEach((cb) => {
            const key = cb.getAttribute("data-filter-key");
            if (filters[key]) filters[key].push(cb.value);
        });
        return filters;
    }

    function buildCarousel(images, altText) {
        const wrapper = document.createElement("div");
        wrapper.className = "product-card-media";

        const carousel = document.createElement("div");
        carousel.className = "card-carousel";

        images.forEach((src, index) => {
            const slide = document.createElement("div");
            slide.className = "carousel-slide" + (index === 0 ? " is-active" : "");
            slide.style.backgroundImage = "url('" + resolveAssetPath(src) + "')";
            slide.setAttribute("role", "img");
            slide.setAttribute("aria-label", altText);
            carousel.appendChild(slide);
        });

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

            const dots = document.createElement("div");
            dots.className = "carousel-dots";
            images.forEach((_, index) => {
                const dot = document.createElement("span");
                dot.className = "carousel-dot" + (index === 0 ? " is-active" : "");
                dots.appendChild(dot);
            });

            let current = 0;
            const slides = carousel.querySelectorAll(".carousel-slide");
            const dotEls = dots.querySelectorAll(".carousel-dot");

            function goTo(index) {
                current = (index + images.length) % images.length;
                slides.forEach((slide, i) => slide.classList.toggle("is-active", i === current));
                dotEls.forEach((dot, i) => dot.classList.toggle("is-active", i === current));
            }

            prev.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                goTo(current - 1);
            });
            next.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                goTo(current + 1);
            });

            carousel.appendChild(prev);
            carousel.appendChild(next);
            wrapper.appendChild(carousel);
            wrapper.appendChild(dots);
        } else {
            wrapper.appendChild(carousel);
        }

        return wrapper;
    }

    function renderGrid(products) {
        const grid = document.getElementById("product-grid");
        const emptyMsg = document.getElementById("product-grid-empty");
        if (!grid) return;
        grid.innerHTML = "";

        if (products.length === 0) {
            if (emptyMsg) emptyMsg.hidden = false;
            return;
        }
        if (emptyMsg) emptyMsg.hidden = true;

        products.forEach((product) => {
            const card = document.createElement("article");
            card.className = "product-card";

            const media = buildCarousel(product.imagens, product.nome);

            const body = document.createElement("div");
            body.className = "product-card-body";
            body.innerHTML =
                '<span class="product-card-category">' + capitalize(product.categoria) + " &middot; " + product.material + "</span>" +
                '<h3 class="product-card-name">' + product.nome + "</h3>" +
                '<div class="product-card-meta">' +
                '<div class="meta-row"><span>Dimensões</span><strong>' + product.dimensoes + "</strong></div>" +
                '<div class="meta-row"><span>Sentido de abertura</span><strong>' + product.abertura + "</strong></div>" +
                "</div>" +
                '<a class="product-card-link" href="produto.html?id=' + product.id + '">Ver Detalhes ' +
                '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><use href="#icon-arrow-right"></use></svg></a>';

            card.appendChild(media);
            card.appendChild(body);
            grid.appendChild(card);

            // O card inteiro é clicável (não só o link "Ver Detalhes"), exceto
            // sobre as setas do carrossel ou sobre o próprio link (que já navega).
            card.classList.add("is-clickable");
            card.addEventListener("click", (e) => {
                if (e.target.closest(".carousel-arrow") || e.target.closest("a")) return;
                window.location.href = "produto.html?id=" + product.id;
            });
        });
    }

    function applyFilters() {
        const filters = getActiveFilters();
        const filtered = PRODUCTS.filter(
            (p) =>
                (filters.categoria.length === 0 || filters.categoria.includes(p.categoria)) &&
                (filters.material.length === 0 || filters.material.includes(p.material)) &&
                (filters.abertura.length === 0 || filters.abertura.includes(p.abertura))
        );
        renderGrid(filtered);
    }

    function init() {
        const params = new URLSearchParams(location.search);
        const initialCategoria = params.get("categoria");

        const facets = computeFacets(PRODUCTS);
        renderFilters(facets, initialCategoria);
        applyFilters();

        document.getElementById("product-filters").addEventListener("change", applyFilters);

        const clearBtn = document.getElementById("filters-clear");
        if (clearBtn) {
            clearBtn.addEventListener("click", () => {
                document.querySelectorAll("#product-filters input[type=checkbox]").forEach((cb) => (cb.checked = false));
                history.replaceState(null, "", location.pathname);
                applyFilters();
            });
        }

        const filtersToggle = document.getElementById("filters-toggle");
        const filtersPanel = document.getElementById("product-filters-panel");
        if (filtersToggle && filtersPanel) {
            filtersToggle.addEventListener("click", () => {
                const isOpen = filtersPanel.classList.toggle("is-open");
                filtersToggle.setAttribute("aria-expanded", String(isOpen));
            });
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
