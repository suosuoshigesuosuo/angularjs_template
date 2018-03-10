define([
    'angular',
    'uiRouter',
    'uiBootstrap'
],function(angular){
    var app = angular.module('app',['ui.router','ui.bootstrap']);

    app.config(['$controllerProvider','$compileProvider','$filterProvider','$provide',
        function($controllerProvider,$compileProvider,$filterProvider,$provide){        
        app.register = {
            controller : $controllerProvider.register,
            directive: $compileProvider.directive,
            filter: $filterProvider.register,
            factory:$provide.factory,
            service: $provide.service
        };
    }])

    app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
        $urlRouterProvider.otherwise('/home');
        $stateProvider
            .state("home",{
                url:"/home",
                controller: 'homeCtrl',
                templateUrl: './src/home/view/home.html',
                resolve: {
                    loadCtrl: ["$q", function($q) { 
                        var deferred = $q.defer();
                        //异步加载controller／directive/filter/service
                        require([
                            './src/home/controller/homeCtrl' 
                        ], function() { 
                            deferred.resolve(); 
                        });
                        return deferred.promise;
                    }]
                }
            })
            .state("login",{
                url:"/login",
                controller: 'loginCtrl',
                templateUrl: './src/login/view/login.html',
                resolve: {
                    loadCtrl: ["$q", function($q) { 
                        var deferred = $q.defer();
                        //异步加载controller／directive/filter/service
                        require([
                            './src/login/controller/loginCtrl' 
                        ], function() { 
                            deferred.resolve(); 
                        });
                        return deferred.promise;
                    }]
                }
            })
    }]);

    return app;
})