window.App = window.App || {};

App.Store = (function () {
  var KEYS = {
    CONFIG: 'saldo_config_v1',
    EXPENSES: 'saldo_expenses_v1',
    CATEGORIES: 'saldo_categories_v1'
  };

  var DEFAULT_CATEGORIES = [
    { id: 'academia', name: 'Academia', color: '#5fa3c9' },
    { id: 'tv', name: 'Parcela da TV', color: '#8d7bd8' },
    { id: 'chuteira', name: 'Parcela da Chuteira', color: '#d97aa6' },
    { id: 'celular', name: 'Plano Celular', color: '#5fb0c9' },
    { id: 'cabelo', name: 'Corte de Cabelo', color: '#d9a23e' },
    { id: 'alimentacao', name: 'Alimentação', color: '#4fae87' },
    { id: 'transporte', name: 'Transporte', color: '#d98f4e' },
    { id: 'lazer', name: 'Lazer', color: '#d4a843' },
    { id: 'outros', name: 'Outros', color: '#8b96a8' }
  ];

  var DEFAULT_CONFIG = {
    salary: 0,
    leisurePercent: 20,
    payment1Percent: 60,
    payment1BusinessDay: 5,
    payment2Percent: 40,
    payment2Day: 20,
    theme: 'dark'
  };

  function read(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function write(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function round2(n) {
    return Math.round((n + Number.EPSILON) * 100) / 100;
  }

  function getConfig() {
    return Object.assign({}, DEFAULT_CONFIG, read(KEYS.CONFIG, {}));
  }

  function setConfig(partial) {
    var next = Object.assign({}, getConfig(), partial);
    write(KEYS.CONFIG, next);
    return next;
  }

  function getDefaultConfig() {
    return Object.assign({}, DEFAULT_CONFIG);
  }

  function getCategories() {
    return read(KEYS.CATEGORIES, DEFAULT_CATEGORIES);
  }

  function setCategories(list) {
    write(KEYS.CATEGORIES, list);
  }

  function getDefaultCategories() {
    return DEFAULT_CATEGORIES.map(function (c) { return Object.assign({}, c); });
  }

  function addCategory(name, color) {
    var list = getCategories();
    var id = 'cat_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
    list.push({ id: id, name: name, color: color });
    setCategories(list);
    return id;
  }

  function updateCategory(id, data) {
    var list = getCategories();
    var idx = list.findIndex(function (c) { return c.id === id; });
    if (idx === -1) return false;
    list[idx] = Object.assign({}, list[idx], data);
    setCategories(list);
    return true;
  }

  function deleteCategory(id) {
    var inUse = getExpenses().some(function (e) { return e.categoryId === id; });
    if (inUse) return { ok: false, reason: 'in_use' };
    setCategories(getCategories().filter(function (c) { return c.id !== id; }));
    return { ok: true };
  }

  function getExpenses() {
    return read(KEYS.EXPENSES, []);
  }

  function setExpenses(list) {
    write(KEYS.EXPENSES, list);
  }

  function addExpense(expense) {
    var list = getExpenses();
    var id = 'exp_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    list.push(Object.assign({ id: id }, expense, { value: round2(expense.value) }));
    setExpenses(list);
    return id;
  }

  function updateExpense(id, data) {
    var list = getExpenses();
    var idx = list.findIndex(function (e) { return e.id === id; });
    if (idx === -1) return false;
    if (data.value !== undefined) data = Object.assign({}, data, { value: round2(data.value) });
    list[idx] = Object.assign({}, list[idx], data);
    setExpenses(list);
    return true;
  }

  function deleteExpense(id) {
    setExpenses(getExpenses().filter(function (e) { return e.id !== id; }));
  }

  function getAvailableMonths() {
    var now = new Date();
    var keys = {};
    getExpenses().forEach(function (e) { keys[e.date.slice(0, 7)] = true; });
    keys[monthKey(now.getFullYear(), now.getMonth())] = true;
    return Object.keys(keys).sort().reverse();
  }

  function getNthBusinessDay(year, monthIndex, n) {
    var count = 0;
    var day = 0;
    var date = new Date(year, monthIndex, 1);
    while (count < n) {
      day++;
      date.setFullYear(year, monthIndex, day);
      var weekday = date.getDay();
      if (weekday !== 0 && weekday !== 6) count++;
    }
    return new Date(year, monthIndex, day);
  }

  function getPaymentInfo(year, monthIndex) {
    var config = getConfig();
    var date1 = getNthBusinessDay(year, monthIndex, config.payment1BusinessDay);
    var lastDay = new Date(year, monthIndex + 1, 0).getDate();
    var date2 = new Date(year, monthIndex, Math.min(config.payment2Day, lastDay));
    var amount1 = round2(config.salary * (config.payment1Percent / 100));
    var amount2 = round2(config.salary * (config.payment2Percent / 100));
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var received1 = today >= date1;
    var received2 = today >= date2;
    return {
      date1: date1, date2: date2, amount1: amount1, amount2: amount2,
      received1: received1, received2: received2,
      received: round2((received1 ? amount1 : 0) + (received2 ? amount2 : 0)),
      pending: round2((received1 ? 0 : amount1) + (received2 ? 0 : amount2))
    };
  }

  function monthKey(year, monthIndex) {
    return year + '-' + String(monthIndex + 1).padStart(2, '0');
  }

  function getMonthSummary(year, monthIndex) {
    var config = getConfig();
    var categories = getCategories();
    var key = monthKey(year, monthIndex);
    var monthExpenses = getExpenses()
      .filter(function (e) { return e.date.slice(0, 7) === key; })
      .sort(function (a, b) { return a.date < b.date ? 1 : -1; });

    var totalExpenses = round2(monthExpenses.reduce(function (s, e) { return s + e.value; }, 0));

    var byCategory = {};
    monthExpenses.forEach(function (e) {
      byCategory[e.categoryId] = round2((byCategory[e.categoryId] || 0) + e.value);
    });

    var payment = getPaymentInfo(year, monthIndex);
    var leisureAvailable = round2(config.salary * (config.leisurePercent / 100));
    var leisureSpent = byCategory.lazer || 0;

    return {
      config: config,
      categories: categories,
      monthExpenses: monthExpenses,
      totalExpenses: totalExpenses,
      byCategory: byCategory,
      payment: payment,
      leisure: {
        available: leisureAvailable,
        spent: leisureSpent,
        remaining: round2(leisureAvailable - leisureSpent),
        exceeded: leisureSpent > leisureAvailable
      },
      balance: round2(payment.received - totalExpenses),
      projectedBalance: round2(config.salary - totalExpenses)
    };
  }

  function getLastMonthsTotals(refYear, refMonthIndex, count) {
    var expenses = getExpenses();
    var result = [];
    for (var i = count - 1; i >= 0; i--) {
      var d = new Date(refYear, refMonthIndex - i, 1);
      var key = monthKey(d.getFullYear(), d.getMonth());
      var total = round2(expenses
        .filter(function (e) { return e.date.slice(0, 7) === key; })
        .reduce(function (s, e) { return s + e.value; }, 0));
      result.push({ year: d.getFullYear(), monthIndex: d.getMonth(), total: total });
    }
    return result;
  }

  return {
    getConfig: getConfig, setConfig: setConfig, getDefaultConfig: getDefaultConfig,
    getCategories: getCategories, setCategories: setCategories, getDefaultCategories: getDefaultCategories,
    addCategory: addCategory, updateCategory: updateCategory, deleteCategory: deleteCategory,
    getExpenses: getExpenses, setExpenses: setExpenses,
    addExpense: addExpense, updateExpense: updateExpense, deleteExpense: deleteExpense,
    getAvailableMonths: getAvailableMonths,
    getNthBusinessDay: getNthBusinessDay, getPaymentInfo: getPaymentInfo,
    getMonthSummary: getMonthSummary, getLastMonthsTotals: getLastMonthsTotals,
    monthKey: monthKey, round2: round2
  };
})();

App.Format = (function () {
  var MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  var MONTHS_SHORT = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  function currency(value) {
    return (Number(value) || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  function date(d) {
    if (typeof d === 'string') d = new Date(d + 'T00:00:00');
    return d.toLocaleDateString('pt-BR');
  }

  function monthLabel(year, monthIndex) {
    return MONTHS[monthIndex] + ' de ' + year;
  }

  function monthShort(year, monthIndex) {
    return MONTHS_SHORT[monthIndex] + '/' + String(year).slice(2);
  }

  function ordinal(n) {
    return n + 'º';
  }

  function parseMoney(input) {
    var s = String(input).trim();
    if (!s) return NaN;
    if (s.indexOf(',') !== -1) {
      s = s.replace(/\./g, '').replace(',', '.');
    }
    return parseFloat(s);
  }

  function toInputMoney(value) {
    return (Number(value) || 0).toFixed(2).replace('.', ',');
  }

  return {
    currency: currency, date: date, monthLabel: monthLabel, monthShort: monthShort,
    ordinal: ordinal, parseMoney: parseMoney, toInputMoney: toInputMoney,
    MONTHS: MONTHS, MONTHS_SHORT: MONTHS_SHORT
  };
})();
