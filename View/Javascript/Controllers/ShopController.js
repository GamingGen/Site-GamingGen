'use strict';

var AppControllers = angular.module('AppControllers');

AppControllers.controller('shopCtrl', ['$scope', 'socket', '$http', function($scope, socket, $http) {
  // ----- Init -----
  var shop      = this;
  shop.elements = [];
  shop.paid     = false;
  shop.total    = 0;
  shop.lists    = [];
  
  
  // ----- GET / SET Data -----
  $http.get('/shop/getProducts').success(function(data) {
    shop.lists = data.elements;
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
      shop.elements[$scope.idSelectedElement].name += ' + ' + name;
      shop.elements[$scope.idSelectedElement].unit_price += unit_price;
      calculatePrice(shop.elements[$scope.idSelectedElement].quantity, $scope.idSelectedElement);
   
      calculateTotal();
    }
  };
  
  $scope.addDiscount = function(name, discount) {
    if (name != undefined && discount != undefined && $scope.idSelectedElement != undefined) {
      shop.elements[$scope.idSelectedElement].name += ' (' + name + ')';
      shop.elements[$scope.idSelectedElement].unit_price += discount;
      
      // Vérifie si le prix n'est pas inférieur à 0
      if (shop.elements[$scope.idSelectedElement].unit_price < 0) {
        shop.elements[$scope.idSelectedElement].unit_price = 0;
      }
      calculatePrice(shop.elements[$scope.idSelectedElement].quantity, $scope.idSelectedElement);
   
      calculateTotal();
    }
  };
  
  $scope.addQuantity = function(index) {
    if (index != undefined && index >= 0) {
      calculatePrice(++shop.elements[index].quantity, index);
      
      calculateTotal();
    }
  };
  
  $scope.subQuantity = function(index) {
    if (index != undefined && index >= 0 && shop.elements[index].quantity > 1) {
      calculatePrice(--shop.elements[index].quantity, index);
    
      calculateTotal();
    }
  };
  
  $scope.addRow = function(name, unit_price) {
    if (name != undefined && unit_price != undefined) {
      shop.elements.push({quantity: 1, name: name, price: unit_price, unit_price: unit_price});
    
      calculateTotal();
    }
  };
  
  $scope.removeRow = function(index) {
    if (index != undefined && index >= 0) {
      shop.elements.splice(index, 1);
      
      calculateTotal();
      
      $scope.idSelectedElement = undefined;
    }
  };
  
  $scope.sendOrder = function() {
    if (shop.elements.length > 0 && $scope.pseudo.length > 0) {
      shop.name = $scope.pseudo;
      shop.paid = true;
      // shop.total;
      socket.emit('generateShopPDF', shop);
      
      
      // $scope.pseudo  = '';
      // shop.name     = $scope.pseudo;
      shop.elements = [];
      shop.paid     = false;
      shop.total    = 0;
    }
  };
  
  
  // ----- Private Méthode -----
  function calculatePrice(quantity, index) {
    if (quantity > 0) {
      shop.elements[index].price = quantity * shop.elements[index].unit_price;
    }
  }
  
  function calculateTotal() {
    var total = 0;
    for(var i = 0; i < shop.elements.length; i++) {
      total += (shop.elements[i].unit_price * shop.elements[i].quantity);
    }
    shop.total = total.toFixed(2);
  };
}]);