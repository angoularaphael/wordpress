/**
 * Thème clair / sombre et langue FR / EN (localStorage).
 */
(function () {
    'use strict';

    var STORAGE_THEME = 'groupe1_theme';
    var STORAGE_LANG = 'groupe1_lang';

    var T = {
        fr: {
            'logo.alt': 'Logo Convergence',
            'ui.themeLight': 'Clair',
            'ui.themeDark': 'Sombre',
            'ui.toolbarA11y': 'Préférences d’affichage',
            'ui.themeGroupA11y': 'Choix du thème',
            'ui.langGroupA11y': 'Choix de la langue',
            'ui.menuOpen': 'Ouvrir le menu',
            'nav.mainA11y': 'Navigation principale',
            'nav.home': 'Accueil',
            'nav.programs': 'Formations',
            'nav.events': 'Événements',
            'nav.faq': 'FAQ',
            'nav.contact': 'Contact',
            'nav.blog': 'Blog',
            'nav.team': 'Équipe',
            'user.profile': 'Mon profil',
            'user.articles': 'Mes articles',
            'user.dashboard': 'Tableau de bord',
            'user.logout': 'Déconnexion',
            'user.login': 'Connexion',
            'user.register': 'Inscription',
            'cookie.message': 'Nous utilisons des cookies et technologies similaires pour le fonctionnement du site, l’analyse d’audience et l’amélioration de votre expérience. En cliquant sur « Tout accepter », vous acceptez leur utilisation.',
            'cookie.policy': 'Politique de confidentialité',
            'cookie.accept': 'Tout accepter',
            'footer.aboutTitle': 'École Convergence',
            'footer.aboutText': 'Formations innovantes, pédagogie active, et insertion professionnelle garantie. Rejoignez notre communauté d’étudiants passionnés.',
            'footer.navTitle': 'Navigation',
            'footer.contactTitle': 'Contact rapide',
            'footer.servicesTitle': 'Services étudiants',
            'footer.linkHome': 'Accueil',
            'footer.linkPrograms': 'Formations',
            'footer.linkEvents': 'Événements',
            'footer.linkFaq': 'FAQ',
            'footer.linkContact': 'Contact',
            'footer.linkBlog': 'Blog étudiant',
            'footer.linkTeam': 'Équipe',
            'footer.linkBlog2': 'Blog étudiant',
            'footer.linkTeam2': 'Notre équipe',
            'footer.linkStages': 'Offres de stage',
            'footer.linkAlt': 'Alternances',
            'footer.linkSupport': 'Support étudiant',
            'footer.copyLine': '© 2023 École Convergence. Tous droits réservés.',
            'footer.linkLegal': 'Mentions légales',
            'footer.linkPrivacy': 'Politique de confidentialité',
            'hero.title': 'Formez-vous aux métiers d’avenir avec Convergence',
            'hero.subtitle': 'Développez vos compétences dans les domaines les plus porteurs du numérique grâce à nos formations innovantes en Santé, Tourisme, Business et Développement Web.',
            'hero.btnFormations': 'Découvrir nos formations',
            'hero.btnMeet': 'Réserver un entretien',
            'hero.stat1': 'Insertion professionnelle',
            'hero.stat2': 'Domaines d’expertise',
            'hero.stat3': 'Promotions actives',
            'hero.stat4': 'Satisfaction étudiante',
            'home.formationsTitle': 'Nos 4 Formations d’Excellence',
            'home.formationsSub': 'Découvrez nos programmes innovants conçus pour répondre aux besoins du marché actuel',
            'home.formationsBtnAll': 'Voir toutes nos formations',
            'login.back': 'Retour à l’accueil',
            'login.subtitle': 'Connectez-vous à votre espace étudiant',
            'login.userLabel': 'Identifiant ou email',
            'login.userPh': 'Votre identifiant',
            'login.passLabel': 'Mot de passe',
            'login.passPh': 'Votre mot de passe',
            'login.remember': 'Se souvenir de moi',
            'login.submit': 'Se connecter',
            'login.forgot': 'Mot de passe oublié ?',
            'login.create': 'Créer un compte',
            'login.advantagesTitle': 'Avantages de la connexion',
            'login.adv1': 'Accès aux formations et ressources',
            'login.adv2': 'Suivi de vos candidatures',
            'login.adv3': 'Téléchargement des brochures',
            'login.adv4': 'Échanges avec l’équipe pédagogique'
        },
        en: {
            'logo.alt': 'Convergence logo',
            'ui.themeLight': 'Light',
            'ui.themeDark': 'Dark',
            'ui.toolbarA11y': 'Display preferences',
            'ui.themeGroupA11y': 'Theme selection',
            'ui.langGroupA11y': 'Language selection',
            'ui.menuOpen': 'Open menu',
            'nav.mainA11y': 'Main navigation',
            'nav.home': 'Home',
            'nav.programs': 'Programs',
            'nav.events': 'Events',
            'nav.faq': 'FAQ',
            'nav.contact': 'Contact',
            'nav.blog': 'Blog',
            'nav.team': 'Team',
            'user.profile': 'My profile',
            'user.articles': 'My articles',
            'user.dashboard': 'Dashboard',
            'user.logout': 'Log out',
            'user.login': 'Log in',
            'user.register': 'Sign up',
            'cookie.message': 'We use cookies and similar technologies for the site to work, audience analytics, and to improve your experience. By clicking “Accept all”, you agree to their use.',
            'cookie.policy': 'Privacy policy',
            'cookie.accept': 'Accept all',
            'footer.aboutTitle': 'Convergence School',
            'footer.aboutText': 'Innovative training, active learning, and a strong employability focus. Join our community of motivated students.',
            'footer.navTitle': 'Navigation',
            'footer.contactTitle': 'Quick contact',
            'footer.servicesTitle': 'Student services',
            'footer.linkHome': 'Home',
            'footer.linkPrograms': 'Programs',
            'footer.linkEvents': 'Events',
            'footer.linkFaq': 'FAQ',
            'footer.linkContact': 'Contact',
            'footer.linkBlog': 'Student blog',
            'footer.linkTeam': 'Team',
            'footer.linkBlog2': 'Student blog',
            'footer.linkTeam2': 'Our team',
            'footer.linkStages': 'Internships',
            'footer.linkAlt': 'Work-study',
            'footer.linkSupport': 'Student support',
            'footer.copyLine': '© 2023 Convergence School. All rights reserved.',
            'footer.linkLegal': 'Legal notice',
            'footer.linkPrivacy': 'Privacy policy',
            'hero.title': 'Train for tomorrow’s careers with Convergence',
            'hero.subtitle': 'Build skills in high-demand digital fields with our innovative programs in Health, Tourism, Business, and Web Development.',
            'hero.btnFormations': 'Explore our programs',
            'hero.btnMeet': 'Book an interview',
            'hero.stat1': 'Employability rate',
            'hero.stat2': 'Fields of expertise',
            'hero.stat3': 'Active cohorts',
            'hero.stat4': 'Student satisfaction',
            'home.formationsTitle': 'Our 4 flagship programs',
            'home.formationsSub': 'Discover innovative curricula designed for today’s job market',
            'home.formationsBtnAll': 'View all programs',
            'login.back': 'Back to home',
            'login.subtitle': 'Sign in to your student area',
            'login.userLabel': 'Username or email',
            'login.userPh': 'Your username',
            'login.passLabel': 'Password',
            'login.passPh': 'Your password',
            'login.remember': 'Remember me',
            'login.submit': 'Sign in',
            'login.forgot': 'Forgot password?',
            'login.create': 'Create an account',
            'login.advantagesTitle': 'Benefits of signing in',
            'login.adv1': 'Access to courses and resources',
            'login.adv2': 'Track your applications',
            'login.adv3': 'Download brochures',
            'login.adv4': 'Chat with our teaching team'
        }
    };

    function getLang() {
        try {
            return localStorage.getItem(STORAGE_LANG) === 'en' ? 'en' : 'fr';
        } catch (e) {
            return 'fr';
        }
    }

    function getDict(lang) {
        return T[lang] || T.fr;
    }

    function applyTranslations(lang) {
        var dict = getDict(lang);
        document.documentElement.setAttribute('lang', lang === 'en' ? 'en' : 'fr');

        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var key = el.getAttribute('data-i18n');
            if (key && dict[key]) {
                el.textContent = dict[key];
            }
        });

        document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
            var key = el.getAttribute('data-i18n-alt');
            if (key && dict[key]) {
                el.setAttribute('alt', dict[key]);
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
            var key = el.getAttribute('data-i18n-placeholder');
            if (key && dict[key]) {
                el.setAttribute('placeholder', dict[key]);
            }
        });

        document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
            var key = el.getAttribute('data-i18n-title');
            if (key && dict[key]) {
                el.setAttribute('title', dict[key]);
            }
        });

        document.querySelectorAll('[data-i18n-aria-label]').forEach(function (el) {
            var key = el.getAttribute('data-i18n-aria-label');
            if (key && dict[key]) {
                el.setAttribute('aria-label', dict[key]);
            }
        });
    }

    function updateLangButtons(lang) {
        var fr = document.getElementById('groupe1LangFr');
        var en = document.getElementById('groupe1LangEn');
        if (fr) fr.setAttribute('aria-pressed', lang === 'fr' ? 'true' : 'false');
        if (en) en.setAttribute('aria-pressed', lang === 'en' ? 'true' : 'false');
    }

    function updateThemeButtons(theme) {
        var light = document.getElementById('groupe1ThemeLight');
        var dark = document.getElementById('groupe1ThemeDark');
        if (light) light.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
        if (dark) dark.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    }

    function setLang(lang) {
        if (lang !== 'en' && lang !== 'fr') return;
        try {
            localStorage.setItem(STORAGE_LANG, lang);
        } catch (e) { /* ignore */ }
        applyTranslations(lang);
        updateLangButtons(lang);
    }

    function setTheme(theme) {
        if (theme !== 'dark' && theme !== 'light') return;
        try {
            localStorage.setItem(STORAGE_THEME, theme);
        } catch (e) { /* ignore */ }
        document.documentElement.setAttribute('data-theme', theme);
        updateThemeButtons(theme);
    }

    function initTheme() {
        var stored = null;
        try {
            stored = localStorage.getItem(STORAGE_THEME);
        } catch (e) { /* ignore */ }
        if (stored === 'dark' || stored === 'light') {
            document.documentElement.setAttribute('data-theme', stored);
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
        updateThemeButtons(document.documentElement.getAttribute('data-theme') || 'light');
    }

    document.addEventListener('DOMContentLoaded', function () {
        initTheme();
        applyTranslations(getLang());
        updateLangButtons(getLang());

        document.getElementById('groupe1ThemeLight') && document.getElementById('groupe1ThemeLight').addEventListener('click', function () {
            setTheme('light');
        });
        document.getElementById('groupe1ThemeDark') && document.getElementById('groupe1ThemeDark').addEventListener('click', function () {
            setTheme('dark');
        });
        document.getElementById('groupe1LangFr') && document.getElementById('groupe1LangFr').addEventListener('click', function () {
            setLang('fr');
        });
        document.getElementById('groupe1LangEn') && document.getElementById('groupe1LangEn').addEventListener('click', function () {
            setLang('en');
        });
    });
})();
