// ============================================================
//  CUSTOMER MODEL  (global scope — depends on db/db.js)
// ============================================================
function nextCustomerId() {
    var nums = customers_db.map(function(c) { return parseInt(c.id.slice(1)); });
    return 'C' + String((Math.max.apply(null, [0].concat(nums)) + 1)).padStart(3, '0');
}
function getCustomerData()         { return customers_db; }
function getCustomerById(id)       { return customers_db.find(function(c) { return c.id === id; }); }

function addCustomerData(name, contact, address, email) {
    var id = nextCustomerId();
    customers_db.push({ id: id, name: name, contact: contact, address: address, email: email, points: 0 });
    return id;
}
function updateCustomerData(id, name, contact, address, email) {
    var c = getCustomerById(id);
    if (c) { c.name = name; c.contact = contact; c.address = address; c.email = email; }
}
function deleteCustomerData(id) {
    var idx = customers_db.findIndex(function(c) { return c.id === id; });
    if (idx !== -1) customers_db.splice(idx, 1);
}
function addLoyaltyPoints(id, amount) {
    var c = getCustomerById(id);
    if (c) c.points += Math.floor(amount / 100);
}
