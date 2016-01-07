/**
 * Created by alexandre.leclerc on 06/01/2016.
 */
'use strict';
angular.module('io.service')
    .factory('socket', ['$rootScope', function ($rootScope) {

        var safeApply = function(scope, fn) {
            if (scope.$$phase) {
                fn(); // digest already in progress, just run the function
            } else {
                scope.$apply(fn); // no digest in progress, run with $apply
            }
        };

        var socket = io.connect(), disconnecting = false;

        return {
            on: function (eventName, callback) {
                socket.on(eventName, function () {
                    var args = arguments;
                    safeApply($rootScope, function () {
                        callback.apply(socket, args);
                    });
                });
            },
            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    safeApply($rootScope, function () {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                })
            },
            disconnect: function () {
                disconnecting = true;
                socket.disconnect();
            },
            socket: socket
        };

    }]);