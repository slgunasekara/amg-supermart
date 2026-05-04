//  AUTH CONTROLLER
// ============================================================
// NOTE: In-memory variable used instead of sessionStorage/localStorage.
// All session data is cleared on browser refresh — no persistent storage.
var _currentUser = null;

function getCurrentUser() {
    return _currentUser;
}

function showApp(user) {
    $('#loginPage').hide();
    $('#mainApp').show();
    $('.user-name').text(user.name);
    $('.user-role').text(user.role);
    $('.user-avatar').text(generateAvatar(user.name));
    $('[data-page="users"]').toggle(user.role === 'Administrator');
    navigateTo('dashboard');
}

function login() {
    const u = $('#loginUsername').val().trim();
    const p = $('#loginPassword').val().trim();
    if (!u || !p) { showToast('Please enter credentials', 'error'); return; }
    const user = getUserByCredentials(u, p);
    if (user) {
        _currentUser = user;
        $('#loginPage').fadeOut(300, function () { showApp(user); });
    } else {
        showToast('Invalid credentials or account inactive', 'error');
        $('#loginPassword').val('').focus();
    }
}

function logout() {
    _currentUser = null;
    clearCart();
    $('#mainApp').hide();
    $('#loginPage').fadeIn(300);
    showLpView('loginView');
    showToast('Logged out successfully', 'info');
}

// ── FORGOT PASSWORD ──────────────────────────────────────────
let _fpUser = null;

function showLpView(viewId) {
    $('#loginView, #forgotView').hide();
    $('#' + viewId).show();
}

function fpGoStep(step) {
    for (let i = 1; i <= 3; i++) {
        const el = $('#fpStep' + i);
        el.removeClass('fp-step-active fp-step-done fp-step-pending');
        if (i < step)        el.addClass('fp-step-done');
        else if (i === step) el.addClass('fp-step-active');
        else                 el.addClass('fp-step-pending');
    }
    $('.fp-step-content').hide();
    $('#fpContent' + step).show();
}

function fpFindAccount() {
    const username = $('#fpUsername').val().trim();
    if (!username) { showToast('Please enter your username', 'error'); return; }
    const user = getUserByUsername(username);
    if (!user)         { showToast('No account found with that username', 'error'); return; }
    if (!user.active)  { showToast('This account is inactive. Contact administrator.', 'error'); return; }
    if (!user.securityQuestion) { showToast('No security question set for this account.', 'error'); return; }
    _fpUser = user;
    $('#fpQuestionText').text(user.securityQuestion);
    $('#fpAnswer').val('');
    fpGoStep(2);
}

function fpCheckAnswer() {
    if (!_fpUser) return;
    const answer = $('#fpAnswer').val().trim().toLowerCase();
    if (!answer) { showToast('Please enter your answer', 'error'); return; }
    if (answer === _fpUser.securityAnswer) {
        $('#fpNewPass, #fpConfirmPass').val('');
        fpGoStep(3);
    } else {
        showToast('Incorrect answer. Please try again.', 'error');
        $('#fpAnswer').val('').focus();
    }
}

function fpResetPassword() {
    if (!_fpUser) return;
    const newPass     = $('#fpNewPass').val().trim();
    const confirmPass = $('#fpConfirmPass').val().trim();
    if (!newPass || newPass.length < 4) { showToast('Password must be at least 4 characters', 'error'); return; }
    if (newPass !== confirmPass)         { showToast('Passwords do not match', 'error'); return; }

    updateUserData(_fpUser.id, _fpUser.name, _fpUser.username, _fpUser.email, _fpUser.role,
        newPass, _fpUser.securityQuestion, _fpUser.securityAnswer);
    showToast('Password reset successfully! Please log in.', 'success');
    _fpUser = null;

    setTimeout(function () {
        showLpView('loginView');
        fpGoStep(1);
        $('#fpUsername').val('');
    }, 1800);
}

function initAuth() {
    // No session to restore — always start at login page on refresh
    $('#loginPage').show();
    $('#mainApp').hide();
    showLpView('loginView');
}

function updateGreeting() {
    const h   = new Date().getHours();
    const txt = h < 5  ? 'Good Night!'     :
                h < 12 ? 'Good Morning!'   :
                h < 17 ? 'Good Afternoon!' :
                h < 21 ? 'Good Evening!'   : 'Good Night!';
    const el = document.getElementById('lpGreetingText');
    if (!el) return;
    el.textContent = txt;
    el.classList.remove('animate__bounceInDown');
    void el.offsetWidth;
    el.classList.add('animate__bounceInDown');
}

$(document).ready(function () {
    updateGreeting();

    $('#loginBtn').on('click', login);
    $('#loginUsername, #loginPassword').on('keypress', function (e) { if (e.key === 'Enter') login(); });
    $('#logoutBtn').on('click', logout);

    $('#forgotPasswordLink').on('click', function (e) {
        e.preventDefault();
        fpGoStep(1);
        $('#fpUsername').val('');
        showLpView('forgotView');
    });
    $('#fpBackToLogin').on('click', function () {
        _fpUser = null;
        showLpView('loginView');
        fpGoStep(1);
    });

    $('#fpFindBtn').on('click', fpFindAccount);
    $('#fpUsername').on('keypress', function (e) { if (e.key === 'Enter') fpFindAccount(); });
    $('#fpCheckBtn').on('click', fpCheckAnswer);
    $('#fpAnswer').on('keypress', function (e) { if (e.key === 'Enter') fpCheckAnswer(); });
    $('#fpResetBtn').on('click', fpResetPassword);

    $('#lpEyeBtn').on('click', function () {
        const inp  = document.getElementById('loginPassword');
        const icon = $(this).find('i');
        const isPassword = inp.type === 'password';
        inp.type = isPassword ? 'text' : 'password';
        icon.attr('class', isPassword ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill');
    });
});
