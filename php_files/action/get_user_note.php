<?php

//Data validation
if (!isset($_POST['login'])) {
    echo '{"response": false, "reason": "Unable to find \'login\' property."}';
    exit(0);
}
if (!isset($_POST['password'])) {
    echo '{"response": false, "reason": "Unable to find \'password\' property."}';
    exit(0);
}
if (!isset($_POST['noteID'])) {
    echo '{"response": false, "reason": "Unable to find \'noteID\' property."}';
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

//Getting user note
$user_note = $conn->query("SELECT `id`,`title`, `text`, `color` FROM `notes` WHERE `user_id`='$user_id' AND `id`='" . $_POST['noteID'] . "'");

//Unable to find note
if ($user_note->num_rows !== 1) {
    echo '{"response": false, "reason":"Unable to find note in database."}';
    exit(0);
}

//Returning note
$user_note = $user_note->fetch_assoc();
echo '{"response": ' . json_encode($user_note) . '}';
exit(0);