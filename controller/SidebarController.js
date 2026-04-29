// ============================================================
//  SIDEBAR CONTROLLER  (global scope)
// ============================================================
$(document).ready(function() {

    /* Mobile sidebar toggle */
    $('#sidebarToggleBtn').on('click', function() {
        $('#sidebar').toggleClass('open');
        $('#sidebarOverlay').toggleClass('show');
    });
    $('#sidebarOverlay').on('click', function() {
        $('#sidebar').removeClass('open');
        $('#sidebarOverlay').removeClass('show');
    });

    /* Theme toggle */
    function updateThemeBtn(theme) {
        $('#themeToggleBtn').html(theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode');
    }
    $('#themeToggleBtn').on('click', function() {
        var cur  = $('html').attr('data-theme');
        var next = (cur === 'dark') ? 'light' : 'dark';
        $('html').attr('data-theme', next);
        localStorage.setItem('amg_theme', next);
        updateThemeBtn(next);
        setTimeout(function() {
            if (typeof renderDashboard !== 'undefined' && $('#page-dashboard').hasClass('active')) renderDashboard();
            if (typeof renderReports   !== 'undefined' && $('#page-reports').hasClass('active'))   renderReports();
        }, 300);
    });

    /* Fullscreen */
    $('#fullscreenBtn').on('click', function() {
        if (!document.fullscreenElement) { document.documentElement.requestFullscreen().catch(function(){}); }
        else { document.exitFullscreen(); }
    });
    document.addEventListener('fullscreenchange', function() {
        $('#fullscreenBtn').html(document.fullscreenElement
            ? '<i class="bi bi-fullscreen-exit"></i>'
            : '<i class="bi bi-fullscreen"></i>');
    });
    $(document).on('keydown', function(e) {
        if (e.key === 'F11') { e.preventDefault(); $('#fullscreenBtn').trigger('click'); }
    });

    /* Apply saved theme */
    var saved = localStorage.getItem('amg_theme') || 'light';
    $('html').attr('data-theme', saved);
    updateThemeBtn(saved);
});
