<?php

    session_start();

    if( isset($_POST['email'], $_POST['password']) and !empty($_POST['email']) AND !empty($_POST['password']) ) {

        require_once('classes/pdo.php');
        global $pdo;

        $password = md5($_POST['password']);

        $req_check_user = "SELECT member_id FROM members WHERE member_email = :member_email AND member_password = :member_password AND member_active = 1 AND member_banned = 0";
        $check_user = $pdo->prepare($req_check_user);
        $check_user->bindParam(':member_email', $_POST['email'], PDO::PARAM_STR);
        $check_user->bindParam(':member_password', $password, PDO::PARAM_STR);
        $check_user->execute();

        if($check_user->rowCount() == 1) {

            require_once('classes/members.php');

            $member = new Members(1);
            var_dump($member);

            $req_last_visit = "UPDATE members SET member_last_update = NOW() WHERE member_id = :member_id";
            $last_visit = $pdo->prepare($req_last_visit);
            $last_visit->bindParam(':member_id', $member->member_id, PDO::PARAM_INT);
            $last_visit->execute();
        }
        else
            $error = 1;    

    }
    else
        $error = 2;


    //Redirect with error number.

?>