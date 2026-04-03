
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact - École Convergence</title>
    <meta name="description" content="Contactez l'École Convergence : admissions, formations, partenariats, campus, et support étudiant.">
    <meta name="keywords" content="contact école Convergence, admissions, formations, campus, support étudiant">
    <meta name="author" content="École Convergence">

    <!-- Open Graph -->
    <meta property="og:title" content="Contact - École Convergence">
    <meta property="og:description" content="Contactez l'École Convergence : admissions, formations, partenariats, campus, et support étudiant.">
    <meta property="og:type" content="website">

    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📩</text></svg>">

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;600&display=swap" rel="stylesheet">

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <!-- Styles CSS -->
    <link rel="stylesheet" href="<?php echo esc_url(get_stylesheet_uri()); ?>">

    <style>
        /* ===== STYLES SPÉCIFIQUES À LA PAGE CONTACT ===== */
        
        /* Fil d'Ariane */
        .breadcrumb-nav {
            background-color: #f8f9fa;
            padding: 15px 0;
            border-bottom: 1px solid #e9ecef;
        }
        
        .breadcrumb {
            display: flex;
            list-style: none;
            padding: 0;
            margin: 0;
            flex-wrap: wrap;
        }
        
        .breadcrumb-item {
            display: flex;
            align-items: center;
        }
        
        .breadcrumb-item + .breadcrumb-item::before {
            content: "/";
            padding: 0 10px;
            color: #6c757d;
        }
        
        .breadcrumb-item a {
            color: #2c5aa0;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 0.9rem;
            transition: all 0.3s ease;
        }
        
        .breadcrumb-item a:hover {
            color: #ff6b35;
            text-decoration: underline;
        }
        
        .breadcrumb-item.active {
            color: #6c757d;
            font-size: 0.9rem;
        }
        
        /* Hero Contact */
        .contact-hero {
            background: linear-gradient(135deg, rgba(44,90,160,0.7) 0%, rgba(26,58,110,0.75) 100%), url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=80') center/cover;
            color: white;
            padding: 100px 0;
            text-align: center;
        }
        
        .contact-hero h1, .contact-hero p {
            color: white;
        }
        
        .contact-hero h1 {
            font-size: 3rem;
            margin-bottom: 20px;
        }
        
        .contact-hero p {
            font-size: 1.2rem;
            max-width: 800px;
            margin: 0 auto 30px;
            opacity: 0.9;
        }
        
        /* Cartes de contact */
        .contact-cards {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 30px;
            margin: 40px 0;
        }
        
        .contact-card {
            background-color: #f8f9fa;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            text-align: center;
            border-top: 4px solid #2c5aa0;
        }
        
        .contact-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
            border-top-color: #ff6b35;
        }
        
        .contact-card-icon {
            width: 70px;
            height: 70px;
            background: linear-gradient(135deg, #2c5aa0, #4ecdc4);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            color: white;
            font-size: 1.8rem;
        }
        .contact-card-icon.img-icon {
            background-size: cover;
            background-position: center;
        }

        .contact-card-icon.contact-card-img {
            background-size: cover;
            background-position: center;
        }
        
        .contact-card h3 {
            margin-bottom: 15px;
            color: #2c5aa0;
        }
        
        .contact-card p {
            color: #6c757d;
            margin-bottom: 15px;
            line-height: 1.6;
        }
        
        .contact-card .highlight {
            color: #2c5aa0;
            font-weight: 600;
            font-size: 1.1rem;
            margin-top: 10px;
            display: block;
        }
        
        /* Grid formulaire + carte */
        .contact-grid {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 40px;
            margin: 40px 0;
        }
        
        @media (max-width: 992px) {
            .contact-grid {
                grid-template-columns: 1fr;
            }
        }
        
        /* Formulaire de contact */
        .contact-form-container {
            background: white;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
            border: 1px solid #e9ecef;
        }
        
        .contact-form-header {
            margin-bottom: 30px;
            text-align: center;
        }
        
        .contact-form-header h2 {
            color: #2c5aa0;
            margin-bottom: 10px;
        }
        
        .contact-form-header p {
            color: #6c757d;
            font-size: 1.1rem;
        }
        
        .form-progress {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            margin-bottom: 30px;
        }
        
        .progress-step {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: #e9ecef;
            color: #6c757d;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            position: relative;
        }
        
        .progress-step.active {
            background: #2c5aa0;
            color: white;
        }
        
        .progress-step.completed {
            background: #4ecdc4;
            color: white;
        }
        
        .progress-line {
            flex: 1;
            height: 3px;
            background: #e9ecef;
            max-width: 60px;
        }
        
        .progress-line.active {
            background: #2c5aa0;
        }
        
        /* Étapes du formulaire */
        .form-step {
            display: none;
            animation: fadeIn 0.5s ease;
        }
        
        .form-step.active {
            display: block;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Carte et informations */
        .contact-info-box {
            background: white;
            border-radius: 12px;
            padding: 30px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
            border: 1px solid #e9ecef;
            height: fit-content;
            position: sticky;
            top: 100px;
        }
        
        .contact-info-box h3 {
            color: #2c5aa0;
            margin-bottom: 25px;
            padding-bottom: 15px;
            border-bottom: 2px solid #4ecdc4;
        }
        
        .map-placeholder {
            height: 200px;
            background: linear-gradient(135deg, #e9ecef, #f8f9fa);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #2c5aa0;
            font-size: 1.2rem;
            margin-bottom: 25px;
            overflow: hidden;
        }
        
        .contact-details {
            margin-bottom: 25px;
        }
        
        .contact-detail {
            display: flex;
            align-items: flex-start;
            gap: 15px;
            margin-bottom: 20px;
            padding-bottom: 20px;
            border-bottom: 1px solid #e9ecef;
        }
        
        .contact-detail:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
        }
        
        .contact-detail-icon {
            width: 45px;
            height: 45px;
            background: #2c5aa0;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.1rem;
            flex-shrink: 0;
        }
        
        .contact-detail-info h4 {
            margin-bottom: 5px;
            font-size: 1rem;
        }
        
        .contact-detail-info p {
            color: #6c757d;
            font-size: 0.95rem;
        }
        
        .contact-hours {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin-top: 25px;
        }
        
        .contact-hours h4 {
            color: #2c5aa0;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .contact-hours ul {
            list-style: none;
            padding: 0;
        }
        
        .contact-hours li {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #e9ecef;
            font-size: 0.95rem;
        }
        
        .contact-hours li:last-child {
            border-bottom: none;
        }
        
        /* FAQs de contact */
        .contact-faq {
            background: #f8f9fa;
            border-radius: 12px;
            padding: 40px;
            margin: 60px 0;
        }
        
        .contact-faq h2 {
            text-align: center;
            color: #2c5aa0;
            margin-bottom: 40px;
        }
        
        .faq-accordion {
            max-width: 800px;
            margin: 0 auto;
        }
        
        .faq-item {
            background: white;
            border-radius: 8px;
            margin-bottom: 15px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }
        
        .faq-question {
            padding: 20px;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: 600;
            color: #2c5aa0;
            transition: all 0.3s ease;
        }
        
        .faq-question:hover {
            background: #f8f9fa;
        }
        
        .faq-question i {
            transition: transform 0.3s ease;
        }
        
        .faq-question.active i {
            transform: rotate(180deg);
        }
        
        .faq-answer {
            padding: 0 20px;
            max-height: 0;
            overflow: hidden;
            transition: all 0.3s ease;
            border-top: 1px solid #e9ecef;
        }
        
        .faq-answer.show {
            padding: 20px;
            max-height: 500px;
        }
        
        /* Confirmation */
        .confirmation-message {
            text-align: center;
            padding: 40px;
            animation: fadeIn 0.5s ease;
        }
        
        .confirmation-icon {
            width: 100px;
            height: 100px;
            background: linear-gradient(135deg, #4ecdc4, #2c5aa0);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 30px;
            color: white;
            font-size: 2.5rem;
        }
        
        .confirmation-message h3 {
            color: #2c5aa0;
            margin-bottom: 15px;
        }
        
        .confirmation-message p {
            color: #6c757d;
            max-width: 600px;
            margin: 0 auto 30px;
            font-size: 1.1rem;
            line-height: 1.6;
        }
        
        /* Référencement vers blog */
        .blog-reference {
            background: linear-gradient(135deg, #2c5aa0, #1a3a6e);
            color: white;
            padding: 50px;
            border-radius: 12px;
            margin: 60px 0;
            text-align: center;
        }
        
        .blog-reference h3 {
            color: white;
            margin-bottom: 20px;
        }
        
        .blog-reference p {
            color: rgba(255, 255, 255, 0.9);
            max-width: 700px;
            margin: 0 auto 30px;
            font-size: 1.1rem;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .contact-hero {
                padding: 80px 0;
            }
            
            .contact-hero h1 {
                font-size: 2rem;
            }
            
            .contact-form-container,
            .contact-info-box {
                padding: 25px;
            }
            
            .contact-cards {
                grid-template-columns: 1fr;
            }
            
            .contact-faq {
                padding: 30px 20px;
            }
            
            .blog-reference {
                padding: 30px 20px;
            }
            
            .confirmation-message {
                padding: 30px 20px;
            }
        }
        
        /* Gestion utilisateurs dans header */
        .user-actions {
            margin-left: 20px;
        }
        
        .guest-actions {
            display: flex;
            gap: 10px;
            align-items: center;
        }
        
        .login-btn {
            color: #333;
            font-weight: 600;
            padding: 8px 16px;
            border-radius: 4px;
            transition: all 0.3s ease;
            text-decoration: none;
        }
        
        .login-btn:hover {
            color: #2c5aa0;
            background-color: #e9ecef;
        }
        
        .register-btn {
            background-color: #4ecdc4;
            color: white;
            padding: 8px 16px;
            border-radius: 4px;
            text-decoration: none;
            font-weight: 600;
        }
        
        .register-btn:hover {
            background-color: #2c5aa0;
            color: white;
        }
        
        /* Utilisateur connecté */
        .logged-actions {
            display: flex;
            align-items: center;
        }
        
        .user-dropdown {
            position: relative;
        }
        
        .user-toggle {
            display: flex;
            align-items: center;
            gap: 10px;
            background: none;
            border: 1px solid #ddd;
            border-radius: 25px;
            padding: 8px 15px;
            cursor: pointer;
            transition: all 0.3s ease;
            color: #333;
        }
        
        .user-toggle:hover {
            border-color: #2c5aa0;
            background-color: #e9ecef;
        }
        
        .user-avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background-color: #2c5aa0;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.9rem;
        }
        
        .user-name {
            font-weight: 600;
            font-size: 0.9rem;
        }
        
        .user-menu {
            position: absolute;
            top: 100%;
            right: 0;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            min-width: 200px;
            z-index: 1000;
            display: none;
            margin-top: 10px;
        }
        
        .user-dropdown:hover .user-menu {
            display: block;
        }
        
        .user-menu-item {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 12px 15px;
            color: #333;
            border-bottom: 1px solid #e9ecef;
            transition: all 0.3s ease;
            text-decoration: none;
        }
        
        .user-menu-item:last-child {
            border-bottom: none;
        }
        
        .user-menu-item:hover {
            background-color: #e9ecef;
            color: #2c5aa0;
            padding-left: 20px;
        }
        
        .user-menu-item.admin-only {
            border-top: 2px solid #4ecdc4;
        }
        
        .logout-btn {
            color: #dc3545;
        }
        
        .logout-btn:hover {
            color: #c82333;
            background-color: #f8d7da;
        }
        
        /* Messages */
        .user-message {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            background: white;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            display: flex;
            align-items: center;
            gap: 12px;
            z-index: 99999;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        }
        
        .user-message.show {
            opacity: 1;
            transform: translateX(0);
        }
        
        .user-message-success {
            border-left: 4px solid #28a745;
            color: #155724;
        }
        
        .user-message-success i {
            color: #28a745;
        }
        
        .user-message-error {
            border-left: 4px solid #dc3545;
            color: #721c24;
        }
        
        .user-message-error i {
            color: #dc3545;
        }
        
        @media (max-width: 768px) {
            .user-actions {
                margin-left: 0;
                margin-top: 15px;
                width: 100%;
                justify-content: center;
            }
            
            .guest-actions {
                flex-direction: column;
                width: 100%;
            }
            
            .login-btn, .register-btn {
                width: 100%;
                text-align: center;
            }
        }
    </style>
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php
$groupe1_header_nav_active = 'contact';
include get_template_directory() . '/header-template.php';
?>

    <!-- Fil d'Ariane -->
    <nav class="breadcrumb-nav">
        <div class="container">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <a href="<?php echo esc_url(home_url('/')); ?>">
                        <i class="fas fa-home"></i> Accueil
                    </a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                    Contact
                </li>
            </ol>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="contact-hero">
        <div class="container">
            <h1>Contactez l'École Convergence</h1>
            <p>Notre équipe est à votre écoute pour toutes vos questions concernant les admissions, les formations, les partenariats ou le support étudiant.</p>
            <div class="hero-buttons">
                <a href="<?php echo esc_url(groupe1_convergence_section_url('contact', 'contact-form')); ?>" class="btn" id="scrollToForm">
                    <i class="fas fa-paper-plane"></i> Écrire un message
                </a>
                <a href="<?php echo esc_url(groupe1_convergence_section_url('contact', 'contact-cards')); ?>" class="btn btn-secondary" id="scrollToContacts">
                    <i class="fas fa-phone-alt"></i> Nous appeler
                </a>
            </div>
        </div>
    </section>

    <!-- Section Pourquoi nous contacter -->
    <section style="padding: 60px 0; background: #fff;">
        <div class="container">
            <div class="section-header" style="text-align: center; margin-bottom: 50px;">
                <h2 style="color: #2c5aa0;">Pourquoi nous contacter ?</h2>
                <p style="max-width: 700px; margin: 0 auto; color: #6c757d;">Notre équipe est à votre disposition pour répondre à toutes vos questions et vous accompagner dans votre projet de formation.</p>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px;">
                <div style="background: #f8f9fa; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08); transition: transform 0.3s;">
                    <div style="height: 180px; background: url('https://images.unsplash.com/photo-1523240795612-9a1b722967ea?w=600&q=80') center/cover;"></div>
                    <div style="padding: 25px;">
                        <h3 style="color: #2c5aa0; margin-bottom: 12px;"><i class="fas fa-graduation-cap"></i> Conseils personnalisés</h3>
                        <p style="color: #6c757d; line-height: 1.6;">Bénéficiez d'un accompagnement sur mesure pour choisir la formation adaptée à votre profil et vos objectifs.</p>
                    </div>
                </div>
                <div style="background: #f8f9fa; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08); transition: transform 0.3s;">
                    <div style="height: 180px; background: url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80') center/cover;"></div>
                    <div style="padding: 25px;">
                        <h3 style="color: #2c5aa0; margin-bottom: 12px;"><i class="fas fa-euro-sign"></i> Financement</h3>
                        <p style="color: #6c757d; line-height: 1.6;">Découvrez les solutions de financement : CPF, aides régionales, prêts étudiants et facilités de paiement.</p>
                    </div>
                </div>
                <div style="background: #f8f9fa; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08); transition: transform 0.3s;">
                    <div style="height: 180px; background: url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80') center/cover;"></div>
                    <div style="padding: 25px;">
                        <h3 style="color: #2c5aa0; margin-bottom: 12px;"><i class="fas fa-handshake"></i> Partenariats</h3>
                        <p style="color: #6c757d; line-height: 1.6;">Entreprises et établissements : créez des partenariats avec Convergence pour vos recrutements et formations.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Cartes de contact -->
    <section id="contact-cards">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">Nos équipes à votre service</h2>
                <p class="section-subtitle">Choisissez le service adapté à votre demande</p>
            </div>
            
            <div class="contact-cards">
                <div class="contact-card">
                    <div class="contact-card-icon contact-card-img" style="background: url('https://images.unsplash.com/photo-1523240795612-9a1b722967ea?w=140&q=80') center/cover; width: 70px; height: 70px; border-radius: 50%; margin: 0 auto 20px;"></div>
                    <h3>Admissions & Orientation</h3>
                    <p>Informations sur les formations, candidatures, calendrier, journées portes ouvertes, et aides financières.</p>
                    <span class="highlight">admissions@convergence-ecole.fr</span>
                    <span class="highlight">01 23 45 67 89</span>
                </div>
                
                <div class="contact-card">
                    <div class="contact-card-icon contact-card-img" style="background: url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=140&q=80') center/cover; width: 70px; height: 70px; border-radius: 50%; margin: 0 auto 20px;"></div>
                    <h3>Entreprises & Partenariats</h3>
                    <p>Alternances, stages, recrutement de nos diplômés, formations sur mesure et partenariats entreprises.</p>
                    <span class="highlight">entreprises@convergence-ecole.fr</span>
                    <span class="highlight">01 23 45 67 90</span>
                </div>
                
                <div class="contact-card">
                    <div class="contact-card-icon contact-card-img" style="background: url('https://images.unsplash.com/photo-1556761175-b413da4baf72?w=200&q=80') center/cover;">
                    </div>
                    <h3>Support Étudiant</h3>
                    <p>Problèmes techniques sur les plateformes, documents administratifs, vie étudiante et services campus.</p>
                    <span class="highlight">support@convergence-ecole.fr</span>
                    <span class="highlight">01 23 45 67 91</span>
                </div>
                
                <div class="contact-card">
                    <div class="contact-card-icon contact-card-img" style="background: url('https://images.unsplash.com/photo-1562774053-701939374585?w=200&q=80') center/cover;">
                    </div>
                    <h3>Campus & Visites</h3>
                    <p>Visite du campus, localisation, accès, équipements, et informations pratiques pour les étudiants.</p>
                    <span class="highlight">8 Impasse des Bosquets, 31100 Toulouse</span>
                    <span class="highlight">Métro: Sciences-Po</span>
                </div>
            </div>
        </div>
    </section>

    <!-- Formulaire de contact + Informations -->
    <section id="contact-form">
        <div class="container">
            <div class="contact-grid">
                <!-- Formulaire multi-étapes -->
                <div class="contact-form-container">
                    <div class="contact-form-header">
                        <h2>Écrivez-nous directement</h2>
                        <p>Notre équipe vous répond sous 48h ouvrées.</p>
                    </div>
                    
                    <div class="form-progress">
                        <div class="progress-step active" id="step1">1</div>
                        <div class="progress-line"></div>
                        <div class="progress-step" id="step2">2</div>
                        <div class="progress-line"></div>
                        <div class="progress-step" id="step3">3</div>
                    </div>
                    
                    <!-- Étape 1: Informations personnelles -->
                    <div class="form-step active" id="step1-form">
                        <h3 style="margin-bottom: 20px; color: #2c5aa0;">Vos coordonnées</h3>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="firstName">Prénom *</label>
                                <input type="text" id="firstName" placeholder="Votre prénom" required>
                            </div>
                            <div class="form-group">
                                <label for="lastName">Nom *</label>
                                <input type="text" id="lastName" placeholder="Votre nom" required>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="email">Email *</label>
                                <input type="email" id="email" placeholder="votre@email.com" required>
                            </div>
                            <div class="form-group">
                                <label for="phone">Téléphone</label>
                                <input type="tel" id="phone" placeholder="01 23 45 67 89">
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="status">Vous êtes *</label>
                            <select id="status" required>
                                <option value="">Sélectionnez votre statut</option>
                                <option value="future-student">Futur étudiant</option>
                                <option value="current-student">Étudiant actuel</option>
                                <option value="parent">Parent</option>
                                <option value="teacher">Enseignant</option>
                                <option value="company">Entreprise</option>
                                <option value="other">Autre</option>
                            </select>
                        </div>
                        
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" id="resetStep1">
                                <i class="fas fa-redo"></i> Réinitialiser
                            </button>
                            <button type="button" class="btn" id="nextStep1">
                                Suivant <i class="fas fa-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Étape 2: Nature de la demande -->
                    <div class="form-step" id="step2-form">
                        <h3 style="margin-bottom: 20px; color: #2c5aa0;">Nature de votre demande</h3>
                        
                        <div class="form-group">
                            <label for="subject">Sujet *</label>
                            <select id="subject" required>
                                <option value="">Choisissez un sujet</option>
                                <option value="admissions">Admissions & inscriptions</option>
                                <option value="formations">Informations sur les formations</option>
                                <option value="alternance">Alternance & stages</option>
                                <option value="financement">Financement & aides</option>
                                <option value="international">Programmes internationaux</option>
                                <option value="technical">Problème technique</option>
                                <option value="partnership">Partenariat entreprise</option>
                                <option value="other">Autre demande</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="formation">Formation concernée</label>
                            <select id="formation">
                                <option value="">Non spécifique</option>
                                <option value="sante">Santé & Paramédical</option>
                                <option value="tourisme">Tourisme & Hôtellerie</option>
                                <option value="business">Business & Management</option>
                                <option value="devweb">Développement Web</option>
                                <option value="design">Design & UX/UI</option>
                                <option value="marketing">Marketing Digital</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="urgency">Niveau d'urgence</label>
                            <select id="urgency">
                                <option value="normal">Normal (réponse sous 48h)</option>
                                <option value="urgent">Urgent (réponse sous 24h)</option>
                                <option value="very-urgent">Très urgent (appelez-nous)</option>
                            </select>
                        </div>
                        
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" id="prevStep2">
                                <i class="fas fa-arrow-left"></i> Précédent
                            </button>
                            <button type="button" class="btn" id="nextStep2">
                                Suivant <i class="fas fa-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Étape 3: Message -->
                    <div class="form-step" id="step3-form">
                        <h3 style="margin-bottom: 20px; color: #2c5aa0;">Votre message</h3>
                        
                        <div class="form-group">
                            <label for="messageTitle">Titre du message *</label>
                            <input type="text" id="messageTitle" placeholder="Ex: Demande d'information sur la formation Dev Web" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="message">Message détaillé *</label>
                            <textarea id="message" rows="8" placeholder="Décrivez votre demande en détail..." required></textarea>
                            <div class="textarea-info">
                                <span class="char-count">0/2000 caractères</span>
                                <span class="format-hint">
                                    <i class="fas fa-lightbulb"></i> Soyez précis pour une réponse rapide
                                </span>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="attachment">Pièce jointe (optionnel)</label>
                            <input type="file" id="attachment" accept=".pdf,.doc,.docx,.jpg,.png">
                            <small style="color: #6c757d; display: block; margin-top: 5px;">Max 5MB - PDF, DOC, JPG ou PNG</small>
                        </div>
                        
                        <div class="form-group" style="margin-top: 30px;">
                            <label style="font-weight: normal;">
                                <input type="checkbox" id="newsletter" checked>
                                Je souhaite recevoir les actualités de Convergence
                            </label>
                        </div>
                        
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" id="prevStep3">
                                <i class="fas fa-arrow-left"></i> Précédent
                            </button>
                            <button type="submit" class="btn" id="submitContactForm">
                                <i class="fas fa-paper-plane"></i> Envoyer le message
                            </button>
                        </div>
                    </div>
                    
                    <!-- Confirmation -->
                    <div class="form-step" id="confirmation-form">
                        <div class="confirmation-message">
                            <div class="confirmation-icon">
                                <i class="fas fa-check"></i>
                            </div>
                            <h3>Message envoyé avec succès !</h3>
                            <p>Merci <strong id="confirmName"></strong> pour votre message concernant <strong id="confirmSubject"></strong>. Notre équipe <strong id="confirmTeam"></strong> vous répondra dans les plus brefs délais à l'adresse <strong id="confirmEmail"></strong>.</p>
                            <p>Votre numéro de suivi: <strong id="trackingNumber"></strong></p>
                            <div class="cta-buttons" style="margin-top: 30px;">
                                <a href="<?php echo esc_url(home_url('/')); ?>" class="btn btn-secondary">
                                    <i class="fas fa-home"></i> Retour à l'accueil
                                </a>
                                <a href="<?php echo esc_url(groupe1_convergence_section_url('contact', 'contact-form')); ?>" class="btn" id="newMessageBtn">
                                    <i class="fas fa-envelope"></i> Nouveau message
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Informations de contact -->
                <div class="contact-info-box">
                    <h3>Informations pratiques</h3>
                    
                    <div class="map-placeholder" id="mapPlaceholder" style="height: 280px; padding: 0; overflow: hidden; border-radius: 8px; position: relative;">
                        <a href="https://www.google.com/maps/search/?api=1&query=8+Impasse+des+Bosquets,+31100+Toulouse,+France" target="_blank" rel="noopener" style="display: block; text-decoration: none;">
                            <iframe src="https://www.openstreetmap.org/export/embed.html?bbox=1.42%2C43.58%2C1.47%2C43.62&layer=mapnik&marker=43.6047%2C1.4442" width="100%" height="220" style="border: 0; display: block;" allowfullscreen loading="lazy" title="Campus Toulouse"></iframe>
                            <div style="text-align: center; background: #f8f9fa; padding: 12px; border-top: 2px solid #2c5aa0;">
                                <strong style="color: #2c5aa0;">8 Impasse des Bosquets, 31100 Toulouse</strong>
                                <span style="display: block; font-size: 0.8rem; color: #2c5aa0; margin-top: 4px;"><i class="fas fa-external-link-alt"></i> Cliquez pour ouvrir sur Google Maps</span>
                            </div>
                        </a>
                    </div>
                    
                    <div class="contact-details">
                        <div class="contact-detail">
                            <div class="contact-detail-icon">
                                <i class="fas fa-map-marker-alt"></i>
                            </div>
                            <div class="contact-detail-info">
                                <h4>Adresse du campus</h4>
                                <p>8 Impasse des Bosquets<br>31100 Toulouse, France</p>
                            </div>
                        </div>
                        
                        <div class="contact-detail">
                            <div class="contact-detail-icon">
                                <i class="fas fa-phone"></i>
                            </div>
                            <div class="contact-detail-info">
                                <h4>Téléphone</h4>
                                <p>Standard: 01 23 45 67 89<br>Urgences: 01 23 45 67 88</p>
                            </div>
                        </div>
                        
                        <div class="contact-detail">
                            <div class="contact-detail-icon">
                                <i class="fas fa-envelope"></i>
                            </div>
                            <div class="contact-detail-info">
                                <h4>Email général</h4>
                                <p>contact@convergence-ecole.fr<br>Réponse sous 48h ouvrées</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="contact-hours">
                        <h4><i class="fas fa-clock"></i> Horaires d'ouverture</h4>
                        <ul>
                            <li><span>Lundi - Jeudi</span> <span>8h30 - 18h30</span></li>
                            <li><span>Vendredi</span> <span>8h30 - 17h30</span></li>
                            <li><span>Samedi</span> <span>9h - 13h</span></li>
                            <li><span>Dimanche</span> <span>Fermé</span></li>
                        </ul>
                    </div>
                    
                    <div style="margin-top: 25px; text-align: center;">
                        <a href="<?php echo esc_url(home_url('/faq/')); ?>" class="btn btn-small" style="width: 100%;">
                            <i class="fas fa-question-circle"></i> Consulter la FAQ
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- FAQ Contact -->
    <section class="contact-faq">
        <div class="container">
            <h2>Questions fréquentes sur le contact</h2>
            
            <div class="faq-accordion">
                <div class="faq-item">
                    <div class="faq-question" id="faq1">
                        <span>Quel est le délai de réponse moyen ?</span>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer" id="answer1">
                        <p>Nous nous engageons à répondre à toutes les demandes dans un délai de 48 heures ouvrées. Les demandes urgentes (sélectionnées dans le formulaire) sont traitées en priorité sous 24h.</p>
                    </div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question" id="faq2">
                        <span>Puis-je prendre rendez-vous pour une visite du campus ?</span>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer" id="answer2">
                        <p>Oui ! Vous pouvez demander une visite guidée du campus en sélectionnant "Campus & Visites" dans le formulaire de contact. Nous proposons des visites individuelles ou en petit groupe du lundi au vendredi.</p>
                    </div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question" id="faq3">
                        <span>Comment suivre ma demande après l'envoi du formulaire ?</span>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer" id="answer3">
                        <p>Vous recevrez un email de confirmation avec un numéro de suivi unique. Vous pouvez utiliser ce numéro pour suivre l'avancement de votre demande en contactant le support étudiant.</p>
                    </div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question" id="faq4">
                        <span>Proposez-vous un chat en direct ?</span>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer" id="answer4">
                        <p>Oui, un chat en direct est disponible du lundi au vendredi de 9h à 17h sur notre site. Il apparaît automatiquement en bas à droite de l'écran lorsqu'un conseiller est disponible.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Téléchargement brochures -->
    <section class="download-section" style="padding: 40px 0; background: #f8f9fa;">
        <div class="container">
            <h2 style="text-align: center; color: #2c5aa0; margin-bottom: 25px;">Télécharger nos brochures</h2>
            <p style="text-align: center; color: #6c757d; margin-bottom: 30px;">Découvrez nos formations en détail au format Markdown.</p>
            <div style="display: flex; flex-wrap: wrap; gap: 15px; justify-content: center;">
                <a href="<?php echo esc_url(get_template_directory_uri() . '/downloads/brochure-generale.md'); ?>" class="btn btn-small" download><i class="fas fa-file-download"></i> Brochure générale</a>
                <a href="<?php echo esc_url(get_template_directory_uri() . '/downloads/brochure-sante.md'); ?>" class="btn btn-small" download><i class="fas fa-file-download"></i> Santé</a>
                <a href="<?php echo esc_url(get_template_directory_uri() . '/downloads/brochure-tourisme.md'); ?>" class="btn btn-small" download><i class="fas fa-file-download"></i> Tourisme</a>
                <a href="<?php echo esc_url(get_template_directory_uri() . '/downloads/brochure-business.md'); ?>" class="btn btn-small" download><i class="fas fa-file-download"></i> Business</a>
                <a href="<?php echo esc_url(get_template_directory_uri() . '/downloads/brochure-devweb.md'); ?>" class="btn btn-small" download><i class="fas fa-file-download"></i> Dev Web</a>
                <a href="<?php echo esc_url(get_template_directory_uri() . '/downloads/brochure-recherche-stage.md'); ?>" class="btn btn-small" download><i class="fas fa-file-download"></i> Recherche stage</a>
                <a href="<?php echo esc_url(get_template_directory_uri() . '/downloads/brochure-linkedin-stage.md'); ?>" class="btn btn-small" download><i class="fas fa-file-download"></i> LinkedIn stage</a>
                <a href="<?php echo esc_url(get_template_directory_uri() . '/downloads/brochure-candidature-digitale.md'); ?>" class="btn btn-small" download><i class="fas fa-file-download"></i> Candidature digitale</a>
            </div>
        </div>
    </section>

    <!-- Référencement vers le blog -->
    <section class="blog-reference">
        <div class="container">
            <h3>Découvrez le blog étudiant Convergence</h3>
            <p>Retrouvez les témoignages d'étudiants, des conseils pratiques, et des articles rédigés par nos étudiants des formations Santé, Tourisme, Business et Développement Web.</p>
            <a href="<?php echo esc_url(home_url('/blog/')); ?>" class="btn" style="background: white; color: #2c5aa0; margin-top: 20px;">
                <i class="fas fa-newspaper"></i> Visiter le blog étudiant
            </a>
        </div>
    </section>

    <!-- Footer -->
    <?php include('footer-template.php'); ?>

    <!-- Scripts JavaScript -->
    
    <script>
        // ============================================
        // GESTION DU FORMULAIRE DE CONTACT DYNAMIQUE
        // ============================================
        
        document.addEventListener('DOMContentLoaded', function() {
            // Éléments du DOM
            const step1Form = document.getElementById('step1-form');
            const step2Form = document.getElementById('step2-form');
            const step3Form = document.getElementById('step3-form');
            const confirmationForm = document.getElementById('confirmation-form');
            
            const step1 = document.getElementById('step1');
            const step2 = document.getElementById('step2');
            const step3 = document.getElementById('step3');
            const progressLines = document.querySelectorAll('.progress-line');
            const line1 = progressLines[0];
            const line2 = progressLines[1];
            
            const nextStep1 = document.getElementById('nextStep1');
            const nextStep2 = document.getElementById('nextStep2');
            const prevStep2 = document.getElementById('prevStep2');
            const prevStep3 = document.getElementById('prevStep3');
            const submitForm = document.getElementById('submitContactForm');
            const resetStep1 = document.getElementById('resetStep1');
            const newMessageBtn = document.getElementById('newMessageBtn');
            
            const firstName = document.getElementById('firstName');
            const lastName = document.getElementById('lastName');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            const messageTitle = document.getElementById('messageTitle');
            const charCount = document.querySelector('.char-count');
            
            // Vérification que les éléments essentiels existent
            if (!step1Form || !step2Form || !step3Form || !nextStep1 || !nextStep2) {
                console.warn('Formulaire de contact: éléments non trouvés');
                return;
            }
            
            // Données du formulaire
            let formData = {
                step1: {},
                step2: {},
                step3: {}
            };
            
            // Gestionnaire de progression
            function goToStep(stepNumber) {
                // Masquer toutes les étapes

                step1Form.classList.remove('active');
                step2Form.classList.remove('active');
                step3Form.classList.remove('active');
                confirmationForm.classList.remove('active');
                
                // Mettre à jour la progression
                step1.classList.remove('active', 'completed');
                step2.classList.remove('active', 'completed');
                step3.classList.remove('active', 'completed');
                line1.classList.remove('active');
                line2.classList.remove('active');
                
                switch(stepNumber) {
                    case 1:
                        step1Form.classList.add('active');
                        step1.classList.add('active');
                        break;
                    case 2:
                        step2Form.classList.add('active');
                        step1.classList.add('completed');
                        step2.classList.add('active');
                        line1.classList.add('active');
                        break;
                    case 3:
                        step3Form.classList.add('active');
                        step1.classList.add('completed');
                        step2.classList.add('completed');
                        step3.classList.add('active');
                        line1.classList.add('active');
                        line2.classList.add('active');
                        break;
                    case 'confirmation':
                        confirmationForm.classList.add('active');
                        step1.classList.add('completed');
                        step2.classList.add('completed');
                        step3.classList.add('completed');
                        line1.classList.add('active');
                        line2.classList.add('active');
                        break;
                }
            }
            
            // Validation de l'étape 1
            function validateStep1() {
                if (!firstName || !lastName || !email) {
                    showMessage('Erreur: formulaire non chargé', 'error');
                    return false;
                }
                
                if (!firstName.value.trim() || !lastName.value.trim() || !email.value.trim()) {
                    showMessage('Veuillez remplir tous les champs obligatoires', 'error');
                    return false;
                }
                
                // Validation email simple
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email.value)) {
                    showMessage('Veuillez entrer une adresse email valide', 'error');
                    return false;
                }
                
                // Sauvegarder les données
                formData.step1 = {
                    firstName: firstName.value,
                    lastName: lastName.value,
                    email: email.value,
                    phone: document.getElementById('phone').value,
                    status: document.getElementById('status').value
                };
                
                return true;
            }
            
            // Validation de l'étape 2
            function validateStep2() {
                if (!subject) {
                    showMessage('Erreur: formulaire non chargé', 'error');
                    return false;
                }
                
                if (!subject.value) {
                    showMessage('Veuillez sélectionner un sujet', 'error');
                    return false;
                }
                
                // Sauvegarder les données
                formData.step2 = {
                    subject: subject.value,
                    formation: document.getElementById('formation').value,
                    urgency: document.getElementById('urgency').value
                };
                
                return true;
            }
            
            // Validation de l'étape 3
            function validateStep3() {
                if (!messageTitle || !message) {
                    showMessage('Erreur: formulaire non chargé', 'error');
                    return false;
                }
                
                if (!messageTitle.value.trim() || !message.value.trim()) {
                    showMessage('Veuillez remplir tous les champs obligatoires', 'error');
                    return false;
                }
                
                if (message.value.length < 20) {
                    showMessage('Votre message est trop court (minimum 20 caractères)', 'error');
                    return false;
                }
                
                // Sauvegarder les données
                formData.step3 = {
                    messageTitle: messageTitle.value,
                    message: message.value,
                    attachment: document.getElementById('attachment').files[0]?.name || '',
                    newsletter: document.getElementById('newsletter').checked
                };
                
                return true;
            }
            
            // Soumission du formulaire - API Nodemailer
            async function submitContactForm() {
                if (!validateStep3()) return;
                
                const payload = {
                    firstName: formData.step1.firstName,
                    lastName: formData.step1.lastName,
                    email: formData.step1.email,
                    phone: formData.step1.phone || '',
                    status: formData.step1.status || '',
                    subject: formData.step2.subject,
                    formation: formData.step2.formation || '',
                    urgency: formData.step2.urgency || 'normal',
                    messageTitle: formData.step3.messageTitle,
                    message: formData.step3.message
                };
                
                try {
                    const apiUrl = window.groupe1ConvergenceConfig?.apiContact || 'http://localhost:3001/api/contact';
                    
                    const response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });
                    
                    const data = await response.json();
                    const trackingNumber = data.trackingNumber || `CT-${Date.now().toString().slice(-8)}`;
                    
                    if (data.success) {
                        document.getElementById('confirmName').textContent = `${formData.step1.firstName} ${formData.step1.lastName}`;
                        document.getElementById('confirmSubject').textContent = getSubjectLabel(formData.step2.subject);
                        document.getElementById('confirmTeam').textContent = getTeamName(formData.step2.subject);
                        document.getElementById('confirmEmail').textContent = formData.step1.email;
                        document.getElementById('trackingNumber').textContent = trackingNumber;
                        goToStep('confirmation');
                        showMessage('Votre message a été envoyé avec succès ! Un email de confirmation vous a été envoyé.', 'success');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                        throw new Error(data.error || 'Erreur serveur');
                    }
                } catch (err) {
                    console.warn('API contact non disponible, confirmation locale:', err);
                    const trackingNumber = `CT-${Date.now().toString().slice(-8)}`;
                    document.getElementById('confirmName').textContent = `${formData.step1.firstName} ${formData.step1.lastName}`;
                    document.getElementById('confirmSubject').textContent = getSubjectLabel(formData.step2.subject);
                    document.getElementById('confirmTeam').textContent = getTeamName(formData.step2.subject);
                    document.getElementById('confirmEmail').textContent = formData.step1.email;
                    document.getElementById('trackingNumber').textContent = trackingNumber;
                    goToStep('confirmation');
                    showMessage('Votre message a été enregistré. Notre équipe vous contactera sous 48h.', 'success');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }
            
            // Afficher un message
            function showMessage(text, type = 'info') {
                const message = document.createElement('div');
                message.className = `user-message user-message-${type}`;
                message.innerHTML = `
                    <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                    ${text}
                `;
                
                document.body.appendChild(message);
                
                setTimeout(() => {
                    message.classList.add('show');
                }, 10);
                
                setTimeout(() => {
                    message.classList.remove('show');
                    setTimeout(() => message.remove(), 300);
                }, 3000);
            }
            
            // Obtenir le label d'un sujet
            function getSubjectLabel(subjectValue) {
                const subjects = {
                    'admissions': 'les admissions et inscriptions',
                    'formations': 'les formations',
                    'alternance': 'l\'alternance et les stages',
                    'financement': 'le financement et les aides',
                    'international': 'les programmes internationaux',
                    'technical': 'un problème technique',
                    'partnership': 'un partenariat entreprise',
                    'other': 'une autre demande'
                };
                return subjects[subjectValue] || subjectValue;
            }
            
            // Obtenir le nom de l'équipe
            function getTeamName(subjectValue) {
                const teams = {
                    'admissions': 'Admissions',
                    'formations': 'Formations',
                    'alternance': 'Relations entreprises',
                    'financement': 'Administration',
                    'international': 'International',
                    'technical': 'Support technique',
                    'partnership': 'Partenariats',
                    'other': 'Support général'
                };
                return teams[subjectValue] || 'Support';
            }
            
            // Compteur de caractères
            if (message) {
                message.addEventListener('input', function() {
                    const length = this.value.length;
                    if (charCount) {
                        charCount.textContent = `${length}/2000 caractères`;
                        
                        if (length > 1800) {
                            charCount.style.color = '#dc3545';
                        } else if (length > 1500) {
                            charCount.style.color = '#ffc107';
                        } else {
                            charCount.style.color = '#666';
                        }
                    }
                });
            }
            
            // Gestionnaire d'événements FAQ
            document.querySelectorAll('.faq-question').forEach(question => {
                question.addEventListener('click', function() {
                    const answerId = this.id.replace('faq', 'answer');
                    const answer = document.getElementById(answerId);
                    
                    // Fermer toutes les autres réponses
                    document.querySelectorAll('.faq-answer').forEach(a => {
                        if (a !== answer) {
                            a.classList.remove('show');
                            a.previousElementSibling.classList.remove('active');
                        }
                    });
                    
                    // Basculer la réponse actuelle
                    answer.classList.toggle('show');
                    this.classList.toggle('active');
                });
            });
            
            // Événements de navigation
            if (nextStep1) {
                nextStep1.addEventListener('click', function() {
                    if (validateStep1()) {
                        goToStep(2);
                    }
                });
            }
            
            if (nextStep2) {
                nextStep2.addEventListener('click', function() {
                    if (validateStep2()) {
                        goToStep(3);
                    }
                });
            }
            
            if (prevStep2) {
                prevStep2.addEventListener('click', function() {
                    goToStep(1);
                });
            }
            
            if (prevStep3) {
                prevStep3.addEventListener('click', function() {
                    goToStep(2);
                });
            }
            
            if (submitForm) {
                submitForm.addEventListener('click', submitContactForm);
            }
            
            if (resetStep1) {
                resetStep1.addEventListener('click', function() {
                    if (document.getElementById('step1-form')) {
                        document.getElementById('step1-form').querySelectorAll('input, select').forEach(input => {
                            if (input.type !== 'button') {
                                input.value = '';
                            }
                        });
                    }
                    showMessage('Formulaire réinitialisé', 'info');
                });
            }
            
            if (newMessageBtn) {
                newMessageBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Réinitialiser le formulaire
                    document.querySelectorAll('.contact-form-container input, .contact-form-container select, .contact-form-container textarea').forEach(input => {
                        if (input.type !== 'button') {
                            input.value = '';
                        }
                    });
                    
                    // Réinitialiser les données
                    formData = { step1: {}, step2: {}, step3: {} };
                    
                    // Retourner à l'étape 1
                    goToStep(1);
                    
                    // Faire défiler vers le formulaire
                    const contactForm = document.getElementById('contact-form');
                    if (contactForm) {
                        contactForm.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            }
            
            // Gestion du menu mobile
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            const mainNav = document.getElementById('mainNav');
            
            if (mobileMenuBtn) {
                mobileMenuBtn.addEventListener('click', () => {
                    mainNav.classList.toggle('show');
                    mobileMenuBtn.innerHTML = mainNav.classList.contains('show') 
                        ? '<i class="fas fa-times"></i>' 
                        : '<i class="fas fa-bars"></i>';
                });
            }
            
            // Fermer le menu mobile en cliquant sur un lien
            document.querySelectorAll('nav a').forEach(link => {
                link.addEventListener('click', () => {
                    if (mainNav && mainNav.classList.contains('show')) {
                        mainNav.classList.remove('show');
                        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                });
            });
            
            // Scroll vers les sections
            document.getElementById('scrollToForm').addEventListener('click', function(e) {
                e.preventDefault();
                document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' });
            });
            
            document.getElementById('scrollToContacts').addEventListener('click', function(e) {
                e.preventDefault();
                document.getElementById('contact-cards').scrollIntoView({ behavior: 'smooth' });
            });

            // Appliquer la section depuis l'URL (?section=...)
            const sectionParam = new URLSearchParams(window.location.search).get('section');
            if (sectionParam) {
                const targetElement = document.getElementById(sectionParam);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
            
            // La carte est maintenant intégrée directement (OpenStreetMap + lien Google Maps)
            
            // Initialisation
            console.log('Formulaire de contact dynamique initialisé !');
        });
        
        // Fonction pour ouvrir Google Maps
        function openGoogleMaps() {
            window.open('https://www.google.com/maps/search/?api=1&query=8+Impasse+des+Bosquets,+31100+Toulouse,+France', '_blank');
        }
        
    </script>
    <?php wp_footer(); ?>
</body>
</html>
