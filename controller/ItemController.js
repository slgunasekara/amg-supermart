// ============================================================
//  ITEM CONTROLLER  (global scope)
// ============================================================
var _editingItemId   = null;
var _itemSearchQuery = '';
var _itemCatFilter   = '';

function renderItems(search, cat) {
    _itemSearchQuery = (search !== undefined) ? search : _itemSearchQuery;
    _itemCatFilter   = (cat !== undefined)    ? cat    : _itemCatFilter;

    var list = getItemData();
    if (_itemSearchQuery) list = list.filter(function(i) {
        return i.name.toLowerCase().includes(_itemSearchQuery.toLowerCase()) ||
               i.code.toLowerCase().includes(_itemSearchQuery.toLowerCase());
    });
    if (_itemCatFilter) list = list.filter(function(i) { return i.category === _itemCatFilter; });

    /* Category filter options */
    var cats = getCategories();
    var catOpts = '<option value="">All Categories</option>';
    cats.forEach(function(c) {
        catOpts += '<option value="' + c + '" ' + (_itemCatFilter === c ? 'selected' : '') + '>' + c + '</option>';
    });
    $('#itemCatFilter').html(catOpts);

    var html = '';
    list.forEach(function(item) {
        html += '<div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6">' +
            '<div class="item-manage-card">' +
            (item.image ? '<img src="' + item.image + '" class="item-manage-img" onerror="this.style.display=\'none\'">' : '') +
            '<div class="item-manage-info">' +
            '<div class="item-manage-code">' + item.code + '</div>' +
            '<div class="item-manage-name">' + item.name + '</div>' +
            '<div class="item-manage-price">' + formatCurrency(item.price) + '</div>' +
            '<div style="font-size:12px;color:var(--text-secondary)">Stock: ' + item.qty + ' ' + item.unit +
            (item.qty < 30 ? ' <span class="badge-modern badge-danger">Low</span>' : '') + '</div>' +
            '<div class="item-manage-actions">' +
            '<button class="btn-warning-sm flex-fill" onclick="editItem(\'' + item.id + '\')"><i class="bi bi-pencil"></i> Edit</button>' +
            '<button class="btn-danger-sm" onclick="deleteItem(\'' + item.id + '\')"><i class="bi bi-trash"></i></button>' +
            '</div></div></div></div>';
    });
    $('#itemGrid').html(html || '<div class="col-12 text-center py-5" style="color:var(--text-secondary)">No items found</div>');
    $('#itemCount').text(list.length);
}

function openItemModal(editId) {
    _editingItemId = editId || null;
    if (editId) {
        var item = getItemById(editId);
        $('#itemModalTitle').text('✏️ EDIT ITEM');
        $('#iCode').val(item.code); $('#iName').val(item.name);
        $('#iCategory').val(item.category); $('#iPrice').val(item.price);
        $('#iQty').val(item.qty); $('#iUnit').val(item.unit);
        $('#iImage').val(item.image || '');
        if (item.image) { $('#imgPreview').attr('src', item.image).show(); } else { $('#imgPreview').hide(); }
    } else {
        $('#itemModalTitle').text('➕ ADD ITEM');
        $('#itemForm')[0].reset(); $('#imgPreview').hide();
    }
    $('#itemModal').addClass('show');
}

function saveItem() {
    var code  = $('#iCode').val().trim();
    var name  = $('#iName').val().trim();
    var cat   = $('#iCategory').val();
    var price = parseFloat($('#iPrice').val());
    var qty   = parseInt($('#iQty').val());
    var unit  = $('#iUnit').val().trim();
    var image = $('#iImage').val().trim();

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
        addItemData(code, name, cat, price, qty, unit, image);
        showToast('Item added', 'success');
    }
    $('#itemModal').removeClass('show');
    renderItems();
}

function editItem(id)   { openItemModal(id); }
function deleteItem(id) {
    showConfirm('Delete Item?', 'This will remove the item from inventory.').then(function(result) {
        if (result.isConfirmed) { deleteItemData(id); renderItems(); showToast('Item deleted', 'info'); }
    });
}
function previewItemImage() {
    var url = $('#iImage').val().trim();
    if (url) { $('#imgPreview').attr('src', url).show(); } else { $('#imgPreview').hide(); }
}

$(document).ready(function() {
    $('#addItemBtn').on('click', function(){ openItemModal(); });
    $('#saveItemBtn').on('click', saveItem);
    $('#itemSearch').on('input', function(){ renderItems($(this).val(), _itemCatFilter); });
    $('#itemCatFilter').on('change', function(){ renderItems(_itemSearchQuery, $(this).val()); });
    $('#iImage').on('input', previewItemImage);
});
