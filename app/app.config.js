(function () {
    "use strict";

    angular.module("choosing-app").config([
        "$routeProvider",
        function config($routeProvider) {
            // $locationProvider.html5Mode(true);
            $routeProvider
                .when("/", {
                    templateUrl: "views/app-home.template.html",
                })
                .when("/login", {
                    templateUrl: "views/app-login.template.html",
                })
                .when("/signup", {
                    templateUrl: "views/app-signup.template.html",
                })
                .when("/user-info", {
                    templateUrl: "views/app-info.template.html",
                    controller: "infoController",
                })
                .when("/doing/:code", {
                    templateUrl: "views/app-doing.template.html",
                    // controller: "doingController",
                })
                .when("/summary", {
                    templateUrl: "views/app-summary.template.html",
                    controller: "summaryController",
                })
                .when("/contract", {
                    templateUrl: "views/app-contract.template.html",
                })
                .when("/quizzes", {
                    templateUrl: "views/app-quizzes.template.html",
                    controller: "quizzesController",
                })
                .when("/404error", {
                    templateUrl: "views/404-page.html",
                })
                .when("/reset-password", {
                    templateUrl: "views/app-forgot-password.html",
                })
        },
    ]);
})();
