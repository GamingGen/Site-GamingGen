<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="style/reset.css">
<link rel="stylesheet" href="style/main.css">
<link rel="stylesheet" href="lib/jquery.bxslider.css">
<link rel="stylesheet" href="font-awesome-4.2.0/css/font-awesome.min.css">
<link rel="icon" href="img/favicon.ico" />
<link rel="icon" type="image/png" href="img/favicon.png" />
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
<script src="lib/jquery.bxslider.min.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Gaming-gen</title>
<script src="https://maps.googleapis.com/maps/api/js"></script>
    <script>
      function initialize() {
        var map_canvas = document.getElementById('map_canvas');
        var map_options = {
          center: new google.maps.LatLng(43.459238, 5.479023),
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(map_canvas, map_options)
      }
      google.maps.event.addDomListener(window, 'load', initialize);
    </script>
    
<script type="text/javascript">
$(document).ready(function(){
  $('.bxslider').bxSlider();
});
</script><script type="text/javascript">
$(document).ready(function() {
    $(".content").css("display", "none");
 
    $(".content").fadeIn(350);
 
    $(".nav a").click(function(event){
        event.preventDefault();
        linkLocation = this.href;
        $(".content").fadeOut(200, redirectPage);     
    });
         
    function redirectPage() {
        window.location = linkLocation;
    }
});
</script>
</head>

<body>

<!-- Modal -->
<div class="md-modal md-effect-1" id="modal-1">
			<div class="md-content">
					<div class="insider">
						<h1>LOGIN</h1><button onclick="window.location.replace('#');" class="insmodal btn btn-ins btn-insb icon-file"><span><a href="#">Créer un compte</a></span></button>
                    	<hr/>
                        <div class="awake">
                            <div class="user"><img src="img/user.png"><input form="Nom d'utilisateur" placeholder="Nom d'utilisateur"></div>
                            <div class="verrou"><img src="img/verrou.png"> <input form="Mot de passe" placeholder="Mot de passe"><button class="loupe goconnect" value="submit"><img src="img/goconnect.png"></button></div> 
                        </div>
                        <div class="mdp">
                        <a href="forgot.php">Mot de passe oublié?</a>
                        </div>
                    </div>
				
					<button class="md-close">X</button>
				
			</div>
		</div>
<!-- /Modal -->
<div class="welcomeuser">
<span class="user">
<a href="http://gaming-gen.fr/dev/component/users" data-modal="modal-1">Login</a>&nbsp;&nbsp;<a href="http://gaming-gen.fr/dev/component/users/?view=registration" data-modal="modal-1">Créer un compte</a>

</div>
<div class="conteneurgnral">
<section class="header">
			<div class="top grid grid-pad">
                <div class="logo col-4-12"><a href="www.gaming-gen.fr" target="_self">
                <img class="lazy" src="img/logo.png"></a>
                </div><!--logo-->
                    <div class="nav col-8-12">
                             <ul>
                                   <li><a href="index.php">Accueil</a></li>
                                     <li><a href="#">Tournois</a>
                                        <ul class="sousmenu">
                                        <li><a href="more.php">CS:GO</a></li>
                                           <li><a href="autres.html">Autres tournois</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="festival.html">Festival du Jeu</a></li>
                                    <li><a href="news.php">News</a></li>
                                    <li><a href="partner.php">Partenaires</a></li>
                                    <li><a href="galerie.php">Galerie</a></li>
                                    <li><a href="asso.php">L'association</a>
                                     <ul class="sousmenu media">
                                     	<li><a href="asso.php">L'équipe</a></li>
                                        <li><a href="media.html">Press kit</a></li>
                                        </ul>
                                        </li>
                            </ul>
                    </div><!--nav-->
            </div><!--top-->
          
                               <ul class="bxslider">
                                      <li><img src="slide/Slider-Tournois-et-Festival_v3.jpg" /></li>
                                      <li><img src='slide/Slider-Tournois-et-Festival_v2.jpg' /></li>
                                   </ul>
</section><!--header-->
<section class="ddle">
        <div class="content grid grid-pad">
                    <div class="titrearticle col-9-12">
                                <h1><span>CONTACTEZ-NOUS, ON EST SYMPA</span></h1>
                    </div><!--titrearticle-->
                   			 <div class="articletxt col-9-12">
                              
                                          
                                            <h4>Que vous soyez un joueur en recherches d’informations ou une association désireuse de travailler avec nous, n’hésitez pas à nous envoyer un message grâce au formulaire de contact ci-dessous :</h4><br/>
<hr class="titrehrins grid"/>
<br/>
<br/>
<br/>
             
                            		<form action="contact.php"  method="post" class="formulaireins">
                                    <?php
										$name = $_POST['name'];
										$forname = $_POST['forname'];
										$email = $_POST['email'];
										$objet = $_POST['objet'];
										$message = $_POST['message'];
										$from = 'From: gaming-gen.fr'; 
										$to = 'zo.piotr@gmail.com'; 
										$nickname = $_POST['nickname'];
										$subject = 'Message depuis le formulaire gaming-gen.fr';
										$human = $_POST['human'];
												
										$body = "From: $forname $nickname\n $name\n  $email\n Objet: $subject pour $objet\n  Message: $message\n";
													
										if ($_POST['submit'] && $human == '12') {				 
											if (mail ($to, $subject, $body, $from)) { 
											echo '<p>Votre message a bien été envoyé!</p>';
										} else { 
											echo '<p>Quelque chose ne va pas, revenez plus tard et réessayer!</p>'; 
										} 
										} else if ($_POST['submit'] && $human != '12') {
										echo '<p>Mauvaise réponse à la multiplication!</p>';
										}
									?>
                                    Tous les champs sont obligatoires<br/>
                                    <label for="name">Nom</label><input id="name" name="name" type="text" required>
                                    <label for="forname">Prénom</label><input  id="forname" name="forname" type="text" required>
                                    <label for="nickname">Nickname</label><input id="nickname" name="nickname" type="text" required>
                                    <label for="email">Email</label><input id="email" name="email" type="email" required>
                                    <label for="objet">Objet</label><input id="objet" name="objet" type="objet" required>
                                     <label for="message">Message</label><textarea id="message" name="message" type="textarea" rows="10" cols="42"></textarea><br/><br/>
                                     Test antispam, veuillez résoudre la multiplication<input style="width:10%;" id="human" name="human" placeholder="4 x 3" /><br/>
                                     <br/>
                                     <br/>
                                     <br/>
                                    <button type="reset" class="btn btn-5 btn-5b icon-remove col-3-12"><span><a href="#">Annuler</a></span></button>
                                    <button type="submit" name="submit" value="Envoyer" class="btn btn-ins btn-insb icon-arrow-right col-3-12 push-right"><span><a href="#">ENVOYER</a></span></button>
                                    </form><br/><br/><br/>
                                                       
                                                                
                             </div><!--articletxt-->
                            							   
                                                            
                             <div class="hotfix col-3-12">
                                     <h6>RECHERCHER</h6>
                                             <div class="rechloupe">
                                                <input form="Recherche">
                                                <button class="loupe" value="submit"><img src="img/loupe.jpg"></button>
                                             </div><!--rechloupe-->
                                                 <div class="lastarticle">
                                                              <div class="stats"> <span class="csgoimg col-1-4"></span> <h3>COUNTER-STRIKE:GO</h3> <h4>30 Teams / 32 Slots</h4>
                                                             
                                                                <progress id="avancement" value="85" max="100"></progress><br/>
                                                                
                                                            <a href="inscrits.html">Voir les inscrits/équipes</a></div></div><!--lastarticle-->
                                 <div class="surleforum">
                                 </div><!--surleforum-->
                             </div><!--hotfix-->
                            
                      					
        </div><!--content-->
        										<div class="grid grid-pad">
                                               	    <div class="iconact col-6-12">
                                                        <span><a href="membres.php">Membres</a><img src="img/membres.gif"></span>
                                                        <span><a href="inscrits.html">Teams</a><img class="lazy" src="img/team.gif"></span>
                                                        <span><a href="galerie.php">Galeries</a><img src="img/galerie.gif"></span>
                                                        <span><a href="contact.php">Contact</a><img src="img/contact.gif"></span>
                                                        <span><a href="media.html">Media</a><img src="img/media.gif"></span>
                                                    </div><!--iconact-->
                                                    <div class="socialico push-right">
                                                        <span class="fbsoc col-3-12">
                                                        <a href="https://fr-fr.facebook.com/gaming.gen.lan" target="_blank"></a>
                                                        </span>
                                                        <span class="twisoc col-3-12">
                                                        <a href="https://twitter.com/gaminggenlan" target="_blank"></a>
                                                        </span>
                                                    </div><!--socialico-->
                                                </div><!--iconact-->
                                                <div class="pushfoot"></div>
                                                
                                                <footer>
                                                <div class="menufooter">
                                                <span class="ment">
                                                <a href="index.php">Accueil</a>
                                                <a href="asso.php">Qui sommes nous?</a>
                                                <a href="mentleg.php">Mentions légales</a>
                                                </span>
                                                </div>
                                                </footer><!--footer-->
                                                
</section><!--ddle-->
</div><!--conteneurgnral-->
<script type="text/javascript" src="js/classie.js"></script>
<script type="text/javascript" src="js/modalEffects.js"></script>
</body>
</html>
