// ============================================================
//  AUTH CONTROLLER  (global scope)
// ============================================================
function getCurrentUser() {
    var sess = sessionStorage.getItem('amg_user');
    return sess ? JSON.parse(sess) : null;
}

function showApp(user) {
    $('#loginPage').hide();
    $('#mainApp').show();
    $('.user-name').text(user.name);
    $('.user-role').text(user.role);
    $('.user-avatar').text(user.name.split(' ').map(function(w){ return w[0]; }).join('').toUpperCase().slice(0,2));
    if (user.role !== 'Administrator') { $('[data-page="users"]').hide(); }
    else { $('[data-page="users"]').show(); }
    navigateTo('dashboard');
}

function login() {
    var u = $('#loginUsername').val().trim();
    var p = $('#loginPassword').val().trim();
    if (!u || !p) { showToast('Please enter credentials', 'error'); return; }
    var user = getUserByCredentials(u, p);
    if (user) {
        sessionStorage.setItem('amg_user', JSON.stringify(user));
        $('#loginPage').fadeOut(300, function(){ showApp(user); });
    } else {
        showToast('Invalid credentials or account inactive', 'error');
        $('#loginPassword').val('').focus();
    }
}

function logout() {
    sessionStorage.removeItem('amg_user');
    clearCart();
    $('#mainApp').hide();
    $('#loginPage').fadeIn(300);
    showToast('Logged out successfully', 'info');
}

function initAuth() {
    var sess = sessionStorage.getItem('amg_user');
    if (sess) { showApp(JSON.parse(sess)); }
    else { $('#loginPage').show(); $('#mainApp').hide(); }
}

$(document).ready(function() {
    $('#loginBtn').on('click', login);
    $('#loginUsername, #loginPassword').on('keypress', function(e){ if (e.key === 'Enter') login(); });
    $('#logoutBtn').on('click', logout);
});
