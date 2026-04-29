// ============================================================
//  CUSTOMER CONTROLLER  (global scope)
// ============================================================
var _editingCustomerId = null;

function renderCustomers(search) {
    search = search || '';
    var list = getCustomerData();
    if (search) list = list.filter(function(c) {
        return c.name.toLowerCase().includes(search.toLowerCase()) ||
               c.contact.includes(search) ||
               c.id.toLowerCase().includes(search.toLowerCase());
    });
    var html = '';
    list.forEach(function(c) {
        html += '<tr>' +
            '<td><span class="order-id">' + c.id + '</span></td>' +
            '<td><div class="d-flex align-items-center gap-2">' +
            '<div class="user-row-avatar">' + generateAvatar(c.name) + '</div>' +
            '<div><div style="font-weight:600">' + c.name + '</div>' +
            '<div style="font-size:11px;color:var(--text-secondary)">' + (c.email || '-') + '</div></div></div></td>' +
            '<td>' + c.contact + '</td>' +
            '<td>' + c.address + '</td>' +
            '<td><span class="badge-modern badge-info">🏆 ' + c.points + ' pts</span></td>' +
            '<td><button class="btn-warning-sm me-1" onclick="editCustomer(\'' + c.id + '\')"><i class="bi bi-pencil"></i></button>' +
            '<button class="btn-danger-sm" onclick="deleteCustomer(\'' + c.id + '\')"><i class="bi bi-trash"></i></button></td>' +
            '</tr>';
    });
    $('#customerTableBody').html(html || '<tr><td colspan="6" class="text-center py-4" style="color:var(--text-secondary)">No customers found</td></tr>');
    $('#customerCount').text(list.length);
}

function openCustomerModal(editId) {
    _editingCustomerId = editId || null;
    if (editId) {
        var c = getCustomerById(editId);
        $('#custModalTitle').text('✏️ EDIT CUSTOMER');
        $('#custName').val(c.name); $('#custContact').val(c.contact);
        $('#custAddress').val(c.address); $('#custEmail').val(c.email || '');
    } else {
        $('#custModalTitle').text('➕ ADD CUSTOMER');
        $('#custForm')[0].reset();
    }
    $('#customerModal').addClass('show');
}

function saveCustomer() {
    var name    = $('#custName').val().trim();
    var contact = $('#custContact').val().trim();
    var address = $('#custAddress').val().trim();
    var email   = $('#custEmail').val().trim();

    if (!check_not_empty(name))    { showToast('Name is required', 'error'); return; }
    if (!check_phone(contact))     { showToast('Invalid contact number (e.g. 0771234567)', 'error'); return; }
    if (!check_not_empty(address)) { showToast('Address is required', 'error'); return; }
    if (!check_email(email))       { showToast('Invalid email address', 'error'); return; }

    if (_editingCustomerId) {
        updateCustomerData(_editingCustomerId, name, contact, address, email);
        showToast('Customer updated successfully', 'success');
    } else {
        addCustomerData(name, contact, address, email);
        showToast('Customer added successfully', 'success');
    }
    $('#customerModal').removeClass('show');
    renderCustomers();
}

function editCustomer(id)   { openCustomerModal(id); }
function deleteCustomer(id) {
    showConfirm('Delete Customer?', 'This action cannot be undone.').then(function(result) {
        if (result.isConfirmed) {
            deleteCustomerData(id);
            renderCustomers();
            showToast('Customer deleted', 'info');
        }
    });
}

$(document).ready(function() {
    $('#addCustomerBtn').on('click', function(){ openCustomerModal(); });
    $('#saveCustomerBtn').on('click', saveCustomer);
    $('#customerSearch').on('input', function(){ renderCustomers($(this).val()); });
});
