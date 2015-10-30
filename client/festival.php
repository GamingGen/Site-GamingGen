<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="style/reset.css">
<link rel="stylesheet" href="style/main.css">
<link href="lib/jquery.bxslider.css" rel="stylesheet" />
<link rel="stylesheet" href="font-awesome-4.2.0/css/font-awesome.min.css">
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
<script type="text/javascript">
$(document).ready(function(){
  $('.bxslider').bxSlider();
});
</script>
</head>
<body>

<!-- Modal -->
<div class="md-modal md-effect-1" id="modal-1">
			<div class="md-content">
					<div class="insider">
						<h1>LOGIN</h1><button onclick="window.location.replace('inscription.php');" class="insmodal btn btn-ins btn-insb icon-file"><span><a href="inscription.php">Créer un compte</a></span></button>
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
<section class="header fest">
			<div class="top grid grid-pad">
                <div class="logo col-4-12">
                <img src="img/logo.png">
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
                                      <li><img src="img/IMG_02491.jpg" /></li>
                                      <li><img src="img/ohlol.jpg" /></li>
                                      <li><img src="img/slide1.jpg" /></li>
                                   </ul>
</section><!--header-->
<section class="ddle">
        <div class="content grid grid-pad festival">
                    <div class="titrearticle col-1-1">
                                <h1><span>FESTIVAL DU JEU</span></h1> 
                              
                    </div><!--titrearticle-->
                   			  <div class="articletxt col-1-1">
                             <h5 style="text-align:center;">Des dizaines d’exposants<br/> De nombreuses activités<br/>
Des milliers de visiteurs attendus</h5>
                                          <br/>
                                            <h4>Votre grande Fête du Jeu, avec de nombreuses animations, activités et stands
accessibles aux visiteurs et joueurs de la Gaming Gen 4.<br/>
Au-delà des compétitions officielles, nous souhaitons faire de cet événement une manifestation
regroupant de nombreuses associations et entreprises autour du Jeu, afin de proposer aux
joueurs et aux visiteurs des animations ludiques.<br/><br/>
<i style="text-align:center;"><b>Au menu :</b></i><br/><br/>
<b>- Retro Gaming</b> : de nombreuses consoles et jeux old-school pour les nostalgiques.<br/>
<b>- Jeux musicaux</b> : Rock Band et Just Dance, pour ceux qui ont le sens du rythme.<br/>
<b>- Challenge Airsoft</b> : stand de tir et parcours chronométrés.<br/>
<b>- Jeux de Rôlistes</b> : initiation et parties endiablées.<br/>
<b>- Jeux de Société</b> : Scrabble et autres célèbres jeux feront travailler les méninges.<br/>
<b>- Pour les plus jeunes</b> : multiples jeux de société pour enfants.<br/>
<b>- Diverses animations</b> : babyfoot, tournoi FIFA, combats de sumos, tombola,
démonstrations de robotique...<br/></h4>
                                            <div class="col-1-1">
                                                         <br/><br/><h1 style="color:#000;float:left;">LE PLAN DE NOTRE FOLIE</h1><hr class="titrehr"/>
                                                       <br/>
                                                       <br/>
                                                       <div class="trombicont col-1-1">
                                                       <h3>Plan version 1.1, non définitif et non contractuel</h3>
                                                       <span class="col-1-1">
                                                       <img class="col-1-1" src="img/festival/GG4---plan-Stands-v1.jpg"/>
                                                       </span>
                                                        
                                                         </div>
                                                     
                                                                
                             </div><!--articletxt-->
                            							   
                                                            
                             
                                                    
                                                                
                      			
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
