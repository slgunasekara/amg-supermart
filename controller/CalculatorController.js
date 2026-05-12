//  CALCULATOR CONTROLLER
// ============================================================
const Calc = {
    current: '0', prev: '', op: null, resetNext: false,

    display() {
        $('#calcVal').text(this.current);
        $('#calcExpr').text(this.prev + (this.op ? ' ' + this.op : ''));
    },
    input(v) {
        if (this.resetNext) { this.current = ''; this.resetNext = false; }
        if (v === '.' && this.current.includes('.')) return;
        this.current = (this.current === '0' && v !== '.') ? v : this.current + v;
        this.display();
    },
    setOp(o) { this.prev = this.current; this.op = o; this.resetNext = true; this.display(); },
    equals() {
        if (!this.op || !this.prev) return;
        const a = parseFloat(this.prev), b = parseFloat(this.current);
        const ops = { '+': a + b, '-': a - b, '×': a * b, '÷': b !== 0 ? a / b : 0 };
        this.current = String(parseFloat(ops[this.op].toFixed(8)));
        this.prev = ''; this.op = null; this.resetNext = true;
        this.display();
    },
    clear() { this.current = '0'; this.prev = ''; this.op = null; this.resetNext = false; this.display(); },
    backspace() { this.current = this.current.length > 1 ? this.current.slice(0, -1) : '0'; this.display(); },
    toggleSign() { this.current = String(-parseFloat(this.current)); this.display(); },
    // FIX: calcPercent now correctly divides current value by 100
    percent() { this.current = String(parseFloat(this.current) / 100); this.display(); }
};

function calcInput(v)   { Calc.input(v); }
function calcOp(o)      { Calc.setOp(o); }
function calcEquals()   { Calc.equals(); }
function calcClear()    { Calc.clear(); }
function calcBack()     { Calc.backspace(); }
function calcSign()     { Calc.toggleSign(); }
function calcPercent()  { Calc.percent(); }

$(document).ready(function () {
    $('#openCalcBtn').on('click', function () { $('#calcModal').addClass('show'); Calc.display(); });

    $(document).on('keydown', function (e) {
        if (!$('#calcModal').hasClass('show')) return;
        if (/\d/.test(e.key))          Calc.input(e.key);
        else if (e.key === '.')         Calc.input('.');
        else if (e.key === '+')         Calc.setOp('+');
        else if (e.key === '-')         Calc.setOp('-');
        else if (e.key === '*')         Calc.setOp('×');
        else if (e.key === '/') { e.preventDefault(); Calc.setOp('÷'); }
        else if (e.key === 'Enter' || e.key === '=') Calc.equals();
        else if (e.key === 'Backspace') Calc.backspace();
        else if (e.key === 'Escape')    $('#calcModal').removeClass('show');
    });
});
