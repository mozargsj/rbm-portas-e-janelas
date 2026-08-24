/*
 * Carrinho de orçamento — não é uma compra, é só uma lista de produtos
 * que o cliente quer incluir no pedido de proposta. Estado guardado em
 * localStorage, partilhado entre todas as páginas do site.
 *
 * Depende de PRODUCTS (products-data.js) e EMAIL_CONFIG (email-config.js)
 * já carregados antes deste script, e do SDK global `emailjs` (via CDN)
 * para o envio efetivo do email.
 */
(function () {
    const STORAGE_KEY = "rbm-quote-cart";
    const inPagsFolder = location.pathname.includes("/pags/");
    const productHrefPrefix = inPagsFolder ? "produto.html?id=" : "pags/produto.html?id=";

    function getCart() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        } catch (e) {
            return [];
        }
    }

    function persistCart(cart) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
        } catch (e) {
            /* localStorage indisponível — carrinho fica só em memória desta página */
        }
        updateBadge();
    }

    function cartCount(cart) {
        return (cart || getCart()).reduce((sum, item) => sum + item.qty, 0);
    }

    function addToCart(productId) {
        const cart = getCart();
        const existing = cart.find((item) => item.id === productId);
        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({ id: productId, qty: 1 });
        }
        persistCart(cart);
        openDrawer();
    }

    function removeFromCart(productId) {
        persistCart(getCart().filter((item) => item.id !== productId));
        renderDrawerItems();
    }

    function changeQty(productId, delta) {
        const cart = getCart();
        const item = cart.find((i) => i.id === productId);
        if (!item) return;
        item.qty = Math.max(1, item.qty + delta);
        persistCart(cart);
        renderDrawerItems();
    }

    function updateBadge() {
        const badge = document.querySelector(".cart-trigger .cart-count");
        if (!badge) return;
        const count = cartCount();
        badge.textContent = String(count);
        badge.hidden = count === 0;
    }

    function injectTrigger() {
        const nav = document.querySelector("nav .container");
        if (!nav || nav.querySelector(".cart-trigger")) return;
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "cart-trigger";
        btn.setAttribute("aria-label", "Ver orçamento");
        btn.innerHTML =
            '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><use href="#icon-shopping-bag"></use></svg>' +
            '<span class="cart-count" aria-hidden="true" hidden>0</span>';
        const ctaButton = nav.querySelector(".cta-button");
        if (ctaButton) {
            nav.insertBefore(btn, ctaButton);
        } else {
            nav.appendChild(btn);
        }
        btn.addEventListener("click", openDrawer);
    }

    let drawerReady = false;

    function buildDrawer() {
        if (drawerReady) return;
        drawerReady = true;

        const overlay = document.createElement("div");
        overlay.className = "cart-overlay";
        overlay.innerHTML =
            '<div class="cart-drawer" role="dialog" aria-modal="true" aria-label="O seu orçamento">' +
            '<div class="cart-drawer-header">' +
            "<h2>O seu orçamento</h2>" +
            '<button type="button" class="cart-close" aria-label="Fechar"><svg class="icon" viewBox="0 0 24 24"><use href="#icon-x"></use></svg></button>' +
            "</div>" +
            '<div class="cart-drawer-body">' +
            '<p class="cart-empty">Ainda não adicionou nenhum produto ao orçamento.</p>' +
            '<ul class="cart-items"></ul>' +
            '<form class="cart-quote-form" novalidate>' +
            '<p class="cart-form-intro">Preencha os seus dados para solicitarmos a proposta com base nos produtos escolhidos.</p>' +
            '<div class="cart-form-group">' +
            '<label for="cart-name">Nome *</label>' +
            '<input type="text" id="cart-name" name="name" required placeholder="O seu nome">' +
            "</div>" +
            '<div class="cart-form-group">' +
            '<label for="cart-email">Email *</label>' +
            '<input type="email" id="cart-email" name="email" required placeholder="o.seu@email.pt">' +
            "</div>" +
            '<div class="cart-form-group">' +
            '<label for="cart-phone">Telefone</label>' +
            '<input type="tel" id="cart-phone" name="phone" placeholder="+351 XXX XXX XXX">' +
            "</div>" +
            '<div class="cart-form-group">' +
            '<label for="cart-message">Mensagem</label>' +
            '<textarea id="cart-message" name="message" rows="3" placeholder="Alguma informação adicional (opcional)"></textarea>' +
            "</div>" +
            '<button type="submit" class="cart-submit">' +
            '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><use href="#icon-send"></use></svg>' +
            " Solicitar Proposta</button>" +
            '<div class="cart-form-status" role="status" aria-live="polite"></div>' +
            "</form>" +
            "</div>" +
            "</div>";

        document.body.appendChild(overlay);

        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) closeDrawer();
        });
        overlay.querySelector(".cart-close").addEventListener("click", closeDrawer);
        overlay.querySelector(".cart-quote-form").addEventListener("submit", handleSubmit);

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && overlay.classList.contains("is-open")) closeDrawer();
        });
    }

    function renderDrawerItems() {
        const overlay = document.querySelector(".cart-overlay");
        if (!overlay) return;
        const cart = getCart();
        const list = overlay.querySelector(".cart-items");
        const emptyMsg = overlay.querySelector(".cart-empty");
        const form = overlay.querySelector(".cart-quote-form");

        list.innerHTML = "";

        if (cart.length === 0) {
            emptyMsg.hidden = false;
            form.hidden = true;
            return;
        }

        emptyMsg.hidden = true;
        form.hidden = false;

        cart.forEach((item) => {
            const product = (typeof PRODUCTS !== "undefined" ? PRODUCTS : []).find((p) => p.id === item.id);
            if (!product) return;
            const li = document.createElement("li");
            li.className = "cart-item";
            li.innerHTML =
                '<img class="cart-item-image" src="' + resolveAssetPath(product.imagens[0]) + '" alt="">' +
                '<div class="cart-item-info">' +
                '<a href="' + productHrefPrefix + product.id + '">' + product.nome + "</a>" +
                "<span>" + product.dimensoes + " &middot; " + product.abertura + "</span>" +
                '<div class="cart-item-qty">' +
                '<button type="button" class="qty-btn qty-decrease" data-id="' + product.id + '" aria-label="Diminuir quantidade"' + (item.qty <= 1 ? " disabled" : "") + ">&minus;</button>" +
                '<span class="qty-value">' + item.qty + "</span>" +
                '<button type="button" class="qty-btn qty-increase" data-id="' + product.id + '" aria-label="Aumentar quantidade">+</button>' +
                "</div>" +
                "</div>" +
                '<button type="button" class="cart-item-remove" data-id="' + product.id + '" aria-label="Remover produto">' +
                '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><use href="#icon-trash-2"></use></svg>' +
                "</button>";
            list.appendChild(li);
        });

        list.querySelectorAll(".cart-item-remove").forEach((btn) => {
            btn.addEventListener("click", () => removeFromCart(btn.getAttribute("data-id")));
        });
        list.querySelectorAll(".qty-decrease").forEach((btn) => {
            btn.addEventListener("click", () => changeQty(btn.getAttribute("data-id"), -1));
        });
        list.querySelectorAll(".qty-increase").forEach((btn) => {
            btn.addEventListener("click", () => changeQty(btn.getAttribute("data-id"), 1));
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const statusEl = form.querySelector(".cart-form-status");
        const cart = getCart();
        if (cart.length === 0) return;

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const phone = form.phone.value.trim();
        const message = form.message.value.trim();

        if (!name || !email) {
            statusEl.textContent = "Preencha pelo menos o nome e o email.";
            statusEl.className = "cart-form-status error";
            return;
        }

        const productsList = cart
            .map((item) => {
                const p = (typeof PRODUCTS !== "undefined" ? PRODUCTS : []).find((prod) => prod.id === item.id);
                if (!p) return null;
                return "- " + p.nome + " (" + p.dimensoes + ", abertura " + p.abertura + ")" + (item.qty > 1 ? " x" + item.qty : "");
            })
            .filter(Boolean)
            .join("\n");

        if (typeof isEmailConfigured !== "function" || !isEmailConfigured() || typeof emailjs === "undefined") {
            statusEl.textContent = "O envio automático de email ainda não está configurado. Contacte-nos diretamente para geral@rbmportas.pt com os produtos escolhidos.";
            statusEl.className = "cart-form-status error";
            return;
        }

        const submitBtn = form.querySelector(".cart-submit");
        submitBtn.disabled = true;
        submitBtn.classList.add("is-loading");
        statusEl.textContent = "";
        statusEl.className = "cart-form-status";

        emailjs
            .send(EMAIL_CONFIG.SERVICE_ID, EMAIL_CONFIG.TEMPLATE_ID, {
                from_name: name,
                from_email: email,
                from_phone: phone || "Não indicado",
                message: message || "Sem mensagem adicional.",
                products: productsList
            })
            .then(() => {
                statusEl.textContent = "Pedido enviado com sucesso! Entraremos em contacto em breve.";
                statusEl.className = "cart-form-status success";
                persistCart([]);
                renderDrawerItems();
                form.reset();
            })
            .catch(() => {
                statusEl.textContent = "Não foi possível enviar o pedido. Tente novamente ou contacte-nos para geral@rbmportas.pt.";
                statusEl.className = "cart-form-status error";
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.classList.remove("is-loading");
            });
    }

    function openDrawer() {
        buildDrawer();
        renderDrawerItems();
        document.querySelector(".cart-overlay").classList.add("is-open");
        document.body.classList.add("cart-open");
    }

    function closeDrawer() {
        const overlay = document.querySelector(".cart-overlay");
        if (overlay) overlay.classList.remove("is-open");
        document.body.classList.remove("cart-open");
    }

    function init() {
        injectTrigger();
        updateBadge();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

    if (typeof isEmailConfigured === "function" && isEmailConfigured() && typeof emailjs !== "undefined") {
        emailjs.init({ publicKey: EMAIL_CONFIG.PUBLIC_KEY });
    }

    window.RBMQuoteCart = { add: addToCart, openDrawer: openDrawer };
})();
