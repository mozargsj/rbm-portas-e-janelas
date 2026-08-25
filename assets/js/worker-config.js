/*
 * Configuração do Worker de contacto (Cloudflare) — ver cloudflare/rbm-contact-worker/.
 * Depois do deploy (npx wrangler deploy dentro dessa pasta), colar aqui o URL
 * mostrado no terminal (ex.: https://rbm-contact-worker.<subdominio>.workers.dev).
 *
 * Enquanto ENDPOINT_URL estiver vazio, os formulários do site mostram um aviso
 * em vez de tentar enviar (para não falhar em silêncio).
 */
const WORKER_CONFIG = {
    ENDPOINT_URL: "https://rbm-contact-worker.mozargsj.workers.dev"
};

function isWorkerConfigured() {
    return Boolean(WORKER_CONFIG.ENDPOINT_URL);
}
