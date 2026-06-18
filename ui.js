window.App = window.App || {};

App.Icons = {
  grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="3" width="8" height="8" rx="2"/><rect x="3" y="13" width="8" height="8" rx="2"/><rect x="13" y="13" width="8" height="8" rx="2"/></svg>',
  list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4h10a2 2 0 0 1 2 2v14l-3-2-3 2-3-2-3 2V6a2 2 0 0 1 2-2Z"/><path d="M9 9h6M9 13h6"/></svg>',
  tag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11.5V5a1 1 0 0 1 1-1h6.5a1 1 0 0 1 .7.3l9 9a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0l-9-9a1 1 0 0 1-.3-.7Z"/><circle cx="7.5" cy="7.5" r="1.2"/></svg>',
  gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 13a7.97 7.97 0 0 0 0-2l2-1.5-2-3.4-2.4.6a8 8 0 0 0-1.7-1l-.4-2.5h-4l-.4 2.5a8 8 0 0 0-1.7 1l-2.4-.6-2 3.4 2 1.5a7.97 7.97 0 0 0 0 2l-2 1.5 2 3.4 2.4-.6a8 8 0 0 0 1.7 1l.4 2.5h4l.4-2.5a8 8 0 0 0 1.7-1l2.4.6 2-3.4Z"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M20 20l-4.3-4.3"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v11M7.5 11l4.5 4.5L16.5 11M4 18.5h16"/></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z"/></svg>',
  chevronLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
  chevronRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5 21 19.5H3Z"/><path d="M12 9.5v4M12 16.8v.1"/></svg>',
  wallet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M16 13h2M3 9h18"/></svg>',
  trendingUp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/></svg>',
  trendingDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7l6 6 4-4 8 8"/><path d="M15 17h6v-6"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>',
  scale: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18M5 7l-3 6a4 4 0 0 0 8 0ZM19 7l-3 6a4 4 0 0 0 8 0Z"/><path d="M3 21h18M5 7h14"/></svg>',
  target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="0.7" fill="currentColor" stroke="none"/></svg>'
};

App.UI = (function () {

  function applyIcons(root) {
    (root || document).querySelectorAll('[data-icon]').forEach(function (el) {
      var name = el.getAttribute('data-icon');
      if (App.Icons[name]) el.innerHTML = App.Icons[name];
    });
  }

  function escapeHTML(str) {
    var div = document.createElement('div');
    div.textContent = str == null ? '' : String(str);
    return div.innerHTML;
  }

  function toast(message, type) {
    type = type || 'info';
    var container = document.getElementById('toast-container');
    var el = document.createElement('div');
    el.className = 'toast toast-' + type;
    el.textContent = message;
    container.appendChild(el);
    requestAnimationFrame(function () { el.classList.add('show'); });
    setTimeout(function () {
      el.classList.remove('show');
      setTimeout(function () { el.remove(); }, 300);
    }, 3200);
  }

  function openModal(id) {
    document.getElementById(id).classList.add('open');
    document.body.classList.add('modal-open');
  }

  function closeModal(id) {
    document.getElementById(id).classList.remove('open');
    document.body.classList.remove('modal-open');
  }

  function closeAllModals() {
    document.querySelectorAll('.modal-overlay.open').forEach(function (m) { m.classList.remove('open'); });
    document.body.classList.remove('modal-open');
  }

  function navigateTo(page) {
    document.querySelectorAll('.page').forEach(function (p) {
      p.classList.toggle('active', p.id === 'page-' + page);
    });
    document.querySelectorAll('.nav-item, .bottom-item').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.page === page);
    });
    var titles = { dashboard: 'Dashboard', despesas: 'Despesas', categorias: 'Categorias', config: 'Configurações' };
    document.getElementById('topbar-title').textContent = titles[page] || '';
    window.scrollTo(0, 0);
    if (page === 'dashboard') renderDashboard();
    else if (page === 'despesas') renderDespesas();
    else if (page === 'categorias') renderCategorias();
    else if (page === 'config') renderConfig();
  }

  function populateCategoryOptions(selectEl, selectedId) {
    var categories = App.Store.getCategories();
    selectEl.innerHTML = categories.map(function (c) {
      return '<option value="' + c.id + '">' + escapeHTML(c.name) + '</option>';
    }).join('');
    if (selectedId) selectEl.value = selectedId;
  }

  function monthKeyLabel(key) {
    var parts = key.split('-').map(Number);
    return App.Format.monthLabel(parts[0], parts[1] - 1);
  }

  function populateMonthFilter() {
    var sel = document.getElementById('filter-month');
    var months = App.Store.getAvailableMonths();
    var options = ['<option value="all">Todos os meses</option>'].concat(
      months.map(function (m) { return '<option value="' + m + '">' + monthKeyLabel(m) + '</option>'; })
    );
    sel.innerHTML = options.join('');
    sel.value = App.State.filters.month;
  }

  function populateCategoryFilter() {
    var sel = document.getElementById('filter-category');
    var categories = App.Store.getCategories();
    sel.innerHTML = '<option value="all">Todas categorias</option>' +
      categories.map(function (c) { return '<option value="' + c.id + '">' + escapeHTML(c.name) + '</option>'; }).join('');
    sel.value = App.State.filters.category;
  }

  function getFilteredExpenses() {
    var f = App.State.filters;
    var list = App.Store.getExpenses();
    if (f.month !== 'all') list = list.filter(function (e) { return e.date.slice(0, 7) === f.month; });
    if (f.category !== 'all') list = list.filter(function (e) { return e.categoryId === f.category; });
    if (f.search.trim()) {
      var q = f.search.trim().toLowerCase();
      list = list.filter(function (e) { return e.description.toLowerCase().indexOf(q) !== -1; });
    }
    return list.sort(function (a, b) { return a.date < b.date ? 1 : -1; });
  }

  function buildDashboardCards(summary) {
    return [
      { icon: 'wallet', label: 'Salário do mês', value: summary.config.salary, tone: 'neutral' },
      { icon: 'trendingUp', label: 'Já recebido', value: summary.payment.received, tone: 'positive' },
      { icon: 'clock', label: 'Ainda a receber', value: summary.payment.pending, tone: 'neutral' },
      { icon: 'trendingDown', label: 'Total gasto', value: summary.totalExpenses, tone: 'negative' },
      { icon: 'scale', label: 'Saldo atual', value: summary.balance, tone: summary.balance >= 0 ? 'positive' : 'negative' },
      { icon: 'target', label: 'Saldo previsto (fim do mês)', value: summary.projectedBalance, tone: summary.projectedBalance >= 0 ? 'positive' : 'negative' }
    ];
  }

  function updateLeisureRing(available, spent) {
    var r = 52;
    var circumference = 2 * Math.PI * r;
    var fillEl = document.getElementById('leisure-ring-fill');
    fillEl.style.strokeDasharray = circumference;
    var ratio = available > 0 ? spent / available : 0;
    var visualRatio = Math.min(ratio, 1);
    fillEl.style.strokeDashoffset = circumference * (1 - visualRatio);
    var exceeded = spent > available;
    fillEl.classList.toggle('exceeded', exceeded);
    document.getElementById('leisure-percent-label').textContent = Math.round(ratio * 100) + '%';
  }

  function renderDashboard() {
    var year = App.State.dash.year;
    var monthIndex = App.State.dash.monthIndex;
    var summary = App.Store.getMonthSummary(year, monthIndex);

    document.getElementById('dash-month-label').textContent = App.Format.monthLabel(year, monthIndex);

    var emptyEl = document.getElementById('dash-empty');
    var alertEl = document.getElementById('dash-alert');
    emptyEl.hidden = summary.config.salary > 0;

    if (summary.config.salary > 0) {
      var ratio = summary.totalExpenses / summary.config.salary;
      if (ratio >= 1) {
        alertEl.hidden = false;
        alertEl.className = 'alert-banner danger';
        alertEl.innerHTML = '<span class="alert-icon">' + App.Icons.alert + '</span><span>Seus gastos já ultrapassaram a sua renda mensal de ' + App.Format.currency(summary.config.salary) + '.</span>';
      } else if (ratio >= 0.8) {
        alertEl.hidden = false;
        alertEl.className = 'alert-banner warning';
        alertEl.innerHTML = '<span class="alert-icon">' + App.Icons.alert + '</span><span>Atenção: você já usou ' + Math.round(ratio * 100) + '% da sua renda mensal este mês.</span>';
      } else {
        alertEl.hidden = true;
      }
    } else {
      alertEl.hidden = true;
    }

    var cards = buildDashboardCards(summary);
    document.getElementById('dash-cards').innerHTML = cards.map(function (c) {
      return '<div class="metric-card tone-' + c.tone + '">' +
        '<span class="metric-icon">' + App.Icons[c.icon] + '</span>' +
        '<div><p class="metric-label">' + c.label + '</p><strong class="metric-value">' + App.Format.currency(c.value) + '</strong></div>' +
        '</div>';
    }).join('');

    document.getElementById('leisure-available').textContent = App.Format.currency(summary.leisure.available);
    document.getElementById('leisure-spent').textContent = App.Format.currency(summary.leisure.spent);
    var remainingEl = document.getElementById('leisure-remaining');
    remainingEl.textContent = App.Format.currency(summary.leisure.remaining);
    remainingEl.classList.toggle('negative-text', summary.leisure.exceeded);
    document.querySelector('.leisure-card').classList.toggle('exceeded', summary.leisure.exceeded);
    updateLeisureRing(summary.leisure.available, summary.leisure.spent);

    var categories = summary.categories;
    var items = Object.keys(summary.byCategory).map(function (id) {
      var cat = categories.find(function (c) { return c.id === id; }) || { name: id, color: '#8b96a8' };
      return { id: id, name: cat.name, color: cat.color, value: summary.byCategory[id] };
    }).sort(function (a, b) { return b.value - a.value; });

    var pieEmpty = document.getElementById('pie-empty');
    var pieCanvas = document.getElementById('chart-pie');
    if (items.length) {
      pieEmpty.hidden = true;
      pieCanvas.hidden = false;
      App.Charts.renderPie(pieCanvas, items);
    } else {
      pieEmpty.hidden = false;
      pieCanvas.hidden = true;
    }

    var months = App.Store.getLastMonthsTotals(year, monthIndex, 6);
    App.Charts.renderBar(document.getElementById('chart-bar'), months.map(function (m) {
      return { label: App.Format.monthShort(m.year, m.monthIndex), value: m.total };
    }));

    document.getElementById('dash-category-list').innerHTML = items.length ? items.map(function (i) {
      var pct = summary.totalExpenses > 0 ? Math.round((i.value / summary.totalExpenses) * 100) : 0;
      return '<div class="cat-row"><span class="cat-dot" style="background:' + i.color + '"></span>' +
        '<span class="cat-row-name">' + escapeHTML(i.name) + '</span>' +
        '<div class="cat-row-bar"><div class="cat-row-bar-fill" style="width:' + pct + '%;background:' + i.color + '"></div></div>' +
        '<span class="cat-row-value">' + App.Format.currency(i.value) + '</span>' +
        '<span class="cat-row-pct">' + pct + '%</span></div>';
    }).join('') : '<p class="muted">Nenhum gasto registrado neste mês ainda.</p>';
  }

  function headRowHTML() {
    return '<div class="expense-row expense-row--head"><span>Data</span><span>Descrição</span><span>Categoria</span><span>Valor</span><span></span></div>';
  }

  function expenseRowHTML(e, catMap) {
    var cat = catMap[e.categoryId] || { name: 'Sem categoria', color: '#8b96a8' };
    return '<div class="expense-row" data-id="' + e.id + '">' +
      '<span class="cell-date" data-label="Data">' + App.Format.date(e.date) + '</span>' +
      '<span class="cell-desc" data-label="Descrição">' + escapeHTML(e.description) + '</span>' +
      '<span class="cell-cat" data-label="Categoria"><span class="cat-dot" style="background:' + cat.color + '"></span>' + escapeHTML(cat.name) + '</span>' +
      '<span class="cell-value" data-label="Valor">' + App.Format.currency(e.value) + '</span>' +
      '<span class="cell-actions">' +
      '<button class="icon-btn" data-edit-expense="' + e.id + '" aria-label="Editar despesa">' + App.Icons.edit + '</button>' +
      '<button class="icon-btn danger" data-delete-expense="' + e.id + '" aria-label="Excluir despesa">' + App.Icons.trash + '</button>' +
      '</span></div>';
  }

  function renderDespesas() {
    populateMonthFilter();
    populateCategoryFilter();

    var categories = App.Store.getCategories();
    var catMap = {};
    categories.forEach(function (c) { catMap[c.id] = c; });

    var list = getFilteredExpenses();
    var container = document.getElementById('expense-list');
    var emptyEl = document.getElementById('expense-empty');

    if (!list.length) {
      container.innerHTML = '';
      emptyEl.hidden = false;
    } else {
      emptyEl.hidden = true;
      container.innerHTML = headRowHTML() + list.map(function (e) { return expenseRowHTML(e, catMap); }).join('');
    }

    var total = list.reduce(function (s, e) { return s + e.value; }, 0);
    document.querySelector('#expense-total strong').textContent = App.Format.currency(total);
  }

  function renderCategorias() {
    var categories = App.Store.getCategories();
    var summary = App.Store.getMonthSummary(App.State.dash.year, App.State.dash.monthIndex);
    var grid = document.getElementById('category-grid');
    grid.innerHTML = categories.map(function (c) {
      var spent = summary.byCategory[c.id] || 0;
      return '<div class="category-card">' +
        '<div class="category-card-top"><span class="cat-dot lg" style="background:' + c.color + '"></span><strong>' + escapeHTML(c.name) + '</strong></div>' +
        '<p class="muted">Gasto em ' + App.Format.monthLabel(App.State.dash.year, App.State.dash.monthIndex) + '</p>' +
        '<strong class="category-card-value">' + App.Format.currency(spent) + '</strong>' +
        '<div class="category-card-actions">' +
        '<button class="btn ghost small" data-edit-cat="' + c.id + '">Editar</button>' +
        '<button class="btn ghost small danger" data-delete-cat="' + c.id + '">Excluir</button>' +
        '</div></div>';
    }).join('');
  }

  function updatePaymentHint(config) {
    var sample = App.Store.getPaymentInfo(App.State.dash.year, App.State.dash.monthIndex);
    document.getElementById('payment-hint').textContent =
      App.Format.ordinal(config.payment1BusinessDay) + ' dia útil: ' + App.Format.date(sample.date1) +
      '  ·  dia ' + config.payment2Day + ': ' + App.Format.date(sample.date2);
  }

  function renderConfig() {
    var config = App.Store.getConfig();
    document.getElementById('cfg-salary').value = config.salary ? App.Format.toInputMoney(config.salary) : '';
    document.getElementById('cfg-p1-percent').value = config.payment1Percent;
    document.getElementById('cfg-p1-day').value = config.payment1BusinessDay;
    document.getElementById('cfg-p2-percent').value = config.payment2Percent;
    document.getElementById('cfg-p2-day').value = config.payment2Day;
    document.getElementById('cfg-leisure').value = config.leisurePercent;
    updatePaymentHint(config);
    document.querySelectorAll('.theme-option').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.themeOption === config.theme);
    });
  }

  return {
    applyIcons: applyIcons,
    escapeHTML: escapeHTML,
    toast: toast,
    openModal: openModal,
    closeModal: closeModal,
    closeAllModals: closeAllModals,
    navigateTo: navigateTo,
    populateCategoryOptions: populateCategoryOptions,
    getFilteredExpenses: getFilteredExpenses,
    renderDashboard: renderDashboard,
    renderDespesas: renderDespesas,
    renderCategorias: renderCategorias,
    renderConfig: renderConfig
  };
})();
