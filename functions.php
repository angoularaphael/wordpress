<?php
if (!defined('ABSPATH')) {
    exit;
}

// Charger la config email si config-email.php existe (optionnel)
$config_email = get_template_directory() . '/config-email.php';
if (file_exists($config_email)) {
    require_once $config_email;
}

function groupe1_convergence_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
}
add_action('after_setup_theme', 'groupe1_convergence_setup');

function groupe1_convergence_enqueue_assets() {
    $theme_dir = get_template_directory();
    $style_ver = file_exists($theme_dir . '/style.css') ? (string) filemtime($theme_dir . '/style.css') : '1.0.0';
    $dark_ver = file_exists($theme_dir . '/assets/css/dark-mode.css') ? (string) filemtime($theme_dir . '/assets/css/dark-mode.css') : '1.0.0';
    $navbar_ver = file_exists($theme_dir . '/assets/js/navbar.js') ? (string) filemtime($theme_dir . '/assets/js/navbar.js') : '1.0.0';
    $blog_ver = file_exists($theme_dir . '/assets/js/blog.js') ? (string) filemtime($theme_dir . '/assets/js/blog.js') : '1.0.0';
    $theme_lang_ver = file_exists($theme_dir . '/assets/js/theme-lang.js') ? (string) filemtime($theme_dir . '/assets/js/theme-lang.js') : '1.0.0';
    $anim_css_ver = file_exists($theme_dir . '/assets/css/animations.css') ? (string) filemtime($theme_dir . '/assets/css/animations.css') : '1.0.0';
    $anim_js_ver = file_exists($theme_dir . '/assets/js/animations.js') ? (string) filemtime($theme_dir . '/assets/js/animations.js') : '1.0.0';

    wp_enqueue_style(
        'groupe1-convergence-style',
        get_stylesheet_uri(),
        [],
        $style_ver
    );

    wp_enqueue_style(
        'groupe1-convergence-dark-mode',
        get_template_directory_uri() . '/assets/css/dark-mode.css',
        ['groupe1-convergence-style'],
        $dark_ver
    );

    wp_enqueue_style(
        'groupe1-convergence-animations',
        get_template_directory_uri() . '/assets/css/animations.css',
        ['groupe1-convergence-dark-mode'],
        $anim_css_ver
    );

    wp_enqueue_script(
        'groupe1-convergence-navbar',
        get_template_directory_uri() . '/assets/js/navbar.js',
        [],
        $navbar_ver,
        true
    );

    wp_enqueue_script(
        'groupe1-convergence-theme-lang',
        get_template_directory_uri() . '/assets/js/theme-lang.js',
        [],
        $theme_lang_ver,
        true
    );

    wp_enqueue_script(
        'groupe1-convergence-blog',
        get_template_directory_uri() . '/assets/js/blog.js',
        [],
        $blog_ver,
        true
    );

    wp_enqueue_script(
        'groupe1-convergence-animations',
        get_template_directory_uri() . '/assets/js/animations.js',
        [],
        $anim_js_ver,
        true
    );
}
add_action('wp_enqueue_scripts', 'groupe1_convergence_enqueue_assets');

/**
 * Applique thème / langue depuis localStorage avant le premier rendu (évite le flash).
 */
function groupe1_convergence_boot_theme_lang() {
    if (is_admin()) {
        return;
    }
    echo '<script>(function(){try{var d=document.documentElement;var t=localStorage.getItem("groupe1_theme");if(t==="dark"||t==="light")d.setAttribute("data-theme",t);var l=localStorage.getItem("groupe1_lang");if(l==="en"||l==="fr")d.setAttribute("lang",l);}catch(e){}})();</script>' . "\n";
}
add_action('wp_head', 'groupe1_convergence_boot_theme_lang', 1);

function groupe1_convergence_section_url($page_slug, $section = '') {
    $page_slug = trim((string) $page_slug);
    if ($page_slug === '' || $page_slug === 'home' || $page_slug === 'accueil') {
        $url = home_url('/');
    } else {
        $url = home_url('/' . trim($page_slug, '/') . '/');
    }

    if ($section !== '') {
        $url = add_query_arg('section', $section, $url);
    }

    return $url;
}

function groupe1_convergence_user_actions() {
    $login_url = home_url('/connexion/');
    $register_url = wp_registration_url();
    $logout_url = wp_logout_url(home_url('/'));

    if (is_user_logged_in()) {
        $user = wp_get_current_user();
        $display_name = trim($user->display_name) ?: trim($user->user_login) ?: $user->user_email ?: __('Mon compte', 'groupe1-convergence');
        $profile_url = get_edit_profile_url($user->ID);
        $avatar_url = get_avatar_url($user->ID, ['size' => 64]);

        echo '<div class="logged-actions">';
        echo '  <div class="user-dropdown">';
        echo '      <button class="user-toggle" id="userToggle" type="button">';
        if ($avatar_url) {
            echo '          <div class="user-avatar"><img src="' . esc_url($avatar_url) . '" alt="" class="user-avatar-img"></div>';
        } else {
            echo '          <div class="user-avatar"><i class="fas fa-user"></i></div>';
        }
        echo '          <span class="user-name">' . esc_html($display_name) . '</span>';
        echo '          <i class="fas fa-chevron-down"></i>';
        echo '      </button>';
        echo '      <div class="user-menu">';
        echo '          <a href="' . esc_url($profile_url) . '" class="user-menu-item">';
        echo '              <i class="fas fa-user-circle"></i> <span data-i18n="user.profile">Mon profil</span>';
        echo '          </a>';
        echo '          <a href="' . esc_url(home_url('/blog/')) . '" class="user-menu-item">';
        echo '              <i class="fas fa-newspaper"></i> <span data-i18n="user.articles">Mes articles</span>';
        echo '          </a>';
        if (current_user_can('edit_posts')) {
            echo '      <a href="' . esc_url(admin_url()) . '" class="user-menu-item admin-only">';
            echo '          <i class="fas fa-cog"></i> <span data-i18n="user.dashboard">Tableau de bord</span>';
            echo '      </a>';
        }
        echo '          <a href="' . esc_url($logout_url) . '" class="user-menu-item logout-btn">';
        echo '              <i class="fas fa-sign-out-alt"></i> <span data-i18n="user.logout">Déconnexion</span>';
        echo '          </a>';
        echo '      </div>';
        echo '  </div>';
        echo '</div>';
    } else {
        echo '<div class="guest-actions">';
        echo '  <a href="' . esc_url($login_url) . '" class="login-btn" id="loginBtn">';
        echo '      <i class="fas fa-sign-in-alt"></i> <span data-i18n="user.login">Connexion</span>';
        echo '  </a>';
        echo '  <a href="' . esc_url($register_url) . '" class="register-btn btn btn-small" id="registerBtn">';
        echo '      <i class="fas fa-user-plus"></i> <span data-i18n="user.register">Inscription</span>';
        echo '  </a>';
        echo '</div>';
    }
}

/**
 * Événements disponibles à l'inscription (clé technique = eventSlug côté API).
 */
function groupe1_convergence_get_event_catalog() {
    return [
        'jpo-toulouse' => [
            'label' => 'Journée portes ouvertes — Campus Toulouse',
            'city_key' => 'toulouse',
            'date_line' => 'Samedi 12 avril 2026 · 9h30 – 17h',
        ],
        'jpo-lyon' => [
            'label' => 'Journée portes ouvertes — Campus Lyon',
            'city_key' => 'lyon',
            'date_line' => 'Samedi 19 avril 2026 · 10h – 16h',
        ],
        'jpo-paris' => [
            'label' => 'Journée portes ouvertes — Campus Paris',
            'city_key' => 'paris',
            'date_line' => 'Samedi 26 avril 2026 · 10h – 16h30',
        ],
        'integration-nationale' => [
            'label' => 'Journée d\'intégration — Rentrée (tous les campus)',
            'city_key' => 'national',
            'date_line' => 'Vendredi 5 septembre 2026 · journée complète',
        ],
        'integration-bordeaux' => [
            'label' => 'Journée d\'intégration — Bordeaux & visio',
            'city_key' => 'bordeaux',
            'date_line' => 'Lundi 8 septembre 2026 · 9h – 17h',
        ],
        'atelier-marseille' => [
            'label' => 'Soirée « Métiers & alternance » — Marseille',
            'city_key' => 'marseille',
            'date_line' => 'Mercredi 14 mai 2026 · 18h – 20h',
        ],
        'permanence-lille' => [
            'label' => 'Permanence admissions & JPO sur rendez-vous — Lille',
            'city_key' => 'lille',
            'date_line' => 'Sur inscription (créneaux au choix)',
        ],
    ];
}

/**
 * Slugs d'événements proposés par ville (choix utilisateur).
 */
function groupe1_convergence_get_event_slugs_by_city() {
    return [
        'toulouse' => ['jpo-toulouse'],
        'lyon' => ['jpo-lyon'],
        'paris' => ['jpo-paris'],
        'national' => ['integration-nationale'],
        'bordeaux' => ['integration-bordeaux'],
        'marseille' => ['atelier-marseille'],
        'lille' => ['permanence-lille'],
    ];
}

function groupe1_convergence_get_event_catalog_public() {
    $out = [];
    foreach (groupe1_convergence_get_event_catalog() as $slug => $row) {
        $out[ $slug ] = [
            'label' => $row['label'],
            'date_line' => $row['date_line'],
            'city_key' => $row['city_key'],
        ];
    }
    return $out;
}

function groupe1_convergence_print_config() {
    $login_url = home_url('/connexion/');
    $current_user_data = null;

    if (is_user_logged_in()) {
        $user = wp_get_current_user();
        $role = !empty($user->roles) ? (string) $user->roles[0] : 'subscriber';
        $display_name = trim($user->display_name) ?: trim($user->user_login) ?: $user->user_email;

        $current_user_data = [
            'id' => (int) $user->ID,
            'name' => $display_name,
            'email' => (string) $user->user_email,
            'role' => $role,
            'avatar' => get_avatar_url($user->ID, ['size' => 96]),
        ];
    }

    $config = [
        'urls' => [
            'home' => home_url('/'),
            'formations' => home_url('/formations/'),
            'faq' => home_url('/faq/'),
            'contact' => home_url('/contact/'),
            'blog' => home_url('/blog/'),
            'login' => $login_url,
            'register' => wp_registration_url(),
            'logout' => wp_logout_url(home_url('/')),
        ],
        'sectionParam' => 'section',
        'apiContact' => apply_filters('groupe1_api_contact_url', rest_url('groupe1/v1/contact')),
        'apiEventInscription' => rest_url('groupe1/v1/event-inscription'),
        'apiMember' => rest_url('groupe1/v1/member/'),
        'apiBlogComments' => rest_url('groupe1/v1/blog-comments'),
        'restUrl' => rest_url(),
        'eventInscriptionByCity' => groupe1_convergence_get_event_slugs_by_city(),
        'eventCatalog' => groupe1_convergence_get_event_catalog_public(),
        'nonce' => wp_create_nonce('wp_rest'),
        'isLoggedIn' => is_user_logged_in(),
        'currentUser' => $current_user_data,
    ];

    echo '<script>window.groupe1ConvergenceConfig = ' . wp_json_encode($config) . ';</script>';
}
add_action('wp_head', 'groupe1_convergence_print_config');

// API REST pour le formulaire de contact
function groupe1_convergence_register_contact_rest() {
    register_rest_route('groupe1/v1', '/contact', [
        'methods' => 'POST',
        'callback' => 'groupe1_convergence_contact_callback',
        'permission_callback' => '__return_true',
        'args' => [
            'firstName' => ['required' => true, 'type' => 'string'],
            'lastName' => ['required' => true, 'type' => 'string'],
            'email' => ['required' => true, 'type' => 'string', 'format' => 'email'],
            'message' => ['required' => true, 'type' => 'string'],
            'phone' => ['required' => false, 'type' => 'string'],
            'status' => ['required' => false, 'type' => 'string'],
            'subject' => ['required' => false, 'type' => 'string'],
            'formation' => ['required' => false, 'type' => 'string'],
            'urgency' => ['required' => false, 'type' => 'string'],
            'messageTitle' => ['required' => false, 'type' => 'string'],
        ],
    ]);
}
add_action('rest_api_init', 'groupe1_convergence_register_contact_rest');

function groupe1_convergence_register_event_inscription_rest() {
    register_rest_route('groupe1/v1', '/event-inscription', [
        'methods' => 'POST',
        'callback' => 'groupe1_convergence_event_inscription_callback',
        'permission_callback' => '__return_true',
        'args' => [
            'firstName' => ['required' => true, 'type' => 'string'],
            'lastName' => ['required' => true, 'type' => 'string'],
            'email' => ['required' => true, 'type' => 'string', 'format' => 'email'],
            'phone' => ['required' => false, 'type' => 'string'],
            'eventSlug' => ['required' => true, 'type' => 'string'],
            'cityKey' => ['required' => true, 'type' => 'string'],
            'company_website' => ['required' => false, 'type' => 'string'],
        ],
    ]);
}
add_action('rest_api_init', 'groupe1_convergence_register_event_inscription_rest');

function groupe1_convergence_event_inscription_callback($request) {
    if (trim((string) $request->get_param('company_website')) !== '') {
        return new WP_REST_Response(['success' => true, 'reference' => '—'], 200);
    }

    $first_name = sanitize_text_field($request->get_param('firstName'));
    $last_name = sanitize_text_field($request->get_param('lastName'));
    $email = sanitize_email($request->get_param('email'));
    $phone = sanitize_text_field((string) ($request->get_param('phone') ?? ''));
    $event_slug = sanitize_key((string) $request->get_param('eventSlug'));
    $city_key = sanitize_key((string) $request->get_param('cityKey'));

    if ($first_name === '' || $last_name === '' || !$email || !is_email($email)) {
        return new WP_REST_Response(['success' => false, 'error' => 'Coordonnées invalides ou incomplètes'], 400);
    }

    $by_city = groupe1_convergence_get_event_slugs_by_city();
    if (!isset($by_city[ $city_key ]) || !is_array($by_city[ $city_key ])) {
        return new WP_REST_Response(['success' => false, 'error' => 'Ville non reconnue'], 400);
    }
    if (!in_array($event_slug, $by_city[ $city_key ], true)) {
        return new WP_REST_Response(['success' => false, 'error' => 'Cet événement n\'est pas disponible pour la ville choisie'], 400);
    }

    $catalog = groupe1_convergence_get_event_catalog();
    if (!isset($catalog[ $event_slug ]) || ($catalog[ $event_slug ]['city_key'] ?? '') !== $city_key) {
        return new WP_REST_Response(['success' => false, 'error' => 'Événement invalide'], 400);
    }

    $event = $catalog[ $event_slug ];
    $ref = 'EVT-' . strtoupper(substr(wp_generate_password(8, false, false), 0, 8));

    $city_labels = [
        'toulouse' => 'Toulouse',
        'lyon' => 'Lyon',
        'paris' => 'Paris',
        'marseille' => 'Marseille',
        'bordeaux' => 'Bordeaux',
        'lille' => 'Lille',
        'national' => 'Tous les campus',
    ];
    $city_label = $city_labels[ $city_key ] ?? $city_key;

    $user_html = '
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c5aa0;">École Convergence — Inscription enregistrée</h2>
        <p>Bonjour ' . esc_html($first_name) . ' ' . esc_html($last_name) . ',</p>
        <p>Nous avons bien enregistré votre participation à l\'événement suivant :</p>
        <p style="background:#f8f9fa;padding:16px;border-radius:8px;border-left:4px solid #4ecdc4;">
            <strong>' . esc_html($event['label']) . '</strong><br>
            <span style="color:#555;">' . esc_html($event['date_line']) . '</span><br>
            <span style="color:#555;">Ville / campus : <strong>' . esc_html($city_label) . '</strong></span>
        </p>
        <p>Vous recevrez un rappel ou des précisions pratiques par e-mail si nécessaire. Conservez votre référence : <strong>' . esc_html($ref) . '</strong></p>
        <p>En cas de question : <a href="mailto:contact@convergence-ecole.fr">contact@convergence-ecole.fr</a></p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="color: #6c757d; font-size: 0.9rem;">École Convergence — Formations numériques</p>
    </div>';

    $team_html = '
    <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h2 style="color: #2c5aa0;">Nouvelle inscription événement</h2>
        <p><strong>Référence :</strong> ' . esc_html($ref) . '</p>
        <p><strong>Événement :</strong> ' . esc_html($event['label']) . '</p>
        <p><strong>Date :</strong> ' . esc_html($event['date_line']) . '</p>
        <p><strong>Ville :</strong> ' . esc_html($city_label) . ' (' . esc_html($city_key) . ')</p>
        <p><strong>Participant :</strong> ' . esc_html($first_name) . ' ' . esc_html($last_name) . ' &lt;' . esc_html($email) . '&gt;</p>
        <p><strong>Téléphone :</strong> ' . esc_html($phone !== '' ? $phone : '—') . '</p>
    </div>';

    $email_user_addr = defined('CONVERGENCE_EMAIL_USER') ? CONVERGENCE_EMAIL_USER : (get_option('convergence_email_user') ?: '');
    $email_recipient = defined('CONVERGENCE_CONTACT_RECIPIENT') ? CONVERGENCE_CONTACT_RECIPIENT : (get_option('convergence_contact_recipient') ?: 'angoularaphael05@gmail.com');

    $headers = ['Content-Type: text/html; charset=UTF-8'];
    if ($email_user_addr) {
        $headers[] = 'From: École Convergence <' . $email_user_addr . '>';
    }

    $subject_user = '[Convergence] Confirmation — ' . $event['label'];
    $sent_user = wp_mail($email, $subject_user, $user_html, $headers);

    $sent_team = true;
    if ($email_recipient) {
        $sent_team = wp_mail(
            $email_recipient,
            '[Événement] Inscription ' . $ref . ' — ' . $city_label,
            $team_html,
            $headers
        );
    }

    $log = get_option('groupe1_event_inscriptions_log', []);
    if (!is_array($log)) {
        $log = [];
    }
    array_unshift($log, [
        'ref' => $ref,
        'time' => current_time('c'),
        'eventSlug' => $event_slug,
        'cityKey' => $city_key,
        'email' => $email,
        'name' => $first_name . ' ' . $last_name,
    ]);
    $log = array_slice($log, 0, 200);
    update_option('groupe1_event_inscriptions_log', $log, false);

    if (!$sent_user) {
        return new WP_REST_Response(['success' => false, 'error' => 'L\'envoi de l\'e-mail de confirmation a échoué. Vérifiez la configuration SMTP du site.'], 500);
    }

    return new WP_REST_Response([
        'success' => true,
        'reference' => $ref,
        'message' => 'Inscription enregistrée. Un e-mail de confirmation vous a été envoyé.',
        'teamNotified' => (bool) $sent_team,
    ], 200);
}

// API REST commentaires blog (persistants)
function groupe1_convergence_register_blog_comments_rest() {
    register_rest_route('groupe1/v1', '/blog-comments/(?P<article_id>\d+)', [
        'methods' => 'GET',
        'callback' => 'groupe1_convergence_get_blog_comments_callback',
        'permission_callback' => '__return_true',
    ]);

    register_rest_route('groupe1/v1', '/blog-comments', [
        'methods' => 'POST',
        'callback' => 'groupe1_convergence_post_blog_comment_callback',
        'permission_callback' => '__return_true',
        'args' => [
            'articleId' => ['required' => true, 'type' => 'integer'],
            'content' => ['required' => true, 'type' => 'string'],
            'guestName' => ['required' => false, 'type' => 'string'],
            'guestEmail' => ['required' => false, 'type' => 'string'],
        ],
    ]);
}
add_action('rest_api_init', 'groupe1_convergence_register_blog_comments_rest');

function groupe1_convergence_get_blog_comments_storage() {
    $stored = get_option('groupe1_blog_comments', []);
    return is_array($stored) ? $stored : [];
}

function groupe1_convergence_get_blog_comments_callback($request) {
    $article_id = (int) $request->get_param('article_id');
    if ($article_id <= 0) {
        return new WP_REST_Response(['success' => false, 'error' => 'Article invalide'], 400);
    }

    $all_comments = groupe1_convergence_get_blog_comments_storage();
    $comments = isset($all_comments[$article_id]) && is_array($all_comments[$article_id]) ? $all_comments[$article_id] : [];

    return new WP_REST_Response([
        'success' => true,
        'articleId' => $article_id,
        'comments' => array_values($comments),
    ], 200);
}

function groupe1_convergence_post_blog_comment_callback($request) {
    $article_id = (int) $request->get_param('articleId');
    $content = trim((string) $request->get_param('content'));
    $guest_name = trim((string) $request->get_param('guestName'));
    $guest_email = sanitize_email((string) $request->get_param('guestEmail'));

    if ($article_id <= 0) {
        return new WP_REST_Response(['success' => false, 'error' => 'Article invalide'], 400);
    }
    if ($content === '') {
        return new WP_REST_Response(['success' => false, 'error' => 'Le commentaire est vide'], 400);
    }
    if (strlen($content) > 500) {
        return new WP_REST_Response(['success' => false, 'error' => 'Le commentaire ne doit pas dépasser 500 caractères'], 400);
    }

    $author = '';
    $role_label = 'Visiteur';
    $user_color = '#6c757d';

    if (is_user_logged_in()) {
        $user = wp_get_current_user();
        $author = trim($user->display_name) ?: trim($user->user_login) ?: $user->user_email;
        $role_label = current_user_can('manage_options') ? 'Administrateur' : 'Étudiant';
        $user_color = current_user_can('manage_options') ? '#dc3545' : '#4ecdc4';
    } else {
        if ($guest_name === '') {
            return new WP_REST_Response(['success' => false, 'error' => 'Nom requis pour commenter'], 400);
        }
        $author = $guest_name;
        if ($guest_email && !is_email($guest_email)) {
            return new WP_REST_Response(['success' => false, 'error' => 'Email invité invalide'], 400);
        }
    }

    $initial = strtoupper(substr($author, 0, 1));
    if ($initial === '') {
        $initial = 'U';
    }

    $comment = [
        'id' => (int) round(microtime(true) * 1000),
        'articleId' => $article_id,
        'author' => $author,
        'userInitial' => $initial,
        'userColor' => $user_color,
        'role' => $role_label,
        'content' => sanitize_textarea_field($content),
        'date' => current_time('c'),
        'likes' => 0,
        'replies' => [],
    ];

    $all_comments = groupe1_convergence_get_blog_comments_storage();
    if (!isset($all_comments[$article_id]) || !is_array($all_comments[$article_id])) {
        $all_comments[$article_id] = [];
    }
    $all_comments[$article_id][] = $comment;
    update_option('groupe1_blog_comments', $all_comments, false);

    return new WP_REST_Response([
        'success' => true,
        'message' => 'Commentaire publié',
        'comment' => $comment,
    ], 201);
}

function groupe1_convergence_contact_callback($request) {
    $firstName = sanitize_text_field($request->get_param('firstName'));
    $lastName = sanitize_text_field($request->get_param('lastName'));
    $email = sanitize_email($request->get_param('email'));
    $message = sanitize_textarea_field($request->get_param('message'));
    $phone = sanitize_text_field($request->get_param('phone') ?? '');
    $status = sanitize_text_field($request->get_param('status') ?? '');
    $subject = sanitize_text_field($request->get_param('subject') ?? '');
    $formation = sanitize_text_field($request->get_param('formation') ?? '');
    $urgency = sanitize_text_field($request->get_param('urgency') ?? 'Normal');
    $messageTitle = sanitize_text_field($request->get_param('messageTitle') ?? '');

    if (!$email || !$message || !$firstName || !$lastName) {
        return new WP_REST_Response(['success' => false, 'error' => 'Champs obligatoires manquants'], 400);
    }

    $trackingNumber = 'CT-' . substr((string) time(), -8);

    $user_html = '
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c5aa0;">École Convergence - Confirmation de réception</h2>
        <p>Bonjour ' . esc_html($firstName) . ' ' . esc_html($lastName) . ',</p>
        <p>Nous avons bien reçu votre message concernant <strong>' . esc_html($subject) . '</strong>.</p>
        <p>Notre équipe vous répondra dans les plus brefs délais à l\'adresse <strong>' . esc_html($email) . '</strong>.</p>
        <p><strong>Votre numéro de suivi :</strong> ' . esc_html($trackingNumber) . '</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="color: #6c757d; font-size: 0.9rem;">École Convergence - Formations Numériques Innovantes</p>
    </div>';

    $team_html = '
    <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h2 style="color: #2c5aa0;">Nouveau message de contact</h2>
        <p><strong>De :</strong> ' . esc_html($firstName) . ' ' . esc_html($lastName) . ' &lt;' . esc_html($email) . '&gt;</p>
        <p><strong>Téléphone :</strong> ' . esc_html($phone ?: 'Non renseigné') . '</p>
        <p><strong>Statut :</strong> ' . esc_html($status ?: '-') . '</p>
        <p><strong>Sujet :</strong> ' . esc_html($subject) . '</p>
        <p><strong>Formation :</strong> ' . esc_html($formation ?: 'Non spécifique') . '</p>
        <p><strong>Urgence :</strong> ' . esc_html($urgency) . '</p>
        <p><strong>Titre :</strong> ' . esc_html($messageTitle) . '</p>
        <hr>
        <p><strong>Message :</strong></p>
        <p>' . nl2br(esc_html($message)) . '</p>
        <hr>
        <p><strong>Référence :</strong> ' . esc_html($trackingNumber) . '</p>
    </div>';

    $email_user = defined('CONVERGENCE_EMAIL_USER') ? CONVERGENCE_EMAIL_USER : (get_option('convergence_email_user') ?: '');
    $email_pass = defined('CONVERGENCE_EMAIL_PASS') ? CONVERGENCE_EMAIL_PASS : (get_option('convergence_email_pass') ?: '');
    $email_recipient = defined('CONVERGENCE_CONTACT_RECIPIENT') ? CONVERGENCE_CONTACT_RECIPIENT : (get_option('convergence_contact_recipient') ?: 'angoularaphael05@gmail.com');

    $headers = ['Content-Type: text/html; charset=UTF-8'];
    if ($email_user) {
        $headers[] = 'From: École Convergence <' . $email_user . '>';
    }

    $sent_user = wp_mail($email, '[Convergence] Message reçu - ' . $trackingNumber, $user_html, $headers);
    $sent_team = wp_mail($email_recipient, '[Contact] Nouveau message - ' . $messageTitle . ' - ' . $trackingNumber, $team_html, $headers);

    if (!$sent_user || !$sent_team) {
        return new WP_REST_Response(['success' => false, 'error' => 'Erreur lors de l\'envoi du message'], 500);
    }

    return new WP_REST_Response(['success' => true, 'trackingNumber' => $trackingNumber, 'message' => 'Message envoyé avec succès'], 200);
}

// API REST pour charger les infos des membres (équipe)
function groupe1_convergence_register_member_rest() {
    register_rest_route('groupe1/v1', '/member/(?P<id>[a-z]+)', [
        'methods' => 'GET',
        'callback' => 'groupe1_convergence_get_member_callback',
        'permission_callback' => '__return_true',
        'args' => ['id' => ['required' => true, 'type' => 'string']],
    ]);
}
add_action('rest_api_init', 'groupe1_convergence_register_member_rest');

function groupe1_convergence_get_member_callback($request) {
    $emoji_map = [
        'LANGUES' => '🌐',
        'COMPÉTENCES' => '💪',
        'SOFT SKILLS' => '✨',
        'CENTRES D' => '🎯',
        'EXPÉRIENCES' => '💼',
        'CERTIFICATIONS' => '🏆',
        'FORMATIONS' => '🎓',
    ];
    $member_files = ['antony' => 'antony', 'raphael' => 'raphael', 'eddy' => 'eddy', 'brad' => 'brad', 'davidson' => 'davidson'];
    $member = sanitize_text_field($request->get_param('id'));
    if (!isset($member_files[$member])) {
        return new WP_REST_Response(['success' => false, 'message' => 'Membre non trouvé'], 404);
    }
    $file_name = $member_files[$member];
    $base_paths = [
        get_template_directory() . '/teams/membre/',
        ABSPATH . 'teams/membre/',
        get_template_directory() . '/../teams/membre/',
        dirname(get_template_directory()) . '/teams/membre/',
    ];
    $content = null;
    $file_path = null;
    foreach ($base_paths as $base) {
        $path = $base . $file_name . '.txt';
        if (file_exists($path)) {
            $content = file_get_contents($path);
            $file_path = $path;
            break;
        }
    }
    if (!$content) {
        return new WP_REST_Response(['success' => false, 'message' => 'Fichier membre non trouvé'], 404);
    }
    $lines = explode("\n", $content);
    $parsed = [];
    foreach ($lines as $line) {
        $line = trim($line);
        if (empty($line)) continue;
        $is_section = preg_match('/^[A-ZÀÂÄÆÇÉÈÊËÏÎÔÖŒÚÙÛÜÝŸÑ\s\']+$/', $line) && strlen($line) > 3 && strpos($line, ':') === false;
        if ($is_section) {
            $emoji = '📌';
            foreach ($emoji_map as $key => $emoji_icon) {
                if (stripos($line, $key) !== false) {
                    $emoji = $emoji_icon;
                    break;
                }
            }
            $parsed[] = ['type' => 'section', 'content' => "$emoji $line"];
        } else {
            $parsed[] = ['type' => 'line', 'content' => htmlspecialchars($line, ENT_QUOTES, 'UTF-8')];
        }
    }
    return new WP_REST_Response(['success' => true, 'member' => $member, 'content' => $parsed], 200);
}

function groupe1_convergence_phpmailer_smtp($phpmailer) {
    $email_user = defined('CONVERGENCE_EMAIL_USER') ? CONVERGENCE_EMAIL_USER : get_option('convergence_email_user', '');
    $email_pass = defined('CONVERGENCE_EMAIL_PASS') ? CONVERGENCE_EMAIL_PASS : get_option('convergence_email_pass', '');
    if (!$email_user || !$email_pass) return;
    $phpmailer->isSMTP();
    $phpmailer->Host = 'smtp.gmail.com';
    $phpmailer->SMTPAuth = true;
    $phpmailer->Username = $email_user;
    $phpmailer->Password = str_replace(' ', '', $email_pass);
    $phpmailer->SMTPSecure = 'tls';
    $phpmailer->Port = 587;
}
add_action('phpmailer_init', 'groupe1_convergence_phpmailer_smtp');

/**
 * Bannière de consentement cookies (affichée sur tout le site via wp_footer).
 */
function groupe1_convergence_cookie_banner() {
    if (is_admin() || wp_doing_ajax()) {
        return;
    }
    $privacy_url = home_url('/politique-de-confidentialite/');
    ?>
    <div id="groupe1-cookie-banner" class="groupe1-cookie-banner" role="dialog" aria-live="polite" aria-label="Cookies" hidden>
        <div class="groupe1-cookie-inner">
            <p><span data-i18n="cookie.message">Nous utilisons des cookies et technologies similaires pour le fonctionnement du site, l’analyse d’audience et l’amélioration de votre expérience. En cliquant sur « Tout accepter », vous acceptez leur utilisation.</span></p>
            <div class="groupe1-cookie-actions">
                <a href="<?php echo esc_url($privacy_url); ?>"><span data-i18n="cookie.policy">Politique de confidentialité</span></a>
                <button type="button" class="groupe1-cookie-accept" id="groupe1-cookie-accept"><span data-i18n="cookie.accept">Tout accepter</span></button>
            </div>
        </div>
    </div>
    <script>
    (function() {
        var KEY = 'groupe1_cookie_consent_v1';
        var banner = document.getElementById('groupe1-cookie-banner');
        var btn = document.getElementById('groupe1-cookie-accept');
        if (!banner || !btn) return;
        try {
            if (window.localStorage.getItem(KEY) === '1') return;
        } catch (e) { return; }
        banner.removeAttribute('hidden');
        requestAnimationFrame(function() {
            banner.classList.add('is-visible');
        });
        btn.addEventListener('click', function() {
            try { localStorage.setItem(KEY, '1'); } catch (e2) {}
            banner.classList.remove('is-visible');
            setTimeout(function() {
                banner.setAttribute('hidden', '');
            }, 400);
        });
    })();
    </script>
    <?php
}
add_action('wp_footer', 'groupe1_convergence_cookie_banner', 99);

// Rediriger wp-login.php vers la page de connexion personnalisée
function groupe1_convergence_redirect_login() {
    if (empty($_POST) && !isset($_GET['action'])) {
        wp_redirect(home_url('/connexion/'));
        exit;
    }
}
add_action('login_init', 'groupe1_convergence_redirect_login');
