angular.module("choosing-app").component("appHeader", {
    templateUrl: "components/app-header/app-header.template.html",
    controller: [
        "$scope",
        "$rootScope",
        ($scope, $rootScope) => {
            $scope.handelLogout = () => {
                $rootScope.userLogin = null;
                sessionStorage.removeItem("token");
            };
        },
    ],
});
