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
<script src="lib/jquery.bxslider.min.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Gaming-gen</title>
<script src="https://maps.googleapis.com/maps/api/js"></script>
    <script>
      function initialize() {
        var map_canvas = document.getElementById('map_canvasbig');
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

<script type="text/javascript">
$(document).ready(function(){
  $('.bxslider').bxSlider();
});
</script>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-10158848-2', 'auto');
  ga('send', 'pageview');

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
                <div class="logo col-4-12">
                <a href="index.php"><img src="img/logo.png"></a>
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
                                <h1>GAMING GEN 4 <span>- 15 - 17 MAI 2015</span></h1>
                    </div><!--titrearticle-->
                   			 <div class="articletxt col-9-12">
                            		<div class="articleinfo col-7-12">
                                            <h5>Du 15 au 17 Mai 2015 à La Halle de Gardanne, l’univers du Jeu est à l’honneur : tournois et animations gratuites</h5>
                                            <hr class="col-5-12"/>
                                            <h4 class="col-12-12">Pour célébrer les 10 ans de sa 1ère aventure (CS Arena, Avril 2005, 60 joueurs), l’association Gaming Generation vous propose un événement inoubliable ! <br/>

Tout l’univers du Jeu y sera représenté : une partie Festival (profitez d’une vingtaine de stands et d’animations gratuites pour tous) et une partie Tournois (200 joueurs vont se rassembler autour de 3 jours de compétitions acharnées).<br/><br/>

Gaming Gen, le Jeu est dans nos gènes !<br/><br/>
Le tournoi officiel, sur CS : GO, rassemblera 32 équipes de 5 joueurs. Toutes les informations ci-dessous...</h4>
                                            					<section class="buttonmore">
                                                                    <button onclick="window.location.replace('index.php');" class="btn btn-5 btn-5b icon-plus"><span><a href="index.php">Retour</a></span></button>
                                                                    <button onclick="window.location.replace('http://gaming-gen.fr/dev/gaming-gen-4');" class="btn btn-ins btn-insb icon-file"><span><a href="inscription.php">Inscription</a></span></button>
                                                                </section><!--buttonmore-->
                                    </div><!--articleinfo-->
                                                        
                                                        <div class="tarifs col-4-12">
                                                         <h1>TARIFS</h1>
                                                         <br/>
                                                         <h4>EN PREVENTE : 15€ <br/>SUR PLACE : 20€ <br/><strong>GRATUIT POUR LES FILLES</strong></h4>
                                                        </div>
                                                       
                                                                
                             </div><!--articletxt-->
                            							   
                                                            
                             <div class="hotfix col-3-12">
                                     <h6>RECHERCHER</h6>
                                             <div class="rechloupe">
                                                <input form="Recherche">
                                                <button class="loupe" value="submit"><img src="img/loupe.jpg"></button>
                                             </div><!--rechloupe-->
                                                 <div class="lastarticle">
                                                              <div class="stats"> <span class="csgoimg col-1-4"></span>
                                                             <h3>COUNTER-STRIKE:GO</h3> <h4>30 Teams / 32 Slots</h4>
                                                             
                                                                <progress id="avancement" value="85" max="100"></progress><br/>
                                                                
                                                            <a href="inscrits.html">Voir les inscrits/équipes</a>
                                                            </div>
                                                           
                                                 </div><!--lastarticle-->
                                
                           
                                                        </div>
                                                     <div class="lieu col-8-12">
                                                     <h4><b>Horaires</b><br/><br/>
La salle ouvre aux joueurs CS:GO dès le vendredi, 17h. Tu peux venir t'installer, jouer des matchs amicaux, participer à <a href="autres.html">nos tournois funs</a> du Vendredi soir (Magic, 1v1 CS, babyfoot, ...).<br/>
Le tournoi CS:GO officiel débutera le samedi matin, 10h30. Toutes les équipes devront être présentes et validées dès 10h00 !<br/>
La salle restera accessible la nuit aux joueurs uniquement (fermée pour les visiteurs).<br/><br/>
<b>Matériel nécessaire</b><br/><br/>
Le tournoi étant un BYOC, il te faudra amener ton équipement complet :<br/>
Tour + écran + clavier + souris + tapis de souris + casque audio + cable réseau RJ45 + alimentations et périphériques + une multiprise.<br/>
Ton PC doit être entièrement à jour (Windows, Steam, anti-virus !). L'utilisation d'enceintes est interdite.<br/>
==>> Nous louons des tours + écrans, ensembles ou séparés. <a href="contact.php">Contacte-nous pour en savoir plus.</a><br/><br/>
<b>Terro-éco-dodo</b><br/><br/>
Une Sleep-zone sera aménagée au fond de la salle. Apporte ton matelas, duvet, oreiller et doudou si besoin.<br/>
Pour plus d'intimité, tu peux réserver un hôtel : Hôtel de Nice (à Gardanne) ou autres hôtels à Meyreuil, Aix en Provence et Plan de Campagne (tous à moins de 10 minutes).<br/><br/>
<b>Snack</b><br/><br/>
Le réputé "Snack Gaming Gen" vous restaurera tout le long de l'événement : menus classiques (steak-frites, salades, pizza...) et un plat fait-maison, limité et différent à chaque repas : Daube vendredi soir, repas Nature & garrigue Samedi midi, Wok samedi soir et surprise dimanche midi... Nous vous proposerons aussi petits-déjeuners, gouters et toutes sortes de boissons chaudes et froides ("sans alcool, la LAN est plus folle").<br/><br/>
<b>Réservation table</b><br/><br/>
Tu pourras réserver la table de tes rêves une fois que 3 joueurs de ton équipe ont payé leur prévente. <a href="contact.php">Contacte nous via le formulaire</a> pour préciser la table que tu désires, ainsi que le nom de ta team et le nom-prénom-pseudo des 5 joueurs.<br/>
<a href="img/plan.jpg"><img src="img/plansmall.jpg"></a><br/><br/>
N’oublie pas de venir avec le <a href="http://gaming-gen.fr/pdf/GG4-Dechargemineur.pdf">Règlement Intérieur + la Décharge Parentale</a> signée si tu es mineur.<br/><br/>
Dans tous les cas, n'oublie pas ta Carte d'Identité !<br/><br/><br/></h4>
<h1>PARTENAIRES ET DOTATIONS DU TOURNOIS CS:GO</h1><br/>
<h4><b>Cash-prize</b><br/><br/>
2.200€* de cash-prize distribués aux 3 équipes vainqueurs, selon la répartition suivantes : <br/>1ers : 1.300€ - 2nds : 625€ - 3èmes : 275€
*(à 100% de remplissage du tournoi.)<br/><br/>
<b>Partenaires Gaming</b><br/>
Hardware Informatique, Qpad, Antec, Gigabyte et Razer supportent la Gaming Gen 4. La liste définitive des lots sera annoncée prochainement.<br/><br/>
Stay tuned !<br/><br/>
<b>Partenaires Festival</b><br/><br/>
Des exposants à la Gaming Gen 4 participent également à la dotation du tournoi CS:GO, avec des lots funs et insolites, notamment la confiserie GAOIR et la Boutique du Geek.</h4><br/><br/>
                                                         <h1 style="color:#000;float:left;">LE LIEU</h1><hr class="titrehr"/>
                                                         <br/>
                                                         <br/>
                                                             <p class="col-4-12"><img src="img/sallepreview.jpg"></p>
                                                                 <span class="lahalleinfo">
                                                                 <h5 class="push-4-12">Avenue du 8 mai 1945<br/>13120 Gardanne</h5>
                                                                 <br/>
                                                                 <h4 class="push-4-12">QG de la Gaming Gen depuis toujours, cette salle de 3800 m² nous offre tout l’espace et l’infrastructure nécessaire pour mettre en place à la fois des tournois de qualité et des stands aérés.<br/>

Un coin Restauration complet, des sanitaires et des places de parking sont disponibles.</h4>
                                                            	 </span>
                                                                 <br/>
                                                                
                                                     
                                                     
                                                     </div>
                                                     			 <iframe width="1140" height="300" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/search?q=Avenue%20du%208%20Mai%201945%2C%20Gardanne%2C%20France&key=AIzaSyDcPoGA9kdwy5Fgw0hu8V0zMZK4yh5cIBQ"></iframe>
                                                                 <section class="buttonmoremap">
                                                                    <button class="btn btn-5 btn-5b icon-plus"><span><a href="https://www.google.com/maps?ll=43.459037,5.478951&z=16&t=m&hl=fr-FR&gl=US&mapclient=embed&q=Avenue+du+8+Mai+1945+13120+Gardanne+France">Agrandir</a></span></button>
                                                                </section><!--buttonmore-->
                                                                
                      					
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
