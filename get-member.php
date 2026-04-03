<?php
/**
 * API pour charger les informations d'un membre
 * Usage: /groupe1-convergence/get-member.php?member=antony
 */

// Charger WordPress
require_once(dirname(dirname(__FILE__)) . '/wp-load.php');

// Définir les emojis pour les sections
$emoji_map = [
    'LANGUES' => '🌐',
    'COMPÉTENCES' => '💪',
    'SOFT SKILLS' => '✨',
    'CENTRES D' => '🎯',
    'EXPÉRIENCES' => '💼',
    'CERTIFICATIONS' => '🏆',
    'FORMATIONS' => '🎓',
];

// Mapper les noms pour les fichiers
$member_files = [
    'antony' => 'antony',
    'raphael' => 'raphael',
    'eddy' => 'eddy',
    'brad' => 'brad',
    'davidson' => 'davidson',
];

if (isset($_GET['member'])) {
    $member = sanitize_text_field($_GET['member']);
    
    if (!isset($member_files[$member])) {
        header('Content-Type: application/json');
        http_response_code(404);
        echo json_encode([
            'success' => false,
            'message' => 'Membre non trouvé',
        ]);
        exit;
    }
    
    $file_name = $member_files[$member];
    $file_path = dirname(__FILE__) . '/../teams/membre/' . $file_name . '.txt';
    
    if (file_exists($file_path)) {
        $content = file_get_contents($file_path);
        
        // Parser le contenu et ajouter les emojis
        $lines = explode("\n", $content);
        $parsed = [];
        $current_section = '';
        
        foreach ($lines as $line) {
            $line = trim($line);
            
            if (empty($line)) {
                continue;
            }
            
            // Vérifier si c'est un titre de section
            if (preg_match('/^[A-ZÀÂÄÆÇÉÈÊËÏÎÔÖŒÚÙÛÜÝŸÑ\s\']+$/', $line) && strlen($line) > 3 && !strpos($line, ':')) {
                $current_section = $line;
                $emoji = '📌';
                
                foreach ($emoji_map as $key => $emoji_icon) {
                    if (stripos($line, $key) !== false) {
                        $emoji = $emoji_icon;
                        break;
                    }
                }
                
                $parsed[] = [
                    'type' => 'section',
                    'content' => "$emoji $line",
                ];
            } else {
                $parsed[] = [
                    'type' => 'line',
                    'content' => htmlspecialchars($line, ENT_QUOTES, 'UTF-8'),
                ];
            }
        }
        
        header('Content-Type: application/json');
        echo json_encode([
            'success' => true,
            'member' => $member,
            'content' => $parsed,
        ]);
    } else {
        header('Content-Type: application/json');
        http_response_code(404);
        echo json_encode([
            'success' => false,
            'message' => 'Fichier membre non trouvé: ' . $file_path,
        ]);
    }
} else {
    header('Content-Type: application/json');
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Paramètre member requis',
    ]);
}
