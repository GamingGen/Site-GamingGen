'use strict';

var AppControllers = angular.module('AppControllers');

AppControllers.controller('histoShopCtrl', ['$http', '$scope', 'socket', function($http, $scope, socket) {
  // ----- Init -----
  var filter = {};
  var histo = this;
  histo.elements = [];
  
  
  // ----- GET / SET Data -----
  socket.on('ClientPrinterPrintedDone', function(number) {
    if (histo.elements.length > 0) {
      histo.elements.find(findElement, number);
    }
  });
  
  $http.get('/order/getYears').success(function(data) {
    histo.years = data;
  });
  
  
  // ----- Public Méthode -----
  $scope.SearchByYear = function(year) {
    $http.get('/order/getOrders/' + year).success(function(data) {
      histo.elements = data;
    });
  };
  
  $scope.Print  = function(index) {
    filter.number = histo.elements[index].number;
    filter.year   = histo.elements[index].year;
    filter.index  = index;
    socket.emit('RePrintShopPDF', filter);
  };
  
  
  // ----- Private Méthode -----
  function findElement(element, index) {
    if (element.number == this) {
      histo.elements[index].printed_client++;
    }
    return element.number == this;
  };
}]);