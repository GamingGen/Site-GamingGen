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
                                    <li><a href="asso.php">L'association</a></li>
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
                                <h1>
                                <span class="pull-left col-3-12">TEAM DRAGON</span> 
                                <span class="pull-right col-4-12"> 
                                <button onclick="window.location.replace('teamcreate.php');" class="buttonteam btn btn-ins btn-insb icon-cog">
                                <span>Manager la team</span>
                                </button>
                                </span>
                                <span class="pull-right col-3-12">
                                <button onclick="window.location.replace('more.php');" class="buttonsuppression btn btn-5 btn-5b icon-plus">
                                <span>Supprimer la team</span>
                                </button>
                                </span>
                                </h1> 
                    </div><!--titrearticle-->
                   			 <div class="articletxt col-9-12">
                              
                                
                                    <div class="uplogo col-4-12">
                                    <div class="imglogo">
                                    <img src="img/standardlogo.png">
                                    
                                    </div>
                                    </div>
                                    <div class="descriptionteam col-8-12 pull-right">
                                    <h1>Drag0n</h1>
                                    <h3>Counter-strike:Global offensive</h3>
                                    <br/>
                                    <h4>Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un peintre anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié.</h4>
                                    </div>
                                    <hr class="grid"/><br/>
                                    <div class="grid infosgen">
                                <h2>
                                MEMBRES DE LA TEAM
                                </h2>
                               	 </div>
                                 <span class="profileplayereachdone col-2-12">
                                 <a href="#">
                                 <span class="fa-stack fa-lg fa-3x">
                                 <i class="fa fa-circle fa-stack-2x fa-3x" style="color:#E0E0E0;"></i>
                                 <i class="fa fa-user fa-stack-1x fa-inverse"></i>
                                 </span>
                                 <h5>Nom du joueur</h5>
                                 </a>
                                 </span>
                                  <span class="profileplayereachdonecaps col-2-12">
                                 <a href="#">
                                 <span class="fa-stack fa-lg fa-3x">
                                 <i class="fa fa-circle fa-stack-2x fa-3x" style="color:#E0E0E0;"></i>
                                 <i class="fa fa-user fa-stack-1x fa-inverse"></i>
                                 </span>
                                 <i class="fa fa-star sheriff"></i>
                                 <h5>Nom du joueur</h5>
                                 </a>
                                 </span>
                                  <span class="profileplayereachdone col-2-12">
                                 <a href="#">
                                 <span class="fa-stack fa-lg fa-3x">
                                 <i class="fa fa-circle fa-stack-2x fa-3x" style="color:#E0E0E0;"></i>
                                 <i class="fa fa-user fa-stack-1x fa-inverse"></i>
                                 </span>
                                 <h5>Nom du joueur</h5>
                                 </a>
                                 </span>
                                  <span class="profileplayereachdone col-2-12">
                                 <a href="#">
                                 <span class="fa-stack fa-lg fa-3x">
                                 <i class="fa fa-circle fa-stack-2x fa-3x" style="color:#E0E0E0;"></i>
                                 <i class="fa fa-user fa-stack-1x fa-inverse"></i>
                                 </span>
                                 <h5>Nom du joueur</h5>
                                 </a>
                                 </span>
                                  <span class="profileplayereachdone col-2-12">
                                 <a href="#">
                                 <span class="fa-stack fa-lg fa-3x">
                                 <i class="fa fa-circle fa-stack-2x fa-3x" style="color:#E0E0E0;"></i>
                                 <i class="fa fa-user fa-stack-1x fa-inverse"></i>
                                 </span>
                                 <h5>Nom du joueur</h5>
                                 </a>
                                 </span>
                                  <hr class="grid"/>
                                  <br/><br/><br/><br/>
                                                       
                                                                
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
