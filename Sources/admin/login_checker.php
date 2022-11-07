<?php
//  kiểm tra đăng nhập cho cấp truy cập 'quản trị viên'
 
// nếu QTV trống, chưa đăng nhập, hãy chuyển hướng anh ta đến trang đăng nhập
if(empty($_SESSION['logged_in'])){
    header("Location: {$home_url}login.php?action=Chưa đăng nhập");
}
 
// nếu không phải là 'Quản trị viên', hãy chuyển đến trang đăng nhập
else if($_SESSION['access_level']!="Admin"){
    header("Location: {$home_url}login.php?action=Không phải quản trị viên");
}
 
else{
    // Trang hiện tại
}
?>