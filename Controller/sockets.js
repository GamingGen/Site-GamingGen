/*
 * Version 0.0.1
 * Date de modification 31/01/2015
 *
 * Socket.js
 *  Gère toute les communications dynamique
 * 
 * Conçu par l'équipe de NNM :
 *  - Jérémy Young
 */

'use strict';

let socketio			= require('socket.io');

module.exports.listen = function(server, sessionMiddleware, ServerEvent, colors) {
    let io						= socketio.listen(server);
    let test 					=	'';
    
    // Configuration de Socket.IO pour pouvoir avoir accès au sessions
		io.use(function(socket, next) {
			sessionMiddleware(socket.request, socket.request.res, next);
		});
		
		/***********************************************************************************
		*														Initialisation des variables												   *
		***********************************************************************************/
		function ReloadModule(socket) {
			ServerEvent.emit('ReloadModule');
			ServerEvent.on('DataRead', function(data) {
				socket.emit('ModulesToLoad', data);
	    });
		}
		
		function RebuildModule() {
			ServerEvent.emit('RebuildModule');
		}
		
		function ModuleToLoad(socket) {
			socket.emit('ModulesToLoad', 'bundle.js');
		}
		
		// function ScanNAS(socket) {
		// 	ServerEvent.emit('ScanNAS');
		// 	ServerEvent.on('DataRead', function(data) {
		// 		test = data;
		// 		// TODO : socket.emit('ModulesToLoad', test);
		// 	});
		// }
		
		ServerEvent.on('Build Ready', function(data) {
			if (data.socket != '') {
				data.socket.emit('ModulesToLoad', data.result);
			}
    });
	    
    ServerEvent.on('TreeRead', function(data) {
			data.socket.emit('NASScaned', data.result);
		});
    
    // Ouverture de la socket
    io.sockets.on('connection', function (socket) {
    	
    	// ReloadModule(socket);
    	 ModuleToLoad(socket);
    	
    	socket.on('ScanNAS', function() {
				ServerEvent.emit('ScanNAS', socket);
			});
			
    	socket.on('NeedToRebuild', function() {
				RebuildModule();
			});
			
    	socket.on('RMFile', function(file) {
				// ServerEvent.emit('ScanNAS', socket);
				console.log(file);
			});
			
			// ----------------------- Décompte uniquement des User Connecté ----------------------- //
			socket.on('disconnect', function(){
				
			});
			
    });
};

/***********************************************************************************
*												Différentes possibilité d'émissions											   *
***********************************************************************************/
/*
// send to current request socket client
socket.emit('message', "this is a test");

// sending to all clients, include sender
io.sockets.emit('message', "this is a test");

// sending to all clients except sender
socket.broadcast.emit('message', "this is a test");

// sending to all clients in 'game' room(channel) except sender
socket.broadcast.to('game').emit('message', 'nice game');

// sending to all clients in 'game' room(channel), include sender
io.sockets.in('game').emit('message', 'cool game');

// sending to individual socketid
io.sockets.socket(socketid).emit('message', 'for your eyes only');
*/