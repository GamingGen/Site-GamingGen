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
<a class="md-trigger" data-modal="modal-1">Login</a>&nbsp;&nbsp;<a class="md-trigger" data-modal="modal-1">Créer un compte</a></span>

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
                                <h1>
                                <span class="pull-left col-3-12">VOTRE PROFIL</span> 
                                <span class="pull-right col-3-12">
                                <button onclick="window.location.replace('more.php');" class="buttonsuppression btn btn-5 btn-5b icon-remove">
                                <span>Supprimer</span>
                                </button>
                                </span>
                                <span class="pull-right col-3-12"> 
                                <button onclick="window.location.replace('compteuseredit.php');" class="buttonteam btn btn-ins btn-insb icon-cog">
                                <span>Editer mon profil</span>
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
                                    <div class="descriptionuser col-8-12 pull-right">
                                    <form>
                                    <input type="text" placeholder="Mr.hankey"><br/><br/>
                                    <SELECT id="Jeux" name="Jeux" size="1">
                                    <OPTION>Choisir un jeu
                                    <OPTION>League of Legend
                                    <OPTION>Starcraft 2
                                    <OPTION>Counter-strike:Global offensive
                                    </SELECT>
                                    <br/><br/>
                                    <textarea type="descriptionuser">Voilà ma courte description : 
1er ESWC FR
1er Pxl-lan
Alors salut!</textarea><br/><br/>
<button type="submit">Mettre à jour</button>
</form>
                                    </div>
                                    <hr class="grid"/><br/>
                                       
                                                                
                             </div><!--articletxt-->
                            							   
                                                            
                             <div class="hotfix col-3-12">
                                                 <div class="mateam">
                                                     	<h6><span class="fa fa-users"></span>&nbsp;&nbsp;MA TEAM</h6>
                                                             <div class="tonequipe">
                                                                 <h4>Vous ne faites parti d'aucune team pour l'instant</h4>
                                                                 <br/>
                                                                 <br/>
                                                                 <button onclick="window.location.replace('teamcreate.php');" class="buttonteam btn btn-ins btn-insb icon-plus">
                                                                    <span>Créer une team</span>
                                                                    </button>
                                                             </div><!--tonequipe-->
                                                 </div><!--mateam-->
                                                 <div class="moninscription">
                                                     	<h6><span class="fa fa-file-text"></span>&nbsp;&nbsp;INSCRIPTION</h6>
                                                             <div class="toninscription">
                                                                 <h4>Vous êtes inscrit à la Gaming-gen 4 avec l'équipe<h5>Early</h5></h4>
                                                                 <br/>
                                                                 <br/>
                                                                  <button onclick="window.location.replace('more.php');" class="buttonsuppression btn btn-5 btn-5b bh-icon-sad">
                                                                    <span>ANNULER</span>
                                                                    </button>
                                                             </div><!--tonequipe-->
                                                 </div><!--mateam-->
                                                 <h6>RECHERCHER</h6>
                                             <div class="rechloupe">
                                                <input form="Recherche">
                                                <button class="loupe" value="submit"><img src="img/loupe.jpg"></button>
                                             </div><!--rechloupe-->
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
