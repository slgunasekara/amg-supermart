//  REPORTS CONTROLLER
// ============================================================
let _reportBarChart = null;
let _reportPieChart = null;

function renderReports() {
    const rev    = getTotalRevenue();
    const orders = getOrderData();
    const avg    = orders.length ? rev / orders.length : 0;

    const spent = {};
    orders.forEach(o => { spent[o.customerName] = (spent[o.customerName] || 0) + o.total; });
    const topCust = Object.entries(spent).sort((a, b) => b[1] - a[1])[0];

    const sold = {};
    orders.forEach(o => { o.items.forEach(i => { sold[i.name] = (sold[i.name] || 0) + i.qty; }); });
    const topItem = Object.entries(sold).sort((a, b) => b[1] - a[1])[0];

    $('#repRevenue').text(formatCurrency(rev));
    $('#repOrders').text(orders.length);
    $('#repAvgOrder').text(formatCurrency(avg));
    $('#repTopCust').text(topCust ? topCust[0] : '-');
    $('#repTopItem').text(topItem ? topItem[0] : '-');
    $('#repLowStock').text(getLowStockItems().length);

    renderReportCharts();
    renderLowStockTable();
}

function renderReportCharts() {
    const c   = getChartColors();
    const ms  = getMonthlySales();
    const ctx1 = document.getElementById('reportBarChart');
    if (ctx1) {
        if (_reportBarChart) { _reportBarChart.destroy(); _reportBarChart = null; }
        _reportBarChart = new Chart(ctx1, {
            type: 'bar',
            data: {
                labels: ms.labels,
                datasets: [{ label: 'Monthly Revenue', data: ms.data, backgroundColor: c.bg, borderColor: c.accent, borderWidth: 2, borderRadius: 8 }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { grid: { color: c.grid }, ticks: { color: c.text } },
                    y: { grid: { color: c.grid }, ticks: { color: c.text, callback: v => 'Rs.' + v } }
                }
            }
        });
    }
    const cats = getCategorySales();
    const ctx2 = document.getElementById('reportPieChart');
    if (ctx2) {
        if (_reportPieChart) { _reportPieChart.destroy(); _reportPieChart = null; }
        _reportPieChart = new Chart(ctx2, {
            type: 'pie',
            data: { labels: Object.keys(cats), datasets: [{ data: Object.values(cats), backgroundColor: c.palette, borderWidth: 0 }] },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: c.text } } } }
        });
    }
}

function renderLowStockTable() {
    const low  = getLowStockItems();
    const html = low.map(function (i) {
        const pct   = Math.min(100, (i.qty / 50) * 100);
        const color = i.qty < 10 ? '#dc3545' : '#d4a017';
        return '<tr>' +
            '<td>' + escapeHtml(i.code) + '</td>' +
            '<td>' + escapeHtml(i.name) + '</td>' +
            '<td>' + escapeHtml(i.category) + '</td>' +
            '<td><div class="d-flex align-items-center gap-2"><span style="font-weight:700;color:' + color + '">' + i.qty + '</span>' +
            '<div class="stock-bar" style="flex:1"><div class="stock-bar-fill" style="width:' + pct + '%;background:' + color + '"></div></div></div></td>' +
            '<td><span class="badge-modern ' + (i.qty < 10 ? 'badge-danger' : 'badge-warning') + '">' + (i.qty < 10 ? '🔴 Critical' : '🟡 Low') + '</span></td>' +
            '</tr>';
    }).join('');
    $('#lowStockBody').html(html || '<tr><td colspan="5" class="text-center py-3" style="color:var(--text-secondary)">All items well stocked ✓</td></tr>');
}
