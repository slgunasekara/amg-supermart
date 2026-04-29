// ============================================================
//  ORDER MODEL  (global scope — depends on db/db.js)
// ============================================================
function nextOrderId() {
    var nums = orders_db.map(function(o) { return parseInt(o.id.split('-')[1]); });
    return 'ORD-' + String((Math.max.apply(null, [0].concat(nums)) + 1)).padStart(3, '0');
}
function getOrderData()    { return orders_db; }
function getOrderById(id)  { return orders_db.find(function(o) { return o.id === id; }); }
function getTotalRevenue() { return orders_db.reduce(function(s, o) { return s + o.total; }, 0); }

function getMonthlySales() {
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var data = new Array(12).fill(0);
    orders_db.forEach(function(o) {
        var m = new Date(o.date).getMonth();
        data[m] += o.total;
    });
    return { labels: months, data: data };
}
function getCategorySales() {
    var cats = {};
    orders_db.forEach(function(o) {
        o.items.forEach(function(oi) {
            var item = items_db.find(function(i) { return i.id === oi.itemId; });
            if (item) cats[item.category] = (cats[item.category] || 0) + oi.qty * oi.price;
        });
    });
    return cats;
}
function getTopSoldItems(limit) {
    limit = limit || 5;
    var sold = {};
    orders_db.forEach(function(o) {
        o.items.forEach(function(oi) {
            sold[oi.itemId] = (sold[oi.itemId] || 0) + oi.qty;
        });
    });
    return Object.entries(sold).sort(function(a,b){ return b[1]-a[1]; }).slice(0, limit)
        .map(function(e) { return { item: items_db.find(function(i){ return i.id === e[0]; }), qty: e[1] }; })
        .filter(function(e) { return e.item; });
}
function addOrderData(customerId, customerName, cartItems, subtotal, tax, discount, total) {
    var now = new Date();
    var order = {
        id: nextOrderId(), customerId: customerId, customerName: customerName,
        date: now.toISOString().split('T')[0],
        time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        status: 'Completed',
        items: cartItems.map(function(ci){ return { itemId: ci.itemId, name: ci.name, qty: ci.qty, price: ci.price }; }),
        subtotal: subtotal, tax: tax, discount: discount, total: total
    };
    orders_db.push(order);
    return order;
}

/* ── CART ── */
function getCartData()    { return cart_db; }
function clearCart()      { cart_db.length = 0; }
function getCartItem(itemId) { return cart_db.find(function(c){ return c.itemId === itemId; }); }
function addToCart(item) {
    var existing = getCartItem(item.id);
    if (existing) { existing.qty++; }
    else { cart_db.push({ itemId: item.id, name: item.name, price: item.price, qty: 1, image: item.image, unit: item.unit }); }
}
function changeCartQty(itemId, delta) {
    var ci = getCartItem(itemId);
    if (!ci) return;
    ci.qty += delta;
    if (ci.qty <= 0) {
        var idx = cart_db.findIndex(function(c){ return c.itemId === itemId; });
        if (idx !== -1) cart_db.splice(idx, 1);
    }
}
function removeCartItem(itemId) {
    var idx = cart_db.findIndex(function(c){ return c.itemId === itemId; });
    if (idx !== -1) cart_db.splice(idx, 1);
}
function getCartSubtotal() {
    return cart_db.reduce(function(s, ci){ return s + ci.price * ci.qty; }, 0);
}
