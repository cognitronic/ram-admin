/**
 * Created by Danny Schreiber on 8/3/14.
 * This controller is used to grab
 */

(function(){
    'use strict';

    var UserController = function($scope, UserService){
        UserService.getUserFullName().then(function(fullName){
            $scope.fullName = fullName;
        });
    };
    angular.module('ram').controller('UserController', ['$scope', 'UserService', UserController]);
})();