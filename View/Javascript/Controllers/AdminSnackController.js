'use strict';

var AppControllers = angular.module('AppControllers');

AppControllers.controller('adminSnackCtrl', ['$scope', '$http', 'socket', function($scope, $http, socket) {
  // ----- Init -----
  var filter          = {};
  var snack            = this;
  snack.elements       = [];
  snack.list           = [];
  snack.cartes         = [];
  snack.histo          = {};
  snack.histo.elements = [];
  $scope.tab          = 1;
  $scope.type         = {};
  
  
  // ----- GET / SET Data -----
  $http.get('/confs/typeMenu').success(function(data) {
    snack.list = data;
    $scope.type.name = snack.list[0].name;
  });
  
  $http.get('/menusnacks/').success(function(data) {
    snack.cartes = data;
  });
  
  socket.on('ClientPrinterPrintedDone', function(number) {
    if (snack.histo.elements.length > 0) {
      snack.histo.elements.find(findElement, number);
    }
  });
  
  $http.get('/snacks/getYears').success(function(data) {
    snack.histo.years = data;
  });
  
  
  $scope.idSelectedElement = undefined;
  $scope.idChildSelectedElement = undefined;
  $scope.carte = {};
  
  
  // ----- Public Méthode -----
  $scope.setSelected = function (idSelectedElement) {
    if (idSelectedElement != undefined){
      $scope.idSelectedElement = idSelectedElement;
      $scope.carte.elements = snack.cartes[idSelectedElement].elements;
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
      snack.elements.push({name: $scope.name, unit_price: $scope.unit_price, type: $scope.type.name, quantity: $scope.quantity, quantity_min: $scope.quantity_min});
      console.log(snack);
      
      $scope.name         = '';
      $scope.unit_price   = '';
      $scope.quantity     = '';
      $scope.quantity_min = '';
      $scope.type.name    = snack.list[0].name;
      // $scope.type.name    = '';
    }
  };
  
  $scope.removeRow = function(index) {
    if (index != undefined && snack.elements.length >= index && index >= 0)
    snack.elements.splice(index, 1);
  };
  
  $scope.sendMenu = function() {
    if (snack.elements.length > 0) {
      socket.emit('saveMenuSnack', snack.elements);
      
      snack.elements = [];
    }
  };
  
  $scope.editRow = function(index) {
    if (index != undefined && snack.elements.length >= index && index >= 0)
    snack.elements.splice(index, 1);
  };
  
  $scope.SearchByYear = function(year) {
    $http.get('/snacks/getOrders/' + year).success(function(data) {
      snack.histo.elements = data;
    });
  };
  
  $scope.Print  = function(index) {
    filter.number = snack.histo.elements[index].number;
    filter.year   = snack.histo.elements[index].year;
    filter.index  = index;
    socket.emit('RePrintPDF', filter);
  };
  
  
  // ----- Private Méthode -----
  // function findElement(element, index) {
  //   if (element.number == this) {
  //     menu.cartes[index].printed_client++;
  //   }
  //   return element.number == this;
  // };
  
  function findElement(element, index) {
    if (element.number == this) {
      snack.histo.elements[index].printed_client++;
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