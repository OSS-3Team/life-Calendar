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
if ($con->connect_error) {
    die("연결 실패: " . $con->connect_error);
}

// 아이디 존재 여부 확인
$sql_check = "SELECT * FROM member WHERE id = ?";
$stmt_check = $con->prepare($sql_check);
$stmt_check->bind_param("s", $user_id);
$stmt_check->execute();
$result = $stmt_check->get_result();

if ($result->num_rows == 0) {
    echo "존재하지 않는 아이디입니다.";
    $stmt_check->close();
    $con->close();
    exit;
}

$sql = "UPDATE member SET password = ? WHERE id = ?";
$stmt_update = $con->prepare($sql);
$stmt_update->bind_param("ss", $hashed_password, $user_id);

if ($stmt_update->execute()) {
    header("Location: ../loginProcess/newpassword.php?success=성공적으로 비밀번호가 변경되었습니다.");
} else {
    header("Location: ../loginProcess/newpassword.php?error=비밀번호 변경하는데 오류가 발생했습니다.");
}

// 연결 종료
$stmt_update->close();
$stmt_check->close();
$con->close();

?>