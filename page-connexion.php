<?php
/**
 * Template Name: Page Connexion
 * Page de connexion personnalisée (non WordPress par défaut)
 */
if (is_user_logged_in()) {
    wp_redirect(home_url('/'));
    exit;
}

$redirect_to = isset($_GET['redirect_to']) ? esc_url_raw($_GET['redirect_to']) : home_url('/');
$login_url = wp_login_url($redirect_to);
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connexion - École Convergence</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="<?php echo esc_url(get_stylesheet_uri()); ?>">
    <?php wp_head(); ?>
    <style>
        .login-page {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, rgba(44,90,160,0.75) 0%, rgba(26,58,110,0.8) 100%), url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&q=80') center/cover;
            padding: 40px 20px;
        }
        .login-card {
            background: white;
            border-radius: 16px;
            padding: 50px;
            max-width: 420px;
            width: 100%;
            box-shadow: 0 20px 60px rgba(0,0,0,0.2);
        }
        .login-card h1 {
            text-align: center;
            color: #2c5aa0;
            margin-bottom: 10px;
            font-size: 1.8rem;
        }
        .login-card .subtitle {
            text-align: center;
            color: #6c757d;
            margin-bottom: 30px;
        }
        .login-form .form-group {
            margin-bottom: 20px;
        }
        .login-form label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #333;
        }
        .login-form input {
            width: 100%;
            padding: 14px 16px;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 1rem;
        }
        .login-form input:focus {
            outline: none;
            border-color: #2c5aa0;
            box-shadow: 0 0 0 3px rgba(44,90,160,0.1);
        }
        .login-form .btn-login {
            width: 100%;
            padding: 14px;
            background: #2c5aa0;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            margin-top: 10px;
        }
        .login-form .btn-login:hover {
            background: #1a3a6e;
        }
        .login-links {
            text-align: center;
            margin-top: 25px;
        }
        .login-links a {
            color: #2c5aa0;
            text-decoration: none;
        }
        .login-links a:hover {
            text-decoration: underline;
        }
        .back-home {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            color: #2c5aa0;
            text-decoration: none;
            margin-bottom: 20px;
        }
        .back-home:hover {
            opacity: 1;
        }
        .login-advantages {
            margin-top: 30px;
            padding-top: 25px;
            border-top: 1px solid #e9ecef;
        }
        .login-advantages h4 {
            font-size: 0.95rem;
            color: #2c5aa0;
            margin-bottom: 15px;
        }
        .login-advantages ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .login-advantages li {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 0.9rem;
            color: #6c757d;
            margin-bottom: 8px;
        }
        .login-advantages li i {
            color: #4ecdc4;
            width: 20px;
        }
    </style>
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php
$groupe1_header_nav_active = '';
include get_template_directory() . '/header-template.php';
?>
    <div class="login-page">
        <div class="login-card">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="back-home">
                <i class="fas fa-arrow-left"></i> <span data-i18n="login.back">Retour à l'accueil</span>
            </a>
            <h1><i class="fas fa-graduation-cap"></i> Convergence</h1>
            <p class="subtitle" data-i18n="login.subtitle">Connectez-vous à votre espace étudiant</p>
            
            <form class="login-form" action="<?php echo esc_url($login_url); ?>" method="post">
                <input type="hidden" name="redirect_to" value="<?php echo esc_attr($redirect_to); ?>">
                <div class="form-group">
                    <label for="log" data-i18n="login.userLabel">Identifiant ou email</label>
                    <input type="text" name="log" id="log" required data-i18n-placeholder="login.userPh" placeholder="Votre identifiant">
                </div>
                <div class="form-group">
                    <label for="pwd" data-i18n="login.passLabel">Mot de passe</label>
                    <input type="password" name="pwd" id="pwd" required data-i18n-placeholder="login.passPh" placeholder="Votre mot de passe">
                </div>
                <div class="form-group">
                    <label style="font-weight: normal;">
                        <input type="checkbox" name="rememberme" value="forever"> <span data-i18n="login.remember">Se souvenir de moi</span>
                    </label>
                </div>
                <button type="submit" name="wp-submit" class="btn-login">
                    <i class="fas fa-sign-in-alt"></i> <span data-i18n="login.submit">Se connecter</span>
                </button>
            </form>
            
            <div class="login-links">
                <a href="<?php echo esc_url(wp_lostpassword_url()); ?>" data-i18n="login.forgot">Mot de passe oublié ?</a>
                <span style="margin: 0 10px;">|</span>
                <a href="<?php echo esc_url(wp_registration_url()); ?>" data-i18n="login.create">Créer un compte</a>
            </div>
            <div class="login-advantages">
                <h4><i class="fas fa-check-circle"></i> <span data-i18n="login.advantagesTitle">Avantages de la connexion</span></h4>
                <ul>
                    <li><i class="fas fa-book"></i> <span data-i18n="login.adv1">Accès aux formations et ressources</span></li>
                    <li><i class="fas fa-file-alt"></i> <span data-i18n="login.adv2">Suivi de vos candidatures</span></li>
                    <li><i class="fas fa-download"></i> <span data-i18n="login.adv3">Téléchargement des brochures</span></li>
                    <li><i class="fas fa-comments"></i> <span data-i18n="login.adv4">Échanges avec l'équipe pédagogique</span></li>
                </ul>
            </div>
        </div>
    </div>
<?php wp_footer(); ?>
</body>
</html>
