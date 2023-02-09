"use strict";

angular.module("choosing-app").config([
    "$routeProvider",
    function config($routeProvider) {
        // $locationProvider.html5Mode(true);
        $routeProvider
            .when("/", {
                templateUrl: "pages/login.html",
            })
            .when("/login", {
                templateUrl: "pages/login.html",
            })
            .when("/signup", {
                templateUrl: "pages/signup.html",
            }).when("/user-info", {
                templateUrl: "pages/user-info.html",
            })
    },
]);
