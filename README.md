# AMG Supermart POS — How to Run

## ⚠️ Important — index.html direct open කරන්න බෑ!

Browser security නිසා `index.html` file double-click කර direct open කළාම JS files load වෙන්නේ නෑ (404 error).  
**Local server එකක් හරහා run කළ යුතුයි.**

---

## ✅ Method 1 — Windows (Easiest)

1. ZIP file extract කරන්න
2. `START-SERVER.bat` file එක **double-click** කරන්න
3. Browser open කරලා යන්න → **http://localhost:5500**

---

## ✅ Method 2 — Mac / Linux

1. ZIP file extract කරන්න
2. Terminal open කරලා folder එකට යන්න:
   ```
   cd /path/to/AMG-Supermart-POS-modified
   ```
3. Script run කරන්න:
   ```
   bash START-SERVER.sh
   ```
4. Browser open කරලා යන්න → **http://localhost:5500**

---

## ✅ Method 3 — VS Code (Live Server Extension)

1. VS Code install කරන්න → https://code.visualstudio.com/
2. **Live Server** extension install කරන්න
3. Project folder VS Code වලින් open කරන්න
4. `index.html` right-click → **"Open with Live Server"**

---

## ✅ Method 4 — Python (Manual)

Python install කරලා තිබ්බොත්, project folder ඇතුළේ terminal open කර:

```bash
python -m http.server 5500
```

Browser → **http://localhost:5500**

---

## Login Credentials

| Username | Password   | Role          |
|----------|------------|---------------|
| admin    | admin123   | Administrator |
| amg      | amg123     | Administrator |
| mendis   | nmendis123 | Manager       |
| sampath  | sampath123 | Cashier       |

---

## Requirements

- Python 3.x **හෝ** Node.js installed on your computer
- Modern browser (Chrome, Firefox, Edge)
- Internet connection (Bootstrap, Chart.js CDN load වෙන්න)
