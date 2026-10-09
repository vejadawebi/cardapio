# Brasa & Co. — edição premium / DAWEBI

Site estático completo, com oito páginas. Não exige npm, build ou conexão para carregar fotos e estilos. O WhatsApp e o Google Maps precisam de internet.

## Como executar

1. Extraia o ZIP inteiro, mantendo as pastas.
2. Para uma prévia rápida, abra index.html no navegador.
3. Para garantir que o carrinho seja compartilhado entre páginas, use um servidor HTTP: com Python instalado, execute `python -m http.server 8080` nesta pasta e abra http://localhost:8080. Também funciona em XAMPP/htdocs, Live Server ou hospedagem estática. O comportamento de localStorage em file:// varia conforme o navegador.
4. Para publicar, envie os arquivos desta pasta para a raiz do site. Nenhum arquivo em work é necessário.

## O que mudou

- Direção visual gastronômica em carvão, creme e laranja, tipografia editorial, fotos grandes, burger recortado e assinatura DAWEBI.
- Página inicial com cinco categorias, favoritos, oferta, preparo artesanal e caminho de compra.
- 34 fotos extraídas dos RARs e dos três ZIPs internos, convertidas em WebP. Todas aparecem na coleção visual da página Sobre; fotos pertinentes também ilustram categorias e os 28 produtos. As referências de cervejas e bolos extras permanecem na coleção, sem criar preços de venda.
- Recortes com transparência para burger e a fotografia de batatas espalhadas. Hero e card Duplo Cheddar usam o burger recortado. Fotos de água e Coca-Cola Zero foram adaptadas para corresponder aos produtos.
- Batatas em três camadas com queda e rotação derivadas do scroll. requestAnimationFrame e eventos passivos; sem movimento contínuo quando o scroll para. A preferência do sistema por movimento reduzido é respeitada.
- Busca que ignora acentos, ordenação por preço/nome, navegação mobile, estado vazio e preço que acompanha a seleção de tamanho.
- Carrinho mantém a chave original brasa_cart, IDs e formato dos itens. Quantidades, remoção, contador, barra de pedido e sincronização entre abas.
- Checkout com retirada/entrega, pagamento, troco, observações, validações, total e mensagem WhatsApp codificada. O envio efetivo é feito pelo cliente no WhatsApp.
- Segurança: textos do carrinho escapados em HTML, armazenamento inválido tratado e links externos com proteção de contexto.
- Layout verificado em 320, 390, 648 e 1440 px. Imagens locais; sem CDN de fotos, fontes ou frameworks.

## Conteúdo e preços

Todos os 28 IDs, preços, descontos e 24 variantes de tamanho do site original foram preservados. Os seguintes nomes e descrições foram adaptados às fotos fornecidas, mantendo seus IDs e valores:

| Antes | Agora |
|---|---|
| Petit Gâteau | Bolo de Chocolate |
| Sorvete | Bolo de Morango |
| Cookie Recheado | Brigadeiros da Casa |
| Cheesecake | Bolo de Frutas Vermelhas |
| Suco de Laranja | Fanta Laranja |
| Limonada | Fanta Uva |

O Combo Família passa a listar quatro brigadeiros no lugar dos quatro cookies. As bebidas renomeadas mantêm os tamanhos e preços de demonstração existentes; as fotos são ilustrativas. O site permanece um projeto de portfólio, como no original.

## Personalizar

Em js/script.js, edite WHATSAPP_NUMBER, MAPS_URL, STORE, PRODUCTS e IMAGE_MAP. O número WhatsApp original 553298576091 foi preservado. Endereço, horário e telefone vêm do projeto demonstrativo: ajuste para a loja real antes de usar comercialmente. Não há taxa de entrega adicionada; o total reúne os produtos e a loja confirma a entrega pelo WhatsApp.

Em css/premium.css estão cores, tamanhos e breakpoints. Em assets/manifesto-fotos.json está a relação entre as 34 imagens otimizadas e seus nomes originais. assets/*.webp contém os recortes e imagens adaptadas adicionais. Arquivos PSD pesados não são necessários para executar o site e ficaram fora do pacote.

## Validação

Ver relatorio-validacao.txt. A mensagem WhatsApp foi validada por interceptação do endereço de saída em teste de código; nenhuma mensagem real foi enviada e não foi verificada a disponibilidade do destinatário.

## Atualização de identidade — edição 2
Novo símbolo vetorial de chama sobre grelha, integrado ao cabeçalho. Favicon SVG com fundo carvão, ICO em 16/32/48 px e ícone Apple em 180 px. Logo completa em assets/logo-completa.svg e símbolo transparente em assets/logo-icone.svg.

## Mobile premium — edição 3
Composição mobile mais compacta, burger visível na abertura, ação principal ampla, categorias com rolagem horizontal e encaixe, menu redesenhado, atalhos inferiores e categorias fixas no cardápio. Controles de quantidade com 44 px de largura, campos com 16 px para evitar zoom ao focar no iPhone, cards e checkout redesenhados e margens que respeitam a área segura do aparelho. O CSS específico é css/mobile.css; a composição desktop permanece igual.
