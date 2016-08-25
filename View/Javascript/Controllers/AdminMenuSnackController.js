'use strict';

var AppControllers = angular.module('AppControllers');

AppControllers.controller('adminMenuSnackCtrl', ['$scope', '$http', 'socket', function($scope, $http, socket) {
  // ----- Init -----
  var menu      = this;
  menu.elements = [];
  menu.list     = [];
  menu.cartes   = [];
  $scope.tab    = 1;
  $scope.type   = {};
  
  
  // ----- GET / SET Data -----
  $http.get('/confs/typeMenu').success(function(data) {
    menu.list = data;
    console.log(menu.list);
    $scope.type.name = menu.list[0].name;
  });
  
  $http.get('/menusnacks/').success(function(data) {
    menu.cartes = data;
  });
  
  $scope.idSelectedElement = undefined;
  $scope.idChildSelectedElement = undefined;
  $scope.carte = {};
  
  
  // ----- Public Méthode -----
  $scope.setSelected = function (idSelectedElement) {
    if (idSelectedElement != undefined){
      $scope.idSelectedElement = idSelectedElement;
      $scope.carte.elements = menu.cartes[idSelectedElement].elements;
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
      menu.elements.push({name: $scope.name, unit_price: $scope.unit_price, type: $scope.type.name, quantity: $scope.quantity, quantity_min: $scope.quantity_min});
      console.log(menu);
      
      $scope.name         = '';
      $scope.unit_price   = '';
      $scope.quantity     = '';
      $scope.quantity_min = '';
      $scope.type.name    = menu.list[0].name;
      // $scope.type.name    = '';
    }
  };
  
  $scope.removeRow = function(index) {
    if (index != undefined && menu.elements.length >= index && index >= 0)
    menu.elements.splice(index, 1);
  };
  
  $scope.sendMenu = function() {
    if (menu.elements.length > 0) {
      socket.emit('saveMenuSnack', menu.elements);
      
      menu.elements = [];
    }
  };
  
  $scope.editRow = function(index) {
    if (index != undefined && menu.elements.length >= index && index >= 0)
    menu.elements.splice(index, 1);
  };
  
  
  // ----- Private Méthode -----
  function findElement(element, index) {
    if (element.number == this) {
      menu.cartes[index].printed_client++;
    }
    return element.number == this;
  };
  
  
  // ----- jQuery -----
  
  // Gestion du contenu du Modal (Snack)
  $('#adminSnackModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var id = button.data('id'); // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    
    var modal = $(this);
    modal.find('.modal-title').text(id);
    modal.find('.modal-body').text('Loading...');
    
    // $http.get('/articles/' + id).success(function(data) {
    //   console.log(data);
    //   modal.find('.modal-title').text(data.title);
    //   modal.find('.modal-body').text(data.text);
    // });
  });
  
  $('#adminSnackModal').on('hide.bs.modal', function () {
    console.log('Modal Hide');
    var modal = $(this);
    modal.find('.modal-title').text('');
    modal.find('.modal-body').text('');
  });
  
}]);