(function () {
    const RootController = ($rootScope, $http) => {};

    const getUser = ($rootScope, $http) => {
        const token = sessionStorage.getItem("token");

        if (!token) return;

        $http
            .post($rootScope.apiUrl + "/validate/", { params: { token } })
            .then(({ data }) => {
                if (!data) return;
                if (data.error) {
                    sessionStorage.removeItem("token");
                    console.log("Can't maintain login");
                } else {
                    sessionStorage.setItem("token", data.token);
                    $rootScope.userLogin = data;
                }
            })
            .catch()
            .finally();
    };

    //, "appHeader", "appFooter", "appSignup", "appInfo", "appLoading", "appLogin"
    angular
        .module("choosing-app", ["ngRoute"])
        .controller("rootController", ["$rootScope", "$http", RootController])
        .run([
            "$rootScope",
            "$http",
            ($rootScope, $http) => {
                $rootScope.apiUrl = "http://127.0.0.1/api-e-choosing";
                $rootScope.apiUrl = "http://api-e-choosing.quocthinhtme.tk";
                $rootScope.showHeader = true;
                $rootScope.showFooter = true;
                getUser($rootScope, $http);
            },
        ]);
})();
