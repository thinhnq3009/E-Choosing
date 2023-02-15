(function () {
    angular.module("choosing-app").controller("headerController", [
        "$scope",
        "$rootScope",
        ($scope, $rootScope) => {
            $scope.handelLogout = () => {
                $rootScope.userLogin = null;
                sessionStorage.removeItem("token");
            };
        },
    ]);
})();
