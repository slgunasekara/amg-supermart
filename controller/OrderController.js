// ============================================================
//  ORDER CONTROLLER  (global scope)
// ============================================================
var _orderSearch = '';
var _orderCat    = '';
var _walkInMode  = false;

function renderOrderPage() {
    _walkInMode = false;
    $('#walkInBadge').hide();
    $('#orderCustomer').prop('disabled', false).css('opacity','1');
    var opts = '<option value="">— Select Customer (Optional) —</option>';
    getCustomerData().forEach(function(c) {
        opts += '<option value="' + c.id + '">' + c.name + ' (' + c.id + ')</option>';
    });
    $('#orderCustomer').html(opts);
    renderOrderItemGrid('', '');
    renderCart();
}

function renderOrderItemGrid(search, cat) {
    if (search !== undefined) _orderSearch = search;
    if (cat !== undefined)    _orderCat    = cat;

    var list = getItemData();
    if (_orderSearch) list = list.filter(function(i){ return i.name.toLowerCase().includes(_orderSearch.toLowerCase()); });
    if (_orderCat)    list = list.filter(function(i){ return i.category === _orderCat; });

    /* Category pills */
    var cats  = getCategories();
    var catIcons = { 'Fruits':'🍎', 'Vegetables':'🥦', 'Dry Food':'🌾', 'Beverages':'🥤', 'Snacks':'🍿' };
    var pills = '<button class="btn-cat-pill' + (!_orderCat ? ' active-pill' : '') + '" onclick="renderOrderItemGrid(\'\',\'\')"><span>🛒 All</span></button>';
    cats.forEach(function(c) {
        var icon = catIcons[c] ? catIcons[c] + ' ' : '';
        pills += '<button class="btn-cat-pill' + (_orderCat === c ? ' active-pill' : '') + '" onclick="renderOrderItemGrid(\'\',\'' + c + '\')"><span>' + icon + c + '</span></button>';
    });
    $('#orderCatPills').html(pills);

    var cart = getCartData();
    var html = '';
    list.forEach(function(item) {
        var inCart = cart.find(function(ci){ return ci.itemId === item.id; });
        html += '<div class="item-card' + (item.qty === 0 ? ' out-of-stock' : '') + '" onclick="addToCartHandler(\'' + item.id + '\')">' +
            (item.image ? '<img src="' + item.image + '" class="item-card-img" onerror="this.style.display=\'none\'">' : '') +
            '<div class="item-card-body">' +
            '<div class="item-card-name">' + item.name + '</div>' +
            '<div class="item-card-price">' + formatCurrency(item.price) + '</div>' +
            '<div class="item-card-stock">' + item.qty + ' ' + item.unit + ' left</div></div>' +
            '<div class="item-select-overlay">' + (inCart ? '✔' : '+') + '</div>' +
            '</div>';
    });
    $('#orderItemGrid').html(html || '<div style="color:var(--text-secondary);padding:20px;text-align:center">No items</div>');
}

function addToCartHandler(itemId) {
    var item = getItemById(itemId);
    if (!item || item.qty === 0) { showToast('Item out of stock', 'warning'); return; }
    var ci = getCartItem(itemId);
    if (ci && ci.qty >= item.qty) { showToast('Max stock reached', 'warning'); return; }
    addToCart(item);
    renderCart();
    renderOrderItemGrid();
    updateCartBadge();
}

function renderCart() {
    var cart = getCartData();
    if (cart.length === 0) {
        $('#cartItems').html('<div class="text-center py-4" style="color:var(--text-secondary);font-size:13px"><div style="font-size:36px;margin-bottom:10px">🛒</div>Select items to add to cart</div>');
    } else {
        var html = '';
        cart.forEach(function(ci) {
            html += '<div class="cart-item">' +
                (ci.image ? '<img src="' + ci.image + '" class="cart-item-img" onerror="this.style.display=\'none\'">' : '<div style="width:40px;height:40px;border-radius:8px;background:var(--accent-light);display:flex;align-items:center;justify-content:center">🛒</div>') +
                '<div class="cart-item-name">' + ci.name + '</div>' +
                '<div class="cart-qty-ctrl">' +
                '<button class="qty-btn" onclick="changeQtyHandler(\'' + ci.itemId + '\',-1)">−</button>' +
                '<span class="qty-value">' + ci.qty + '</span>' +
                '<button class="qty-btn" onclick="changeQtyHandler(\'' + ci.itemId + '\',1)">+</button>' +
                '</div>' +
                '<div class="cart-item-total">' + formatCurrency(ci.price * ci.qty) + '</div>' +
                '<button class="btn-danger-sm" onclick="removeCartHandler(\'' + ci.itemId + '\')"><i class="bi bi-x"></i></button>' +
                '</div>';
        });
        $('#cartItems').html(html);
    }
    updateCartTotals();
    updateCartBadge();
}

function updateCartTotals() {
    var subtotal = getCartSubtotal();
    var disc     = parseFloat($('#orderDiscount').val()) || 0;
    var tax      = subtotal * 0.1;
    var total    = subtotal + tax - disc;
    $('#cartSubtotal').text(formatCurrency(subtotal));
    $('#cartTax').text(formatCurrency(tax));
    $('#cartDiscount').text(formatCurrency(disc));
    $('#cartTotal').text(formatCurrency(total));
}

function updateCartBadge() {
    $('#cartCount').text(getCartData().length);
}

function changeQtyHandler(itemId, delta) {
    changeCartQty(itemId, delta);
    renderCart();
    renderOrderItemGrid();
}
function removeCartHandler(itemId) {
    removeCartItem(itemId);
    renderCart();
    renderOrderItemGrid();
}

function placeOrder() {
    var custId = _walkInMode ? null : $('#orderCustomer').val();
    if (getCartData().length===0) { showToast('Cart is empty', 'error'); return; }

    var custName = 'Walk-in Customer';
    var cust     = null;
    if (custId) {
        cust     = getCustomerById(custId);
        custName = cust ? cust.name : 'Walk-in Customer';
    }

    var subtotal = getCartSubtotal();
    var disc     = parseFloat($('#orderDiscount').val()) || 0;
    var tax      = subtotal * 0.1;
    var total    = subtotal + tax - disc;

    getCartData().forEach(function(ci){ deductItemStock(ci.itemId, ci.qty); });
    if (custId) addLoyaltyPoints(custId, total);

    var order = addOrderData(custId || 'WALK-IN', custName, getCartData().slice(), subtotal, tax, disc, total);
    clearCart();
    showOrderConfirmation(order, cust || {name: custName});
    showToast('Order ' + order.id + ' placed successfully!', 'success');
    renderOrderPage();
}

function showOrderConfirmation(order, cust) {
    var rows = order.items.map(function(i){
        return '<tr><td>' + i.name + '</td><td>' + i.qty + '</td><td>' + formatCurrency(i.price) + '</td><td>' + formatCurrency(i.price * i.qty) + '</td></tr>';
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

$(document).ready(function() {
    $('#placeOrderBtn').on('click', placeOrder);
    $('#orderSearch').on('input', function(){ renderOrderItemGrid($(this).val(), _orderCat); });
    $('#orderDiscount').on('input', updateCartTotals);
    $('#clearCartBtn').on('click', function(){ clearCart(); renderCart(); renderOrderItemGrid(); });

    $('#walkInToggle').on('click', function() {
        _walkInMode = true;
        $('#orderCustomer').val('').prop('disabled', true).css('opacity','0.4');
        $('#walkInBadge').show();
    });
});

function clearWalkIn() {
    _walkInMode = false;
    $('#orderCustomer').prop('disabled', false).css('opacity','1');
    $('#walkInBadge').hide();
}
