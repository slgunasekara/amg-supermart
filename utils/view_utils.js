//  VIEW UTILITIES
// ============================================================

function escapeHtml(str) {
    return String(str == null ? '' : str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}


function debounce(fn, delay) {
    let timer;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, arguments), delay);
    };
}

function showToast(msg, type) {
    type = type || 'success';
    const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
    const $t = $('<div class="toast-msg toast-' + type + '"><span class="toast-icon">' + (icons[type] || 'ℹ️') + '</span><span>' + escapeHtml(msg) + '</span></div>');
    $('#toastContainer').append($t);
    setTimeout(function () { $t.addClass('fade-out'); setTimeout(function () { $t.remove(); }, 350); }, 3200);
}

function formatCurrency(n) {
    return 'Rs. ' + Number(n).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function formatDate(d) {
    return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

function generateAvatar(name) {
    return String(name).split(' ').map(function (w) { return w[0]; }).join('').toUpperCase().slice(0, 2);
}

function showConfirm(title, text) {
    return Swal.fire({
        title: title, text: text, icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#e63946',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Yes, proceed!'
    });
}
