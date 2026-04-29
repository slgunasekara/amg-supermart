// ============================================================
//  DASHBOARD CONTROLLER  (global scope)
// ============================================================
var _salesChart = null;
var _catChart   = null;

function getChartColors() {
    var dark = $('html').attr('data-theme') === 'dark';
    return {
        accent  : dark ? '#00e676'               : '#e63946',
        grid    : dark ? 'rgba(0,230,118,0.1)'   : 'rgba(230,57,70,0.08)',
        text    : dark ? '#a5d6a7'               : '#6c757d',
        bg      : dark ? 'rgba(0,230,118,0.08)'  : 'rgba(230,57,70,0.06)',
        palette : dark
            ? ['#00e676','#40c4ff','#ffab40','#ea80fc','#ff6e40','#ccff90']
            : ['#e63946','#457b9d','#2d6a4f','#e76f51','#8338ec','#06d6a0']
    };
}

function renderDashboard() {
    var rev    = getTotalRevenue();
    var orders = getOrderData();
    var custs  = getCustomerData();
    var items  = getItemData();
    var low    = getLowStockItems();

    $('#statRevenue').text(formatCurrency(rev));
    $('#statOrders').text(orders.length);
    $('#statCustomers').text(custs.length);
    $('#statItems').text(items.length);
    $('#statLowStock').text(low.length);

    renderSalesChart();
    renderCatChart();
    renderActivity();
    renderTopItems();
}

function renderSalesChart() {
    var c   = getChartColors();
    var ms  = getMonthlySales();
    var ctx = document.getElementById('salesChart');
    if (!ctx) return;
    if (_salesChart) _salesChart.destroy();
    _salesChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ms.labels,
            datasets: [{
                label: 'Revenue (Rs.)',
                data: ms.data,
                borderColor: c.accent,
                backgroundColor: c.bg,
                borderWidth: 2.5,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: c.accent,
                pointRadius: 4,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { color: c.grid }, ticks: { color: c.text } },
                y: { grid: { color: c.grid }, ticks: { color: c.text, callback: function(v){ return 'Rs.'+v; } } }
            }
        }
    });
}

function renderCatChart() {
    var c    = getChartColors();
    var cats = getCategorySales();
    var ctx  = document.getElementById('catChart');
    if (!ctx) return;
    if (_catChart) _catChart.destroy();
    _catChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(cats),
            datasets: [{ data: Object.values(cats), backgroundColor: c.palette, borderWidth: 0, hoverOffset: 8 }]
        },
        options: {
            responsive: true, maintainAspectRatio: false, cutout: '65%',
            plugins: { legend: { position: 'bottom', labels: { color: c.text, padding: 12 } } }
        }
    });
}

function renderActivity() {
    var recent = getOrderData().slice().reverse().slice(0, 5);
    var html = '';
    recent.forEach(function(o) {
        html += '<div class="activity-item"><div class="activity-dot"></div><div>' +
            '<div class="activity-text"><strong>' + o.customerName + '</strong> — ' + formatCurrency(o.total) + '</div>' +
            '<div class="activity-time">' + o.date + ' at ' + o.time + ' · ' + o.items.length + ' item(s)</div>' +
            '</div></div>';
    });
    $('#recentActivity').html(html || '<p class="text-secondary" style="font-size:13px;padding:10px 0">No recent activity</p>');
}

function renderTopItems() {
    var top = getTopSoldItems(5);
    var html = '';
    top.forEach(function(e) {
        var pct = Math.min(100, (e.qty / 20) * 100);
        html += '<div class="d-flex align-items-center gap-3 mb-3">' +
            '<div style="width:36px;height:36px;border-radius:8px;overflow:hidden;flex-shrink:0">' +
            (e.item.image ? '<img src="' + e.item.image + '" style="width:100%;height:100%;object-fit:cover">' : '<div style="height:36px;display:flex;align-items:center;justify-content:center">🛒</div>') +
            '</div><div style="flex:1"><div style="font-size:13px;font-weight:600">' + e.item.name + '</div>' +
            '<div class="stock-bar"><div class="stock-bar-fill" style="width:' + pct + '%"></div></div></div>' +
            '<div style="font-family:monospace;font-size:12px;color:var(--accent)">' + e.qty + ' sold</div></div>';
    });
    $('#topItems').html(html || '<p class="text-secondary" style="font-size:13px">No sales data yet</p>');
}
