window.App = window.App || {};

App.Export = (function () {
  function rows(expenses, categories) {
    var map = {};
    categories.forEach(function (c) { map[c.id] = c.name; });
    return expenses.map(function (e) {
      return {
        Data: App.Format.date(e.date),
        Descricao: e.description,
        Categoria: map[e.categoryId] || e.categoryId,
        Valor: e.value
      };
    });
  }

  function downloadBlob(content, filename, mime) {
    var blob = new Blob([content], { type: mime });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  function toCSV(expenses, categories, filename) {
    var data = rows(expenses, categories);
    if (!data.length) return false;
    var header = Object.keys(data[0]);
    var lines = [header.join(';')];
    data.forEach(function (r) {
      lines.push(header.map(function (h) {
        return '"' + String(r[h]).replace(/"/g, '""') + '"';
      }).join(';'));
    });
    downloadBlob('\uFEFF' + lines.join('\r\n'), filename, 'text/csv;charset=utf-8;');
    return true;
  }

  function toXLSX(expenses, categories, filename) {
    var data = rows(expenses, categories);
    if (!data.length || typeof XLSX === 'undefined') return false;
    var ws = XLSX.utils.json_to_sheet(data);
    ws['!cols'] = [{ wch: 12 }, { wch: 32 }, { wch: 18 }, { wch: 12 }];
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Despesas');
    XLSX.writeFile(wb, filename);
    return true;
  }

  function backupJSON() {
    var data = {
      version: 1,
      exportedAt: new Date().toISOString(),
      config: App.Store.getConfig(),
      categories: App.Store.getCategories(),
      expenses: App.Store.getExpenses()
    };
    downloadBlob(JSON.stringify(data, null, 2), 'saldo-backup.json', 'application/json');
  }

  function restoreJSON(text) {
    var data = JSON.parse(text);
    if (!data || !data.expenses || !data.categories || !data.config) {
      throw new Error('Arquivo de backup inválido.');
    }
    App.Store.setConfig(data.config);
    App.Store.setCategories(data.categories);
    App.Store.setExpenses(data.expenses);
  }

  return { toCSV: toCSV, toXLSX: toXLSX, backupJSON: backupJSON, restoreJSON: restoreJSON, downloadBlob: downloadBlob };
})();
