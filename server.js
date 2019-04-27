 /**
 * @file server.js
 * @desc Point d'entrée de l'application 'Gaming-Gen'. <br />
 * L'application Gaming-Gen permet de gérer entièrement notre évènement. <br />
 * blablabla <br />
 * <br />
 * <b>~5 306 442</b> de lignes de code <br />
 * <br />
 * Date de Création 30/04/2016 <br />
 * Date de modification 02/09/2017 <br />
 * 
 * @version Alpha 1.5.0
 * 
 * @author Jérémy Young            <darkterra01@gmail.com>
 * @author Loïc Tardivel-Lacombe   <loic.tardivel@gmail.com>
 * @author Laura Auboin Maurizio   <lala@gaming-gen.fr>
 * @author Frédéric Guazzini       <dolz@gaming-gen.fr>
 * 
 */

'use strict';

// Requires
const express       = require('express');
const app           = express();
const compression   = require('compression');
const http          = require('http').Server(app);
const path          = require('path');
const cookieParser  = require('cookie-parser');
const bodyParser    = require('body-parser');
const colors        = require('colors');
const fs            = require('fs');
const session       = require('express-session');
const mongoose      = require('mongoose');
const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const MongoStore    = require('connect-mongo')(session);
const os            = require('os');
const moment        = require('moment');
const nodemailer    = require('nodemailer');
const sticky        = require('sticky-session');
const helmet        = require('helmet');
// const napa          = require('napajs');


// let resumable    = require('./resumable-node.js')('tmp/');
// let shelljs      = require('shelljs');

// PMX For PM2
const pmx = require('pmx').init({
  http          : true, // HTTP routes logging (default: true)
  ignore_routes : [/socket\.io/, /notFound/], // Ignore http routes with this pattern (Default: [])
  errors        : true, // Exceptions loggin (default: true)
  custom_probes : true, // Auto expose JS Loop Latency and HTTP req/s as custom metrics
  network       : true, // Network monitoring at the application level
  ports         : true  // Shows which ports your app is listening on (default: false)
});


// mongoose
mongoose.connect('mongodb://localhost/gaminggen', (err) => {
    if (err) {
        console.error(err);
        
        // TODO à changer (gestion tentatire reconnexions)
        process.exit(1);
    }
});


// Server Events
let ServerEvent  = require('./Controller/ServerEvent');


// Require Controllers
const logger      = require('./Controller/logger');
const User        = require('./Controller/users');
const Conf        = require('./Controller/confs');
const Article     = require('./Controller/articles');
const Comment     = require('./Controller/comments');
const Partenaire  = require('./Controller/partenaires');
const WatchList   = require('./Controller/watchLists');
const Team        = require('./Controller/teams');
const Snack       = require('./Controller/snacks');
const MenuSnack   = require('./Controller/menuSnacks');
const Shop        = require('./Controller/shop');
const Order       = require('./Controller/order');
const About       = require('./Controller/about');


// Conf color
colors.setTheme({
  silly   : 'rainbow',
  input   : 'grey',
  verbose : 'cyan',
  prompt  : 'grey',
  info    : 'green',
  data    : 'grey',
  help    : 'cyan',
  warn    : 'yellow',
  debug   : 'blue',
  error   : 'red'
});

//////////////////////////////////// TEST //////////////////////////////////////
// Conf Zones
// const zone1 = napa.zone.create('zone1', { workers: 4 });

// zone1.broadcast((state) => {
//     console.log(JSON.stringify(state));
// // }, [ {field1: 1} ])
// })
// .then(() => {
//     console.log('broadcast succeeded.');
// })
// .catch((error) => {
//     console.log(`broadcast failed: ${error}`);
// });

// zone1.execute((a, b, c) => {
//         return a + b + JSON.stringify(c);
//     }, [1, "hello", {field1: 1}])
// .then((result) => {
//     console.log('execute succeeded:', result.value);
// })
// .catch((error) => {
//     console.log('execute failed:', error);
// });

//////////////////////////////////// TEST //////////////////////////////////////

// Conf Port
const port = process.env.PORT || 3000;


// Conf Session
const EXPRESS_SID_VALUE = 'Secret Keyboard DarkTerra Cat';
const sessionMiddleware = session({
  secret              : EXPRESS_SID_VALUE,
  resave              : true,
  saveUninitialized   : true,
  store               : new MongoStore({ mongooseConnection: mongoose.connection })
});


// Conf App
app.use(helmet());
app.use(compression({filter: shouldCompress}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use(pmx.expressErrorHandler());
app.use(require('morgan')("combined", { "stream": logger.stream }));


// Conf passport
let authStrategy = new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password'
}, (email, password, done) => {
	User.userSchema.authenticate(email, password, (error, user) => {
		// You can write any kind of message you'd like.
		// The message will be displayed on the next page the user visits.
		// We're currently not displaying any success message for logging in.
		console.log('server.js - error: ', error);
		done(error, user, error ? { message: error.message } : null);
	});
});

let authSerializer = (user, done) => {
	done(null, {_id: user._id, permissions: user.access.permissions});
};

let authDeserializer = (user, done) => {
	User.userSchema.findById(user._id, (error, user) => {
		done(error, user);
	});
};

passport.use(authStrategy);
passport.serializeUser(authSerializer);
passport.deserializeUser(authDeserializer);


// Socket io
require('./Controller/sockets').listen(http, sessionMiddleware, ServerEvent, colors);


// Call Events Management
Snack.snackEvent(ServerEvent);
Conf.confEvent(ServerEvent);
MenuSnack.menuSnackEvent(ServerEvent);
Article.articleEvent(ServerEvent);
Comment.commentEvent(ServerEvent);
User.userEvent(ServerEvent);
Shop.shopEvent(ServerEvent);
Order.orderEvent(ServerEvent);


// Log Error
ServerEvent.on('error', (err) => {
  console.log(err);
});


// Routing
app.use(express.static(path.join(__dirname, 'View')));
app.use(express.static(path.join(__dirname, 'node_modules', 'socket.io-client', 'dist')));
app.use('/users', User.router);
app.use('/confs', Conf.router);
app.use('/articles', Article.router);
app.use('/comments', Comment.router);
app.use('/teams', Team.router);
app.use('/snacks', Snack.router);
app.use('/menusnacks', MenuSnack.router);
app.use('/shop', Shop.router);
app.use('/order', Order.router);
app.use('/about', About.router);


let numberViews = 0;

app.get('/demo-joueurs', (req, res) => {
  numberViews++;
  console.log('numberViews: ', numberViews);
  
  fs.readdir(path.join(__dirname, 'View', 'demo-joueurs'), (err, files) => {
    let response = "An error occur";
    let initValue = "<strong>No Files here</strong>";
    
    if (err) {
      console.error(err);
    }
    
    if (files) {
      response = files;
      
      if (files.length > 0) {
        initValue = "";
      }
    }
    
    const htmlToSend = `
    <html>
      <header>
      <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <meta name="theme-color" content="#004d00">
        
        <title>Gaming Gen: Liste des démos joueurs CS: GO 2019</title>
      </header>
      <body>
        <h1>Liste des démos joueurs CS: GO (Gaming Gen 2019)</h1>
        <br /><br />
        ${response.reduce((accumulator, currentValue) => {
          accumulator += `<a href="https://www.gaming-gen.fr/demo-joueurs/${currentValue}" download="${currentValue}">${currentValue}</a><br />`;
          return accumulator;
          }, initValue)}
      </body>
    </html>`;
      
    res.status(200).send(htmlToSend);
  });
});

app.get('/ebot', (req, res) => {
  fs.readFile(path.join(__dirname, 'View', 'Partial', 'eBot.html'), 'utf8', (err, file) => {
    if (err) {
      res.status(500).end();
    }
    else {
      res.status(200).send(file.toString());
    }
  });
});

app.get('/ebotImg', (req, res) => {
  fs.readdir(path.join(__dirname, 'View', 'Img', 'Ebot'), (err, files) => {
    let response = "An error occur";
    let initValue = "<strong>No Files here</strong>";
    
    if (err) {
      console.error(err);
    }
    
    if (files) {
      response = files;
      
      if (files.length > 0) {
        initValue = "";
      }
    }
    
    const htmlToSend = `
    <html>
      <header>
      <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <meta name="theme-color" content="#004d00">
        
        <title>Gaming Gen: Ebot CS: GO 2019</title>
      </header>
      <body>
        <h1>Ebot: stats 75 joueurs CS: GO (Gaming Gen 2019)</h1>
        <br /><br />
        ${response.reduce((accumulator, currentValue) => {
          accumulator += `<a href="https://www.gaming-gen.fr/Img/Ebot/${currentValue}" download="${currentValue}"><img src="/Img/Ebot/${currentValue}"></a><br />`;
          return accumulator;
          }, initValue)}
      </body>
    </html>`;
      
    res.status(200).send(htmlToSend);
  });
});

// Events
ServerEvent.on('sendMailContact', (data, socket) => {
  SendMail(data.email, data.subject, 'contact@gaming-gen.fr', data.text, socket);
});

// Functions
function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header 
    return false;
  }
  // fallback to standard filter function 
  return compression.filter(req, res);
}

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    // req.user is available for use here
    console.log('Im Auth Muahahahahahahahahhahahahahahhahah !!!');
    return next();
  }

  // denied
  res.status(401);
}

// Gestion message de démarrage
function startMessage (err, nodeVersion, refVersion) {
  if (err) {
    console.log(`La version du serveur Node.JS doit être plus récente : `.warn);
    console.log(`Version demandé : ${refVersion}, votre version : ${nodeVersion}`.data);
  }
  else {
    console.log(`\nVersion du server OK...`.verbose);
    console.log(`La version du serveur Node.JS : `.data + process.version.warn);
    console.log(`Le serveur Node.JS fonctionne sur la plateforme : `.data + process.platform.warn);
  }
}

// Mail...
// create reusable transporter object using SMTP transport 
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.NODEMAILER_MAIL,
        pass: process.env.NODEMAILER_PASS
    }
});

function SendMail(from, subject, to, text, socket) {
  // Gestion mail Contact
  console.log('Sending Mail...'.info);
  text = `Vous avez reçu un mail de : ${from} : \n\n${text}`;
  // setup e-mail data with unicode symbols 
  var mailOptions = {
      from: from, // sender address 
      to: to, // list of receivers 
      subject: subject, // Subject line 
      text: text, // plaintext body 
      // html: html, // html body
      attachments: []
  };
  
  // Pour attacher des pièces
  // for(let IMG of tabIMG) {
  //   attach = {};
  //   attach.filename = IMG;
  //   attach.path = IMG;
  //   mailOptions.attachments.push(attach);
  // }
  
  // send mail with defined transport object 
  transporter.sendMail(mailOptions, (error, info) => {
    console.log('info: ', info);
      if(error) {
        console.error(error);
        // res.status(500).json({message : `Problème lors de l'envoie du mail`});
        ServerEvent.emit('ErrorOnMailContactSent', error, socket);
      }
      else {
        console.log(`Message sent: ${info}`);
        // res.status(200).json({message : 'Mail envoyé !'});
        ServerEvent.emit('mailContactSent', info, socket);
      }
  });
}

app.head('/health', function (req, res) {
  res.sendStatus(200);
});

// Check Version of Node before Launch.
fs.readFile(__dirname + '/package.json', 'utf8', (err, data) => {
    if (err) throw err;
    
    const operator          = JSON.parse(data).engines.node.replace(/[0-9.]/g, '');
    const refVersion        = JSON.parse(data).engines.node.replace(/[^0-9.]/g, '').split('.');
    const nodeVersion       = process.version.replace(/[^0-9.]/g, '').split('.');
    const refVersionMajeur  = parseInt(refVersion[0], 10);
    const refVersionMineur  = parseInt(refVersion[1], 10);
    const refVersionFix     = parseInt(refVersion[2], 10);
    const nodeVersionMajeur = parseInt(nodeVersion[0], 10);
    const nodeVersionMineur = parseInt(nodeVersion[1], 10);
    const nodeVersionFix    = parseInt(nodeVersion[2], 10);
    
    if (operator === '>=') {
      if (nodeVersionMajeur > refVersionMajeur) {
        startMessage(undefined, nodeVersion, refVersion);
      }
      else if (nodeVersionMajeur == refVersionMajeur && nodeVersionMineur > refVersionMineur) {
        startMessage(undefined, nodeVersion, refVersion);
      }
      else if (nodeVersionMajeur == refVersionMajeur && nodeVersionMineur == refVersionMineur && nodeVersionFix >= refVersionFix) {
        startMessage(undefined, nodeVersion, refVersion);
      }
      else {
        startMessage('not OK', nodeVersion, refVersion);
        process.exit(1);
      }
    }
    else {
      console.log(`L'operateur (package.json => engine) doit être égal à : '>='`.warn);
      process.exit(1);
    }

    // Création du serveur
    http.listen(port, () => {
      console.log(`\n\nSI-GamingGen listening at 127.0.0.1:${port}`.verbose);
      console.log('La plateforme fonctionne depuis : '.data + colors.warn(moment.duration((os.uptime().toFixed(0))*1000).humanize()));
      console.log();
    });
  });


// pmx.emit('user:register', {
//   user : 'Alex registered',
//   email : 'thorustor@gmail.com'
// });



/*------------------------------------------------------------------------------------------------------------------------------*/
// Handle uploads through Resumable.js
// app.post('/upload', function(req, res){
//   //console.log(req);
  
//   resumable.post(req, function(status, filename, original_filename, identifier, nomFinal){
//     //console.log('POST', status, original_filename, identifier);
    
//     if (status == 'done') {
//       var racine            = "/home/pi/www/";
//       var path              = racine + "finish/";
//       var nomFinal          = req.param('nom_Final');
//       var directoryName     = path + '' + req.param('film_Or_Serie') + '/' + nomFinal + '(' +  req.param('anne_Film') + ')';
//       var destFileFinal     = directoryName + '/';
//       var resumableFilename = req.param('resumableFilename');
      
//       var fs = require('fs');
      
//       nomFinal = nomFinal + '.' + resumableFilename.substr((resumableFilename.lastIndexOf('.') +1));
      
//       fs.exists(destFileFinal, function (exists) {
//         if (! exists) {
//           shelljs.mkdir('-p', destFileFinal);
//         }
//         destFileFinal = destFileFinal + '' + nomFinal;
        
//         var ws = fs.createWriteStream(destFileFinal);
        
//         resumable.write(identifier, ws);
//         ws.on('finish', function() {
//           console.log('Fichier : ' + nomFinal + ' Enregistré...');
//           shelljs.rm('-rf', 'temp/*' + identifier + '*');
//         });
//       });
//     }
    
//     res.send(status, {
//       // NOTE: Uncomment this funciton to enable cross-domain request.
//       //'Access-Control-Allow-Origin': '*'
//     });
//   });
// });

// // Handle status checks on chunks through Resumable.js
// app.get('/upload', function(req, res){
//   resumable.get(req, function(status, filename, original_filename, identifier){
//     //console.log('GET', status);
//     res.send((status == 'found' ? 200 : 404), status);
//   });
// });

// app.get('/download/:identifier', function(req, res){
//   resumable.write(req.params.identifier, res);
// });

/*------------------------------------------------------------------------------------------------------------------------------*/
