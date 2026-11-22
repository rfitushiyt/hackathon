
<?php

session_start();

header("Content-Type: application/json");

echo json_encode([
    "loggedIn" => isset($_SESSION["user"]),
    "sessionId" => session_id(),
    "user" => $_SESSION["user"] ?? null
]);

?>
