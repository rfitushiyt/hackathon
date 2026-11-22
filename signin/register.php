
<?php

require_once "config.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: index.html");
    exit;
}

// GET FORM DATA
$name = trim($_POST["name"] ?? "");
$username = trim($_POST["username"] ?? "");
$email = trim($_POST["email"] ?? "");
$password = $_POST["password"] ?? "";
$confirmPassword = $_POST["confirmPassword"] ?? "";

// CHECK EMPTY FIELDS
if (
    empty($name) ||
    empty($username) ||
    empty($email) ||
    empty($password) ||
    empty($confirmPassword)
) {
    die("Please complete all fields.");
}

// VALIDATE EMAIL
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die("Invalid email address.");
}

// CHECK PASSWORD
if ($password !== $confirmPassword) {
    die("Passwords do not match.");
}

if (strlen($password) < 8) {
    die("Password must contain at least 8 characters.");
}

try {

    // CHECK EXISTING USER
    $check = $conn->prepare(
        "SELECT id FROM users WHERE username = ? OR email = ?"
    );

    $check->execute([$username, $email]);

    if ($check->fetch()) {
        die("Username or email already exists.");
    }

    // HASH PASSWORD
    $hashedPassword = password_hash(
        $password,
        PASSWORD_DEFAULT
    );

    // INSERT USER INTO DATABASE
    $insert = $conn->prepare("
        INSERT INTO users (name, username, email, password)
        VALUES (?, ?, ?, ?)
    ");

    $insert->execute([
        $name,
        $username,
        $email,
        $hashedPassword
    ]);

    // SUCCESS
    header("Location: signin.html?registered=1");
    exit;

}catch (PDOException $e) {

    die("DATABASE ERROR: " . $e->getMessage());

}

?>
