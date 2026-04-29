// ============================================================
//  REGEX / VALIDATION UTILITIES  (global scope)
// ============================================================
var phone_regex   = /^[0]{1}[7]{1}[01245678]{1}[0-9]{7}$/;
var email_regex   = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

function check_phone(phone)     { return phone_regex.test(phone); }
function check_email(email)     { return email === '' || email_regex.test(email); }
function check_price(price)     { return !isNaN(price) && parseFloat(price) > 0; }
function check_qty(qty)         { return !isNaN(qty) && parseInt(qty) >= 0; }
function check_not_empty(val)   { return val !== null && val !== undefined && String(val).trim() !== ''; }
