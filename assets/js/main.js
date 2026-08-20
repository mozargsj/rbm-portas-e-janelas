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

        try {
            console.log('Form Data:', data);
            formStatus.textContent = 'Obrigado! Entraremos em contacto em breve.';
            formStatus.classList.add('success');
            contactForm.reset();

            setTimeout(() => {
                formStatus.textContent = '';
                formStatus.classList.remove('success');
            }, 5000);
        } catch (error) {
            formStatus.textContent = 'Erro ao enviar. Tente novamente.';
            formStatus.classList.add('error');
            console.error('Error:', error);
        }
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
