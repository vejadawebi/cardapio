"use strict";
/* =====================================================
   BRASA & CO. — script único compartilhado por todas as páginas.
   Ele injeta header, footer, barra mobile e renderiza os produtos.
   O carrinho vive no localStorage, por isso é o MESMO em toda página.
   ===================================================== */

/* ---------- 1. CONFIGURAÇÃO (edite aqui) ---------- */
const WHATSAPP_NUMBER = "553298576091"; // DDI+DDD+número, só dígitos
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Rua+das+Brasas+120+Juiz+de+Fora"; // link do Google Maps da loja
const STORE = {unit:"Unidade Centro",addr:"Rua das Brasas, 120 — Centro",city:"Juiz de Fora — MG",hours:"Ter a dom, das 18h às 23h30",phone:"(32) 99999-9999"};

/* ---------- 2. PRODUTOS ----------
   Fotos: salve em assets/ com o id do produto (ex.: assets/classic-burger.jpg).
   Sem foto, o emoji aparece no lugar. Para o hero use assets/hero.jpg. */
const PRODUCTS = [
 // Lanches
 {id:"classic-burger",cat:"lanches",pop:1,emoji:"🍔",name:"Classic Burger",price:29.9,desc:"O clássico da casa, suculento e com cheddar derretido.",ing:"Pão brioche, blend 160g, cheddar, alface, tomate, maionese da casa"},
 {id:"bacon-supreme",cat:"lanches",pop:1,emoji:"🥓",name:"Bacon Supreme",price:34.9,desc:"Bacon crocante em dobro com molho barbecue defumado.",ing:"Pão brioche, blend 160g, bacon, cheddar, cebola caramelizada, barbecue"},
 {id:"duplo-cheddar",cat:"lanches",pop:1,emoji:"🍔",name:"Duplo Cheddar",price:38.9,desc:"Dois blends, muito cheddar cremoso e picles.",ing:"Pão brioche, 2 blends 120g, cheddar duplo, picles, molho especial"},
 {id:"chicken-crispy",cat:"lanches",emoji:"🍗",name:"Chicken Crispy",price:31.9,desc:"Frango empanado extra crocante com maionese de ervas.",ing:"Pão brioche, frango empanado, alface americana, tomate, maionese de ervas"},
 {id:"smash-bacon",cat:"lanches",pop:1,emoji:"🍔",name:"Smash Bacon",price:33.9,desc:"Blend prensado na chapa, borda crocante e bacon.",ing:"Pão de batata, 2 smashs 80g, bacon, cheddar, molho smash"},
 {id:"house-special",cat:"lanches",emoji:"⭐",name:"House Special",price:42.9,desc:"A assinatura da casa: o mais completo do cardápio.",ing:"Pão brioche, blend 180g, bacon, cheddar, ovo, cebola roxa, maionese defumada"},
 // Combos
 {id:"combo-individual",cat:"combos",emoji:"🍟",name:"Combo Individual",price:39.9,desc:"Tudo o que você precisa para matar a fome.",inc:["1 Classic Burger","1 Batata média","1 Refrigerante 350ml"]},
 {id:"combo-casal",cat:"combos",pop:1,emoji:"🍟",name:"Combo Casal",price:69.9,desc:"Para dividir (ou não).",inc:["2 Smash Burgers","1 Batata grande","2 Refrigerantes 350ml"]},
 {id:"combo-familia",cat:"combos",emoji:"🍔",name:"Combo Família",price:129.9,desc:"Mesa farta para até 4 pessoas.",inc:["4 Classic Burgers","2 Batatas grandes","1 Refrigerante 2L","4 Brigadeiros"]},
 {id:"combo-bacon",cat:"combos",emoji:"🥓",name:"Combo Bacon",price:44.9,desc:"Para quem não abre mão do bacon.",inc:["1 Bacon Supreme","1 Batata com bacon e cheddar","1 Refrigerante 350ml"]},
 {id:"combo-kids",cat:"combos",emoji:"🧒",name:"Combo Kids",price:29.9,desc:"Porção na medida dos pequenos, com brinde.",inc:["1 Mini Burger","1 Batata pequena","1 Suco de laranja 200ml","1 Brinde surpresa"]},
 // Bebidas (cada tamanho com preço próprio)
 {id:"coca-cola",cat:"bebidas",emoji:"🥤",name:"Coca-Cola",desc:"Gelada, do jeito certo.",sizes:[{l:"350ml",p:6},{l:"600ml",p:8},{l:"1L",p:11},{l:"2L",p:15}]},
 {id:"coca-zero",cat:"bebidas",emoji:"🥤",name:"Coca-Cola Zero",desc:"Sem açúcar, mesmo sabor.",sizes:[{l:"350ml",p:6},{l:"600ml",p:8},{l:"1L",p:11},{l:"2L",p:15}]},
 {id:"guarana",cat:"bebidas",emoji:"🥤",name:"Guaraná",desc:"O sabor brasileiro.",sizes:[{l:"350ml",p:5.5},{l:"600ml",p:7.5},{l:"1L",p:10},{l:"2L",p:13}]},
 {id:"sprite",cat:"bebidas",emoji:"🥤",name:"Sprite",desc:"Limão leve e refrescante.",sizes:[{l:"350ml",p:5.5},{l:"600ml",p:7.5},{l:"1L",p:10},{l:"2L",p:13}]},
 {id:"suco-laranja",cat:"bebidas",emoji:"🍊",name:"Suco de Laranja",desc:"Natural, feito na hora.",sizes:[{l:"300ml",p:8},{l:"500ml",p:12}]},
 {id:"limonada",cat:"bebidas",emoji:"🍋",name:"Limonada",desc:"Limão siciliano com hortelã.",sizes:[{l:"300ml",p:8},{l:"500ml",p:12}]},
 {id:"agua",cat:"bebidas",emoji:"💧",name:"Água",desc:"Mineral, com ou sem gás.",sizes:[{l:"500ml",p:4},{l:"1,5L",p:7}]},
 // Sobremesas
 {id:"brownie",cat:"sobremesas",emoji:"🍫",name:"Brownie",price:12,desc:"Chocolate intenso, casquinha crocante e centro macio."},
 {id:"petit-gateau",cat:"sobremesas",pop:1,emoji:"🍰",name:"Petit Gâteau",price:22.9,desc:"Bolinho quente com recheio cremoso e sorvete de creme."},
 {id:"milk-shake",cat:"sobremesas",emoji:"🥛",name:"Milk-shake",desc:"Cremoso, com chantilly. Sabores: chocolate, morango ou ovomaltine.",sizes:[{l:"300ml",p:16},{l:"500ml",p:22}]},
 {id:"sorvete",cat:"sobremesas",emoji:"🍨",name:"Sorvete",price:14,desc:"Duas bolas com calda de caramelo salgado."},
 {id:"cookie",cat:"sobremesas",emoji:"🍪",name:"Cookie Recheado",price:11.9,desc:"Cookie macio recheado com chocolate belga."},
 {id:"cheesecake",cat:"sobremesas",emoji:"🍓",name:"Cheesecake",price:19.9,desc:"Fatia cremosa com calda de frutas vermelhas."},
 // Promoções (old = preço anterior)
 {id:"promo-duplo",cat:"promocoes",emoji:"🍔",name:"Duplo Cheddar + Batata",old:49.9,price:39.9,ends:"Válida até domingo",desc:"Duplo Cheddar com batata média crocante."},
 {id:"promo-casal",cat:"promocoes",emoji:"🍟",name:"Casal Premium",old:94.9,price:79.9,ends:"Só hoje",desc:"2 Bacon Supreme, batata grande e 2 milk-shakes 300ml."},
 {id:"promo-shake",cat:"promocoes",emoji:"🥛",name:"Shake + Brownie",old:34.9,price:24.9,ends:"Termina em 3 dias",desc:"Milk-shake 300ml e um brownie para fechar bem."},
 {id:"promo-crispy",cat:"promocoes",emoji:"🍗",name:"Chicken Crispy em dobro",old:63.8,price:49.9,ends:"Válida até quinta",desc:"Dois Chicken Crispy pelo preço promocional."}
 ];

const image = n => `assets/fotos/foto-${String(n).padStart(2,"0")}.webp`;
const IMAGE_MAP={"classic-burger":30,"bacon-supreme":19,"duplo-cheddar":"assets/burger-recorte.webp","chicken-crispy":"assets/chicken-crispy.webp","smash-bacon":16,"house-special":31,"combo-individual":12,"combo-casal":1,"combo-familia":13,"combo-bacon":0,"combo-kids":14,"coca-cola":23,"coca-zero":"assets/coca-zero.webp","guarana":29,"sprite":22,"suco-laranja":20,"limonada":21,"agua":"assets/agua-mineral.webp","brownie":5,"petit-gateau":7,"milk-shake":"assets/shake-brownie.webp","sorvete":3,"cookie":8,"cheesecake":4,"promo-duplo":14,"promo-casal":32,"promo-shake":"assets/shake-brownie.webp","promo-crispy":"assets/chicken-crispy.webp"};
function photoFor(p){const v=IMAGE_MAP[p.id];return typeof v==="number"?image(v):v;}
const PHOTO={burger:image(17),combo:image(12),drink:image(23),dessert:image(5),mixed:image(19)};
// Renomes editoriais: IDs e valores originais permanecem compatíveis com o carrinho.
Object.entries({"petit-gateau":["Bolo de Chocolate", "Fatia de bolo de chocolate com cobertura cremosa."],"sorvete":["Bolo de Morango", "Chocolate e creme com morangos para um final especial."],"cookie":["Brigadeiros da Casa","Seleção de brigadeiros com diferentes coberturas."],"cheesecake":["Bolo de Frutas Vermelhas","Fatia de bolo cremoso com frutas vermelhas."],"suco-laranja":["Fanta Laranja","Sabor laranja, servida gelada."],"limonada":["Fanta Uva","Sabor uva, servida gelada."]}).forEach(([id,[name,desc]])=>Object.assign(PRODUCTS.find(p=>p.id===id),{name,desc}));
/* ---------- 3. UTILITÁRIOS ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const money = new Intl.NumberFormat("pt-BR", {style:"currency", currency:"BRL"});
const byId = id => PRODUCTS.find(p => p.id === id);
const minPrice = p => p.sizes ? Math.min(...p.sizes.map(s => s.p)) : p.price;
const page = document.body.dataset.page;
let toastTimer;
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove("show"),1800)}

/* ---------- 4. CARRINHO (localStorage) ----------
   Cada item guarda uma "foto" do produto: {key,name,emoji,price,qty}.
   Assim o carrinho funciona em qualquer página sem depender dos dados dela. */
const CART_KEY = "brasa_cart";
const escapeHTML = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const loadCart = () => { try { const c=JSON.parse(localStorage.getItem(CART_KEY));return Array.isArray(c)?c.filter(i=>i&&typeof i.key==='string'&&typeof i.name==='string'&&Number.isFinite(i.price)&&i.price>=0&&Number.isInteger(i.qty)&&i.qty>0).map(i=>({...i,qty:Math.min(i.qty,999)})):[]; } catch { return [] } };
function saveCart(c){ try { localStorage.setItem(CART_KEY, JSON.stringify(c)) } catch {} updateUI(); }
const cartCount = c => c.reduce((n,i)=>n+i.qty,0);
const cartTotal = c => c.reduce((n,i)=>n+i.qty*i.price,0);

function addToCart(p, qty = 1, size = null){
  const cart = loadCart();
  const key = size ? `${p.id}|${size.l}` : p.id;
  const found = cart.find(i => i.key === key);
  if (found) found.qty += qty;
  else cart.push({key, name: size ? `${p.name} ${size.l}` : p.name, emoji:p.emoji, price: size ? size.p : p.price, qty});
  saveCart(cart);
  const b = $("#badge"); b.classList.add("pop"); setTimeout(()=>b.classList.remove("pop"),200);
  toast(`${p.name} adicionado ✓`);
}
function changeQty(key, delta){ // nunca fica negativo: chegou em 0, remove
  let cart = loadCart();
  const it = cart.find(i => i.key === key); if (!it) return;
  it.qty += delta;
  saveCart(cart.filter(i => i.qty > 0));
}
const removeItem = key => saveCart(loadCart().filter(i => i.key !== key));

/* ---------- 5. LAYOUT COMUM ---------- */
const NAV = [["index.html","Início","home"],["cardapio.html","Cardápio","lanches"],["combos.html","Combos","combos"],["bebidas.html","Bebidas","bebidas"],["sobremesas.html","Sobremesas","sobremesas"],["promocoes.html","Promoções","promocoes"],["sobre.html","Sobre/Localização","sobre"]];

function renderChrome(){
  document.body.dataset.theme = page;
  $("#hdr").innerHTML = `<div class="wrap hrow">
    <a class="logo" href="index.html" aria-label="Brasa & Co. — início"><img src="assets/logo-icone.svg" alt="" width="38" height="38"> BRASA<span>&amp;CO.</span><small>BURGER • CHAPA • SABOR</small></a>
    <button id="burger" aria-label="Abrir menu" aria-controls="nav" aria-expanded="false">☰</button>
    <a class="cart" href="carrinho.html" aria-label="Ver carrinho"><span class="cartword">Seu pedido</span> ↗ <b id="badge">0</b></a>
    <nav id="nav" aria-label="Navegação principal">${NAV.map(n=>`<a href="${n[0]}" aria-label="${n[1]}" class="${(n[2]===page||(page==='home'&&n[2]==='home'))?"on":""}" ${(n[2]===page||(page==='home'&&n[2]==='home'))?'aria-current="page"':""}>${n[1]}</a>`).join("")}</nav></div>`;
  $("#burger").onclick = () => { const b=$("#burger"),o=$("#nav").classList.toggle("open"); b.setAttribute("aria-expanded",o);b.setAttribute("aria-label",o?"Fechar menu":"Abrir menu"); b.textContent=o?"✕":"☰";document.body.classList.toggle("menu-open",o&&window.matchMedia('(max-width: 600px)').matches); };
  document.addEventListener('click',e=>{if($('#nav').classList.contains('open')&&!e.target.closest('#nav,#burger'))closeMenu();});
  window.addEventListener('resize',()=>{if(!window.matchMedia('(max-width: 600px)').matches)closeMenu();});
  $("#ftr").innerHTML = `<div class="wrap">
    <div><h4>BRASA &amp; CO.</h4><p>Hambúrgueres artesanais, feitos na chapa e entregues quentes.<br>Projeto demonstrativo de gastronomia por <strong>DAWEBI</strong>. Fotos ilustrativas; composição e volumes podem variar.</p></div>
    <div><h4>Navegue</h4>${NAV.slice(1,6).map(n=>`<a href="${n[0]}">${n[1]}</a><br>`).join("")}</div>
    <div><h4>Contato</h4><p>${STORE.addr}<br>${STORE.city}<br>${STORE.hours}</p></div></div>`;
}

/* Atualiza contador, barra mobile e (se estiver na página) a lista do carrinho */
function updateUI(){
  const c = loadCart(), n = cartCount(c);
  $("#badge").textContent = n;
  $("#bar").innerHTML = (n && page !== "carrinho")
    ? `<a href="carrinho.html"><span>🛒 ${n} ${n===1?"item":"itens"}</span><span>${money.format(cartTotal(c))}</span><span>VER CARRINHO</span></a>` : (page!=="carrinho"?`<nav class="mobile-dock" aria-label="Atalhos"><a href="index.html" class="${page==='home'?'is-active':''}">Início</a><a href="cardapio.html" class="${!['home','sobre'].includes(page)?'is-active':''}">Cardápio</a><a class="dock-cart" href="carrinho.html">Pedido <b>0</b> ↗</a></nav>`:"");
  if ($("#items")) renderItems();
}

/* ---------- 6. COMPONENTES ---------- */
function card(p){
  const disc = p.old ? Math.round((1 - p.price/p.old)*100) : 0;
  const sel = p.sizes ? `<select class="sz" aria-label="Tamanho de ${p.name}">${p.sizes.map((s,i)=>`<option value="${i}">${s.l} — ${money.format(s.p)}</option>`).join("")}</select>` : "";
  const extra = p.ing ? `<small>${p.ing}</small>` : p.inc ? `<ul>${p.inc.map(i=>`<li>${i}</li>`).join("")}</ul>` : "";
  const priceHtml = p.old ? `<div><span class="old">De ${money.format(p.old)}</span><div class="price">Por ${money.format(p.price)}</div><div class="ends">⏱ ${p.ends}</div></div>`
    : `<div class="price">${p.sizes ? "a partir de " : ""}${money.format(minPrice(p))}</div>`;
  return `<article class="card" data-id="${p.id}">
    <div class="pimg ${p.id==='duplo-cheddar'?'cutout':''}">${disc?`<span class="badge">-${disc}%</span>`:""}<img src="${photoFor(p)}" alt="${p.name} — imagem ilustrativa" width="800" height="600" decoding="async" loading="lazy"></div>
    <div class="pbody"><h3>${p.name}</h3><p class="mut">${p.desc}</p>${extra}${sel}${priceHtml}
      <div class="buy"><div class="stepper"><button class="minus" aria-label="Diminuir quantidade">−</button><span class="q" aria-live="polite">1</span><button class="plus" aria-label="Aumentar quantidade">+</button></div>
      <button class="btn add" aria-label="Adicionar ${p.name} ao pedido">${p.cat==="combos"?"Adicionar ao pedido":"Adicionar"}</button></div></div></article>`;
}
const grid = list => `<div class="grid">${list.map(card).join("")}</div>`;

/* Um único listener cuida de TODOS os cards da página (delegação de eventos) */
document.addEventListener("click", e => {
  const el = e.target.closest(".card"); if (!el) return;
  const q = $(".q", el); let n = +q.textContent;
  if (e.target.closest(".plus")) q.textContent = Math.min(n+1, 20);
  if (e.target.closest(".minus")) q.textContent = Math.max(n-1, 1);
  if (e.target.closest(".add")) {
    const p = byId(el.dataset.id), sel = $(".sz", el);
    addToCart(p, n, sel ? p.sizes[+sel.value] : null); q.textContent = 1;
  }
});

/* ---------- 7. PÁGINAS ---------- */
const HEADS = {
  lanches:["Cardápio","Hambúrgueres artesanais, feitos na chapa na hora."],
  combos:["Combos","Tudo junto, com preço melhor."],
  bebidas:["Bebidas","Escolha o tamanho. Cada um tem seu preço."],
  sobremesas:["Sobremesas","Para fechar a refeição com doçura."],
  promocoes:["Promoções","Ofertas por tempo limitado."]};

const locationHtml = () => `<div class="loc"><div><h2>Onde estamos</h2><p><b>${STORE.unit}</b><br>${STORE.addr}<br>${STORE.city}</p><p class="mut" style="margin:10px 0"><b>Horário:</b> ${STORE.hours}<br><b>Telefone:</b> ${STORE.phone}</p><a class="btn" href="${MAPS_URL}" target="_blank" rel="noopener">COMO CHEGAR</a></div>
  <div class="map"><a href="${MAPS_URL}" target="_blank" rel="noopener"><span>↗</span><strong>Encontre a Brasa</strong><small>${STORE.addr}<br>${STORE.city}</small></a></div></div>`;

const categoryList=[["01","Lanches","cardapio.html",30,"lanches"],["02","Combos","combos.html",12,"combos"],["03","Bebidas","bebidas.html",23,"bebidas"],["04","Doces","sobremesas.html",5,"sobremesas"],["05","Ofertas","promocoes.html",19,"promocoes"]];
function categoryLinks(){return categoryList.map(c=>`<a href="${c[2]}" class="${page===c[4]?'active':''}">${c[1]}</a>`).join('');}
function renderHome(){
 $("#app").innerHTML=`<section class="hero"><div class="wrap hero-layout"><div class="hero-copy"><p class="eyebrow"><span></span> ARTESANAL DO PRIMEIRO AO ÚLTIMO MORDISCO</p><h1><span>O fogo acende.</span><br>O sabor <em>fica.</em></h1><p class="hero-sub">Pão macio, carne suculenta, queijo no ponto.<br>Seu próximo burger favorito começa aqui.</p><div class="acts"><a class="btn" href="cardapio.html">Escolher meu burger <span>↗</span></a><a class="text-link" href="combos.html">Conhecer os combos →</a></div><div class="hero-note"><b>FEITO NA HORA</b><span>Blend artesanal. Muito sabor.</span></div></div><div class="hero-art"><div class="orbit"></div><span class="hero-stamp">CHEESE<br>LOVERS<br>↙</span><img class="hero-burger" src="assets/burger-recorte.webp" alt="Duplo Cheddar com queijo derretido" fetchpriority="high" width="1100" height="1000"><div class="hero-caption"><span>O QUERIDINHO DA CHAPA</span><strong>Duplo Cheddar</strong><b>R$ 38,90 <a href="cardapio.html">↗</a></b></div></div></div><div class="hero-bottom wrap"><span>BRASA & CO. / EXPERIÊNCIA ARTESANAL</span><a href="#categorias">CONTINUE COM FOME ↓</a></div></section>
 <div class="ribbon" aria-hidden="true">NA CHAPA • NO CAPRICHO • SEM ECONOMIZAR SABOR • BRASA & CO. • NA CHAPA • NO CAPRICHO •</div>
 <section id="categorias" class="section wrap"><div class="section-head"><div><p class="eyebrow">O QUE VAI SER HOJE?</p><h2>Uma vontade.<br><em>Cinco caminhos.</em></h2></div><p>Do primeiro mordisco ao último gole.<br>Encontre o seu jeito de matar a fome.</p></div><div class="cats">${categoryList.map(c=>`<a class="cat" href="${c[2]}"><img src="${image(c[3])}" alt="${c[1]}" loading="lazy" width="500" height="600"><span><small>${c[0]}</small><strong>${c[1]}</strong><b>↗</b></span></a>`).join('')}</div><p class="swipe-hint">Arraste para explorar as categorias →</p></section>
 <section class="bests section"><div class="wrap"><div class="section-head"><div><p class="eyebrow">OS FAVORITOS DA CASA</p><h2>Difícil escolher.<br><em>Fácil se apaixonar.</em></h2></div><a class="text-link" href="cardapio.html">Ver todos os burgers ↗</a></div>${grid(PRODUCTS.filter(p=>p.cat==='lanches'&&p.pop))}</div></section>
 <section id="crocancia" class="fries-scene" aria-label="Batatas caindo conforme você rola a página"><div class="wrap fries-layout"><div><p class="eyebrow">A DUPLA QUE NUNCA FALHA</p><h2>Um burger incrível.<br>Uma chuva de<br><em>crocância.</em></h2><p>Douradas por fora. Macias por dentro.<br>Escolha um combo e complete o seu pedido.</p><a class="btn" href="combos.html">Quero o combo completo ↗</a></div><div class="fries-art"><span class="fries-word" aria-hidden="true">CRUNCH!</span>${[0,1,2].map(i=>`<img class="falling-fries" data-layer="${i}" src="assets/batatas-recorte.webp" alt="" width="800" height="650" loading="lazy">`).join('')}<span class="fries-label">ROLE A TELA.<br>DEIXE A FOME CAIR.</span></div></div></section>
 <section class="section wrap"><div class="offer"><img src="${image(14)}" alt="Duplo Cheddar acompanhado de batatas" loading="lazy"><div><p class="eyebrow">MAIS SABOR, MELHOR PREÇO</p><h2>Seu match:<br><em>Duplo + batata.</em></h2><p>Dois blends, cheddar e batata crocante.</p><div class="offer-price"><del>R$ 49,90</del><strong>R$ 39,90</strong></div><a class="btn" href="promocoes.html">Explorar ofertas ↗</a></div></div></section>
 <section class="section wrap story"><img src="${image(15)}" alt="Preparo artesanal de um hambúrguer na chapa" loading="lazy"><div><p class="eyebrow">A NOSSA ESSÊNCIA</p><h2>Capricho que<br>você <em>sente.</em></h2><p>Receitas generosas, ingredientes escolhidos e preparo na hora. Porque um bom burger merece mais do que matar a fome.</p><a class="text-link" href="sobre.html">Conheça a Brasa & Co. ↗</a></div></section>
 <section class="how section"><div class="wrap"><p class="eyebrow">DA CHAPA AO SEU PEDIDO</p><h2>Sua fome tem um caminho curto.</h2><div class="steps">${[['01','Encontre seu favorito','Explore burgers, combos, bebidas e doces.'],['02','Monte o seu pedido','Escolha tamanhos e quantidades no carrinho.'],['03','Converse no WhatsApp','Revise os dados e envie para a loja.']].map(x=>`<div><span>${x[0]}</span><h3>${x[1]}</h3><p>${x[2]}</p></div>`).join('')}</div></div></section>`;
}
const renderCategory = () => {
 const [t,s]=HEADS[page], cover=categoryList.find(c=>c[4]===page)[3];
 $("#app").innerHTML=`<div class="category-hero"><img src="${image(cover)}" alt="" fetchpriority="high"><div class="wrap"><p class="eyebrow">BRASA & CO. / ${t.toUpperCase()}</p><h1>${t}<em>.</em></h1><p>${s}</p></div></div><div class="wrap menu-section"><nav class="category-tabs" aria-label="Categorias">${categoryLinks()}</nav><div class="menu-tools"><label class="search-label"><span>⌕</span><input id="search" type="search" placeholder="Encontre seu favorito…" aria-label="Buscar produtos"></label><select id="sort" aria-label="Ordenar produtos"><option value="default">Seleção da casa</option><option value="price">Menor preço</option><option value="name">Nome A–Z</option></select><span id="result-count" role="status"></span></div><div id="menu-results">${grid(PRODUCTS.filter(p=>p.cat===page))}</div><p class="photo-note">Fotos ilustrativas. Consulte os ingredientes e o tamanho selecionado. Pedido sujeito à confirmação da loja.</p></div>`;
 const filter=()=>{let list=PRODUCTS.filter(p=>p.cat===page&&[p.name,p.desc,p.ing||''].join(' ').toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g,'').includes($('#search').value.toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g,'')));if($('#sort').value==='price')list.sort((a,b)=>minPrice(a)-minPrice(b));if($('#sort').value==='name')list.sort((a,b)=>a.name.localeCompare(b.name,'pt-BR'));$('#menu-results').innerHTML=list.length?grid(list):'<div class="empty">Nenhum produto encontrado. Experimente outro nome.</div>';$('#result-count').textContent=list.length+' opções';};$('#search').addEventListener('input',filter);$('#sort').addEventListener('change',filter);filter();
};
const renderAbout = () => $("#app").innerHTML = `<div class="wrap"><div class="pagehead"><h1>Sobre e localização</h1><p>Nascemos de uma chapa, uma receita de família e muita vontade de fazer o melhor burger da cidade. Tudo é preparado na hora, com ingredientes frescos.</p></div><section class="story"><img src="${image(15)}" alt="Preparo na chapa"><div><p class="eyebrow">ARTESANAL EM CADA DETALHE</p><h2>Mais do que um burger.<br>Um bom momento.</h2><p>O cardápio reúne clássicos, combinações generosas e um final doce.</p><a class="btn" href="cardapio.html">Explore o cardápio ↗</a></div></section><section>${locationHtml()}</section><section class="section"><p class="eyebrow">CADERNO VISUAL DA CASA</p><h2>Uma coleção de dar fome.</h2><p class="mut">Imagens fornecidas para a direção visual deste projeto DAWEBI. A coleção não representa itens adicionais à venda.</p><div class="visual-gallery">${Array.from({length:34},(_,i)=>`<img src="${image(i)}" alt="Referência gastronômica ${i+1} da coleção Brasa & Co." loading="lazy" width="500" height="400">`).join('')}</div></section></div>`;

/* ---------- 8. CARRINHO + FINALIZAÇÃO ---------- */
function renderItems(){
  const c = loadCart(), box = $("#items");
  $("#form").hidden = !c.length;
  if (!c.length){ box.innerHTML = `<div class="empty"><p>Seu carrinho está vazio.</p><a class="btn" href="cardapio.html">Explorar cardápio</a></div>`; return; }
  box.innerHTML = c.map(i=>`<div class="line"><div><b>${i.qty}x ${escapeHTML(i.name)}</b><br><small class="mut">${money.format(i.price)} cada</small></div><b>${money.format(i.price*i.qty)}</b>
    <div class="acts"><div class="stepper"><button data-k="${escapeHTML(i.key)}" data-d="-1" aria-label="Diminuir quantidade">−</button><span>${i.qty}</span><button data-k="${escapeHTML(i.key)}" data-d="1" aria-label="Aumentar quantidade">+</button></div><button class="rm" data-rm="${escapeHTML(i.key)}">Remover</button></div></div>`).join("")
    + `<div class="total"><span>TOTAL</span><span>${money.format(cartTotal(c))}</span></div><button class="btn ghost" id="clear">Limpar carrinho</button>`;
}
function renderCartPage(){
  $("#app").innerHTML = `<div class="wrap"><div class="pagehead"><h1>Seu pedido</h1></div><section style="padding-top:12px" class="cartgrid"><div id="items"></div>
  <form id="form" novalidate><p class="eyebrow">FALTA POUCO PARA MATAR A FOME</p><h2 style="margin:0">Seus dados</h2>
   <label>Nome<input name="nome" autocomplete="name"></label>
   <label>Telefone<input name="tel" type="tel" inputmode="tel" placeholder="(32) 99999-9999" autocomplete="tel"></label>
   <fieldset><legend>Forma de retirada</legend><label class="opt"><input type="radio" name="tipo" value="Retirar no local" checked> Retirar no local</label><label class="opt"><input type="radio" name="tipo" value="Entrega"> Entrega</label></fieldset>
   <div id="end" hidden style="display:grid;gap:14px"><label>Rua<input name="rua"></label><label>Número<input name="num" inputmode="numeric"></label><label>Bairro<input name="bairro"></label><label>Complemento<input name="comp"></label><label>Referência<input name="ref"></label></div>
   <fieldset><legend>Forma de pagamento</legend><label class="opt"><input type="radio" name="pag" value="PIX"> PIX</label><label class="opt"><input type="radio" name="pag" value="Dinheiro"> Dinheiro</label><label class="opt"><input type="radio" name="pag" value="Cartão na entrega"> Cartão na entrega</label></fieldset>
   <label>Observações<textarea name="obs" rows="3" maxlength="500" placeholder="Algum detalhe sobre seu pedido?"></textarea></label><label id="troco" hidden>Troco para quanto?<input name="troco" inputmode="decimal" placeholder="Ex.: 100"></label>
   <ul class="err" id="err" role="alert"></ul><button class="btn big" type="submit">FINALIZAR PEDIDO</button></form></section></div>`;
  const f = $("#form");
  $("#items").addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    if (b.dataset.d) changeQty(b.dataset.k, +b.dataset.d);
    if (b.dataset.rm) removeItem(b.dataset.rm);
    if (b.id === "clear" && confirm("Limpar todo o carrinho?")) saveCart([]);
  });
  f.addEventListener("change", () => { // mostra/esconde endereço e troco
    $("#end").hidden = f.tipo.value !== "Entrega";
    $("#troco").hidden = f.pag.value !== "Dinheiro";
  });
  f.addEventListener("submit", e => { e.preventDefault(); checkout(f); });
}

function checkout(f){
  const cart = loadCart(), v = n => f.elements[n].value.trim(), errs = [];
  $$(".bad", f).forEach(x => x.classList.remove("bad"));
  const need = (n, msg) => { errs.push(msg); f.elements[n].classList?.add("bad"); };
  if (!cart.length) errs.push("Seu carrinho está vazio. Adicione produtos antes de finalizar.");
  if (v("nome").length < 2) need("nome", "Informe seu nome.");
  if (v("tel").replace(/\D/g,"").length < 10) need("tel", "Informe um telefone válido com DDD.");
  const entrega = f.tipo.value === "Entrega";
  if (entrega) [["rua","a rua"],["num","o número"],["bairro","o bairro"]].forEach(([n,t]) => { if (!v(n)) need(n, `Informe ${t} da entrega.`); });
  if (!f.pag.value) errs.push("Escolha a forma de pagamento.");
  $("#err").innerHTML = errs.map(x=>`<li>${x}</li>`).join("");
  const cash=Number(v("troco").replace(",","."));
  if(f.pag.value==="Dinheiro"&&v("troco")&&(!Number.isFinite(cash)||cash<cartTotal(cart))) {errs.push("O valor para troco deve ser igual ou maior que o total.");$("#err").innerHTML=errs.map(x=>`<li>${x}</li>`).join("");}
  if (errs.length) {$("#err").scrollIntoView({block:"center",behavior:"smooth"});return;}

  let order=1042; try { order=(+localStorage.getItem("brasa_order")||1041)+1; } catch {} // número sequencial (só neste navegador)
  try { localStorage.setItem("brasa_order", order) } catch {}
  const trocoNum = parseFloat(v("troco").replace(",", "."));
  const trocoTxt = f.pag.value === "Dinheiro" && v("troco") ? `\nTroco para ${isNaN(trocoNum) ? v("troco") : money.format(trocoNum)}` : "";
  const msg = [
    "Olá! Gostaria de fazer o seguinte pedido:", "",
    `PEDIDO #${order}`, "", `Cliente: ${v("nome")}`, `Telefone: ${v("tel")}`, "",
    ...cart.map(i => `${i.emoji} ${i.qty}x ${i.name} — ${money.format(i.price*i.qty)}`), "",
    "--------------------", `TOTAL: ${money.format(cartTotal(cart))}`, "",
    entrega ? `Entrega:\n${v("rua")}, ${v("num")}\n${v("bairro")}${v("comp") ? " — " + v("comp") : ""}${v("ref") ? "\nRef.: " + v("ref") : ""}` : "Retirada no local", "",
    `Pagamento:\n${f.pag.value}${trocoTxt}`, v("obs") ? `Observações: ${v("obs")}` : ""
  ].join("\n");
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  toast("Pedido aberto no WhatsApp ✓");
}

/* ---------- 9. INICIALIZAÇÃO ---------- */
renderChrome();
if (page === "home") renderHome();
else if (page === "sobre") renderAbout();
else if (page === "carrinho") renderCartPage();
else renderCategory();
updateUI();

// O movimento é derivado da posição da seção, e para quando o usuário para de rolar.
const scene=document.querySelector('.fries-scene');
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
if(scene){let scheduled=false;const draw=()=>{scheduled=false;const r=scene.getBoundingClientRect();const progress=Math.max(0,Math.min(1,(innerHeight-r.top)/(innerHeight+r.height)));scene.querySelectorAll('.falling-fries').forEach((el,i)=>{el.style.transform=reducedMotion.matches?'none':`translate3d(${(progress-.5)*(i-1)*70}px,${(progress-.5)*(210+i*75)}px,0) rotate(${(progress-.5)*(i%2?-22:22)}deg)`;});};const request=()=>{if(!scheduled){scheduled=true;requestAnimationFrame(draw);}};window.addEventListener('scroll',request,{passive:true});window.addEventListener('resize',request);reducedMotion.addEventListener('change',request);draw();}
window.addEventListener('storage',e=>{if(e.key===CART_KEY)updateUI();});
function closeMenu(){const wasOpen=$('#nav').classList.contains('open');$('#nav').classList.remove('open');document.body.classList.remove('menu-open');$('#burger').setAttribute('aria-expanded','false');$('#burger').setAttribute('aria-label','Abrir menu');$('#burger').textContent='☰';return wasOpen;}
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&closeMenu())$('#burger').focus();});
const activeCategory=document.querySelector('.category-tabs .active');if(activeCategory&&window.matchMedia('(max-width:600px)').matches){const tabs=activeCategory.parentElement;tabs.scrollLeft=Math.max(0,activeCategory.offsetLeft-18);}

document.addEventListener('change',e=>{if(e.target.matches('.sz')){const el=e.target.closest('.card'),p=byId(el.dataset.id);$('.price',el).textContent=money.format(p.sizes[+e.target.value].p);}});

