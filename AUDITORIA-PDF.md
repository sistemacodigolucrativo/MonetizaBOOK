# Auditoria de correção do PDF

Data: 12/09/2026

## Problema observado

A publicação anterior dependia de blocos JavaScript com o conteúdo do PDF codificado em Base64. O navegador reconstruía o arquivo em memória antes de renderizar o e-book. Essa estratégia aumentava a complexidade, dificultava auditoria e contrariava o requisito atual de manter o e-book como arquivo PDF real no repositório.

## Decisão técnica final

O PDF foi mantido integralmente como arquivo `.pdf`, sem conversão para Base64, sem compactação e sem divisão em partes.

Caminho final do PDF enviado:

`assets/MonetizaBOOK_Duvidas_Frequentes_Premium_2026.pdf`

O Mini App foi configurado para carregar esse arquivo por URL direta via PDF.js. A aplicação preserva a estrutura de leitor web: renderização em canvas, índice pesquisável, navegação por página, zoom, abertura direta do PDF, download e hotspots HTML sobre links reconhecidos nas anotações do PDF.

## Ajustes aplicados

- `app.js` aponta para o PDF real enviado.
- `index.html` usa o nome final do PDF no atributo de download.
- O workflow foi simplificado para validação estática, sem tentar reconfigurar GitHub Pages por Actions.
- Arquivos antigos de transporte/empacotamento em JavaScript foram removidos da pasta `assets` por não serem mais necessários para a rota final.

## Validação esperada

A validação do repositório deve confirmar:

- o arquivo existe no caminho definido;
- o arquivo começa com a assinatura `%PDF-`;
- o `index.html` não referencia scripts `pdf-data-*.js` nem `pdf-bootstrap.js`;
- o `app.js` não depende de globais Base64;
- o `app.js` aponta para `assets/MonetizaBOOK_Duvidas_Frequentes_Premium_2026.pdf`;
- o layout mantém leitor, índice, zoom, download e abertura direta;
- o site permanece estático e compatível com GitHub Pages.

## Observação

Os arquivos antigos de transporte em Base64 não devem voltar a ser referenciados pelo `index.html` nem pelo `app.js`.
