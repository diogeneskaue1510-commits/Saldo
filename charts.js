window.App = window.App || {};

App.Charts = (function () {
  var pieChart = null;
  var barChart = null;

  if (typeof Chart !== 'undefined') {
    Chart.defaults.font.family = "'Inter', sans-serif";
  }

  function cssVar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  function renderPie(canvas, items) {
    if (typeof Chart === 'undefined') return false;
    var ctx = canvas.getContext('2d');
    if (pieChart) { pieChart.destroy(); pieChart = null; }
    if (!items.length) return false;

    pieChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: items.map(function (i) { return i.name; }),
        datasets: [{
          data: items.map(function (i) { return i.value; }),
          backgroundColor: items.map(function (i) { return i.color; }),
          borderColor: cssVar('--surface'),
          borderWidth: 3,
          hoverOffset: 6
        }]
      },
      options: {
        cutout: '68%',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: cssVar('--text-dim'), boxWidth: 10, padding: 14, font: { size: 12 } }
          },
          tooltip: {
            callbacks: {
              label: function (ctx) { return ' ' + ctx.label + ': ' + App.Format.currency(ctx.parsed); }
            }
          }
        }
      }
    });
    return true;
  }

  function renderBar(canvas, items) {
    if (typeof Chart === 'undefined') return false;
    var ctx = canvas.getContext('2d');
    if (barChart) { barChart.destroy(); barChart = null; }

    var gridColor = cssVar('--border');
    var textColor = cssVar('--text-dim');
    var accent = cssVar('--accent');

    barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: items.map(function (i) { return i.label; }),
        datasets: [{
          data: items.map(function (i) { return i.value; }),
          backgroundColor: accent,
          borderRadius: 6,
          maxBarThickness: 36
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: function (ctx) { return ' ' + App.Format.currency(ctx.parsed.y); } } }
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: textColor, font: { size: 12 } } },
          y: {
            grid: { color: gridColor },
            ticks: { color: textColor, callback: function (v) { return 'R$ ' + v.toLocaleString('pt-BR'); } }
          }
        }
      }
    });
    return true;
  }

  function destroyAll() {
    if (pieChart) { pieChart.destroy(); pieChart = null; }
    if (barChart) { barChart.destroy(); barChart = null; }
  }

  return { renderPie: renderPie, renderBar: renderBar, destroyAll: destroyAll };
})();
