# MonetizaBOOK — Material de Ajuda

Leitor web / Telegram Mini App do e-book **MonetizaBOOK — Dúvidas Frequentes (2026)**.

## Estado desta publicação

- Mini App estático preparado para GitHub Pages.
- Leitura do e-book por arquivo PDF real em `assets/MonetizaBOOK_Duvidas_Frequentes_Premium_2026.pdf`.
- Sem reconstrução do PDF por Base64 no navegador.
- Renderização das páginas com PDF.js.
- Navegação por índice pesquisável, seleção de página, zoom, abertura direta e download do PDF.
- Camada de links HTML responsiva sobre a página renderizada, baseada nas anotações do próprio PDF.
- Layout responsivo para celular, tablet e computador.
- Sem analytics, pixels, contadores públicos ou telemetria adicionada pelo projeto.
- `noindex`, `nofollow` e `.nojekyll` para manter a publicação estática e desencorajar indexação.

## Arquitetura

O site é estático. O arquivo PDF foi mantido integralmente no repositório como PDF real, sem conversão para Base64 e sem compactação.

Caminho do PDF:

`assets/MonetizaBOOK_Duvidas_Frequentes_Premium_2026.pdf`

O PDF.js carrega esse arquivo por URL, renderiza as páginas em canvas e a aplicação controla navegação, zoom, índice lateral e hotspots de links. Não há backend, banco de dados nem bot executando continuamente.

## Publicação

URL pública esperada do GitHub Pages:

`https://sistemacodigolucrativo.github.io/MonetizaBOOK---Material-de-Ajuda/`

Use a URL HTTPS publicada como URL do Main Mini App no BotFather.
