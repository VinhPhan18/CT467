<?php
// core configuration
include_once "config/core.php";
 
// set page title
$page_title = "Login";
 
// include login checker
$require_login=false;
include_once "login_checker.php";
 
// default to false
$access_denied=false;
 
// post code will be here
// if the login form was submitted
if($_POST){
    // email check will be here
    // include classes
include_once "config/database.php";
include_once "objects/user.php";
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// initialize objects
$user = new User($db);
 
// check if email and password are in the database
$user->email=$_POST['email'];
 
// check if email exists, also get user details using this emailExists() method
$email_exists = $user->emailExists();
 
// login validation will be here
// validate login
if ($email_exists && password_verify($_POST['password'], $user->password) && $user->status==1){
 
    // if it is, set the session value to true
    $_SESSION['logged_in'] = true;
    $_SESSION['user_id'] = $user->id;
    $_SESSION['access_level'] = $user->access_level;
    $_SESSION['firstname'] = htmlspecialchars($user->firstname, ENT_QUOTES, 'UTF-8') ;
    $_SESSION['lastname'] = $user->lastname;
 
    // if access level is 'Admin', redirect to admin section
    if($user->access_level=='Admin'){
        header("Location: {$home_url}admin/index.php?action=login_success");
    }
 
    // else, redirect only to 'Customer' section
    else{
        header("Location: {$home_url}index.php?action=login_success");
    }
}
 
// if username does not exist or password is wrong
else{
    $access_denied=true;
}
}
 
// login form html will be here
// include page header HTML
include_once "layout_head.php";
 
echo "<div class='col-sm-6 col-md-4 col-md-offset-4'>";
 
    // alert messages will be here
    // get 'action' value in url parameter to display corresponding prompt messages
$action=isset($_GET['action']) ? $_GET['action'] : "";
 
// tell the user he is not yet logged in
if($action =='not_yet_logged_in'){
    echo "<div class='alert alert-danger margin-top-40' role='alert'>????ng nh???p.</div>";
}
 
// tell the user to login
else if($action=='please_login'){
    echo "<div class='alert alert-info'>
        <strong>Xin m???i ????ng nh???p ????? truy c???p trang web</strong>
    </div>";
}
 
// tell the user if access denied
if($access_denied){
    echo "<div class='alert alert-danger margin-top-40' role='alert'>
        Truy c???p b??? t??? ch???i.<br /><br />
        T??n t??i kho???n ho???c m???t kh???u kh??ng ????ng
    </div>";
}
 
    // actual HTML login form
    echo "<div class='account-wall' style='margin-top: 140px'>";
        echo "<div id='my-tab-content' class='tab-content'>";
            echo "<div class='tab-pane active' id='login'>";
                echo "<img class='profile-img' style='width:220px; height:160px;' src='images/login.png'>";
                echo "<form class='form-signin' action='" . htmlspecialchars($_SERVER["PHP_SELF"]) . "' method='post'>";
                    echo "<input type='text' name='email' class='form-control' placeholder='Email' required autofocus />";
                    echo "<input type='password' name='password' class='form-control' placeholder='Password' required />";
                    echo "<input type='submit' class='btn btn-lg btn-primary btn-block' value='????ng nh???p' />";
                    echo"<a href=".$home_url."forgotPass.php>B???n ???? qu??n m???t kh???u?</a>";
                echo "</form>";
            echo "</div>";
        echo "</div>";
    echo "</div>";
 
echo "</div>";
echo "<style>";
echo ".container{";
echo  " height:1000px;";
echo"}";
echo".navbar{";
echo "margin-bottom: 0px;";
echo "}";
echo "/style>";
// footer HTML and JavaScript codes
include_once "layout_foot.php";
?>