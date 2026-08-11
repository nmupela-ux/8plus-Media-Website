/* =========================================================
   MOBILE NAVIGATION TOGGLE CONTROLLER
   ========================================================= */

(function() {
    const toggleBtn = document.getElementById('navToggle');
    const navMenu = document.getElementById('navLinks');

    if (toggleBtn && navMenu) {
        toggleBtn.addEventListener('click', function() {
            const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
            toggleBtn.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('is-active');
        });
    }
})();
