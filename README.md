# RBM - Portas e Janelas

Site institucional e catálogo de produtos para a RBM - Portas e Janelas, comercialização e instalação de portas e janelas na zona de Tarouca, Lamego.

Site estático (HTML/CSS/JS puro, sem build tools nem framework), publicado via GitHub Pages a partir da raiz do repositório.

## Estrutura do projeto

```
index.html                    # Página inicial (tem de ficar na raiz — é o que o GitHub Pages serve)
pags/
    produtos.html              # Catálogo de produtos (filtros + grid)
    produto.html                # Ficha de detalhe de 1 produto (?id=<slug>)
    privacidade.html            # Política de privacidade (RGPD)
assets/
    css/
        style.css                # Nav, footer, tipografia base, secções institucionais da home
        produtos.css              # Catálogo, ficha de produto, carrinho de orçamento, cookies, página legal
    js/
        main.js                   # Formulário de contacto da home + smooth scroll
        products-data.js           # Fonte única dos produtos do catálogo (array PRODUCTS)
        catalog.js                  # Filtros + grid da página de catálogo
        product-page.js              # Ficha de produto + barra fixa ao rolar
        quote-cart.js                 # Carrinho de orçamento (localStorage) + envio por EmailJS
        cookie-consent.js              # Banner de cookies (padrão UE)
        email-config.js                # Chaves do EmailJS (preencher — ver secção abaixo)
    images/
        products/                    # Fotos reais de produtos (fornecidas pelos fabricantes)
        brands/                      # Logótipos reais de fornecedores (ex. Portrisa)
        badges/                      # Ícones de características reais (segurança/acústico/térmico/estanqueidade)
```

Não existe sistema de templates/includes (o projeto não usa build tools de propósito). Por isso a `<nav>`, o rodapé e o sprite de ícones SVG estão duplicados em `index.html` e em cada página de `pags/`. Ao editar um destes blocos (ex.: adicionar um link ao menu), replicar a alteração manualmente nas outras páginas.

## Decisões técnicas

### Porquê `pags/` só tem as páginas novas
O `index.html` tem de ficar na raiz do repositório porque é isso que o GitHub Pages serve automaticamente como página inicial do domínio, sem configuração extra. `pags/produtos.html`, `pags/produto.html` e `pags/privacidade.html` ficam um nível abaixo; os links entre páginas e os `<script src="...">` têm esse `../` em conta.

### Catálogo de produtos: fonte única de dados
Todos os produtos vêm de um único array, `PRODUCTS`, em [`assets/js/products-data.js`](assets/js/products-data.js). **Para adicionar um produto novo, basta acrescentar um objeto a este array** — nome, categoria, material, dimensões, sentido de abertura, imagens, descrição e uma tabela de especificações. Não é preciso mexer em mais nenhum ficheiro:
- Os filtros da página de catálogo (categoria, material, sentido de abertura) são **gerados automaticamente** a partir dos valores usados no array — por isso "aprendem" sozinhos à medida que o catálogo cresce.
- A **Porta de Segurança START (Portrisa)** e a **Janela PVC Brillant-Design 70 (Teccarsa)** já usam fotos e especificações técnicas reais dos fabricantes (extraídas das fichas técnicas fornecidas). Os restantes produtos ainda usam fotos de stock (Unsplash) como placeholder — substituir por fotos reais assim que existirem.
- `imagens` aceita tanto caminhos locais (`assets/images/products/...`) como URLs completos. Usar sempre `resolveAssetPath(caminho)` (definida em `products-data.js`) ao apresentar uma imagem — resolve automaticamente o `../` necessário nas páginas dentro de `pags/`.
- `destaques` (opcional): lista de selos com ícone + texto, mostrados na ficha de produto (ex. os selos reais de segurança/acústico/térmico/estanqueidade da Portrisa/Teccarsa em `assets/images/badges/`).

### Sem preços em lado nenhum
Por decisão do cliente, nem os cards do catálogo nem a ficha de produto mostram preços — o negócio funciona por orçamento (cada porta/janela é feita por medida), não por venda a preço fixo de catálogo.

### Carrinho de orçamento — não é uma loja
O ícone de saco no menu (topo de todas as páginas) abre uma lista dos produtos que o visitante marcou como "Adicionar ao Orçamento". Não há checkout nem pagamento — o botão final ("Solicitar Proposta") só recolhe nome/email/telefone/mensagem e envia tudo por email. Estado guardado em `localStorage`, por isso o carrinho persiste ao navegar entre páginas mas é local a cada browser/dispositivo.

### Envio de email: EmailJS
O site é 100% estático (sem servidor), por isso o envio de email do carrinho de orçamento e do formulário de contacto da home usa o [EmailJS](https://www.emailjs.com) — um serviço que envia o email diretamente do browser do visitante, sem precisar de backend. Isto introduz a **primeira dependência externa em runtime** do site (o SDK é carregado via CDN); todo o resto continua self-contained.

**Configurar o envio de email:**
1. Criar conta gratuita em [emailjs.com](https://www.emailjs.com) e ligar o email `geral@rbmportas.pt` como "Email Service".
2. Criar um "Email Template" que use as variáveis: `from_name`, `from_email`, `from_phone`, `message`, `products`.
3. Copiar a **Public Key** (Account → General), o **Service ID** e o **Template ID** e colar em [`assets/js/email-config.js`](assets/js/email-config.js).

Enquanto essas 3 chaves estiverem vazias, os formulários mostram um aviso a pedir para contactar `geral@rbmportas.pt` diretamente, em vez de falhar em silêncio.

### Cookies e privacidade
`assets/js/cookie-consent.js` injeta um banner de cookies (padrão UE: Aceitar / Rejeitar não essenciais) em todas as páginas na primeira visita, guardando a escolha em `localStorage`. `pags/privacidade.html` é um modelo genérico de política de privacidade (RGPD) — **não substitui aconselhamento jurídico**; recomenda-se revisão por um profissional antes de considerar definitivo.

### Biblioteca de ícones
Os ícones do site (menu, botões, cards, filtros, carrinho) são SVGs inline num `<symbol>` sprite (baseados no conjunto open-source [Lucide](https://lucide.dev)), reutilizados via `<use href="#icon-nome">` e uma classe utilitária `.icon` (tamanho `1em`, cor `currentColor`). Sem CDN de ícones — tudo embutido no HTML de cada página. **Importante:** cada `<svg class="icon">` precisa do atributo `viewBox="0 0 24 24"` explícito, senão alguns motores de renderização desenham o ícone no tamanho intrínseco (muito maior que o esperado) em vez de o escalar corretamente.

## Como correr localmente

Não há build nem servidor — basta abrir `index.html` num browser. Para testar os links relativos das páginas em `pags/` corretamente, é preferível servir a pasta com um servidor estático simples (ex. `npx serve` ou a extensão Live Server) em vez de abrir os ficheiros diretamente via `file://`.

## Histórico de alterações

> Sempre que uma funcionalidade nova for adicionada ao site, acrescentar uma entrada aqui (data + resumo). Isto mantém o histórico de decisões visível sem ter de vasculhar o `git log`.

- **2026-08-24** — Card do catálogo passa a ser clicável por inteiro (antes só o link "Ver Detalhes" navegava para a ficha do produto).
- **2026-08-24** — Fotos e especificações reais da Portrisa (Porta de Segurança START) e Teccarsa (Janela Brillant-Design 70) a substituir 2 dos produtos placeholder, com selos de destaque (segurança/acústico/térmico/estanqueidade) usando os ícones e logótipo reais dos fabricantes.
- **2026-08-24** — Catálogo de produtos completo: página de listagem com filtros dinâmicos, ficha de produto com galeria e tabela de especificações, barra fixa ao rolar, carrinho de orçamento (localStorage) com envio por EmailJS, banner de cookies (padrão UE) e página de política de privacidade. Nova pasta `pags/` para as páginas novas.
- **2026-08-24** — Menu aumentado (0.68rem → 0.85rem) e biblioteca de ícones SVG (sprite `<symbol>`, baseada em Lucide) a substituir os símbolos Unicode usados como placeholder em botões, cards e diferenciais.
- **2026-08-24** — Rebrand de "Saavedra Portas e Janelas" para "RBM - Portas e Janelas": logótipo, título, rodapé, email de contacto (`geral@rbmportas.pt`) e repositório GitHub renomeado para `rbm-portas-e-janelas`.
- **2026-08-24** — Ajuste do grid de produtos da home: cards "Portas"/"Janelas" alinhados em altura com as imagens ao lado, hover animado nos cards e zoom nas imagens ao passar o rato.
- **2026-08-20** — Ajustes de estilo ao logótipo e menu (destaque dourado, largura, aproximação ao modelo de marca).
