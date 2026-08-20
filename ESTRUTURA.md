# 📁 Estrutura Profissional do Projeto

Projeto refatorado para padrão profissional com arquivos separados e organizados.

## Estrutura de Pastas

```
saavedra.portas/
├── index.html                 # Arquivo HTML principal
├── assets/
│   ├── css/
│   │   └── style.css         # Todos os estilos CSS
│   ├── js/
│   │   └── main.js           # Toda a lógica JavaScript
│   └── images/               # Pasta para imagens do projeto
├── README.md                  # Documentação
└── .git/                      # Versionamento Git
```

## Arquivos

### `index.html`
- Arquivo HTML limpo apenas com estrutura semântica
- Referencia externa de CSS: `<link rel="stylesheet" href="assets/css/style.css">`
- Referencia externa de JS: `<script src="assets/js/main.js"></script>`

### `assets/css/style.css`
- Contém **1000+** linhas de CSS extraído
- Variáveis CSS customizadas (mahogany, champagne, cream, etc.)
- Estilos responsivos com breakpoints em 768px e 1024px
- Design system profissional com classes bem organizadas

### `assets/js/main.js`
- Handler de submissão de formulário com validação
- Função de smooth scroll para navegação
- Lógica de feedback de status do formulário

### `assets/images/`
- Diretório para armazenar imagens, ícones e assets visuais
- Atualmente vazio (usar placeholders em desenvolvimento)

## Como Usar

1. **Abrir projeto**: Abra `index.html` no navegador
2. **Editar estilos**: Modifique `assets/css/style.css`
3. **Adicionar funcionalidades**: Modifique `assets/js/main.js`
4. **Adicionar imagens**: Coloque imagens em `assets/images/`

## Recursos Implementados

✅ Estrutura profissional modular  
✅ CSS variáveis para fácil manutenção  
✅ Responsivo (mobile, tablet, desktop)  
✅ Formulário com validação  
✅ Navegação suave (smooth scroll)  
✅ Design premium sem padrões genéricos AI  
✅ Paleta de cores customizada (Mahogany/Champagne)  

## Próximas Etapas Sugeridas

- [ ] Adicionar imagens reais em `assets/images/`
- [ ] Otimizar CSS (minificação opcional)
- [ ] Otimizar JS (minificação opcional)
- [ ] Configurar favicon
- [ ] Implementar backend para formulário (atualmente log em console)
- [ ] Adicionar meta tags SEO adicionais

---

**Data de Refatoração:** 2024  
**Padrão:** Estrutura Profissional  
**Linguagem:** Português (PT)
