<?php

include_once "../config/core.php";
 
// kiểm tra đăng nhập với tư cách quản trị viên  
include_once "login_checker.php";
 
// set page title
$page_title="CHÀO MỪNG BẠN ĐẾN TRANG QUẢN TRỊ";
 
 //Tiêu đề trang
include 'layout_head.php';
 
    echo "<div class='col-md-12'>";
 
        //lấy giá trị ngăn thông báo mục chỉ định
        $action = isset($_GET['action']) ? $_GET['action'] : "";
 
?>