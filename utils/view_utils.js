// ============================================================
//  VIEW UTILITIES  (global scope)
// ============================================================
function showToast(msg, type) {
    type = type || 'success';
    var icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
    var $t = $('<div class="toast-msg toast-' + type + '"><span class="toast-icon">' + (icons[type] || 'ℹ️') + '</span><span>' + msg + '</span></div>');
    $('#toastContainer').append($t);
    setTimeout(function() { $t.addClass('fade-out'); setTimeout(function() { $t.remove(); }, 350); }, 3200);
}

function formatCurrency(n) {
    return 'Rs. ' + Number(n).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function formatDate(d) {
    return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

function generateAvatar(name) {
    return name.split(' ').map(function(w) { return w[0]; }).join('').toUpperCase().slice(0, 2);
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
