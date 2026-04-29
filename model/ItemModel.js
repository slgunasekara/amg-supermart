// ============================================================
//  ITEM MODEL  (global scope — depends on db/db.js)
// ============================================================
function nextItemId() {
    var nums = items_db.map(function(i) { return parseInt(i.id.slice(1)); });
    return 'I' + String((Math.max.apply(null, [0].concat(nums)) + 1)).padStart(3, '0');
}
function getItemData()         { return items_db; }
function getItemById(id)       { return items_db.find(function(i) { return i.id === id; }); }
function getItemByCode(code)   { return items_db.find(function(i) { return i.code === code; }); }
function getLowStockItems()    { return items_db.filter(function(i) { return i.qty < 30; }); }
function getCategories()       { return [...new Set(items_db.map(function(i) { return i.category; }))]; }

function addItemData(code, name, category, price, qty, unit, image) {
    var id = nextItemId();
    items_db.push({ id: id, code: code, name: name, category: category, price: price, qty: qty, unit: unit, image: image });
    return id;
}
function updateItemData(id, code, name, category, price, qty, unit, image) {
    var item = getItemById(id);
    if (item) { item.code = code; item.name = name; item.category = category; item.price = price; item.qty = qty; item.unit = unit; item.image = image; }
}
function deleteItemData(id) {
    var idx = items_db.findIndex(function(i) { return i.id === id; });
    if (idx !== -1) items_db.splice(idx, 1);
}
function deductItemStock(id, qty) {
    var item = getItemById(id);
    if (item) item.qty -= qty;
}
