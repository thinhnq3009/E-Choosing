(function () {
    "use strict";

    const getHandler = ($scope) => ({
        toggleOldPass: () => ($scope.showOldPass = !$scope.showOldPass),
        toggleNewPass: () => ($scope.showNewPass = !$scope.showNewPass),
        toggleConfirmPass: () => ($scope.showConfirmPass = !$scope.showConfirmPass),
        reset: () => {
            $scope.isChanging = false;
            $scope.showOldPass = false;
            $scope.showConfirmPass = false;
            $scope.showNewPass = false;
            $scope.oldPass = "";
            $scope.newPass = "";
            $scope.confirmPass = "";
        },
    });

    angular.module("choosing-app").controller("infoController", controller);

    controller.$inject = ["$scope", "$rootScope", "$http", "$notifier", "$users"];

    function controller($scope, $rootScope, $http, $notifier, $users) {
        $scope.showOldPass = false;
        $scope.showNewPass = false;
        $scope.showConfirmPass = false;
        $scope.isChanging = false;

        $scope.handler = getHandler($scope);

        $scope.handelChangePass = function () {
            const params = {
                oldPass: $scope.oldPass,
                newPass: $scope.newPass,
                token: $rootScope.userLogin.token,
            };

            $rootScope.isLoading = true;
            $http
                .put($rootScope.apiUrl + "/change-pass/", { params })
                .then(({ data }) => {
                    data.error && $notifier.showError(data.error);
                    if (data.success) {
                        $notifier.showSuccess(data.success);
                        $scope.handler.reset();
                    }
                })
                .finally(() => {
                    $rootScope.isLoading = false;
                });
        };

        $scope.modalButtons = [
            {
                className: "btn-success",
                text: "Change",
                event: () => {
                   $users.update($scope.newInfo)
                },
            },
        ];
    }
})();
