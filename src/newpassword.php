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

// 비밀번호를 해시로 저장하기 (보안 강화)
$hashed_password = password_hash($password1, PASSWORD_DEFAULT);

// 연결 확인
if ($conn->connect_error) {
    die("연결 실패: " . $conn->connect_error);
}

// 아이디 존재 여부 확인
$sql_check = "SELECT * FROM member WHERE user_id = ?";
$stmt_check = $conn->prepare($sql_check);
$stmt_check->bind_param("s", $user_id);
$stmt_check->execute();
$result = $stmt_check->get_result();

if ($result->num_rows == 0) {
    echo "존재하지 않는 아이디입니다.";
    $stmt_check->close();
    $conn->close();
    exit;
}

$sql = "UPDATE member SET password = ? WHERE user_id = ?";


?>