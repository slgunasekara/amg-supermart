// ============================================================
//  DB — Global data store (no ES modules)
// ============================================================
var users_db = [
    { id: 'U001', username: 'admin',  password: 'admin123',  name: 'Admin User',    role: 'Administrator', email: 'admin@amgsupermart.lk',  active: true  },
    { id: 'U002', username: 'kasun',  password: 'kasun123',  name: 'Kasun Perera',  role: 'Cashier',       email: 'kasun@amgsupermart.lk',  active: true  },
    { id: 'U003', username: 'nimali', password: 'nimali123', name: 'Nimali Silva',  role: 'Manager',       email: 'nimali@amgsupermart.lk', active: true  },
    { id: 'U004', username: 'amal',   password: 'amal123',   name: 'Amal Fernando', role: 'Cashier',       email: 'amal@amgsupermart.lk',   active: false }
];

var customers_db = [
    { id: 'C001', name: 'Sunil Bandara',     contact: '0771234567', address: 'Colombo 07',         email: 'sunil@example.com',  points: 450 },
    { id: 'C002', name: 'Priya Jayawardena', contact: '0782345678', address: 'Nugegoda',            email: 'priya@example.com',  points: 230 },
    { id: 'C003', name: 'Ravi Kumara',       contact: '0763456789', address: 'Kandy Road, Kegalle', email: 'ravi@example.com',   points: 120 },
    { id: 'C004', name: 'Dilini Fernando',   contact: '0754567890', address: 'Kadawatha',           email: 'dilini@example.com', points: 680 }
];

var items_db = [
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
];

var orders_db = [
    {
        id: 'ORD-001', customerId: 'C001', customerName: 'Sunil Bandara',
        date: '2025-04-10', time: '10:30 AM', status: 'Completed',
        items: [{ itemId: 'I001', name: 'Banana', qty: 2, price: 25.00 }, { itemId: 'I005', name: 'Rice (Samba)', qty: 5, price: 185.00 }],
        subtotal: 975.00, tax: 97.50, discount: 0, total: 1072.50
    },
    {
        id: 'ORD-002', customerId: 'C002', customerName: 'Priya Jayawardena',
        date: '2025-04-11', time: '02:15 PM', status: 'Completed',
        items: [{ itemId: 'I007', name: 'Milk (1L)', qty: 3, price: 230.00 }, { itemId: 'I009', name: 'Biscuits', qty: 5, price: 55.00 }],
        subtotal: 965.00, tax: 96.50, discount: 50, total: 1011.50
    },
    {
        id: 'ORD-003', customerId: 'C003', customerName: 'Ravi Kumara',
        date: '2025-04-15', time: '11:00 AM', status: 'Completed',
        items: [{ itemId: 'I002', name: 'Apple', qty: 1, price: 180.00 }, { itemId: 'I008', name: 'Orange Juice', qty: 2, price: 320.00 }],
        subtotal: 820.00, tax: 82.00, discount: 0, total: 902.00
    }
];

var cart_db   = [];
var current_user = null;
