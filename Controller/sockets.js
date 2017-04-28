/*
 * Version Alpha 1.1.0
 * Date de modification 18/03/2017
 *
 * Socket.js
 *  Gère toute les communications dynamique
 * 
 * Conçu par l'équipe de Gaming Gen :
 *  - Jérémy Young      <darkterra01@gmail.com>
 */

'use strict';

const socketio     = require('socket.io');
const mongoAdapter = require('socket.io-mongodb');
const check        = require('check-types');
const adapter      = mongoAdapter('mongodb://localhost:27017/socket-io');

module.exports.listen = function(server, sessionMiddleware, ServerEvent, colors) {
	let io                = socketio(server);
	let printerClientId   = "";
	let printerCookId     = "";
	let printerShopId     = "";
	let youtube           = {};
	let twitch            = {};
	let Live              = {}; // TODO A déplacer
    
	// Configuration de MongoAdapter pour pouvoir l'utiliser en mode Cluster
	io.adapter(adapter);
	adapter.pubsubClient.on('error', console.error);
	adapter.channel.on('error', console.error);
	
	// Configuration de Socket.IO pour pouvoir avoir accès au sessions
	io.use(function(socket, next) {
		sessionMiddleware(socket.request, socket.request.res, next);
	});
	
	ServerEvent.on('isMailExistResult', function(data, socket) {
		socket.emit('isMailExist', data);
		console.log('EmitClient: isMailExistResult');
	});
	
	ServerEvent.on('isPseudoExistResult', function(data, socket) {
		socket.emit('isPseudoExist', data);
		console.log('EmitClient: isPseudoExistResult');
	});
	
	ServerEvent.on('OrderSaved', function(data, socket) {
		// console.log(printerClientId);
		// console.log(printerCookId);
		if (check.nonEmptyString(printerClientId)) {
			io.to(printerClientId).emit('generate&printPDF', data);
			// socket.emit('generate&printPDF', data);
			console.log('EmitClient: generate&printPDF');
		}
		if (check.nonEmptyString(printerCookId)) {
			io.to(printerCookId).emit('generate&printPDF', data);
			// socket.emit('generate&printPDF', data);
			console.log('EmitCook: generate&printPDF');
		}
	});
	
	ServerEvent.on('shopOrderSaved', function(data, socket) {
		if (check.nonEmptyString(printerShopId)) {
			io.to(printerShopId).emit('generate&printShopPDF', data);
			console.log('ShopCook: generate&printShopPDF');
		}
	});
		
	ServerEvent.on('ArticleSaved', function(data, socket) {
		io.sockets.emit('NewArticle', data);
	});
		
	ServerEvent.on('ArticleUpdated', function(data, socket) {
		io.sockets.emit('ArticleUpdated', data);
	});
		
	ServerEvent.on('CommentSaved', function(data, socket) {
		io.sockets.emit('NewComment', data);
	});
	
	ServerEvent.on('AllOrdersFound', function(data, socket) {
		socket.emit('AllOrders', data);
		console.log('EmitClient: AllOrders');
	});
	
	ServerEvent.on('RePrintOrderFind', function(data) {
		if (check.nonEmptyString(printerClientId) && data != null) {
			io.to(printerClientId).emit('generate&printPDF', data);
			console.log('EmitClient: generate&printPDF');
		}
	});
	
	ServerEvent.on('RePrintShopOrderFind', function(data) {
		if (check.nonEmptyString(printerShopId) && data != null) {
			io.to(printerShopId).emit('generate&printShopPDF', data);
			console.log('EmitClient: generate&printShopPDF');
		}
	});
	
	ServerEvent.on('ClientPrinterPrintedDone', function(data) {
		io.sockets.emit('ClientPrinterPrintedDone', data);
	});
		
	// Banissement et déconnexion auto
	ServerEvent.on('BanUser', function(data) {
		io.sockets.emit('BanUser', data);
	});
	
	/***********************************************************************************
	*														Initialisation des variables												   *
	***********************************************************************************/
  // Ouverture de la socket
  io.sockets.on('connection', function (socket) {
	  
	  console.log('Client Connecté');
	  
	  
	  socket.on('isMailExist', function(data) {
	  	ServerEvent.emit('isMailExist', data, socket);
	  });
		
		socket.on('isPseudoExist', function(data) {
			ServerEvent.emit('isPseudoExist', data, socket);
		});
		
		socket.on('IamTheClientPrinter', function() {
			if (check.emptyString(printerClientId)) {
	  		printerClientId = socket.id;
				console.log('Printer Client Found');
				console.log(socket.id);
			}
		});
		
		socket.on('IamTheCookPrinter', function() {
			if (check.emptyString(printerCookId)) {
	  		printerCookId = socket.id;
				console.log('Printer Cook Found');
				console.log(socket.id);
			}
		});
		
		socket.on('IamTheShopPrinter', function() {
			if (check.emptyString(printerShopId)) {
	  		printerShopId = socket.id;
				console.log('Printer Shop Found');
				console.log(socket.id);
			}
		});
		
		
		
		socket.on('saveConf', function(data) {
			ServerEvent.emit('saveConf', data);
			console.log('Emit: saveConf');
		});
		
		
		
		socket.on('saveMenuSnack', function(data) {
			ServerEvent.emit('saveMenuSnack', data);
			console.log('Emit: saveMenuSnack');
		});
		
		socket.on('saveShop', function(data) {
			ServerEvent.emit('saveShop', data);
			console.log('Emit: saveShop');
		});
		
		
		socket.on('RePrintPDF', function(data) {
			ServerEvent.emit('RePrintPDF', data, socket);
		});
		
		socket.on('RePrintShopPDF', function(data) {
			ServerEvent.emit('RePrintShopPDF', data, socket);
		});
		
		socket.on('generatePDF', function(data) {
			console.log('Reception order Client');
			ServerEvent.emit('saveOrder', data, socket);
			console.log('Emit: saveOrder');
		});
		
		socket.on('generateShopPDF', function(data) {
			console.log('Reception Shop Order');
			ServerEvent.emit('saveShopOrder', data, socket);
			console.log('Emit: saveShopOrder');
		});
		
		socket.on('getAllOrders', function() {
			ServerEvent.emit('findAllOrders', socket);
			console.log('Emit: findAllOrders');
		});
		
		socket.on('ClientPrinterPrinted', function(number) {
			ServerEvent.emit('ClientPrinterPrinted', number);
			console.log('Emit: ClientPrinterPrinted');
		});
		
		socket.on('getLive', function() {
			socket.emit('toogleLive', Live);
		});
		
		socket.on('LiveOff', function() {
			Live.Youtube = false;
			Live.Twitch = false;
			io.sockets.emit('toogleLive', Live);
			console.log(Live);
		});
		
		socket.on('LiveYoutube', function() {
			Live.Youtube = true;
			Live.Twitch = false;
			io.sockets.emit('toogleLive', Live);
			console.log(Live);
		});
		
		socket.on('LiveTwitch', function() {
			Live.Twitch = true;
			Live.Youtube = false;
			io.sockets.emit('toogleLive', Live);
			console.log(Live);
		});
		
		socket.on('getLiveSource', function() {
			socket.emit('ChangeLiveSource', youtube);
		});
		
		socket.on('ChangeLiveSource', function(data) {
			youtube = data;
			io.sockets.emit('ChangeLiveSource', data);
		});
		
		socket.on('getChannelTwitch', function() {
			socket.emit('ChangeChannelTwitch', twitch);
		});
		
		socket.on('ChangeChannelTwitch', function(data) {
			twitch = data;
			io.sockets.emit('ChangeChannelTwitch', data);
		});
		
		socket.on('saveArticle', function(data) {
			console.log('Reception article Client');
			ServerEvent.emit('saveArticle', data, socket);
			console.log('Emit: saveArticle');
		});
		
		socket.on('updateArticle', function(data) {
			console.log('Reception Update article Client');
			ServerEvent.emit('updateArticle', data, socket);
			console.log('Emit: updateArticle');
		});
		
		socket.on('saveComment', function(data) {
			ServerEvent.emit('saveComment', data, socket);
			console.log('Emit: saveComment');
		});
		
		socket.on('rmComment', function(data) {
			ServerEvent.emit('rmComment', data);
			console.log('Emit: rmComment');
		});
		
		socket.on('rmArticle', function(data) {
			ServerEvent.emit('rmArticle', data);
			console.log('Emit: rmComment');
		});
		
		// ----------------------- Décompte uniquement des User Connecté ----------------------- //
		socket.on('disconnect', function() {
			console.log('Client Disconnect');
			if (check.nonEmptyString(printerClientId) && socket.id == printerClientId) {
				printerClientId = "";
				console.log('We lost the Client Printer');
			}
			if (check.nonEmptyString(printerCookId) && socket.id == printerCookId) {
				printerCookId = "";
				console.log('We lost the Cook Printer');
			}
			if (check.nonEmptyString(printerShopId) && socket.id == printerShopId) {
				printerShopId = "";
				console.log('We lost the Shop Printer');
			}
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