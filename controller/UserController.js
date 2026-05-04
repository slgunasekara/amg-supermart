//  USER CONTROLLER
// ============================================================
let _editingUserId = null;

function renderUsers(search) {
    search = search || '';
    let list = getUserData();
    const me = getCurrentUser();
    if (search) {
        const q = search.toLowerCase();
        list = list.filter(u =>
            u.name.toLowerCase().includes(q) ||
            u.username.toLowerCase().includes(q)
        );
    }

    const html = list.map(function (u) {
        const isSelf = me && u.id === me.id;
        return '<tr>' +
            '<td><span class="order-id">' + escapeHtml(u.id) + '</span></td>' +
            '<td><div class="d-flex align-items-center gap-2">' +
            '<div class="user-row-avatar">' + escapeHtml(generateAvatar(u.name)) + '</div>' +
            '<div><div style="font-weight:600">' + escapeHtml(u.name) + '</div>' +
            '<div style="font-size:11px;color:var(--text-secondary)">' + escapeHtml(u.email) + '</div></div></div></td>' +
            '<td><code style="font-size:12px;color:var(--accent)">' + escapeHtml(u.username) + '</code></td>' +
            '<td><span class="badge-modern badge-info">' + escapeHtml(u.role) + '</span></td>' +
            '<td><span class="badge-modern ' + (u.active ? 'badge-success' : 'badge-danger') + '">' + (u.active ? '● Active' : '● Inactive') + '</span></td>' +
            '<td style="white-space:nowrap">' +
            '<button class="btn-warning-sm me-1" onclick="editUser(\'' + u.id + '\')"><i class="bi bi-pencil"></i></button>' +
            (!isSelf
                ? '<button class="btn-danger-sm me-1" onclick="toggleUserStatus_ctrl(\'' + u.id + '\')" title="' + (u.active ? 'Disable' : 'Enable') + '">' + (u.active ? '🔒' : '🔓') + '</button>' +
                  '<button class="btn-danger-sm" onclick="deleteUser(\'' + u.id + '\')" title="Delete User"><i class="bi bi-trash"></i></button>'
                : '<span style="font-size:11px;color:var(--text-secondary)">(you)</span>') +
            '</td></tr>';
    }).join('');

    $('#userTableBody').html(html);
}

function openUserModal(editId) {
    _editingUserId = editId || null;
    if (editId) {
        const u = getUserById(editId);
        $('#userModalTitle').text('✏️ EDIT USER');
        $('#uName').val(u.name);
        $('#uUsername').val(u.username);
        $('#uEmail').val(u.email);
        $('#uRole').val(u.role);
        $('#uPassword').val('').attr('placeholder', 'Leave blank to keep current');
        $('#uSecurityQuestion').val(u.securityQuestion || '');
        $('#uSecurityAnswer').val('').attr('placeholder', 'Leave blank to keep current');
    } else {
        $('#userModalTitle').text('➕ ADD USER');
        $('#userForm')[0].reset();
        $('#uPassword').attr('placeholder', 'Password');
        $('#uSecurityQuestion').val('');
        $('#uSecurityAnswer').val('').attr('placeholder', 'Your answer');
    }
    $('#userModal').addClass('show');
}

function saveUser() {
    const name             = $('#uName').val().trim();
    const username         = $('#uUsername').val().trim();
    const email            = $('#uEmail').val().trim();
    const role             = $('#uRole').val();
    const password         = $('#uPassword').val().trim();
    const securityQuestion = $('#uSecurityQuestion').val();
    const securityAnswer   = $('#uSecurityAnswer').val().trim();

    if (!check_not_empty(name))     { showToast('Name is required', 'error'); return; }
    if (!check_not_empty(username)) { showToast('Username is required', 'error'); return; }
    if (!check_email(email))        { showToast('Invalid email address', 'error'); return; }
    if (!check_not_empty(role))     { showToast('Role is required', 'error'); return; }
    if (!_editingUserId && !check_not_empty(password))         { showToast('Password required for new user', 'error'); return; }
    if (!_editingUserId && !check_not_empty(securityQuestion)) { showToast('Please select a security question', 'error'); return; }
    if (!_editingUserId && !check_not_empty(securityAnswer))   { showToast('Security answer is required', 'error'); return; }
    if (!_editingUserId && getUserData().find(u => u.username === username)) {
        showToast('Username already exists', 'error'); return;
    }

    if (_editingUserId) {
        updateUserData(_editingUserId, name, username, email, role, password,
            securityQuestion || undefined,
            securityAnswer   || undefined);
        showToast('User updated successfully', 'success');
    } else {
        addUserData(username, password, name, role, email, securityQuestion, securityAnswer);
        showToast('User added successfully', 'success');
    }
    $('#userModal').removeClass('show');
    renderUsers();
}

function editUser(id) { openUserModal(id); }

function toggleUserStatus_ctrl(id) {
    const u = getUserById(id);
    if (!u) return;
    showConfirm(
        u.active ? 'Disable User?' : 'Enable User?',
        u.active ? 'This user will not be able to log in.' : 'This user will be able to log in again.'
    ).then(function (result) {
        if (result.isConfirmed) {
            toggleUserStatus(id);
            renderUsers();
            showToast('User status updated', 'info');
        }
    });
}

function deleteUser(id) {
    const u = getUserById(id);
    if (!u) return;
    showConfirm('Delete User?', 'This will permanently remove "' + u.name + '" and cannot be undone.')
        .then(function (result) {
            if (result.isConfirmed) {
                deleteUserData(id);
                renderUsers();
                showToast('User deleted', 'info');
            }
        });
}

$(document).ready(function () {
    $('#addUserBtn').on('click', function () { openUserModal(); });
    $('#saveUserBtn').on('click', saveUser);
    $('#userSearch').on('input', debounce(function () { renderUsers($(this).val()); }, 250));
});
