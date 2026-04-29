/* ============================================================
   AMG SUPERMART POS — JAVASCRIPT MVC
   Model | View | Controller
   ============================================================ */

'use strict';

// ═══════════════════════════════════════════════════════════
//  MODEL
// ═══════════════════════════════════════════════════════════
const Model = {
  currentUser: null,

  users: [
    { id: 'U001', username: 'admin', password: 'admin123', name: 'Admin User',    role: 'Administrator', email: 'admin@amgsupermart.lk',    active: true  },
    { id: 'U002', username: 'kasun', password: 'kasun123', name: 'Kasun Perera',  role: 'Cashier',       email: 'kasun@amgsupermart.lk',   active: true  },
    { id: 'U003', username: 'nimali',password: 'nimali123',name: 'Nimali Silva',  role: 'Manager',       email: 'nimali@amgsupermart.lk',  active: true  },
    { id: 'U004', username: 'amal',  password: 'amal123',  name: 'Amal Fernando', role: 'Cashier',       email: 'amal@amgsupermart.lk',    active: false }
  ],

  customers: [
    { id: 'C001', name: 'Sunil Bandara',    contact: '0771234567', address: 'Colombo 07',      email: 'sunil@example.com',  points: 450 },
    { id: 'C002', name: 'Priya Jayawardena',contact: '0782345678', address: 'Nugegoda',         email: 'priya@example.com',  points: 230 },
    { id: 'C003', name: 'Ravi Kumara',      contact: '0763456789', address: 'Kandy Road, Kegalle',email: 'ravi@example.com', points: 120 },
    { id: 'C004', name: 'Dilini Fernando',  contact: '0754567890', address: 'Kadawatha',        email: 'dilini@example.com', points: 680 }
  ],

  items: [
    { id: 'I001', code: 'FRT001', name: 'Banana',       category: 'Fruits',     price: 25.00,  qty: 200, unit: 'kg',  image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=400&q=80' },
    { id: 'I002', code: 'FRT002', name: 'Apple',        category: 'Fruits',     price: 180.00, qty: 80,  unit: 'kg',  image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400&q=80' },
    { id: 'I003', code: 'VEG001', name: 'Carrot',       category: 'Vegetables', price: 90.00,  qty: 60,  unit: 'kg',  image: 'https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?w=400&q=80' },
    { id: 'I004', code: 'VEG002', name: 'Tomato',       category: 'Vegetables', price: 120.00, qty: 100, unit: 'kg',  image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&q=80' },
    { id: 'I005', code: 'DRY001', name: 'Rice (Samba)', category: 'Dry Food',   price: 185.00, qty: 500, unit: 'kg',  image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80' },
    { id: 'I006', code: 'DRY002', name: 'Coconut Oil',  category: 'Dry Food',   price: 650.00, qty: 120, unit: 'L',   image: 'https://images.unsplash.com/photo-1558642084-fd07fae5282e?w=400&q=80' },
    { id: 'I007', code: 'BEV001', name: 'Milk (1L)',    category: 'Beverages',  price: 230.00, qty: 90,  unit: 'pcs', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&q=80' },
    { id: 'I008', code: 'BEV002', name: 'Orange Juice', category: 'Beverages',  price: 320.00, qty: 45,  unit: 'pcs', image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80' },
    { id: 'I009', code: 'SNK001', name: 'Biscuits',     category: 'Snacks',     price: 55.00,  qty: 300, unit: 'pcs', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80' },
    { id: 'I010', code: 'DRY003', name: 'Dhal (Red)',   category: 'Dry Food',   price: 280.00, qty: 200, unit: 'kg',  image: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=400&q=80' },
    { id: 'I011', code: 'FRT003', name: 'Papaya',       category: 'Fruits',     price: 60.00,  qty: 40,  unit: 'pcs', image: 'https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=400&q=80' },
    { id: 'I012', code: 'VEG003', name: 'Onion',        category: 'Vegetables', price: 75.00,  qty: 150, unit: 'kg',  image: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=400&q=80' }
  ],

  orders: [
    {
      id: 'ORD-001', customerId: 'C001', customerName: 'Sunil Bandara',
      date: '2025-04-10', time: '10:30 AM', status: 'Completed',
      items: [{ itemId:'I001', name:'Banana', qty:2, price:25.00 },{ itemId:'I005', name:'Rice (Samba)', qty:5, price:185.00 }],
      subtotal: 975.00, tax: 97.50, discount: 0, total: 1072.50
    },
    {
      id: 'ORD-002', customerId: 'C002', customerName: 'Priya Jayawardena',
      date: '2025-04-11', time: '02:15 PM', status: 'Completed',
      items: [{ itemId:'I007', name:'Milk (1L)', qty:3, price:230.00 },{ itemId:'I009', name:'Biscuits', qty:5, price:55.00 }],
      subtotal: 965.00, tax: 96.50, discount: 50, total: 1011.50
    },
    {
      id: 'ORD-003', customerId: 'C003', customerName: 'Ravi Kumara',
      date: '2025-04-15', time: '11:00 AM', status: 'Completed',
      items: [{ itemId:'I002', name:'Apple', qty:1, price:180.00 },{ itemId:'I008', name:'Orange Juice', qty:2, price:320.00 }],
      subtotal: 820.00, tax: 82.00, discount: 0, total: 902.00
    }
  ],

  cart: [],
  editingId: null,

  // Stats helpers
  getTotalRevenue() { return this.orders.reduce((s, o) => s + o.total, 0); },
  getTodayOrders() {
    const today = new Date().toISOString().split('T')[0];
    return this.orders.filter(o => o.date === today).length;
  },
  getLowStockItems() { return this.items.filter(i => i.qty < 30); },
  getOrderById(id) { return this.orders.find(o => o.id === id); },
  getCustomerById(id) { return this.customers.find(c => c.id === id); },
  getItemById(id) { return this.items.find(i => i.id === id); },
  nextOrderId() {
    const nums = this.orders.map(o => parseInt(o.id.split('-')[1]));
    return 'ORD-' + String((Math.max(0, ...nums) + 1)).padStart(3, '0');
  },
  nextCustomerId() {
    const nums = this.customers.map(c => parseInt(c.id.slice(1)));
    return 'C' + String((Math.max(0, ...nums) + 1)).padStart(3, '0');
  },
  nextItemId() {
    const nums = this.items.map(i => parseInt(i.id.slice(1)));
    return 'I' + String((Math.max(0, ...nums) + 1)).padStart(3, '0');
  },
  nextUserId() {
    const nums = this.users.map(u => parseInt(u.id.slice(1)));
    return 'U' + String((Math.max(0, ...nums) + 1)).padStart(3, '0');
  },

  getMonthlySales() {
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const data = new Array(12).fill(0);
    this.orders.forEach(o => {
      const m = new Date(o.date).getMonth();
      data[m] += o.total;
    });
    return { labels: months, data };
  },
  getCategorySales() {
    const cats = {};
    this.orders.forEach(o => o.items.forEach(oi => {
      const item = this.getItemById(oi.itemId);
      if (item) { cats[item.category] = (cats[item.category] || 0) + oi.qty * oi.price; }
    }));
    return cats;
  }
};

// ═══════════════════════════════════════════════════════════
//  VIEW HELPERS
// ═══════════════════════════════════════════════════════════
const View = {
  showToast(msg, type = 'success') {
    const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
    const $t = $(`<div class="toast-msg toast-${type}">
      <span class="toast-icon">${icons[type]}</span>
      <span>${msg}</span>
    </div>`);
    $('#toastContainer').append($t);
    setTimeout(() => { $t.addClass('fade-out'); setTimeout(() => $t.remove(), 350); }, 3200);
  },

  formatCurrency(n) { return 'Rs. ' + Number(n).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','); },
  formatDate(d) { return new Date(d).toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' }); },
  generateAvatar(name) {
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0,2);
  }
};

// ═══════════════════════════════════════════════════════════
//  CALCULATOR STATE
// ═══════════════════════════════════════════════════════════
const Calc = {
  current: '0', prev: '', op: null, resetNext: false,
  display() {
    $('#calcVal').text(this.current);
    $('#calcExpr').text(this.prev + (this.op ? ' ' + this.op : ''));
  },
  input(v) {
    if (this.resetNext) { this.current = ''; this.resetNext = false; }
    if (v === '.' && this.current.includes('.')) return;
    if (this.current === '0' && v !== '.') this.current = v;
    else this.current += v;
    this.display();
  },
  setOp(o) {
    this.prev = this.current; this.op = o; this.resetNext = true; this.display();
  },
  equals() {
    if (!this.op || !this.prev) return;
    const a = parseFloat(this.prev), b = parseFloat(this.current);
    let r = 0;
    if (this.op === '+') r = a + b;
    if (this.op === '-') r = a - b;
    if (this.op === '×') r = a * b;
    if (this.op === '÷') r = b !== 0 ? a / b : 0;
    if (this.op === '%') r = a * (b / 100);
    this.current = String(parseFloat(r.toFixed(8))); this.prev = ''; this.op = null; this.resetNext = true;
    this.display();
  },
  clear() { this.current = '0'; this.prev = ''; this.op = null; this.resetNext = false; this.display(); },
  backspace() {
    this.current = this.current.length > 1 ? this.current.slice(0,-1) : '0'; this.display();
  },
  toggleSign() { this.current = String(-parseFloat(this.current)); this.display(); }
};

// ═══════════════════════════════════════════════════════════
//  CHART INSTANCES
// ═══════════════════════════════════════════════════════════
let salesChart = null, catChart = null, reportBarChart = null, reportPieChart = null;

// ═══════════════════════════════════════════════════════════
//  CONTROLLER
// ═══════════════════════════════════════════════════════════
const Controller = {

  // ── INIT ──────────────────────────────────────────────────
  init() {
    // Theme
    const saved = localStorage.getItem('amg_theme') || 'light';
    $('html').attr('data-theme', saved);
    this.updateThemeBtn(saved);

    // Login check
    const sess = sessionStorage.getItem('amg_user');
    if (sess) {
      Model.currentUser = JSON.parse(sess);
      this.showApp();
    } else {
      $('#loginPage').show();
    }
  },

  // ── AUTH ──────────────────────────────────────────────────
  login() {
    const u = $('#loginUsername').val().trim();
    const p = $('#loginPassword').val().trim();
    if (!u || !p) { View.showToast('Please enter credentials', 'error'); return; }
    const user = Model.users.find(x => x.username === u && x.password === p && x.active);
    if (user) {
      Model.currentUser = user;
      sessionStorage.setItem('amg_user', JSON.stringify(user));
      $('#loginPage').css({ opacity: 0, transform: 'scale(1.05)' });
      setTimeout(() => { $('#loginPage').hide(); this.showApp(); }, 400);
    } else {
      View.showToast('Invalid credentials or account inactive', 'error');
      $('#loginPassword').val('').focus();
    }
  },

  logout() {
    sessionStorage.removeItem('amg_user');
    Model.currentUser = null;
    Model.cart = [];
    $('#loginPage').css({ opacity: 0, transform: 'scale(0.95)' }).show();
    setTimeout(() => $('#loginPage').css({ opacity: 1, transform: 'scale(1)' }), 10);
    View.showToast('Logged out successfully', 'info');
  },

  showApp() {
    $('#loginPage').hide();
    const u = Model.currentUser;
    $('.user-name').text(u.name);
    $('.user-role').text(u.role);
    $('.user-avatar').text(View.generateAvatar(u.name));
    this.navigate('dashboard');

    // Hide user management from non-admin
    if (u.role !== 'Administrator') {
      $('[data-page="users"]').hide();
    }
  },

  // ── NAVIGATION ────────────────────────────────────────────
  navigate(page) {
    $('.page-section').removeClass('active');
    $(`#page-${page}`).addClass('active');
    $('.nav-item').removeClass('active');
    $(`.nav-item[data-page="${page}"]`).addClass('active');

    const titles = {
      dashboard: 'Dashboard', customers: 'Customer Management',
      items: 'Item Management', orders: 'New Order',
      history: 'Order History', reports: 'Reports & Analytics',
      users: 'User Management'
    };
    $('.topbar-title').text(titles[page] || page);
    $('.topbar-breadcrumb').text('AMG Supermart › ' + (titles[page] || page));

    // Close mobile sidebar
    $('#sidebar').removeClass('open');
    $('#sidebarOverlay').removeClass('show');

    if (page === 'dashboard') this.renderDashboard();
    if (page === 'customers') this.renderCustomers();
    if (page === 'items')     this.renderItems();
    if (page === 'orders')    this.renderOrderPage();
    if (page === 'history')   this.renderOrderHistory();
    if (page === 'reports')   this.renderReports();
    if (page === 'users')     this.renderUsers();
  },

  // ── THEME ─────────────────────────────────────────────────
  toggleTheme() {
    const cur = $('html').attr('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    $('html').attr('data-theme', next);
    localStorage.setItem('amg_theme', next);
    this.updateThemeBtn(next);

    // Re-render charts
    setTimeout(() => {
      if ($('#page-dashboard').hasClass('active')) this.renderDashboard();
      if ($('#page-reports').hasClass('active')) this.renderReports();
    }, 300);
  },
  updateThemeBtn(t) {
    const $btn = $('#themeToggleBtn');
    $btn.html(t === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode');
  },

  // ── FULLSCREEN ────────────────────────────────────────────
  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen();
    }
  },

  // ── DASHBOARD ─────────────────────────────────────────────
  renderDashboard() {
    const rev = Model.getTotalRevenue();
    const orders = Model.orders.length;
    const custs = Model.customers.length;
    const items = Model.items.length;
    const lowStock = Model.getLowStockItems().length;

    $('#statRevenue').text(View.formatCurrency(rev));
    $('#statOrders').text(orders);
    $('#statCustomers').text(custs);
    $('#statItems').text(items);
    $('#statLowStock').text(lowStock);

    this.renderSalesChart();
    this.renderCatChart();
    this.renderActivity();
    this.renderTopItems();
  },

  getChartColors() {
    const dark = $('html').attr('data-theme') === 'dark';
    return {
      accent: dark ? '#00e676' : '#e63946',
      accent2: dark ? '#69f0ae' : '#c1121f',
      grid: dark ? 'rgba(0,230,118,0.1)' : 'rgba(230,57,70,0.08)',
      text: dark ? '#a5d6a7' : '#6c757d',
      bg: dark ? 'rgba(0,230,118,0.08)' : 'rgba(230,57,70,0.06)'
    };
  },

  renderSalesChart() {
    const c = this.getChartColors();
    const ms = Model.getMonthlySales();
    const ctx = document.getElementById('salesChart');
    if (!ctx) return;
    if (salesChart) salesChart.destroy();
    salesChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ms.labels,
        datasets: [{
          label: 'Revenue (Rs.)',
          data: ms.data,
          borderColor: c.accent,
          backgroundColor: c.bg,
          borderWidth: 2.5,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: c.accent,
          pointRadius: 4,
          pointHoverRadius: 7
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: c.grid }, ticks: { color: c.text, font: { family: 'Rajdhani', size: 11 } } },
          y: { grid: { color: c.grid }, ticks: { color: c.text, font: { family: 'Rajdhani', size: 11 }, callback: v => 'Rs.' + v } }
        }
      }
    });
  },

  renderCatChart() {
    const c = this.getChartColors();
    const cats = Model.getCategorySales();
    const ctx = document.getElementById('catChart');
    if (!ctx) return;
    if (catChart) catChart.destroy();
    const dark = $('html').attr('data-theme') === 'dark';
    const palette = dark
      ? ['#00e676','#40c4ff','#ffab40','#ea80fc','#ff6e40','#ccff90']
      : ['#e63946','#457b9d','#2d6a4f','#e76f51','#8338ec','#06d6a0'];
    catChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: Object.keys(cats),
        datasets: [{ data: Object.values(cats), backgroundColor: palette, borderWidth: 0, hoverOffset: 8 }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { color: c.text, font: { family: 'Rajdhani', size: 12 }, padding: 12 } }
        },
        cutout: '65%'
      }
    });
  },

  renderActivity() {
    const recent = [...Model.orders].reverse().slice(0, 5);
    let html = '';
    recent.forEach(o => {
      html += `<div class="activity-item">
        <div class="activity-dot"></div>
        <div>
          <div class="activity-text"><strong>${o.customerName}</strong> — ${View.formatCurrency(o.total)}</div>
          <div class="activity-time">${o.date} at ${o.time} · ${o.items.length} item(s)</div>
        </div>
      </div>`;
    });
    if (!html) html = '<p class="text-secondary" style="font-size:13px;padding:10px 0">No recent activity</p>';
    $('#recentActivity').html(html);
  },

  renderTopItems() {
    const sold = {};
    Model.orders.forEach(o => o.items.forEach(oi => { sold[oi.itemId] = (sold[oi.itemId] || 0) + oi.qty; }));
    const top = Object.entries(sold).sort((a,b) => b[1]-a[1]).slice(0,5);
    let html = '';
    top.forEach(([id, qty]) => {
      const item = Model.getItemById(id);
      if (!item) return;
      html += `<div class="d-flex align-items-center gap-3 mb-3">
        <div style="width:36px;height:36px;border-radius:8px;overflow:hidden;flex-shrink:0">
          ${item.image ? `<img src="${item.image}" style="width:100%;height:100%;object-fit:cover">` : `<div class="item-card-img-placeholder" style="height:36px;font-size:16px">🛒</div>`}
        </div>
        <div style="flex:1">
          <div style="font-size:13px;font-weight:600">${item.name}</div>
          <div class="stock-bar"><div class="stock-bar-fill" style="width:${Math.min(100,(qty/20)*100)}%"></div></div>
        </div>
        <div style="font-family:'Orbitron',monospace;font-size:12px;color:var(--accent)">${qty} sold</div>
      </div>`;
    });
    if (!html) html = '<p class="text-secondary" style="font-size:13px">No sales data yet</p>';
    $('#topItems').html(html);
  },

  // ── CUSTOMERS ─────────────────────────────────────────────
  renderCustomers(search = '') {
    let list = Model.customers;
    if (search) list = list.filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.contact.includes(search) || c.id.toLowerCase().includes(search.toLowerCase())
    );
    let html = '';
    list.forEach(c => {
      html += `<tr>
        <td><span class="order-id">${c.id}</span></td>
        <td><div class="d-flex align-items-center gap-2">
          <div class="user-row-avatar">${View.generateAvatar(c.name)}</div>
          <div><div style="font-weight:600">${c.name}</div><div style="font-size:11px;color:var(--text-secondary)">${c.email || '-'}</div></div>
        </div></td>
        <td>${c.contact}</td>
        <td>${c.address}</td>
        <td><span class="badge-modern badge-info">🏆 ${c.points} pts</span></td>
        <td>
          <button class="btn-warning-sm me-1" onclick="Controller.editCustomer('${c.id}')"><i class="bi bi-pencil"></i></button>
          <button class="btn-danger-sm" onclick="Controller.deleteCustomer('${c.id}')"><i class="bi bi-trash"></i></button>
        </td>
      </tr>`;
    });
    $('#customerTableBody').html(html || '<tr><td colspan="6" class="text-center py-4" style="color:var(--text-secondary)">No customers found</td></tr>');
    $('#customerCount').text(list.length);
  },

  openCustomerModal(editId = null) {
    Model.editingId = editId;
    if (editId) {
      const c = Model.getCustomerById(editId);
      $('#custModalTitle').text('✏️ EDIT CUSTOMER');
      $('#custName').val(c.name);
      $('#custContact').val(c.contact);
      $('#custAddress').val(c.address);
      $('#custEmail').val(c.email || '');
    } else {
      $('#custModalTitle').text('➕ ADD CUSTOMER');
      $('#custForm')[0].reset();
    }
    $('#customerModal').addClass('show');
  },

  saveCustomer() {
    const name    = $('#custName').val().trim();
    const contact = $('#custContact').val().trim();
    const address = $('#custAddress').val().trim();
    const email   = $('#custEmail').val().trim();

    if (!name || !contact || !address) { View.showToast('Please fill required fields', 'error'); return; }
    if (!/^0\d{9}$/.test(contact)) { View.showToast('Invalid contact number (e.g. 0771234567)', 'error'); return; }

    if (Model.editingId) {
      const c = Model.getCustomerById(Model.editingId);
      Object.assign(c, { name, contact, address, email });
      View.showToast('Customer updated successfully', 'success');
    } else {
      Model.customers.push({ id: Model.nextCustomerId(), name, contact, address, email, points: 0 });
      View.showToast('Customer added successfully', 'success');
    }
    $('#customerModal').removeClass('show');
    this.renderCustomers();
  },

  editCustomer(id) { this.openCustomerModal(id); },

  deleteCustomer(id) {
    if (confirm('Delete this customer? This action cannot be undone.')) {
      Model.customers = Model.customers.filter(c => c.id !== id);
      this.renderCustomers();
      View.showToast('Customer deleted', 'info');
    }
  },

  // ── ITEMS ─────────────────────────────────────────────────
  renderItems(search = '', cat = '') {
    let list = Model.items;
    if (search) list = list.filter(i =>
      i.name.toLowerCase().includes(search.toLowerCase()) || i.code.toLowerCase().includes(search.toLowerCase())
    );
    if (cat) list = list.filter(i => i.category === cat);

    let html = '';
    list.forEach(item => {
      html += `<div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6">
        <div class="item-manage-card">
          ${item.image
            ? `<img src="${item.image}" class="item-manage-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
            : ''}
          <div class="item-manage-img-placeholder" style="${item.image ? 'display:none' : ''}">🛒</div>
          <div class="item-manage-info">
            <div class="item-manage-code">${item.code}</div>
            <div class="item-manage-name">${item.name}</div>
            <div class="item-manage-price">${View.formatCurrency(item.price)}</div>
            <div style="font-size:12px;color:var(--text-secondary)">Stock: ${item.qty} ${item.unit}
              ${item.qty < 30 ? '<span class="badge-modern badge-danger ms-1">Low</span>' : ''}</div>
            <div class="item-manage-actions">
              <button class="btn-warning-sm flex-fill" onclick="Controller.editItem('${item.id}')"><i class="bi bi-pencil"></i> Edit</button>
              <button class="btn-danger-sm" onclick="Controller.deleteItem('${item.id}')"><i class="bi bi-trash"></i></button>
            </div>
          </div>
        </div>
      </div>`;
    });
    $('#itemGrid').html(html || '<div class="col-12 text-center py-5" style="color:var(--text-secondary)">No items found</div>');
    $('#itemCount').text(list.length);
  },

  openItemModal(editId = null) {
    Model.editingId = editId;
    if (editId) {
      const item = Model.getItemById(editId);
      $('#itemModalTitle').text('✏️ EDIT ITEM');
      $('#iCode').val(item.code); $('#iName').val(item.name);
      $('#iCategory').val(item.category); $('#iPrice').val(item.price);
      $('#iQty').val(item.qty); $('#iUnit').val(item.unit);
      $('#iImage').val(item.image || '');
      $('#imgPreview').attr('src', item.image || '').toggle(!!item.image);
    } else {
      $('#itemModalTitle').text('➕ ADD ITEM');
      $('#itemForm')[0].reset();
      $('#imgPreview').hide();
    }
    $('#itemModal').addClass('show');
  },

  saveItem() {
    const code  = $('#iCode').val().trim();
    const name  = $('#iName').val().trim();
    const cat   = $('#iCategory').val();
    const price = parseFloat($('#iPrice').val());
    const qty   = parseInt($('#iQty').val());
    const unit  = $('#iUnit').val().trim();
    const image = $('#iImage').val().trim();

    if (!code || !name || !cat || isNaN(price) || isNaN(qty) || !unit) {
      View.showToast('Please fill all required fields', 'error'); return;
    }
    if (price <= 0) { View.showToast('Price must be greater than 0', 'error'); return; }
    if (qty < 0)    { View.showToast('Quantity cannot be negative', 'error'); return; }

    // Duplicate check
    if (!Model.editingId && Model.items.find(i => i.code === code)) {
      View.showToast('Item code already exists', 'error'); return;
    }

    if (Model.editingId) {
      const item = Model.getItemById(Model.editingId);
      Object.assign(item, { code, name, category: cat, price, qty, unit, image });
      View.showToast('Item updated', 'success');
    } else {
      Model.items.push({ id: Model.nextItemId(), code, name, category: cat, price, qty, unit, image });
      View.showToast('Item added', 'success');
    }
    $('#itemModal').removeClass('show');
    this.renderItems();
  },

  editItem(id) { this.openItemModal(id); },

  deleteItem(id) {
    if (confirm('Delete this item from inventory?')) {
      Model.items = Model.items.filter(i => i.id !== id);
      this.renderItems();
      View.showToast('Item deleted', 'info');
    }
  },

  previewImage() {
    const url = $('#iImage').val().trim();
    if (url) { $('#imgPreview').attr('src', url).show(); }
    else { $('#imgPreview').hide(); }
  },

  // ── ORDER PAGE ────────────────────────────────────────────
  renderOrderPage() {
    // Populate customer select
    let opts = '<option value="">— Select Customer —</option>';
    Model.customers.forEach(c => { opts += `<option value="${c.id}">${c.name} (${c.id})</option>`; });
    $('#orderCustomer').html(opts);

    this.renderOrderItemGrid();
    this.renderCart();
  },

  renderOrderItemGrid(search = '', cat = '') {
    let list = Model.items;
    if (search) list = list.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));
    if (cat) list = list.filter(i => i.category === cat);

    // Category filter pills
    const cats = [...new Set(Model.items.map(i => i.category))];
    let pills = `<button class="btn-outline-accent btn-sm me-1 mb-1 ${!cat ? 'active-pill' : ''}" onclick="Controller.renderOrderItemGrid('', '')">All</button>`;
    cats.forEach(c => {
      pills += `<button class="btn-outline-accent btn-sm me-1 mb-1 ${cat===c ? 'active-pill' : ''}" onclick="Controller.renderOrderItemGrid('', '${c}')">${c}</button>`;
    });
    $('#orderCatPills').html(pills);

    let html = '';
    list.forEach(item => {
      const inCart = Model.cart.find(ci => ci.itemId === item.id);
      html += `<div class="item-card ${item.qty === 0 ? 'out-of-stock' : ''}" onclick="Controller.addToCart('${item.id}')">
        ${item.image
          ? `<img src="${item.image}" class="item-card-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
          : ''}
        <div class="item-card-img-placeholder" style="${item.image ? 'display:none' : ''}">🛒</div>
        <div class="item-card-body">
          <div class="item-card-name">${item.name}</div>
          <div class="item-card-price">${View.formatCurrency(item.price)}</div>
          <div class="item-card-stock">${item.qty} ${item.unit} left</div>
        </div>
        <div class="item-select-overlay">
          ${inCart ? '<i class="bi bi-check2-circle" style="font-size:28px;position:relative;z-index:2;opacity:1"></i>' : '+'}
        </div>
      </div>`;
    });
    $('#orderItemGrid').html(html || '<div class="col-12 text-center py-4" style="color:var(--text-secondary)">No items</div>');
  },

  addToCart(itemId) {
    const item = Model.getItemById(itemId);
    if (!item || item.qty === 0) return;
    const existing = Model.cart.find(c => c.itemId === itemId);
    if (existing) {
      if (existing.qty < item.qty) { existing.qty++; }
      else { View.showToast('Max stock reached', 'warning'); return; }
    } else {
      Model.cart.push({ itemId, name: item.name, price: item.price, qty: 1, image: item.image, unit: item.unit });
    }
    this.renderCart();
    this.renderOrderItemGrid($('#orderSearch').val(), '');
  },

  changeCartQty(itemId, delta) {
    const ci = Model.cart.find(c => c.itemId === itemId);
    if (!ci) return;
    ci.qty += delta;
    if (ci.qty <= 0) Model.cart = Model.cart.filter(c => c.itemId !== itemId);
    this.renderCart();
  },

  removeFromCart(itemId) {
    Model.cart = Model.cart.filter(c => c.itemId !== itemId);
    this.renderCart();
  },

  renderCart() {
    if (Model.cart.length === 0) {
      $('#cartItems').html(`<div class="text-center py-4" style="color:var(--text-secondary);font-size:13px">
        <div style="font-size:36px;margin-bottom:10px">🛒</div>Select items to add to cart</div>`);
    } else {
      let html = '';
      Model.cart.forEach(ci => {
        html += `<div class="cart-item">
          <img src="${ci.image || ''}" class="cart-item-img" onerror="this.src=''" style="${ci.image ? '' : 'display:none'}">
          ${!ci.image ? '<div style="width:40px;height:40px;border-radius:8px;background:var(--accent-light);display:flex;align-items:center;justify-content:center;font-size:16px">🛒</div>' : ''}
          <div class="cart-item-name">${ci.name}</div>
          <div class="cart-qty-ctrl">
            <button class="qty-btn" onclick="Controller.changeCartQty('${ci.itemId}',-1)">−</button>
            <span class="qty-value">${ci.qty}</span>
            <button class="qty-btn" onclick="Controller.changeCartQty('${ci.itemId}',1)">+</button>
          </div>
          <div class="cart-item-total">${View.formatCurrency(ci.price * ci.qty)}</div>
          <button class="btn-danger-sm" onclick="Controller.removeFromCart('${ci.itemId}')"><i class="bi bi-x"></i></button>
        </div>`;
      });
      $('#cartItems').html(html);
    }
    this.updateCartTotals();
  },

  updateCartTotals() {
    const subtotal = Model.cart.reduce((s, ci) => s + ci.price * ci.qty, 0);
    const disc = parseFloat($('#orderDiscount').val()) || 0;
    const tax = subtotal * 0.1;
    const total = subtotal + tax - disc;
    $('#cartSubtotal').text(View.formatCurrency(subtotal));
    $('#cartTax').text(View.formatCurrency(tax));
    $('#cartDiscount').text(View.formatCurrency(disc));
    $('#cartTotal').text(View.formatCurrency(total));
    $('#cartCount').text(Model.cart.length);
  },

  placeOrder() {
    const custId = $('#orderCustomer').val();
    if (!custId) { View.showToast('Please select a customer', 'error'); return; }
    if (Model.cart.length === 0) { View.showToast('Cart is empty', 'error'); return; }

    const cust = Model.getCustomerById(custId);
    const subtotal = Model.cart.reduce((s, ci) => s + ci.price * ci.qty, 0);
    const disc = parseFloat($('#orderDiscount').val()) || 0;
    const tax = subtotal * 0.1;
    const total = subtotal + tax - disc;
    const now = new Date();

    // Deduct stock
    Model.cart.forEach(ci => {
      const item = Model.getItemById(ci.itemId);
      if (item) item.qty -= ci.qty;
    });

    // Add loyalty points
    cust.points += Math.floor(total / 100);

    const order = {
      id: Model.nextOrderId(),
      customerId: custId, customerName: cust.name,
      date: now.toISOString().split('T')[0],
      time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      status: 'Completed',
      items: Model.cart.map(ci => ({ itemId: ci.itemId, name: ci.name, qty: ci.qty, price: ci.price })),
      subtotal, tax, discount: disc, total
    };
    Model.orders.push(order);
    Model.cart = [];

    this.showOrderConfirmation(order, cust);
    View.showToast(`Order ${order.id} placed successfully!`, 'success');
  },

  showOrderConfirmation(order, cust) {
    let itemRows = order.items.map(i =>
      `<tr><td>${i.name}</td><td>${i.qty}</td><td>${View.formatCurrency(i.price)}</td><td>${View.formatCurrency(i.price * i.qty)}</td></tr>`
    ).join('');
    $('#confirmOrderId').text(order.id);
    $('#confirmCustomer').text(cust.name);
    $('#confirmDate').text(order.date + ' ' + order.time);
    $('#confirmSubtotal').text(View.formatCurrency(order.subtotal));
    $('#confirmTax').text(View.formatCurrency(order.tax));
    $('#confirmDiscount').text(View.formatCurrency(order.discount));
    $('#confirmTotal').text(View.formatCurrency(order.total));
    $('#confirmItems').html(itemRows);
    $('#confirmModal').addClass('show');
    this.renderOrderPage();
  },

  // ── ORDER HISTORY ─────────────────────────────────────────
  renderOrderHistory(search = '') {
    let list = [...Model.orders].reverse();
    if (search) list = list.filter(o =>
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase())
    );
    let html = '';
    list.forEach(o => {
      html += `<tr>
        <td><span class="order-id">${o.id}</span></td>
        <td>${o.customerName}</td>
        <td>${View.formatDate(o.date)} ${o.time}</td>
        <td>${o.items.length} item(s)</td>
        <td><span class="order-id">${View.formatCurrency(o.total)}</span></td>
        <td><span class="badge-modern badge-success">✓ ${o.status}</span></td>
        <td>
          <button class="order-expand-btn" onclick="Controller.toggleOrderDetail(this,'${o.id}')">
            <i class="bi bi-chevron-right"></i>
          </button>
        </td>
      </tr>
      <tr class="order-details-row" id="detail-${o.id}">
        <td colspan="7" class="order-details-cell">
          <div class="order-details-inner">
            <table class="table-modern" style="font-size:13px">
              <thead><tr><th>Item</th><th>Qty</th><th>Unit Price</th><th>Total</th></tr></thead>
              <tbody>${o.items.map(i => `<tr><td>${i.name}</td><td>${i.qty}</td><td>${View.formatCurrency(i.price)}</td><td>${View.formatCurrency(i.qty*i.price)}</td></tr>`).join('')}</tbody>
            </table>
            <div class="mt-2 text-end" style="font-size:13px">
              Subtotal: ${View.formatCurrency(o.subtotal)} | Tax: ${View.formatCurrency(o.tax)} | Discount: ${View.formatCurrency(o.discount)} | 
              <strong style="color:var(--accent)">Total: ${View.formatCurrency(o.total)}</strong>
            </div>
          </div>
        </td>
      </tr>`;
    });
    $('#orderHistoryBody').html(html || '<tr><td colspan="7" class="text-center py-4" style="color:var(--text-secondary)">No orders found</td></tr>');
  },

  toggleOrderDetail(btn, id) {
    const $row = $(`#detail-${id}`);
    const $btn = $(btn);
    $row.toggleClass('show');
    $btn.toggleClass('open');
  },

  // ── REPORTS ──────────────────────────────────────────────
  renderReports() {
    const rev = Model.getTotalRevenue();
    const avgOrder = Model.orders.length ? rev / Model.orders.length : 0;
    const topCust = (() => {
      const spent = {};
      Model.orders.forEach(o => { spent[o.customerName] = (spent[o.customerName] || 0) + o.total; });
      const top = Object.entries(spent).sort((a,b)=>b[1]-a[1])[0];
      return top ? top[0] : '-';
    })();
    const topItem = (() => {
      const sold = {};
      Model.orders.forEach(o => o.items.forEach(i => { sold[i.name] = (sold[i.name] || 0) + i.qty; }));
      const top = Object.entries(sold).sort((a,b)=>b[1]-a[1])[0];
      return top ? top[0] : '-';
    })();

    $('#repRevenue').text(View.formatCurrency(rev));
    $('#repOrders').text(Model.orders.length);
    $('#repAvgOrder').text(View.formatCurrency(avgOrder));
    $('#repTopCust').text(topCust);
    $('#repTopItem').text(topItem);
    $('#repLowStock').text(Model.getLowStockItems().length);

    this.renderReportCharts();
    this.renderLowStockTable();
  },

  renderReportCharts() {
    const c = this.getChartColors();
    const ms = Model.getMonthlySales();
    const ctx1 = document.getElementById('reportBarChart');
    if (ctx1) {
      if (reportBarChart) reportBarChart.destroy();
      reportBarChart = new Chart(ctx1, {
        type: 'bar',
        data: {
          labels: ms.labels,
          datasets: [{
            label: 'Monthly Revenue',
            data: ms.data,
            backgroundColor: c.bg,
            borderColor: c.accent,
            borderWidth: 2, borderRadius: 8
          }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { color: c.grid }, ticks: { color: c.text } },
            y: { grid: { color: c.grid }, ticks: { color: c.text, callback: v => 'Rs.'+v } }
          }
        }
      });
    }

    const cats = Model.getCategorySales();
    const ctx2 = document.getElementById('reportPieChart');
    if (ctx2) {
      if (reportPieChart) reportPieChart.destroy();
      const dark = $('html').attr('data-theme') === 'dark';
      const palette = dark ? ['#00e676','#40c4ff','#ffab40','#ea80fc','#ff6e40','#ccff90'] : ['#e63946','#457b9d','#2d6a4f','#e76f51','#8338ec','#06d6a0'];
      reportPieChart = new Chart(ctx2, {
        type: 'pie',
        data: { labels: Object.keys(cats), datasets: [{ data: Object.values(cats), backgroundColor: palette, borderWidth: 0 }] },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { position: 'bottom', labels: { color: c.text, font: { family: 'Rajdhani' } } } }
        }
      });
    }
  },

  renderLowStockTable() {
    const low = Model.getLowStockItems();
    let html = '';
    low.forEach(i => {
      const pct = Math.min(100, (i.qty / 50) * 100);
      html += `<tr>
        <td>${i.code}</td>
        <td>${i.name}</td>
        <td>${i.category}</td>
        <td>
          <div class="d-flex align-items-center gap-2">
            <span style="font-weight:700;color:${i.qty<10?'#dc3545':'#d4a017'}">${i.qty}</span>
            <div class="stock-bar" style="flex:1"><div class="stock-bar-fill" style="width:${pct}%;background:${i.qty<10?'#dc3545':'#d4a017'}"></div></div>
          </div>
        </td>
        <td><span class="badge-modern ${i.qty < 10 ? 'badge-danger' : 'badge-warning'}">${i.qty < 10 ? '🔴 Critical' : '🟡 Low'}</span></td>
      </tr>`;
    });
    $('#lowStockBody').html(html || '<tr><td colspan="5" class="text-center py-3" style="color:var(--text-secondary)">All items well stocked ✓</td></tr>');
  },

  // ── USERS ─────────────────────────────────────────────────
  renderUsers(search = '') {
    let list = Model.users;
    if (search) list = list.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.username.toLowerCase().includes(search.toLowerCase()));
    let html = '';
    list.forEach(u => {
      html += `<tr>
        <td><span class="order-id">${u.id}</span></td>
        <td><div class="d-flex align-items-center gap-2">
          <div class="user-row-avatar">${View.generateAvatar(u.name)}</div>
          <div><div style="font-weight:600">${u.name}</div><div style="font-size:11px;color:var(--text-secondary)">${u.email}</div></div>
        </div></td>
        <td><code style="font-size:12px;color:var(--accent)">${u.username}</code></td>
        <td><span class="badge-modern badge-info">${u.role}</span></td>
        <td><span class="badge-modern ${u.active ? 'badge-success' : 'badge-danger'}">${u.active ? '● Active' : '● Inactive'}</span></td>
        <td>
          <button class="btn-warning-sm me-1" onclick="Controller.editUser('${u.id}')"><i class="bi bi-pencil"></i></button>
          ${u.id !== Model.currentUser.id
            ? `<button class="btn-danger-sm" onclick="Controller.toggleUserStatus('${u.id}')">${u.active ? '🔒 Disable' : '🔓 Enable'}</button>`
            : '<span style="font-size:11px;color:var(--text-secondary)">(current)</span>'}
        </td>
      </tr>`;
    });
    $('#userTableBody').html(html);
  },

  openUserModal(editId = null) {
    Model.editingId = editId;
    if (editId) {
      const u = Model.users.find(x => x.id === editId);
      $('#userModalTitle').text('✏️ EDIT USER');
      $('#uName').val(u.name); $('#uUsername').val(u.username);
      $('#uEmail').val(u.email); $('#uRole').val(u.role);
      $('#uPassword').val('').attr('placeholder', 'Leave blank to keep');
    } else {
      $('#userModalTitle').text('➕ ADD USER');
      $('#userForm')[0].reset();
      $('#uPassword').attr('placeholder', 'Password');
    }
    $('#userModal').addClass('show');
  },

  saveUser() {
    const name     = $('#uName').val().trim();
    const username = $('#uUsername').val().trim();
    const email    = $('#uEmail').val().trim();
    const role     = $('#uRole').val();
    const password = $('#uPassword').val().trim();

    if (!name || !username || !email || !role) { View.showToast('Fill all required fields', 'error'); return; }
    if (!Model.editingId && !password) { View.showToast('Password required for new user', 'error'); return; }

    if (Model.editingId) {
      const u = Model.users.find(x => x.id === Model.editingId);
      Object.assign(u, { name, username, email, role });
      if (password) u.password = password;
      View.showToast('User updated', 'success');
    } else {
      if (Model.users.find(x => x.username === username)) { View.showToast('Username already exists', 'error'); return; }
      Model.users.push({ id: Model.nextUserId(), name, username, email, role, password, active: true });
      View.showToast('User added', 'success');
    }
    $('#userModal').removeClass('show');
    this.renderUsers();
  },

  editUser(id) { this.openUserModal(id); },

  toggleUserStatus(id) {
    const u = Model.users.find(x => x.id === id);
    u.active = !u.active;
    this.renderUsers();
    View.showToast(`User ${u.active ? 'enabled' : 'disabled'}`, 'info');
  }
};

// ─── CALCULATOR ────────────────────────────────────────────
function calcInput(v)  { Calc.input(v);       }
function calcOp(o)     { Calc.setOp(o);       }
function calcEquals()  { Calc.equals();        }
function calcClear()   { Calc.clear();         }
function calcBack()    { Calc.backspace();      }
function calcSign()    { Calc.toggleSign();    }
function calcPercent(){ Calc.setOp('%'); Calc.input('100'); Calc.equals(); }

// ─── DOCUMENT READY ────────────────────────────────────────
$(document).ready(function () {
  Controller.init();

  // Login
  $('#loginBtn').on('click', () => Controller.login());
  $('#loginPassword, #loginUsername').on('keypress', e => { if (e.key === 'Enter') Controller.login(); });

  // Sidebar nav
  $(document).on('click', '.nav-item[data-page]', function () {
    Controller.navigate($(this).data('page'));
  });

  // Theme
  $('#themeToggleBtn').on('click', () => Controller.toggleTheme());

  // Fullscreen
  $('#fullscreenBtn').on('click', () => Controller.toggleFullscreen());
  $(document).on('keydown', e => { if (e.key === 'F11') { e.preventDefault(); Controller.toggleFullscreen(); } });

  // Mobile sidebar
  $('#sidebarToggleBtn').on('click', () => {
    $('#sidebar').toggleClass('open');
    $('#sidebarOverlay').toggleClass('show');
  });
  $('#sidebarOverlay').on('click', () => {
    $('#sidebar').removeClass('open');
    $('#sidebarOverlay').removeClass('show');
  });

  // Logout
  $('#logoutBtn').on('click', () => Controller.logout());

  // Close modals on overlay click
  $(document).on('click', '.modal-overlay', function (e) {
    if ($(e.target).hasClass('modal-overlay')) $(this).removeClass('show');
  });
  $(document).on('click', '.modal-close', function () {
    $(this).closest('.modal-overlay').removeClass('show');
  });

  // Customer CRUD
  $('#addCustomerBtn').on('click', () => Controller.openCustomerModal());
  $('#saveCustomerBtn').on('click', () => Controller.saveCustomer());
  $('#customerSearch').on('input', function () { Controller.renderCustomers($(this).val()); });

  // Item CRUD
  $('#addItemBtn').on('click', () => Controller.openItemModal());
  $('#saveItemBtn').on('click', () => Controller.saveItem());
  $('#itemSearch').on('input', function () { Controller.renderItems($(this).val(), $('#itemCatFilter').val()); });
  $('#itemCatFilter').on('change', function () { Controller.renderItems($('#itemSearch').val(), $(this).val()); });
  $('#iImage').on('input', () => Controller.previewImage());

  // Order
  $('#orderSearch').on('input', function () { Controller.renderOrderItemGrid($(this).val()); });
  $('#placeOrderBtn').on('click', () => Controller.placeOrder());
  $('#orderDiscount').on('input', () => Controller.updateCartTotals());
  $('#clearCartBtn').on('click', () => { Model.cart = []; Controller.renderCart(); Controller.renderOrderItemGrid('', ''); });

  // Order history
  $('#historySearch').on('input', function () { Controller.renderOrderHistory($(this).val()); });

  // Users
  $('#addUserBtn').on('click', () => Controller.openUserModal());
  $('#saveUserBtn').on('click', () => Controller.saveUser());
  $('#userSearch').on('input', function () { Controller.renderUsers($(this).val()); });

  // Calculator
  $('#openCalcBtn').on('click', () => { $('#calcModal').addClass('show'); Calc.display(); });
  $(document).on('keydown', function (e) {
    if (!$('#calcModal').hasClass('show')) return;
    if (/\d/.test(e.key)) calcInput(e.key);
    if (e.key === '.') calcInput('.');
    if (e.key === '+') calcOp('+');
    if (e.key === '-') calcOp('-');
    if (e.key === '*') calcOp('×');
    if (e.key === '/') { e.preventDefault(); calcOp('÷'); }
    if (e.key === 'Enter' || e.key === '=') calcEquals();
    if (e.key === 'Backspace') calcBack();
    if (e.key === 'Escape') $('#calcModal').removeClass('show');
  });

  // Fullscreen change indicator
  document.addEventListener('fullscreenchange', () => {
    const $btn = $('#fullscreenBtn');
    if (document.fullscreenElement) {
      $btn.html('<i class="bi bi-fullscreen-exit"></i>');
    } else {
      $btn.html('<i class="bi bi-fullscreen"></i>');
    }
  });
});
