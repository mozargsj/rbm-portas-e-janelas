/*
 * Catálogo de produtos — fonte única de dados.
 *
 * Para adicionar um produto novo, acrescente um objeto a este array.
 * Os filtros da página de catálogo (categoria, material, sentido de
 * abertura) são gerados automaticamente a partir dos valores usados
 * aqui, por isso não é preciso mexer em mais nenhum ficheiro.
 *
 * Imagens: a "Porta de Segurança START" (3 variantes de cor, uma por
 * produto) e as janelas em PVC/alumínio usam especificações técnicas
 * reais (ver "destaques"). Os restantes produtos ainda usam fotos de
 * stock (Unsplash) como placeholder — substituir por fotos reais assim
 * que existirem.
 *
 * `imagens`: caminhos relativos à raiz do site (ex. "assets/images/...")
 * ou URLs completos (https://...). Usar sempre resolveAssetPath(caminho)
 * ao apresentar uma imagem — resolve automaticamente o "../" necessário
 * quando a página está dentro de pags/.
 *
 * `destaques` (opcional): selo de características com ícone, mostrado
 * na ficha de produto (ex. selos reais do fabricante).
 */
function resolveAssetPath(p) {
    if (/^https?:\/\//.test(p) || p.charAt(0) === "/") return p;
    return (location.pathname.indexOf("/pags/") !== -1 ? "../" : "") + p;
}

const PRODUCTS = [
    {
        id: "porta-blindada-classica-madeira",
        categoria: "portas",
        material: "Madeira",
        nome: "Porta Blindada Clássica em Madeira",
        dimensoes: "90 x 210 cm",
        abertura: "Direita",
        imagens: [
            "assets/images/products/porta-blindada-madeira-nogueira-1.jpg",
            "assets/images/products/porta-blindada-madeira-nogueira-2.jpg"
        ],
        descricao: "Porta blindada de entrada com acabamento em madeira maciça, estrutura reforçada e fechadura de segurança multiponto. Indicada para entradas principais que exigem robustez sem abdicar de um acabamento tradicional.",
        especificacoes: [
            { label: "Categoria", valor: "Porta exterior" },
            { label: "Material", valor: "Madeira maciça" },
            { label: "Dimensões", valor: "90 x 210 cm" },
            { label: "Sentido de abertura", valor: "Direita" },
            { label: "Classe de segurança", valor: "Multiponto, classe 3" },
            { label: "Isolamento térmico", valor: "Reforçado" },
            { label: "Cor", valor: "Nogueira" }
        ]
    },
    {
        id: "porta-lacada-branca-pvc",
        categoria: "portas",
        material: "PVC",
        nome: "Porta Lacada Branca em PVC",
        dimensoes: "90 x 210 cm",
        abertura: "Esquerda",
        imagens: [
            "https://plus.unsplash.com/premium_photo-1680120254458-369c37689b47?q=85&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=85"
        ],
        descricao: "Porta de entrada em PVC lacado a branco, leve manutenção e excelente isolamento térmico e acústico. Boa opção para reabilitações onde se procura um acabamento limpo e contemporâneo.",
        especificacoes: [
            { label: "Categoria", valor: "Porta exterior" },
            { label: "Material", valor: "PVC" },
            { label: "Dimensões", valor: "90 x 210 cm" },
            { label: "Sentido de abertura", valor: "Esquerda" },
            { label: "Classe de segurança", valor: "Multiponto, classe 2" },
            { label: "Isolamento térmico", valor: "Standard" },
            { label: "Cor", valor: "Branco" }
        ]
    },
    {
        id: "porta-seguranca-start-castanho",
        categoria: "portas",
        material: "Aço",
        nome: "Porta de Segurança START — Castanho",
        dimensoes: "90 x 210 cm",
        abertura: "Direita",
        imagens: [
            "assets/images/products/porta-seguranca-start-castanho.jpg"
        ],
        descricao: "Porta de segurança da gama START, resultado de mais de 20 anos de investigação em portas anti-arrombamento. Estrutura em aço eletrozincado reforçada com ómegas verticais, especialmente fortalecida na zona da fechadura, dobradiças e pontos de fecho — sem comprometer o acabamento. Acabamento exterior em castanho, para quem procura robustez sem abdicar de um aspeto tradicional.",
        especificacoes: [
            { label: "Categoria", valor: "Porta de segurança" },
            { label: "Material", valor: "Aço eletrozincado, reforçado com ómegas verticais" },
            { label: "Dimensões (passagem livre)", valor: "800–900 x 2000–2100 mm (sob medida até 1100 x 2400 mm)" },
            { label: "Sentido de abertura", valor: "Direita ou Esquerda, à escolha" },
            { label: "Classe de segurança", valor: "Nível 3 (RC3), segundo EN 1627:2011" },
            { label: "Pontos de fecho", valor: "12 (gama Start) ou 14 (opção gama Max)" },
            { label: "Atenuação acústica", valor: "28 dB (opção reforçada: 41 dB)" },
            { label: "Isolamento térmico", valor: "2,9 W/(m²K) (opção reforçada: 1,6 W/m²K)" },
            { label: "Fechadura", valor: "Cilindro europeu de alta segurança, 1 chave de obra + 5 chaves definitivas" },
            { label: "Acabamento exterior", valor: "Castanho (folha decorativa amadeirada)" },
            { label: "Acabamento interior", valor: "Branco liso" },
            { label: "Cor do aro", valor: "Castanho" }
        ],
        destaques: [
            { icone: "assets/images/badges/seguranca.png", label: "Segurança nível 3 (RC3)" },
            { icone: "assets/images/badges/acustico.png", label: "Atenuação acústica até 41 dB" },
            { icone: "assets/images/badges/termico.png", label: "Térmico até 1,6 W/(m²K)" }
        ]
    },
    {
        id: "porta-seguranca-start-carvalho",
        categoria: "portas",
        material: "Aço",
        nome: "Porta de Segurança START — Carvalho",
        dimensoes: "90 x 210 cm",
        abertura: "Direita",
        imagens: [
            "assets/images/products/porta-seguranca-start-carvalho.jpg"
        ],
        descricao: "Porta de segurança da gama START, resultado de mais de 20 anos de investigação em portas anti-arrombamento. Estrutura em aço eletrozincado reforçada com ómegas verticais, especialmente fortalecida na zona da fechadura, dobradiças e pontos de fecho — sem comprometer o acabamento. Acabamento exterior em carvalho, para quem procura robustez sem abdicar de um aspeto tradicional.",
        especificacoes: [
            { label: "Categoria", valor: "Porta de segurança" },
            { label: "Material", valor: "Aço eletrozincado, reforçado com ómegas verticais" },
            { label: "Dimensões (passagem livre)", valor: "800–900 x 2000–2100 mm (sob medida até 1100 x 2400 mm)" },
            { label: "Sentido de abertura", valor: "Direita ou Esquerda, à escolha" },
            { label: "Classe de segurança", valor: "Nível 3 (RC3), segundo EN 1627:2011" },
            { label: "Pontos de fecho", valor: "12 (gama Start) ou 14 (opção gama Max)" },
            { label: "Atenuação acústica", valor: "28 dB (opção reforçada: 41 dB)" },
            { label: "Isolamento térmico", valor: "2,9 W/(m²K) (opção reforçada: 1,6 W/m²K)" },
            { label: "Fechadura", valor: "Cilindro europeu de alta segurança, 1 chave de obra + 5 chaves definitivas" },
            { label: "Acabamento exterior", valor: "Carvalho (folha decorativa amadeirada)" },
            { label: "Acabamento interior", valor: "Branco liso" },
            { label: "Cor do aro", valor: "Carvalho" }
        ],
        destaques: [
            { icone: "assets/images/badges/seguranca.png", label: "Segurança nível 3 (RC3)" },
            { icone: "assets/images/badges/acustico.png", label: "Atenuação acústica até 41 dB" },
            { icone: "assets/images/badges/termico.png", label: "Térmico até 1,6 W/(m²K)" }
        ]
    },
    {
        id: "porta-seguranca-start-cinza",
        categoria: "portas",
        material: "Aço",
        nome: "Porta de Segurança START — Cinzento",
        dimensoes: "90 x 210 cm",
        abertura: "Direita",
        imagens: [
            "assets/images/products/porta-seguranca-start-cinza.jpg"
        ],
        descricao: "Porta de segurança da gama START, resultado de mais de 20 anos de investigação em portas anti-arrombamento. Estrutura em aço eletrozincado reforçada com ómegas verticais, especialmente fortalecida na zona da fechadura, dobradiças e pontos de fecho — sem comprometer o acabamento. Acabamento exterior em cinzento, para um aspeto contemporâneo.",
        especificacoes: [
            { label: "Categoria", valor: "Porta de segurança" },
            { label: "Material", valor: "Aço eletrozincado, reforçado com ómegas verticais" },
            { label: "Dimensões (passagem livre)", valor: "800–900 x 2000–2100 mm (sob medida até 1100 x 2400 mm)" },
            { label: "Sentido de abertura", valor: "Direita ou Esquerda, à escolha" },
            { label: "Classe de segurança", valor: "Nível 3 (RC3), segundo EN 1627:2011" },
            { label: "Pontos de fecho", valor: "12 (gama Start) ou 14 (opção gama Max)" },
            { label: "Atenuação acústica", valor: "28 dB (opção reforçada: 41 dB)" },
            { label: "Isolamento térmico", valor: "2,9 W/(m²K) (opção reforçada: 1,6 W/m²K)" },
            { label: "Fechadura", valor: "Cilindro europeu de alta segurança, 1 chave de obra + 5 chaves definitivas" },
            { label: "Acabamento exterior", valor: "Cinzento liso" },
            { label: "Acabamento interior", valor: "Branco liso" },
            { label: "Cor do aro", valor: "Cinzento" }
        ],
        destaques: [
            { icone: "assets/images/badges/seguranca.png", label: "Segurança nível 3 (RC3)" },
            { icone: "assets/images/badges/acustico.png", label: "Atenuação acústica até 41 dB" },
            { icone: "assets/images/badges/termico.png", label: "Térmico até 1,6 W/(m²K)" }
        ]
    },
    {
        id: "janela-pvc-oscilobatente",
        categoria: "janelas",
        material: "PVC",
        nome: "Janela PVC Oscilobatente Brillant-Design 70",
        dimensoes: "120 x 120 cm",
        abertura: "Oscilobatente",
        imagens: [
            "https://plus.unsplash.com/premium_photo-1677521321903-6d2bdd279267?q=88&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=85"
        ],
        descricao: "Janela em PVC com sistema oscilobatente (abre e bascula), baseada no sistema Brillant-Design 70 — perfil de 70mm com 5 câmaras, junta dupla perimetral e reforço metálico. Excelente desempenho térmico, acústico e de estanqueidade para a generalidade das divisões.",
        especificacoes: [
            { label: "Categoria", valor: "Janela" },
            { label: "Material", valor: "PVC, perfil de 70 mm com 5 câmaras" },
            { label: "Dimensões", valor: "120 x 120 cm (máximo de fabrico: 200 x 240 cm)" },
            { label: "Sentido de abertura", valor: "Oscilobatente" },
            { label: "Vidro", valor: "Duplo, baixo emissivo (até 41 mm de espessura)" },
            { label: "Isolamento térmico", valor: "Uw = 0,95 W/(m²K)" },
            { label: "Isolamento acústico", valor: "Até 45 dB" },
            { label: "Estanqueidade à água", valor: "Até classe 4 (EN 1027)" },
            { label: "Resistência ao vento", valor: "Até classe C5 (EN 12211)" },
            { label: "Cor", valor: "Branco" }
        ],
        destaques: [
            { icone: "assets/images/badges/termico.png", label: "Térmico Uw = 0,95 W/(m²K)" },
            { icone: "assets/images/badges/acustico.png", label: "Acústico até 45 dB" },
            { icone: "assets/images/badges/estanqueidade.png", label: "Estanqueidade até classe 4" }
        ]
    },
    {
        id: "janela-aluminio-correr",
        categoria: "janelas",
        material: "Alumínio",
        nome: "Janela de Correr em Alumínio",
        dimensoes: "150 x 120 cm",
        abertura: "Corredeira",
        imagens: [
            "assets/images/products/janela-aluminio-correr.jpg"
        ],
        descricao: "Janela de correr em alumínio com corte térmico, ideal para vãos largos onde se procura maximizar a entrada de luz sem ocupar espaço com a abertura.",
        especificacoes: [
            { label: "Categoria", valor: "Janela" },
            { label: "Material", valor: "Alumínio com corte térmico" },
            { label: "Dimensões", valor: "150 x 120 cm" },
            { label: "Sentido de abertura", valor: "Corredeira" },
            { label: "Vidro", valor: "Duplo" },
            { label: "Isolamento térmico", valor: "Standard" },
            { label: "Cor", valor: "Cinza antracite" }
        ]
    }
];
