/**
 * Created by Danny Schreiber on 8/3/14.
 */

var app = angular.module('ram', ['restangular'])
.config(function($httpProvider){
        $httpProvider.defaults.transformRequest = function(data){
            if (data === undefined) {
                return data;
            }
            return $.param(data);
        }

        //sets the content type header globally for $http calls
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    });