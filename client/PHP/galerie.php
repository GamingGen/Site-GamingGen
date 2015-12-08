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
<script src="https://raw.githubusercontent.com/tuupola/jquery_lazyload/master/jquery.lazyload.js"></script>
<script src="galleria/galleria-1.4.2.min.js"></script>
<script src="galleria/plugins/facebook/galleria.facebook.js"></script>
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
    <script>
Galleria.loadTheme('js/galleria/themes/classic/galleria.classic.min.js');
Galleria.run('#galleria', {
 facebook: 'album:862402090499148',
 width: 250,
 lightbox: true,
 facebookOptions: {
   max: 30 // optional override for limit of 40 photos on an album
 }
});
</script>
    
<script type="text/javascript">
$(document).ready(function(){
  $('.bxslider').bxSlider();
});
</script></head>
<body>

<!-- Modal -->
<div class="md-modal md-effect-1" id="modal-1">
			<div class="md-content">
					<div class="insider">
						<h1>LOGIN</h1><button onclick="window.location.replace('#');" class="insmodal btn btn-ins btn-insb icon-file"><span><a href="#">Créer un compte</a></span></button>
                    	<hr/>
                        <div class="awake">
                            <div class="user"><img class="lazy" src="img/user.png"><input form="Nom d'utilisateur" placeholder="Nom d'utilisateur"></div>
                            <div class="verrou"><img class="lazy" src="img/verrou.png"> <input form="Mot de passe" placeholder="Mot de passe"><button class="loupe goconnect" value="submit"><img class="lazy" src="img/goconnect.png"></button></div> 
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
                <div class="logo col-4-12"><a href="http://www.gaming-gen.fr" target="_self">
                <img src="img/logo.png"></a>
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
                                <h1>GALERIE - <span>GAMING-GEN 3</span></h1>
                    </div><!--titrearticle-->
                   			 <div class="articletxt grid galerie" id="effect-1">
                             <div class="pushgalerie">
                                         <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0306.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0306_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                          <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0307.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0307_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                          <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0308.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0308_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                          <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0309.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0309_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                          <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0310.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0310_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                          <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0313.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0313_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                          <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0315.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0315_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                          <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0324.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0324_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                          <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0325.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0325_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                          <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0326.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0326_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                          <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0327.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0327_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                          <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0330.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0330_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                          <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0331.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0331_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                          <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0333.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0333_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                          <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0334.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0334_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                          <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0335.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0335_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                          <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0336.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0336_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0339.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0339_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0340.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0340_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0342.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0342_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0343.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0343_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0346.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0346_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0348.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0348_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0349.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0349_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0351.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0351_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0353.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0353_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0356.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0356_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0359.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0359_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0363.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0363_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0365.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0365_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0366.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0366_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0368.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0368_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0369.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0369_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0372.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0372_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0373.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0373_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0374.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0374_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0375.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0375_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0377.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0377_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0378.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0378_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0380.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0380_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0382.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0382_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0383.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0383_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0386.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0386_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0387.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0387_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0389.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0389_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0391.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0391_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0392.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0392_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0395.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0395_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0398.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0398_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0401.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0401_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0403.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0403_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0405.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0405_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0406.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0406_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0409.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0409_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0410.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0410_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0411.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0411_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0412.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0412_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0413.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0413_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0414.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0414_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0415.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0415_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0417.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0417_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0419.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0419_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0420.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0420_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0423.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0423_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0426.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0426_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0430.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0430_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0431.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0431_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0432.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0432_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0433.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0433_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0435.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0435_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0436.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0436_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0437.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0437_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0441.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0441_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0442.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0442_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0443.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0443_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0444.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0444_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0448.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0448_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0449.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0449_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0450.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0450_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0452.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0452_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0453.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0453_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0454.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0454_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0455.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0455_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0456.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0456_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0458.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0458_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0459.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0459_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0461.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0461_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0462.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0462_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0463.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0463_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0464.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0464_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0466.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0466_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0467.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0467_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0468.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0468_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0470.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0470_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0472.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0472_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0473.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0473_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0474.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0474_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0476.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0476_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0478.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0478_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0485.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0485_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0489.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0489_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0490.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0490_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0491.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0491_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0493.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0493_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0494.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0494_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0496.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0496_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0498.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0498_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0506.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0506_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0508.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0508_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0510.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0510_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0511.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0511_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0512.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0512_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0513.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0513_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0515.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0515_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0517.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0517_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0518.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0518_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0519.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0519_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0521.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0521_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0522.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0522_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0525.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0525_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0526.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0526_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0527.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0527_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0529.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0529_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0531.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0531_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0532.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0532_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0533.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0533_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0535.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0535_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0536.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0536_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0539.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0539_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0540.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0540_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0541.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0541_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0542.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0542_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0544.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0544_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0545.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0545_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0546.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0546_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0548.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0548_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0549.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0549_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0550.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0550_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0551.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0551_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                           <figure class="col-3-12">   
                                          <a href="img/photos_max/DSC_0553.JPG"
                                             class='fresco' >
                                            <img class="lazy" src="img/photos_min/DSC_0553_Mini.jpg" width="250" height="190" alt=''/>
                                            </a>
                                           <figcaption >
                                                        <h4>Veux tu agrandir cette photo?</h4>
                                                        
                                            </figcaption>
                                          </figure>
                                          </div><!--Pushgalerie-->
                                         
                                                      
                                                       
                                                                
                             </div><!--articletxt-->
                            							   
                                                            
                              
                             
                      					
        </div><!--content-->
        										<div class="grid grid-pad">
                                               	    <div class="iconact col-6-12">
                                                        <span><a href="membres.php">Membres</a><img class="lazy" src="img/membres.gif"></span>
                                                        <span><a href="inscrits.html">Teams</a><img class="lazy" src="img/team.gif"></span>
                                                        <span><a href="galerie.php">Galeries</a><img class="lazy" src="img/galerie.gif"></span>
                                                        <span><a href="contact.php">Contact</a><img src="img/contact.gif"></span>
                                                        <span><a href="media.html">Media</a><img src="img/media.gif"></span>
                                                    </div><!--iconact-->
                                                    <div class="socialico push-right">
                                                        <span class="fbsoc col-2-12">
                                                        <a href="https://fr-fr.facebook.com/gaming.gen.lan" target="_blank"></a>
                                                        </span>
                                                        <span class="twisoc col-2-12">
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
