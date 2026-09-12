# MonetizaBOOK — Material de Ajuda

Leitor web / Telegram Mini App do e-book **MonetizaBOOK — Dúvidas Frequentes (2026)**.

## Estado desta publicação

- PDF revisado com 27 páginas.
- 114 navegações internas normalizadas como ações PDF `GoTo`.
- 5 URLs externas preservadas como ações `URI`.
- 119 links no total.
- Navegação do Mini App reconstruída por hotspots HTML, independente do suporte de links internos do leitor PDF do aparelho.
- Índice pesquisável, seleção de página, zoom, abertura e download do PDF e layout responsivo.
- Sem analytics, pixels, contadores públicos ou telemetria adicionada pelo projeto.
- `noindex`, `nofollow` e `.nojekyll` para manter a publicação estática e desencorajar indexação.

## Arquitetura

O site é estático. O PDF corrigido é armazenado no repositório em **sete blocos Base64 de texto** e reconstruído localmente no navegador. O PDF.js renderiza as páginas e a aplicação controla a navegação interna por uma camada própria de hotspots HTML. Não há backend, banco de dados nem bot executando continuamente.

A codificação Base64 é apenas uma forma de transporte/armazenamento no repositório e não altera o conteúdo do PDF. O SHA-256 da versão corrigida é:

`105a42e77ec2e6c8d818e764f0af18110775e53f687778b998456c16f0cd7206`

## GitHub Pages

O workflow `.github/workflows/pages.yml` valida a integridade dos sete blocos contra o SHA-256 esperado antes de publicar o site estático via GitHub Actions.

URL pública esperada após a ativação do GitHub Pages para este repositório:

`https://sistemacodigolucrativo.github.io/MonetizaBOOK---Material-de-Ajuda/`

Use a URL HTTPS publicada como URL do Main Mini App no BotFather.
