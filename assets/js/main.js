// Form submission handler
const contactForm = document.getElementById('contact-form-element');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            product: formData.get('product'),
            message: formData.get('message'),
            timestamp: new Date().toISOString()
        };

        formStatus.textContent = '';
        formStatus.classList.remove('success', 'error');

        if (typeof isEmailConfigured !== 'function' || !isEmailConfigured() || typeof emailjs === 'undefined') {
            formStatus.textContent = 'O envio automático de email ainda não está configurado. Contacte-nos diretamente para geral@rbmportas.pt.';
            formStatus.classList.add('error');
            return;
        }

        const submitButton = contactForm.querySelector('.submit-button');
        if (submitButton) submitButton.disabled = true;

        const productLabels = { door: 'Porta Blindada', window: 'Janela PVC', both: 'Ambos' };

        emailjs
            .send(EMAIL_CONFIG.SERVICE_ID, EMAIL_CONFIG.TEMPLATE_ID, {
                from_name: data.name,
                from_phone: data.phone,
                message: 'Tipo de produto: ' + (productLabels[data.product] || data.product) + '\n\n' + data.message,
                products: '(pedido geral via formulário de contacto, sem produtos específicos do catálogo)'
            })
            .then(() => {
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
