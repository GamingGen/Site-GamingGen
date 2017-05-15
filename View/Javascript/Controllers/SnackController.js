'use strict';

var AppControllers = angular.module('AppControllers');

AppControllers.controller('snackCtrl', ['$scope', 'socket', '$http', function($scope, socket, $http) {
  // ----- Init -----
  var order      = this;
  order.elements = [];
  order.paid     = false;
  order.total    = 0;
  order.lists    = [];
  
  
  // ----- GET / SET Data -----
  $http.get('/menusnacks/getLastMenu').then(function(data) {
    order.lists = data.data.elements;
  }).catch(function(err) {
    console.log(err);
  });
  
  $scope.idSelectedElement = undefined;
  
  
  // ----- Public Méthode -----
  $scope.setSelected = function (idSelectedElement) {
    if (idSelectedElement != undefined){
      $scope.idSelectedElement = idSelectedElement;
    }
  };
  
  $scope.addElement = function(name, unit_price) {
    if (name != undefined && unit_price != undefined && $scope.idSelectedElement != undefined) {
      order.elements[$scope.idSelectedElement].name += ' + ' + name;
      order.elements[$scope.idSelectedElement].unit_price += unit_price;
      calculatePrice(order.elements[$scope.idSelectedElement].quantity, $scope.idSelectedElement);
   
      calculateTotal();
    }
  };
  
  $scope.addQuantity = function(index) {
    if (index != undefined && index >= 0) {
      calculatePrice(++order.elements[index].quantity, index);
      
      calculateTotal();
    }
  };
  
  $scope.subQuantity = function(index) {
    if (index != undefined && index >= 0 && order.elements[index].quantity > 1) {
      calculatePrice(--order.elements[index].quantity, index);
    
      calculateTotal();
    }
  };
  
  $scope.addRow = function(name, unit_price) {
    if (name != undefined && unit_price != undefined) {
      order.elements.push({quantity: 1, name: name, price: unit_price, unit_price: unit_price});
    
      calculateTotal();
    }
  };
  
  $scope.removeRow = function(index) {
    if (index != undefined && index >= 0) {
      order.elements.splice(index, 1);
      
      calculateTotal();
      
      $scope.idSelectedElement = undefined;
    }
  };
  
  $scope.sendOrder = function() {
    if (order.elements.length > 0 && $scope.pseudo.length > 0) {
      order.name = $scope.pseudo;
      order.paid = true;
      order.total;
      socket.emit('generatePDF', order);
      
      
      $scope.pseudo  = '';
      order.name     = $scope.pseudo;
      order.elements = [];
      order.paid     = false;
      order.total    = 0;
    }
  };
  
  
  // ----- Private Méthode -----
  function calculatePrice(quantity, index) {
    if (quantity > 0) {
      order.elements[index].price = quantity * order.elements[index].unit_price;
    }
  }
  
  function calculateTotal() {
    var total = 0;
    for(var i = 0; i < order.elements.length; i++) {
      total += (order.elements[i].unit_price * order.elements[i].quantity);
    }
    order.total = total.toFixed(2);
  };
}]);