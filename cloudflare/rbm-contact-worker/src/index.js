const RESEND_API_URL = "https://api.resend.com/emails";
const BUSINESS_EMAIL = "rbmportasejanelas@gmail.com";
const FROM_ADDRESS = "RBM Portas e Janelas <geral@rbmportas.pt>";

const ALLOWED_ORIGINS = new Set([
    "https://www.rbmportas.pt",
    "https://rbmportas.pt",
]);

const PRODUCT_LABELS = { door: "Porta Blindada", window: "Janela PVC", both: "Ambos" };

function corsHeaders(origin) {
    const allowOrigin = ALLOWED_ORIGINS.has(origin) ? origin : "https://www.rbmportas.pt";
    return {
        "Access-Control-Allow-Origin": allowOrigin,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Vary": "Origin",
    };
}

function jsonResponse(body, status, origin) {
    return new Response(JSON.stringify(body), {
        status,
        headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
    });
}

function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (c) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
}

async function sendEmail(env, payload) {
    const res = await fetch(RESEND_API_URL, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    if (!res.ok) {
        throw new Error(`Resend respondeu ${res.status}: ${await res.text()}`);
    }
}

export default {
    async fetch(request, env) {
        const origin = request.headers.get("Origin") || "";

        if (request.method === "OPTIONS") {
            return new Response(null, { status: 204, headers: corsHeaders(origin) });
        }

        if (request.method !== "POST") {
            return jsonResponse({ success: false, error: "Método não permitido." }, 405, origin);
        }

        let data;
        try {
            data = await request.json();
        } catch {
            return jsonResponse({ success: false, error: "Pedido inválido." }, 400, origin);
        }

        const name = (data.name || "").toString().trim();
        const email = (data.email || "").toString().trim();
        const phone = (data.phone || "").toString().trim();
        const message = (data.message || "").toString().trim();
        const product = (data.product || "").toString().trim();
        const products = Array.isArray(data.products) ? data.products.map(String).filter(Boolean) : [];

        if (!name || !email) {
            return jsonResponse({ success: false, error: "Nome e email são obrigatórios." }, 400, origin);
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return jsonResponse({ success: false, error: "Email inválido." }, 400, origin);
        }

        const productLine = product ? (PRODUCT_LABELS[product] || product) : null;
        const productsHtml = products.length
            ? `<p><strong>Produtos escolhidos:</strong></p><ul>${products.map((p) => `<li>${escapeHtml(p)}</li>`).join("")}</ul>`
            : "";

        const businessHtml = `
            <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            ${phone ? `<p><strong>Telefone:</strong> ${escapeHtml(phone)}</p>` : ""}
            ${productLine ? `<p><strong>Tipo de produto:</strong> ${escapeHtml(productLine)}</p>` : ""}
            ${productsHtml}
            <p><strong>Mensagem:</strong><br>${escapeHtml(message || "(sem mensagem)").replace(/\n/g, "<br>")}</p>
        `;

        const clientHtml = `
            <p>Olá ${escapeHtml(name)},</p>
            <p>Obrigado pelo seu pedido. Recebemos os seus dados e a nossa equipa entrará em contacto consigo em breve.</p>
            ${productsHtml}
            <p>Se precisar de nos contactar diretamente, pode responder a este email ou ligar para +351 911 752 185 / +351 912 508 157.</p>
            <p>Cumprimentos,<br>Equipa RBM - Portas e Janelas</p>
        `;

        try {
            await sendEmail(env, {
                from: FROM_ADDRESS,
                to: BUSINESS_EMAIL,
                reply_to: email,
                subject: `Novo pedido de contacto — ${name}`,
                html: businessHtml,
            });

            await sendEmail(env, {
                from: FROM_ADDRESS,
                to: email,
                subject: "Recebemos o seu pedido — RBM Portas e Janelas",
                html: clientHtml,
            });

            return jsonResponse({ success: true }, 200, origin);
        } catch (err) {
            console.error("Falha ao enviar email:", err);
            return jsonResponse({ success: false, error: "Não foi possível enviar o email. Tente novamente mais tarde." }, 502, origin);
        }
    },
};
