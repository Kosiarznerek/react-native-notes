<?php

//Data validation
if (!isset($_POST['login'])) {
    echo '{"response": false, "reason":"Unable to find \'login\' property."}';
    exit(0);
}
if (!isset($_POST['password'])) {
    echo '{"response": false, "reason":"Unable to find \'password\' property."}';
    exit(0);
}

//Getting user id
require_once __DIR__ . '\..\functions\get_user_id.php';
$user_id = get_user_id($_POST['login'], $_POST['password']);
if ($user_id < 0) {
    echo '{"response": false, "reason":"Unable to find user in database"}';
    exit(0);
}

//Database connection
require_once __DIR__ . '\..\db_connect.php';

//Getting all user notes
$user_notes = $conn->query("SELECT `id`,`title`, `text`, `color` FROM `notes` WHERE `user_id`='$user_id' ORDER BY `id` DESC");

//Returning notes
$statistic = array();
while ($data = $user_notes->fetch_assoc()) array_push($statistic, $data);
echo '{"response": ' . json_encode($statistic) . '}';
exit(0);