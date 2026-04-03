<?php
/**
 * Téléchargement des brochures au format MD
 * Usage: ?brochure=sante|tourisme|business|devweb|recherche-stage|linkedin-stage|candidature-digitale|generale
 */
define('WP_USE_THEMES', false);
require_once dirname(__FILE__) . '/../../../wp-load.php';

$allowed = ['sante', 'tourisme', 'business', 'devweb', 'recherche-stage', 'linkedin-stage', 'candidature-digitale', 'generale'];
$brochure = isset($_GET['brochure']) ? sanitize_key($_GET['brochure']) : '';

if (!in_array($brochure, $allowed)) {
    wp_die('Brochure non trouvée', 'Erreur', ['response' => 404]);
}

$theme_dir = get_template_directory();
$file = $theme_dir . '/downloads/brochure-' . $brochure . '.md';

if (!file_exists($file)) {
    wp_die('Fichier non trouvé', 'Erreur', ['response' => 404]);
}

$names = [
    'sante' => 'brochure-formation-sante',
    'tourisme' => 'brochure-formation-tourisme',
    'business' => 'brochure-formation-business',
    'devweb' => 'brochure-formation-devweb',
    'recherche-stage' => 'brochure-recherche-stage',
    'linkedin-stage' => 'brochure-linkedin-stage',
    'candidature-digitale' => 'brochure-candidature-digitale',
    'generale' => 'brochure-generale-convergence',
];

$filename = ($names[$brochure] ?? 'brochure') . '.md';

header('Content-Type: text/markdown; charset=utf-8');
header('Content-Disposition: attachment; filename="' . $filename . '"');
header('Content-Length: ' . filesize($file));
header('Cache-Control: no-cache, must-revalidate');
readfile($file);
exit;
