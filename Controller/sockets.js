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
// const adapter      = mongoAdapter('mongodb://localhost:27017/socket-io');
	
	
module.exports.listen = function(server, sessionMiddleware, ServerEvent, colors) {
	let io                = socketio(server);
	let printerClientId   = "";
	let printerCookId     = "";
	let printerShopId     = "";
	let youtube           = {};
	let twitch            = {};
	let Live              = {}; // TODO A déplacer
	

	// Configuration de MongoAdapter pour pouvoir l'utiliser en mode Cluster
	// io.adapter(adapter);
	// adapter.pubsubClient.on('error', console.error);
	// adapter.channel.on('error', console.error);
	
	// Configuration de Socket.IO pour pouvoir avoir accès au sessions
	io.use(function(socket, next) {
		sessionMiddleware(socket.request, socket.request.res, next);
	});

	ServerEvent.on('mailContactSent', function(data, socket) {
		socket.emit('mailContactSent', data);
	});

	ServerEvent.on('ErrorOnMailContactSent', function(data, socket) {
		socket.emit('ErrorOnMailContactSent', data);
	});

	ServerEvent.on('ErrorOnRolesUpdated', function(data, socket) {
		socket.emit('ErrorOnRolesUpdated', data);
	});
		
	ServerEvent.on('RolesUpdated', function(data, socket) {
		socket.emit('RolesUpdated', data);
	});

	ServerEvent.on('ErrorOnPermissionsUpdated', function(data, socket) {
		socket.emit('ErrorOnPermissionsUpdated', data);
	});
		
	ServerEvent.on('PermissionsUpdated', function(data, socket) {
		socket.emit('PermissionsUpdated', data);
	});

	ServerEvent.on('ErrorOnUserPermissionsUpdated', function(data, socket) {
		socket.emit('ErrorOnUserPermissionsUpdated', data);
	});
		
	ServerEvent.on('UserPermissionsUpdated', function(data, socketIds, socket) {
		socket.emit('UserPermissionsUpdatedOk', data);
		socketIds.forEach(socketId => {
			io.to(socketId).emit('UserPermissionsUpdated', data);
		});
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
		socket.emit('articleOk');
		io.sockets.emit('NewArticle', data);
	});
		
	ServerEvent.on('ErrorOnArticleUpdated', function(data, socket) {
		socket.emit('ErrorOnArticleUpdated', data);
	});
		
	ServerEvent.on('ArticleUpdated', function(data, socket) {
		socket.emit('articleOk');
		io.sockets.emit('ArticleUpdated', data);
	});
		
	ServerEvent.on('ArticleRemoved', function(data, socket) {
		io.sockets.emit('ArticleRemoved', data._id);
	});
		
	ServerEvent.on('CommentSaved', function(data, socket) {
		io.sockets.emit('NewComment', data);
	});
		
	ServerEvent.on('CommentRemoved', function(data, socket) {
		socket.emit('CommentRemoved', data);
		socket.broadcast.emit('CommentRemoved', {_id: data._id, article_id: data.article_id});
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
	
	ServerEvent.on('currentHome', function(data, socket) {
		// io.sockets.emit('ClientPrinterPrintedDone', data);
		socket.emit('currentHome', data);
	});
	
	ServerEvent.on('InfoSaved', function(data) {
		io.sockets.emit('InfoSaved', data);
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

		// Save the socket.id
		console.log('socket.request.session: ', JSON.stringify(socket.request.session));
		if (socket.request.session.passport && socket.request.session.passport.user && socket.request.session.passport.user.socketId) {
			socket.request.session.passport.user.socketId = socket.id;
			socket.request.session.save(function(err) {
				if (err) {
					console.log(err);
				}
			});
		}
		
		socket.on('sendMailContact', function(data) {
			ServerEvent.emit('sendMailContact', data, socket);
			console.log('Emit: sendMailContact');
		});
		
		socket.on('UpdateRoles', function(data) {
			ServerEvent.emit('UpdateRoles', data, socket);
			console.log('Emit: UpdateRoles');
		});
		
		socket.on('UpdatePermissions', function(data) {
			ServerEvent.emit('UpdatePermissions', data, socket);
			console.log('Emit: UpdatePermissions');
		});
	  
	  socket.on('isMailExist', function(data) {
	  	ServerEvent.emit('isMailExist', data, socket);
	  });
		
		socket.on('isPseudoExist', function(data) {
			ServerEvent.emit('isPseudoExist', data, socket);
		});
		
		socket.on('UpdateUserPermissions', function(data) {
			ServerEvent.emit('UpdateUserPermissions', data, socket);
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
			Live.notificationOff = true;
			socket.emit('toogleLive', Live);
		});
		
		socket.on('LiveOff', function() {
			Live.Youtube = false;
			Live.Twitch = false;
			Live.notificationOff = true;
			io.sockets.emit('toogleLive', Live);
			console.log(Live);
		});
		
		socket.on('LiveYoutube', function() {
			Live.Youtube = true;
			Live.Twitch = false;
			Live.notificationOff = false;
			Live.desc	= 'WIP';
			io.sockets.emit('toogleLive', Live);
		});
		
		socket.on('LiveTwitch', function() {
			Live.Twitch = true;
			Live.Youtube = false;
			Live.notificationOff = false;
			Live.desc	= 'WIP';
			io.sockets.emit('toogleLive', Live);
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
			ServerEvent.emit('saveArticle', data, socket);
			console.log('Emit: saveArticle');
		});
		
		socket.on('updateArticle', function(data) {
			ServerEvent.emit('updateArticle', data, socket);
			console.log('Emit: updateArticle');
		});
		
		socket.on('rmArticle', function(data) {
			ServerEvent.emit('rmArticle', data, socket);
			console.log('Emit: rmArticle');
		});
		
		socket.on('saveComment', function(data) {
			ServerEvent.emit('saveComment', data, socket);
			console.log('Emit: saveComment');
		});
		
		socket.on('rmComment', function(data) {
			ServerEvent.emit('rmComment', data, socket);
			console.log('Emit: rmComment');
		});
		
		socket.on('getCurrentHome', function(data) {
			ServerEvent.emit('getCurrentHome', data, socket);
			console.log('Emit: getCurrentHome');
		});
		
		socket.on('updateInfoHome', function(data) {
			ServerEvent.emit('updateInfoHome', data, socket);
			console.log('Emit: updateInfoHome');
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