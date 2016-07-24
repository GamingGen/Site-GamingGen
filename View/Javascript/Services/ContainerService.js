'use strict';

var ContainerService = angular.module('ContainerService', []);

ContainerService.service('ManageViewService', function($rootScope, slider) {
    this.setView = function(view) {
        $rootScope.mainView = view;
        if (view.indexOf('admin') !== -1) {
          slider.hide(true);
        }
        else {
          slider.hide(false);
        }
        console.log(view);
    };
    this.getView = function() {
        return $rootScope.mainView;
    };
})