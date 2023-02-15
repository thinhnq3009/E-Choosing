angular.module("choosing-app").controller("signupController", [
    "$scope",
    "$http",
    "$rootScope",
    ($scope, $http, $rootScope) => {
        /**
         * Handel shows and hide password
         */
        $scope.showPass = false;
        $scope.showRepeatPass = false;

        $scope.handelShowPass = () => ($scope.showPass = !$scope.showPass);
        $scope.handelShowRepeatPass = () => ($scope.showRepeatPass = !$scope.showRepeatPass);

        $scope.checkUsername = () => {
            console.log("Checking username...");
            $scope.isUsed = 0;
            const data = { u: $scope.username };

            console.log(data);

            $http
                .post($rootScope.apiUrl + "/check-user/", { params: data })
                .then(({ data }) => {
                    if (!data.value) {
                        $scope.isUsed = 1;
                    } else {
                        $scope.isUsed = -1;
                    }
                })
                .catch((err) => console.log(err))
                .finally(() => {
                    $scope.isUsed = $scope.isUsed == 0 ? -99 : $scope.isUsed;
                });
        };

        /**
         * Handles submit actions
         * @param {*} $event
         */
        $scope.handelSubmit = ($event) => {
            $event.preventDefault();

            const { username, password, fullname, email } = $scope;

            const params = { username, password, fullname, email };

            // Show loading screen
            $rootScope.errorMessage = "";
            $rootScope.successMessage = "";
            $rootScope.isLoading = true;

            $http
                .post($rootScope.apiUrl + "/user/", { params: params })
                .then(({ data }) => {
                    $rootScope.errorMessage = data.error;
                    $rootScope.successMessage = data.success;
                })
                .catch((error) => ($rootScope.errorMessage = error.message))
                .finally(() => ($rootScope.isLoading = false));
        };
    },
]);
