
<?php

session_start();

header("Content-Type: application/json");

require_once "config.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode([
        "success" => false,
        "message" => "Invalid request."
    ]);
    exit;
}

$email = trim($_POST["email"] ?? "");
$password = $_POST["password"] ?? "";

if ($email === "" || $password === "") {
    echo json_encode([
        "success" => false,
        "message" => "Please complete all fields."
    ]);
    exit;
}

try {

    $query = $conn->prepare(
        "SELECT name, username, email, password
         FROM users
         WHERE email = ?
         LIMIT 1"
    );

    $query->execute([$email]);

    $user = $query->fetch(PDO::FETCH_ASSOC);

    if (!$user || !password_verify($password, $user["password"])) {
        echo json_encode([
            "success" => false,
            "message" => "Incorrect email or password."
        ]);
        exit;
    }

    session_regenerate_id(true);

    $_SESSION["user"] = [
        "name" => $user["name"],
        "username" => $user["username"],
        "email" => $user["email"]
    ];

    $sessionId = session_id();

    // Save session before sending response
    session_write_close();

    echo json_encode([
        "success" => true,
        "message" => "You are now signed in!",
        "name" => $user["name"],
        "username" => $user["username"],
        "sessionId" => $sessionId
    ]);

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "success" => false,
        "message" => "Database error."
    ]);

}

?>
