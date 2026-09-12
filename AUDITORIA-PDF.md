# Auditoria de correção do PDF

Data: 12/09/2026

## Problema observado

A publicação anterior dependia de blocos JavaScript com o conteúdo do PDF codificado em Base64. O navegador reconstruía o arquivo em memória antes de renderizar o e-book. Essa estratégia aumentava a complexidade, dificultava auditoria e contrariava o requisito atual de manter o e-book como arquivo PDF real no repositório.

## Decisão técnica atual

O PDF deve ser mantido integralmente como arquivo `.pdf`, sem conversão para Base64, sem compactação e sem divisão em partes.

Caminho definido para upload:

`assets/MonetizaBOOK_Duvidas_Frequentes_Premium_2026-2.pdf`

O Mini App foi preparado para carregar esse arquivo por URL direta via PDF.js. A aplicação preserva a estrutura de leitor web: renderização em canvas, índice pesquisável, navegação por página, zoom, abertura direta do PDF, download e hotspots HTML sobre links reconhecidos nas anotações do PDF.

## Validação esperada após o upload

Quando o PDF real estiver no repositório, a validação deve confirmar:

- o arquivo existe no caminho definido;
- o arquivo começa com a assinatura `%PDF-`;
- o PDF possui 27 páginas;
- o outline/sumário é carregado pelo PDF.js;
- os links internos e externos aparecem como áreas clicáveis no leitor;
- o índice do Mini App direciona corretamente para as páginas;
- o layout funciona em celular, tablet e computador;
- o workflow do GitHub Pages conclui com sucesso.

## Observação

Os arquivos antigos de transporte em Base64 deixaram de ser necessários para a rota final. Eles não devem voltar a ser referenciados pelo `index.html` nem pelo `app.js`.
