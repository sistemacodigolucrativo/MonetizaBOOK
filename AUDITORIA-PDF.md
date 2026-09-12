# Auditoria de correção do PDF

Data: 12/09/2026

## Problema observado

O PDF original continha 119 anotações de link: 114 navegações internas e 5 URLs externas. Os links internos usavam destinos PDF diretamente no campo `/Dest`. Essa construção é válida no formato PDF, porém houve incompatibilidade prática relatada no leitor móvel utilizado pelo usuário.

## Correção aplicada

Os 114 links internos foram recriados como ações explícitas `/GoTo`, apontando para as páginas correspondentes. Os 5 links externos foram preservados/recriados como ações `/URI`.

## Validação técnica registrada

- 27 páginas.
- 108 itens no outline/sumário.
- 119 links após a correção.
- 114 links internos reconhecidos como `GoTo`.
- 5 links externos reconhecidos como `URI`.
- Nenhum destino interno fora do intervalo de páginas.
- Comparação renderizada antes/depois: 0 de 27 páginas com alteração visual.
- SHA-256 do PDF corrigido: `105a42e77ec2e6c8d818e764f0af18110775e53f687778b998456c16f0cd7206`.

## Mini App

O Mini App reconstrói o PDF no navegador, renderiza suas páginas com PDF.js e não depende do mecanismo de links internos do visualizador PDF do aparelho. As 119 áreas interativas são reconstruídas como hotspots HTML responsivos sobre a página renderizada.
