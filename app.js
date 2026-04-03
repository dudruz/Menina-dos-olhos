/**
 * MENINA DOS OLHOS — app.js
 * Vincula dados.json ao HTML dinamicamente
 */

'use strict';

// Estado global
let appData = {};

/**
 * Carrega dados.json
 */
async function loadData() {
  try {
    const response = await fetch('./dados.json');
    if (!response.ok) throw new Error('Erro ao carregar dados.json');
    appData = await response.json();
    renderAllContent();
  } catch (error) {
    console.error('❌ Erro ao carregar dados:', error);
  }
}

/**
 * Renderiza todo o conteúdo
 */
function renderAllContent() {
  renderProducts();
  renderDiferenciais();
  renderTestimonials();
  renderFAQ();
  renderFooterLinks();
  updateContactInfo();
}

/**
 * Renderiza Categorias
 */
function renderProducts() {
  const container = document.querySelector('.categorias__grid');
  if (!container || !appData.categorias) return;

  container.innerHTML = appData.categorias.map((cat, idx) => {
    const badge = cat.promocao ? `<div class="categoria-card__badge">${cat.promocao_texto}</div>` : '';
    const featured = cat.destaque ? 'categoria-card--featured' : '';

    return `
      <article class="categoria-card ${featured}" data-animate="fade-up" data-delay="${idx * 100}">
        ${badge}
        <div class="categoria-card__image">
          <img src="${cat.imagem}" alt="${cat.nome}" />
        </div>
        <div class="categoria-card__body">
          <h3 class="categoria-card__title">${cat.nome}</h3>
          <p class="categoria-card__desc">${cat.descricao}</p>
          <a href="#vitrine" class="btn ${cat.destaque ? 'btn--primary' : 'btn--ghost'} btn--sm">
            Ver opções
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </article>
    `;
  }).join('');
}

/**
 * Renderiza Vitrine de Produtos
 */
function renderProductShowcase() {
  const container = document.querySelector('.vitrine__grid');
  if (!container || !appData.produtos) return;

  container.innerHTML = appData.produtos.map((prod, idx) => {
    const waLink = `https://wa.me/${appData.empresa.whatsapp}?text=${encodeURIComponent(prod.whatsapp_mensagem)}`;
    const media = prod.tipo_media === 'video' 
      ? `<video autoplay muted loop playsinline><source src="${prod.imagem}" type="video/mp4" /></video>`
      : `<img src="${prod.imagem}" alt="${prod.nome}" itemprop="image" />`;

    return `
      <article class="produto-card" data-animate="fade-up" data-delay="${idx * 100}" itemscope itemtype="https://schema.org/Product">
        <div class="produto-card__image">
          ${media}
          <div class="produto-card__overlay">
            <a href="${waLink}" class="btn btn--primary btn--sm" target="_blank" rel="noopener noreferrer">
              Quero este
            </a>
          </div>
        </div>
        <div class="produto-card__body">
          <span class="produto-card__cat" itemprop="category">${prod.categoria}</span>
          ${prod.promocao ? `<span style="font-size: 0.85rem; color: #53B851; font-weight: 600;">${prod.promocao_texto}</span>` : ''}
          <h3 class="produto-card__name" itemprop="name">${prod.nome}</h3>
          <p class="produto-card__desc" itemprop="description">${prod.descricao}</p>
          <a href="${waLink}" class="btn btn--primary btn--full" target="_blank" rel="noopener noreferrer">
            Quero este
          </a>
        </div>
      </article>
    `;
  }).join('');
}

/**
 * Renderiza Diferenciais
 */
function renderDiferenciais() {
  const container = document.querySelector('.diferenciais__grid');
  if (!container || !appData.diferenciais) return;

  container.innerHTML = appData.diferenciais.map((dif, idx) => `
    <div class="diferencial" data-animate="fade-up" data-delay="${idx * 100}">
      <div class="diferencial__icon" aria-hidden="true">
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="20" fill="url(#${dif.icone})" fill-opacity="0.15"/>
          <!-- Ícone específico aqui -->
        </svg>
      </div>
      <h3 class="diferencial__title">${dif.titulo}</h3>
      <p class="diferencial__desc">${dif.descricao}</p>
    </div>
  `).join('');
}

/**
 * Renderiza Depoimentos
 */
function renderTestimonials() {
  const container = document.querySelector('.depoimentos__grid');
  if (!container || !appData.depoimentos) return;

  container.innerHTML = appData.depoimentos.map((dep, idx) => {
    const stars = '★'.repeat(dep.avaliacao);
    return `
      <blockquote class="depoimento" data-animate="fade-up" data-delay="${idx * 100}" itemscope itemtype="https://schema.org/Review">
        <div class="depoimento__stars" aria-label="${dep.avaliacao} estrelas">
          <span aria-hidden="true">${stars}</span>
        </div>
        <p class="depoimento__texto" itemprop="reviewBody">"${dep.texto}"</p>
        <footer class="depoimento__autor">
          <div class="autor__avatar" aria-hidden="true">
            <svg viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="20" fill="url(#${dep.avatar})"/>
              <circle cx="20" cy="16" r="7" fill="white" fill-opacity="0.4"/>
              <path d="M8 34C8 28 13.4 24 20 24C26.6 24 32 28 32 34" fill="white" fill-opacity="0.4"/>
            </svg>
          </div>
          <div itemprop="author" itemscope itemtype="https://schema.org/Person">
            <cite class="autor__nome" itemprop="name">${dep.autor}</cite>
            <span class="autor__local">${dep.local}</span>
          </div>
        </footer>
        <meta itemprop="reviewRating" itemscope itemtype="https://schema.org/Rating" content="${dep.avaliacao}">
      </blockquote>
    `;
  }).join('');
}

/**
 * Renderiza FAQ
 */
function renderFAQ() {
  const container = document.querySelector('.faq__list');
  if (!container || !appData.faq) return;

  container.innerHTML = appData.faq.map((item) => `
    <details class="faq__item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
      <summary class="faq__question" aria-expanded="false" itemprop="name">
        ${item.pergunta}
        <span class="faq__arrow" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </span>
      </summary>
      <div class="faq__answer" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
        <p itemprop="text">${item.resposta}</p>
      </div>
    </details>
  `).join('');

  // Reinicializar event listeners do FAQ
  initFaqListeners();
}

/**
 * Renderiza Links do Footer
 */
function renderFooterLinks() {
  if (!appData.empresa) return;

  const empresa = appData.empresa;
  
  // Atualizar WhatsApp links
  document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    const href = link.getAttribute('href');
    if (href.includes('553183623050')) {
      link.href = appData.links_whatsapp[link.dataset.waType || 'orcamento_header'] || href;
    }
  });
}

/**
 * Atualiza Informações de Contato
 */
function updateContactInfo() {
  if (!appData.empresa) return;

  const empresa = appData.empresa;

  // Endereço
  const enderecoEl = document.querySelector('.contato__bloco p');
  if (enderecoEl) {
    enderecoEl.innerHTML = `${empresa.endereco.rua}, ${empresa.endereco.numero}<br />
      ${empresa.endereco.bairro} – ${empresa.endereco.cidade}, ${empresa.endereco.estado}<br />
      CEP ${empresa.endereco.cep}`;
  }

  // Telefone
  document.querySelectorAll('a[href*="tel:"]').forEach(link => {
    link.href = `tel:${empresa.telefone}`;
    link.textContent = empresa.telefone;
  });

  // Horários
  const horarioList = document.querySelector('.horario__list');
  if (horarioList) {
    horarioList.innerHTML = `
      <li><span>Segunda a Sexta</span><strong>${empresa.horario.semana}</strong></li>
      <li><span>Sábado</span><strong>${empresa.horario.sabado}</strong></li>
      <li class="horario__closed"><span>Domingo</span><strong>${empresa.horario.domingo}</strong></li>
    `;
  }

  // Instagram
  const instagramLink = document.querySelector('a[href*="instagram"]');
  if (instagramLink && empresa.redes_sociais.instagram) {
    instagramLink.href = empresa.redes_sociais.instagram;
  }
}

/**
 * Reinicializa listeners do FAQ quando renderizado dinamicamente
 */
function initFaqListeners() {
  const items = document.querySelectorAll('.faq__item');
  
  items.forEach((item) => {
    // Remover listeners antigos
    const oldSummary = item.querySelector('.faq__question');
    const newSummary = oldSummary.cloneNode(true);
    oldSummary.parentNode.replaceChild(newSummary, oldSummary);

    // Adicionar novo listener
    item.addEventListener('toggle', () => {
      const summary = item.querySelector('.faq__question');
      summary.setAttribute('aria-expanded', String(item.open));
    });

    const summary = item.querySelector('.faq__question');
    summary.addEventListener('click', (e) => {
      e.preventDefault();
      item.open = !item.open;
    });
  });
}

/**
 * Atualizar contadores com dados
 */
function updateCounters() {
  if (!appData.estatisticas) return;

  const targets = document.querySelectorAll('.trust__item strong');
  if (targets.length >= 3) {
    targets[0].textContent = `+${appData.estatisticas.clientes_satisfeitos}`;
    targets[1].textContent = `${appData.estatisticas.modelos_disponiveis}+`;
    targets[2].textContent = `${appData.estatisticas.avaliacao_media}★`;
  }
}

/**
 * Inicialização
 */
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  
  // Renderizar vitrine após carregar dados
  setTimeout(() => {
    renderProductShowcase();
    updateCounters();
  }, 500);
});

// Exportar para uso global
window.appData = appData;
window.renderAllContent = renderAllContent;
