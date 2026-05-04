//  ORDER CONTROLLER
// ============================================================
let _orderSearch = '';
let _orderCat    = '';
let _walkInMode  = false;

function renderOrderPage() {
    _walkInMode = false;
    $('#walkInBadge').hide();
    $('#orderCustomer').prop('disabled', false).css('opacity', '1');

    const opts = ['<option value="">— Select Customer (Optional) —</option>']
        .concat(getCustomerData().map(c =>
            '<option value="' + c.id + '">' + escapeHtml(c.name) + ' (' + escapeHtml(c.id) + ')</option>'
        )).join('');
    $('#orderCustomer').html(opts);

    renderOrderItemGrid('', '');
    renderCart();
}

function renderOrderItemGrid(search, cat) {
    if (search !== undefined) _orderSearch = search;
    if (cat    !== undefined) _orderCat    = cat;

    let list = getItemData();
    if (_orderSearch) {
        const q = _orderSearch.toLowerCase();
        list = list.filter(i => i.name.toLowerCase().includes(q));
    }
    if (_orderCat) list = list.filter(i => i.category === _orderCat);

    // Category pills
    const cats     = getCategories();
    const catIcons = { Fruits: '🍎', Vegetables: '🥦', 'Dry Food': '🌾', Beverages: '🥤', Snacks: '🍿' };
    const pills    = ['<button class="btn-cat-pill' + (!_orderCat ? ' active-pill' : '') + '" onclick="renderOrderItemGrid(\'\',\'\')"><span>🛒 All</span></button>']
        .concat(cats.map(c => {
            const icon = catIcons[c] ? catIcons[c] + ' ' : '';
            return '<button class="btn-cat-pill' + (_orderCat === c ? ' active-pill' : '') + '" onclick="renderOrderItemGrid(\'\',\'' + escapeHtml(c) + '\')"><span>' + icon + escapeHtml(c) + '</span></button>';
        })).join('');
    $('#orderCatPills').html(pills);

    const cart = getCartData();
    const html = list.map(function (item) {
        const inCart = cart.find(ci => ci.itemId === item.id);
        return '<div class="item-card' + (item.qty === 0 ? ' out-of-stock' : '') + '" onclick="addToCartHandler(\'' + item.id + '\')">' +
            (item.image ? '<img src="' + escapeHtml(item.image) + '" class="item-card-img" onerror="this.style.display=\'none\'">' : '') +
            '<div class="item-card-body">' +
            '<div class="item-card-name">' + escapeHtml(item.name) + '</div>' +
            '<div class="item-card-price">' + formatCurrency(item.price) + '</div>' +
            '<div class="item-card-stock">' + item.qty + ' ' + escapeHtml(item.unit) + ' left</div></div>' +
            '<div class="item-select-overlay">' + (inCart ? '✔' : '+') + '</div>' +
            '</div>';
    }).join('');

    $('#orderItemGrid').html(html || '<div style="color:var(--text-secondary);padding:20px;text-align:center">No items</div>');
}

function addToCartHandler(itemId) {
    const item = getItemById(itemId);
    if (!item || item.qty === 0)             { showToast('Item out of stock', 'warning'); return; }
    const ci = getCartItem(itemId);
    if (ci && ci.qty >= item.qty)            { showToast('Max stock reached', 'warning'); return; }
    addToCart(item);
    renderCart();
    renderOrderItemGrid();
    updateCartBadge();
}

function renderCart() {
    const cart = getCartData();
    if (cart.length === 0) {
        $('#cartItems').html('<div class="text-center py-4" style="color:var(--text-secondary);font-size:13px"><div style="font-size:36px;margin-bottom:10px">🛒</div>Select items to add to cart</div>');
    } else {
        const html = cart.map(function (ci) {
            return '<div class="cart-item">' +
                (ci.image
                    ? '<img src="' + escapeHtml(ci.image) + '" class="cart-item-img" onerror="this.style.display=\'none\'">'
                    : '<div style="width:40px;height:40px;border-radius:8px;background:var(--accent-light);display:flex;align-items:center;justify-content:center">🛒</div>') +
                '<div class="cart-item-name">' + escapeHtml(ci.name) + '</div>' +
                '<div class="cart-qty-ctrl">' +
                '<button class="qty-btn" onclick="changeQtyHandler(\'' + ci.itemId + '\',-1)">−</button>' +
                '<span class="qty-value">' + ci.qty + '</span>' +
                '<button class="qty-btn" onclick="changeQtyHandler(\'' + ci.itemId + '\',1)">+</button>' +
                '</div>' +
                '<div class="cart-item-total">' + formatCurrency(ci.price * ci.qty) + '</div>' +
                '<button class="btn-danger-sm" onclick="removeCartHandler(\'' + ci.itemId + '\')"><i class="bi bi-x"></i></button>' +
                '</div>';
        }).join('');
        $('#cartItems').html(html);
    }
    updateCartTotals();
    updateCartBadge();
}

function updateCartTotals() {
    const subtotal = getCartSubtotal();
    const disc     = parseFloat($('#orderDiscount').val()) || 0;
    const tax      = subtotal * 0.1;
    const total    = subtotal + tax - disc;
    $('#cartSubtotal').text(formatCurrency(subtotal));
    $('#cartTax').text(formatCurrency(tax));
    $('#cartDiscount').text(formatCurrency(disc));
    $('#cartTotal').text(formatCurrency(total));
}

function updateCartBadge() {
    $('#cartCount').text(getCartData().length);
}

function changeQtyHandler(itemId, delta) { changeCartQty(itemId, delta); renderCart(); renderOrderItemGrid(); }
function removeCartHandler(itemId)       { removeCartItem(itemId);        renderCart(); renderOrderItemGrid(); }

function placeOrder() {
    if (getCartData().length === 0) { showToast('Cart is empty', 'error'); return; }

    const custId   = _walkInMode ? null : $('#orderCustomer').val();
    const cust     = custId ? getCustomerById(custId) : null;
    const custName = cust ? cust.name : 'Walk-in Customer';

    const subtotal = getCartSubtotal();
    const disc     = parseFloat($('#orderDiscount').val()) || 0;
    const tax      = subtotal * 0.1;
    const total    = subtotal + tax - disc;

    getCartData().forEach(ci => deductItemStock(ci.itemId, ci.qty));
    if (custId) addLoyaltyPoints(custId, total);

    const order = addOrderData(custId || 'WALK-IN', custName, getCartData().slice(), subtotal, tax, disc, total);
    clearCart();
    showOrderConfirmation(order, cust || { name: custName });
    showToast('Order ' + order.id + ' placed successfully!', 'success');
    renderOrderPage();
}

function showOrderConfirmation(order, cust) {
    const rows = order.items.map(function (i) {
        return '<tr><td>' + escapeHtml(i.name) + '</td><td>' + i.qty + '</td><td>' + formatCurrency(i.price) + '</td><td>' + formatCurrency(i.price * i.qty) + '</td></tr>';
    }).join('');
    $('#confirmOrderId').text(order.id);
    $('#confirmCustomer').text(cust.name);
    $('#confirmDate').text(order.date + ' ' + order.time);
    $('#confirmSubtotal').text(formatCurrency(order.subtotal));
    $('#confirmTax').text(formatCurrency(order.tax));
    $('#confirmDiscount').text(formatCurrency(order.discount));
    $('#confirmTotal').text(formatCurrency(order.total));
    $('#confirmItems').html(rows);
    $('#confirmModal').addClass('show');
}

function clearWalkIn() {
    _walkInMode = false;
    $('#orderCustomer').prop('disabled', false).css('opacity', '1');
    $('#walkInBadge').hide();
}

$(document).ready(function () {
    $('#placeOrderBtn').on('click', placeOrder);
    $('#orderSearch').on('input', debounce(function () { renderOrderItemGrid($(this).val(), _orderCat); }, 250));
    $('#orderDiscount').on('input', updateCartTotals);
    $('#clearCartBtn').on('click', function () { clearCart(); renderCart(); renderOrderItemGrid(); });

    $('#walkInToggle').on('click', function () {
        _walkInMode = true;
        $('#orderCustomer').val('').prop('disabled', true).css('opacity', '0.4');
        $('#walkInBadge').show();
    });
});
