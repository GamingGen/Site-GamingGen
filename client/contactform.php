<?php
    $name = $_POST['name'];
    $forname = $_POST['forname'];
    $message = $_POST['message'];
    $from = 'From: Formulaire de contact gaming-gen.fr'; 
    $to = 'contact@gaming-gen.fr'; 
    $email = $_POST['email'];
			
    $body = "From: $name\n $email\n Objet:\n $email Message:\n $message";
				
    if ($_POST['submit']{				 
        if (mail ($to, $message, $body, $from)) { 
	    echo '<p>Votre message a bien été envoyé!</p>';
	} else { 
	    echo '<p>Quelque chose s&acute;est mal passé, réessayez!</p>'; 
	} 
    } 
?>