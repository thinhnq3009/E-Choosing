(function () {
    "use strict";

    angular.module("choosing-app").config([
        "$routeProvider",
        function config($routeProvider) {
            // $locationProvider.html5Mode(true);
            $routeProvider
                .when("/", {
                    templateUrl: "pages/app-login/app-login.template.html",
                })
                .when("/login", {
                    templateUrl: "pages/app-login/app-login.template.html",
                })
                .when("/signup", {
                    templateUrl: "pages/app-signup/app-signup.template.html",
                })
                .when("/user-info", {
                    templateUrl: "pages/app-info/app-info.template.html",
                })
                .when("/doing/:code", {
                    templateUrl: "pages/app-doing/app-doing.template.html",
                    // controller: "doingController",
                })
                .when("/summary", {
                    templateUrl: "pages/app-summary/app-summary.template.html",
                    controller: "summaryController"
                })
                .when("/404error", {
                    templateUrl: "pages/app-error/404-page.html",
                });
        },
    ]);
})();
