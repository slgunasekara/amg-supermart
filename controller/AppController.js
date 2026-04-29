// ============================================================
//  APP CONTROLLER  — SPA Router  (global scope, loaded last)
// ============================================================
var PAGE_TITLES = {
    dashboard : 'Dashboard',
    customers : 'Customer Management',
    items     : 'Item / Inventory Management',
    orders    : 'New Order',
    history   : 'Order History',
    reports   : 'Reports & Analytics',
    users     : 'User Management'
};

function navigateTo(page) {
    $('.page-section').removeClass('active');
    $('#page-' + page).addClass('active');
    $('.nav-item').removeClass('active');
    $('.nav-item[data-page="' + page + '"]').addClass('active');
    var title = PAGE_TITLES[page] || page;
    $('.topbar-title').text(title);
    $('.topbar-breadcrumb').text('AMG Supermart › ' + title);
    $('#sidebar').removeClass('open');
    $('#sidebarOverlay').removeClass('show');

    if (page === 'dashboard') renderDashboard();
    if (page === 'customers') renderCustomers();
    if (page === 'items')     renderItems();
    if (page === 'orders')    renderOrderPage();
    if (page === 'history')   renderOrderHistory();
    if (page === 'reports')   renderReports();
    if (page === 'users')     renderUsers();
}

$(document).ready(function() {
    /* Sidebar nav */
    $(document).on('click', '.nav-item[data-page]', function() {
        navigateTo($(this).data('page'));
    });
    /* Close modals on overlay click or × button */
    $(document).on('click', '.modal-overlay', function(e) {
        if ($(e.target).hasClass('modal-overlay')) $(this).removeClass('show');
    });
    $(document).on('click', '.modal-close', function() {
        $(this).closest('.modal-overlay').removeClass('show');
    });
    /* Calculator button in order page */
    $(document).on('click', '#openCalcFromOrder', function() {
        $('#calcModal').addClass('show'); Calc.display();
    });

    /* Bootstrap the app */
    initAuth();
});
