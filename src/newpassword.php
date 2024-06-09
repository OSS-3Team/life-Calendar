<?php

// 비밀번호 새로 만드는 곳

session_start();
require 'config.php';

$user_id = $_POST['user_id'];
$password1 = $_POST['password1'];
$password2 = $_POST['password2'];

if ($password1 !== $password2) {
    echo "비밀번호가 일치하지 않습니다.";
    exit;
}

?>