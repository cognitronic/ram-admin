/**
 * Created by Danny Schreiber on 8/11/14.
 */

(function(){
    var Constants = {
        BASE_URLS : {
            PUBLIC: 'http://localhost:3000',
            API: 'http://localhost:3000/api/'
        }
    };
    angular.module('ram').constant('Constants', Constants);
})();
/**
 * Created by Danny Schreiber on 8/11/14.
 */

(function(){

    var AuthService = function($http, $rootScope, $state, Constants){

    };

    angular
})();
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
/**
 * Created by Danny Schreiber on 8/3/14.
 * Restangular based service that fetches user data from the backend
 */

(function(){
    'use strict';

    var UserService = function($q, Restangular){
        var _getUserFullName = function(){
          var deferred = $q.defer();
            Restangular.one('user').getList().then(function(response){
                deferred.resolve('Danny Schreiber')
            });
            return deferred.promise;
        };

        return {
            getUserFullName: _getUserFullName
        };
    };

    angular.module('ram').factory('UserService', ['$q', 'Restangular', UserService]);
})();