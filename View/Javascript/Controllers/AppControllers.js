/**
 * Définition des contrôleurs
 */
var AppControllers = angular.module('AppControllers', []);

AppControllers.controller('mainCtrl', ['UserService', '$location', '$state', '$scope', 'socket', '$window', 'slider', function(UserService, $location, $state, $scope, socket, $window, slider) {
  // ----- Init -----
  var pages       = {};
  pages.admin     = [];
  pages.gaminggen = [];
  pages.snack     = [];
  pages.snackRPI  = [];
  
  var user = {};
  
  console.log('mainCtrl is executed');
  
  $scope.User = UserService.currentUser;
  $scope.isMailExist = false;
  $scope.isPseudoExist = false;
  
  // ----- GET / SET Data -----
  
  // Pour récupérer les infos en cas de coupure réseau
  socket.on('connect', function() {
    socket.emit('getToogleLive');
    console.log('Connexion || Reconnexion');
  });
  
  socket.on('getToogleLive', function(live) {
    $scope.live = live;
  });
  
  socket.on('toogleLive', function(live) {
    $scope.live = live;
  });
  
  socket.on('isMailExist', function(data) {
    $scope.isMailExist = data;
  });
  
  socket.on('isPseudoExist', function(data) {
    console.log(data);
    $scope.isPseudoExist = data;
  });
  
  $scope.$watch('email', isMailExist);
  $scope.$watch('pseudo', isPseudoExist);
  
  $scope.connectionEmail = 'darkterra01@gmail.com';
  $scope.connectionPassword = 'darkterra';
  
  
  // ----- Public Méthode -----
  
  // Submit Login Modal
  $scope.submitLogin = function() {
    console.log('submitLogin Call');
    
    user.email = $scope.connectionEmail;
    user.password = $scope.connectionPassword;
    
    UserService.login(user)
    .success(function() {
      console.log('Connexion !!!');
      UserService.MajCurrentUser();
      $scope.User = UserService.currentUser;
      console.log($scope.User);
    })
    .error(function() {
      console.log('Connexion Error -_-');
    });
    
    // $scope.connectionEmail = '';
    // $scope.connectionPassword = '';
  };
  
  // Submit Register Modal
  $scope.submitRegister = function() {
    console.log('submitRegister Call');
    
    
    $scope.firstName = '';
    $scope.lastName  = '';
    $scope.pseudo    = '';
    $scope.password  = '';
    $scope.zip       = '';
    $scope.birthday  = '';
    $scope.email     = '';
  };
  
  
  // Submit Logout
  $scope.Logout = function() {
    console.log('Logout Call');
    
    UserService.logout()
    .success(function() {
      $state.go('home');
    });
  };
  
  // TEST RAZ Register Modal
  $scope.closeRegister = function() {
    console.log('closeRegister Call');
    // $scope.firstName = '';
    // $scope.lastName = '';
    // $scope.pseudo = '';
    // $scope.password = '';
    // $scope.zip = '';
    // $scope.birthday = '';
    // $scope.email = '';
    
    // $scope.isMailExist = false;
    // $scope.isPseudoExist = false;
  };
  
  // Launch fullscreen for browsers that support it!
  $scope.FullScreen = function() {
    launchIntoFullscreen(document.documentElement);
  };
  
  // Cancel fullscreen for browsers that support it!
  $scope.ExitFullScreen = function() {
    exitFullscreen();
  };
  
  $scope.needFullScreen = function() {
    // if ($location.path() === '/snack') {
    //   launchIntoFullscreen(document.documentElement);
    //   console.log('Go to FullScreen');
    // }
    // else {
    //   exitFullscreen();
    //   console.log('Go to Normal Screen');
    // };
  };
  
  
  // ----- Private Méthode -----
  function isMailExist(newValue, oldValue, scope) {
    if (newValue) {
      socket.emit('isMailExist', newValue);
    }
  };
  
  function isPseudoExist(newValue, oldValue, scope) {
    if (newValue) {
      socket.emit('isPseudoExist', newValue);
    }
  };
  
  
  // ----- jQuery -----
  
  // Collapse Menu responsive
  $('.dropdown-menu a, .navbar-brand, .autoCollapse, .toCollapse').on('click', function() {
    $('.navbar-collapse').collapse('hide');
  });
  
  // Modal Register Modal
  $('#closeRegister').click(function () {
    $('#firstName').val('');
    $('#lastName').val('');
    $('#pseudo').val('');
    $('#password').val('');
    $('#zip').val('');
    $('#birthday').val('');
    $('#email').val('');
    
    $scope.isMailExist = false;
    $scope.isPseudoExist = false;
    $scope.$apply();
  });
  
  // RAZ Connection Modal
  $('#closeConnection').click(function () {
    $('#connectionEmail').val('');
    $('#connectionPassword').val('');
  });
}]);

AppControllers.controller('adminLiveCtrl', ['$scope', '$http', 'socket', function($scope, $http, socket) {
  // ----- Init -----
  var idLive;
  
  // ----- GET / SET Data -----
  $scope.playerVars = {
    controls: 0,
    autoplay: 1
  };
  
  socket.on('ChangeLiveSource', function(data) {
    $scope.youtubeAdminLive = data;
  });
  
  
  // ----- Public Méthode -----
  $scope.toogleLive = function () { 
    socket.emit('toogleLive');
  };
  
  $scope.Somevideo = function() {
    idLive = "dGRWO7C6m6M";
    socket.emit('ChangeLiveSource', idLive);
  };
  $scope.youtubeLive = function() {
    idLive = "L4x7NOl2_To";
    socket.emit('ChangeLiveSource', idLive);
  };

  // // $scope.sendPost = function() {
  // //   var data = {
  // //     name: "test003",
  // //     users: {
  // //       password_min_length: 8
  // //     },
  // //     roles: ["Admin", "Player"],
  // //     snack: {
  // //       nominal_time_preparation: 10,
  // //       printer_client_length_element: 12,
  // //       printer_cook_length_element: 18,
  // //       type_menu: ["Plat", "Accompagnement", "Boisson", "Dessert", "Encas"]
  // //     }
  ////    };
    
  // //   socket.emit('saveConf', data);
  // // };
  
  // ----- Private Méthode -----
}]);

AppControllers.controller('adminArticleCtrl', ['$scope', '$http', 'socket', function($scope, $http, socket) {
  // ----- Init -----
  tinymce.init({
    selector: 'textarea',
    height: 500,
    // plugins: [
    //   'advlist autolink lists link image charmap print preview anchor',
    //   'searchreplace visualblocks code fullscreen',
    //   'insertdatetime media table contextmenu paste code'
    // ],
    plugins: [
      'advlist autolink lists link image',
      'searchreplace visualblocks',
      'contextmenu paste emoticons textcolor colorpicker textpattern imagetools'
    ],
    // toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
    toolbar: 'insertfile undo redo | backcolor forecolor emoticons | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
    content_css: [
      // '//fast.fonts.net/cssapi/e6dc9b99-64fe-4292-ad98-6974f93cd2a2.css',
      // '//www.tinymce.com/css/codepen.min.css'
    ]
  });
  
  
  // ----- GET / SET Data -----
  $scope.tinymceModel = 'https://nodeblog.files.wordpress.com/2011/07/nodejs.png';
  
  
  // ----- Public Méthode -----
  $scope.getContent = function() {
    // console.log('Editor Title:', $scope.title);
    // console.log('Editor Desc:', $scope.desc);
    // console.log('Editor Content:', tinymce.activeEditor.getContent());
    console.log(tinymce.activeEditor.getContent());
    var text = tinymce.activeEditor.getContent().replace(new RegExp('<img', 'g'), '<img class="img-responsive"');
    console.log(text);
    // TODO Récupérer l'username une fois la partie gestion des connexions fonctionnel
    var article = {
          username  : 'DarkTerra',
          title     : $scope.title,
          desc      : $scope.desc,
          text      : text
        };
    
    socket.emit('saveArticle', article);
    
    $scope.title = '';
    $scope.desc = '';
    tinymce.activeEditor.setContent('<p></p>');
  };
  
  
  // ----- Private Méthode -----
}]);



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


AppControllers.controller('homeCtrl', ['$http', '$scope', 'socket', '$filter', function($http, $scope, socket, $filter){
  // ----- Init -----
  var news      = this;
  news.articles = [];
  
  
  // ----- GET / SET Data -----
  $scope.videoPresentation = "dGRWO7C6m6M";
  // $scope.videoPresentation = "https://www.youtube.com/watch?v=Im4TO03CuF8&feature=youtu.be";
  // $scope.videoPresentation = "MUg1WBEPLCE";
  $scope.playerVars = {
    controls: 1,
    autoplay: 1
  };
  
  $scope.$on('youtube.player.ready', function ($event, player) {
    player.mute();
  });
  
  $http.get('/articles').success(function(data) {
    news.articles = data;
  });
  
  socket.on('NewArticle', function(data) {
    data.register_date = new Date().toISOString();
    console.log(data);
    news.articles.push(data);
  });
  
  
  // ----- Public Méthode -----
  
  
  // ----- Private Méthode -----
  
  
  // ----- jQuery -----
  
  // Gestion du contenu du Modal (Articles)
  $('#myModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var id = button.data('id');
    
    var modal = $(this);
    modal.find('.modal-title').text('Work In Progress');
    modal.find('.modal-body').text('Loading...');
    
    $http.get('/articles/' + id).success(function(data) {
      modal.find('.modal-title').text(data.title + ' - ' + $filter('date')(data.register_date, 'MMMM yyyy'));
      modal.find('.modal-body').html(data.text);
      modal.find('.modal-footer').prepend(data.username + ' ');
    });
  });
  
  $('#myModal').on('hide.bs.modal', function () {
    var modal = $(this);
    modal.find('.modal-title').text('');
    modal.find('.modal-body').text('');
    modal.find('.modal-footer').html('<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>');
  });
}]);


AppControllers.controller('liveCtrl', ['$http', '$scope', 'socket', '$filter', function($http, $scope, socket, $filter){
  // ----- Init -----
  var live      = this;
  
  
  // ----- GET / SET Data -----
  $scope.playerVars = {
    controls: 0,
    autoplay: 1
  };
  
  
  socket.emit('getLiveSource');
  
  socket.on('getLiveSource', function(data) {
    $scope.youtubeLive = data;
  });
  
  socket.on('ChangeLiveSource', function(data) {
    $scope.youtubeLive = data;
  });
  
  
  // ----- Public Méthode -----
  
  
  // ----- Private Méthode -----
  
  
  // ----- jQuery -----
}]);



AppControllers.directive('modal', function () {
    return {
      template: '../Partial/modal.html',
      restrict: 'E'//,
      // transclude: true,
      // replace:true,
      // scope:true,
      // link: function postLink(scope, element, attrs) {
      //   scope.title = attrs.title;
        
      //   scope.$watch(attrs.visible, function(value){
      //     if(value == true)
      //       $(element).modal('show');
      //     else
      //       $(element).modal('hide');
      //   });
        
      //   $(element).on('shown.bs.modal', function(){
      //     scope.$apply(function(){
      //       scope.$parent[attrs.visible] = true;
      //     });
      //   });
        
      //   $(element).on('hidden.bs.modal', function(){
      //     scope.$apply(function(){
      //       scope.$parent[attrs.visible] = false;
      //     });
      //   });
      // }
    };
  });


AppControllers.controller('snackCtrl', ['$scope', 'socket', '$http', function($scope, socket, $http) {
  // ----- Init -----
  var order      = this;
  order.elements = [];
  order.paid     = false;
  order.total    = 0;
  order.lists    = [];
  
  
  // ----- GET / SET Data -----
  $http.get('/menusnacks/getLastMenu').success(function(data) {
    order.lists = data.elements;
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


AppControllers.controller('histosnackCtrl', ['$http', '$scope', 'socket', function($http, $scope, socket) {
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
  
  $http.get('/snacks/getYears').success(function(data) {
    histo.years = data;
  });
  
  
  // ----- Public Méthode -----
  $scope.SearchByYear = function(year) {
    $http.get('/snacks/getOrders/' + year).success(function(data) {
      histo.elements = data;
    });
  };
  
  $scope.Print  = function(index) {
    filter.number = histo.elements[index].number;
    filter.year   = histo.elements[index].year;
    filter.index  = index;
    socket.emit('RePrintPDF', filter);
  };
  
  
  // ----- Private Méthode -----
  function findElement(element, index) {
    if (element.number == this) {
      histo.elements[index].printed_client++;
    }
    return element.number == this;
  };
}]);


// Find the right method, call on correct element
function launchIntoFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

// Whack fullscreen
function exitFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}