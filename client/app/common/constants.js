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