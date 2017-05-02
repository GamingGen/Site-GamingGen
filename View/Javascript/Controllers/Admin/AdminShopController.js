'use strict';

var AppControllers = angular.module('AppControllers');

AppControllers.controller('adminShopCtrl', ['$scope', '$http', 'socket', function($scope, $http, socket) {
  // ----- Init -----
  var shop      = this;
  shop.elements = [];
  shop.list     = [];
  shop.cartes   = [];
  $scope.tab    = 1;
  $scope.type   = {};
  
  
  // ----- GET / SET Data -----
  $http.get('/confs/shop').then(function(data) {
    shop.list = data.data;
    $scope.type.name = shop.list[0].name;
  }).catch(function(err) {
    console.log(err);
  });
  
  $http.get('/shop/').then(function(data) {
    shop.cartes = data.data;
  }).catch(function(err) {
    console.log(err);
  });
  
  $scope.idSelectedElement = undefined;
  $scope.idChildSelectedElement = undefined;
  $scope.carte = {};
  
  
  // ----- Public Méthode -----
  $scope.setSelected = function (idSelectedElement) {
    if (idSelectedElement != undefined){
      $scope.idSelectedElement = idSelectedElement;
      $scope.carte.elements = shop.cartes[idSelectedElement].elements;
    }
  };
  
  $scope.setChildSelected = function (idChildSelectedElement) {
    if (idChildSelectedElement != undefined){
      $scope.idChildSelectedElement = idChildSelectedElement;
    }
  };
  
  $scope.selectTab = function(setTab) {
    $scope.tab = setTab;
  };
  
  $scope.isSelected = function(checkTab) {
    return $scope.tab === checkTab;
  };
  
  $scope.addRow = function() {
    console.log($scope);
    console.log($scope.type.name + " " + $scope.name + " " + $scope.unit_price);
    if ($scope.type != undefined && $scope.name != undefined && $scope.unit_price != undefined && $scope.quantity != undefined && $scope.quantity_min != undefined) {
      shop.elements.push({name: $scope.name, unit_price: $scope.unit_price, type: $scope.type.name, quantity: $scope.quantity, quantity_min: $scope.quantity_min});
      console.log(shop);
      
      $scope.name         = '';
      $scope.unit_price   = '';
      $scope.quantity     = '';
      $scope.quantity_min = '';
      $scope.type.name    = shop.list[0].name;
      // $scope.type.name    = '';
    }
  };
  
  $scope.removeRow = function(index) {
    if (index != undefined && shop.elements.length >= index && index >= 0)
    shop.elements.splice(index, 1);
  };
  
  $scope.sendMenu = function() {
    if (shop.elements.length > 0) {
      socket.emit('saveShop', shop.elements);
      
      shop.elements = [];
    }
  };
  
  $scope.editRow = function(index) {
    if (index != undefined && shop.elements.length >= index && index >= 0)
    shop.elements.splice(index, 1);
  };
  
  
  // ----- Private Méthode -----
  function findElement(element, index) {
    if (element.number == this) {
      shop.cartes[index].printed_client++;
    }
    return element.number == this;
  };
  
  
  // ----- jQuery -----
  
  // Gestion du contenu du Modal (Shop)
  $('#adminSnackModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var name = button.data('id'); // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    
    var modal = $(this);
    modal.find('.modal-title').text(name);
    // modal.find('.modal-body').text('Loading...');
    
    $http.get('/shop/getProduct/' + name).then(function(data) {
      modal.find('.modal-title').text(data.data.name);
      // modal.find('.modal-body').text('');
      modal.find('.modal-value-name').val(data.data.name);
      modal.find('.modal-value-unit_price').val(data.data.unit_price);
      modal.find('.modal-value-quantity').val(data.data.quantity);
      modal.find('.modal-value-quantity_min').val(data.data.quantity_min);
    }).catch(function(err) {
      console.log(err);
    });
  });
  
  $('#adminSnackModal').on('hide.bs.modal', function () {
    console.log('Modal Hide');
    var modal = $(this);
    modal.find('.modal-title').text('');
    modal.find('.modal-body').text('');
  });
  
}]);