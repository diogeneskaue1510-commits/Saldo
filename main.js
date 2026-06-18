window.App = window.App || {};

(function () {
  var now = new Date();

  App.State = {
    dash: { year: now.getFullYear(), monthIndex: now.getMonth() },
    filters: {
      month: App.Store.monthKey(now.getFullYear(), now.getMonth()),
      category: 'all',
      search: ''
    }
  };

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  function init() {
    var config = App.Store.getConfig();
    applyTheme(config.theme);
    App.UI.applyIcons(document);
    bindEvents();
    App.UI.navigateTo('dashboard');
  }

  function bindEvents() {
    document.addEventListener('click', handleGlobalClick);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') App.UI.closeAllModals();
    });

    document.getElementById('expense-search').addEventListener('input', function (e) {
      App.State.filters.search = e.target.value;
      App.UI.renderDespesas();
    });
    document.getElementById('filter-month').addEventListener('change', function (e) {
      App.State.filters.month = e.target.value;
      App.UI.renderDespesas();
    });
    document.getElementById('filter-category').addEventListener('change', function (e) {
      App.State.filters.category = e.target.value;
      App.UI.renderDespesas();
    });

    document.getElementById('dash-prev-month').addEventListener('click', function () { shiftDashMonth(-1); });
    document.getElementById('dash-next-month').addEventListener('click', function () { shiftDashMonth(1); });

    document.getElementById('expense-form').addEventListener('submit', handleExpenseSubmit);
    document.getElementById('category-form').addEventListener('submit', handleCategorySubmit);
    document.getElementById('form-salary').addEventListener('submit', handleSalarySubmit);
    document.getElementById('form-leisure').addEventListener('submit', handleLeisureSubmit);

    document.getElementById('btn-export-csv').addEventListener('click', function () { exportExpenses('csv'); });
    document.getElementById('btn-export-xlsx').addEventListener('click', function () { exportExpenses('xlsx'); });

    document.getElementById('btn-backup-export').addEventListener('click', function () { App.Export.backupJSON(); });
    document.getElementById('backup-file').addEventListener('change', handleBackupImport);
    document.getElementById('btn-clear-data').addEventListener('click', handleClearData);
  }

  function handleGlobalClick(e) {
    var navBtn = e.target.closest('[data-page]');
    if (navBtn) { App.UI.navigateTo(navBtn.dataset.page); return; }

    var closeBtn = e.target.closest('[data-close-modal]');
    if (closeBtn) { App.UI.closeAllModals(); return; }

    if (e.target.classList && e.target.classList.contains('modal-overlay')) {
      App.UI.closeAllModals();
      return;
    }

    var themeToggle = e.target.closest('#theme-toggle, #topbar-theme-toggle');
    if (themeToggle) { toggleTheme(); return; }

    var themeOption = e.target.closest('[data-theme-option]');
    if (themeOption) { setTheme(themeOption.dataset.themeOption); return; }

    var newExpenseBtn = e.target.closest('#btn-new-expense');
    if (newExpenseBtn) { openExpenseModal(); return; }

    var editExpenseBtn = e.target.closest('[data-edit-expense]');
    if (editExpenseBtn) { openExpenseModal(editExpenseBtn.dataset.editExpense); return; }

    var deleteExpenseBtn = e.target.closest('[data-delete-expense]');
    if (deleteExpenseBtn) {
      if (confirm('Excluir esta despesa?')) {
        App.Store.deleteExpense(deleteExpenseBtn.dataset.deleteExpense);
        App.UI.toast('Despesa excluída.', 'success');
        App.UI.renderDespesas();
        if (isActivePage('dashboard')) App.UI.renderDashboard();
      }
      return;
    }

    var newCatBtn = e.target.closest('#btn-new-category');
    if (newCatBtn) { openCategoryModal(); return; }

    var editCatBtn = e.target.closest('[data-edit-cat]');
    if (editCatBtn) { openCategoryModal(editCatBtn.dataset.editCat); return; }

    var deleteCatBtn = e.target.closest('[data-delete-cat]');
    if (deleteCatBtn) { handleDeleteCategory(deleteCatBtn.dataset.deleteCat); return; }
  }

  function isActivePage(page) {
    var el = document.querySelector('.page.active');
    return !!el && el.id === 'page-' + page;
  }

  function shiftDashMonth(delta) {
    var d = new Date(App.State.dash.year, App.State.dash.monthIndex + delta, 1);
    App.State.dash.year = d.getFullYear();
    App.State.dash.monthIndex = d.getMonth();
    App.UI.renderDashboard();
  }

  function toggleTheme() {
    var current = App.Store.getConfig().theme;
    setTheme(current === 'dark' ? 'light' : 'dark');
  }

  function setTheme(theme) {
    App.Store.setConfig({ theme: theme });
    applyTheme(theme);
    if (isActivePage('dashboard')) App.UI.renderDashboard();
    if (isActivePage('config')) App.UI.renderConfig();
  }

  function openExpenseModal(id) {
    var form = document.getElementById('expense-form');
    form.reset();
    var select = document.getElementById('expense-category');
    App.UI.populateCategoryOptions(select);

    if (id) {
      var expense = App.Store.getExpenses().find(function (e) { return e.id === id; });
      if (!expense) return;
      document.getElementById('expense-modal-title').textContent = 'Editar despesa';
      document.getElementById('expense-id').value = expense.id;
      document.getElementById('expense-date').value = expense.date;
      document.getElementById('expense-description').value = expense.description;
      document.getElementById('expense-category').value = expense.categoryId;
      document.getElementById('expense-value').value = App.Format.toInputMoney(expense.value);
    } else {
      document.getElementById('expense-modal-title').textContent = 'Nova despesa';
      document.getElementById('expense-id').value = '';
      document.getElementById('expense-date').value = new Date().toISOString().slice(0, 10);
    }
    App.UI.openModal('modal-expense');
    document.getElementById('expense-description').focus();
  }

  function handleExpenseSubmit(e) {
    e.preventDefault();
    var id = document.getElementById('expense-id').value;
    var date = document.getElementById('expense-date').value;
    var description = document.getElementById('expense-description').value.trim();
    var categoryId = document.getElementById('expense-category').value;
    var value = App.Format.parseMoney(document.getElementById('expense-value').value);

    if (!date || !description || !categoryId || isNaN(value) || value <= 0) {
      App.UI.toast('Preencha todos os campos com valores válidos.', 'error');
      return;
    }

    if (id) {
      App.Store.updateExpense(id, { date: date, description: description, categoryId: categoryId, value: value });
      App.UI.toast('Despesa atualizada.', 'success');
    } else {
      App.Store.addExpense({ date: date, description: description, categoryId: categoryId, value: value });
      App.UI.toast('Despesa adicionada.', 'success');
    }

    App.UI.closeAllModals();
    App.UI.renderDespesas();
    if (isActivePage('dashboard')) App.UI.renderDashboard();
  }

  function openCategoryModal(id) {
    var form = document.getElementById('category-form');
    form.reset();
    if (id) {
      var cat = App.Store.getCategories().find(function (c) { return c.id === id; });
      if (!cat) return;
      document.getElementById('category-modal-title').textContent = 'Editar categoria';
      document.getElementById('category-id').value = cat.id;
      document.getElementById('category-name').value = cat.name;
      document.getElementById('category-color').value = cat.color;
    } else {
      document.getElementById('category-modal-title').textContent = 'Nova categoria';
      document.getElementById('category-id').value = '';
      document.getElementById('category-color').value = '#d4a843';
    }
    App.UI.openModal('modal-category');
    document.getElementById('category-name').focus();
  }

  function handleCategorySubmit(e) {
    e.preventDefault();
    var id = document.getElementById('category-id').value;
    var name = document.getElementById('category-name').value.trim();
    var color = document.getElementById('category-color').value;

    if (!name) {
      App.UI.toast('Informe um nome para a categoria.', 'error');
      return;
    }

    if (id) {
      App.Store.updateCategory(id, { name: name, color: color });
      App.UI.toast('Categoria atualizada.', 'success');
    } else {
      App.Store.addCategory(name, color);
      App.UI.toast('Categoria criada.', 'success');
    }

    App.UI.closeAllModals();
    App.UI.renderCategorias();
  }

  function handleDeleteCategory(id) {
    if (id === 'lazer') {
      App.UI.toast('Esta categoria é usada no controle de lazer e não pode ser excluída.', 'error');
      return;
    }
    if (!confirm('Excluir esta categoria?')) return;

    var result = App.Store.deleteCategory(id);
    if (!result.ok) {
      App.UI.toast('Existem despesas usando esta categoria. Edite ou exclua essas despesas antes.', 'error');
      return;
    }
    App.UI.toast('Categoria excluída.', 'success');
    App.UI.renderCategorias();
  }

  function handleSalarySubmit(e) {
    e.preventDefault();
    var salary = App.Format.parseMoney(document.getElementById('cfg-salary').value);
    var p1Percent = Number(document.getElementById('cfg-p1-percent').value);
    var p1Day = Number(document.getElementById('cfg-p1-day').value);
    var p2Percent = Number(document.getElementById('cfg-p2-percent').value);
    var p2Day = Number(document.getElementById('cfg-p2-day').value);

    if (isNaN(salary) || salary < 0 || !p1Day || !p2Day) {
      App.UI.toast('Verifique os valores informados.', 'error');
      return;
    }

    App.Store.setConfig({
      salary: salary, payment1Percent: p1Percent, payment1BusinessDay: p1Day,
      payment2Percent: p2Percent, payment2Day: p2Day
    });

    if (Math.round((p1Percent + p2Percent) * 10) / 10 !== 100) {
      App.UI.toast('Salvo. Os percentuais informados não somam 100%.', 'warning');
    } else {
      App.UI.toast('Configurações de salário salvas.', 'success');
    }

    App.UI.renderConfig();
    if (isActivePage('dashboard')) App.UI.renderDashboard();
  }

  function handleLeisureSubmit(e) {
    e.preventDefault();
    var leisurePercent = Number(document.getElementById('cfg-leisure').value);
    if (isNaN(leisurePercent) || leisurePercent < 0 || leisurePercent > 100) {
      App.UI.toast('Informe um percentual entre 0 e 100.', 'error');
      return;
    }
    App.Store.setConfig({ leisurePercent: leisurePercent });
    App.UI.toast('Orçamento de lazer atualizado.', 'success');
    if (isActivePage('dashboard')) App.UI.renderDashboard();
  }

  function exportExpenses(format) {
    var list = App.UI.getFilteredExpenses();
    if (!list.length) {
      App.UI.toast('Não há despesas para exportar com este filtro.', 'warning');
      return;
    }
    var categories = App.Store.getCategories();
    var suffix = App.State.filters.month === 'all' ? 'todos' : App.State.filters.month;
    if (format === 'csv') {
      App.Export.toCSV(list, categories, 'despesas-' + suffix + '.csv');
    } else {
      App.Export.toXLSX(list, categories, 'despesas-' + suffix + '.xlsx');
    }
    App.UI.toast('Exportação concluída.', 'success');
  }

  function handleBackupImport(e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      try {
        App.Export.restoreJSON(reader.result);
        App.UI.toast('Backup restaurado com sucesso.', 'success');
        applyTheme(App.Store.getConfig().theme);
        App.UI.navigateTo('dashboard');
      } catch (err) {
        App.UI.toast('Não foi possível ler este arquivo de backup.', 'error');
      }
      e.target.value = '';
    };
    reader.readAsText(file);
  }

  function handleClearData() {
    if (!confirm('Isso vai apagar todas as despesas, categorias e configurações salvas neste navegador. Deseja continuar?')) return;
    App.Store.setExpenses([]);
    App.Store.setCategories(App.Store.getDefaultCategories());
    App.Store.setConfig(App.Store.getDefaultConfig());
    App.UI.toast('Dados apagados.', 'success');
    applyTheme('dark');
    App.UI.navigateTo('dashboard');
  }

  document.addEventListener('DOMContentLoaded', init);
})();
