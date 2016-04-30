/*
 * Version 0.0.0
 * Date de Création 30/04/2016
 * Date de modification 30/04/2016
 *
 * server.js
 *  Point d'entrée de l'application (Main) 'Gaming-Gen' qui permet de gérer un serveur NAS
 * 
 * Conçu par l'équipe de Gaming-Gen :
 *  - Jérémy Young      <darkterra01@gmail.com>
 */

'use strict';

var pmx = require('pmx').init({
  http          : true, // HTTP routes logging (default: true)
  ignore_routes : [/socket\.io/, /notFound/], // Ignore http routes with this pattern (Default: [])
  errors        : true, // Exceptions loggin (default: true)
  custom_probes : true, // Auto expose JS Loop Latency and HTTP req/s as custom metrics
  network       : true, // Network monitoring at the application level
  ports         : true  // Shows which ports your app is listening on (default: false)
});


// Requires de bases
let express         = require('express');
let app             = express();
let compression     = require('compression');
let http            = require('http').Server(app);
let path            = require('path');
// let favicon         = require('serve-favicon');
let cookieParser    = require('cookie-parser');
let bodyParser      = require('body-parser');
let session         = require('express-session');
// let os              = require('os');
// let cpu             = require('cpu-load');
let colors          = require('colors');
// let resumable       = require('./resumable-node.js')('tmp/');
// let shelljs         = require('shelljs');
let fs              = require('fs');


// Require des controllers
/*var compte          = require('./controllers/compte');
var accueil         = require('./controllers/accueil');
var oublie          = require('./controllers/oublie');*/

// Variables
let dataJson = "";

// Configuration de la coloration des logs
colors.setTheme({
  silly     : 'rainbow',
  input     : 'grey',
  verbose   : 'cyan',
  prompt    : 'grey',
  info      : 'green',
  data      : 'grey',
  help      : 'cyan',
  warn      : 'yellow',
  debug     : 'blue',
  error     : 'red'
});

// Configuration du port
var port = process.env.PORT || 3000;

// Configuration des sessions
var EXPRESS_SID_VALUE = 'secret keyboard cat';
var sessionMiddleware = session({
    secret              : EXPRESS_SID_VALUE,
    resave              : false,
    saveUninitialized   : true,
});

// Configuration de l'application
// app.use(compression({filter: shouldCompress}));
// app.use(favicon(__dirname + '/View/Images/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sessionMiddleware);
app.use(pmx.expressErrorHandler());

// Events
let EventEmitter    = require('events').EventEmitter;
let ServerEvent			= new EventEmitter();
// let builder         = require('./Controller/builder');
// let scanNAS         = require('./Controller/scanNAS');

// Socket io
require('./Controller/sockets').listen(http, sessionMiddleware, ServerEvent, colors);


// Routing
app.use(express.static(path.join(__dirname, 'View')));
/*app.use('/compte', compte);*/

// Build client side bundle
// builder.build({ socket: '', ServerEvent: ServerEvent });

// Server Events
// ServerEvent.on('ReloadModule', function() {
//   fs.readFile(__dirname + '/config.json', 'utf8', (err, data) => {
//     if (err) throw err;
//     dataJson = data;
//     ServerEvent.emit('DataRead', dataJson);
//   });
// });
// ServerEvent.on('RebuildModule', (socket) => {
//   var params = {
//     socket: socket,
//     ServerEvent: ServerEvent
//   };
//   builder.build(params);
// });

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header 
    return false;
  }
  // fallback to standard filter function 
  return compression.filter(req, res);
}

// Check Version of Node before Launch.
fs.readFile(__dirname + '/package.json', 'utf8', (err, data) => {
    if (err) throw err;
    
    
    var refVersion = parseInt(JSON.parse(data).engines.node.replace(/[^0-9]/g, ''), 10);
    var nodeVersion = parseInt(process.version.replace(/[^0-9]/g, ''), 10);
    
    if (nodeVersion >= refVersion) {
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
    http.listen(port, function () {
      console.log('\nNode Nas Management listening at 127.0.0.1:'.verbose + port.verbose);
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
