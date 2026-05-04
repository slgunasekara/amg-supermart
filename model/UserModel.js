//  USER MODEL
// ============================================================
function nextUserId() {
    var nums = users_db.map(function(u) { return parseInt(u.id.slice(1)); });
    return 'U' + String((Math.max.apply(null, [0].concat(nums)) + 1)).padStart(3, '0');
}
function getUserData()               { return users_db; }
function getUserById(id)             { return users_db.find(function(u) { return u.id === id; }); }
function getUserByUsername(username) { return users_db.find(function(u) { return u.username === username; }); }
function getUserByCredentials(u, p)  { return users_db.find(function(x) { return x.username === u && x.password === p && x.active; }); }

function addUserData(username, password, name, role, email, securityQuestion, securityAnswer) {
    var id = nextUserId();
    users_db.push({ id: id, username: username, password: password, name: name, role: role, email: email, active: true, securityQuestion: securityQuestion || '', securityAnswer: (securityAnswer || '').toLowerCase().trim() });
    return id;
}
function updateUserData(id, name, username, email, role, password, securityQuestion, securityAnswer) {
    var u = getUserById(id);
    if (u) { u.name = name; u.username = username; u.email = email; u.role = role; if (password) u.password = password; if (securityQuestion !== undefined) u.securityQuestion = securityQuestion; if (securityAnswer !== undefined) u.securityAnswer = securityAnswer.toLowerCase().trim(); }
}
function toggleUserStatus(id) {
    var u = getUserById(id);
    if (u) u.active = !u.active;
}

function deleteUserData(id) {
    var idx = users_db.findIndex(function(u){ return u.id === id; });
    if (idx !== -1) users_db.splice(idx, 1);
}
