//  ITEM CONTROLLER
// ============================================================
let _editingItemId   = null;
let _itemSearchQuery = '';
let _itemCatFilter   = '';

function renderItems(search, cat) {
    _itemSearchQuery = (search !== undefined) ? search : _itemSearchQuery;
    _itemCatFilter   = (cat    !== undefined) ? cat    : _itemCatFilter;

    let list = getItemData();
    if (_itemSearchQuery) {
        const q = _itemSearchQuery.toLowerCase();
        list = list.filter(i => i.name.toLowerCase().includes(q) || i.code.toLowerCase().includes(q));
    }
    if (_itemCatFilter) list = list.filter(i => i.category === _itemCatFilter);

    // Category filter options
    const cats    = getCategories();
    const catOpts = ['<option value="">All Categories</option>']
        .concat(cats.map(c => '<option value="' + escapeHtml(c) + '"' + (_itemCatFilter === c ? ' selected' : '') + '>' + escapeHtml(c) + '</option>'))
        .join('');
    $('#itemCatFilter').html(catOpts);

    const html = list.map(function (item) {
        return '<div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6">' +
            '<div class="item-manage-card">' +
            (item.image ? '<img src="' + escapeHtml(item.image) + '" class="item-manage-img" onerror="this.style.display=\'none\'">' : '') +
            '<div class="item-manage-info">' +
            '<div class="item-manage-code">' + escapeHtml(item.code) + '</div>' +
            '<div class="item-manage-name">' + escapeHtml(item.name) + '</div>' +
            '<div class="item-manage-price">' + formatCurrency(item.price) + '</div>' +
            '<div style="font-size:12px;color:var(--text-secondary)">Stock: ' + item.qty + ' ' + escapeHtml(item.unit) +
            (item.qty < 30 ? ' <span class="badge-modern badge-danger">Low</span>' : '') + '</div>' +
            '<div class="item-manage-actions d-flex gap-2 mt-2">' +
            '<button class="btn-warning-sm flex-fill" onclick="editItem(\'' + item.id + '\')"><i class="bi bi-pencil"></i> Edit</button>' +
            '<button class="btn-danger-sm" onclick="deleteItem(\'' + item.id + '\')"><i class="bi bi-trash"></i></button>' +
            '</div></div></div></div>';
    }).join('');

    $('#itemGrid').html(html || '<div class="col-12 text-center py-5" style="color:var(--text-secondary)">No items found</div>');
    $('#itemCount').text(list.length);
}

function openItemModal(editId) {
    _editingItemId = editId || null;
    if (editId) {
        const item = getItemById(editId);
        $('#itemModalTitle').text('✏️ EDIT ITEM');
        $('#iCode').val(item.code);
        $('#iName').val(item.name);
        $('#iCategory').val(item.category);
        $('#iPrice').val(item.price);
        $('#iQty').val(item.qty);
        $('#iUnit').val(item.unit);
        $('#iImage').val(item.image || '');
        if (item.image) { $('#imgPreview').attr('src', item.image).show(); } else { $('#imgPreview').hide(); }
    } else {
        $('#itemModalTitle').text('➕ ADD ITEM');
        $('#itemForm')[0].reset();
        $('#imgPreview').hide();
        $('#mergeWarningBox').hide();
    }
    $('#itemModal').addClass('show');
}

// FIX: triggered on #iName change (was incorrectly bound to #iQty)
function checkDuplicateItemName() {
    const name = $('#iName').val().trim();
    if (!name || _editingItemId) { $('#mergeWarningBox').hide(); return; }
    const duplicate = getItemByName(name);
    if (duplicate) {
        const newQty = parseInt($('#iQty').val()) || 0;
        $('#mergeWarningText').html(
            'Current stock: <strong>' + duplicate.qty + ' ' + escapeHtml(duplicate.unit) + '</strong> &nbsp;|&nbsp; ' +
            'You are adding: <strong>+' + (newQty || '?') + '</strong> &nbsp;→&nbsp; ' +
            'New total will be: <strong>' + (duplicate.qty + newQty) + ' ' + escapeHtml(duplicate.unit) + '</strong><br>' +
            '<span style="opacity:0.8">Saving will merge the quantity — no duplicate will be created.</span>'
        );
        $('#mergeWarningBox').show();
    } else {
        $('#mergeWarningBox').hide();
    }
}

function saveItem() {
    const code  = $('#iCode').val().trim();
    const name  = $('#iName').val().trim();
    const cat   = $('#iCategory').val();
    const price = parseFloat($('#iPrice').val());
    const qty   = parseInt($('#iQty').val());
    const unit  = $('#iUnit').val().trim();
    const image = $('#iImage').val().trim();

    if (!check_not_empty(code))  { showToast('Item code is required', 'error'); return; }
    if (!check_not_empty(name))  { showToast('Item name is required', 'error'); return; }
    if (!check_not_empty(cat))   { showToast('Category is required', 'error'); return; }
    if (!check_price(price))     { showToast('Price must be greater than 0', 'error'); return; }
    if (!check_qty(qty))         { showToast('Quantity cannot be negative', 'error'); return; }
    if (!check_not_empty(unit))  { showToast('Unit is required', 'error'); return; }
    if (!_editingItemId && getItemByCode(code)) { showToast('Item code already exists', 'error'); return; }

    if (_editingItemId) {
        updateItemData(_editingItemId, code, name, cat, price, qty, unit, image);
        showToast('Item updated', 'success');
    } else {
        const duplicate = getItemByName(name);
        if (duplicate) {
            mergeItemQty(duplicate.id, qty);
            showToast('⚡ "' + name + '" already exists — Qty merged! (+' + qty + ')', 'warning');
        } else {
            addItemData(code, name, cat, price, qty, unit, image);
            showToast('Item added', 'success');
        }
    }
    $('#itemModal').removeClass('show');
    renderItems();
}

function editItem(id)   { openItemModal(id); }
function deleteItem(id) {
    showConfirm('Delete Item?', 'This will remove the item from inventory.').then(function (result) {
        if (result.isConfirmed) { deleteItemData(id); renderItems(); showToast('Item deleted', 'info'); }
    });
}
function previewItemImage() {
    const url = $('#iImage').val().trim();
    if (url) { $('#imgPreview').attr('src', url).show(); } else { $('#imgPreview').hide(); }
}

$(document).ready(function () {
    $('#addItemBtn').on('click', function () { openItemModal(); });
    $('#saveItemBtn').on('click', saveItem);
    // Debounced search
    $('#itemSearch').on('input', debounce(function () { renderItems($(this).val(), _itemCatFilter); }, 250));
    $('#itemCatFilter').on('change', function () { renderItems(_itemSearchQuery, $(this).val()); });
    $('#iImage').on('input', previewItemImage);
    // FIX: duplicate check fires on name change, not qty change
    $('#iName').on('input', checkDuplicateItemName);
    $('#iQty').on('input', checkDuplicateItemName);
});
