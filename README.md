# Site-GamingGen
Site Web de l'association GamingGen (built on Cloud9 IDE!)

Accessible à :
```
* DEV-URL : http://si-gaminggen-darkterra-1.c9users.io/
* PRE-PROD-URL : http://darkterra.fr/
```

Installation Prod (Ubuntu Server 16.04 LTS):
```
1. Install
    1. Sécuriser le Serveur
        - Génération des certificats
        - sudo apt-get update && sudo apt-get upgrade
        - sudo apt-get install fail2ban
        - sudo useradd -s /bin/bash -m -d /home/nodeuser -c "Node Safe User" nodeuser
        - sudo passwd nodeuser
        - sudo usermod -aG sudo nodeuser
        - sudo apt-get install libcap2-bin
        - sudo setcap cap_net_bind_service=+ep /usr/bin/nodejs
    
    2. Installer Node.JS(7.xx.x) & NPM (3.x)
        - sudo apt-get install curl
        - curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
        - sudo apt-get install -y nodejs
        - sudo npm install -g npm
        * [INFO]: https://github.com/nodesource/distributions
    
    3. Installer MongoDB (3.x)
        - sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
        - echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
        - sudo apt-get update
        - sudo apt-get install -y mongodb-org
        - sudo nano /etc/systemd/system/mongodb.service => Voir le lien ci-dessous (how-to-install-mongob-on-ubuntu-16-04)
        * [INFO]: https://docs.mongodb.org/master/tutorial/install-mongodb-on-ubuntu/
        * [INFO]: https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-16-04
    
    4. Installer Git
        - sudo apt-get install software-properties-common
        - sudo add-apt-repository ppa:git-core/ppa
        - sudo apt-get update
        - sudo apt-get install git
    
    5. Installer PM2
        - sudo npm install pm2 -g
        - pm2 install pm2-mongodb (Déjà activé ?)
        * [INFO]: http://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/
    
    6. Installer GraphicsMagick
        - sudo apt-get install graphicsmagick
        
    7. Certificat SSL
        - Faire la demande (ou en créer un en auto-signé mais fortement déconseillé) Let's Encrypt
        * [INFO] https://www.unsimpleclic.com/lets-encrypt-un-certificat-ssl-gratuit-et-reconnu-par-tous-les-navigateurs_98699.html
        * [INFO]: https://www.sitepoint.com/how-to-use-ssltls-with-node-js/

2. Configuration du serveur
    1. Ouvrir les ports (TCP):
        - 8701
        - 3000
        - 3001
        
```

Installation Dev (Cloude9 - Ubuntu 14.04 LTS):
```
1. Préparation
    - Créer le Workspase (préciser le repo Github)

2. Installation
    1. Node.JS (7.x.x)
        - utiliser nvm (gestionnaire de version Node.js)

    2. MongoDB (3.x)
        - sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
        - echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
        - sudo apt-get update
        - sudo apt-get install -y mongodb-org
        * [INFO]: https://docs.mongodb.org/master/tutorial/install-mongodb-on-ubuntu/
    
    3. PM2
        - sudo npm install -g pm2
    
    4. Installer GraphicsMagick
        - sudo apt-get install graphicsmagick

3. Configuration
    1. Créer un dossier permettant d'accueillir la BDD
        - mkdir data
        
    2. Créer un fichier pour démarer la BDD
        - echo 'mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"' > mongod
        - chmod a+x mongod
        - To start the Server : ./mongod
        * [INFO]: https://docs.c9.io/docs/setting-up-mongodb
      
    3. Créer un fichier pour réparer la BDD (en cas 'Unclean shutdown detected')
        - echo -e '# Only for Cloude9!\nmongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@" --repair' > mongodRepair
    
    4. SSH remember
        - ssh-agent bash
        - ssh-add /home/$USER/.ssh/id_rsa_nodeuser
    
    5. Grunt & Docular (A remplacer / Supprimer ?)
        - echo -e 'module.exports = function(grunt) {\n  // Project configuration.\n  grunt.initConfig({\n    pkg: grunt.file.readJSON("package.json"),\n    docular: {\n      groups: [],\n      showDocularDocs: true,\n      showAngularDocs: true\n    },\n\n    docularserver: {\n    targetDir: "./docular_generated",\n    port: 8080\n}\n  });\n\n  // Load the plugin that provides the "docular" tasks.\n  grunt.loadNpmTasks("grunt-docular");\n\n  // Default task(s).\n  grunt.registerTask("default", ["docular"]);\n};' > Gruntfile.js
    
    6. Docco
        - 
    
    7. Git :
        - ajouter à .gitignore:
            # Dev Files
            *.csv
            *.dat
            *.iml
            *.log
            *.out
            *.pid
            *.seed
            *.sublime-*
            *.swo
            *.swp
            *.tgz
            *.xml
            .DS_Store
            .idea
            .project
            coverage
            
            # Configuration Cloud9 Files
            .c9
            
            # Configuration Visual Code Files
            .vscode
            
            # Dependency directory
            node_modules
            npm-debug.log
            
            # DataBase
            data
            
            # Certificat
            *.pem
            *.csr
            certbot-auto
            
            # Only for Dev
            mongod*
            mongodRepair*
            mongodShutDown*
            *.bat
            adminMongo
            dump*
            View/dist
            View/css
            View/js
            OnlyForCloude9/tmp

4.  Tools
        - http://blog.mlab.com/2012/06/introducing-dex-the-index-bot/
        - https://github.com/mrvautin/adminMongo
        - https://github.com/tojocky/node-printer
        - http://scruss.com/blog/2015/07/12/thermal-printer-driver-for-cups-linux-and-raspberry-pi-zj-58/
        - http://wowslider.com/angular-slider-collage-demo.html
        - http://coolcarousels.frebsite.nl/
        - http://angular-ui.github.io/
        - https://www.npmjs.com/package/escape-html
        - http://jasmine.github.io/2.0/introduction.html
        - http://www.responsinator.com/?url=https://si-gaminggen-darkterra-1.c9users.io/#/home

5. Infos
    - https://cdnjs.com/libraries/angular.js/1.5.7
    - https://www.grafikart.fr/formations/angularjs/directives
    - http://www.angular-js.fr/decouvrez-angularjs/
    - https://openclassrooms.com/courses/developpez-vos-applications-web-avec-angularjs/
    - http://stackoverflow.com/questions/22189544/print-a-div-using-javascript-in-angularjs-single-page-aplication
    - http://www.html5rocks.com/en/tutorials/frameworks/angular-websockets/?redirect_from_locale=fr
    - http://www.tutoriel-angularjs.fr/tutoriel/2-utilisation-complete-d-angularjs/1-le-routage
    - http://www.tinci.fr/blog/apprendre-angular-en-un-jour-le-guide-ultime/
    - http://www.funnyant.com/angularjs-ui-router/
    - https://egghead.io/lessons/angularjs-introduction-ui-router
    - http://slides.com/timkindberg/ui-router#/
    - https://github.com/imperugo/NodeJs-Sample/blob/master/Logging/WinstonSample/express-configuration/index.js
    - https://blog.serverdensity.com/monitor-mongodb/
    - http://code.tutsplus.com/tutorials/authenticating-nodejs-applications-with-passport--cms-21619
    - https://github.com/jaredhanson/passport-local
    - http://adrianmejia.com/blog/2014/10/01/creating-a-restful-api-tutorial-with-nodejs-and-mongodb/
    - http://www.synbioz.com/blog/les_collections_avec_mongodb
    - https://davidwalsh.name/fullscreen
    - http://jsfiddle.net/rabidGadfly/GF3Xg/
    - https://scotch.io/bar-talk/bootstrap-3-tips-and-tricks-you-still-might-not-know
    - http://www.tutorialspoint.com/mongodb/mongodb_quick_guide.htm
    - https://jsfiddle.net/alexsuch/RLQhh/
    - http://blogs.infinitesquare.com/b/seb/archives/gestion-authorization-angularjs#.V2vaP_mLTRY
    - http://maxlab.fr/javascript/securiser-spa-partie2-client-angularjs/
    - https://www.occitech.fr/blog/2014/04/lauthentification-avec-angularjs/
    - https://hnryjms.github.io/2014/04/authentication/
    - https://gist.github.com/aheckmann/2408370
    - http://marketblog.envato.com/web-design/addons-plugins-extending-bootstrap/
    - http://connect.adfab.fr/outils/les-tests-de-charge-kesako
    - https://github.com/mlazarov/ddos-stress
    - https://github.com/justintv/Twitch-API
    - https://www.atlassian.com/git/tutorials/undoing-changes/git-clean
    
    
        - https://www.tipeeestream.com/

6.  Utilisation Navigateur
        - http://www.zdnet.fr/actualites/chiffres-cles-les-navigateurs-internet-39381322.htm
    
7.  Votre clé API Steam Web
        - Clé: 5CAF214792FBDB8B3F4FAC365E8AAD3E
        - Nom de domaine: http://darkterra.fr/

8.  A tester
        - https://angular-ui.github.io/bootstrap/

9.  Securité
        - http://blog.websecurify.com/2014/08/hacking-nodejs-and-mongodb.html

10. Tests (Obligatoire !!!)
        - https://www.grafikart.fr/formations/javascript-unit-test/test-angularjs-mocks
```