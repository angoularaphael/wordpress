<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notre Équipe - École Convergence</title>
    <meta name="description" content="Découvrez l'équipe pédagogique et les étudiants de l'École Convergence. Des experts passionnés prêts à vous accompagner dans votre parcours.">
    <meta name="keywords" content="équipe convergence, professeurs, étudiants, développeurs, formateurs">
    <meta name="author" content="École Convergence">

    <!-- Open Graph -->
    <meta property="og:title" content="Notre Équipe - École Convergence">
    <meta property="og:description" content="Découvrez notre équipe de formateurs et étudiants exceptionnels.">
    <meta property="og:type" content="website">

    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👥</text></svg>">

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;600&display=swap" rel="stylesheet">

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <!-- Styles CSS -->
    <link rel="stylesheet" href="<?php echo esc_url(get_stylesheet_uri()); ?>">
<?php wp_head(); ?>
    <style>
        /* Variables */
        :root {
            --primary-color: #2c5aa0;
            --secondary-color: #ff6b35;
            --accent-color: #4ecdc4;
            --light-color: #f8f9fa;
            --dark-color: #333;
            --gray-color: #6c757d;
            --light-gray: #e9ecef;
        }

        /* Reset et styles globaux */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Open Sans', sans-serif;
            line-height: 1.6;
            color: var(--dark-color);
        }

        h1, h2, h3, h4, h5 {
            font-family: 'Poppins', sans-serif;
            font-weight: 600;
            color: var(--primary-color);
        }

        .container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        /* Header */
        header {
            background-color: white;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            position: sticky;
            top: 0;
            z-index: 1000;
        }

        .header-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 15px 20px;
            flex-wrap: wrap;
            gap: 15px;
        }

        .header-container > nav {
            order: 2;
            flex: 1;
            min-width: 0;
        }

        .header-container > .user-actions {
            order: 3;
            flex-shrink: 0;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .logo-icon {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            object-fit: cover;
        }

        .logo-text {
            font-size: 1.5rem;
            font-weight: 600;
            color: var(--primary-color);
        }

        .logo-text span {
            color: var(--secondary-color);
        }

        nav ul {
            display: flex;
            list-style: none;
            gap: 30px;
        }

        nav a {
            color: var(--dark-color);
            text-decoration: none;
            font-weight: 500;
            transition: color 0.3s ease;
        }

        nav a:hover, nav a.active {
            color: var(--primary-color);
        }

        /* Hero Section */
        .teams-hero {
            background: linear-gradient(135deg, rgba(44,90,160,0.7) 0%, rgba(26,58,110,0.75) 100%), url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80') center/cover;
            color: white;
            padding: 100px 0;
            text-align: center;
            animation: fadeInDown 0.8s ease-out;
        }

        .teams-hero h1 {
            color: white;
            font-size: 3rem;
            margin-bottom: 20px;
            animation: slideInUp 0.8s ease-out 0.2s backwards;
        }

        .teams-hero p {
            color: rgba(255, 255, 255, 0.9);
            font-size: 1.2rem;
            max-width: 600px;
            margin: 0 auto;
            animation: slideInUp 0.8s ease-out 0.4s backwards;
        }

        @keyframes fadeInDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Fil d'Ariane */
        .breadcrumb-nav {
            background-color: var(--light-color);
            padding: 15px 0;
            border-bottom: 1px solid var(--light-gray);
        }

        .breadcrumb {
            display: flex;
            list-style: none;
            flex-wrap: wrap;
        }

        .breadcrumb-item {
            display: flex;
            align-items: center;
        }

        .breadcrumb-item + .breadcrumb-item::before {
            content: "/";
            padding: 0 10px;
            color: var(--gray-color);
        }

        .breadcrumb-item a {
            color: var(--primary-color);
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 0.9rem;
            transition: all 0.3s ease;
        }

        .breadcrumb-item a:hover {
            color: var(--secondary-color);
            text-decoration: underline;
        }

        .breadcrumb-item.active {
            color: var(--gray-color);
            font-size: 0.9rem;
        }

        /* Teams Grid */
        .teams-section {
            padding: 80px 0;
        }

        .teams-header {
            text-align: center;
            margin-bottom: 60px;
            animation: slideInUp 0.8s ease-out;
        }

        .teams-header h2 {
            font-size: 2.5rem;
            margin-bottom: 20px;
        }

        .teams-header p {
            color: var(--gray-color);
            font-size: 1.1rem;
            max-width: 600px;
            margin: 0 auto;
        }

        .teams-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 40px;
            margin-top: 50px;
        }

        .team-card {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            border: 1px solid var(--light-gray);
            animation: slideUpIn 0.6s ease-out backwards;
        }

        .team-card:nth-child(1) { animation-delay: 0.1s; }
        .team-card:nth-child(2) { animation-delay: 0.2s; }
        .team-card:nth-child(3) { animation-delay: 0.3s; }
        .team-card:nth-child(4) { animation-delay: 0.4s; }
        .team-card:nth-child(5) { animation-delay: 0.5s; }

        @keyframes slideUpIn {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .team-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
            border-color: var(--primary-color);
        }

        .team-image {
            height: 280px;
            background: linear-gradient(135deg, #e9ecef, #f8f9fa);
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .team-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .team-image.no-photo {
            background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
            color: white;
            font-size: 3rem;
        }

        .team-content {
            padding: 30px;
        }

        .team-name {
            font-size: 1.5rem;
            margin-bottom: 8px;
            color: var(--primary-color);
        }

        .team-role {
            color: var(--secondary-color);
            font-weight: 600;
            margin-bottom: 15px;
            font-size: 0.95rem;
        }

        .team-bio {
            color: var(--gray-color);
            font-size: 0.95rem;
            line-height: 1.6;
            margin-bottom: 20px;
            max-height: 100px;
            overflow: hidden;
        }

        .team-skills {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 20px;
        }

        .skill-badge {
            background: var(--light-color);
            color: var(--primary-color);
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            transition: all 0.3s ease;
            display: inline-block;
        }

        .skill-badge:hover {
            background: var(--primary-color);
            color: white;
            transform: translateY(-2px);
        }

        .team-contact {
            display: flex;
            gap: 12px;
            justify-content: center;
            flex-wrap: wrap;
            padding-top: 15px;
            border-top: 1px solid var(--light-gray);
        }

        .contact-link {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #f0f0f0;
            color: var(--primary-color);
            text-decoration: none;
            transition: all 0.3s ease;
            font-size: 1.1rem;
            border: 1px solid #e0e0e0;
        }

        .contact-link:hover {
            background: var(--primary-color);
            color: white;
            border-color: var(--primary-color);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(44, 90, 160, 0.25);
        }

        /* Mobile Menu */
        .mobile-menu-btn {
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--primary-color);
        }

        /* Modal Styles */
        .member-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 2000;
        }

        .member-modal.active {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .modal-backdrop {
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0.5);
            animation: fadeIn 0.3s ease-out;
        }

        .modal-content {
            position: relative;
            max-width: 90vw;
            max-height: 90vh;
            width: 600px;
            background: white;
            border-radius: 16px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            overflow-y: auto;
            animation: slideUp 0.4s ease-out;
        }

        .modal-close {
            position: absolute;
            top: 20px;
            right: 20px;
            background: var(--light-color);
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--primary-color);
            font-size: 1.2rem;
            transition: all 0.3s ease;
            z-index: 10;
        }

        .modal-close:hover {
            background: var(--primary-color);
            color: white;
            transform: rotate(90deg);
        }

        .modal-header {
            padding: 40px 30px 20px;
            background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
            color: white;
            border-bottom: 1px solid var(--light-gray);
        }

        .modal-header h2 {
            color: white;
            margin: 0;
            font-size: 1.8rem;
        }

        .modal-body {
            padding: 30px;
        }

        .member-bio-content {
            font-size: 0.95rem;
            line-height: 1.8;
        }

        .member-section {
            color: var(--primary-color);
            font-size: 1.2rem;
            font-weight: 600;
            margin: 25px 0 15px;
            padding-bottom: 10px;
            border-bottom: 2px solid var(--light-gray);
        }

        .member-section:first-child {
            margin-top: 0;
        }

        .member-line {
            color: var(--dark-color);
            margin: 8px 0;
            padding-left: 10px;
            border-left: 3px solid var(--accent-color);
            padding-left: 15px;
        }

        .member-line:first-of-type {
            font-weight: 600;
            color: var(--secondary-color);
        }

        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }

        /* User actions - Navbar */
        .user-actions {
            margin-left: 20px;
            display: flex;
            align-items: center;
        }
        .user-toggle { cursor: pointer; }
        .user-menu {
            z-index: 9999;
            display: none;
            overflow: visible;
        }
        .user-dropdown:hover .user-menu,
        .user-dropdown.open .user-menu {
            display: block !important;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .teams-hero h1 {
                font-size: 2rem;
            }

            .teams-grid {
                grid-template-columns: 1fr;
                gap: 25px;
            }

            nav {
                position: relative;
            }

            .header-container {
                justify-content: flex-start;
            }

            .header-container > nav {
                order: 4;
                flex: 1 1 100%;
            }

            nav ul {
                display: none;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                padding: 20px;
                gap: 10px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                z-index: 1500;
            }

            nav ul.show {
                display: flex !important;
            }

            .mobile-menu-btn {
                display: block;
                order: 2;
            }

            .user-actions {
                margin-left: auto;
                margin-top: 0;
                width: auto;
                order: 3;
                justify-content: flex-end;
            }

            .header-container > .user-actions {
                order: 3;
            }

            .header-container {
                overflow: visible;
            }

            .header-container > .logo {
                order: 1;
            }

            .teams-header h2 {
                font-size: 1.8rem;
            }

            .modal-content {
                width: 95vw;
                max-height: 95vh;
            }

            .modal-header {
                padding: 30px 20px 15px;
            }

            .modal-header h2 {
                font-size: 1.5rem;
            }

            .modal-body {
                padding: 20px;
            }
        }

        section {
            padding: 60px 0;
        }
    </style>
</head>
<body <?php body_class(); ?>>
<?php
$groupe1_header_nav_active = 'teams';
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
                    Notre Équipe
                </li>
            </ol>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="teams-hero">
        <div class="container">
            <h1>Notre Équipe</h1>
            <p>Rencontrez les professionnels passionnés et les étudiants talentueux qui forment l'École Convergence</p>
        </div>
    </section>

    <!-- Section Chiffres clés -->
    <section style="padding: 50px 0; background: #f8f9fa;">
        <div class="container">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 30px; text-align: center;">
                <div>
                    <div style="font-size: 2.5rem; font-weight: 700; color: #2c5aa0;">15+</div>
                    <div style="color: #666;">Formateurs experts</div>
                </div>
                <div>
                    <div style="font-size: 2.5rem; font-weight: 700; color: #2c5aa0;">500+</div>
                    <div style="color: #666;">Étudiants formés</div>
                </div>
                <div>
                    <div style="font-size: 2.5rem; font-weight: 700; color: #2c5aa0;">4</div>
                    <div style="color: #666;">Domaines d'expertise</div>
                </div>
                <div>
                    <div style="font-size: 2.5rem; font-weight: 700; color: #2c5aa0;">94%</div>
                    <div style="color: #666;">Taux d'insertion</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Teams Section -->
    <section class="teams-section">
        <div class="container">
            <div class="teams-header">
                <h2>Excellence Académique & Innovation</h2>
                <p>Une équipe diversifiée de formateurs expérimentés et d'étudiants prometteurs working towards digital transformation</p>
            </div>

            <div class="teams-grid">
                <!-- Antony Sitcheping -->
                <div class="team-card" data-member="antony" style="cursor: pointer;">
                    <div class="team-image">
                        <img src="<?php echo esc_url(get_template_directory_uri() . '/images/anthony.png'); ?>?v=3" alt="Anthony Sitcheping">
                    </div>
                    <div class="team-content">
                        <h3 class="team-name">Anthony Sitcheping</h3>
                        <p class="team-role">Étudiant Développeur Bac+2</p>
                        <div class="team-bio">
                            Développeur informatique passionné par Python, JavaScript et les technologies web. Spécialisé en Node.js et bases de données.
                        </div>
                        <div class="team-skills">
                            <span class="skill-badge">Python</span>
                            <span class="skill-badge">JavaScript</span>
                            <span class="skill-badge">Node.js</span>
                        </div>
                        <div class="team-contact">
                            <a href="https://github.com/s-senpai7" target="_blank" rel="noopener" class="contact-link" title="GitHub">
                                <i class="fab fa-github"></i>
                            </a>
                            <a href="mailto:anthonysitcheping@gmail.com" class="contact-link" title="Email">
                                <i class="fas fa-envelope"></i>
                            </a>
                            <a href="tel:+33749304215" class="contact-link" title="Téléphone">
                                <i class="fas fa-phone"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Raphaël Angoula -->
                <div class="team-card" data-member="raphael" style="cursor: pointer;">
                    <div class="team-image">
                        <img src="<?php echo esc_url(get_template_directory_uri() . '/images/fareno pic.png'); ?>?v=2" alt="Raphaël Angoula">
                    </div>
                    <div class="team-content">
                        <h3 class="team-name">Raphaël Angoula</h3>
                        <p class="team-role">Étudiant Développeur Web Bac+2</p>
                        <div class="team-bio">
                            Développeur web full-stack avec expertise en React, Angular et Node.js. Créateur de Kerm-MD et solutions web innovantes.
                        </div>
                        <div class="team-skills">
                            <span class="skill-badge">React</span>
                            <span class="skill-badge">Node.js</span>
                            <span class="skill-badge">Angular</span>
                        </div>
                        <div class="team-contact">
                            <a href="https://github.com" target="_blank" rel="noopener" class="contact-link" title="GitHub">
                                <i class="fab fa-github"></i>
                            </a>
                            <a href="mailto:germainraphaelangoulaonambele@gmail.com" class="contact-link" title="Email">
                                <i class="fas fa-envelope"></i>
                            </a>
                            <a href="tel:+33762641473" class="contact-link" title="Téléphone">
                                <i class="fas fa-phone"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Eddy Etame -->
                <div class="team-card" data-member="eddy" style="cursor: pointer;">
                    <div class="team-image">
                        <img src="<?php echo esc_url(get_template_directory_uri() . '/images/eddy.png'); ?>?v=2" alt="Eddy Etame">
                    </div>
                    <div class="team-content">
                        <h3 class="team-name">Eddy Etame</h3>
                        <p class="team-role">Étudiant Dev Web & IA Bac+2</p>
                        <div class="team-bio">
                            Développeur passionné par l'IA, l'automatisation et les solutions innovantes. Spécialiste Python, JavaScript et bots intelligents.
                        </div>
                        <div class="team-skills">
                            <span class="skill-badge">Python</span>
                            <span class="skill-badge">IA</span>
                            <span class="skill-badge">React</span>
                        </div>
                        <div class="team-contact">
                            <a href="https://github.com/eddy-etame-dev" target="_blank" rel="noopener" class="contact-link" title="GitHub">
                                <i class="fab fa-github"></i>
                            </a>
                            <a href="mailto:eddy.etame@gmail.com" class="contact-link" title="Email">
                                <i class="fas fa-envelope"></i>
                            </a>
                            <a href="tel:+33755123456" class="contact-link" title="Téléphone">
                                <i class="fas fa-phone"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Brad Mbosseu -->
                <div class="team-card" data-member="brad" style="cursor: pointer;">
                    <div class="team-image">
                        <img src="<?php echo esc_url(get_template_directory_uri() . '/images/brad.jpeg'); ?>?v=2" alt="Brad Mbosseu">
                    </div>
                    <div class="team-content">
                        <h3 class="team-name">Brad Mbosseu</h3>
                        <p class="team-role">Étudiant Développement Web</p>
                        <div class="team-bio">
                            Développeur web créatif spécialisé dans les interfaces responsives. Expert HTML, CSS, JavaScript et PHP.
                        </div>
                        <div class="team-skills">
                            <span class="skill-badge">HTML/CSS</span>
                            <span class="skill-badge">JavaScript</span>
                            <span class="skill-badge">PHP</span>
                        </div>
                        <div class="team-contact">
                            <a href="https://github.com" target="_blank" rel="noopener" class="contact-link" title="GitHub">
                                <i class="fab fa-github"></i>
                            </a>
                            <a href="mailto:mbosseubradbruel@gmail.com" class="contact-link" title="Email">
                                <i class="fas fa-envelope"></i>
                            </a>
                            <a href="tel:+33744977766" class="contact-link" title="Téléphone">
                                <i class="fas fa-phone"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Davidson Chardin -->
                <div class="team-card" data-member="davidson" style="cursor: pointer;">
                    <div class="team-image">
                        <img src="<?php echo esc_url(get_template_directory_uri() . '/images/Photo Davidson.png'); ?>?v=2" alt="Davidson Chardin">
                    </div>
                    <div class="team-content">
                        <h3 class="team-name">Davidson Chardin</h3>
                        <p class="team-role">Étudiant Bachelor 2 Informatique</p>
                        <div class="team-bio">
                            Chef de projet informatique avec expertise en développement web. Maîtrise Python, C, JavaScript et React.
                        </div>
                        <div class="team-skills">
                            <span class="skill-badge">React</span>
                            <span class="skill-badge">Python</span>
                            <span class="skill-badge">Gestion Projet</span>
                        </div>
                        <div class="team-contact">
                            <a href="https://github.com" target="_blank" rel="noopener" class="contact-link" title="GitHub">
                                <i class="fab fa-github"></i>
                            </a>
                            <a href="mailto:chardinpoutcheu@gmail.com" class="contact-link" title="Email">
                                <i class="fas fa-envelope"></i>
                            </a>
                            <a href="tel:+33753182608" class="contact-link" title="Téléphone">
                                <i class="fas fa-phone"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Téléchargement brochures -->
    <section style="padding: 60px 0; background: #f8f9fa;">
        <div class="container">
            <div class="teams-header">
                <h2>Télécharger nos brochures</h2>
                <p>Découvrez nos formations et l'équipe Convergence au format Markdown.</p>
            </div>
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

    <!-- Modal Profil Utilisateur -->
    <div id="memberModal" class="member-modal">
        <div class="modal-backdrop"></div>
        <div class="modal-content">
            <button class="modal-close" id="modalClose">
                <i class="fas fa-times"></i>
            </button>
            <div class="modal-header">
                <h2 id="memberTitle"></h2>
            </div>
            <div class="modal-body">
                <div id="memberContent" class="member-bio-content"></div>
            </div>
        </div>
    </div>

    <!-- Scripts JavaScript -->
    <script src="<?php echo esc_url(get_template_directory_uri() . '/assets/js/navbar.js'); ?>"></script>
    <script>
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

        // Gestion de la modal
        const memberModal = document.getElementById('memberModal');
        const modalClose = document.getElementById('modalClose');
        const memberTitle = document.getElementById('memberTitle');
        const memberContent = document.getElementById('memberContent');
        const teamCards = document.querySelectorAll('.team-card[data-member]');

        // Ouvrir la modal au clic sur une team card
        teamCards.forEach(card => {
            card.addEventListener('click', () => {
                const memberName = card.dataset.member;
                loadMemberContent(memberName);
            });
        });

        // Fermer la modal
        modalClose.addEventListener('click', () => {
            memberModal.classList.remove('active');
        });

        // Fermer la modal au clic sur le backdrop
        document.querySelector('.modal-backdrop').addEventListener('click', () => {
            memberModal.classList.remove('active');
        });

        // Charger le contenu du membre
        async function loadMemberContent(memberName) {
            try {
                const apiUrl = (typeof window.groupe1ConvergenceConfig !== 'undefined' && window.groupe1ConvergenceConfig.apiMember)
                    ? window.groupe1ConvergenceConfig.apiMember + memberName
                    : '<?php echo esc_url(rest_url('groupe1/v1/member/')); ?>' + memberName;
                const response = await fetch(apiUrl);
                const data = await response.json();

                if (data.success) {
                    // Extraire le titre (première ligne du fichier)
                    const contentHTML = data.content
                        .map((item, index) => {
                            if (item.type === 'section') {
                                return `<h3 class="member-section" style="animation: slideInLeft 0.5s ease-out ${0.1 + index * 0.05}s backwards;">${item.content}</h3>`;
                            } else {
                                return `<p class="member-line" style="animation: fadeIn 0.5s ease-out ${0.1 + index * 0.05}s backwards;">${item.content}</p>`;
                            }
                        })
                        .join('');

                    // Extraire le titre (premier item qui n'est pas une section)
                    const titleItem = data.content[0];
                    const title = titleItem.content.replace(/^[^\s]+ /, ''); // Enlever l'emoji si présent

                    memberTitle.textContent = title;
                    memberContent.innerHTML = contentHTML;

                    // Ouvrir la modal avec animation
                    memberModal.classList.add('active');
                } else {
                    alert('Impossible de charger les informations du membre');
                }
            } catch (error) {
                console.error('Erreur:', error);
                alert('Erreur lors du chargement des informations');
            }
        }
    </script>

    <?php include('footer-template.php'); ?>
    <?php wp_footer(); ?>
</body>
</html>
