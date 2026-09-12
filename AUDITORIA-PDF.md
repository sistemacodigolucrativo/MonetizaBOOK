# Auditoria de correção do PDF

Data: 12/09/2026

## Problema observado

A publicação anterior dependia de blocos JavaScript com o conteúdo do PDF codificado em Base64. O navegador reconstruía o arquivo em memória antes de renderizar o e-book. Essa estratégia aumentava a complexidade, dificultava auditoria e contrariava o requisito atual de manter o e-book como arquivo PDF real no repositório.

## Decisão técnica atual

O PDF deve ser mantido integralmente como arquivo `.pdf`, sem conversão para Base64, sem compactação e sem divisão em partes.

Caminho final do PDF enviado:

`assets/MonetizaBOOK_Duvidas_Frequentes_Premium_2026.pdf`

O Mini App foi configurado para carregar esse arquivo por URL direta via PDF.js. A aplicação preserva a estrutura de leitor web: renderização em canvas, índice pesquisável, navegação por página, zoom, abertura direta do PDF, download e hotspots HTML sobre links reconhecidos nas anotações do PDF.

## Validação aplicada

A validação do repositório deve confirmar:

- o arquivo existe no caminho definido;
- o arquivo começa com a assinatura `%PDF-`;
- o `index.html` não referencia mais scripts `pdf-data-*.js` nem `pdf-bootstrap.js`;
- o `app.js` não depende de globais Base64;
- o `app.js` aponta para `assets/MonetizaBOOK_Duvidas_Frequentes_Premium_2026.pdf`;
- o layout mantém leitor, índice, zoom, download e abertura direta;
- o site permanece estático e compatível com GitHub Pages.

## Observação

Os arquivos antigos de transporte em Base64 deixaram de ser necessários para a rota final. Eles não devem voltar a ser referenciados pelo `index.html` nem pelo `app.js`.
