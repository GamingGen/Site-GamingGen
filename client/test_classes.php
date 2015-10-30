<?php

    require_once('classes/members.php');
    require_once('classes/games.php');
    require_once('classes/teams.php');
    require_once('classes/registration.php');

    $member = new Members(1);
    $members = new Members();
    $game = new Games(2);
    $team = new Teams(1);
    $registration = new Registration(1);

    var_dump($member);
    var_dump($game);
    var_dump($team);
    var_dump($registration);
    
    var_dump($members->getMembers());
    
?>