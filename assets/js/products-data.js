/*
 * Catálogo de produtos — fonte única de dados.
 *
 * Para adicionar um produto novo, acrescente um objeto a este array.
 * Os filtros da página de catálogo (categoria, material, sentido de
 * abertura) são gerados automaticamente a partir dos valores usados
 * aqui, por isso não é preciso mexer em mais nenhum ficheiro.
 *
 * Todas as portas de segurança seguem a gama Portrisa: modelo
 * "Portrisa EURO II Start" como base da gama, e "Portrisa POWER II"
 * como gama superior (resistência ao fogo). Nomes de acabamento
 * conforme o "Catálogo de Acabamentos PORTRISA": interior sempre em
 * painel Placor, cor Branco Portrisa; exterior nas cores Nogueira
 * (coleção Nature — Nogueira Imperatur), Castanho ou Carvalho (folha
 * decorativa amadeirada) ou Cinzento liso, consoante o produto.
 * Nas janelas (perfil PVC/alumínio, catálogo Brillant-Design), o
 * acabamento é interior branco e exterior nogueira.
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
        material: "Aço",
        nome: "Porta de Segurança EURO II Start — Nogueira",
        dimensoes: "90 x 210 cm",
        abertura: "Direita",
        imagens: [
            "assets/images/products/porta-blindada-madeira-nogueira-1.jpg",
            "assets/images/products/porta-blindada-madeira-nogueira-2.jpg"
        ],
        descricao: "Porta de segurança do modelo Portrisa EURO II Start, com estrutura em aço eletrozincado reforçada e fechadura de segurança multiponto. Acabamento exterior na coleção Nature, cor Nogueira Imperatur, e acabamento interior em painel Placor, cor Branco Portrisa — robustez de porta de segurança com o aspeto tradicional da madeira.",
        especificacoes: [
            { label: "Categoria", valor: "Porta de segurança" },
            { label: "Modelo", valor: "Portrisa EURO II Start" },
            { label: "Material", valor: "Aço eletrozincado, reforçado com ómegas verticais" },
            { label: "Dimensões", valor: "90 x 210 cm" },
            { label: "Sentido de abertura", valor: "Direita" },
            { label: "Classe de segurança", valor: "Nível 3 (RC3), segundo EN 1627:2011" },
            { label: "Isolamento térmico", valor: "2,9 W/(m²K) (opção reforçada: 1,6 W/m²K)" },
            { label: "Acabamento exterior", valor: "Nature — Nogueira Imperatur" },
            { label: "Acabamento interior", valor: "Placor — Branco Portrisa" },
            { label: "Cor do aro", valor: "Branco, Cinza Claro, Castanho ou Preto (opções padrão)" }
        ],
        destaques: [
            { icone: "assets/images/badges/seguranca.png", label: "Segurança nível 3 (RC3)" },
            { icone: "assets/images/badges/acustico.png", label: "Atenuação acústica 28 dB" },
            { icone: "assets/images/badges/acustico.png", label: "Até 41 dB com opção reforçada" }
        ]
    },
    {
        id: "porta-seguranca-start-castanho",
        categoria: "portas",
        material: "Aço",
        nome: "Porta de Segurança EURO II Start — Castanho",
        dimensoes: "90 x 210 cm",
        abertura: "Direita",
        imagens: [
            "assets/images/products/porta-seguranca-start-castanho.jpg"
        ],
        descricao: "Porta de segurança do modelo Portrisa EURO II Start, resultado de mais de 20 anos de investigação em portas anti-arrombamento. Estrutura em aço eletrozincado reforçada com ómegas verticais, especialmente fortalecida na zona da fechadura, dobradiças e pontos de fecho — sem comprometer o acabamento. Acabamento exterior castanho (folha decorativa amadeirada), para quem procura robustez sem abdicar de um aspeto tradicional.",
        especificacoes: [
            { label: "Categoria", valor: "Porta de segurança" },
            { label: "Modelo", valor: "Portrisa EURO II Start" },
            { label: "Material", valor: "Aço eletrozincado, reforçado com ómegas verticais" },
            { label: "Dimensões (passagem livre)", valor: "800–900 x 2000–2100 mm (sob medida até 1100 x 2400 mm)" },
            { label: "Sentido de abertura", valor: "Direita ou Esquerda, à escolha" },
            { label: "Classe de segurança", valor: "Nível 3 (RC3), segundo EN 1627:2011" },
            { label: "Pontos de fecho", valor: "12 (gama Start) ou 14 (opção gama Max)" },
            { label: "Atenuação acústica", valor: "28 dB (opção reforçada: 41 dB)" },
            { label: "Isolamento térmico", valor: "2,9 W/(m²K) (opção reforçada: 1,6 W/m²K)" },
            { label: "Fechadura", valor: "Cilindro europeu de alta segurança, 1 chave de obra + 5 chaves definitivas" },
            { label: "Acabamento exterior", valor: "Castanho (folha decorativa amadeirada)" },
            { label: "Acabamento interior", valor: "Placor — Branco Portrisa" },
            { label: "Cor do aro", valor: "Branco, Cinza Claro, Castanho ou Preto (opções padrão)" }
        ],
        destaques: [
            { icone: "assets/images/badges/seguranca.png", label: "Segurança nível 3 (RC3)" },
            { icone: "assets/images/badges/acustico.png", label: "Atenuação acústica 28 dB" },
            { icone: "assets/images/badges/acustico.png", label: "Até 41 dB com opção reforçada" }
        ]
    },
    {
        id: "porta-seguranca-start-carvalho",
        categoria: "portas",
        material: "Aço",
        nome: "Porta de Segurança EURO II Start — Carvalho",
        dimensoes: "90 x 210 cm",
        abertura: "Direita",
        imagens: [
            "assets/images/products/porta-seguranca-start-carvalho.jpg"
        ],
        descricao: "Porta de segurança do modelo Portrisa EURO II Start, resultado de mais de 20 anos de investigação em portas anti-arrombamento. Estrutura em aço eletrozincado reforçada com ómegas verticais, especialmente fortalecida na zona da fechadura, dobradiças e pontos de fecho — sem comprometer o acabamento. Acabamento exterior carvalho (folha decorativa amadeirada), para quem procura robustez sem abdicar de um aspeto tradicional.",
        especificacoes: [
            { label: "Categoria", valor: "Porta de segurança" },
            { label: "Modelo", valor: "Portrisa EURO II Start" },
            { label: "Material", valor: "Aço eletrozincado, reforçado com ómegas verticais" },
            { label: "Dimensões (passagem livre)", valor: "800–900 x 2000–2100 mm (sob medida até 1100 x 2400 mm)" },
            { label: "Sentido de abertura", valor: "Direita ou Esquerda, à escolha" },
            { label: "Classe de segurança", valor: "Nível 3 (RC3), segundo EN 1627:2011" },
            { label: "Pontos de fecho", valor: "12 (gama Start) ou 14 (opção gama Max)" },
            { label: "Atenuação acústica", valor: "28 dB (opção reforçada: 41 dB)" },
            { label: "Isolamento térmico", valor: "2,9 W/(m²K) (opção reforçada: 1,6 W/m²K)" },
            { label: "Fechadura", valor: "Cilindro europeu de alta segurança, 1 chave de obra + 5 chaves definitivas" },
            { label: "Acabamento exterior", valor: "Carvalho (folha decorativa amadeirada)" },
            { label: "Acabamento interior", valor: "Placor — Branco Portrisa" },
            { label: "Cor do aro", valor: "Branco, Cinza Claro, Castanho ou Preto (opções padrão)" }
        ],
        destaques: [
            { icone: "assets/images/badges/seguranca.png", label: "Segurança nível 3 (RC3)" },
            { icone: "assets/images/badges/acustico.png", label: "Atenuação acústica 28 dB" },
            { icone: "assets/images/badges/acustico.png", label: "Até 41 dB com opção reforçada" }
        ]
    },
    {
        id: "porta-seguranca-start-cinza",
        categoria: "portas",
        material: "Aço",
        nome: "Porta de Segurança EURO II Start — Cinzento",
        dimensoes: "90 x 210 cm",
        abertura: "Direita",
        imagens: [
            "assets/images/products/porta-seguranca-start-cinza.jpg"
        ],
        descricao: "Porta de segurança do modelo Portrisa EURO II Start, resultado de mais de 20 anos de investigação em portas anti-arrombamento. Estrutura em aço eletrozincado reforçada com ómegas verticais, especialmente fortalecida na zona da fechadura, dobradiças e pontos de fecho — sem comprometer o acabamento. Acabamento exterior cinzento liso, para um aspeto contemporâneo.",
        especificacoes: [
            { label: "Categoria", valor: "Porta de segurança" },
            { label: "Modelo", valor: "Portrisa EURO II Start" },
            { label: "Material", valor: "Aço eletrozincado, reforçado com ómegas verticais" },
            { label: "Dimensões (passagem livre)", valor: "800–900 x 2000–2100 mm (sob medida até 1100 x 2400 mm)" },
            { label: "Sentido de abertura", valor: "Direita ou Esquerda, à escolha" },
            { label: "Classe de segurança", valor: "Nível 3 (RC3), segundo EN 1627:2011" },
            { label: "Pontos de fecho", valor: "12 (gama Start) ou 14 (opção gama Max)" },
            { label: "Atenuação acústica", valor: "28 dB (opção reforçada: 41 dB)" },
            { label: "Isolamento térmico", valor: "2,9 W/(m²K) (opção reforçada: 1,6 W/m²K)" },
            { label: "Fechadura", valor: "Cilindro europeu de alta segurança, 1 chave de obra + 5 chaves definitivas" },
            { label: "Acabamento exterior", valor: "Cinzento liso" },
            { label: "Acabamento interior", valor: "Placor — Branco Portrisa" },
            { label: "Cor do aro", valor: "Branco, Cinza Claro, Castanho ou Preto (opções padrão)" }
        ],
        destaques: [
            { icone: "assets/images/badges/seguranca.png", label: "Segurança nível 3 (RC3)" },
            { icone: "assets/images/badges/acustico.png", label: "Atenuação acústica 28 dB" },
            { icone: "assets/images/badges/acustico.png", label: "Até 41 dB com opção reforçada" }
        ]
    },
    {
        id: "janela-pvc-correr-castanho",
        categoria: "janelas",
        material: "PVC",
        nome: "Janela de Correr em PVC — Castanho",
        dimensoes: "150 x 120 cm",
        abertura: "Corredeira",
        imagens: [
            "assets/images/products/janela-aluminio-correr.jpg"
        ],
        descricao: "Janela de correr em PVC, ideal para vãos largos onde se procura maximizar a entrada de luz sem ocupar espaço com a abertura. Acabamento interior branco e exterior em nogueira.",
        especificacoes: [
            { label: "Categoria", valor: "Janela" },
            { label: "Material", valor: "PVC" },
            { label: "Dimensões", valor: "150 x 120 cm" },
            { label: "Sentido de abertura", valor: "Corredeira" },
            { label: "Vidro", valor: "Duplo" },
            { label: "Isolamento térmico", valor: "Standard" },
            { label: "Acabamento interior", valor: "Branco" },
            { label: "Acabamento exterior", valor: "Nogueira" }
        ]
    },
    {
        id: "janela-pvc-correr-branco",
        categoria: "janelas",
        material: "PVC",
        nome: "Janela de Correr em PVC — Branco",
        dimensoes: "150 x 120 cm",
        abertura: "Corredeira",
        imagens: [
            "assets/images/products/janela-pvc-correr-branco.png"
        ],
        descricao: "Janela de correr em PVC, ideal para vãos largos onde se procura maximizar a entrada de luz sem ocupar espaço com a abertura. Acabamento em branco, em ambas as faces.",
        especificacoes: [
            { label: "Categoria", valor: "Janela" },
            { label: "Material", valor: "PVC" },
            { label: "Dimensões", valor: "150 x 120 cm" },
            { label: "Sentido de abertura", valor: "Corredeira" },
            { label: "Vidro", valor: "Duplo" },
            { label: "Isolamento térmico", valor: "Standard" },
            { label: "Acabamento interior", valor: "Branco" },
            { label: "Acabamento exterior", valor: "Branco" }
        ]
    },
    {
        id: "janela-pvc-correr-cinza",
        categoria: "janelas",
        material: "PVC",
        nome: "Janela de Correr em PVC — Cinza Antracite",
        dimensoes: "150 x 120 cm",
        abertura: "Corredeira",
        imagens: [
            "assets/images/products/janela-pvc-correr-cinza.png"
        ],
        descricao: "Janela de correr em PVC, ideal para vãos largos onde se procura maximizar a entrada de luz sem ocupar espaço com a abertura. Acabamento em Cinza Antracite, em ambas as faces.",
        especificacoes: [
            { label: "Categoria", valor: "Janela" },
            { label: "Material", valor: "PVC" },
            { label: "Dimensões", valor: "150 x 120 cm" },
            { label: "Sentido de abertura", valor: "Corredeira" },
            { label: "Vidro", valor: "Duplo" },
            { label: "Isolamento térmico", valor: "Standard" },
            { label: "Acabamento interior", valor: "Cinza Antracite" },
            { label: "Acabamento exterior", valor: "Cinza Antracite" }
        ]
    },
    {
        id: "janela-pvc-oscilobatente-branco",
        categoria: "janelas",
        material: "PVC",
        nome: "Janela PVC Oscilobatente Brillant-Design 70 — Branco",
        dimensoes: "120 x 120 cm",
        abertura: "Oscilobatente",
        imagens: [
            "assets/images/products/janela-pvc-oscilobatente-branco.png"
        ],
        descricao: "Janela em PVC com sistema oscilobatente (abre e bascula), baseada no sistema Brillant-Design 70 — perfil de 70mm com 5 câmaras, junta dupla perimetral e reforço metálico. Excelente desempenho térmico, acústico e de estanqueidade para a generalidade das divisões. Acabamento em branco, em ambas as faces.",
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
            { label: "Acabamento interior", valor: "Branco" },
            { label: "Acabamento exterior", valor: "Branco" }
        ],
        destaques: [
            { icone: "assets/images/badges/termico.png", label: "Térmico Uw = 0,95 W/(m²K)" },
            { icone: "assets/images/badges/acustico.png", label: "Acústico até 45 dB" },
            { icone: "assets/images/badges/estanqueidade.png", label: "Estanqueidade até classe 4" }
        ]
    },
    {
        id: "janela-pvc-oscilobatente-castanho",
        categoria: "janelas",
        material: "PVC",
        nome: "Janela PVC Oscilobatente Brillant-Design 70 — Castanho",
        dimensoes: "120 x 120 cm",
        abertura: "Oscilobatente",
        imagens: [
            "assets/images/products/janela-pvc-oscilobatente-castanho.png"
        ],
        descricao: "Janela em PVC com sistema oscilobatente (abre e bascula), baseada no sistema Brillant-Design 70 — perfil de 70mm com 5 câmaras, junta dupla perimetral e reforço metálico. Excelente desempenho térmico, acústico e de estanqueidade para a generalidade das divisões. Acabamento em Castanho, em ambas as faces.",
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
            { label: "Acabamento interior", valor: "Castanho" },
            { label: "Acabamento exterior", valor: "Castanho" }
        ],
        destaques: [
            { icone: "assets/images/badges/termico.png", label: "Térmico Uw = 0,95 W/(m²K)" },
            { icone: "assets/images/badges/acustico.png", label: "Acústico até 45 dB" },
            { icone: "assets/images/badges/estanqueidade.png", label: "Estanqueidade até classe 4" }
        ]
    },
    {
        id: "janela-pvc-oscilobatente-cinza",
        categoria: "janelas",
        material: "PVC",
        nome: "Janela PVC Oscilobatente Brillant-Design 70 — Cinza Antracite",
        dimensoes: "120 x 120 cm",
        abertura: "Oscilobatente",
        imagens: [
            "assets/images/products/janela-pvc-oscilobatente-cinza.png"
        ],
        descricao: "Janela em PVC com sistema oscilobatente (abre e bascula), baseada no sistema Brillant-Design 70 — perfil de 70mm com 5 câmaras, junta dupla perimetral e reforço metálico. Excelente desempenho térmico, acústico e de estanqueidade para a generalidade das divisões. Acabamento em Cinza Antracite, em ambas as faces.",
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
            { label: "Acabamento interior", valor: "Cinza Antracite" },
            { label: "Acabamento exterior", valor: "Cinza Antracite" }
        ],
        destaques: [
            { icone: "assets/images/badges/termico.png", label: "Térmico Uw = 0,95 W/(m²K)" },
            { icone: "assets/images/badges/acustico.png", label: "Acústico até 45 dB" },
            { icone: "assets/images/badges/estanqueidade.png", label: "Estanqueidade até classe 4" }
        ]
    },
    {
        id: "porta-seguranca-power-ii-nogueira",
        categoria: "portas",
        material: "Aço",
        nome: "Porta de Segurança POWER II — Nogueira",
        dimensoes: "90 x 210 cm",
        abertura: "Direita",
        imagens: [
            "assets/images/products/porta-blindada-madeira-nogueira-1.jpg",
            "assets/images/products/porta-blindada-madeira-nogueira-2.jpg"
        ],
        descricao: "Porta de segurança do modelo Portrisa POWER II, com lã de rocha de alta densidade e fita intumescente no aro, garantindo resistência ao fogo além da segurança anti-arrombamento — dispensa a porta corta-fogo em separado nos patamares de acesso. Acabamento exterior na coleção Nature, cor Nogueira Imperatur, e acabamento interior em painel Placor, cor Branco Portrisa.",
        especificacoes: [
            { label: "Categoria", valor: "Porta de segurança corta-fogo" },
            { label: "Modelo", valor: "Portrisa POWER II" },
            { label: "Material", valor: "Aço eletrozincado, isolamento em lã de rocha de alta densidade" },
            { label: "Dimensões", valor: "90 x 210 cm" },
            { label: "Sentido de abertura", valor: "Direita" },
            { label: "Classe de segurança", valor: "Nível 3 (RC3), A2P* (BP1) e A2P** (BP2)" },
            { label: "Resistência ao fogo", valor: "E45/E60, EI1 15/20/30, EI2 30/45/60/90" },
            { label: "Atenuação acústica", valor: "34 dB (opção reforçada: 41 dB)" },
            { label: "Isolamento térmico", valor: "Ud = 1,6 W/(m²K) (opção reforçada: 1,2 W/m²K)" },
            { label: "Estanqueidade ao ar/água/vento", valor: "300 Pa / 200 Pa / 1200 Pa" },
            { label: "Acabamento exterior", valor: "Nature — Nogueira Imperatur" },
            { label: "Acabamento interior", valor: "Placor — Branco Portrisa" },
            { label: "Cor do aro", valor: "Branco, Cinza Claro, Castanho ou Preto (opções padrão)" }
        ],
        destaques: [
            { icone: "assets/images/badges/seguranca.png", label: "Segurança nível 3 (RC3)" },
            { icone: "assets/images/badges/acustico.png", label: "Atenuação acústica até 41 dB" },
            { icone: "assets/images/badges/termico.png", label: "Térmico Ud = 1,6 W/(m²K)" }
        ]
    },
    {
        id: "porta-seguranca-power-ii-castanho",
        categoria: "portas",
        material: "Aço",
        nome: "Porta de Segurança POWER II — Castanho",
        dimensoes: "90 x 210 cm",
        abertura: "Direita",
        imagens: [
            "assets/images/products/porta-seguranca-start-castanho.jpg"
        ],
        descricao: "Porta de segurança do modelo Portrisa POWER II, com lã de rocha de alta densidade e fita intumescente no aro, garantindo resistência ao fogo além da segurança anti-arrombamento — dispensa a porta corta-fogo em separado nos patamares de acesso. Acabamento exterior castanho (folha decorativa amadeirada) e acabamento interior em painel Placor, cor Branco Portrisa.",
        especificacoes: [
            { label: "Categoria", valor: "Porta de segurança corta-fogo" },
            { label: "Modelo", valor: "Portrisa POWER II" },
            { label: "Material", valor: "Aço eletrozincado, isolamento em lã de rocha de alta densidade" },
            { label: "Dimensões", valor: "90 x 210 cm" },
            { label: "Sentido de abertura", valor: "Direita" },
            { label: "Classe de segurança", valor: "Nível 3 (RC3), A2P* (BP1) e A2P** (BP2)" },
            { label: "Resistência ao fogo", valor: "E45/E60, EI1 15/20/30, EI2 30/45/60/90" },
            { label: "Atenuação acústica", valor: "34 dB (opção reforçada: 41 dB)" },
            { label: "Isolamento térmico", valor: "Ud = 1,6 W/(m²K) (opção reforçada: 1,2 W/m²K)" },
            { label: "Estanqueidade ao ar/água/vento", valor: "300 Pa / 200 Pa / 1200 Pa" },
            { label: "Acabamento exterior", valor: "Castanho (folha decorativa amadeirada)" },
            { label: "Acabamento interior", valor: "Placor — Branco Portrisa" },
            { label: "Cor do aro", valor: "Branco, Cinza Claro, Castanho ou Preto (opções padrão)" }
        ],
        destaques: [
            { icone: "assets/images/badges/seguranca.png", label: "Segurança nível 3 (RC3)" },
            { icone: "assets/images/badges/acustico.png", label: "Atenuação acústica até 41 dB" },
            { icone: "assets/images/badges/termico.png", label: "Térmico Ud = 1,6 W/(m²K)" }
        ]
    },
    {
        id: "porta-seguranca-power-ii-carvalho",
        categoria: "portas",
        material: "Aço",
        nome: "Porta de Segurança POWER II — Carvalho",
        dimensoes: "90 x 210 cm",
        abertura: "Direita",
        imagens: [
            "assets/images/products/porta-seguranca-start-carvalho.jpg"
        ],
        descricao: "Porta de segurança do modelo Portrisa POWER II, com lã de rocha de alta densidade e fita intumescente no aro, garantindo resistência ao fogo além da segurança anti-arrombamento — dispensa a porta corta-fogo em separado nos patamares de acesso. Acabamento exterior carvalho (folha decorativa amadeirada) e acabamento interior em painel Placor, cor Branco Portrisa.",
        especificacoes: [
            { label: "Categoria", valor: "Porta de segurança corta-fogo" },
            { label: "Modelo", valor: "Portrisa POWER II" },
            { label: "Material", valor: "Aço eletrozincado, isolamento em lã de rocha de alta densidade" },
            { label: "Dimensões", valor: "90 x 210 cm" },
            { label: "Sentido de abertura", valor: "Direita" },
            { label: "Classe de segurança", valor: "Nível 3 (RC3), A2P* (BP1) e A2P** (BP2)" },
            { label: "Resistência ao fogo", valor: "E45/E60, EI1 15/20/30, EI2 30/45/60/90" },
            { label: "Atenuação acústica", valor: "34 dB (opção reforçada: 41 dB)" },
            { label: "Isolamento térmico", valor: "Ud = 1,6 W/(m²K) (opção reforçada: 1,2 W/m²K)" },
            { label: "Estanqueidade ao ar/água/vento", valor: "300 Pa / 200 Pa / 1200 Pa" },
            { label: "Acabamento exterior", valor: "Carvalho (folha decorativa amadeirada)" },
            { label: "Acabamento interior", valor: "Placor — Branco Portrisa" },
            { label: "Cor do aro", valor: "Branco, Cinza Claro, Castanho ou Preto (opções padrão)" }
        ],
        destaques: [
            { icone: "assets/images/badges/seguranca.png", label: "Segurança nível 3 (RC3)" },
            { icone: "assets/images/badges/acustico.png", label: "Atenuação acústica até 41 dB" },
            { icone: "assets/images/badges/termico.png", label: "Térmico Ud = 1,6 W/(m²K)" }
        ]
    }
];
