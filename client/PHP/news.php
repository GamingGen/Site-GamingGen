<?php 
    session_start(); 
?>
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="style/reset.css">
<link rel="stylesheet" href="style/main.css">
<link href="lib/jquery.bxslider.css" rel="stylesheet" />
<link rel="stylesheet" href="font-awesome-4.2.0/css/font-awesome.min.css">
<link rel="icon" href="img/favicon.ico" />
<link rel="icon" type="image/png" href="img/favicon.png" />
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
<script type="text/javascript" src="http://code.jquery.com/jquery-1.11.1.min.js"></script>
<script type="text/javascript" src="js/fresco.js"></script>
<script src="js/modernizr.js"></script>
<link rel="stylesheet" type="text/css" href="style/fresco/fresco.css" />
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
						<h1>LOGIN</h1><button onclick="window.location.replace('http://gaming-gen.fr/dev/component/users/');" class="insmodal btn btn-ins btn-insb icon-file"><span><a href="http://gaming-gen.fr/dev/component/users/?view=registration">Créer un compte</a></span></button>
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
<a href="http://gaming-gen.fr/use/component/users/" data-modal="modal-1">Login</a>&nbsp;&nbsp;<a href="http://gaming-gen.fr/dev/component/users/?view=registration" data-modal="modal-1">Créer un compte</a>

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
            </div><!--top--><ul class="bxslider">
                                      <li><img src="slide/Slider-Tournois-et-Festival_v3.jpg" /></li>
                                      <li><img src='slide/Slider-Tournois-et-Festival_v2.jpg' /></li>
                                   </ul>
</section><!--header-->
<section class="ddle">
        <div class="content grid grid-pad">
                    <div class="titrearticle col-9-12">
                                <h1><span>LES NEWS</span></h1> 
                              
                   </div><!--titrearticle-->
                   			<div class="articletxt col-9-12">
                              <div class="blocpreviewnews">
                               <a style="color:#000;" href="article4.php"><h2>Suite de la Gaming Gen 4</h2></a>
                              <hr class="sepanews"/>
                              <span class="preznews grid">
                              <h5 class="col-3-12">Fred - 10 Juin 2015</h5><h5 class="push-right" style="color:#0090B0;"></h5>
                              </span>
                               <hr class="sepanews"/><br/>
                               <h3>Ami gamer, <br/>

Tu as participé au tournoi CS: GO de la Gaming Gen 4 (15-17 Mai @Gardanne) et nous te remercions pour ta conf{...}</h3><br/>
                               <h3><a style="color:#0090B0;" href="article4.php">Lire la suite</a></h3><br/>
                               <hr/>
                               <br/>
                               <a style="color:#000;" href="article3.php"><h2>*** TOURNOI CS:GO DE LA GG4 : PRESQUE COMPLET ***</h2></a>
                              <hr class="sepanews"/>
                              <span class="preznews grid">
                              <h5 class="col-3-12">Fred - 10 Mai 2015</h5><h5 class="push-right" style="color:#0090B0;"></h5>
                              </span>
                               <hr class="sepanews"/><br/>
                               <h3>*** TOURNOI CS:GO DE LA GG4 : PRESQUE COMPLET ***</h3><br/>
                               <h3><a style="color:#0090B0;" href="article3.php">Lire la suite</a></h3><br/>
                               <hr/>
                               <br/>
                              <a style="color:#000;" href="news2.php"><h2>Homologation Masters du jeu vidéo</h2></a>
                              <hr class="sepanews"/>
                              <span class="preznews grid">
                              <h5 class="col-3-12">Fred - 14 Avril 2015</h5><h5 class="push-right" style="color:#0090B0;"></h5>
                              </span>
                               <hr class="sepanews"/><br/>
                               <h3>Hier, nous recevions une très bonne nouvelle pour vous, ami(e)s gamers! Aujourd'hui, nous vous la partageons!</h3><br/>
                               <h3><a style="color:#0090B0;" href="news2.php">Lire la suite</a></h3><br/>
                               <hr/>
                               <br/>
                              <a style="color:#000;" href="#"><h2>Ouverture des inscriptions!</h2></a>
                              <hr class="sepanews"/>
                              <span class="preznews grid">
                              <h5 class="col-3-12">Fred - 30 Mars 2015</h5><h5 class="push-right" style="color:#0090B0;"></h5>
                              </span>
                               <hr class="sepanews"/><br/>
                               <h3>Les inscriptions sont désormais ouvertes! Dans un premier temps, créez vous <a href="http://gaming-gen.fr/use/component/users/">un compte ici</a> puis : Si vous souhaitez vous inscrire individuellement, rendez-vous à <a href="http://gaming-gen.fr/use/gaming-gen-4?task=viewevent&itid=3">cette adresse</a>. Pour inscrire une équipe et ainsi réserver votre table (minimum de 3 joueurs validés), c'est <a href="http://gaming-gen.fr/use/gaming-gen-4?task=viewevent&itid=2">ici que ça se passe!</a><br/>Good Luck!</h3><br/>
                               <hr/>
                               <br/>
                              <a style="color:#000;" href="article.php"><h2>Gaming Gen 4 : annonce de l'événement</h2></a>
                              <hr class="sepanews"/>
                              <span class="preznews grid">
                              <h5 class="col-3-12">Zo - 06 Février 2015</h5><h5 class="push-right" style="color:#0090B0;">_</h5>
                              </span>
                               <hr class="sepanews"/><br/>
                               <h3>3 jours de jeux, 3 jours d’émotions, 3 jours de rencontres et de découvertes... L’association Gaming Generation est fière de vous annoncer que la 4ème édition de son grand festival du jeu, la Gaming Gen, aura lieu à la Halle de Gardanne (13120), du 15 au 17 mai 2015.</h3><br/>
                               
                               <h3><a style="color:#0090B0;" href="article.php">Lire la suite</a></h3><br/>
                               <hr/>
                               <br/>
                               </div>
                              
                               
                               
                                                     
                                                                
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
