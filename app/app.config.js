angular.module("choosing-app", ["ngRoute"]).config([
    "$routeProvider",
    function config($routeProvider) {
        $routeProvider
            .when("/", {
                template: "<app-header></app-header>",
            })
            .when("/login", {
                templateUrl: 'components/pages/login.html'
            })
    },
]);
