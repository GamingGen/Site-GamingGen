(function() {
  var app = angular.module('store', []);
  
  app.controller('StoreController', function(){
    this.products = gems;
  });
  
  var gems = [
    {
      name: 'Dodecahedron',
      price: 2.95,
      description: '1. 2. 3.',
      canPurchase: true
    },
    {
      name: 'Pentagonal Gem',
      price: 5.95,
      description: '. . .',
      canPurchase: false
    }
  ];
  
})();

var tests = [];

for(var test of tests){
  console.log(test);
}