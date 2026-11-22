<?php

require_once "config.php";

echo "CONNECTED SUCCESSFULLY!";

$stmt = $conn->query("SHOW TABLES");

echo "<br>";

while ($row = $stmt->fetch(PDO::FETCH_NUM)) {
    echo $row[0] . "<br>";
}

?>