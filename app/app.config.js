(function () {
    "use strict";

    angular.module("choosing-app").config([
        "$routeProvider",
        function config($routeProvider) {
            // $locationProvider.html5Mode(true);
            $routeProvider
                .when("/", {
                    templateUrl: "views/app-home/app-home.template.html",
                })
                .when("/login", {
                    templateUrl: "views/app-login/app-login.template.html",
                })
                .when("/signup", {
                    templateUrl: "views/app-signup/app-signup.template.html",
                })
                .when("/user-info", {
                    templateUrl: "views/app-info/app-info.template.html",
                    controller: "infoController",
                })
                .when("/doing/:code", {
                    templateUrl: "views/app-doing/app-doing.template.html",
                    // controller: "doingController",
                })
                .when("/summary", {
                    templateUrl: "views/app-summary/app-summary.template.html",
                    controller: "summaryController",
                })
                .when("/contract", {
                    templateUrl: "views/app-contract/app-contract.template.html",
                })
                .when("/quizzes", {
                    templateUrl: "views/app-quizzes/app-quizzes.template.html",
                    controller: "quizzesController",
                })
                .when("/404error", {
                    templateUrl: "views/app-error/404-page.html",
                })
                .when("/test", {
                    templateUrl: "views/app-test/app-test.html",
                    controller: "testController",
                })
        },
    ]);
})();
