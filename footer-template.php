<?php
/**
 * Footer réutilisable pour toutes les pages
 * Inclure avec: include('footer-template.php');
 */
?>
    <!-- Footer -->
    <footer>
        <div class="container">
            <div class="footer-container">
                <div class="footer-about">
                    <div class="footer-logo" data-i18n="footer.aboutTitle">École Convergence</div>
                    <p data-i18n="footer.aboutText">Formations innovantes, pédagogie active, et insertion professionnelle garantie. Rejoignez notre communauté d'étudiants passionnés.</p>
                    <div class="footer-social">
                        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><i class="fab fa-facebook-f"></i></a>
                        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"><i class="fab fa-twitter"></i></a>
                        <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin-in"></i></a>
                        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
                
                <div class="footer-links">
                    <h3 data-i18n="footer.navTitle">Navigation</h3>
                    <ul>
                        <li><a href="<?php echo esc_url(home_url('/')); ?>"><i class="fas fa-chevron-right"></i> <span data-i18n="footer.linkHome">Accueil</span></a></li>
                        <li><a href="<?php echo esc_url(home_url('/formations/')); ?>"><i class="fas fa-chevron-right"></i> <span data-i18n="footer.linkPrograms">Formations</span></a></li>
                        <li><a href="<?php echo esc_url(groupe1_convergence_section_url('home', 'evenements')); ?>"><i class="fas fa-chevron-right"></i> <span data-i18n="footer.linkEvents">Événements</span></a></li>
                        <li><a href="<?php echo esc_url(home_url('/faq/')); ?>"><i class="fas fa-chevron-right"></i> <span data-i18n="footer.linkFaq">FAQ</span></a></li>
                        <li><a href="<?php echo esc_url(home_url('/contact/')); ?>"><i class="fas fa-chevron-right"></i> <span data-i18n="footer.linkContact">Contact</span></a></li>
                        <li><a href="<?php echo esc_url(home_url('/blog/')); ?>"><i class="fas fa-chevron-right"></i> <span data-i18n="footer.linkBlog">Blog étudiant</span></a></li>
                        <li><a href="<?php echo esc_url(home_url('/teams/')); ?>"><i class="fas fa-chevron-right"></i> <span data-i18n="footer.linkTeam">Équipe</span></a></li>
                    </ul>
                </div>
                
                <div class="footer-contact">
                    <h3 data-i18n="footer.contactTitle">Contact rapide</h3>
                    <p><i class="fas fa-envelope"></i> contact@convergence-ecole.fr</p>
                    <p><i class="fas fa-phone"></i> 01 23 45 67 89</p>
                    <p><i class="fas fa-map-marker-alt"></i> 8 Impasse des Bosquets, 31100 Toulouse, France</p>
                    <p><i class="fas fa-clock"></i> Lun-Ven: 8h30-18h30</p>
                </div>
                
                <div class="footer-links">
                    <h3 data-i18n="footer.servicesTitle">Services étudiants</h3>
                    <ul>
                        <li><a href="<?php echo esc_url(home_url('/blog/')); ?>"><i class="fas fa-chevron-right"></i> <span data-i18n="footer.linkBlog2">Blog étudiant</span></a></li>
                        <li><a href="<?php echo esc_url(home_url('/teams/')); ?>"><i class="fas fa-chevron-right"></i> <span data-i18n="footer.linkTeam2">Notre équipe</span></a></li>
                        <li><a href="<?php echo esc_url(home_url('/formations/')); ?>"><i class="fas fa-chevron-right"></i> <span data-i18n="footer.linkStages">Offres de stage</span></a></li>
                        <li><a href="<?php echo esc_url(home_url('/formations/')); ?>"><i class="fas fa-chevron-right"></i> <span data-i18n="footer.linkAlt">Alternances</span></a></li>
                        <li><a href="<?php echo esc_url(home_url('/contact/')); ?>"><i class="fas fa-chevron-right"></i> <span data-i18n="footer.linkSupport">Support étudiant</span></a></li>
                    </ul>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p><span data-i18n="footer.copyLine">© 2023 École Convergence. Tous droits réservés.</span> | <a href="<?php echo esc_url(home_url('/mentions-legales/')); ?>" style="color: #aaa;"><span data-i18n="footer.linkLegal">Mentions légales</span></a> | <a href="<?php echo esc_url(home_url('/politique-de-confidentialite/')); ?>" style="color: #aaa;"><span data-i18n="footer.linkPrivacy">Politique de confidentialité</span></a></p>
            </div>
        </div>
    </footer>
