---
name: impeccable-design
description: "Use when the user asks for impeccable design, pixel-perfect frontend polish, visual refinement, premium UI, design critique, or a high-quality designer-to-engineer implementation."
---

# Impeccable Design

## Princípio

Cada decisão visual deve ter uma função: orientar, informar, diferenciar a marca ou tornar a interação mais clara. O resultado deve parecer deliberado, coerente e pronto para produção, não apenas decorado.

## Antes de Editar

1. Identificar a ação principal e o conteúdo que merece maior destaque.
2. Auditar o layout atual, a tipografia, a paleta, os espaçamentos, os estados e a responsividade.
3. Encontrar o maior problema visual que reduz clareza ou credibilidade.
4. Definir uma hipótese verificável e uma alteração pequena que possa ser validada rapidamente.
5. Preservar funcionalidades existentes e alterações do utilizador fora do escopo.

## Direção Visual

- Escolher uma linguagem visual clara e mantê-la em toda a experiência.
- Usar tipografia expressiva, legível e adequada ao contexto, evitando stacks genéricas quando houver alternativa coerente.
- Definir uma escala consistente para títulos, texto, espaçamento, raios, bordas e sombras.
- Criar contraste de escala e peso para estabelecer hierarquia sem depender de excesso de cor.
- Usar uma paleta limitada, com cor de ação reservada para ações e estados importantes.
- Preferir composição assimétrica ou editorial quando isso melhora a identidade, mantendo o conteúdo fácil de percorrer.
- Evitar gradientes decorativos, efeitos neon, excesso de cartões, sombras pesadas e elementos sem função.
- Usar imagens reais ou adequadas ao produto; placeholders devem ser claramente temporários.

## Qualidade de Interface

- Projetar estados normal, hover, foco, ativo, desativado, carregamento, sucesso e erro.
- Tornar a ação principal evidente sem transformar todos os elementos em chamadas de atenção.
- Garantir que botões, campos, cards, imagens e grelhas tenham dimensões estáveis.
- Usar ícones familiares e tooltips para ícones cujo significado não seja imediato.
- Evitar texto apertado, linhas órfãs, quebras estranhas e rótulos que ultrapassem os seus contêineres.
- Respeitar áreas de toque confortáveis e navegação completa por teclado.
- Usar movimento curto e significativo, com suporte a `prefers-reduced-motion`.

## Responsividade e Acessibilidade

- Validar pelo menos 320px, 768px e 1024px de largura.
- Procurar overflow horizontal, sobreposição, cortes de texto e mudanças de layout inesperadas.
- Manter foco visível, ordem de tabulação lógica, HTML semântico e nomes acessíveis.
- Verificar contraste de texto, controles e estados interativos conforme WCAG AA.
- Garantir que a experiência continue compreensível sem depender apenas de cor, hover ou animação.

## Implementação

- Reutilizar tokens, componentes e convenções existentes antes de criar novos padrões.
- Separar estrutura, estilo e comportamento conforme a arquitetura do projeto.
- Manter o diff pequeno e evitar refatorações não relacionadas.
- Não remover funcionalidades para obter um resultado visual mais simples.
- Preferir soluções nativas e acessíveis a efeitos frágeis ou dependências desnecessárias.

## Validação Final

- Comparar a implementação com a direção visual definida, não apenas com a intenção inicial.
- Testar interação principal, formulário, navegação e estados de erro/sucesso.
- Verificar console, carregamento de assets e comportamento em viewport pequena e grande.
- Rever o resultado para encontrar desalinhamentos, inconsistências e detalhes sem acabamento.
- Relatar arquivos alterados, validações executadas e limitações restantes.
