<?php
// Récupère les données envoyées en POST
$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    echo json_encode(["status"=>"error","message"=>"Données invalides"]);
    exit;
}

// Charge le JSON existant
$filename = 'tenues.json';
$tenues = [];
if(file_exists($filename)){
    $tenues = json_decode(file_get_contents($filename), true);
}

// On met à jour la date
$date = $data['date'];
$personne = $data['personne'];
$tenues[$date][$personne] = $data['tenue'];

// Sauvegarde
file_put_contents($filename, json_encode($tenues, JSON_PRETTY_PRINT));

echo json_encode(["status"=>"ok"]);
?>
