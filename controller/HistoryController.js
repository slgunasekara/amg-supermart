//  ORDER HISTORY CONTROLLER
// ============================================================
function renderOrderHistory(search) {
    search = search || '';
    let list = getOrderData().slice().reverse();
    if (search) {
        const q = search.toLowerCase();
        list = list.filter(o =>
            o.id.toLowerCase().includes(q) ||
            o.customerName.toLowerCase().includes(q)
        );
    }

    const html = list.map(function (o) {
        const itemRows = o.items.map(function (i) {
            return '<tr><td>' + escapeHtml(i.name) + '</td><td>' + i.qty + '</td><td>' + formatCurrency(i.price) + '</td><td>' + formatCurrency(i.qty * i.price) + '</td></tr>';
        }).join('');

        return '<tr>' +
            '<td><span class="order-id">' + escapeHtml(o.id) + '</span></td>' +
            '<td>' + escapeHtml(o.customerName) + '</td>' +
            '<td>' + formatDate(o.date) + ' ' + escapeHtml(o.time) + '</td>' +
            '<td>' + o.items.length + ' item(s)</td>' +
            '<td><span class="order-id">' + formatCurrency(o.total) + '</span></td>' +
            '<td><span class="badge-modern badge-success">✓ ' + escapeHtml(o.status) + '</span></td>' +
            '<td><button class="order-expand-btn" onclick="toggleOrderDetail(this,\'' + o.id + '\')"><i class="bi bi-chevron-right"></i></button></td>' +
            '</tr>' +
            '<tr class="order-details-row" id="detail-' + o.id + '">' +
            '<td colspan="7" class="order-details-cell"><div class="order-details-inner">' +
            '<table class="table-modern" style="font-size:13px"><thead><tr><th>Item</th><th>Qty</th><th>Unit Price</th><th>Total</th></tr></thead>' +
            '<tbody>' + itemRows + '</tbody></table>' +
            '<div class="mt-2 text-end" style="font-size:13px">' +
            'Subtotal: ' + formatCurrency(o.subtotal) + ' &nbsp;|&nbsp; ' +
            'Tax: ' + formatCurrency(o.tax) + ' &nbsp;|&nbsp; ' +
            'Discount: ' + formatCurrency(o.discount) + ' &nbsp;|&nbsp; ' +
            '<strong style="color:var(--accent)">Total: ' + formatCurrency(o.total) + '</strong>' +
            '</div></div></td></tr>';
    }).join('');

    $('#orderHistoryBody').html(html || '<tr><td colspan="7" class="text-center py-4" style="color:var(--text-secondary)">No orders found</td></tr>');
}

function toggleOrderDetail(btn, id) {
    $('#detail-' + id).toggleClass('show');
    $(btn).toggleClass('open');
}

$(document).ready(function () {
    $('#historySearch').on('input', debounce(function () { renderOrderHistory($(this).val()); }, 250));
});
