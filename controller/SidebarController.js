//  SIDEBAR CONTROLLER
// ============================================================
$(document).ready(function () {
    // Force light mode — no localStorage used
    $('html').attr('data-theme', 'light');

    // Mobile sidebar toggle
    $('#sidebarToggleBtn').on('click', function () {
        $('#sidebar').toggleClass('open');
        $('#sidebarOverlay').toggleClass('show');
    });
    $('#sidebarOverlay').on('click', function () {
        $('#sidebar').removeClass('open');
        $('#sidebarOverlay').removeClass('show');
    });

    // Fullscreen
    $('#fullscreenBtn').on('click', function () {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(function () {});
        else document.exitFullscreen();
    });
    document.addEventListener('fullscreenchange', function () {
        $('#fullscreenBtn').html(document.fullscreenElement
            ? '<i class="bi bi-fullscreen-exit"></i>'
            : '<i class="bi bi-fullscreen"></i>');
    });
    $(document).on('keydown', function (e) {
        if (e.key === 'F11') { e.preventDefault(); $('#fullscreenBtn').trigger('click'); }
    });
});
