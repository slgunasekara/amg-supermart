//  REGEX / VALIDATION UTILITIES
// ============================================================
const phone_regex = /^0[7][01245678][0-9]{7}$/;
const email_regex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

function check_phone(phone)   { return phone_regex.test(phone); }
function check_email(email)   { return email === '' || email_regex.test(email); }
function check_price(price)   { return !isNaN(price) && parseFloat(price) > 0; }
function check_qty(qty)       { return !isNaN(qty) && parseInt(qty) >= 0; }
function check_not_empty(val) { return val !== null && val !== undefined && String(val).trim() !== ''; }
