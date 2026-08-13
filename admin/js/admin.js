// Shared admin shell (sidebar + auth guard) — injected into every admin page
// except login.html. Expects a <div id="sidebar"></div> placeholder in the page.

const NAV_ITEMS = [
  { href: 'dashboard.html', icon: '📊', label: 'Bosh panel' },
  { href: 'products.html', icon: '📦', label: 'Mahsulotlar' },
  { href: 'categories.html', icon: '🗂️', label: 'Kategoriyalar' },
  { href: 'projects.html', icon: '🏗️', label: 'Loyihalar' },
  { href: 'applications.html', icon: '🏠', label: "Qo'llanilish" },
  { href: 'requests.html', icon: '📥', label: "So'rovlar" },
  { href: 'content.html', icon: '📝', label: 'Kontent' },
];

function currentPage() {
  return window.location.pathname.split('/').pop() || 'dashboard.html';
}

function renderSidebar() {
  guardAuth();
  const page = currentPage();
  const email = sessionStorage.getItem('sh_admin_email') || 'admin@safehome.uz';

  const links = NAV_ITEMS.map(item => `
    <a href="${item.href}" class="${item.href === page ? 'active' : ''}">
      <span>${item.icon}</span> ${item.label}
    </a>
  `).join('');

  const el = document.getElementById('sidebar');
  if (!el) return;
  el.innerHTML = `
    <div class="sidebar__logo">
      <img src="../assets/img/logo.jpg" alt="SafeHome.uz">
      <span>SafeHome Admin</span>
    </div>
    <nav>${links}</nav>
    <div class="sidebar__footer">
      <span class="email">${email}</span>
      <button class="logout-btn" id="logoutBtn">⎋ Chiqish</button>
    </div>
  `;
  document.getElementById('logoutBtn').addEventListener('click', logout);
}

function fmtDate(d) {
  return d || '-';
}

function isImagePath(val) {
  return typeof val === 'string' && val.includes('/');
}

function escapeHtml(str) {
  return String(str ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

document.addEventListener('DOMContentLoaded', renderSidebar);
