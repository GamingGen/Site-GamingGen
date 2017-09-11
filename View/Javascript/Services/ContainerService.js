'use strict';

var ContainerService = angular.module('ContainerService', []);

ContainerService.service('ManageViewService', ['$rootScope', function($rootScope) {  // , 'slider'
    this.setView = function(view) {
        // $rootScope.mainView = view;
        if (view.indexOf('admin') !== -1) {
          // slider.hide(true);
            $rootScope.showSlider = false;
        }
        else {
          // slider.hide(false);
        $rootScope.showSlider = true;
        }
        console.log(view);
    };
    // this.getView = function() {
    //     return $rootScope.mainView;
    // };
}]);