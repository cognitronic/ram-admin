/**
 * Created by Danny Schreiber on 8/3/14.
 */

describe('UserController', function(){
   var scope, controller, httpBackend;

    // Initialization of the AngularJS application before each test case
    beforeEach(module('ram'));

    // Injection of dependencies, $http will be mocked with $httpBackend
    beforeEach(inject(function($rootScope, $controller, $httpBackend){
        scope = $rootScope;
        controller = $controller;
        httpBackend = $httpBackend;
    }));

    it('should query the webservice', function(){

        // Which http requests do we expect to occur, and how do we repond
        httpBackend.expectGET('/user').respond('[{"name": "Danny Schreiber"}, {"name": "Aimee Schreiber"}]');

        //Starting the controller
        controller('UserController', {'$scope': scope});

        //Respond to all HTTP requests
        httpBackend.flush();

        // Triggering the AngularJS digest cycle in order to resolve all promises
        scope.$apply()

        // We expect the controller to put the right value onto the scope
        expect(scope.fullName).toEqual('Danny Schreiber');
    });
});