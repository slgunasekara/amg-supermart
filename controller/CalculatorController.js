// ============================================================
//  CALCULATOR CONTROLLER  (global scope)
// ============================================================
var Calc = {
    current: '0', prev: '', op: null, resetNext: false,

    display: function() {
        $('#calcVal').text(this.current);
        $('#calcExpr').text(this.prev + (this.op ? ' ' + this.op : ''));
    },
    input: function(v) {
        if (this.resetNext) { this.current = ''; this.resetNext = false; }
        if (v === '.' && this.current.includes('.')) return;
        if (this.current === '0' && v !== '.') this.current = v;
        else this.current += v;
        this.display();
    },
    setOp: function(o) { this.prev = this.current; this.op = o; this.resetNext = true; this.display(); },
    equals: function() {
        if (!this.op || !this.prev) return;
        var a = parseFloat(this.prev), b = parseFloat(this.current), r = 0;
        if (this.op === '+') r = a + b;
        if (this.op === '-') r = a - b;
        if (this.op === '×') r = a * b;
        if (this.op === '÷') r = b !== 0 ? a / b : 0;
        if (this.op === '%') r = a * (b / 100);
        this.current = String(parseFloat(r.toFixed(8)));
        this.prev = ''; this.op = null; this.resetNext = true;
        this.display();
    },
    clear:     function() { this.current = '0'; this.prev = ''; this.op = null; this.resetNext = false; this.display(); },
    backspace: function() { this.current = this.current.length > 1 ? this.current.slice(0,-1) : '0'; this.display(); },
    toggleSign:function() { this.current = String(-parseFloat(this.current)); this.display(); }
};

function calcInput(v)  { Calc.input(v); }
function calcOp(o)     { Calc.setOp(o); }
function calcEquals()  { Calc.equals(); }
function calcClear()   { Calc.clear(); }
function calcBack()    { Calc.backspace(); }
function calcSign()    { Calc.toggleSign(); }
function calcPercent() { Calc.setOp('%'); Calc.input('100'); Calc.equals(); }

$(document).ready(function() {
    $('#openCalcBtn').on('click', function(){ $('#calcModal').addClass('show'); Calc.display(); });
    $(document).on('keydown', function(e) {
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
