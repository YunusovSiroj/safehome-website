function escapeHtml(str) {
  return String(str ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

// Product catalog cards — click to open a detail modal (reads live/translated
// content straight from the card's own DOM, so it always matches current language)
(function productModal() {
  const overlay = document.getElementById('productModalOverlay');
  if (!overlay) return;
  const media = document.getElementById('pmMedia');
  const titleEl = document.getElementById('pmTitle');
  const descEl = document.getElementById('pmDesc');
  const specsEl = document.getElementById('pmSpecs');

  function open(card) {
    const photo = card.querySelector('.product-card__photo img');
    const icon = card.querySelector('.product-card__icon');
    media.innerHTML = photo
      ? `<img src="${photo.getAttribute('src')}" alt="${photo.getAttribute('alt') || ''}">`
      : `<span class="icon-fallback">${icon ? icon.textContent : ''}</span>`;

    titleEl.textContent = card.querySelector('h3')?.textContent || '';
    descEl.textContent = card.querySelector('p')?.textContent || '';

    const specKeys = (card.dataset.specsI18n || '').split('|').filter(Boolean);
    const dict = (typeof I18N !== 'undefined' && document.documentElement.lang && I18N[document.documentElement.lang]) || {};
    specsEl.innerHTML = specKeys.map((key) => `<li>${escapeHtml(dict[key] || '')}</li>`).join('');

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-product-card]').forEach((card) => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
      e.preventDefault();
      open(card);
    });
  });

  document.getElementById('productModalClose')?.addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  document.getElementById('pmCta')?.addEventListener('click', close);
})();

// Header shadow/blur intensifies on scroll
const header = document.getElementById('header');
const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 12);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Scroll-reveal animations with a light stagger per section
if ('IntersectionObserver' in window) {
  const groups = new Map();
  document.querySelectorAll('[data-reveal]').forEach((el) => {
    const parent = el.parentElement;
    const index = (groups.get(parent) || 0);
    groups.set(parent, index + 1);
    el.style.transitionDelay = `${Math.min(index * 90, 360)}ms`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
} else {
  document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('in-view'));
}

// Mobile nav toggle
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger?.addEventListener('click', () => nav.classList.toggle('is-open'));
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('is-open')));

// Hero banner — pulled from admin CMS (localStorage), falls back to static HTML if store.js isn't loaded
if (typeof getBanner === 'function') {
  const banner = getBanner();
  const eyebrowEl = document.getElementById('heroEyebrow');
  const descEl = document.getElementById('heroDesc');
  if (eyebrowEl) eyebrowEl.textContent = banner.eyebrow;
  if (descEl) descEl.textContent = banner.desc;
}

// Contact info — pulled from admin CMS
if (typeof getContactInfo === 'function') {
  const contactInfo = getContactInfo();
  const addressEl = document.getElementById('contactAddress');
  const phoneEl = document.getElementById('contactPhone');
  const emailEl = document.getElementById('contactEmail');
  const telegramEl = document.getElementById('contactTelegram');
  if (addressEl) addressEl.textContent = contactInfo.address;
  if (phoneEl) phoneEl.textContent = contactInfo.phone;
  if (emailEl) emailEl.textContent = contactInfo.email;
  if (telegramEl) telegramEl.textContent = contactInfo.telegram;
}

// About / company info — pulled from admin CMS
if (typeof getAbout === 'function') {
  const about = getAbout();
  const titleEl = document.getElementById('aboutTitle');
  const descEl = document.getElementById('aboutDesc');
  const directorEl = document.getElementById('aboutDirector');
  const addressEl = document.getElementById('aboutAddress');
  const activityEl = document.getElementById('aboutActivity');
  if (titleEl) titleEl.textContent = about.title;
  if (descEl) descEl.textContent = about.desc;
  if (directorEl) directorEl.textContent = about.director;
  if (addressEl) addressEl.textContent = about.address;
  if (activityEl) activityEl.textContent = about.activity;
}

// News / blog — pulled from admin CMS
if (typeof getAll === 'function') {
  const posts = getAll('posts');
  const grid = document.getElementById('newsGrid');
  if (grid) {
    grid.innerHTML = posts.length
      ? posts.slice().reverse().map(p => {
          const social = (p.socialUrl || '').trim();
          const socialIcon = /youtu/i.test(social) ? '▶' : /instagram/i.test(social) ? '📷' : '🔗';
          return `
        <div class="card">
          <div class="card__media">
            ${p.image ? `<img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.title)}" loading="lazy">` : `<span class="icon-fallback">📰</span>`}
            ${social ? `<a class="card__social" href="${escapeHtml(social)}" target="_blank" rel="noopener" aria-label="Instagram/YouTube">${socialIcon}</a>` : ''}
          </div>
          <div class="card__body">
            <h3>${escapeHtml(p.title)}</h3>
            <p style="color:var(--text-muted); font-size:14px;">${escapeHtml(p.excerpt)}</p>
            <span class="card-link" style="pointer-events:none; opacity:.6;">${p.createdAt}</span>
          </div>
        </div>
      `;
        }).join('')
      : '<p style="color:var(--text-muted);">Hozircha yangiliklar yo\'q.</p>';
  }
}

// Shop by Category — 6-icon quick nav row, pulled from admin CMS (Kategoriyalar)
if (typeof getAll === 'function') {
  const categories = getAll('categories');
  const products = getAll('products');
  const grid = document.getElementById('shopCatGrid');
  if (grid && categories.length) {
    grid.innerHTML = categories.slice(0, 6).map((cat) => {
      const firstProduct = products.find((p) => p.category === cat.category);
      const img = firstProduct ? firstProduct.img : '';
      const isImage = typeof img === 'string' && img.includes('/');
      const imgSrc = isImage ? img.replace(/^\.\.\//, '') : '';
      const media = isImage
        ? `<img src="${escapeHtml(imgSrc)}" alt="${escapeHtml(cat.title)}" loading="lazy">`
        : `<span class="icon-fallback">${img || ''}</span>`;
      return `
      <a href="product.html?cat=${cat.slug}" class="shop-cat__item">
        <div class="shop-cat__media">${media}</div>
        <span>${escapeHtml(cat.category)}</span>
      </a>
    `;
    }).join('');
  }

  const banners = getAll('featureBanners');
  const bannerGrid = document.getElementById('shopCatBanners');
  if (bannerGrid && banners.length) {
    bannerGrid.innerHTML = banners.map((b) => `
      <a href="${escapeHtml(b.link || '#contact')}" class="shop-cat__banner">
        <img src="${escapeHtml(b.image)}" alt="${escapeHtml(b.title)}">
        <div class="shop-cat__banner-text">
          <span class="shop-cat__banner-label">${escapeHtml(b.label)}</span>
          <h3>${escapeHtml(b.title)}</h3>
          <span class="shop-cat__banner-link">Batafsil →</span>
        </div>
      </a>
    `).join('');
  }
}

// Product spotlight — one card per category, pulled from admin CMS (Mahsulotlar)
if (typeof getAll === 'function') {
  const categories = getAll('categories');
  const products = getAll('products');
  const spotlightGrid = document.getElementById('spotlightGrid');
  if (spotlightGrid && categories.length) {
    spotlightGrid.innerHTML = categories.map((cat, i) => {
      const num = String(i + 1).padStart(2, '0');
      const firstProduct = products.find((p) => p.category === cat.category);
      const img = firstProduct ? firstProduct.img : '';
      const isImage = typeof img === 'string' && img.includes('/');
      const imgSrc = isImage ? img.replace(/^\.\.\//, '') : '';
      const media = isImage
        ? `<img src="${escapeHtml(imgSrc)}" alt="${escapeHtml(cat.title)}" loading="lazy">`
        : `<span class="icon-fallback">${img || ''}</span>`;
      return `
      <a class="spotlight-card" href="product.html?cat=${cat.slug}">
        <div class="spotlight-card__media">${media}</div>
        <div class="spotlight-card__body">
          <span class="spotlight-card__num">${num} / MAHSULOT</span>
          <h3>${escapeHtml(cat.title)}</h3>
          <p>${escapeHtml(cat.desc)}</p>
          <span class="spotlight-card__link">Batafsil →</span>
        </div>
      </a>
    `;
    }).join('');
  }
}

// Applications ("Qo'llanilish sohalari") — pulled from admin CMS
if (typeof getAll === 'function') {
  const apps = getAll('applications');
  const appsGrid = document.getElementById('applicationsGrid');
  if (appsGrid && apps.length) {
    appsGrid.innerHTML = apps.map(a => `
      <a href="${escapeHtml(a.link || '#contact')}" class="brand-col" style="background-image:url('${escapeHtml(a.image || '')}')">
        <span class="brand-col__icon">${a.icon || ''}</span>
        <h4>${escapeHtml(a.title)}</h4>
        <button class="btn--circle">→</button>
      </a>
    `).join('');
  }
}

// Projects ("Loyihalar / Case'lar") — pulled from admin CMS
if (typeof getAll === 'function') {
  const projects = getAll('projects');
  const projectsGrid = document.getElementById('projectsGrid');
  if (projectsGrid && projects.length) {
    projectsGrid.innerHTML = projects.map(p => {
      const logo = p.logoImage
        ? `<img class="case-row__logo" src="${escapeHtml(p.logoImage)}" alt="${escapeHtml(p.title)}">`
        : `<span class="case-row__logo">${escapeHtml(p.logo || p.title.slice(0, 2).toUpperCase())}</span>`;
      const href = p.website ? escapeHtml(p.website) : '#contact';
      const target = p.website ? ' target="_blank" rel="noopener"' : '';
      return `
      <a href="${href}"${target} class="case-row">
        ${logo}
        <div class="case-row__body">
          <h3>${escapeHtml(p.title)}</h3>
          <p>${escapeHtml(p.desc)}</p>
        </div>
      </a>
    `;
    }).join('');
  }
}

// Request form — saved into admin CMS (localStorage) so it appears in admin/requests.html
const form = document.getElementById('requestForm');

// Phone field — "+998 " prefix is locked, and the 9 digits after it auto-format
// as "XX XXX XX XX" (Uzbek mobile format). Nothing but digits can be typed after the prefix.
if (form?.phone) {
  const phoneInput = form.phone;
  const PREFIX = '+998 ';

  const formatDigits = (digits) => {
    digits = digits.slice(0, 9);
    let out = digits.slice(0, 2);
    if (digits.length > 2) out += ' ' + digits.slice(2, 5);
    if (digits.length > 5) out += ' ' + digits.slice(5, 7);
    if (digits.length > 7) out += ' ' + digits.slice(7, 9);
    return out;
  };

  const keepCursorAfterPrefix = () => {
    if (phoneInput.selectionStart < PREFIX.length) {
      phoneInput.setSelectionRange(PREFIX.length, PREFIX.length);
    }
  };

  phoneInput.addEventListener('focus', () => {
    if (!phoneInput.value) phoneInput.value = PREFIX;
    keepCursorAfterPrefix();
  });
  phoneInput.addEventListener('click', keepCursorAfterPrefix);
  phoneInput.addEventListener('keydown', (e) => {
    if ((e.key === 'Backspace' || e.key === 'Delete') && phoneInput.selectionStart <= PREFIX.length && phoneInput.selectionEnd <= PREFIX.length) {
      e.preventDefault();
    }
  });
  phoneInput.addEventListener('input', (e) => {
    const value = e.target.value;
    const afterPrefix = value.startsWith(PREFIX) ? value.slice(PREFIX.length) : value.replace(/^\+?998\s*/, '');
    const digits = afterPrefix.replace(/[^0-9]/g, '');
    e.target.value = PREFIX + formatDigits(digits);
    keepCursorAfterPrefix();
    phoneInput.setSelectionRange(phoneInput.value.length, phoneInput.value.length);
  });
}
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  const original = btn.textContent;

  if (typeof addItem === 'function') {
    const data = Object.fromEntries(new FormData(form).entries());
    addItem('requests', {
      name: data.name?.trim() || '',
      phone: data.phone?.trim() || '',
      company: data.company?.trim() || '',
      object: data.object?.trim() || '',
      message: data.message?.trim() || '',
      status: 'yangi',
      createdAt: new Date().toISOString().slice(0, 10),
    });
  }

  btn.textContent = 'Yuborildi ✓';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = original;
    btn.disabled = false;
    form.reset();
  }, 2200);
});

// Hero visual — auto-rotating product slider (3 sets of 4 images, crossfade)
(function heroSlider() {
  const grid = document.getElementById('heroVisualGrid');
  const rail = document.getElementById('heroRail');
  if (!grid || !rail) return;

  const sets = [
    [
      { src: 'assets/img/akubela-ref/PHX1.jpg', alt: 'Smart panel' },
      { src: 'assets/img/akubela-ref/9b65b852124dbf60bec84b58977c6d19.png', alt: 'Indoor monitor' },
      { src: 'assets/img/akubela-ref/HyPanel-Lux-big.jpg', alt: 'HyPanel Lux' },
      { src: 'assets/img/akubela-ref/4603e3115e5a1dd9abcc35f4aef5922f.png', alt: 'Smart control panel' },
    ],
    [
      { src: 'assets/img/akubela-ref/26044dbf99596f60d35f904ab5900015.png', alt: 'Indoor monitor' },
      { src: 'assets/img/akubela-ref/2a1efd109f34707db04eef076ee3c24b.png', alt: 'Door panel' },
      { src: 'assets/img/akubela-ref/2e65089bb489fe446f61f77ce0a9f153.png', alt: 'Smart scene switch' },
      { src: 'assets/img/akubela-ref/395864aca24a14980474e6b7232e92fa.png', alt: 'Smart lock' },
    ],
    [
      { src: 'assets/img/akubela-ref/2f62844d66c878f0df680d959a58f1ba.png', alt: 'Smart control panel' },
      { src: 'assets/img/akubela-ref/knx-scene-panel.png', alt: 'Scene panel' },
      { src: 'assets/img/akubela-ref/458dcb428640bfa17bde85eca8d195a9.png', alt: 'Smart panel' },
      { src: 'assets/img/akubela-ref/569523626f45a19aa28512cf7596ce5d.png', alt: 'Smart panel' },
    ],
  ];

  const imgs = Array.from(grid.querySelectorAll('.hero__visual-cell img'));
  const dots = Array.from(rail.querySelectorAll('.hero__rail-dot'));
  let current = 0;
  let timer = null;

  function render(index, animate) {
    imgs.forEach((img, i) => {
      const data = sets[index][i];
      if (!data) return;
      if (!animate) {
        img.src = data.src;
        img.alt = data.alt;
        return;
      }
      img.classList.add('is-fading');
      setTimeout(() => {
        img.src = data.src;
        img.alt = data.alt;
        img.classList.remove('is-fading');
      }, 400);
    });
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    current = index;
  }

  function next() { render((current + 1) % sets.length, true); }

  function start() { timer = setInterval(next, 4500); }
  function stop() { clearInterval(timer); }

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const idx = Number(dot.dataset.slide);
      if (idx === current) return;
      stop();
      render(idx, true);
      start();
    });
  });

  const visual = document.getElementById('heroVisual');
  visual?.addEventListener('mouseenter', stop);
  visual?.addEventListener('mouseleave', start);

  render(0, false);
  start();
})();
