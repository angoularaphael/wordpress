<?php
/**
 * En-tête du site (navigation, thème clair/sombre, FR/EN).
 * Avant inclusion : $groupe1_header_nav_active = 'home'|'formations'|'events'|'faq'|'contact'|'blog'|'teams'|''
 */
if (!defined('ABSPATH')) {
    exit;
}
$groupe1_nav = isset($groupe1_header_nav_active) ? (string) $groupe1_header_nav_active : '';
?>
    <header class="site-header">
        <div class="container header-container">
            <div class="logo">
                <a href="<?php echo esc_url(home_url('/')); ?>" class="logo-link">
                    <img src="<?php echo esc_url(get_template_directory_uri() . '/logo.png'); ?>" alt="Logo Convergence" class="logo-icon" style="width: 50px; height: 50px; border-radius: 50%;" data-i18n-alt="logo.alt">
                </a>
                <div class="logo-text">Conver<span>gence</span></div>
            </div>

            <div class="header-toolbar" role="toolbar" data-i18n-aria-label="ui.toolbarA11y">
                <div class="theme-switcher" role="group" data-i18n-aria-label="ui.themeGroupA11y">
                    <button type="button" class="theme-btn" id="groupe1ThemeLight" data-theme-pick="light" aria-pressed="false" data-i18n-title="ui.themeLight">
                        <i class="fas fa-sun" aria-hidden="true"></i><span class="visually-hidden" data-i18n="ui.themeLight">Clair</span>
                    </button>
                    <button type="button" class="theme-btn" id="groupe1ThemeDark" data-theme-pick="dark" aria-pressed="false" data-i18n-title="ui.themeDark">
                        <i class="fas fa-moon" aria-hidden="true"></i><span class="visually-hidden" data-i18n="ui.themeDark">Sombre</span>
                    </button>
                </div>
                <div class="lang-switcher" role="group" data-i18n-aria-label="ui.langGroupA11y">
                    <button type="button" class="lang-btn" id="groupe1LangFr" data-lang-pick="fr" lang="fr" aria-pressed="true">FR</button>
                    <button type="button" class="lang-btn" id="groupe1LangEn" data-lang-pick="en" lang="en" aria-pressed="false">EN</button>
                </div>
            </div>

            <button class="mobile-menu-btn" id="mobileMenuBtn" type="button" aria-expanded="false" aria-controls="mainNav" data-i18n-title="ui.menuOpen" data-i18n-aria-label="ui.menuOpen">
                <i class="fas fa-bars" aria-hidden="true"></i>
            </button>

            <nav class="site-nav" data-i18n-aria-label="nav.mainA11y">
                <ul id="mainNav">
                    <li><a href="<?php echo esc_url(home_url('/')); ?>" class="<?php echo $groupe1_nav === 'home' ? 'active' : ''; ?>"><span data-i18n="nav.home">Accueil</span></a></li>
                    <li><a href="<?php echo esc_url(home_url('/formations/')); ?>" class="<?php echo $groupe1_nav === 'formations' ? 'active' : ''; ?>"><span data-i18n="nav.programs">Formations</span></a></li>
                    <li><a href="<?php echo esc_url(groupe1_convergence_section_url('home', 'evenements')); ?>" class="<?php echo $groupe1_nav === 'events' ? 'active' : ''; ?>"><span data-i18n="nav.events">Événements</span></a></li>
                    <li><a href="<?php echo esc_url(home_url('/faq/')); ?>" class="<?php echo $groupe1_nav === 'faq' ? 'active' : ''; ?>"><span data-i18n="nav.faq">FAQ</span></a></li>
                    <li><a href="<?php echo esc_url(home_url('/contact/')); ?>" class="<?php echo $groupe1_nav === 'contact' ? 'active' : ''; ?>"><span data-i18n="nav.contact">Contact</span></a></li>
                    <li><a href="<?php echo esc_url(home_url('/blog/')); ?>" class="<?php echo $groupe1_nav === 'blog' ? 'active' : ''; ?>"><span data-i18n="nav.blog">Blog</span></a></li>
                    <li><a href="<?php echo esc_url(home_url('/teams/')); ?>" class="<?php echo $groupe1_nav === 'teams' ? 'active' : ''; ?>"><span data-i18n="nav.team">Équipe</span></a></li>
                </ul>
            </nav>

            <div class="user-actions" id="userActions">
                <?php groupe1_convergence_user_actions(); ?>
            </div>
        </div>
    </header>
