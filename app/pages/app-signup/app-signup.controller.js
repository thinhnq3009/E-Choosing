angular.module("choosing-app").controller("signupController", [
    "$scope",
    "$http",
    "$rootScope",
    "$location",
    "$notifier",
    ($scope, $http, $rootScope, $location, $notifier) => {
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
                        $scope.isUsed = 1; // Username is valid
                    } else {
                        $scope.isUsed = -1; // Username is not valid
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
            $rootScope.isLoading = true;

            $http
                .post($rootScope.apiUrl + "/user/", { params: params })
                .then(({ data }) => {
                    data.error && $notifier.showError(data.error);
                    if (data.success) {
                        $notifier.showSuccess("Sign Up Success");
                        $location.url("/login");
                    }
                })
                .catch((error) => $notifier.showError(error.message))
                .finally(() => ($rootScope.isLoading = false));
        };
    },
]);
