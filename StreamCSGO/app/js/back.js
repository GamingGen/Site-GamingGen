/**
 * Created by alexandre.leclerc on 04/01/2016.
 */
'use strict';
var back = angular.module('backPlayer',["io.service"]);
back.controller('BackCtrl',
    ["$sce",'socket', function ($sce, socket) {
        //var controller = this;
        //$sce.index = 0;
        ////controller.API = null;
        //
        //
        //$sce.setVideo = function (idx) {
        //    $sce.index = idx;
        //};
        socket.emit('register');

        socket.on('connect', function () {
            console.log('Socket connected');
        });

        socket.on('disconnect', function () {
            console.log('Socket disconnected');
        });

        socket.on('register', function (reginfo) {
            console.log('Register: %s, cname=%s', reginfo.ok, reginfo.cname);
            socket.disconnect(); // <-- this line throw Error
        });

        socket.on('last', updateSnapshot);

        socket.on('state', updateSnapshot);
    }]
);