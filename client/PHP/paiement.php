<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="style/reset.css">
<link rel="stylesheet" href="style/main.css">
<link rel="stylesheet" href="lib/jquery.bxslider.css">
<link rel="stylesheet" href="font-awesome-4.2.0/css/font-awesome.min.css">
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
<script>
$(document).ready(function() {
    $(".tabs-menu a").click(function(event) {
        event.preventDefault();
        $(this).parent().addClass("current");
        $(this).parent().siblings().removeClass("current");
        var tab = $(this).attr("href");
        $(".tab-content").not(tab).css("display", "none");
        $(tab).fadeIn();
    });
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
<section class="header">
			<div class="top grid grid-pad">
                <div class="logo col-4-12">
                <img src="img/logo.png">
                </div><!--logo-->
                    <div class="nav col-8-12">
                             <ul>
                                     <li><a href="index.php">Accueil</a></li>
                                    <li><a href="more.php">Gaming Gen 4</a>
                                        <ul class="sousmenu">
                                        <li><a href="more.php">Tournois</a></li>
                                           <li><a href="festival.php">Festival du jeu</a></li>
                                        </ul>
                                    </li>
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
          
                               <!--SLIDER QUI MARCHE PAS <ul clasqzdqzdqzds="bxslider">
                                      <li><img src="img/IMG_02491.jpg" /></li>
                                      <li><img src="img/ohlol.jpg" /></li>
                                      <li><img src="img/slide1.jpg" /></li>
                                   </ul>-->
</section><!--header-->
<section class="ddle">
        <div class="content grid grid-pad">
                    <div class="titrearticle col-9-12">
                                <h1><span>PAIEMENT</span></h1>
                    </div><!--titrearticle-->
                   			 <div class="articletxt col-9-12">
                              
                                          
                                            <h4>Choisissez maintenant votre mode de paiement, vous pouvez choisir de payer votre entrée sur place, mais elle coûtera 5€ plus cher.</h4><br/>
<div class="grid infosgen">
<span class="fa-stack fa-lg">
<i class="fa fa-circle fa-stack-2x" style="color:#F90;"></i>
<i class="fa fa-money fa-stack-1x fa-inverse"></i>
</span>
Mode de paiement<hr class="titrehrins col-8-12" style="float:right;"/></div>
<br/>
                                
  <div id="tabs-container">
    <ul class="tabs-menu pull-left">
        <li class="current"><a href="#tab-1">Paypal (Carte bancaire)</a></li>
        <li><a href="#tab-2">Chèque bancaire</a></li>
        <li><a href="#tab-3">Paiement sur place</a></li>
    </ul>
                                            <div class="tab col-8-12 pull-right">
                                                <div id="tab-1" class="tab-content">
                                                    <i class="fa fa-paypal fa-5x" style="color:#336699;"></i><br/><br/>
                                                    <span><h4>Payer grâce à votre compte paypal ou votre carte bleue si vous n’avez pas de compte.</h4></span><br/><br/>
                                                     <span class="boutonorange"><a href="#"><p>ALLER A LA PAGE DE PAIEMENT</p></a></span>
                                                </div>
                                                <div id="tab-2" class="tab-content">
                                                    <span><h4>Envoyez nous un chèque de 15€ avec au dos inscrit votre nom et votre pseudo. Votre inscription sera validée dès réception du chèque.<br/>
                                                    <br/><br/><br/>
                                                    Chèque à l’ordre de Gaming Generation, a envoyer à :<br/>
                                                    <br/><br/>
                                                    Gaming Generation<br/>
                                                    2 cité centrale 1<br/>
                                                    13120 Gardanne</h4>
                                                    </span>
                                                
                                                </div>
                                                <div id="tab-3" class="tab-content">
                                                    <span><h4>Rendez-vous le 26 Mai muni de 20€ en espèce ou en chèque.</h4></span>
                                                </div>
                                            </div>
	</div><!-- tabs-container-->
    <div class="finalpaiment">
    <hr class="titrehr"/>
    <h5 class="col-5-12 pull-left">Montant de l'inscription : 15€</h5>
                                    <button onclick="window.location.replace('paiementdone.php');" class="btn btn-ins btn-insb icon-arrow-right col-3-12 push-right"><span><a href="#">SUIVANT</a></span></button>
    </div>
                             </div><!--articletxt-->
                            							   
                                                            
                             <div class="hotfix col-3-12">
                                     <h6>RECHERCHER</h6>
                                             <div class="rechloupe">
                                                <input form="Recherche">
                                                <button class="loupe" value="submit"><img src="img/loupe.jpg"></button>
                                             </div><!--rechloupe-->
                                                 <div class="lastarticle">
                                                     	 <h6>DERNIERS ARTICLES</h6>
                                                             <div class="rechloupe">
                                                                 <h4>Article le plus récent</h4>
                                                                 <hr/>
                                                                 <h4>Deuxième article</h4>
                                                                 <hr/>
                                                                 <h4>Digression phisophalique</h4>
                                                                 <hr/>
                                                                 <h4>Vieil article</h4>
                                                             </div><!--rechloupe-->
                                                 </div><!--lastarticle-->
                                 <div class="surleforum">
                                 </div><!--surleforum-->
                             </div><!--hotfix-->
                            
                      					
        </div><!--content-->
        										<div class="grid grid-pad">
                                               	    <div class="iconact col-6-12">
                                                        <span><a href="membres.php">Membres</a><img src="img/membres.gif"></span>
                                                        <span><a href="team.php">Teams</a><img src="img/team.gif"></span>
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
