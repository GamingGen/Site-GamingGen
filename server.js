/**
 * Version Alpha 1.1.0
 * Date de Création 30/04/2016
 * Date de modification 08/03/2017
 * 
 * ~2 769 835 de lignes de code
 * 
 * server.js
 * Point d'entrée de l'application 'Gaming-Gen'.
 * L'application Gaming-Gen permet de gérer entièrement notre évènement.
 * 
 * Conçu par l'équipe de Gaming-Gen :
 *  - Jérémy Young            <darkterra01@gmail.com>
 *  - Loïc Tardivel-Lacombe   <>
 *  - Laura Auboin Maurizio   <>
 *  - Frédéric Guazzini       <>
 *  -
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
// let resumable    = require('./resumable-node.js')('tmp/');
// let shelljs      = require('shelljs');
const fs            = require('fs');
const session       = require('express-session');
const mongoose      = require('mongoose');
const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const MongoStore    = require('connect-mongo')(session);

const logger        = require('./Controller/logger');


// PMX For PM2
var pmx = require('pmx').init({
  http          : true, // HTTP routes logging (default: true)
  ignore_routes : [/socket\.io/, /notFound/], // Ignore http routes with this pattern (Default: [])
  errors        : true, // Exceptions loggin (default: true)
  custom_probes : true, // Auto expose JS Loop Latency and HTTP req/s as custom metrics
  network       : true, // Network monitoring at the application level
  ports         : true  // Shows which ports your app is listening on (default: false)
});


// mongoose
mongoose.connect('mongodb://localhost/gaminggen', (error) => {
    if (error) {
        console.log(error);
        
        // TODO à changer (gestion tentatire reconnexions)
        process.exit(1);
    }
});


// Server Events
let ServerEvent  = require('./Controller/ServerEvent');


// Require Controllers
let User        = require('./Controller/users');
let Conf        = require('./Controller/confs');
let Article     = require('./Controller/articles');
let Comment     = require('./Controller/comments');
let Partenaire  = require('./Controller/partenaires');
let WatchList   = require('./Controller/watchLists');
let Team        = require('./Controller/teams');
let Snack       = require('./Controller/snacks');
let MenuSnack   = require('./Controller/menuSnacks');
let Shop        = require('./Controller/shop');
let Order       = require('./Controller/order');


// Require des Models
let userSchema = require('./Model/userSchema');


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


// Conf port
const port = process.env.PORT || 3000;


// Conf session
const EXPRESS_SID_VALUE = 'Secret Keyboard DarkTerra Cat';
const sessionMiddleware = session({
  secret              : EXPRESS_SID_VALUE,
  resave              : false,
  saveUninitialized   : true,
  store               : new MongoStore({ mongooseConnection: mongoose.connection })
});


// Conf app
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
	userSchema.authenticate(email, password, (error, user) => {
		// You can write any kind of message you'd like.
		// The message will be displayed on the next page the user visits.
		// We're currently not displaying any success message for logging in.
		done(error, user, error ? { message: error.message } : null);
	});
});

let authSerializer = (user, done) => {
	done(null, user.id);
};

let authDeserializer = (id, done) => {
	userSchema.findById(id, (error, user) => {
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
app.use('/users', User.router);
app.use('/confs', Conf.router);
app.use('/articles', Article.router);
app.use('/comments', Comment.router);
app.use('/teams', Team.router);
app.use('/snacks', Snack.router);
app.use('/menusnacks', MenuSnack.router);
app.use('/shop', Shop.router);
app.use('/order', Order.router);


function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header 
    return false;
  }
  // fallback to standard filter function 
  return compression.filter(req, res);
}

///////////////////////////////////////////////////////////////////////////////////////////////

// Check Version of Node before Launch.
fs.readFile(__dirname + '/package.json', 'utf8', (err, data) => {
    if (err) throw err;
    
    
    // var refVersion = parseInt(JSON.parse(data).engines.node.replace(/[^0-9]/g, ''), 10);
    // var nodeVersion = parseInt(process.version.replace(/[^0-9]/g, ''), 10);
    
    let operator = JSON.parse(data).engines.node.replace(/[0-9.]/g, '');
    let refVersion = JSON.parse(data).engines.node.replace(/[^0-9.]/g, '').split('.');
    let nodeVersion = process.version.replace(/[^0-9.]/g, '').split('.');
    
    console.log(operator);
    console.log(refVersion);
    console.log(nodeVersion);
    
    
    
    
    if (parseInt(nodeVersion[0], 10) > parseInt(refVersion[0], 10)) {
      console.log('Version du server OK...'.verbose);
      console.log('La version du serveur Node.JS : '.data + process.version.warn);
      console.log('Le serveur Node.JS fonctionne sur la plateforme : '.data + process.platform.warn);
    }
    else {
      console.log('La version du serveur Node.JS doit être plus récente : '.warn);
      console.log('Version demandé : '.data + refVersion + ', votre version : '.data + nodeVersion);
      process.exit(1);
    }
    
    // Création du serveur
    http.listen(port, () => {
      console.log('\nSI-GamingGen listening at 127.0.0.1:'.verbose + port.verbose);
      // console.log('La plateforme fonctionne depuis : '.data + tools.convertTimeToHuman(os.uptime()).warn);
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
