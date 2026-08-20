---
name: designer-engineers
description: "Use when designing or implementing frontend interfaces that need coordinated decisions between designers and engineers, including visual systems, responsive layouts, accessibility, interaction states, performance, and production-ready handoff."
---

# Designer & Engineers

## Objetivo

Criar interfaces visualmente intencionais e tecnicamente sólidas, mantendo uma ponte clara entre design, desenvolvimento e validação.

## Processo

1. Identificar o objetivo principal da página e a ação mais importante do utilizador.
2. Auditar a estrutura existente antes de alterar componentes, estilos ou conteúdo.
3. Definir uma direção visual consistente: tipografia, cor, espaçamento, composição e tom da marca.
4. Traduzir a direção visual em tokens reutilizáveis e componentes com nomes claros.
5. Implementar estados completos: normal, hover, foco, ativo, desativado, carregamento, erro e sucesso quando aplicável.
6. Validar a experiência em mobile, tablet e desktop antes de concluir.
7. Verificar acessibilidade, semântica, contraste, foco pelo teclado e tamanhos de toque.
8. Confirmar que a implementação não introduz dependências, alterações de conteúdo ou regressões desnecessárias.

## Diretrizes de Design

- Priorizar hierarquia, legibilidade e reconhecimento rápido da ação principal.
- Usar uma escala consistente de espaçamento, tipografia, bordas e elevação.
- Evitar layouts genéricos, excesso de cartões, decoração sem função e componentes visualmente repetitivos.
- Usar ícones reconhecíveis com texto ou tooltip quando o significado não for óbvio.
- Manter textos curtos, específicos e orientados à ação.
- Criar composição responsiva com dimensões estáveis para botões, campos, grelhas e áreas de mídia.
- Preservar a linguagem visual já existente quando houver um sistema de design definido.

## Diretrizes de Engenharia

- Preferir HTML semântico, CSS organizado e JavaScript modular.
- Reutilizar tokens e padrões existentes antes de criar novas abstrações.
- Manter alterações pequenas, localizadas e fáceis de revisar.
- Não usar manipulação textual frágil quando existir uma API estruturada.
- Respeitar estados de foco visíveis e navegação completa pelo teclado.
- Otimizar imagens, evitar bloqueios desnecessários e respeitar `prefers-reduced-motion`.
- Não considerar uma tarefa concluída sem uma validação executável adequada.

## Checklist de Validação

- A ação principal é evidente na primeira viewport?
- O conteúdo continua legível em 320px de largura?
- Todos os controles têm foco visível e nomes acessíveis?
- Contraste e estados interativos são suficientes?
- Não há sobreposição, overflow horizontal ou mudança de layout inesperada?
- O JavaScript funciona sem erros no console?
- A implementação preserva o comportamento existente não relacionado à alteração?
- O diff contém somente arquivos e mudanças necessários?

## Handoff

Ao concluir uma alteração, documentar brevemente:

- o que mudou visualmente;
- quais componentes ou arquivos foram afetados;
- como a alteração foi validada;
- qualquer limitação ou decisão pendente.
