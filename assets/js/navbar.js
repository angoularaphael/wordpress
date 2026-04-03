/**
 * Gestion du menu utilisateur et navigation mobile
 */
document.addEventListener('DOMContentLoaded', function() {
    // Menu déroulant utilisateur connecté (clic pour mobile/touch)
    const userToggle = document.getElementById('userToggle');
    const userDropdown = document.querySelector('.user-dropdown');
    
    if (userToggle && userDropdown) {
        userToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            userDropdown.classList.toggle('open');
        });
        
        // Fermer au clic en dehors
        document.addEventListener('click', function() {
            userDropdown.classList.remove('open');
        });
        
        userDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // Menu mobile
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('show');
            mobileMenuBtn.innerHTML = mainNav.classList.contains('show') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        document.querySelectorAll('nav a').forEach(function(link) {
            link.addEventListener('click', function() {
                if (mainNav.classList.contains('show')) {
                    mainNav.classList.remove('show');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });
    }
});
