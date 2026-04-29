// ============================================================
//  USER MODEL  (global scope — depends on db/db.js)
// ============================================================
function nextUserId() {
    var nums = users_db.map(function(u) { return parseInt(u.id.slice(1)); });
    return 'U' + String((Math.max.apply(null, [0].concat(nums)) + 1)).padStart(3, '0');
}
function getUserData()               { return users_db; }
function getUserById(id)             { return users_db.find(function(u) { return u.id === id; }); }
function getUserByCredentials(u, p)  { return users_db.find(function(x) { return x.username === u && x.password === p && x.active; }); }

function addUserData(username, password, name, role, email) {
    var id = nextUserId();
    users_db.push({ id: id, username: username, password: password, name: name, role: role, email: email, active: true });
    return id;
}
function updateUserData(id, name, username, email, role, password) {
    var u = getUserById(id);
    if (u) { u.name = name; u.username = username; u.email = email; u.role = role; if (password) u.password = password; }
}
function toggleUserStatus(id) {
    var u = getUserById(id);
    if (u) u.active = !u.active;
}
