// Form submission handler
const contactForm = document.getElementById('contact-form-element');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            product: formData.get('product'),
            message: formData.get('message')
        };

        formStatus.textContent = '';
        formStatus.classList.remove('success', 'error');

        if (typeof isWorkerConfigured !== 'function' || !isWorkerConfigured()) {
            formStatus.textContent = 'O envio automático de email ainda não está configurado. Contacte-nos diretamente para geral@rbmportas.pt.';
            formStatus.classList.add('error');
            return;
        }

        const submitButton = contactForm.querySelector('.submit-button');
        if (submitButton) submitButton.disabled = true;

        fetch(WORKER_CONFIG.ENDPOINT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then((res) => res.json().then((body) => ({ ok: res.ok, body })))
            .then(({ ok, body }) => {
                if (!ok || !body.success) throw new Error(body.error || 'Falha no envio');
                formStatus.textContent = 'Obrigado! Entraremos em contacto em breve.';
                formStatus.classList.add('success');
                contactForm.reset();
                setTimeout(() => {
                    formStatus.textContent = '';
                    formStatus.classList.remove('success');
                }, 5000);
            })
            .catch((error) => {
                formStatus.textContent = 'Erro ao enviar. Tente novamente ou contacte-nos para geral@rbmportas.pt.';
                formStatus.classList.add('error');
                console.error('Error:', error);
            })
            .finally(() => {
                if (submitButton) submitButton.disabled = false;
            });
    });
}

// Cards do grid de produtos são clicáveis no todo, não só no link "Ver..."
document.querySelectorAll('.grid-item.card').forEach((card) => {
    const link = card.querySelector('a[href]');
    if (!link) return;
    card.classList.add('is-clickable');
    card.addEventListener('click', (e) => {
        if (e.target.closest('a')) return;
        window.location.href = link.getAttribute('href');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
