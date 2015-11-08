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
                                    <li><a href="more.php">Gaming Gen 4</a></li>
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
                              <div class="blocnews">
                              <a style="color:#000;" href="article.php"><h2>Suite de la Gaming Gen 4</h2></a>
                              <hr class="sepanews"/>
                              <span class="preznews grid">
                              <h5 class="col-3-12">Fred - 10 Juin 2015</h5><p class="push-right" style="font-size:0.5em;"><span class="fa-stack fa-lg"><a style="color:#000;" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fwww.gaming-gen.fr&t=" title="Partagez notre article sur facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(document.URL) + '&t=' + encodeURIComponent(document.URL)); return false;"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-facebook fa-inverse fa-stack-1x"></i></a></span><span class="fa-stack fa-lg"><a style="color:#000;" href="https://twitter.com/intent/tweet?source=http%3A%2F%2Fwww.gaming-gen.fr&text=:%20http%3A%2F%2Fwww.gaming-gen.fr" target="_blank" title="Tweet" onclick="window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(document.title) + ':%20'  + encodeURIComponent(document.URL)); return false;"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-twitter fa-inverse fa-stack-1x"></i></a></span></p>
                              
                              </span>
                               <hr class="sepanews"/><br/>
                               <span class="col-9-12">
                               <h3>
Ami gamer, <br/>

Tu as participé au tournoi CS: GO de la Gaming Gen 4 (15-17 Mai @Gardanne) et nous te remercions pour ta confiance.<br/><br/>

Nous avons pris beaucoup de plaisir à partager ce week-end avec vous et nous espérons que vous vous êtes régalé !<br/><br/>

<h2>Questionnaire de satisfaction</h2><br/>
Soucieux de nous améliorer, nous souhaitons recueillir tes avis, remarques et critiques constructives.<br/>
Merci de répondre à ce questionnaire de satisfaction (très rapide).<br/><br/>
<a href="https://docs.google.com/a/gaming-gen.fr/forms/d/19_VLqEY2Y-8TSE2U57NPZCGPUMHeYeBSO6vEGENdyaY/viewform" target="_blank">LE QUESTIONNAIRE</a><br/><br/>

<h2>Les photos</h2><br/>
Les photos ont été publiées sur Facebook (et bientôt sur notre site).<br/>
​N'hésitez pas à commenter, aimer, partager... :)<br/>
L'album photo GG4 sur Facebook, c'est ici !<br/><br/> 
<a href="https://www.facebook.com/media/set/?set=a.862402090499148.1073741826.112748285464536&type=1" target="_blank">L'ALBUM DES PHOTOS</a><br/><br/><br/>



On te donne rendez-vous très bientôt, pour l'annonce de la Gaming Gen 5...<br/><br/>

PS : Nous avons de nombreuses demandes concernant les démos du tournoi, on vous expliquera tout très vite...<br/><br/>

Gaming Gen, le jeu est dans nos gènes !<br/>
www.gaming-gen.fr <br/>
---
</h3><br/></span>
                               <span class="col-3-12 push-right"><img src="img/previewnews.png"></span>
                               <br/>
                               </div><!--blocnews--><br/>
                               <!--<div class="commentz grid">
                               <h1 class="col-4-12" style="color:#000;">Commentaires</h1><hr class="titrehr"/>
                               <span class="commentzeach grid pull-left"><img class="pull-left" src="img/standardpicmember.png"><h5 class="col-10-12">Bilel Belhadj</h5><h4 class="col-9-12">Nunc turpis odio sed facilisis penatibus, mauris ac, odio scelerisque, amet tempor eu lectus amet natoque, turpis magna? Nec nisi vut. Mid lacus massa nisi porttitor amet aliquam nec a! Pellentesque sed, dignissim eu, turpis tincidunt! Sagittis tincidunt, et! Porttitor, vel duis.</h4></span>
                                <span class="commentzeach grid pull-left"><img class="pull-left" src="img/standardpicmember.png"><h5 class="col-10-12">Bilel Belhadj</h5><h4 class="col-9-12">Nunc turpis odio sed facilisis penatibus, mauris ac, odio scelerisque, amet tempor eu lectus amet natoque, turpis magna? Nec nisi vut. Mid lacus massa nisi porttitor amet aliquam nec a! Pellentesque sed, dignissim eu, turpis tincidunt! Sagittis tincidunt, et! Porttitor, vel duis.</h4></span>
                                 <span class="commentzeach grid pull-left"><img class="pull-left" src="img/standardpicmember.png"><h5 class="col-10-12">Bilel Belhadj</h5><h4 class="col-9-12">Nunc turpis odio sed facilisis penatibus, mauris ac, odio scelerisque, amet tempor eu lectus amet natoque, turpis magna? Nec nisi vut. Mid lacus massa nisi porttitor amet aliquam nec a! Pellentesque sed, dignissim eu, turpis tincidunt! Sagittis tincidunt, et! Porttitor, vel duis.</h4></span>
                                 <span class="commentzeach grid pull-left"><img class="pull-left" src="img/needlog.png">
                                 <form>
                                 <input class="inputcomment col-10-12" type="text">
                                 <button type="submit" onclick="" class="pull-right btn btn-ins btn-insb icon-file"><span>J'envoie</span></button>
                                 <button type="reset" onclick="" class="pull-right btn btn-5 btn-5b icon-plus"><span>J'efface</span></button>
                                 </form>
                                 </span>
                               </div>-->
                                
                               
                                                     
                                                                
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
                                                                
                                                            <a href="inscrits.html">Voir les inscrits/équipes</a>
                                                            </div>
                                                            <a href="inscrits.html">Voir les inscrits/équipes</a>
                                                           
                                                 </div><!--lastarticle-->
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
