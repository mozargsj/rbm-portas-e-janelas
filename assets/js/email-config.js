/*
 * Configuração do EmailJS — preencher com os dados da sua conta em
 * https://www.emailjs.com (plano gratuito é suficiente para começar).
 *
 * Passo a passo (ver também README.md > "Configurar o envio de email"):
 *   1. Criar conta em emailjs.com e ligar o email geral@rbmportas.pt como "Service".
 *   2. Criar um "Template" com os campos usados abaixo (from_name, from_email,
 *      from_phone, message, products).
 *   3. Copiar a "Public Key" (Account > General) e os IDs do Service/Template
 *      e colar nas 3 constantes abaixo.
 *
 * Enquanto estas constantes estiverem vazias, os formulários do site
 * mostram um aviso em vez de tentar enviar (para não falhar em silêncio).
 */
const EMAIL_CONFIG = {
    PUBLIC_KEY: "",
    SERVICE_ID: "",
    TEMPLATE_ID: ""
};

function isEmailConfigured() {
    return Boolean(EMAIL_CONFIG.PUBLIC_KEY && EMAIL_CONFIG.SERVICE_ID && EMAIL_CONFIG.TEMPLATE_ID);
}
