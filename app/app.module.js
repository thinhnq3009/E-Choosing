(function () {
    const RootController = ($rootScope, $http) => {
       
    };

    const getUser = ($rootScope, $http) => {
        
    };

    //, "appHeader", "appFooter", "appSignup", "appInfo", "appLoading", "appLogin"
    angular
        .module("choosing-app", ["ngRoute"])
        .controller("rootController", ["$rootScope", "$http", RootController])
        .run([
            "$rootScope",
            "$http",
            "$users",
            ($rootScope, $http, $users) => {
                $rootScope.apiUrl = "http://api-e-choosing.quocthinhtme.tk";
                $rootScope.apiUrl = "http://127.0.0.1/api-e-choosing";
                $rootScope.showHeader = true;
                $rootScope.showFooter = true;
                $rootScope.defaultImage = "assets/image/default-avatar.png"
               $users.validate();
            },
        ]);
})();
